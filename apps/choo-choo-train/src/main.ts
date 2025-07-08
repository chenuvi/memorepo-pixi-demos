import { Application } from "pixi.js";
import { addStars } from "./addStars";
import { addMoon } from "./addMoon";
import { addMountains } from "./addMountains";
import { addTrees } from "./addTrees";

(async () => {
  const app = new Application();
  await app.init({
    backgroundColor: " #021f4b",
    resizeTo: window,
  });
  // Append to body instead of document
  document.body.appendChild(app.canvas);
  addStars(app, 50);
  addMoon(app);
  addMountains(app);
  addTrees(app);
})();
