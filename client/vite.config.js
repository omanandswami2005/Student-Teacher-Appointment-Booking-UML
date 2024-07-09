// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: './index.html',
        
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://stabsbackend.onrender.com',
        changeOrigin: true
      }
    }
  }
});
