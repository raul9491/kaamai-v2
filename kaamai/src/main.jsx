import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

console.log('🚀 KaamAI main.jsx loading...')
console.log('Root element:', document.getElementById('root'))

try {
  const root = document.getElementById('root')
  if (!root) {
    throw new Error('Root element not found!')
  }

  console.log('✅ Creating React root...')
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
  console.log('✅ React app mounted successfully!')
} catch (error) {
  console.error('❌ Error mounting React app:', error)
  document.body.innerHTML = `<div style="color: white; padding: 20px; font-family: monospace;">
    <h1>Error Loading KaamAI</h1>
    <pre>${error.message}\n${error.stack}</pre>
  </div>`
}
