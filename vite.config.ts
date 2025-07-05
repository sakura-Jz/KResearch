import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // 假设您在使用 React，如果不是请移除

export default defineConfig({
  // 1. 添加 base 属性
  base: '/KResearch/',

  // 2. 移除 define 块，因为 vite 会自动处理 VITE_ 开头的环境变量
  
  resolve: {
    alias: {
      // 您的别名配置可以保留
       '@': path.resolve(__dirname, '.'),
    }
  },
  
  // 3. 如果项目是 React 项目，别忘了加上 plugins
  // plugins: [react()], 
});
