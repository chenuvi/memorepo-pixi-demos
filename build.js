#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 构建所有应用
const appsDir = path.join(__dirname, 'apps');
const apps = fs.readdirSync(appsDir).filter(
  file => fs.statSync(path.join(appsDir, file)).isDirectory()
);

// 创建dist目录
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// 为每个应用创建构建输出目录
for (const app of apps) {
  const appDistDir = path.join(distDir, app);
  if (!fs.existsSync(appDistDir)) {
    fs.mkdirSync(appDistDir);
  }
}

// 构建每个应用
console.log('开始构建所有应用...');
for (const app of apps) {
  console.log(`构建 ${app}...`);
  try {
    // 确保应用有package.json并且安装了依赖
    const appDir = path.join(appsDir, app);
    const packageJsonPath = path.join(appDir, 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
      console.log(`跳过 ${app}: 没有package.json文件`);
      continue;
    }
    
    // 运行构建命令
    execSync(`cd ${appDir} && pnpm build`, { stdio: 'inherit' });
    
    // 复制构建输出到主dist目录
    const appBuildDir = path.join(appDir, 'dist');
    if (fs.existsSync(appBuildDir)) {
      execSync(`cp -r ${appBuildDir}/* ${path.join(distDir, app)}/`, { stdio: 'inherit' });
      console.log(`${app} 构建成功并复制到dist/${app}`);
    } else {
      console.log(`警告: ${app} 的构建输出目录不存在`);
    }
  } catch (error) {
    console.error(`构建 ${app} 失败:`, error);
  }
}

console.log('所有应用构建完成!');

// 创建一个简单的主页面，列出所有应用的链接
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pixi.js Demos</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #333;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      margin: 10px 0;
      padding: 15px;
      background-color: #f5f5f5;
      border-radius: 5px;
      transition: all 0.3s ease;
    }
    li:hover {
      background-color: #e0e0e0;
      transform: translateY(-2px);
    }
    a {
      color: #0066cc;
      text-decoration: none;
      font-weight: bold;
      display: block;
      font-size: 18px;
    }
  </style>
</head>
<body>
  <h1>Pixi.js Demo Projects</h1>
  <ul>
    ${apps.map(app => `<li><a href="/${app}/">${app.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</a></li>`).join('\n    ')}
  </ul>
</body>
</html>`;

fs.writeFileSync(path.join(distDir, 'index.html'), indexHtml);
console.log('主页面已创建'); 