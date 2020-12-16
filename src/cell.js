
export class Cell extends Phaser.Sprite {
    constructor(game, row, col) {
        super(game);

        this.row = row;
        this.col = col;
        this.item = null;
        this._hesItem = 0

        this.cellClick = new Phaser.Signal();

        this._build();
    }

    changeItem(val) {
        this._hesItem = val;
    }

    itemValue() {
        return this.item.labelVal
    }

    get isEmpty() {
        return this._hesItem;
    }
    hasItem() {
        return this.item ? true : false
    }

    addItem(item) {
        const gap = 5
        this.item = item
        this.item.position.set(this.position.x, this.position.y);
        this.item._col = this.col
        this.item._row = this.row
    }
    removeItem() {
        const item = this.item

        this.item.remove()
        this.item = null
        return item
    }



    removeItemINCell() {
        const item = this.item
        this.item = null
        return item
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