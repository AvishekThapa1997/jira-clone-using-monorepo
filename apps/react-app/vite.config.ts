import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { analyzer } from 'vite-bundle-analyzer';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    (() => {
      console.log({ mode });
      return mode === 'development';
    })() && analyzer(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks: {
          'react-dom/client': ['react-dom/client'],
        },
      },
    },
  },
}));
