export class Item extends Phaser.Sprite {
    constructor(game, row, col, val) {
        super(game);

        this._row = row;
        this._col = col;
        this.empty = 0
        this.labelVal = val
        this.colors = {
            2: '0xa89132',
            4: '0x8ba832',
            8: '0xdb5151',
            16: '0x2accf5',
            32: '0xa42abe3',
            64: '0x2d1fa6',
            128: '0xa89132',
            256: '0xa89132',
            512: '0xa89132',
            1024: '0xa89132',
            2048: '0xa89132',
            4096: '0xa89132',
            8192: '0xa89132',
        }
        this._build();
    }


    _build() {
        this._buildBg();
        this._buildText()
    }

    _buildBg() {
        const gr = this.game.add.graphics(0, 0);
        gr.beginFill((this.colors[this.labelVal]));
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
        // const label = this.game.add.text(0, 0, `2`, style)
        const label = this.game.add.text(0, 0, `${this.labelVal}`, style)
        label.anchor.set(0.5, 0.5)
        this.addChild((this._label = label));
    }
    // get row() {
    //     return this._row;
    // }
    // get col() {
    //     return this._col;
    // }

    // get labelValue() {
    //     return this.labelVal;
    // }

    // set labelValue(val) {
    //     this.labelVal = val
    // }

    // get isEmpty() {
    //     return !this.empty;
    // }


    // remove() {
    //     this.destroy()

    // }

}