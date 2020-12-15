import { Board } from "./board";

const state = {
    preload,
    create,
    update,
};

const game = new Phaser.Game(800, 800, Phaser.AUTO, "", state);

function preload() { }

function create() {
    const board = new Board(game);
    game.stage.add(board);
}

function update() { }
