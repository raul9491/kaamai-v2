# AI Provider Setup - Gemini (Free) → Claude (Production)

## ✅ What I've Done

Created a **flexible AI service** that supports both:
- 🆓 **Gemini 2.0 Flash** (Free for demo/testing)
- 💰 **Claude Haiku 4.5** (Paid for production)

Switch between them with **one environment variable**!

---

## 🚀 Quick Start - Use Gemini (FREE)

### Step 1: Get Free Gemini API Key

1. Go to: https://ai.google.dev
2. Click "Get API Key in Google AI Studio"
3. Sign in with Google account
4. Click "Create API Key"
5. Copy the key (starts with `AIza...`)

### Step 2: Add to .env File

Open `server/.env` and add your key:

```env
AI_PROVIDER=gemini
GEMINI_API_KEY=AIzaSyC...your_actual_key_here
```

### Step 3: Start Server

```bash
cd server
node index.js
```

You should see:
```
🚀 ========================================
   KAAMAI Backend Server
   ========================================
   ✅ Running on: http://localhost:3002
   🤖 AI Provider: Gemini 2.0 Flash (Google)
   🔑 API Status: ✓ Configured
   💰 Cost: Free tier available
   ========================================
```

**Done! You're now using FREE Gemini for testing!** 🎉

---

## 💼 Switch to Claude (Production)

When ready to go live with better quality:

### Step 1: Get Claude API Key

1. Go to: https://console.anthropic.com
2. Sign up / Log in
3. Go to "API Keys"
4. Create new key
5. Add credits ($10 minimum)

### Step 2: Update .env

```env
AI_PROVIDER=claude
ANTHROPIC_API_KEY=sk-ant-...your_key_here
```

### Step 3: Restart Server

```bash
node index.js
```

You should see:
```
🤖 AI Provider: Claude Haiku 4.5 (Anthropic)
💰 Cost: Paid ($0.80/$4 per 1M tokens)
```

**That's it! Now using Claude for production!** 🚀

---

## 🔄 Switching Between Providers

Just change ONE line in `.env`:

```env
# Use Gemini (Free)
AI_PROVIDER=gemini

# OR use Claude (Paid, better quality)
AI_PROVIDER=claude
```

Restart the server after changing.

---

## 📊 Cost Comparison

### Gemini 2.0 Flash (FREE Tier):
```
Free quota: 15 requests/minute
            1,500 requests/day

Perfect for:
- Demo/testing
- Initial launch
- Low traffic (<1000 users/day)

Pros:
✓ Completely free
✓ Very fast
✓ Good quality

Cons:
✗ Rate limits (15/min)
✗ Slightly lower quality than Claude
```

### Claude Haiku 4.5 (PAID):
```
Cost: $0.80 input / $4.00 output per 1M tokens

1000 users/month = ~$15-32/month
10,000 users/month = ~$150-320/month

Perfect for:
- Production
- High traffic
- Best quality output

Pros:
✓ Best quality
✓ No hard rate limits
✓ Better for complex tasks

Cons:
✗ Costs money (but very affordable)
```

---

## 🎯 Recommended Strategy

### Phase 1: Launch with Gemini (Week 1-2)
```env
AI_PROVIDER=gemini
```
- Launch publicly
- Get initial users
- Test everything works
- **Cost: $0** 🎉

### Phase 2: Monitor Usage
- Check Gemini quota usage
- If hitting rate limits (15/min), consider upgrading
- If quality issues, switch to Claude

### Phase 3: Switch to Claude (When Profitable)
```env
AI_PROVIDER=claude
```
- Once you have 100+ paying users
- Revenue > $200/month
- API costs = $20-30/month
- **Still 90%+ profit margin!**

---

## 🧪 Testing Both Providers

You can configure BOTH keys:

```env
AI_PROVIDER=gemini  # Current provider

GEMINI_API_KEY=AIza...
ANTHROPIC_API_KEY=sk-ant-...  # Ready for switch
```

Then just change `AI_PROVIDER` to switch instantly!

---

## 📝 Current Configuration

Check your current setup:
```bash
curl http://localhost:3002/api/health
```

Response shows:
```json
{
  "status": "ok",
  "ai": {
    "provider": "gemini",
    "model": "gemini-2.0-flash-exp",
    "configured": true
  }
}
```

---

## ⚠️ Important Notes

1. **Gemini Free Tier Limits:**
   - 15 requests/minute
   - 1,500 requests/day
   - If exceeded, you'll get rate limit errors

2. **Quality Differences:**
   - Gemini: Very good, fast, free
   - Claude: Slightly better for nuanced tasks
   - Both work great for your use case!

3. **Same Prompts Work for Both:**
   - Your prompts are provider-agnostic
   - No code changes needed to switch
   - Quality stays consistent

4. **Cost Management:**
   - Start with Gemini (free)
   - Monitor usage
   - Upgrade to Claude when revenue supports it
   - Both have 95%+ profit margins

---

## 🎯 Next Steps

1. ✅ Get Gemini API key (free)
2. ✅ Add to `server/.env`
3. ✅ Start server and test
4. ✅ Launch your demo!
5. 📈 Monitor usage
6. 💰 Switch to Claude when ready

---

**You're all set! Start with FREE Gemini, upgrade to Claude when profitable!** 🚀
