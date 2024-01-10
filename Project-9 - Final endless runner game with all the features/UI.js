export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 34;
    this.fontFamily = "Bahianita";
  }
  draw(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "black";
    context.shadowBlur = 2;
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = "white";
    // score
    context.fillText("Score: " + this.game.score, 15, 40);
    // timer
    context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
    context.fillText("Time: " + (this.game.time * 0.001).toFixed(1), 15, 70);
    //game over messages
    if (this.game.gameOver) {
      context.textAlign = "center";
      context.font = this.fontSize * 2 + "px " + this.fontFamily;
      if (this.game.score > this.game.winningScore) {
        context.fillText(
          "You win!",
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
        context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
      } else {
        context.fillText(
          "Game over!",
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
        context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
      }
      context.fillText(
        "Press Enter to play again",
        this.game.width * 0.5,
        this.game.height * 0.5 + 20
      );
    }
    context.restore();
  }
}
