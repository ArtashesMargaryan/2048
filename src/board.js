import { Cell } from "./cell";
import { Item } from "./item";
import { BALL_COLORS, BALL_TYPES } from "./constants";
import { BOARD_DIMENSION, INITIAL_BALLS_COUNT } from "./constants";

export class Board extends Phaser.Sprite {
    constructor(game) {
        super(game);
        this._cells = [];
        this._selectedBall = null;
        this._combinations = [];
        this.interactive = true
        this._build();
        window.addEventListener('keydown', this.pointerControler.bind(this))

    }

    getEmptyCells() {
        const cells = this.getCellsArray();
        return cells.filter((cell) => cell.isEmpty);
    }

    // getCellsArray() {
    //     return this._cells.reduce((arr, row) => {
    //         arr.push(...row);
    //         return arr;
    //     }, []);
    // }


    _build() {
        this._buildCells();
        this.buildItems(1, 1)
    }

    _buildCells() {
        const { width, height } = BOARD_DIMENSION;
        const gap = 5;

        for (let i = 0; i < width; i++) {
            const row = [];

            for (let j = 0; j < height; j++) {
                const cell = new Cell(this.game, i, j);

                cell.position.set(j * (150 + gap) + 50, i * (150 + gap) + 50);
                this.addChild(cell);
                row.push(cell);
            }

            this._cells.push(row);
        }
    }

    pointerControler(e) {
        console.warn(e.key);
        switch (e.key) {
            case 'ArrowUp':
                this.goTuUp();
                break;
            case 'ArrowDown':
                this.goTuDown();
                break;
            case 'ArrowRight':
                this.goTuRight();
                break;
            case 'ArrowLeft':
                this.goTuLeft();
                break;
        }

    }

    buildItems(i = 1, j = 1) {
        if (i > 3 && j > 3) {
            return
        }
        const cell = this._cells[i][j]
        cell.changeItem(2)
        console.warn(cell);
        const gap = 5
        const item = new Item(this.game)
        item.position.set(i * (150 + gap) + 50, j * (150 + gap) + 50);
        this.addChild(item)
    }

    goToUp() {
        const matrix = this._cells
        for (let i = matrix.length - 1; i > 1; i--) {
            for (let j = 0; j < matrix[i].length; j++) {
                this.compareCell

            }

        }

    }

    goToDown() { }

    goToLeft() { }

    goToRight() { }

    compareCell() {

    }

    itemJoin(item1, item2) {

    }
}