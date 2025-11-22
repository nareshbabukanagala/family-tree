const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = './details.json';
const UPLOAD_DIR = './images/kanagala';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve all files in current directory

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Ensure upload directory exists
        if (!fs.existsSync(UPLOAD_DIR)) {
            fs.mkdirSync(UPLOAD_DIR, { recursive: true });
        }
        cb(null, UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed!'));
    }
});

// Read data from JSON file
function readData() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData.kanagala || jsonData.members || jsonData;
    } catch (error) {
        console.error('Error reading data:', error);
        return [];
    }
}

// Write data to JSON file
function writeData(data) {
    try {
        const jsonData = { kanagala: data };
        fs.writeFileSync(DATA_FILE, JSON.stringify(jsonData, null, 4));
        return true;
    } catch (error) {
        console.error('Error writing data:', error);
        return false;
    }
}

// Generate new ID
function generateId() {
    const data = readData();
    if (data.length === 0) return '1';
    const maxId = Math.max(...data.map(p => parseInt(p.id) || 0));
    return String(maxId + 1);
}

// API Routes

// Get all family members
app.get('/api/family', (req, res) => {
    const data = readData();
    res.json(data);
});

// Get single family member
app.get('/api/family/:id', (req, res) => {
    const data = readData();
    const person = data.find(p => p.id === req.params.id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).json({ error: 'Person not found' });
    }
});

// Get list of all members for parent selection
app.get('/api/parents', (req, res) => {
    const data = readData();
    const parents = data.map(p => ({
        id: p.id,
        name: p.name,
        gender: p.gender
    }));
    res.json(parents);
});

// Get all existing tags
app.get('/api/tags', (req, res) => {
    const data = readData();
    const tags = new Set();
    data.forEach(p => {
        if (p.tags && Array.isArray(p.tags)) {
            p.tags.forEach(tag => tags.add(tag));
        }
    });
    res.json(Array.from(tags).sort());
});

// Add new family member
app.post('/api/family', upload.single('photo'), (req, res) => {
    try {
        const data = readData();
        const newPerson = {
            id: generateId(),
            name: req.body.name,
            gender: req.body.gender,
            pid: req.body.pid || undefined,
            tags: req.body.tags ? [req.body.tags] : [],
            address: req.body.address || '',
            occupation: req.body.occupation || '',
            education: req.body.education || ''
        };

        // Add image path if uploaded
        if (req.file) {
            newPerson.img = `./images/kanagala/${req.file.filename}`;
        }

        // Remove undefined fields
        Object.keys(newPerson).forEach(key => {
            if (newPerson[key] === undefined || newPerson[key] === '') {
                delete newPerson[key];
            }
        });

        data.push(newPerson);

        if (writeData(data)) {
            res.json({ success: true, person: newPerson });
        } else {
            res.status(500).json({ success: false, error: 'Failed to save data' });
        }
    } catch (error) {
        console.error('Error adding person:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update family member
app.put('/api/family/:id', upload.single('photo'), (req, res) => {
    try {
        const data = readData();
        const index = data.findIndex(p => p.id === req.params.id);

        if (index === -1) {
            return res.status(404).json({ success: false, error: 'Person not found' });
        }

        const existingPerson = data[index];

        // Update fields
        const updatedPerson = {
            ...existingPerson,
            name: req.body.name || existingPerson.name,
            gender: req.body.gender || existingPerson.gender,
            pid: req.body.pid || undefined,
            tags: req.body.tags ? [req.body.tags] : existingPerson.tags || [],
            address: req.body.address || '',
            occupation: req.body.occupation || '',
            education: req.body.education || ''
        };

        // Update image if new one uploaded
        if (req.file) {
            // Delete old image if exists
            if (existingPerson.img) {
                const oldImagePath = path.join(__dirname, existingPerson.img);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updatedPerson.img = `./images/kanagala/${req.file.filename}`;
        }

        // Remove undefined fields
        Object.keys(updatedPerson).forEach(key => {
            if (updatedPerson[key] === undefined || updatedPerson[key] === '') {
                delete updatedPerson[key];
            }
        });

        data[index] = updatedPerson;

        if (writeData(data)) {
            res.json({ success: true, person: updatedPerson });
        } else {
            res.status(500).json({ success: false, error: 'Failed to save data' });
        }
    } catch (error) {
        console.error('Error updating person:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Delete family member
app.delete('/api/family/:id', (req, res) => {
    try {
        const data = readData();
        const index = data.findIndex(p => p.id === req.params.id);

        if (index === -1) {
            return res.status(404).json({ success: false, error: 'Person not found' });
        }

        const person = data[index];

        // Delete associated image
        if (person.img) {
            const imagePath = path.join(__dirname, person.img);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        data.splice(index, 1);

        if (writeData(data)) {
            res.json({ success: true, message: 'Person deleted successfully' });
        } else {
            res.status(500).json({ success: false, error: 'Failed to save data' });
        }
    } catch (error) {
        console.error('Error deleting person:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log('=================================');
    console.log(`🌳 Family Tree Server Running`);
    console.log('=================================');
    console.log(`📍 Local: http://localhost:${PORT}`);
    console.log(`📁 Data file: ${DATA_FILE}`);
    console.log(`🖼️  Images: ${UPLOAD_DIR}`);
    console.log('=================================');
    console.log('Press Ctrl+C to stop');
});
