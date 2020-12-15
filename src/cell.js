
export class Cell extends Phaser.Sprite {
    constructor(game, row, col) {
        super(game);

        this._row = row;
        this._col = col;
        this._ball = null;
        this._hesItem = 0

        this.cellClick = new Phaser.Signal();

        this._build();
    }

    changeItem(val) {
        this.hesItem = val;
    }

    removeItem() {
        this.hesItem = 0;
    }

    get isEmpty() {
        return !this.hesItem;
    }





    _build() {
        this._buildBg();
        // this._buildText()
    }

    _buildBg() {
        const gr = this.game.add.graphics(0, 0);
        gr.beginFill(0xffae00);
        gr.drawRect(-75, -75, 150, 150);
        gr.endFill();
        this.addChild((this._bg = gr));
    }

    // _buildText() {
    //     const style = {
    //         fontSize: 25,
    //         fill: '#FFFFFF',
    //         align: 'center',
    //     }
    //     const label = this.game.add.text(0, 0, 'asd', style)
    //     label.anchor.set(0.5, 0.5)
    //     this.addChild((this._label = label));
    // }
}