# How to Properly Restart KaamAI

## Current Problem
Multiple server instances are running on different ports, causing conflicts.

## Solution: Clean Restart

### Step 1: Stop All Running Servers

**Option A - Using Task Manager (Recommended for Windows):**
1. Press `Ctrl + Shift + Esc` to open Task Manager
2. Find all processes named "Node.js: Server-side JavaScript"
3. Right-click each one and select "End Task"
4. Also end any "vite" or "npm" processes

**Option B - Using Command Line:**
```bash
# In Git Bash or PowerShell
taskkill //F //IM node.exe
```

### Step 2: Verify Ports Are Free
```bash
netstat -ano | findstr ":5174 :3002"
```
Should return no results.

### Step 3: Start Backend Server
```bash
cd c:\Users\Rahul\Downloads\kaamai-v2\kaamai\server
node index.js
```

**Expected Output:**
```
🚀 ========================================
   KAAMAI Backend Server
   ========================================
   ✅ Running on: http://localhost:3002
   ...
```

### Step 4: Start Frontend Server (New Terminal)
```bash
cd c:\Users\Rahul\Downloads\kaamai-v2\kaamai
npm run dev
```

**Expected Output:**
```
VITE v5.4.21  ready in XXX ms

➜  Local:   http://localhost:5174/
```

### Step 5: Open in Browser
Navigate to: **http://localhost:5174**

Then press `Ctrl + Shift + R` to hard refresh.

---

## Debugging - Check Browser Console

1. Open browser DevTools (F12)
2. Go to "Console" tab
3. Look for these messages:
   - `🚀 KaamAI main.jsx loading...`
   - `✅ React app mounted successfully!`
   - `🏠 Home component rendering...`

If you see errors, copy and paste them.

---

## Still Not Working?

Check:
1. **JavaScript enabled** in browser
2. **No ad blockers** blocking scripts  
3. **Browser console** for errors (F12 → Console tab)
4. Try a different browser (Chrome/Edge)
