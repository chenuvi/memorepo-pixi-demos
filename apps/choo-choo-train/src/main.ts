import { Application, Assets, Sprite } from 'pixi.js';

(async () => {
  const app = new Application();
  await app.init({
    backgroundColor: 0x1099bb,
    resizeTo: window,
  });
  // Append to body instead of document
  document.body.appendChild(app.canvas);
  const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
  const bunny = new Sprite(texture);
  app.stage.addChild(bunny)
  bunny.anchor.set(0.5);
  // Move the sprite to the center of the screen.
  bunny.x = app.screen.width / 2
  bunny.y = app.screen.height / 2;

  app.ticker.add((time) => {
    bunny.rotation += 0.01 * time.deltaTime;
    if (bunny.x > app.screen.width) {
      bunny.x = 0;
    }
    bunny.x += 1 * time.deltaTime;
  })
})();