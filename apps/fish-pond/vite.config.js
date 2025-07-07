import { defineConfig } from 'vite';

export default defineConfig({
  // 在Netlify上部署时的路径设置
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
}); 