export class Item extends Phaser.Sprite {
    constructor(game, row, col, val) {
        super(game);

        this._row = row;
        this._col = col;
        this.empty = 0
        this.labelVal = val
        this.colors = {
            2: '0xffd180 ',
            4: '0xff7043',
            8: '0xff5722',
            16: '0xff3d00',
            32: '0xa42abe3',
            64: '0x2d1fa6',
            128: '0xe91e63',
            256: '0xa89132',
            512: '0x5e35b1',
            1024: '0xa89132',
            2048: '0xa89132',
            4096: '0xa89132',
            8192: '0xa89132',



        }

        this._build();
    }


    get row() {
        return this._row;
    }
    get col() {
        return this._col;
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


    remove() {
        this.destroy()

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
            fill: '#FFFFFF',
            align: 'center',
        }
        const label = this.game.add.text(0, 0, `${this.labelValue}`, style)
        label.anchor.set(0.5, 0.5)
        this.addChild((this._label = label));
    }
}