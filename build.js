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

// 为了简化，我们只创建一个单一的主页面，不再构建每个应用
console.log('创建单页应用...');

// 创建单一页面HTML
const indexHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pixi.js 演示项目</title>
  <script src="https://cdn.jsdelivr.net/npm/pixi.js@8.11.0/dist/pixi.min.js"></script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: "Microsoft YaHei", Arial, sans-serif;
      background-color: #f0f0f0;
      overflow-x: hidden;
    }
    header {
      background-color: #333;
      color: white;
      padding: 20px 0;
      text-align: center;
      margin-bottom: 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .demo-section {
      margin-bottom: 50px;
      padding: 30px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 15px rgba(0,0,0,0.1);
    }
    h2 {
      color: #333;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #eee;
    }
    .demo-container {
      width: 100%;
      height: 500px;
      background-color: #1099bb;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
      margin-bottom: 20px;
    }
    .demo-description {
      margin-top: 20px;
      padding: 15px;
      background-color: #f9f9f9;
      border-radius: 4px;
      border-left: 4px solid #333;
    }
    footer {
      text-align: center;
      padding: 20px;
      color: #666;
      margin-top: 50px;
    }
    .button-group {
      display: flex;
      justify-content: center;
      margin: 20px 0;
    }
    .demo-button {
      background-color: #0066cc;
      color: white;
      border: none;
      padding: 10px 20px;
      margin: 0 10px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s;
    }
    .demo-button:hover {
      background-color: #0055aa;
    }
    .demo-button.active {
      background-color: #004488;
    }
  </style>
</head>
<body>
  <header>
    <h1>Pixi.js 演示项目</h1>
  </header>
  
  <div class="container">
    <div class="button-group">
      <button id="btn-fish-pond" class="demo-button active" onclick="showDemo('fish-pond')">Fish Pond</button>
      <button id="btn-choo-choo-train" class="demo-button" onclick="showDemo('choo-choo-train')">Choo Choo Train</button>
      <button id="btn-spine-boy-adventure" class="demo-button" onclick="showDemo('spine-boy-adventure')">Spine Boy Adventure</button>
    </div>
    
    <!-- Fish Pond Demo -->
    <div id="fish-pond" class="demo-section">
      <h2>Fish Pond</h2>
      <div id="fish-pond-container" class="demo-container"></div>
      <div class="demo-description">
        <p>一个美丽的鱼塘场景，包含游动的鱼和水波效果，展示Pixi.js的图形和动画能力。</p>
      </div>
    </div>
    
    <!-- Choo Choo Train Demo -->
    <div id="choo-choo-train" class="demo-section" style="display:none">
      <h2>Choo Choo Train</h2>
      <div id="choo-choo-train-container" class="demo-container"></div>
      <div class="demo-description">
        <p>一个简单的火车动画演示，展示了Pixi.js的动画和交互能力，适合初学者了解基础功能。</p>
      </div>
    </div>
    
    <!-- Spine Boy Adventure Demo -->
    <div id="spine-boy-adventure" class="demo-section" style="display:none">
      <h2>Spine Boy Adventure</h2>
      <div id="spine-boy-adventure-container" class="demo-container"></div>
      <div class="demo-description">
        <p>Spine动画角色冒险演示，展示Pixi.js与Spine动画的集成，适合了解如何在Web中实现复杂动画。</p>
      </div>
    </div>
  </div>
  
  <footer>
    <p>&copy; ${new Date().getFullYear()} Pixi.js 演示项目 | 使用 Pixi.js 构建</p>
  </footer>

  <script>
    // 切换演示的函数
    function showDemo(demoId) {
      // 隐藏所有演示
      document.getElementById('fish-pond').style.display = 'none';
      document.getElementById('choo-choo-train').style.display = 'none';
      document.getElementById('spine-boy-adventure').style.display = 'none';
      
      // 重置所有按钮状态
      document.getElementById('btn-fish-pond').classList.remove('active');
      document.getElementById('btn-choo-choo-train').classList.remove('active');
      document.getElementById('btn-spine-boy-adventure').classList.remove('active');
      
      // 显示选中的演示
      document.getElementById(demoId).style.display = 'block';
      document.getElementById('btn-' + demoId).classList.add('active');
      
      // 如果之前没有初始化过，则初始化演示
      if (!window[demoId + 'Initialized']) {
        initDemo(demoId);
        window[demoId + 'Initialized'] = true;
      }
    }
    
    // 初始化各个演示
    function initDemo(demoId) {
      switch(demoId) {
        case 'fish-pond':
          initFishPond();
          break;
        case 'choo-choo-train':
          initChooChooTrain();
          break;
        case 'spine-boy-adventure':
          initSpineBoyAdventure();
          break;
      }
    }
    
    // === Fish Pond 演示 ===
    async function initFishPond() {
      // 创建应用
      const app = new PIXI.Application();
      await app.init({
        backgroundColor: 0x1099bb,
        resizeTo: document.getElementById('fish-pond-container')
      });
      document.getElementById('fish-pond-container').appendChild(app.canvas);
      
      // 加载资源
      const fishTextures = [];
      for (let i = 1; i <= 5; i++) {
        const texture = await PIXI.Texture.fromURL('https://pixijs.com/assets/tutorials/fish-pond/fish'+i+'.png');
        fishTextures.push(texture);
      }
      
      // 背景
      const backgroundTexture = await PIXI.Texture.fromURL('https://pixijs.com/assets/tutorials/fish-pond/pond_background.jpg');
      const background = new PIXI.Sprite(backgroundTexture);
      background.width = app.screen.width;
      background.height = app.screen.height;
      app.stage.addChild(background);
      
      // 鱼群
      const fishes = [];
      const fishCount = 20;
      const fishContainer = new PIXI.Container();
      app.stage.addChild(fishContainer);
      
      for (let i = 0; i < fishCount; i++) {
        const fishTexture = fishTextures[i % fishTextures.length];
        const fish = new PIXI.Sprite(fishTexture);
        fish.anchor.set(0.5);
        
        // 自定义属性
        fish.direction = Math.random() * Math.PI * 2;
        fish.speed = 2 + Math.random() * 2;
        fish.turnSpeed = Math.random() - 0.8;
        
        // 随机位置
        fish.x = Math.random() * app.screen.width;
        fish.y = Math.random() * app.screen.height;
        
        // 随机缩放
        fish.scale.set(0.5 + Math.random() * 0.2);
        
        fishContainer.addChild(fish);
        fishes.push(fish);
      }
      
      // 水面覆盖层
      const overlayTexture = await PIXI.Texture.fromURL('https://pixijs.com/assets/tutorials/fish-pond/wave_overlay.png');
      overlayTexture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      const overlay = new PIXI.TilingSprite({
        texture: overlayTexture,
        width: app.screen.width,
        height: app.screen.height
      });
      overlay.alpha = 0.4;
      app.stage.addChild(overlay);
      
      // 位移滤镜效果
      const displacementTexture = await PIXI.Texture.fromURL('https://pixijs.com/assets/tutorials/fish-pond/displacement_map.png');
      displacementTexture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      const displacementSprite = new PIXI.Sprite(displacementTexture);
      displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      displacementSprite.scale.set(2);
      app.stage.addChild(displacementSprite);
      
      const displacementFilter = new PIXI.DisplacementFilter({
        sprite: displacementSprite,
        scale: 20
      });
      app.stage.filters = [displacementFilter];
      
      // 动画循环
      app.ticker.add((time) => {
        // 移动鱼儿
        const stagePadding = 100;
        const boundWidth = app.screen.width + stagePadding * 2;
        const boundHeight = app.screen.height + stagePadding * 2;
        
        fishes.forEach(fish => {
          fish.direction += fish.turnSpeed * 0.01;
          fish.x += Math.sin(fish.direction) * fish.speed;
          fish.y += Math.cos(fish.direction) * fish.speed;
          fish.rotation = -fish.direction - Math.PI / 2;
          
          // 屏幕环绕
          if (fish.x < -stagePadding) fish.x += boundWidth;
          if (fish.x > app.screen.width + stagePadding) fish.x -= boundWidth;
          if (fish.y < -stagePadding) fish.y += boundHeight;
          if (fish.y > app.screen.height + stagePadding) fish.y -= boundHeight;
        });
        
        // 移动水波纹
        overlay.tilePosition.x -= time.deltaTime * 0.1;
        overlay.tilePosition.y -= time.deltaTime * 0.1;
        
        // 移动位移贴图
        displacementSprite.x++;
        if (displacementSprite.x > displacementSprite.width) {
          displacementSprite.x = 0;
        }
      });
      
      // 响应窗口大小变化
      window.addEventListener('resize', () => {
        background.width = app.screen.width;
        background.height = app.screen.height;
        overlay.width = app.screen.width;
        overlay.height = app.screen.height;
      });
    }
    
    // === Choo Choo Train 演示 ===
    async function initChooChooTrain() {
      const app = new PIXI.Application();
      await app.init({
        backgroundColor: 0x1099bb,
        resizeTo: document.getElementById('choo-choo-train-container')
      });
      document.getElementById('choo-choo-train-container').appendChild(app.canvas);
      
      // 简单动画，加载兔子图片作为替代
      const bunnyTexture = await PIXI.Texture.fromURL('https://pixijs.io/examples/examples/assets/bunny.png');
      const bunny = new PIXI.Sprite(bunnyTexture);
      
      bunny.anchor.set(0.5);
      bunny.x = app.screen.width / 2;
      bunny.y = app.screen.height / 2;
      
      app.stage.addChild(bunny);
      
      // 添加文本
      const text = new PIXI.Text({
        text: 'Choo Choo Train Demo',
        style: {
          fontFamily: 'Arial',
          fontSize: 24,
          fill: 0xffffff,
          align: 'center'
        }
      });
      text.anchor.set(0.5);
      text.x = app.screen.width / 2;
      text.y = app.screen.height / 2 - 100;
      app.stage.addChild(text);
      
      // 动画
      app.ticker.add(() => {
        bunny.rotation += 0.01;
      });
      
      // 响应窗口大小变化
      window.addEventListener('resize', () => {
        bunny.x = app.screen.width / 2;
        bunny.y = app.screen.height / 2;
        text.x = app.screen.width / 2;
        text.y = app.screen.height / 2 - 100;
      });
    }
    
    // === Spine Boy Adventure 演示 ===
    async function initSpineBoyAdventure() {
      const app = new PIXI.Application();
      await app.init({
        backgroundColor: 0x333333,
        resizeTo: document.getElementById('spine-boy-adventure-container')
      });
      document.getElementById('spine-boy-adventure-container').appendChild(app.canvas);
      
      // 显示文本
      const text = new PIXI.Text({
        text: 'Spine Boy Adventure - 敬请期待!',
        style: {
          fontFamily: 'Arial',
          fontSize: 36,
          fill: 0xffffff,
          align: 'center'
        }
      });
      text.anchor.set(0.5);
      text.x = app.screen.width / 2;
      text.y = app.screen.height / 2;
      app.stage.addChild(text);
      
      // 响应窗口大小变化
      window.addEventListener('resize', () => {
        text.x = app.screen.width / 2;
        text.y = app.screen.height / 2;
      });
    }
    
    // 默认显示鱼塘演示
    window.addEventListener('load', () => {
      showDemo('fish-pond');
    });
  </script>
</body>
</html>`;

// 写入单一页面
fs.writeFileSync(path.join(distDir, 'index.html'), indexHtml);
console.log('单一页面已创建');

// 创建空的 _redirects 文件（所有路径都指向主页面）
fs.writeFileSync(path.join(distDir, '_redirects'), '/* /index.html 200');
console.log('Netlify重定向规则已创建'); 