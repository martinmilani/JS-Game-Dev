export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Bahianita";
  }
  draw(context) {
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.color;
    // score
    context.fillText("Score: " + this.game.score, 15, 40);
  }
}
