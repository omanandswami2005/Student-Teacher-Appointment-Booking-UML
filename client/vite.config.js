import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // proxy setup
  server: {
    proxy: {
      '/api': {
        target: 'https://stabs.onrender.com',
        changeOrigin: true,
      }
    }
  }

})
