import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import Unfonts from 'unplugin-fonts/vite';
import tauri from 'vite-plugin-tauri'; // 1. import the plugin

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
    tauri(),
  ],
  clearScreen: false,
  server: {
    open: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
