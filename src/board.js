import { Cell } from "./cell.js";
import { Item } from "./item.js";
import { randomNumber } from './utils.js'
import { BOARD_DIMENSION, INITIAL_BALLS_COUNT } from "./constants.js";

export class Board extends Phaser.Sprite {
    constructor(game) {
        super(game);
        this._cells = [];
        this.interactive = true
        this._build();
        this.items = []
        window.addEventListener('keydown', this.pointerControler.bind(this))

        // console.warn(this.pointerUp);



    }

    _addListeners() {
        const state = this.game.state.getCurrentState();
        state.input.onDown.add(this._onPointerDown, this);
        state.input.onUp.add(this._onPointerUp, this);

        if (Math.abs(this._startX - this._endX) > Math.abs(this._startY - this._endY) && this._startX < this._endX) {
            console.warn("right"); this.goToRight()
        } else if (Math.abs(this._startX - this._endX) > Math.abs(this._startY - this._endY) && this._startX > this._endX) {
            console.warn("left"); this.goToLeft()
        } else if (Math.abs(this._startX - this._endX) < Math.abs(this._startY - this._endY) && this._startY > this._endY) {
            console.warn("top"); this.goToUp();
        } else if (Math.abs(this._startX - this._endX) < Math.abs(this._startY - this._endY) && this._startY < this._endY) {
            console.warn("down"); this.goToDown();
        }
    }

    getEmptyCells() {
        const cells = this.getCellsArray();
        return cells.filter((cell) => cell.isEmpty);
    }

    getCellsArray() {
        const arrayCells = [];
        this._cells.forEach(cells => {
            cells.forEach(cell => {
                arrayCells.push(cell)
            })
        })
        return arrayCells


    }


    _build() {
        this._buildCells();
        this.buildItems(randomNumber(4), randomNumber(4), 2)
        this.buildItems(randomNumber(4), randomNumber(4), 2)
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

    buildItems(i, j, val = 0) {
        if (i > 3 && j > 3) {
            return
        }
        const cell = this._cells[i][j]
        cell.changeItem(2)
        // console.warn(cell);
        const gap = 5
        const item = new Item(this.game, i, j, val)
        item.position.set(i * (150 + gap) + 50, j * (150 + gap) + 50);
        this._cells[i][j].addItem(item)
        // console.warn(item);
        this.addChild(item)
    }

    pointerControler(e) {
        console.warn(e.key);
        switch (e.key) {
            case 'ArrowUp':
                this.goToUp();
                break;
            case 'ArrowDown':
                this.goToDown();
                break;
            case 'ArrowRight':
                this.goToRight();
                break;
            case 'ArrowLeft':
                this.goToLeft();
                break;
        }

    }

    goToUp() {
        console.warn("hasaGOTO");
        const matrix = this._cells
        for (let i = 1; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j].hasItem()) {
                    this.moveItemUP(matrix[i][j])
                }

            }

        }

    }

    goToDown() { }

    goToLeft() { }

    goToRight() { }

    moveItemUP(cell) {

        console.warn("move");
        const nextCellRow = cell.row
        const nextCellCol = cell.col - 1
        console.warn((this._cells[nextCellRow][nextCellCol], cell));
        if (nextCellCol < 0) {
            return
        }
        if (!(this._cells[nextCellRow][nextCellCol].hasItem())) {

            this._cells[nextCellRow][nextCellCol].addItem(cell.item)
            cell.removeItem()
            this.moveItemUP(this._cells[nextCellRow][nextCellCol])
        } else if (this._cells[nextCellRow][nextCellCol].item['labelVal'] === cell.item['labelVal']) {
            cell.removeItem()
            this._cells[nextCellRow][nextCellCol].item['labelVal'] *= 2
            this.moveItemUP(this._cells[nextCellRow][nextCellCol])
        } else {

        }
    }





}