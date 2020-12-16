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
        this.wasDone = false
        window.addEventListener('keydown', this.pointerControler.bind(this))

    }



    getEmptyCells() {
        console.warn(this.getCellsArray());
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
        this.addItemRandom()
        this.addItemRandom()
    }

    addItemRandom() {
        let arr = this.generatItemsPosition()
        this.buildItems(arr[0], arr[1], 2)
        arr = this.generatItemsPosition()
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

    buildItems(i, j, val = 2) {
        const gap = 5
        const item = new Item(this.game, i, j, val)
        this._cells[i][j].addItem(item)
        this.addChild(item)
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

    generatItemsPosition() {
        const arrEmptyCells = this.getCellsArray()
        const cell = arrEmptyCells[randomNumber(arrEmptyCells.length - 1)]
        if (rrEmptyCells.length = 1) {
            this.gameOver()
        }
        return [cell.row, cell.col]
    }

    generateRadomItems() {
        setTimeout(() => {
            const arr = this.generatItemsPosition()
            console.warn(arr);
            this.buildItems(arr[0], arr[1], 2)
        }, 200)

    }

    removeItems(row, col) {
        this.children.forEach(element => {
            if (element._row === row && element._col === col) {
                element.destroy()
                element = null

            };

        });
    }

    goToUp() {
        const matrix = this._cells
        for (let i = 1; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j].hasItem()) {
                    // console.warn(i, j);
                    this.moveItemUP(matrix[i][j])
                }
            }
        }
        if (this.wasDone) {
            this.generateRadomItems()
            this.wasDone = false
        }
    }

    moveItemUP(cell) {
        if (cell.row < 1) {
            return
        }
        const nextCellRow = cell.row - 1
        const nextCellCol = cell.col


        if (!(this._cells[nextCellRow][nextCellCol].hasItem())) {
            this.wasDone = true
            const item = cell.removeItemINCell()
            this._cells[nextCellRow][nextCellCol].addItem((item))
            this.moveItemUP(this._cells[nextCellRow][nextCellCol])
        } else if (this._cells[nextCellRow][nextCellCol].itemValue() === cell.itemValue()) {
            this.wasDone = true
            const newLabel = 2 * cell.itemValue()
            cell.removeItemINCell()
            this.removeItems(cell.row, cell.col)
            this.removeItems(nextCellRow, nextCellCol)
            this.buildItems(nextCellRow, nextCellCol, newLabel)
        }
    }

    goToDown() {
        const matrix = this._cells
        for (let i = matrix.length - 2; i >= 0; i--) {
            for (let j = matrix[i].length - 1; j >= 0; j--) {
                if (matrix[i][j].hasItem()) {
                    this.moveItemDown(matrix[i][j])
                }
            }
        }
        if (this.wasDone) {
            this.generateRadomItems()
            this.wasDone = false
        }
    }

    moveItemDown(cell) {
        const maxLength = this._cells.length - 1
        const nextRow = cell.row + 1
        const nextCol = cell.col
        if (cell.row > maxLength - 1) {
            return
        }
        if (!(this._cells[nextRow][nextCol].hasItem())) {

            const item = cell.removeItemINCell()
            this._cells[nextRow][nextCol].addItem((item))
            this.moveItemDown(this._cells[nextRow][nextCol])
            this.wasDone = true
        } else if (this._cells[nextRow][nextCol].itemValue() === cell.itemValue()) {
            const newLabel = 2 * cell.itemValue()
            cell.removeItemINCell()
            this.removeItems(cell.row, cell.col)
            this.removeItems(nextRow, nextCol)
            this.wasDone = true
            this.buildItems(nextRow, nextCol, newLabel)

        }
    }

    goToLeft() {
        const matrix = this._cells
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 1; j < matrix.length; j++) {
                if (matrix[i][j].hasItem()) {
                    this.moveItemLeft(matrix[i][j])
                }

            }

        }
        if (this.wasDone) {
            this.generateRadomItems()
            this.wasDone = false
        }
    }
    moveItemLeft(cell) {
        const nextRow = cell.row
        const nextCol = cell.col - 1
        if (cell.col < 1) {
            return
        }
        if (!(this._cells[nextRow][nextCol].hasItem())) {
            const item = cell.removeItemINCell()
            this._cells[nextRow][nextCol].addItem((item))
            this.moveItemLeft(this._cells[nextRow][nextCol])
            this.wasDone = true

        } else if (this._cells[nextRow][nextCol].itemValue() === cell.itemValue()) {
            const newLabel = 2 * cell.itemValue()
            cell.removeItemINCell()
            this.removeItems(cell.row, cell.col)
            this.removeItems(nextRow, nextCol)
            this.buildItems(nextRow, nextCol, newLabel)
            this.wasDone = true

        }
    }

    goToRight() {
        const matrix = this._cells
        for (let i = 0; i < matrix.length; i++) {
            for (let j = matrix.length - 2; j >= 0; j--) {
                if (matrix[i][j].hasItem()) {
                    this.moveItemRight(matrix[i][j])
                }

            }

        }
        if (this.wasDone) {
            this.generateRadomItems()
            this.wasDone = false
        }
    }

    moveItemRight(cell) {
        const maxLength = this._cells.length - 1
        const nextRow = cell.row
        const nextCol = cell.col + 1
        if (cell.col > maxLength - 1) {
            return
        }
        if (!(this._cells[nextRow][nextCol].hasItem())) {
            const item = cell.removeItemINCell()
            this._cells[nextRow][nextCol].addItem((item))
            this.wasDone = true
            this.moveItemRight(this._cells[nextRow][nextCol])
        } else if (this._cells[nextRow][nextCol].itemValue() === cell.itemValue()) {
            const newLabel = 2 * cell.itemValue()
            cell.removeItemINCell()
            this.removeItems(cell.row, cell.col)
            this.removeItems(nextRow, nextCol)
            this.buildItems(nextRow, nextCol, newLabel)
            this.wasDone = true


        }
    }








}