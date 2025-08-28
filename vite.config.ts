import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import yaml from '@rollup/plugin-yaml';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), yaml()],
  base: '/srs-nihongo/build/',
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
});