import { Cell } from "./cell.js";
import { Item } from "./item.js";
import { randomNumber, delta, deltaVektr } from './utils.js'
import { BOARD_DIMENSION, INITIAL_BALLS_COUNT } from "./constants.js";

export class Board extends Phaser.Sprite {
    constructor(game) {
        super(game);
        this._cells = [];
        this.dontMove = false
        this.interactive = true
        this._build();
        this.items = []
        this.item = null
        this.wasDone = false
        this._startPosition = []
        this._finishPosition = []
        window.addEventListener('keydown', this.pointerControler.bind(this))
        this._addListeners()
    }


    _addListeners() {

        const state = this.game.state.getCurrentState();

        state.input.onDown.addOnce(this._onPointerDown, this);

        state.input.onUp.addOnce(this._onPointerUp, this);
    }

    _onPointerDown(e) {
        this._startPosition.push(e.clientX)
        this._startPosition.push(e.clientY)
    }

    _onPointerUp(e) {
        if (this.dontMove) {
            return
        }
        const mousX = e.clientX
        const mousY = e.clientX
        const mousXS = this._startPosition[0]
        const mousYS = this._startPosition[1]
        this._startPosition.splice(0)
        const deltaX = delta(mousX, mousXS)
        const deltaY = delta(mousY, mousYS)
        const deltaV = -1 ? Math.max(deltaX, deltaY) === deltaY : 1
        if (deltaX < 10 || deltaY < 10) {
            return
        }

        if (!deltaV && mousX >= mousXS && deltaX > deltaY) {
            this.goToRight()
        } else if (deltaV && mousY > mousYS && deltaX < deltaY) {
            this.goToDown()
        } else if (deltaV && mousY < mousYS && deltaX < deltaY) {
            this.goToUp()
        } else if (!deltaV && mousX < mousXS && deltaX > deltaY) {
            this.goToLeft()
        }
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
        // arr = this.generatItemsPosition()
        // this.buildItems(arr[0], arr[1], 2)
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
        // this._testTween(i, j, val)
        // return
        const gap = 5
        const item = new Item(this.game, i, j, val)
        item.position.set(j * (150 + gap) + 50, i * (150 + gap) + 50);

        this._cells[i][j].addItem(item)
        this.addChild(item)

    }

    pointerControler(e) {
        if (this.dontMove) {
            return
        }
        console.warn(this.wasDone);
        switch (e.key) {
            case 'ArrowUp':
                this.goToUp();
                break
            case 'ArrowDown':
                this.goToDown();
                break
            case 'ArrowRight':
                this.goToRight();
                break
            case 'ArrowLeft':
                this.goToLeft();
                break
        }

    }

    generatItemsPosition() {
        const arrEmptyCells = this.getCellsArray()
        const cell = arrEmptyCells[randomNumber(arrEmptyCells.length - 1)]
        if (arrEmptyCells.length === 1) {
            return
        }
        return [cell.row, cell.col]
    }

    generateRadomItems() {
        const arr = this.generatItemsPosition()
        arr && this.buildItems(arr[0], arr[1], 2)

    }

    updateMatrixCell() {
        this.dontMove = true
        this.promArrary = []
        this._cells.forEach(row => {
            row.forEach(cell => {
                if (cell.hasItem()) {
                    this.itemMoving(cell)
                }
            })
        });
        const twinActionsPromice = Promise.all(this.promArrary)
        twinActionsPromice.then(() => {
            this.generateRadomItems();
            this.dontMove = false
        })
    }

    removeItems(row, col) {
        this.children.forEach(element => {
            if (element._row === row && element._col === col) {
                element.destroy()
                element = null

            };

        });
    }

    itemMoving(cell) {
        const item = cell.item
        const { x, y } = cell
        const prom = new Promise((resolve) => {

            this.game.add.tween(item)
                .to({ x, y }, 1000, Phaser.Easing.Linear.None, true, 0).onComplete.add(() => {
                    resolve()
                })
        })

        this.promArrary.push(prom)

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

        if (this.wasDone) {
            this.updateMatrixCell()
            // this.generateRadomItems()
            this.wasDone = false
        }
    }

    moveItemUP(cell) {
        if (cell.row < 1) {
            return
        }
        const nextRow = cell.row - 1
        const nextCol = cell.col
        if (!(this._cells[nextRow][nextCol].hasItem())) {
            this.wasDone = true
            this.item = cell.removeItemINCell()
            this._cells[nextRow][nextCol].addItem((this.item))
            this.moveItemUP(this._cells[nextRow][nextCol])
        } else if (this._cells[nextRow][nextCol].itemValue() === cell.itemValue()) {
            this.wasDone = true
            const newLabel = 2 * cell.itemValue()
            cell.removeItemINCell()
            this.removeItems(cell.row, cell.col)
            this.removeItems(nextRow, nextCol)
            this.buildItems(nextRow, nextCol, newLabel)
        } else {
            if (!this.item) {
                return
            }

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
            this.updateMatrixCell()

            // this.generateRadomItems()
            this.wasDone = false
        }
    }

    moveItemDown(cell) {
        const maxLength = this._cells.length - 1
        const nextRow = cell.row + 1
        const nextCol = cell.col
        let item
        if (cell.row > maxLength - 1) {
            return
        }
        if (!(this._cells[nextRow][nextCol].hasItem())) {

            this.item = cell.removeItemINCell()
            this._cells[nextRow][nextCol].addItem((this.item))

            this.moveItemDown(this._cells[nextRow][nextCol])
            this.wasDone = true
        } else if (this._cells[nextRow][nextCol].itemValue() === cell.itemValue()) {
            const newLabel = 2 * cell.itemValue()
            cell.removeItemINCell()
            this.removeItems(cell.row, cell.col)
            this.removeItems(nextRow, nextCol)
            this.wasDone = true
            this.buildItems(nextRow, nextCol, newLabel)

        } else {
            if (!this.item) {
                return
            }

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
            this.updateMatrixCell()

            // this.generateRadomItems()
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
            this.item = cell.removeItemINCell()
            this._cells[nextRow][nextCol].addItem((this.item))
            this.moveItemLeft(this._cells[nextRow][nextCol])
            this.wasDone = true
        } else if (this._cells[nextRow][nextCol].itemValue() === cell.itemValue()) {
            const newLabel = 2 * cell.itemValue()
            cell.removeItemINCell()
            this.removeItems(cell.row, cell.col)
            this.removeItems(nextRow, nextCol)
            this.buildItems(nextRow, nextCol, newLabel)
            this.wasDone = true
        } else {
            if (!this.item) {
                return
            }
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
            this.updateMatrixCell()

            // this.generateRadomItems()
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
            this.item = cell.removeItemINCell()
            this._cells[nextRow][nextCol].addItem((this.item))
            this.wasDone = true
            this.moveItemRight(this._cells[nextRow][nextCol])
        } else if (this._cells[nextRow][nextCol].itemValue() === cell.itemValue()) {
            const newLabel = 2 * cell.itemValue()
            cell.removeItemINCell()
            this.removeItems(cell.row, cell.col)
            this.removeItems(nextRow, nextCol)
            this.buildItems(nextRow, nextCol, newLabel)
            this.wasDone = true
        } else {
            if (!this.item) {
                return
            }
            // const { x, y } = cell
        }
    }








}