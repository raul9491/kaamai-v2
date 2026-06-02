require('dotenv').config()
const Anthropic = require('@anthropic-ai/sdk')
const { GoogleGenerativeAI } = require('@google/generative-ai')

// AI Provider Configuration
const AI_PROVIDER = process.env.AI_PROVIDER || 'gemini' // 'claude' or 'gemini'

// Initialize clients
const anthropicClient = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

const geminiClient = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null

/**
 * Generate AI response using configured provider
 * @param {string} systemPrompt - System/context prompt
 * @param {string} userPrompt - User input prompt
 * @returns {Promise<string>} - Generated text
 */
async function generateAIResponse(systemPrompt, userPrompt) {
  if (AI_PROVIDER === 'claude') {
    return await generateWithClaude(systemPrompt, userPrompt)
  } else if (AI_PROVIDER === 'gemini') {
    return await generateWithGemini(systemPrompt, userPrompt)
  } else {
    throw new Error(`Invalid AI_PROVIDER: ${AI_PROVIDER}. Use 'claude' or 'gemini'`)
  }
}

/**
 * Generate response using Claude (Anthropic)
 */
async function generateWithClaude(systemPrompt, userPrompt) {
  if (!anthropicClient) {
    throw new Error('Claude API key not configured. Add ANTHROPIC_API_KEY to .env')
  }

  try {
    const message = await anthropicClient.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }]
    })

    return message.content[0]?.text || 'No response generated.'
  } catch (error) {
    console.error('Claude API error:', error.message)

    if (error.status === 401) {
      throw new Error('Invalid Claude API key')
    }
    if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.')
    }

    throw new Error('Claude API failed: ' + error.message)
  }
}

/**
 * Generate response using Gemini (Google)
 */
async function generateWithGemini(systemPrompt, userPrompt) {
  if (!geminiClient) {
    throw new Error('Gemini API key not configured. Add GEMINI_API_KEY to .env')
  }

  try {
    // Use Gemini 2.5 Flash (free tier)
    const model = geminiClient.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: systemPrompt
    })

    const result = await model.generateContent(userPrompt)
    const response = await result.response
    const text = response.text()

    return text || 'No response generated.'
  } catch (error) {
    console.error('Gemini API error:', error.message)

    if (error.message.includes('API_KEY_INVALID')) {
      throw new Error('Invalid Gemini API key')
    }
    if (error.message.includes('RESOURCE_EXHAUSTED')) {
      throw new Error('Gemini quota exceeded. Please try again later.')
    }

    throw new Error('Gemini API failed: ' + error.message)
  }
}

/**
 * Get current AI provider info
 */
function getProviderInfo() {
  const providers = {
    claude: {
      name: 'Claude Haiku 4.5',
      company: 'Anthropic',
      model: 'claude-haiku-4-5-20251001',
      configured: !!anthropicClient,
      cost: 'Paid ($0.80/$4 per 1M tokens)'
    },
    gemini: {
      name: 'Gemini 2.5 Flash',
      company: 'Google',
      model: 'gemini-2.5-flash',
      configured: !!geminiClient,
      cost: 'Free tier available'
    }
  }

  return {
    current: AI_PROVIDER,
    ...providers[AI_PROVIDER],
    available: Object.keys(providers).filter(key => providers[key].configured)
  }
}

module.exports = {
  generateAIResponse,
  getProviderInfo,
  AI_PROVIDER
}
