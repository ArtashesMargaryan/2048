import { Board } from './board.js';
import { Container } from './container.js';

const state = {
  preload,
  create,
  update,
};

const game = new Phaser.Game(900, 800, Phaser.AUTO, '', state);

function preload() {
  game.load.image('retry', '../assets/retry.png');
  game.load.image('undo', '../assets/undo.png');
}

function create() {
  const board = new Board(game);
  board.position.set(50, 50);
  game.stage.add(board);
  game.stage.backgroundColor = '#ffffff';
  const container = new Container(game);
  game.stage.add(container);
  container.position.set(780, 100);
}

function update() {}
