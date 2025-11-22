# 🚀 Quick Deploy to GitHub Pages

## ⚡ 5-Minute Setup

### **Step 1: Create GitHub Repository**

1. Go to: https://github.com/new
2. Name: `kanagala-family-tree`
3. Public ✅ (required for free Pages)
4. Click "Create repository"

---

### **Step 2: Push Your Code**

Open terminal in project folder and run:

```bash
git init
git add .
git commit -m "Initial commit - Family tree app"
git remote add origin https://github.com/YOUR-USERNAME/kanagala-family-tree.git
git branch -M main
git push -u origin main
```

**Replace `YOUR-USERNAME` with your GitHub username!**

---

### **Step 3: Enable GitHub Pages**

1. Go to repository **Settings**
2. Click **Pages** (left sidebar)
3. Source → Branch: **main**, Folder: **/ (root)**
4. Click **Save**
5. Wait 2 minutes ⏱️

---

### **Step 4: Visit Your Site!**

```
https://YOUR-USERNAME.github.io/kanagala-family-tree/
```

**Done!** 🎉

---

## 📝 Making Changes

### **Edit Locally (Full Features)**

```bash
# Start server
node server.js

# Open http://localhost:3000/admin.html
# Make changes (add/edit/delete)
# Everything saves automatically
```

### **Deploy Changes**

```bash
git add .
git commit -m "Updated family data"
git push origin main
```

**Wait 2 minutes → Changes are live!** ✨

---

## 🎯 What You Get

### **On GitHub Pages (Free!):**
- ✅ Public family tree viewing
- ✅ Search functionality
- ✅ Responsive design
- ✅ Fast global CDN
- ❌ Read-only (no editing online)

### **Locally (Your Computer):**
- ✅ Full editing power
- ✅ Add/Edit/Delete members
- ✅ Upload photos
- ✅ Complete control

---

## 💡 Pro Workflow

```bash
# Daily use:
1. Edit locally with full features
2. git commit when happy
3. git push to update online
4. Family sees updates automatically

# That's it! Simple and powerful 🚀
```

---

## 🆘 Troubleshooting

### **Blank page on GitHub?**
- Wait 2-3 minutes for build
- Hard refresh: **Ctrl+Shift+R**
- Check browser console (F12)

### **Changes not showing?**
- Clear cache and hard refresh
- Wait 2-3 minutes after push
- Check GitHub Actions for build status

### **Can't push to GitHub?**
```bash
# Check remote
git remote -v

# Fix if needed
git remote set-url origin https://github.com/YOUR-USERNAME/REPO.git
```

---

## ✅ Quick Checklist

- [ ] Created GitHub repository (Public)
- [ ] Pushed code successfully
- [ ] Enabled GitHub Pages in Settings
- [ ] Site loads at github.io URL
- [ ] Can see family tree
- [ ] Images load correctly
- [ ] Tested editing locally

**All checked? You're done!** 🎉

---

## 📖 Need More Help?

Read the full guide: **HYBRID_DEPLOYMENT_GUIDE.md**

---

**Your family tree is now online and free forever!** 🌳✨
