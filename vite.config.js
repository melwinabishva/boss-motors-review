import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,          // allows using test(), expect() without imports
    environment: 'jsdom',   // browser-like environment
    setupFiles: './src/setupTests.js'
  }
})
