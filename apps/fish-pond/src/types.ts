import { Sprite as PixiSprite } from 'pixi.js';

// 扩展 Pixi.js 的 Sprite 类型
declare module 'pixi.js' {
  interface Sprite extends PixiSprite {
    direction: number;
    speed: number;
    turnSpeed: number;
  }
} 