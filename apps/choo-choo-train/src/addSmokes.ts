import { Graphics } from "pixi.js";
import type { Application, Container } from "pixi.js";

export function addSmokes(app: Application, train: Container) {
  const groupCount = 5;
  const particleCount = 7;

  // Create an array to store all the smoke groups.
  // 1. 定义扩展接口，继承Graphics并添加tick属性
  interface AnimatedGraphics extends Graphics {
    tick: number;
  }

  // 2. 将groups数组声明为扩展接口类型
  const groups: AnimatedGraphics[] = [];
  // Define the emitter position based on the train's position.
  const baseX = train.x + 170;
  const baseY = train.y - 120;

  for (let index = 0; index < groupCount; index++) {
    // 3. 创建Graphics实例时进行类型断言
    const smokeGroup = new Graphics() as AnimatedGraphics;
    for (let i = 0; i < particleCount; i++) {
      const radius = 20 + Math.random() * 20;
      const x = (Math.random() * 2 - 1) * 40;
      const y = (Math.random() * 2 - 1) * 40;
      smokeGroup.circle(x, y, radius);
    }
    // Fill the smoke group with gray color.
    smokeGroup.fill({ color: 0xc9c9c9 });

    // Position the smoke group.
    smokeGroup.x = baseX;
    smokeGroup.y = baseY;

    app.stage.addChild(smokeGroup);
    groups.push(smokeGroup);

    // Add a tick custom property to the smoke group for storing the animation progress ratio.
    smokeGroup.tick = index * (1 / groupCount);
    groups.push(smokeGroup);
  }

  // Animate the smoke groups.
  app.ticker.add((time) => {
    // Calculate the change in amount of animation progress ratio per tick.
    const dt = time.deltaTime * 0.01;

    groups.forEach((group) => {
      // 现在TypeScript能识别tick属性了
      group.tick = (group.tick + dt) % 1;

      // Update the position and scale of the smoke group based on the animation progress ratio.
      group.x = baseX - Math.pow(group.tick, 2) * 400;
      group.y = baseY - group.tick * 200;
      group.scale.set(Math.pow(group.tick, 0.75));
      group.alpha = 1 - Math.pow(group.tick, 0.5);
    });
  });
}
