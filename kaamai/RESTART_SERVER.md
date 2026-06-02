# 🔄 Restart Server to Use Gemini

## The old server is still running. Follow these steps:

### Option 1: Use Task Manager (Easiest)

1. Press `Ctrl + Shift + Esc`
2. Find "Node.js: Server-side JavaScript"
3. Right-click → "End Task"
4. Double-click: `start-kaamai.bat` in the kaamai folder

### Option 2: Command Line

```bash
# Open PowerShell as Administrator and run:
taskkill /F /IM node.exe

# Then start servers:
cd c:\Users\Rahul\Downloads\kaamai-v2\kaamai
.\start-kaamai.bat
```

### ✅ Verify It's Working

After restart, check:

```bash
curl http://localhost:3002/api/health
```

**Expected response:**
```json
{
  "status": "ok",
  "message": "KaamAI server running",
  "ai": {
    "provider": "gemini",
    "model": "gemini-2.0-flash-exp",
    "configured": true
  }
}
```

You should see:
- ✓ provider: "gemini"
- ✓ configured: true

---

## 🧪 Test Gemini Generation

After restart, test with this:

```bash
curl -X POST http://localhost:3002/api/generate \
  -H "Content-Type: application/json" \
  -d "{\"moduleId\": \"student\", \"taskId\": \"explain\", \"formData\": {\"topic\": \"Gravity\", \"class\": \"Class 9\", \"subject\": \"Physics\", \"language\": \"Simple English\"}}"
```

Should return an explanation of gravity!
