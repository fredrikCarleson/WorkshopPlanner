import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true, // Använd endast denna port
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
