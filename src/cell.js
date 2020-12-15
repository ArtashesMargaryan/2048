import * as Phaser from "phaser-ce";
import { Textura } from "./textura";



export class Cell extends Phaser.Sprite {
    constructor(game, row, col) {
        super(game);

        this._row = row;
        this._col = col;
        this._ball = null;

        this.cellClick = new Phaser.Signal();

        this._build();
        this._buildText()
    }

    get row() {
        return this._row;
    }

    get col() {
        return this._col;
    }

    get isEmpty() {
        return !this._ball;
    }

    get ball() {
        return this._ball;
    }



    _build() {
        const gr = this.game.add.graphics(0, 0);
        gr.beginFill(0xcccccc);
        gr.drawRect(-25, -25, 150, 150);
        gr.endFill();
        this.addChild(gr);
    }

    _buildText() {
        const cellValue = new Textura(this.game)
        this.addChild(cellValue)
    }
}