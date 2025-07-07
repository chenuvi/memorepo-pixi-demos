import { Application, Assets } from "pixi.js";
import "./types";
import { addBackground } from "./addBackground";
import { addFishes, animateFishes } from "./addFish";
import { addWaterOverlay, animateWaterOverlay } from "./addWaterOverlay";
import { addDisplacementEffect } from "./addDisplacementEffect";

// Create Application without constructor options
const app = new Application();

const fishes = [];

async function setup() {
  // Move all configuration to init()
  await app.init({
    backgroundColor: 0x1099bb,
    resizeTo: window,
  });

  // Then add the application's canvas to the DOM body
  document.body.appendChild(app.canvas);
}

async function preload() {
  // Create an array of asset data to load.
  const assets = [
    {
      alias: "background",
      src: "https://pixijs.com/assets/tutorials/fish-pond/pond_background.jpg",
    },
    {
      alias: "fish1",
      src: "https://pixijs.com/assets/tutorials/fish-pond/fish1.png",
    },
    {
      alias: "fish2",
      src: "https://pixijs.com/assets/tutorials/fish-pond/fish2.png",
    },
    {
      alias: "fish3",
      src: "https://pixijs.com/assets/tutorials/fish-pond/fish3.png",
    },
    {
      alias: "fish4",
      src: "https://pixijs.com/assets/tutorials/fish-pond/fish4.png",
    },
    {
      alias: "fish5",
      src: "https://pixijs.com/assets/tutorials/fish-pond/fish5.png",
    },
    {
      alias: "overlay",
      src: "https://pixijs.com/assets/tutorials/fish-pond/wave_overlay.png",
    },
    {
      alias: "displacement",
      src: "https://pixijs.com/assets/tutorials/fish-pond/displacement_map.png",
    },
  ];

  // Load the assets defined above.
  await Assets.load(assets);
}

(async () => {
  await setup();
  await preload();
  addBackground(app);
  addFishes(app, fishes);
  addWaterOverlay(app);
  addDisplacementEffect(app);
  // Add the animation callbacks to the application's ticker.
  app.ticker.add((time) => {
    animateFishes(app, fishes, time);
    animateWaterOverlay(app, time);
  });
})();
