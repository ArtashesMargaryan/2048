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
        // console.warn(this.getCellsArray());
        const cells = this.getCellsArray();
        const arr = []
        this.getCellsArray().forEach(element => {

        });

    }

    getCellsArray() {
        const arrayCells = [];
        this._cells.forEach(cells => {
            cells.forEach(cell => {
                !cell.hasItem() && arrayCells.push(cell)
            })
        })
        return arrayCells


    }


    _build() {
        this._buildCells();
        this.buildItems(2, 2, 2)
        this.buildItems(1, 2, 2)
        console.warn(this.getEmptyCells())
    }

    generatItemsPosition() {
        const arrEmptyCells = this.getCellsArray()

        const cell = arrEmptyCells[randomNumber(arrEmptyCells.length - 1)]
        return [cell.row, cell.col]
    }

    buildItems(i, j, val = 2) {


        if (i > 3 && j > 3) {
            return
        }
        // console.warn(cell);
        const gap = 5
        const item = new Item(this.game, i, j, val)
        item.position.set(i * (150 + gap) + 50, j * (150 + gap) + 50);
        this._cells[i][j].addItem(item)
        this.addChild(item)
    }

    generateRadomItems() {
        const arr = this.generatItemsPosition()
        this.buildItems(arr[0], arr[1], 2)
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


    removeItems(row, col) {
        console.warn(this.children);

        this.children.forEach(element => {
            if (element._row === row && element._col === col) {
                console.warn(element);
                element.destroy()
                element = null

            };

        });
    }

    pointerControler(e) {
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
        const matrix = this._cells
        for (let i = 1; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j].hasItem()) {
                    this.moveItemUP(matrix[i][j])
                }
            }
        }
    }

    moveItemUP(cell) {
        const nextCellRow = cell.row - 1
        const nextCellCol = cell.col
        if (nextCellRow < 0) {
            return
        }
        if (!(this._cells[nextCellRow][nextCellCol].hasItem())) {
            const item = cell.removeItemINCell()
            this._cells[nextCellRow][nextCellCol].addItem((item))
            this.moveItemUP(this._cells[nextCellRow][nextCellCol])
        } else if (this._cells[nextCellRow][nextCellCol].itemValue() === cell.itemValue()) {
            const newLabel = 2 * cell.itemValue()
            this.removeItems(cell.row, cell.col)
            this.removeItems(nextCellRow, nextCellCol)
            this.buildItems(nextCellRow, nextCellCol, newLabel)
        }
    }

    goToDown() {
        const matrix = this._cells
        for (let i = matrix.length - 1; i >= 0; i--) {
            for (let j = matrix[i].length - 1; j >= 0; j--) {
                if (matrix[i][j].hasItem()) {
                    this.moveItemDown(matrix[i][j])
                }
            }
        }
    }

    moveItemDown(cell) {
        console.warn(cell);
        const maxLength = this._cells.length - 1
        const nextRow = cell.row + 1
        const nextCellCol = cell.col
        if (nextRow > maxLength) {
            return
        }
        if (!(this._cells[nextRow][nextCellCol].hasItem())) {
            const item = cell.removeItemINCell()
            this._cells[nextRow][nextCellCol].addItem((item))
            this.moveItemDown(this._cells[nextRow][nextCellCol])
        } else if (this._cells[nextRow][nextCellCol].itemValue() === cell.itemValue()) {
            const newLabel = 2 * cell.itemValue()
            this.removeItems(cell.row, cell.col)
            this.removeItems(nextRow, nextCellCol)
            this.buildItems(nextRow, nextCellCol, newLabel)

        }
    }

    goToLeft() {
        const matrix = this._cells
        for (let i = 0; i < matrix.length; i++) {
            for (let j = matrix[i].length - 1; j >= 0; j--) {
                if (matrix[i][j].hasItem()) {
                    this.moveItemLeft(matrix[i][j])
                }

            }

        }
    }
    moveItemLeft(cell) {
        // console.warn("move");
        const nextRow = cell.row
        const nextCol = cell.col - 1
        if (nextCol < 0) {
            return
        }
        if (!(this._cells[nextRow][nextCol].hasItem())) {
            const item = cell.removeItemINCell()
            this._cells[nextRow][nextCol].addItem((item))
            this.moveItemLeft(this._cells[nextRow][nextCol])
        } else if (this._cells[nextRow][nextCol].itemValue() === cell.itemValue()) {
            const newLabel = 2 * cell.itemValue()
            this.removeItems(cell.row, cell.col)
            this.removeItems(nextRow, nextCol)
            this.buildItems(nextRow, nextCol, newLabel)
        }
    }

    goToRight() {
        const matrix = this._cells
        for (let i = matrix.length - 1; i >= 0; i--) {
            for (let j = 0; j < matrix.length; j++) {
                if (matrix[i][j].hasItem()) {
                    this.moveItemRight(matrix[i][j])
                }

            }

        }
    }
    moveItemRight(cell) {
        const maxLength = this._cells.length - 1
        // console.warn("move");
        const nextRow = cell.row
        const nextCol = cell.col + 1
        if (nextCol > maxLength) {
            return
        }
        console.warn(this._cells[nextRow][nextCol]);
        if (!(this._cells[nextRow][nextCol].hasItem())) {
            const item = cell.removeItemINCell()
            this._cells[nextRow][nextCol].addItem((item))
            this.moveItemRight(this._cells[nextRow][nextCol])
        } else if (this._cells[nextRow][nextCol].itemValue() === cell.itemValue()) {
            const newLabel = 2 * cell.itemValue()
            this.removeItems(cell.row, cell.col)
            this.removeItems(nextRow, nextCol)
            this.buildItems(nextRow, nextCol, newLabel)

        }
    }








}