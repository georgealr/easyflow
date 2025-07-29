import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    hmr: { overlay: false }, // Disable overlay for debugging
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
});