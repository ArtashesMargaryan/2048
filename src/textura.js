export class Textura extends Phaser.Text {
    constructor(game) {
        super(game)
        //    this.text=data.defoultValue
        this.value = 2
        bmpText = game.add.bitmapText(10, 100, 'carrier_command', `${this.value}`, 34);

        bmpText.inputEnabled = true;

        this.value.input.enableDrag()
    }
}