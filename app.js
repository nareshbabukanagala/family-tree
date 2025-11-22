// Smart Mode Detection - Auto-switch between Dynamic (local server) and Static (GitHub Pages)
const isLocalServer = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_URL = 'http://localhost:3000/api';

// Global state
let familyData = [];
let currentEditId = null;

// Load family data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFamilyData();
    // Only load parents list on admin page
    if (document.getElementById('pid')) {
        loadParentsList();
    }

    // Show mode indicator
    showModeIndicator();
});

// Show which mode we're running in
function showModeIndicator() {
    if (document.getElementById('personForm')) { // Admin page only
        const indicator = document.createElement('div');
        indicator.style.cssText = 'position: fixed; top: 10px; right: 10px; padding: 8px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; z-index: 9999; box-shadow: 0 2px 8px rgba(0,0,0,0.2);';

        if (isLocalServer) {
            indicator.style.background = '#4CAF50';
            indicator.style.color = 'white';
            indicator.innerHTML = '🔧 Dynamic Mode (Local)';
        } else {
            indicator.style.background = '#ff9800';
            indicator.style.color = 'white';
            indicator.innerHTML = '📖 Read-Only (GitHub Pages)';
        }

        document.body.appendChild(indicator);
    }
}

// Load all family members - SMART MODE
async function loadFamilyData() {
    try {
        if (isLocalServer) {
            // Dynamic mode - use API
            console.log('🔧 Dynamic Mode: Fetching from API:', `${API_URL}/family`);
            const response = await fetch(`${API_URL}/family`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ Loaded from API:', data.length, 'members');
            familyData = data;
        } else {
            // Static mode - read details.json directly
            console.log('📖 Static Mode: Loading from details.json');
            const response = await fetch('./details.json');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const jsonData = await response.json();
            familyData = jsonData.kanagala || jsonData.members || jsonData;

            if (!Array.isArray(familyData)) {
                throw new Error('Data is not in array format');
            }

            console.log('✅ Loaded from JSON:', familyData.length, 'members');

            // Disable admin features on GitHub Pages
            disableAdminFeaturesForStatic();
        }

        // Only call admin functions if elements exist
        if (document.getElementById('familyList')) {
            renderFamilyList();
        }
        renderFamilyTree();
        if (document.getElementById('totalCount')) {
            updateStats();
        }
    } catch (error) {
        console.error('Error loading family data:', error);

        // Show helpful error message on the page
        const treeDiv = document.getElementById('treeDiv');
        const errorHtml = `
            <div style="padding: 40px; text-align: center; background: #fff; border-radius: 8px; margin: 20px;">
                <h2 style="color: #d32f2f; margin-bottom: 20px;">⚠️ Failed to Load Family Data</h2>
                <p style="color: #666; margin-bottom: 10px;"><strong>Error:</strong> ${error.message}</p>
                <p style="color: #666; margin-top: 20px;">Please check:</p>
                <ul style="text-align: left; max-width: 500px; margin: 20px auto; color: #666;">
                    <li>Make sure <code>details.json</code> file exists</li>
                    <li>Check browser console (F12) for details</li>
                    <li>Verify JSON structure is correct</li>
                    <li>If on GitHub Pages, wait 2-3 minutes after push</li>
                </ul>
            </div>
        `;

        if (treeDiv) {
            treeDiv.innerHTML = errorHtml;
        }

        // Also show in console
        if (error.message.includes('Failed to fetch')) {
            console.error('Cannot load details.json. Check if file exists and is accessible.');
        }
    }
}

// Render family list view
function renderFamilyList() {
    const listContainer = document.getElementById('familyList');

    if (familyData.length === 0) {
        listContainer.innerHTML = '<p style="text-align:center; color:#666;">No family members yet. Add one to get started!</p>';
        return;
    }

    // Filter out incomplete records (only have id, no name)
    const validData = familyData.filter(person => person.name && person.gender);

    listContainer.innerHTML = validData
        .sort((a, b) => parseInt(a.id) - parseInt(b.id))
        .map(person => {
            const genderClass = person.gender ? person.gender.toLowerCase() : '';
            const personName = person.name || 'Unknown';
            return `
            <div class="person-card ${genderClass}">
                <div class="person-info">
                    <h3>${personName}</h3>
                    <p><strong>Gender:</strong> ${person.gender || 'Not specified'}</p>
                    ${person.address ? `<p><strong>Address:</strong> ${person.address}</p>` : ''}
                    ${person.occupation ? `<p><strong>Occupation:</strong> ${person.occupation}</p>` : ''}
                    ${person.education ? `<p><strong>Education:</strong> ${person.education}</p>` : ''}
                </div>
                <div class="person-actions">
                    <button class="btn btn-primary" onclick="editPerson('${person.id}')">✏️ Edit</button>
                    <button class="btn btn-danger" onclick="deletePerson('${person.id}', '${personName}')">🗑️ Delete</button>
                </div>
            </div>
        `;
        }).join('');
}

// Render family tree view
function renderFamilyTree() {
    const treeDiv = document.getElementById('treeDiv');
    const roots = buildHierarchy(familyData);

    if (roots.length === 0) {
        treeDiv.innerHTML = '<p style="text-align:center; padding:20px; color:#666;">No family tree data available</p>';
        return;
    }

    let html = '<ul>';
    roots.forEach(root => {
        html += generateTreeHTML(root);
    });
    html += '</ul>';

    treeDiv.innerHTML = html;

    // Dispatch event to indicate tree is rendered
    window.dispatchEvent(new Event('treeRendered'));
}

// Build hierarchical tree structure
function buildHierarchy(nodes) {
    const nodeMap = {};
    const roots = [];
    const tagGroups = {};

    nodes.forEach(node => {
        nodeMap[node.id] = {
            ...node,
            children: [],
            spouse: null
        };
    });

    nodes.forEach(node => {
        if (node.tags && node.tags.length > 0) {
            const tag = node.tags[0];
            if (!tagGroups[tag]) tagGroups[tag] = [];
            tagGroups[tag].push(node.id);
        }
    });

    Object.values(tagGroups).forEach(group => {
        if (group.length === 2) {
            // Simple case: One spouse pair
            const node1 = nodeMap[group[0]];
            const node2 = nodeMap[group[1]];
            if (node1 && node2) {
                // Pair spouses - BIDIRECTIONAL (both know about each other)
                node1.spouse = node2;
                node2.spouse = node1;

                // Mark who is the primary display node (one with pid preferred)
                if (node1.pid && !node2.pid) {
                    node1.isPrimary = true;
                } else if (node2.pid && !node1.pid) {
                    node2.isPrimary = true;
                } else {
                    // Both have parents or neither - first one is primary
                    node1.isPrimary = true;
                }
            }
        } else if (group.length > 2) {
            // Multiple spouses case: 1 person with 2+ spouses
            const nodes = group.map(id => nodeMap[id]);

            // Find the blood relative (one with parent)
            const bloodRelative = nodes.find(n => n.pid);
            const spouses = nodes.filter(n => !n.pid);

            if (bloodRelative && spouses.length > 0) {
                // Set up multiple spouses array
                bloodRelative.spouses = spouses;
                bloodRelative.isPrimary = true;

                // Each spouse knows about the blood relative
                spouses.forEach(spouse => {
                    spouse.spouse = bloodRelative;
                    spouse.isPrimary = false;
                });
            } else {
                // Fallback: treat first as primary
                nodes[0].isPrimary = true;
                nodes[0].spouses = nodes.slice(1);
                nodes.slice(1).forEach(n => {
                    n.spouse = nodes[0];
                    n.isPrimary = false;
                });
            }
        }
    });

    nodes.forEach(node => {
        if (node.pid && node.pid.trim() !== '') {
            const parent = nodeMap[node.pid];
            const child = nodeMap[node.id];
            if (parent && child) {
                parent.children.push(child);
            }
        } else {
            // No parent - check if should be root
            const nodeData = nodeMap[node.id];

            if (nodeData.spouse) {
                // Has a spouse - only add if this is the primary node
                if (nodeData.isPrimary) {
                    roots.push(nodeData);
                }
                // If not primary, they'll appear with their spouse, don't add to roots
            } else {
                // No spouse - add as root
                roots.push(nodeData);
            }
        }
    });

    return roots;
}

// Generate HTML for tree node
function generatePersonCard(person) {
    const genderClass = person.gender ? person.gender.toLowerCase() : '';
    const personName = person.name || 'Unknown';

    // Build metadata info for tooltip
    let metadata = [];
    if (person.gender) metadata.push(`Gender: ${person.gender}`);
    if (person.address) metadata.push(`Address: ${person.address}`);
    if (person.occupation) metadata.push(`Occupation: ${person.occupation}`);
    if (person.education) metadata.push(`Education: ${person.education}`);

    const dataInfo = metadata.length > 0 ? metadata.join('\n') : 'No additional information';

    // Wrap in container div for admin page
    let html = '';
    if (document.getElementById('personForm')) {
        html += `<div class="person-card-wrapper">`;
    }

    html += `<a href="#" class="${genderClass}" data-info="${dataInfo}">`;

    if (person.img) {
        html += `<img src="${person.img}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%27 height=%27100%27%3E%3Ccircle cx=%2750%27 cy=%2750%27 r=%2740%27 fill=%27%23ddd%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 text-anchor=%27middle%27 dy=%27.3em%27 font-size=%2740%27 fill=%27%23999%27%3E${personName.charAt(0)}%3C/text%3E%3C/svg%3E'" alt="${personName}" />`;
    } else {
        // Default avatar with first letter
        html += `<img src="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%27 height=%27100%27%3E%3Ccircle cx=%2750%27 cy=%2750%27 r=%2740%27 fill=%27%23ddd%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 text-anchor=%27middle%27 dy=%27.3em%27 font-size=%2740%27 fill=%27%23999%27%3E${personName.charAt(0)}%3C/text%3E%3C/svg%3E" alt="${personName}" />`;
    }

    html += `<span class="name">${personName}</span>`;
    html += '</a>';

    // Add quick action buttons OUTSIDE anchor tag for admin page only
    if (document.getElementById('personForm')) {
        html += `
            <div class="person-quick-actions">
                <button class="quick-btn child-btn" onclick="addChildTo('${person.id}', '${personName.replace(/'/g, "\\'")}'); return false;" title="Add child to ${personName}">
                    ➕ Child
                </button>
                <button class="quick-btn spouse-btn" onclick="addSpouseTo('${person.id}', '${personName.replace(/'/g, "\\'")}'); return false;" title="Add spouse to ${personName}">
                    💑 Spouse
                </button>
            </div>
        `;
        html += `</div>`;
    }

    return html;
}

// Recursively generate tree HTML
function generateTreeHTML(person, processedIds = new Set()) {
    if (processedIds.has(person.id)) return '';
    processedIds.add(person.id);

    let html = '<li>';
    html += generatePersonCard(person);

    // Display single spouse
    if (person.spouse && !processedIds.has(person.spouse.id)) {
        processedIds.add(person.spouse.id);
        html += '<span class="spouse-line"></span>';
        html += generatePersonCard(person.spouse);
    }

    // Display multiple spouses (if person has 2+ spouses)
    if (person.spouses && person.spouses.length > 0) {
        person.spouses.forEach(spouse => {
            if (!processedIds.has(spouse.id)) {
                processedIds.add(spouse.id);
                html += '<span class="spouse-line"></span>';
                html += generatePersonCard(spouse);
            }
        });
    }

    if (person.children && person.children.length > 0) {
        html += '<ul>';
        person.children.forEach(child => {
            html += generateTreeHTML(child, processedIds);
        });
        html += '</ul>';
    }

    html += '</li>';
    return html;
}

// Update statistics
function updateStats() {
    const validData = familyData.filter(p => p.name && p.gender);
    const males = validData.filter(p => p.gender && p.gender.toLowerCase() === 'male').length;
    const females = validData.filter(p => p.gender && p.gender.toLowerCase() === 'female').length;

    document.getElementById('totalCount').textContent = `Total Members: ${validData.length}`;
    document.getElementById('maleCount').textContent = `Male: ${males}`;
    document.getElementById('femaleCount').textContent = `Female: ${females}`;
}

// Switch between views
function switchView(view) {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    if (view === 'list') {
        document.getElementById('listView').classList.add('active');
        tabs[0].classList.add('active');
    } else {
        document.getElementById('treeView').classList.add('active');
        tabs[1].classList.add('active');
    }
}

// Search people
function searchPeople() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.person-card');

    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        if (name.includes(query)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Load parents list for dropdown
async function loadParentsList() {
    try {
        const response = await fetch(`${API_URL}/parents`);
        const parents = await response.json();

        const pidSelect = document.getElementById('pid');
        pidSelect.innerHTML = '<option value="">-- Root Person (No Parent) --</option>';
        parents.forEach(parent => {
            pidSelect.innerHTML += `<option value="${parent.id}">${parent.name} (${parent.gender})</option>`;
        });

        // Also load spouse list
        const spouseSelect = document.getElementById('spouse');
        spouseSelect.innerHTML = '<option value="">-- No Spouse --</option>';
        parents.forEach(person => {
            spouseSelect.innerHTML += `<option value="${person.id}">${person.name} (${person.gender})</option>`;
        });
    } catch (error) {
        console.error('Error loading parents:', error);
    }
}

// Handle spouse selection
function handleSpouseSelection() {
    const spouseId = document.getElementById('spouse').value;
    const tagsInput = document.getElementById('tags');

    console.log('🔗 Spouse selected:', spouseId);

    if (!spouseId) {
        tagsInput.value = '';
        return;
    }

    // Find the selected spouse
    const spouse = familyData.find(p => p.id === spouseId);
    console.log('📋 Spouse data:', spouse);

    if (spouse && spouse.tags && spouse.tags.length > 0) {
        // Use the spouse's existing tag
        tagsInput.value = spouse.tags[0];
        console.log('✓ Using existing tag:', spouse.tags[0]);
    } else {
        // Generate a new tag
        const maxTag = familyData
            .filter(p => p.tags && p.tags.length > 0)
            .map(p => p.tags[0])
            .filter(tag => tag.match(/^f\d+$/))
            .map(tag => parseInt(tag.substring(1)))
            .reduce((max, num) => Math.max(max, num), 0);

        const newTag = `f${maxTag + 1}`;
        tagsInput.value = newTag;
        console.log('✓ Generated new tag:', newTag);
    }

    console.log('✓ Spouse linking configured! Tag:', tagsInput.value);
}

// Open add modal
function openAddModal() {
    currentEditId = null;
    document.getElementById('modalTitle').textContent = 'Add New Person';
    document.getElementById('personForm').reset();
    document.getElementById('personId').value = '';
    loadParentsList();
    document.getElementById('personModal').style.display = 'block';
}

// Quick add child to specific parent
async function addChildTo(parentId, parentName) {
    currentEditId = null;
    document.getElementById('modalTitle').textContent = `Add Child to ${parentName}`;
    document.getElementById('personForm').reset();
    document.getElementById('personId').value = '';

    // Load parents list first
    await loadParentsList();

    // Pre-select the parent
    document.getElementById('pid').value = parentId;

    // Highlight the parent field
    const pidField = document.getElementById('pid');
    pidField.style.backgroundColor = '#E3F2FD';
    setTimeout(() => {
        pidField.style.backgroundColor = '';
    }, 2000);

    document.getElementById('personModal').style.display = 'block';

    // Focus on name field
    setTimeout(() => {
        document.getElementById('name').focus();
    }, 100);
}

// Quick add spouse to specific person
async function addSpouseTo(personId, personName) {
    currentEditId = null;
    document.getElementById('modalTitle').textContent = `Add Spouse to ${personName}`;
    document.getElementById('personForm').reset();
    document.getElementById('personId').value = '';

    // Load parents list first
    await loadParentsList();

    // Pre-select the spouse
    document.getElementById('spouse').value = personId;

    // Trigger spouse selection to set up tags
    handleSpouseSelection();

    // Highlight the spouse field
    const spouseField = document.getElementById('spouse');
    spouseField.style.backgroundColor = '#FCE4EC';
    setTimeout(() => {
        spouseField.style.backgroundColor = '';
    }, 2000);

    document.getElementById('personModal').style.display = 'block';

    // Focus on name field
    setTimeout(() => {
        document.getElementById('name').focus();
    }, 100);
}

// Edit person
async function editPerson(id) {
    try {
        const response = await fetch(`${API_URL}/family/${id}`);
        const person = await response.json();

        currentEditId = id;
        document.getElementById('modalTitle').textContent = 'Edit Person';
        document.getElementById('personId').value = person.id;
        document.getElementById('name').value = person.name;
        document.getElementById('gender').value = person.gender;
        document.getElementById('pid').value = person.pid || '';
        document.getElementById('tags').value = person.tags ? person.tags[0] : '';
        document.getElementById('address').value = person.address || '';
        document.getElementById('occupation').value = person.occupation || '';
        document.getElementById('education').value = person.education || '';

        await loadParentsList();

        // Restore parent selection
        document.getElementById('pid').value = person.pid || '';

        // Find and pre-populate spouse based on matching tag
        if (person.tags && person.tags.length > 0) {
            const personTag = person.tags[0];
            const spouse = familyData.find(p =>
                p.id !== person.id &&
                p.tags &&
                p.tags.length > 0 &&
                p.tags[0] === personTag
            );

            if (spouse) {
                document.getElementById('spouse').value = spouse.id;
                console.log('✓ Pre-populated spouse:', spouse.name);
            }
        }

        document.getElementById('personModal').style.display = 'block';
    } catch (error) {
        showError('Failed to load person data');
        console.error('Error:', error);
    }
}

// Delete person
async function deletePerson(id, name) {
    if (!confirm(`Are you sure you want to delete ${name}?\nThis action cannot be undone.`)) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/family/${id}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (result.success) {
            showSuccess(`${name} deleted successfully`);
            loadFamilyData();
            loadParentsList();
        } else {
            showError(result.error || 'Failed to delete person');
        }
    } catch (error) {
        showError('Failed to delete person');
        console.error('Error:', error);
    }
}

// Close modal
function closeModal() {
    document.getElementById('personModal').style.display = 'none';
    document.getElementById('personForm').reset();
    currentEditId = null;
}

// Handle form submission (admin page only)
const personForm = document.getElementById('personForm');
if (personForm) {
    personForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const url = currentEditId ? `${API_URL}/family/${currentEditId}` : `${API_URL}/family`;
        const method = currentEditId ? 'PUT' : 'POST';

        // Log form data for debugging
        console.log('=== Form Submission ===');
        console.log('Method:', method);
        console.log('URL:', url);
        console.log('Form Data:');
        for (let [key, value] of formData.entries()) {
            console.log(`  ${key}: ${value}`);
        }

        try {
            const response = await fetch(url, {
                method: method,
                body: formData
            });

            const result = await response.json();
            console.log('Server response:', result);

            if (result.success) {
                showSuccess(currentEditId ? 'Person updated successfully' : 'Person added successfully');
                closeModal();
                loadFamilyData();
                loadParentsList();
            } else {
                showError(result.error || 'Failed to save person');
            }
        } catch (error) {
            showError('Failed to save person');
            console.error('Error:', error);
        }
    });
}

// Show success message
function showSuccess(message) {
    const alert = document.getElementById('successAlert');
    if (alert) {
        alert.textContent = message;
        alert.style.display = 'block';
        setTimeout(() => {
            alert.style.display = 'none';
        }, 3000);
    } else {
        console.log('Success:', message);
    }
}

// Show error message
function showError(message) {
    const alert = document.getElementById('errorAlert');
    if (alert) {
        alert.textContent = message;
        alert.style.display = 'block';
        setTimeout(() => {
            alert.style.display = 'none';
        }, 5000);
    } else {
        console.error('Error:', message);
    }
}

// Close modal when clicking outside (admin page only)
const personModal = document.getElementById('personModal');
if (personModal) {
    window.onclick = function (event) {
        if (event.target == personModal) {
            closeModal();
        }
    }
}

// Disable admin features when deployed to GitHub Pages (static mode)
function disableAdminFeaturesForStatic() {
    const adminPage = document.getElementById('personForm');
    if (!adminPage) return; // Not on admin page

    // Show prominent notice
    const notice = document.createElement('div');
    notice.style.cssText = 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; margin: 20px; border-radius: 12px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.2);';
    notice.innerHTML = `
        <h3 style="margin: 0 0 10px 0; font-size: 18px;">📖 Read-Only Mode - GitHub Pages</h3>
        <p style="margin: 0 0 15px 0; opacity: 0.9;">This site is deployed statically. Admin features are view-only.</p>
        <div style="background: rgba(255,255,255,0.15); padding: 15px; border-radius: 8px; margin-top: 15px;">
            <p style="margin: 0 0 8px 0; font-weight: bold;">✏️ To Make Changes:</p>
            <ol style="text-align: left; margin: 10px auto; max-width: 400px; line-height: 1.8;">
                <li>Run <code style="background: rgba(0,0,0,0.3); padding: 2px 8px; border-radius: 4px;">node server.js</code> locally</li>
                <li>Edit data in dynamic mode</li>
                <li>Commit and push to GitHub</li>
                <li>Changes appear here automatically!</li>
            </ol>
        </div>
    `;

    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(notice, container.firstChild);
    }

    // Disable all form inputs
    const inputs = document.querySelectorAll('#personForm input, #personForm select, #personForm textarea');
    inputs.forEach(input => {
        input.disabled = true;
        input.style.opacity = '0.6';
        input.style.cursor = 'not-allowed';
    });

    // Disable buttons
    const buttons = document.querySelectorAll('#personForm button, .btn');
    buttons.forEach(button => {
        button.disabled = true;
        button.style.opacity = '0.5';
        button.style.cursor = 'not-allowed';
        button.title = 'Disabled in static mode - Run locally to edit';
    });

    // Override form submission
    const personForm = document.getElementById('personForm');
    if (personForm) {
        personForm.onsubmit = function (e) {
            e.preventDefault();
            alert('⚠️ Cannot save on GitHub Pages\n\nThis is a static site (read-only).\n\nTo make changes:\n1. Run "node server.js" locally\n2. Edit data in dynamic mode\n3. Push to GitHub');
            return false;
        };
    }

    // Disable add buttons
    const addButton = document.querySelector('.add-btn');
    if (addButton) {
        addButton.onclick = function (e) {
            e.preventDefault();
            alert('⚠️ Add feature disabled on GitHub Pages\n\nRun the dynamic server locally to add members.');
            return false;
        };
    }
}
