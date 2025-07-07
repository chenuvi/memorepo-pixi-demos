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
if (fs.existsSync(distDir)) {
  // 清空dist目录
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

    // 尝试读取package.json检查是否有build脚本
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
    execSync(`cd ${appDir} && pnpm build`, { stdio: 'inherit' });
    console.log(`${app} 构建成功`);
  } catch (error) {
    console.error(`构建 ${app} 失败:`, error);
  }
}

// 创建资源目录结构
console.log('创建资源目录...');
const assetsDir = path.join(distDir, 'apps');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// 复制每个应用的构建输出
for (const app of apps) {
  const appBuildDir = path.join(appsDir, app, 'dist');
  if (fs.existsSync(appBuildDir)) {
    const appAssetsDir = path.join(assetsDir, app);
    fs.mkdirSync(appAssetsDir, { recursive: true });
    copyRecursiveSync(appBuildDir, appAssetsDir);
    console.log(`复制 ${app} 构建输出到 apps/${app}`);
  }
}

// 创建主页面
console.log('创建主页面...');
const indexHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pixi.js 演示项目</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: "Microsoft YaHei", Arial, sans-serif;
      background-color: #f5f5f5;
      overflow: hidden;
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    header {
      background-color: #333;
      color: white;
      padding: 15px;
      text-align: center;
    }
    nav {
      background-color: #444;
      padding: 10px;
      text-align: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    nav a {
      color: white;
      text-decoration: none;
      margin: 0 10px;
      font-weight: bold;
      display: inline-block;
      padding: 8px 15px;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    nav a:hover {
      background-color: #555;
    }
    nav a.active {
      background-color: #666;
    }
    .content-wrapper {
      flex: 1;
      overflow: hidden;
      position: relative;
    }
    .app-container {
      width: 100%;
      height: 100%;
      border: none;
      display: none;
      position: absolute;
      top: 0;
      left: 0;
    }
    .app-container.active {
      display: block;
    }
    .home-content {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
      height: 100%;
      overflow: auto;
    }
    .app-list {
      margin-top: 20px;
    }
    .app-list li {
      margin: 15px 0;
      padding: 20px;
      background-color: white;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      list-style-type: none;
      transition: transform 0.2s;
    }
    .app-list li:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
    .app-list a {
      color: #0066cc;
      text-decoration: none;
      font-weight: bold;
      display: inline-block;
      margin-top: 10px;
      padding: 8px 16px;
      background-color: #f0f0f0;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    .app-list a:hover {
      background-color: #e0e0e0;
    }
  </style>
</head>
<body>
  <header>
    <h1>Pixi.js 演示项目</h1>
  </header>
  
  <nav id="main-nav">
    <a href="#home" class="nav-link active" data-target="home">首页</a>
    ${apps.map(app => `<a href="#${app}" class="nav-link" data-target="${app}">${app.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</a>`).join('\n    ')}
  </nav>
  
  <div class="content-wrapper">
    <div id="home" class="home-content app-container active">
      <h2>欢迎来到 Pixi.js 演示项目集合</h2>
      <p>请从上方导航选择一个演示项目，或点击下方链接查看具体演示。</p>
      
      <div class="app-list">
        <ul>
          ${apps.map(app => `
          <li>
            <h3>${app.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
            <p>${getAppDescription(app)}</p>
            <a href="#${app}" class="app-link" data-target="${app}">查看演示</a>
          </li>`).join('\n          ')}
        </ul>
      </div>
    </div>
    
    ${apps.map(app => `<iframe id="${app}" src="apps/${app}/index.html" class="app-container" title="${app}" frameborder="0" allow="fullscreen" loading="lazy"></iframe>`).join('\n    ')}
  </div>

  <script>
    // 简单的路由实现
    function activateApp(appId) {
      // 隐藏所有app
      document.querySelectorAll('.app-container').forEach(app => {
        app.classList.remove('active');
      });
      
      // 取消所有导航链接激活状态
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      
      // 激活选中的app
      const targetApp = document.getElementById(appId);
      if (targetApp) {
        targetApp.classList.add('active');
        
        // 如果是iframe，确保它被正确加载
        if(targetApp.tagName === 'IFRAME' && !targetApp.getAttribute('data-loaded')) {
          // 重新加载iframe内容
          targetApp.src = targetApp.getAttribute('src');
          targetApp.setAttribute('data-loaded', 'true');
        }
      } else if (appId === 'home') {
        document.getElementById('home').classList.add('active');
      }
      
      // 激活对应的导航链接
      const navLink = document.querySelector(\`.nav-link[data-target="\${appId}"]\`);
      if (navLink) {
        navLink.classList.add('active');
      }
    }
    
    // 设置导航点击事件
    document.querySelectorAll('.nav-link, .app-link').forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('data-target');
        activateApp(targetId);
      });
    });
    
    // 初始化 - 根据URL哈希选择app
    function initFromHash() {
      const hash = window.location.hash.substring(1); // 移除#符号
      if (hash && (document.getElementById(hash) || hash === 'home')) {
        activateApp(hash);
      } else {
        activateApp('home');
      }
    }
    
    // 监听哈希变化
    window.addEventListener('hashchange', initFromHash);
    
    // 页面加载时初始化
    window.addEventListener('load', initFromHash);
  </script>
</body>
</html>`;

// 写入主页面
fs.writeFileSync(path.join(distDir, 'index.html'), indexHtml);
console.log('主页面已创建');

// 创建netlify.toml的副本，确保重定向规则被应用
fs.writeFileSync(path.join(distDir, '_redirects'), '/* /index.html 200');
console.log('Netlify重定向规则已创建');

// 辅助函数：获取应用描述
function getAppDescription(appName) {
  switch(appName) {
    case 'fish-pond':
      return '一个美丽的鱼塘场景，包含游动的鱼和水波效果。';
    case 'choo-choo-train':
      return '一个简单的火车动画演示，展示了Pixi.js的动画能力。';
    case 'spine-boy-adventure':
      return 'Spine动画角色冒险演示，展示Pixi.js与Spine动画的集成。';
    default:
      return '使用Pixi.js构建的交互式演示。';
  }
} 