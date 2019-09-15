import 'babylonjs-loaders';

import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';

import { Game } from './game';

import CANNON = require('cannon');




window.addEventListener('DOMContentLoaded', () => {
  // Set global variable for cannonjs physics engine
  window.CANNON = CANNON;
  let game = new Game();
  game.createScene();
  game.init();
  game.render();
});

