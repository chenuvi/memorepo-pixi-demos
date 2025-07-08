import { defineConfig } from 'vite';

export default defineConfig({
  base: '/spine_boy_adventure/',
  server: {
    port: 5177,
    open: false,
    host: '0.0.0.0'
  }
});