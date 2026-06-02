# KaamAI Product Strategy & Cost Optimization

## 🚨 Ethical Messaging - UPDATED

### ❌ Previous (Misleading):
- "Made in India" → Implies the AI is made in India (false)

### ✅ New (Honest):
- "Built for India" → Platform designed for Indian users (true)
- AI = Claude by Anthropic (US) - We're transparent about this
- Product, prompts, curation = Made in India

---

## 📄 Document Upload Feature Analysis

### Current State:
- Users can only **paste text** into forms
- No PDF, image, or document upload

### Adding Document Upload:

#### Option 1: Basic Document Support (Recommended)
**What to add:**
- PDF upload (max 5 pages)
- Image upload (screenshots, photos)
- Text extraction from documents

**Cost Impact:**
```
Current: ~500-800 tokens per request (Haiku)
With docs: 2,000-5,000 tokens per request

Cost per 1M tokens:
- Input: $0.80 (Haiku 4.5)
- Output: $4.00 (Haiku 4.5)

Example:
- 1000 users/day with docs = ~3M tokens/month = $2.40/month
- Still very affordable!
```

**Implementation:**
```javascript
// Add to form fields:
{ 
  id: 'document', 
  label: 'Upload document (optional)', 
  type: 'file',
  accept: '.pdf,.jpg,.png',
  maxSize: '5MB',
  required: false 
}
```

#### Option 2: Premium Document Feature
**Strategy:**
- Free tier: Text paste only
- Paid tier: + Document upload (5 pages/request)
- Premium tier: + Document upload (20 pages/request)

---

## 💰 Cost Optimization Strategies

### 1. Model Selection (Already Optimized ✅)
You're using **claude-haiku-4.5-20251001** = Cheapest & fastest
```
Haiku: $0.80 input / $4.00 output per 1M tokens
Sonnet: $3.00 input / $15.00 output per 1M tokens (4x more expensive)
```
**Keep using Haiku** unless you need more complex reasoning.

### 2. Prompt Caching (Save 90% on costs!)
```javascript
// Add caching to system prompts (they don't change often)
const message = await client.messages.create({
  model: 'claude-haiku-4-5-20251001',
  max_tokens: 1500,
  system: [
    {
      type: "text",
      text: systemPrompt,
      cache_control: { type: "ephemeral" }  // ← Cache this!
    }
  ],
  messages: [{ role: 'user', content: userPrompt }]
})

// Savings: 90% off cached system prompts!
```

### 3. Character Limits
```javascript
// Add to each field:
maxLength: {
  textarea: 2000 characters,
  text: 200 characters
}
// Prevents abuse, controls costs
```

### 4. Rate Limiting
```javascript
// Per user per day:
Free tier: 3 requests/module
Paid tier: Unlimited, but max 50/day per module
```

### 5. Document Page Limits
```javascript
// If adding document upload:
Free: No documents (paste only)
₹49 plan: 3 pages max
₹99 plan: 10 pages max
₹199 plan: 20 pages max
```

---

## 📊 Estimated Monthly Costs

### Current Setup (No Documents):
```
Assumptions:
- 1,000 active users/month
- Average 5 requests/user
- ~600 tokens/request

Calculation:
5,000 requests × 600 tokens = 3M tokens
Input: 3M × $0.80/1M = $2.40
Output: 3M × $4.00/1M = $12.00
Total: ~$15/month for 1,000 users
```

### With Document Upload:
```
Assumptions:
- 30% of users upload docs
- Average 3,000 tokens/request with docs

Calculation:
3,500 text requests × 600 tokens = 2.1M tokens
1,500 doc requests × 3,000 tokens = 4.5M tokens
Total: 6.6M tokens

Input: 6.6M × $0.80/1M = $5.28
Output: 6.6M × $4.00/1M = $26.40
Total: ~$32/month for 1,000 users
```

**Still very affordable!** Even 10,000 users = ~$320/month

---

## 🎯 Recommended Strategy

### Phase 1 (Current - Week 1-2):
✅ Text-only input (already built)
✅ Free tier: 3 tries/module
✅ Paid tier: Unlimited

### Phase 2 (Week 3-4):
📄 Add document upload for paid users only:
- Free: Text paste only
- ₹49/99 plans: Upload docs (3 pages max)
- ₹199 plan: Upload docs (10 pages max)

### Phase 3 (Month 2):
🚀 Add prompt caching (save 90%)
🚀 Add image support (for Doctor, Advocate modules)
🚀 Add chat history (conversation context)

---

## 📝 Document Upload Implementation Plan

### Step 1: Add File Upload to Forms
```javascript
// In modules.js - add document field to relevant tasks
fields: {
  gst_notice: [
    // ... existing fields
    { 
      id: 'document', 
      label: 'Upload GST notice (PDF/image)', 
      type: 'file',
      accept: '.pdf,.jpg,.png,.jpeg',
      maxSize: 5242880, // 5MB
      maxPages: 5,
      required: false,
      paidOnly: false // Set to true for paid-only
    }
  ]
}
```

### Step 2: Update Backend to Handle Files
```javascript
// In server/index.js
const multer = require('multer')
const PDFParser = require('pdf-parse')

// Handle file uploads
app.post('/api/generate', upload.single('document'), async (req, res) => {
  const { moduleId, taskId, formData } = req.body
  const file = req.file // The uploaded file
  
  let documentText = ''
  if (file) {
    // Extract text from PDF/image
    documentText = await extractTextFromFile(file)
    
    // Add to user prompt
    formData.document_content = documentText
  }
  
  // ... rest of generation logic
})
```

### Step 3: Cost Control
```javascript
// Check page count before processing
if (pageCount > userTier.maxPages) {
  return res.status(403).json({ 
    error: `Your plan allows ${userTier.maxPages} pages. Upgrade to process more.`
  })
}
```

---

## 💡 Final Recommendations

1. **Be Transparent:**
   - Change "Made in India" → "Built for India"
   - Add footer: "Powered by Claude AI"

2. **Start Simple:**
   - Launch without documents first
   - Add documents as premium feature in Phase 2

3. **Cost Control:**
   - Use prompt caching (implement in Week 2)
   - Set strict page limits on documents
   - Keep using Haiku (it's perfect for your use case)

4. **Revenue > Costs:**
   - Even with 1,000 users at ₹49/month = ₹49,000 (~$600)
   - Your API costs = ~$32/month
   - Profit margin = 95%+ (excluding Razorpay fees)

---

**Bottom line:** Document upload is affordable and valuable. Add it as a **paid feature** to justify the premium pricing!
