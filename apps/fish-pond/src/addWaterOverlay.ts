import { Texture, TilingSprite } from "pixi.js";

// Reference to the water overlay.
let overlay;

export function addWaterOverlay(app) {
  // Create a water texture object.
  const texture = Texture.from("overlay");
  overlay = new TilingSprite({
    texture,
    width: app.screen.width,
    height: app.screen.height,
  });

  app.stage.addChild(overlay);
}

export function animateWaterOverlay(app, time) {
  // Extract the delta time from the Ticker object.
  const delta = time.deltaTime;

  overlay.tilePosition.x -= delta;
  overlay.tilePosition.y -= delta;
}
