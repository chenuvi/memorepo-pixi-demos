import { Application, Sprite, TilingSprite } from "pixi.js";

// Reference to the water overlay.
let overlay: TilingSprite;

export function addWaterOverlay(app: Application) {
  // Create a water texture object.
  overlay = new TilingSprite({
    texture: Sprite.from("overlay").texture,
    width: app.screen.width,
    height: app.screen.height,
  });

  overlay.alpha = 0.4;
  app.stage.addChild(overlay);

  window.addEventListener("resize", () => {
    overlay.width = app.screen.width;
    overlay.height = app.screen.height;
  });
}

export function animateWaterOverlay(app: Application, time: any) {
  // Extract the delta time from the Ticker object.
  const delta = time.deltaTime * 0.1;

  overlay.tilePosition.x -= delta;
  overlay.tilePosition.y -= delta;
}
