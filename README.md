# 🌳 Kanagala Family Tree

A beautiful, interactive family tree visualization system with **smart hybrid deployment** - edit locally with full features, deploy to GitHub Pages for free public viewing!

## ✨ Key Features

### **🎯 Smart Hybrid System**
- 🔧 **Dynamic Mode** (Local): Full add/edit/delete capabilities
- 📖 **Static Mode** (GitHub Pages): Free public hosting, read-only
- 🤖 **Auto-Detection**: Same code works everywhere - no manual switching!

### **Core Features**
- 📊 **Interactive Tree View**: Visual family tree with hierarchical relationships
- 📝 **Admin Panel**: Full family management interface
- 🖼️ **Photo Support**: Upload and display family photos
- 💑 **Spouse Relationships**: Automatic spouse pairing and display
- 👶 **Quick Actions**: Hover buttons to add children/spouses directly from tree
- 🔍 **Search & Browse**: Find family members easily
- 📱 **Responsive Design**: Works perfectly on all devices
- 🎨 **Modern UI**: Clean, intuitive interface

## 🚀 Quick Start

### View the Live Site

Visit the family tree at:
```
https://YOUR-USERNAME.github.io/kanagala-family-tree/
```

### Deploy Your Own

1. **Fork this repository**
2. **Go to Settings → Pages**
3. **Select "main" branch** and save
4. **Your site will be live in 2-3 minutes!**

📖 **Detailed deployment guide**: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 📁 Project Structure

```
├── index.html          # Public family tree view
├── admin.html          # Admin panel (read-only)
├── app.js              # Application logic
├── details.json        # Family data
├── images/
│   └── kanagala/       # Family photos
└── DEPLOYMENT_GUIDE.md # Deployment instructions
```

---

## 🔧 Customization

### Update Family Data

1. Edit `details.json` to add/modify family members
2. Add photos to `images/kanagala/` folder
3. Commit and push to GitHub
4. Site updates automatically!

### Change Colors

Edit CSS in HTML files:
- Male: `#2196F3` (Blue)
- Female: `#E91E63` (Pink)

---

## 📊 Data Format

Each family member in `details.json`:

```json
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
```

**Key Fields:**
- `pid` - Parent's ID (creates hierarchy)
- `tags` - Spouse matching (same tag = married)
- `img` - Photo path

---

## ⚠️ Important Notes

### GitHub Pages = Static Only

This site is **READ-ONLY** on GitHub Pages:
- ✅ View family tree
- ✅ Search members
- ✅ Browse photos
- ❌ Add new members (edit `details.json` instead)
- ❌ Upload photos (add to `images/` folder)
- ❌ Delete members (edit `details.json` instead)

To update: Edit files locally → Commit → Push → Auto-updates!

---

## 🎯 Common Tasks

### Add New Member

1. Edit `details.json`:
```json
{
  "id": "999",
  "name": "New Person",
  "gender": "Male",
  "pid": "10",
  "tags": [],
  "img": "./images/kanagala/newperson.jpg"
}
```

2. Add photo to `images/kanagala/`
3. Push changes

### Mark as Spouses

Give both people the same tag:
```json
{ "id": "10", "tags": ["f5"] }
{ "id": "11", "tags": ["f5"] }
```

---

## 🆘 Troubleshooting

**Site not loading?**
- Wait 2-3 minutes after enabling GitHub Pages
- Check Settings → Pages shows "Your site is live"
- Try incognito mode

**Images not showing?**
- Verify paths in `details.json` start with `./images/`
- Ensure images are pushed to GitHub
- Check file names match exactly (case-sensitive)

**Data not updating?**
- Clear browser cache (Ctrl + Shift + R)
- Verify `details.json` is valid JSON
- Check GitHub Actions for errors

---

## 📖 Documentation

- 📘 [Full Deployment Guide](DEPLOYMENT_GUIDE.md)
- 🔧 [GitHub Pages Docs](https://pages.github.com/)
- 💡 [JSON Validator](https://jsonlint.com/)

---

## 🤝 Contributing

1. Fork the repository
2. Make your changes
3. Test locally
4. Submit a pull request

---

## 📄 License

MIT License - Free to use for personal family trees

---

## 🎉 Credits

**Made with ❤️ for the Kanagala Family**

Built using:
- Pure JavaScript (no frameworks!)
- CSS3 for beautiful styling
- GitHub Pages for free hosting

---

## 📞 Support

Need help? Create an issue on GitHub!

**Happy Family Tree Building! 🌳👨‍👩‍👧‍👦**
