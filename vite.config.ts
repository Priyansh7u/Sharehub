
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This ensures process.env.API_KEY is replaced with its value during build
    // without requiring the full 'process' object to exist in the browser.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
    'process.env': {
      API_KEY: JSON.stringify(process.env.API_KEY || '')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
