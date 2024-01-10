export class CollisionAnimation {
  constructor(game, x, y) {
    this.game = game;
    this.image = document.getElementById("collisionAnimation");
    this.spreiteWidth = 100;
    this.spreiteHeight = 90;
    this.sizeModifier = Math.random() + 0.5;
    this.width = this.spreiteWidth * this.sizeModifier;
    this.height = this.spreiteHeight * this.sizeModifier;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
    this.frameX = 0;
    this.maxFrame = 4;
    this.markedForDeletion = false;
    this.fps = Math.random() * 10 + 5;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spreiteWidth,
      0,
      this.spreiteWidth,
      this.spreiteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update(deltaTime) {
    this.x -= this.game.speed;
    if (this.frameTimer > this.frameInterval) {
      this.frameX++;
      this.frameTime = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    if (this.frameX > this.maxFrame) this.markedForDeletion = true;
  }
}
