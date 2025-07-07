import { Application } from 'pixi.js';

async function setup() {
  // 创建应用
  const app = new Application();
  
  // 初始化应用
  await app.init({
    backgroundColor: 0x333333,
    resizeTo: window,
  });
  
  // 添加画布到DOM
  document.body.appendChild(app.canvas);
  
  // 显示一个简单的文本
  const { Text } = await import('pixi.js');
  
  const text = new Text({
    text: 'Spine Boy Adventure - 敬请期待!',
    style: {
      fontFamily: 'Arial',
      fontSize: 36,
      fill: 0xffffff,
      align: 'center',
    }
  });
  
  // 文本居中
  text.anchor.set(0.5);
  text.x = app.screen.width / 2;
  text.y = app.screen.height / 2;
  
  app.stage.addChild(text);
  
  // 窗口大小调整时保持文本居中
  window.addEventListener('resize', () => {
    text.x = app.screen.width / 2;
    text.y = app.screen.height / 2;
  });
}

// 启动应用
setup(); 