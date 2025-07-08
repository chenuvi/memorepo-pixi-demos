import { defineConfig } from 'vite';

export default defineConfig({
  base: '/choo_choo_train/',  // 修改此行与nginx配置匹配
  server: {
    port: 5175,
    open: false,
    host: '0.0.0.0'  // 确保已添加此行
  }
});