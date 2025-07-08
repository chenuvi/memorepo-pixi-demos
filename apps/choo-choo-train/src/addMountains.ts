import { Graphics } from "pixi.js";
import type { Application } from "pixi.js";

export function addMountains(app: Application) {
  const group1 = createMountainGroup(app);
  const group2 = createMountainGroup(app);
  // Position the 2nd group off the screen to the right.
  group2.x = app.screen.width;
  app.stage.addChild(group1, group2);

  // Animate the mountain groups
  app.ticker.add((time) => {
    // Calculate the amount of distance to move the mountain groups per tick.
    const dx = time.deltaTime * 0.5;
    // Move the mountain groups leftwards.
    group1.x -= dx;
    group2.x -= dx;
    if (group1.x < -app.screen.width) {
      group1.x = app.screen.width;
    }
    if (group2.x < -app.screen.width) {
      group2.x = app.screen.width;
    }
  });
}

const createMountainGroup = (app: Application) => {
  const graphics = new Graphics();

  const width = app.screen.width / 2;
  const startY = app.screen.height;

  // Start point on the x-axis of the individual mountain.
  const startXLeft = 0;
  const startXMiddle: number = app.screen.width / 4;
  const startXRight = app.screen.width / 2;

  // Height of the individual mountain.
  const heightLeft = app.screen.height / 2;
  const heightMiddle = (app.screen.height * 4) / 5;
  const heightRight = (app.screen.height * 2) / 3;
  // Color of the individual mountain.
  const colorLeft = 0xc1c0c2;
  const colorMiddle = 0x7e818f;
  const colorRight = 0x8c919f;

  graphics
    // Draw the middle mountain
    .moveTo(startXMiddle, startY)
    .bezierCurveTo(
      startXMiddle + width / 2,
      startY - heightMiddle,
      startXMiddle + width / 2,
      startY - heightMiddle,
      startXMiddle + width,
      startY
    )
    .fill({ color: colorMiddle })
    // Draw the left mountain
    .moveTo(startXLeft, startY)
    .bezierCurveTo(
      startXLeft + width / 2,
      startY - heightLeft,
      startXLeft + width / 2,
      startY - heightLeft,
      startXLeft + width,
      startY
    )
    .fill({ color: colorLeft })
    // Draw the right mountain
    .moveTo(startXRight, startY)
    .bezierCurveTo(
      startXRight + width / 2,
      startY - heightRight,
      startXRight + width / 2,
      startY - heightRight,
      startXRight + width,
      startY
    )
    .fill({ color: colorRight });

  return graphics;
};
