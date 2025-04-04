import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import checker from 'vite-plugin-checker';

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
    open: true,
  },
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@common': path.resolve(__dirname, './src/common'),
      '@theme': path.resolve(__dirname, './src/theme'),
    },
  },
});
