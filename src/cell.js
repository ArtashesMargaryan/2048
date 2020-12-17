
export class Cell extends Phaser.Sprite {
    constructor(game, row, col) {
        super(game);
        this.row = row;
        this.col = col;
        this.item = null;
        this._hesItem = 0
        this._build();

    }


    _build() {
        this._buildBg();
    }

    _buildBg() {
        const gr = this.game.add.graphics(0, 0);
        gr.beginFill(0x9E9E9E);
        gr.drawRect(-75, -75, 150, 150);
        gr.endFill();
        this.addChild((this._bg = gr));
    }
    // changeItem(val) {
    //     this._hesItem = val;
    // }

    itemValue() {
        return this.item.labelVal
    }


    hasItem() {
        return this.item ? true : false
    }

    addItem(item) {
        const gap = 5
        this.item = item
        // this.item.position.set(this.position.x, this.position.y);
        this.item._col = this.col
        this.item._row = this.row
    }
    // removeItem() {
    //     const item = this.item

    //     this.item.remove()
    //     this.item = null
    //     return item
    // }



    removeItemINCell() {
        const item = this.item
        this.item = null
        return item
    }


}