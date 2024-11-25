// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { plugin as markdown } from 'vite-plugin-markdown';

export default defineConfig({
  plugins: [
    vue(),
    markdown(),
  ],
});
