export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      if (e.code === "Enter" && this.game.paused) this, game.start();
      else if (e.code === "Enter" && this.game.gameOver)
        this.game.restartGame();
      else if (
        (e.code === "ArrowDown" ||
          e.code === "ArrowUp" ||
          e.code === "ArrowLeft" ||
          e.code === "ArrowRight" ||
          e.code === "Space") &&
        this.keys.indexOf(e.code) === -1
      ) {
        this.keys.push(e.code);
      } else if (e.code === "d") this.game.debug = !this.game.debug;
    });
    window.addEventListener("keyup", (e) => {
      if (
        e.code === "ArrowDown" ||
        e.code === "ArrowUp" ||
        e.code === "ArrowLeft" ||
        e.code === "ArrowRight" ||
        e.code === "Space"
      ) {
        this.keys.splice(this.keys.indexOf(e.code), 1);
      }
    });
  }
}
