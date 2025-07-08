import { defineConfig } from 'vite';

export default defineConfig({
  base: '/fish_pond/',
  server: {
    port: 5176,
    open: false,
    host: '0.0.0.0'
  }
});