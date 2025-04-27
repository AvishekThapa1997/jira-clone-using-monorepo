import path from 'path';
import { defineConfig, loadEnv, loadConfigFromFile } from 'vite';
import react from '@vitejs/plugin-react';
import { analyzer } from 'vite-bundle-analyzer';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      (() => {
        return mode === 'development';
      })() && analyzer(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      sourcemap: mode === 'development',
      rollupOptions: {
        treeshake: true,
        output: {
          manualChunks: {
            'react-dom/client': ['react-dom/client'],
            'react-router': ['react-router'],
          },
        },
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          // configure: (proxy) => {
          //   proxy.on('proxyReq', (proxyReq, req) => {
          //     if (req.headers.cookie) {
          //       proxyReq.setHeader('cookie', req.headers.cookie);
          //     }
          //   });
          // },
        },
      },
    },
  };
});
