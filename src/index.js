import { Board } from "./board.js";

const state = {
    preload,
    create,
    update,
};

const game = new Phaser.Game(800, 800, Phaser.AUTO, "", state);
function preload() { }

function create() {
    const board = new Board(game);
    board.position.set(50, 50)
    game.stage.add(board);
    game.stage.backgroundColor = '#ffffff'


}

function update() { }
