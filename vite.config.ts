import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    // 这部分代码保持不变，它会尝试从环境中加载变量
    const env = loadEnv(mode, '.', ''); 
    
    return {
      // 在这里添加 base 属性
      base: '/KResearch/', // <-- GitHub Pages 的访问子目录

      // 您原有的 define 配置保持不变
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      
      // 您原有的 resolve 配置保持不变
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
