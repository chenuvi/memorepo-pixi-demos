import { Graphics } from "pixi.js";
import moonSvg from "../public/assets/moon.svg?raw";
import type { Application } from "pixi.js";
export const addMoon = (app: Application) => {
  const graphics = new Graphics().svg(moonSvg);
  graphics.x = app.screen.width / 2 + 100;
  graphics.y = app.screen.height / 8;
  app.stage.addChild(graphics);
};
