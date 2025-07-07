import 'pixi.js';

// 扩展 Pixi.js 的 Sprite 类型
declare module 'pixi.js' {
  interface Sprite {
    direction: number;
    speed: number;
    turnSpeed: number;
  }
} 