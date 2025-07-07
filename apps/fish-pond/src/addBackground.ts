import { Application, Sprite } from "pixi.js";

export function addBackground(app: Application) {
  // Create a background sprite from the "background" asset id and add it to the stage.
  const background = Sprite.from("background");
  
  // 设置背景图片以覆盖整个屏幕
  background.width = app.screen.width;
  background.height = app.screen.height;
  
  app.stage.addChild(background);
  
  // 当窗口大小改变时，调整背景图片大小
  window.addEventListener("resize", () => {
    background.width = app.screen.width;
    background.height = app.screen.height;
  });
}
