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
      // '@jira-clone/core': path.resolve(__dirname, './packages/core'),
      // '@jira-clone/firebase': path.resolve(__dirname, './packages/firebase'),
      // '@jira-clone/services': path.resolve(__dirname, './packages/services'),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      treeshake: true,

      output: {
        manualChunks: {
          'react-dom/client': ['react-dom/client'],
          'firebase-app': ['firebase/app'],
        },
      },
    },
  },
});
