#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 构建所有应用
const appsDir = path.join(__dirname, 'apps');
const apps = fs.readdirSync(appsDir).filter(
  file => fs.statSync(path.join(appsDir, file)).isDirectory()
);

// 清理和创建dist目录
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 复制文件的辅助函数
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName),
                        path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// 构建所有应用
console.log('开始构建所有应用...');
for (const app of apps) {
  console.log(`构建 ${app}...`);
  try {
    // 确保应用有package.json
    const appDir = path.join(appsDir, app);
    const packageJsonPath = path.join(appDir, 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
      console.log(`跳过 ${app}: 没有package.json文件`);
      continue;
    }

    // 检查是否有构建脚本
    let packageJson;
    try {
      packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      if (!packageJson.scripts || !packageJson.scripts.build) {
        console.log(`跳过 ${app}: package.json中没有build脚本`);
        continue;
      }
    } catch (err) {
      console.error(`读取 ${app} 的package.json失败:`, err);
      continue;
    }
    
    // 运行构建命令
    console.log(`正在构建 ${app}...`);
    execSync(`cd ${appDir} && pnpm build`, { stdio: 'inherit' });
    
    // 复制构建结果到各自的目录
    const appBuildDir = path.join(appDir, 'dist');
    const appDistDir = path.join(distDir, app);
    
    if (fs.existsSync(appBuildDir)) {
      fs.mkdirSync(appDistDir, { recursive: true });
      copyRecursiveSync(appBuildDir, appDistDir);
      console.log(`${app} 构建成功并复制到 dist/${app}`);
    } else {
      console.log(`警告: ${app} 构建输出目录不存在`);
    }
  } catch (error) {
    console.error(`构建 ${app} 失败:`, error);
  }
}

console.log('所有应用构建完成!');

// 创建主页面
const indexHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pixi.js 演示项目集合</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: "Microsoft YaHei", Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
      padding: 0;
      margin: 0;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    header {
      background-color: #333;
      color: #fff;
      padding: 20px 0;
      text-align: center;
      margin-bottom: 30px;
    }
    h1 {
      font-size: 2.5rem;
    }
    .project-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }
    .project-card {
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .project-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    }
    .card-image {
      width: 100%;
      height: 180px;
      background-color: #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
      font-weight: bold;
      overflow: hidden;
      position: relative;
    }
    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .card-content {
      padding: 20px;
    }
    .card-title {
      font-size: 1.5rem;
      margin-bottom: 10px;
      color: #333;
    }
    .card-description {
      margin-bottom: 20px;
      color: #666;
    }
    .card-link {
      display: inline-block;
      background-color: #0066cc;
      color: #fff;
      padding: 10px 20px;
      border-radius: 5px;
      text-decoration: none;
      font-weight: bold;
      transition: background-color 0.3s;
    }
    .card-link:hover {
      background-color: #0055aa;
    }
    footer {
      margin-top: 50px;
      text-align: center;
      padding: 20px;
      color: #777;
      font-size: 0.9rem;
    }
    @media (max-width: 768px) {
      .project-grid {
        grid-template-columns: 1fr;
      }
      .card-image {
        height: 150px;
      }
    }
    .banner {
      margin-top: 20px;
      margin-bottom: 40px;
      padding: 15px;
      background-color: #e6f7ff;
      border-left: 5px solid #1890ff;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <header>
    <h1>Pixi.js 演示项目集合</h1>
  </header>

  <div class="container">
    <div class="banner">
      <p>这是一个使用 Pixi.js 构建的演示项目集合。点击下方卡片可以查看不同的演示项目。</p>
    </div>
    
    <div class="project-grid">
      ${apps.map(app => `
      <div class="project-card">
        <div class="card-image">
          <img src="${getCardImage(app)}" alt="${app} 预览图">
        </div>
        <div class="card-content">
          <h2 class="card-title">${app.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h2>
          <p class="card-description">${getAppDescription(app)}</p>
          <a href="/${app}/" class="card-link">查看演示</a>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <footer>
    <p>&copy; ${new Date().getFullYear()} Pixi.js 演示项目集合 | 使用 Pixi.js 构建</p>
  </footer>
</body>
</html>`;

// 写入主页面
fs.writeFileSync(path.join(distDir, 'index.html'), indexHtml);
console.log('主页面已创建');

// 创建Netlify重定向规则
// 注意：这里不再使用 /* /index.html 200 规则，而是让每个子应用直接访问
const redirectsContent = apps.map(app => `/${app}/* /${app}/index.html 200`).join('\n');
fs.writeFileSync(path.join(distDir, '_redirects'), redirectsContent);
console.log('Netlify重定向规则已创建');

// 辅助函数：获取应用描述
function getAppDescription(appName) {
  switch(appName) {
    case 'fish-pond':
      return '一个美丽的鱼塘场景，包含游动的鱼和水波效果，展示Pixi.js的图形和动画能力。';
    case 'choo-choo-train':
      return '一个简单的火车动画演示，展示了Pixi.js的动画和交互能力，适合初学者了解基础功能。';
    case 'spine-boy-adventure':
      return 'Spine动画角色冒险演示，展示Pixi.js与Spine动画的集成，适合了解如何在Web中实现复杂动画。';
    default:
      return '使用Pixi.js构建的交互式演示。';
  }
}

// 辅助函数：获取卡片图片
function getCardImage(appName) {
  switch(appName) {
    case 'fish-pond':
      return 'https://pixijs.io/guides/assets/img/fish.png';
    case 'choo-choo-train':
      return 'https://pixijs.io/examples/examples/assets/bunny.png';
    case 'spine-boy-adventure':
      return 'https://pixijs.io/examples/examples/assets/pixi-filters/canyon.jpg';
    default:
      return 'https://pixijs.io/examples/examples/assets/pixi-logo-small.png';
  }
} 