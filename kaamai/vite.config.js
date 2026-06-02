import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,  // KaamAI uses 5174 to avoid conflicts with other projects
    proxy: {
      '/api': 'http://localhost:3002'  // KaamAI backend on 3002 (AppNazar uses 3001)
    }
  }
})
