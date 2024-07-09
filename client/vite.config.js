// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      // This ensures that all the routes fallback to index.html
      input: {
        // eslint-disable-next-line no-undef
        main: path.resolve(__dirname, 'index.html'),
      }
    }
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
