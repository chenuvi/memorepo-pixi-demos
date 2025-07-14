import { Application, Container } from "pixi.js";
import { addStars } from "./addStars";
import { addMoon } from "./addMoon";
import { addMountains } from "./addMountains";
import { addTrees } from "./addTrees";
import { addGround } from "./addGround";
import { addTrain } from "./addTrain";
import { addSmokes } from "./addSmokes";

(async () => {
  const app = new Application();
  const container = new Container();
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
  addGround(app);
  addTrain(app, container);
  addSmokes(app, container);
})();
