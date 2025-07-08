import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',  // 修改此行
  server: {
    port: 5175,
    open: false,
    host: '0.0.0.0'  // 确保已添加此行
  }
});