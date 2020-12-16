// import { Cell } from "./cell";
// import { BALL_COLORS, BALL_TYPES } from "./constants";
// import { BOARD_DIMENSION, INITIAL_BALLS_COUNT } from "./constants";
// export class Board extends Phaser.Sprite {
//     constructor(game) {
//         super(game);
//         this._cells = [];
//         this._selectedBall = null;
//         this._combinations = [];

//         this._build();
//     }

//     getEmptyCells() {
//         const cells = this.getCellsArray();
//         return cells.filter((cell) => cell.isEmpty);
//     }

//     getCellsArray() {
//         return this._cells.reduce((arr, row) => {
//             arr.push(...row);
//             return arr;
//         }, []);
//     }


//     _build() {
//         this._buildCells();
//     }

//     _buildCells() {
//         const { width, height } = BOARD_DIMENSION;
//         const gap = 5;

//         for (let i = 0; i < width; i++) {
//             const row = [];

//             for (let j = 0; j < height; j++) {
//                 const cell = new Cell(this.game, i, j);

//                 cell.position.set(j * (150 + gap) + 50, i * (150 + gap) + 50);
//                 this.addChild(cell);
//                 cell.cellClick.add(this._onCellClick, this);
//                 row.push(cell);
//             }

//             this._cells.push(row);
//         }
//     }

//     _onCellClick(row, col) {
//         const cell = this._cells[row][col];

//         if (cell.isEmpty) {
//             if (this.selectedBall) {
//                 const path = this._getPath(this.selectedCell, cell);
//                 if (path.length) {
//                     this._moveBall(path).then(() => {
//                         const hasMatch = this._checkMatch();
//                         if (!hasMatch) {
//                             this._generateNewBallsSet(3);
//                         }
//                     });
//                 }
//             }
//         } else {
//             if (this.selectedBall) {
//                 if (cell.ball.selected) {
//                     this.selectedBall.deselect();
//                 } else {
//                     this.selectedBall.deselect();
//                     cell.ball.select();
//                 }
//             } else {
//                 cell.ball.select();
//             }
//         }
//     }

//     goTuUp() { }

//     goTuDown() { }

//     goTuLeft() { }

//     goTuRight() { }
// }