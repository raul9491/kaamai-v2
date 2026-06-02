require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { getSystemPrompt, getUserPrompt } = require('./prompts/index.js')
const { generateAIResponse, getProviderInfo } = require('./aiService.js')

const app = express()
const PORT = process.env.PORT || 3002

app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  const providerInfo = getProviderInfo()
  res.json({
    status: 'ok',
    message: 'KaamAI server running',
    ai: {
      provider: providerInfo.current,
      model: providerInfo.model,
      configured: providerInfo.configured
    }
  })
})

// Main generate endpoint — handles all 6 modules
app.post('/api/generate', async (req, res) => {
  const { moduleId, taskId, formData } = req.body

  if (!moduleId || !taskId || !formData) {
    return res.status(400).json({ error: 'moduleId, taskId, and formData are required' })
  }

  const validModules = ['ca', 'advocate', 'student', 'kirana', 'doctor', 'freelancer']
  if (!validModules.includes(moduleId)) {
    return res.status(400).json({ error: 'Invalid module' })
  }

  try {
    const systemPrompt = getSystemPrompt(moduleId)
    const userPrompt = getUserPrompt(moduleId, taskId, formData)

    // Generate using configured AI provider (Gemini or Claude)
    const result = await generateAIResponse(systemPrompt, userPrompt)

    res.json({ result })

  } catch (err) {
    console.error('AI API error:', err.message)

    if (err.message.includes('API key')) {
      return res.status(500).json({ error: 'Invalid API key. Check your .env file.' })
    }
    if (err.message.includes('quota') || err.message.includes('Rate limit')) {
      return res.status(429).json({ error: 'Rate limit hit. Please wait a moment and try again.' })
    }

    res.status(500).json({ error: 'AI generation failed. Please try again.' })
  }
})

app.listen(PORT, () => {
  const providerInfo = getProviderInfo()

  console.log(`\n🚀 ========================================`)
  console.log(`   KAAMAI Backend Server`)
  console.log(`   ========================================`)
  console.log(`   ✅ Running on: http://localhost:${PORT}`)
  console.log(`   📡 Health check: http://localhost:${PORT}/api/health`)
  console.log(`   🤖 AI Provider: ${providerInfo.name} (${providerInfo.company})`)
  console.log(`   🔑 API Status: ${providerInfo.configured ? '✓ Configured' : '✗ Missing'}`)
  console.log(`   💰 Cost: ${providerInfo.cost}`)
  if (providerInfo.available.length > 1) {
    console.log(`   📝 Available: ${providerInfo.available.join(', ')}`)
  }
  console.log(`   ========================================\n`)
})
