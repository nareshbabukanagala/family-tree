# 🧪 How to Test Locally - Step by Step

## ⚠️ Why "Failed to fetch" Error Happens

You're seeing this error because you opened the HTML file **directly** (file://) instead of through a web server (http://).

**Browsers block fetch requests to local files for security reasons!**

---

## ✅ **EASY SOLUTION - 3 Options**

### **Option 1: Double-Click Batch File** (Easiest!) ⭐

1. Find `START_LOCAL_SERVER.bat` in your project folder
2. **Double-click it**
3. A server will start and browser will open automatically
4. Done! ✅

**To stop:** Press Ctrl+C in the command window

---

### **Option 2: Using VS Code Live Server** (If you use VS Code) ⭐

1. Open VS Code
2. Install extension: "Live Server" by Ritwick Dey
3. Right-click `index.html` in explorer
4. Select **"Open with Live Server"**
5. Browser opens automatically at http://127.0.0.1:5500/
6. Done! ✅

---

### **Option 3: Manual Command** (Advanced)

#### If you have Node.js:
```bash
# Open PowerShell in project folder
npx http-server -p 8080

# Then open browser:
http://localhost:8080/
```

#### If you have Python:
```bash
# Open PowerShell in project folder
python -m http.server 8080

# Then open browser:
http://localhost:8080/
```

---

## 🎯 **Which Option Should I Use?**

| Method | Best For | Difficulty |
|--------|----------|------------|
| Batch File | Quick testing | ⭐ Easy |
| VS Code Live Server | Regular development | ⭐ Easy |
| Manual Command | Advanced users | ⭐⭐ Medium |

---

## 🚫 **What NOT to Do**

❌ **DON'T:** Double-click `index.html` directly  
❌ **DON'T:** Open with File → Open in browser  
❌ **DON'T:** Use file:// URLs

✅ **DO:** Use a local web server (http://)

---

## 🔍 **How to Know It's Working**

### Check the URL in your browser:

❌ **Wrong (Won't Work):**
```
file:///C:/ftree/eastkambhampadufamily-master/index.html
```

✅ **Correct (Will Work):**
```
http://localhost:8080/index.html
```

---

## 📋 **Step-by-Step Visual Guide**

### Windows Explorer Method:

```
1. Navigate to your project folder:
   C:\ftree\eastkambhampadufamily-master\eastkambhampadufamily-master

2. Look for this file:
   📄 START_LOCAL_SERVER.bat

3. Double-click it

4. Command window opens:
   ┌─────────────────────────────┐
   │ Starting Local Web Server   │
   │ Press Ctrl+C to stop       │
   │ Serving at http://...      │
   └─────────────────────────────┘

5. Browser opens automatically showing your family tree! ✅
```

---

## 🛠️ **Troubleshooting**

### Issue: "Node.js/Python not found"

**Solution:** Install one of these:

**Option A: Node.js** (Recommended)
1. Download: https://nodejs.org/
2. Install (use all defaults)
3. Restart computer
4. Try again

**Option B: Python**
1. Download: https://www.python.org/downloads/
2. Install - **Check "Add to PATH"** during install!
3. Restart computer
4. Try again

---

### Issue: "Port 8080 already in use"

**Solution:** 
1. Close other servers
2. Or change port in batch file (edit 8080 to 8081)

---

### Issue: "Browser doesn't open automatically"

**Solution:**
1. Keep the command window running
2. Manually open browser
3. Go to: http://localhost:8080/

---

## 🎓 **Understanding the Problem**

### Why does this happen?

Modern browsers have **CORS (Cross-Origin Resource Sharing)** security that blocks:
- Loading JSON files from file://
- Fetching data without a server
- Cross-origin requests

**The fix:** Use a local web server (http://) instead!

### What does the server do?

- Serves your files over HTTP protocol
- Allows fetch/AJAX requests
- Mimics real web hosting
- Required for testing before GitHub Pages deploy

---

## ✅ **Success Checklist**

Before saying "it works":

- [ ] Opened via http:// (not file://)
- [ ] Browser URL shows localhost:8080
- [ ] Family tree loads and displays
- [ ] Can see photos
- [ ] No errors in console (F12)
- [ ] Loading message disappears

---

## 🚀 **After Testing Works Locally**

Once your local test succeeds:

1. ✅ Commit all changes to Git
2. ✅ Push to GitHub
3. ✅ Enable GitHub Pages
4. ✅ Wait 2-3 minutes
5. ✅ Your site is live! 🎉

---

## 📞 **Quick Reference Commands**

### Start Server:
- **Easy:** Double-click `START_LOCAL_SERVER.bat`
- **VS Code:** Right-click → "Open with Live Server"
- **Node:** `npx http-server -p 8080`
- **Python:** `python -m http.server 8080`

### Stop Server:
- Press **Ctrl+C** in command window
- Or close the command window

### Test URLs:
- Main page: http://localhost:8080/
- Admin: http://localhost:8080/admin.html
- Test: http://localhost:8080/test-local.html

---

**Now try Option 1 (batch file) - it's the easiest!** 🚀✅
