import { Application, DisplacementFilter, Sprite } from "pixi.js";

export function addDisplacementEffect(app: Application) {
  const displacementSprite = Sprite.from("displacement");

  // Set the base texture wrap mode to repeat to allow the texture UVs to be tiled and repeated.
  displacementSprite.texture.baseTexture.wrapMode = "repeat";
  displacementSprite.scale.set(2);

  // Create a displacement filter using the sprite texture.
  const displacementFilter = new DisplacementFilter({
    sprite: displacementSprite,
    scale: 20,
  });

  // Add the filter to the stage.
  app.stage.addChild(displacementSprite);
  app.stage.filters = [displacementFilter];

  app.ticker.add(() => {
    displacementSprite.x++;
    if (displacementSprite.x > displacementSprite.width) {
      displacementSprite.x = 0;
    }
  });
}
