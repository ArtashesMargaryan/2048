
export class Item extends Phaser.Sprite {
    constructor(game, row, col) {
        super(game);

        this._row = row;
        this._col = col;
        this._ball = null;
        this.empty = 0
        this.labelVal = 2


        this._build();
    }

    get row() {
        return this._row;
    }

    get labelValue() {
        return this.labelVal;
    }

    set labelValue(val) {
        this.labelVal = val
    }

    get isEmpty() {
        return !this.empty;
    }





    _build() {
        this._buildBg();
        this._buildText()
    }

    _buildBg() {
        const gr = this.game.add.graphics(0, 0);
        gr.beginFill(0xff2200);
        gr.drawRect(-75, -75, 150, 150);
        gr.endFill();
        this.addChild((this._bg = gr));
    }

    _buildText() {
        const style = {
            fontSize: 80,
            fill: '#FFAAFF',
            align: 'center',
        }
        const label = this.game.add.text(0, 0, `${this.labelValue}`, style)
        label.anchor.set(0.5, 0.5)
        this.addChild((this._label = label));
    }
}