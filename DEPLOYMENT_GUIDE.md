# 🚀 GitHub Pages Deployment Guide

## Kanagala Family Tree - Static Site

This family tree application has been optimized for **free deployment on GitHub Pages**.

---

## 📦 What's Included

- ✅ `index.html` - Public family tree view
- ✅ `admin.html` - Admin view (read-only on GitHub Pages)
- ✅ `app.js` - Application logic (static mode)
- ✅ `details.json` - Family data
- ✅ `images/` - Family photos
- ✅ `README.md` - Project documentation

---

## 🌐 Deploy to GitHub Pages (FREE!)

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click **"New Repository"**
3. Name it: `kanagala-family-tree` (or any name)
4. Make it **Public** (required for free GitHub Pages)
5. Click **"Create repository"**

### Step 2: Upload Your Files

**Option A: Using Git Command Line**
```bash
cd c:\ftree\eastkambhampadufamily-master\eastkambhampadufamily-master
git init
git add .
git commit -m "Initial commit - Family tree static site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/kanagala-family-tree.git
git push -u origin main
```

**Option B: Using GitHub Desktop**
1. Download [GitHub Desktop](https://desktop.github.com/)
2. File → Add Local Repository
3. Select this folder
4. Publish to GitHub

**Option C: Upload via Web**
1. On GitHub repository page, click "uploading an existing file"
2. Drag all files from this folder
3. Commit changes

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **"Pages"** in left sidebar
4. Under **"Source"**, select **"main"** branch
5. Click **Save**
6. Wait 2-3 minutes for deployment

### Step 4: Access Your Site

Your site will be live at:
```
https://YOUR-USERNAME.github.io/kanagala-family-tree/
```

**Public View:**
```
https://YOUR-USERNAME.github.io/kanagala-family-tree/
```

**Admin View (Read-Only):**
```
https://YOUR-USERNAME.github.io/kanagala-family-tree/admin.html
```

---

## ⚠️ Important Notes

### Read-Only on GitHub Pages

GitHub Pages only hosts **static sites** (HTML, CSS, JavaScript). It cannot:
- ❌ Save data (no backend server)
- ❌ Upload images
- ❌ Add/Edit/Delete members

**The admin page is READ-ONLY for viewing purposes only.**

### To Update Family Data

1. **Edit `details.json` locally** on your computer
2. **Add images** to `images/kanagala/` folder
3. **Commit and push** changes to GitHub
4. GitHub Pages will **auto-update** in 1-2 minutes

---

## 🔄 Updating Your Site

### Add New Family Member

1. Edit `details.json` locally:
```json
{
    "id": "235",
    "name": "New Person",
    "gender": "Male",
    "pid": "10",
    "tags": [],
    "address": "City",
    "occupation": "Job",
    "education": "Degree",
    "img": "./images/kanagala/photo.jpg"
}
```

2. Add photo to `images/kanagala/` folder

3. Push changes:
```bash
git add .
git commit -m "Added new family member"
git push
```

### Update Existing Member

1. Find member in `details.json` by name or ID
2. Edit their details
3. Commit and push changes

---

## 📁 Project Structure

```
kanagala-family-tree/
├── index.html          # Main public view
├── admin.html          # Admin view (read-only)
├── app.js              # Application logic
├── details.json        # Family data
├── images/
│   └── kanagala/       # Family photos
└── README.md           # This file
```

---

## 🎨 Customization

### Change Colors

Edit CSS in `index.html` or `admin.html`:
- Male color: `#2196F3` (blue)
- Female color: `#E91E63` (pink)

### Update Title

Edit the `<h1>` tag in `index.html`:
```html
<h1>Your Family Name - Family Tree</h1>
```

---

## 🆘 Troubleshooting

### Site Not Loading?
- Wait 2-3 minutes after enabling GitHub Pages
- Check Settings → Pages shows green "Your site is live" message
- Try incognito/private browsing mode

### Images Not Showing?
- Verify image paths in `details.json` start with `./images/`
- Ensure images are committed and pushed to GitHub
- Check image file names match exactly (case-sensitive)

### Data Not Updating?
- Clear browser cache (Ctrl + Shift + R)
- Verify `details.json` is valid JSON (use [JSONLint](https://jsonlint.com/))
- Check GitHub Actions tab for deployment errors

---

## 📞 Support

For issues or questions:
1. Check existing issues on GitHub
2. Create a new issue with:
   - Description of problem
   - Screenshots if applicable
   - Browser and device info

---

## 🎉 Success!

Your family tree is now **live and accessible worldwide** for FREE! 

Share your URL with family members:
```
https://YOUR-USERNAME.github.io/kanagala-family-tree/
```

---

## 📄 License

This project is open source and available for personal use.

---

**Made with ❤️ for the Kanagala Family**
