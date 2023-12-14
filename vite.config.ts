import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import Unfonts from 'unplugin-fonts/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  preview: {
    port: 3000,
    strictPort: true,
    host: true,
  },
  plugins: [
    react(),
    Unfonts({
      google: {
        families: ['Ubuntu', 'Open Sans', 'Material+Icons'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
