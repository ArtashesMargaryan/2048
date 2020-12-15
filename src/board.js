import { Cell } from "./cell";
import { Item } from "./item";
import { randomNumber } from './utils'
import { BOARD_DIMENSION, INITIAL_BALLS_COUNT } from "./constants";

export class Board extends Phaser.Sprite {
    constructor(game) {
        super(game);
        this._cells = [];
        this.interactive = true
        this._build();
        this.items = []
        window.addEventListener('keydown', this.pointerControler.bind(this))
        this.game.state.getCurrentState().input.onDown.add((e) => {
            this.pointerUp = {
                y: e.screenY,
                x: e.screenX
            }
            console.warn(this.pointerDown);
        })
        this.game.state.getCurrentState().input.onUp.add((e) => {
            this.pointerDown = {
                y: e.screenY,
                x: e.screenX
            }
            console.warn(this.pointerUp);

        })
        //     this.addEventListener('pointerdown', (e) => {
        //         this.pointerDown = {
        //             y: e.screenY,
        //             x: e.screenX
        //         }
        //     })

    }

    _addListeners() {
        const state = this.game.state.getCurrentState();
        state.input.onDown.add(this._onPointerDown, this);
        state.input.onUp.add(this._onPointerUp, this);
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
        console.warn(cell);
        const gap = 5
        const item = new Item(this.game, i, j, val)
        item.position.set(i * (150 + gap) + 50, j * (150 + gap) + 50);
        this._cells[i][j].addItem(item)
        console.warn(item);
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
        const nextCellRow = cell.row - 1
        const nextCellCol = cell.col
        if ((this._cells[nextCellRow][nextCellCol].item) === null) {
            this.moveItemUP(this._cells[nextCellRow][nextCellCol])
        } else if (this._cells[nextCellRow][nextCellCol].item['labelVal']
            === cell.item['labelVal']) {

        }
    }

    compareCell(cellDown, cellUp) {
        if (cellDown.isEmpty === cellUp.isEmpty || !cellUp.isEmpty) {
            return true
        } else {

            return false
        }

    }

    itemJoin(cellDown, cellUp) {
        if (!cellUp.isEmpty) {
            console.warn(cellDown);
            const item = cellDown.removItem()
            item.position(cellUp.x, cellUp.y)
            cellUp.addItem(item)

        }
        cellUp.changeItem(2 * cellDown.isEmpty)
        // cellDown.removeItem()

    }

    pointerContainer() { }

    removeItem(i, j) {
        const val = 0
        this.items.forEach(item => {
            if (item.row === i && item.col === j) {
                val = item.labelValue()
                item.delete()
            }
        })
        return val
    }
}