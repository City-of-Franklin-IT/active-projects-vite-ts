import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { APP_BASE } from './src/config'

export default defineConfig({
  server: {
    allowedHosts: ['cofasv38']
  },
  plugins: [
    react()
  ],
  base: APP_BASE
})