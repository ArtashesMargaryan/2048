export class Container extends Phaser.Sprite {
  constructor(game) {
    super(game);

    this.build();
  }
  build() {
    this.buildSocer();
    this.buildRetry();
    this.undoCheng();
  }
  buildSocer() {
    let socer = this.findMaxVal();
    this.buildSocerItem((socer = 256));
  }
  findMaxVal(itemArray = []) {
    let max = 2;
    itemArray.forEach((item) => {
      if (item.labelValue > max) {
        max = item.labelValue;
      }
    });
    return max;
  }
  buildSocerItem(val) {
    const gr = this.game.add.graphics(0, 0);
    gr.beginFill(0xe91e63);
    // gr.drawRect(-72, -72, 145, 145);
    gr.drawRoundedRect(-95, -40, 190, 80, 40);
    gr.endFill();

    this.addChild(gr);
    const style = {
      fontSize: 80,
      fill: '#FFFFFF',
      align: 'center',
    };
    const label = this.game.add.text(0, 0, `${val}`, style);
    label.anchor.set(0.5, 0.5);
    this.addChild(label);
  }

  buildRetry() {
    const spriteRetry = this.game.add.image(-70, 60, 'retry');
    const undo = this.game.add.image(20, 60, 'undo');
    this.addChild((this.retry = spriteRetry));
    this.addChild((this.undo = undo));
  }

  undoCheng() {}
}
