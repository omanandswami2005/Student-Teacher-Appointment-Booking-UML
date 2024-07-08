import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [react()],
  build: {
    outDir: '../server/public',

    rollupOptions: {
      input: {
        main: '/src/main.jsx',
        // login: './login.html',
      },
    },
  },
  // proxy setup
  server: {
    proxy: {
      '/api': {
        target: 'https://stabsbackend.onrender.com',
        changeOrigin: true,
      }
    }
  }

})
