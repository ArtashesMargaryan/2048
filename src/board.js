import { Cell } from './cell.js';
import { Item } from './item.js';
import { randomNumber, delta, deltaVektr } from './utils.js';
import { BOARD_DIMENSION, INITIAL_BALLS_COUNT } from './constants.js';

const vektorsData = [
  { rowDelta: -1, colDelta: 0 },
  { rowDelta: 0, colDelta: 1 },
  { rowDelta: 0, colDelta: -1 },
  { rowDelta: 1, colDelta: 0 },
];

export class Board extends Phaser.Sprite {
  constructor(game) {
    super(game);
    this._cells = [];
    this.dontMove = false;
    this.interactive = true;
    this._build();
    this.items = [];
    this.item = null;
    this.wasDone = false;
    this._startPosition = [];
    this._finishPosition = [];
    this._addAllEvents();
    this.returnMat(); ///**** */
  }

  _addAllEvents() {
    window.addEventListener('keydown', this.pointerControler.bind(this));

    const state = this.game.state.getCurrentState();

    state.input.onUp.add(this._onPointerUp, this);
  }

  checkGame() {
    let match = false;
    const arr = this.children.filter((item) => item.labelVal);
    arr.forEach((item) => {
      arr.forEach((element) => {
        if (item.labelVal === element.labelVal) {
          if (delta(item.row, element.row) + delta(item.col, element.col) == 1) {
            match = true;
          }
        }
      });
    });
    return false;
  }

  returnMat() {
    const arr = this.children.filter((item) => item.labelVal);
    console.warn(arr);
    return arr;
  }

  _onPointerUp(e) {
    if (this.dontMove) {
      return;
    }
    const mousX = e.clientX;
    const mousY = e.clientX;
    const mousXS = e.positionDown.x;
    const mousYS = e.positionDown.y;
    this._startPosition.splice(0);
    const deltaX = delta(mousX, mousXS);
    const deltaY = delta(mousY, mousYS);
    const deltaV = -1 ? Math.max(deltaX, deltaY) === deltaY : 1;
    if (deltaX < 10 || deltaY < 10) {
      return;
    }

    if (!deltaV && mousX >= mousXS && deltaX > deltaY) {
      this.goToRight();
    } else if (deltaV && mousY > mousYS && deltaX < deltaY) {
      this.goToDown();
    } else if (deltaV && mousY < mousYS && deltaX < deltaY) {
      this.goToUp();
    } else if (!deltaV && mousX < mousXS && deltaX > deltaY) {
      this.goToLeft();
    }
  }

  getCellsArray() {
    const arrayCells = [];
    this._cells.forEach((cells) => {
      cells.forEach((cell) => {
        !cell.hasItem() && arrayCells.push(cell);
      });
    });
    return arrayCells;
  }
  gameOver() {
    alert('gameOver');
  }

  _build() {
    this._buildCells();
    this.addItemRandom();
  }

  addItemRandom() {
    let arr = this.generatItemsPosition();
    this.buildItems(arr[0], arr[1], 2);
    arr = this.generatItemsPosition();
    this.buildItems(arr[0], arr[1], 2);
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
    const promis = new Promise((resolve) => {
      const gap = 5;
      const item = new Item(this.game, i, j, val);
      this.game.add
        .tween(item.scale)
        .from({ x: 0.1, y: 0.1 }, 200, Phaser.Easing.Back.Out, true, 0);

      item.position.set(j * (150 + gap) + 50, i * (150 + gap) + 50);

      this._cells[i][j].addItem(item);
      this.addChild(item);
      this.wasDone = false;
    });
    return promis;
  }

  pointerControler(e) {
    if (this.dontMove) {
      return;
    }
    this.dontMove = true;
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

  genereteItem() {
    if (this.wasDone) {
      this.updateMatrixCell().then(this.generateRadomItems.bind(this));

      // this.generateRadomItems()
    }
  }

  generatItemsPosition() {
    const arrEmptyCells = this.getCellsArray();
    const cell = arrEmptyCells[randomNumber(arrEmptyCells.length - 1)];
    if (arrEmptyCells.length === 0) {
      !this.checkGame() && this.gameOver();
    } else return [cell.row, cell.col];
  }

  generateRadomItems() {
    const arr = this.generatItemsPosition();
    arr && this.buildItems(arr[0], arr[1], 2);
  }

  updateMatrixCell() {
    this.promArrary = [];
    this._cells.forEach((row) => {
      row.forEach((cell) => {
        if (cell.hasItem()) {
          this.itemMoving(cell);
        }
      });
    });
    const twinActionsPromice = Promise.all(this.promArrary);
    return twinActionsPromice;
  }

  removeItems(row, col) {
    this.children.forEach((element) => {
      if (element._row === row && element._col === col) {
        element.destroy();
        element = null;
      }
    });
  }

  itemMoving(cell) {
    const item = cell.item;
    const { x, y } = cell;
    const prom = new Promise((resolve) => {
      this.game.add
        .tween(item)
        .to({ x, y }, 2000, Phaser.Easing.Linear.None, true, 0)
        .onComplete.add(() => {
          resolve();
        });
    });

    this.promArrary.push(prom);
  }

  itemBulding(cell, val) {
    const item = new Item(this.game, cell.row, cell.col, val);
    cell.addItem(item);
    this.addChild(item);
    const { x, y } = cell;
    const prom = new Promise((resolve) => {
      this.game.add
        .tween(item.scale)
        .from({ x, y }, 200, Phaser.Easing.Linear, true, 0)
        .onComplete.add(() => {
          resolve();
        });
    });

    this.promArrary.push(prom);
  }

  goToUp() {
    const matrix = this._cells;
    for (let i = 1; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j].hasItem()) {
          this.moveItem(matrix[i][j], 1);
        }
      }
    }

    this.genereteItem();
  }

  goToDown() {
    const matrix = this._cells;
    for (let i = matrix.length - 2; i >= 0; i--) {
      for (let j = matrix[i].length - 1; j >= 0; j--) {
        if (matrix[i][j].hasItem()) {
          this.moveItem(matrix[i][j], 4);
        }
      }
    }
    this.genereteItem();
  }

  goToLeft() {
    const matrix = this._cells;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 1; j < matrix.length; j++) {
        if (matrix[i][j].hasItem()) {
          this.moveItem(matrix[i][j], 3);
        }
      }
    }
    this.genereteItem();
  }

  goToRight() {
    const matrix = this._cells;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = matrix.length - 2; j >= 0; j--) {
        if (matrix[i][j].hasItem()) {
          this.moveItem(matrix[i][j], 2);
        }
      }
    }
    this.genereteItem();
  }

  moveItem(cell, vektr) {
    if (vektr === 3) {
    }
    const { rowDelta, colDelta } = vektorsData[vektr - 1];
    const maxLength = this._cells.length - 1;
    const nextRow = cell.row + rowDelta;
    const nextCol = cell.col + colDelta;
    if (
      (vektr === 2 && cell.col > maxLength - 1) ||
      (vektr === 3 && cell.col < 1) ||
      (vektr === 1 && cell.row < 1) ||
      (vektr === 4 && cell.row > maxLength - 1)
    ) {
      return 0;
    }
    // console.warn(nextRow, nextCol);

    if (
      this._cells[nextRow][nextCol].hasItem() &&
      this._cells[nextRow][nextCol].itemValue() === cell.itemValue()
    ) {
      const newLabel = 2 * cell.itemValue();
      const { x, y } = this._cells[nextRow][nextCol];
      const prom = new Promise((resolve) => {
        this.updateMatrixCell();
        this.wasDone = true;
        cell.removeItemINCell();
        this.removeItems(cell.row, cell.col);
        this.removeItems(nextRow, nextCol);
      }).then(
        this.buildItems(nextRow, nextCol, newLabel).then(() => {
          this.updateMatrixCell();
        })

        // .then(this.generateRadomItems())
      );
    } else if (!this._cells[nextRow][nextCol].hasItem()) {
      this.item = cell.removeItemINCell();
      this._cells[nextRow][nextCol].addItem(this.item);
      this.wasDone = true;
      this.moveItem(this._cells[nextRow][nextCol], vektr);
    } else {
      if (!this.item) {
        return;
      }
    }
  }
}
