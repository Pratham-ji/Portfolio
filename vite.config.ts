import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // Use VITE_BASE_URL for flexible deployment (e.g., /Portfolio/ on GH pages, / on Netlify)
    base: env.VITE_BASE_URL || '/', 
    build: {
      target: 'es2022',
    },
  };
});
