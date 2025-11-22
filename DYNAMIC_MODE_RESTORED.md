# ✅ Dynamic Mode Restored!

## 🎉 What Changed

Your family tree application is now back to **fully dynamic** with a Node.js backend!

### **Before (Static):**
- ❌ Read-only JSON file
- ❌ No add/edit/delete features
- ❌ GitHub Pages only

### **After (Dynamic):**
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Image upload support
- ✅ Real-time updates
- ✅ Fully functional admin panel
- ✅ Data saved to details.json automatically

---

## 🚀 How to Run

### **Quick Start (Easiest):**

Double-click: **`START_DYNAMIC_SERVER.bat`**

That's it! Server will start and browser will open.

---

### **Manual Start:**

```bash
# Install dependencies (first time only)
npm install

# Start the server
npm start

# Or with auto-reload on changes
npm run dev
```

Then visit: **http://localhost:3000**

---

## 📍 Access Your Site

| Page | URL | Description |
|------|-----|-------------|
| **Public View** | http://localhost:3000/ | Family tree visualization |
| **Admin Panel** | http://localhost:3000/admin.html | Full management interface |

---

## ✨ What You Can Do Now

### **Add New Family Member**
1. Click "➕ Add New Person"
2. Fill in details (name, gender, parent, etc.)
3. Upload photo (optional)
4. Click Save
5. **Data saves automatically to details.json!**

### **Edit Existing Member**
1. Find person in list or tree
2. Click "✏️ Edit" button
3. Modify details
4. Upload new photo (replaces old)
5. Click Save

### **Delete Member**
1. Click "🗑️ Delete" button
2. Confirm deletion
3. Person and their photo are removed

### **Quick Actions in Tree View**
- Hover over any person in tree
- Click "➕ Child" to add child
- Click "💑 Spouse" to add spouse
- Modal opens with parent/spouse pre-selected!

---

## 🗂️ Files Restored

| File | Purpose |
|------|---------|
| `server.js` | Express backend API server |
| `package.json` | Node.js dependencies |
| `app.js` | Updated to use API endpoints |
| `node_modules/` | Dependencies (auto-installed) |

---

## 🔧 How It Works

### **Architecture:**

```
Browser (frontend)
    ↓
  app.js (makes API calls)
    ↓
  server.js (Express API)
    ↓
  details.json (data storage)
    ↓
  images/kanagala/ (photos)
```

### **API Endpoints:**

```
GET    /api/family           → Get all members
GET    /api/family/:id       → Get single member
POST   /api/family           → Add new member
PUT    /api/family/:id       → Update member
DELETE /api/family/:id       → Delete member
GET    /api/parents          → Get parent list
GET    /api/tags             → Get existing tags
```

---

## 📝 Data Flow Example

### Adding a New Person:

1. **User fills form** in admin panel
2. **app.js** sends POST request with FormData
3. **server.js** receives request:
   - Generates new ID
   - Saves uploaded image
   - Updates details.json
4. **Response sent** back to app.js
5. **Page refreshes** with new data
6. **Success message** shown

---

## 💾 Data Storage

### **details.json Structure:**

```json
{
  "kanagala": [
    {
      "id": "1",
      "name": "Person Name",
      "gender": "Male",
      "pid": "parent_id",
      "tags": ["f1"],
      "address": "City",
      "occupation": "Job",
      "education": "Degree",
      "img": "./images/kanagala/photo.jpg"
    }
  ]
}
```

- **Automatic backups**: Consider backing up details.json regularly
- **Image storage**: Photos stored in `images/kanagala/` folder
- **Max file size**: 5MB per image

---

## 🛑 Stopping the Server

Press **Ctrl+C** in the terminal/command window where server is running.

Or:
```bash
# Find the process
netstat -ano | findstr :3000

# Kill it (replace PID with actual number)
taskkill /F /PID <PID>
```

---

## 🔄 Future Development Options

You have two deployment options now:

### **Option 1: Keep Dynamic (Local/VPS)**
- ✅ Full functionality
- ✅ Add/Edit/Delete works
- ❌ Requires server hosting (costs money)
- ❌ Can't use free GitHub Pages

### **Option 2: Deploy Static (GitHub Pages)**
- ✅ Free hosting
- ✅ Easy to deploy
- ❌ Read-only (view only)
- ❌ Edit details.json manually

**Choose based on your needs!**

---

## 🎓 Development Tips

### **Auto-reload on changes:**
```bash
npm install -g nodemon
nodemon server.js
```

### **Different port:**
Edit `server.js` line 7:
```javascript
const PORT = 3001; // Change to any port
```

### **Add authentication:**
Consider adding login/password for admin panel in production.

### **Backup data:**
```bash
copy details.json details.backup.json
```

---

## 📚 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.18.2 | Web server framework |
| multer | ^1.4.5 | File upload handling |
| cors | ^2.8.5 | Cross-origin requests |
| nodemon | ^3.0.1 | Auto-reload (dev) |

---

## ✅ Verification Checklist

Test these to ensure everything works:

- [ ] Server starts without errors
- [ ] http://localhost:3000 loads family tree
- [ ] Admin panel accessible
- [ ] Can add new person
- [ ] Can edit existing person
- [ ] Can delete person
- [ ] Photos upload correctly
- [ ] Quick actions work in tree view
- [ ] Data persists after server restart

---

## 🆘 Troubleshooting

### **Port 3000 in use:**
```bash
# Kill existing process
taskkill /F /PID <PID>
```

### **Module not found:**
```bash
# Reinstall dependencies
npm install
```

### **Images not loading:**
- Check `images/kanagala/` folder exists
- Verify file permissions
- Check image paths in details.json

### **Data not saving:**
- Ensure details.json is writable
- Check server console for errors
- Verify JSON is valid

---

## 🎉 Summary

**Your family tree is now FULLY DYNAMIC!**

✅ Backend API server running
✅ Full CRUD operations working
✅ Image uploads enabled
✅ Real-time data updates
✅ Admin panel functional

**Start building your family tree with full management features!** 🌳✨
