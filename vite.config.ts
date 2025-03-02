import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { analyzer } from 'vite-bundle-analyzer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), analyzer()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-icons/md': ['react-icons/md'],
          'firebase-auth': ['firebase/auth'],
          'firebase-firestore': ['firebase/firestore'],
          'firebase-storage': ['firebase/storage'],
          'firebase-functions': ['firebase/functions'],
        },
      },
    },
  },
});
