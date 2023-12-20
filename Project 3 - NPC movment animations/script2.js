const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
CANVAS_WIDTH = canvas2.width = 500;
CANVAS_HEIGHT = canvas2.height = 1000;
const numberOfEnemies2 = 20;
const enemiesArray2 = [];

let gameFrame2 = 0;

class Enemy2 {
  constructor() {
    this.image = new Image();
    this.image.src = "enemy2.png";
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (canvas2.width - this.width);
    this.y = Math.random() * (canvas2.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.2;
    this.curve = Math.random() * 7;
  }
  update() {
    this.x -= this.speed;
    this.y += this.curve * Math.sin(this.angle);
    this.angle += this.angleSpeed;
    if (this.x + this.width < 0) this.x = canvas.width;
    // animate sprites
    if (gameFrame2 % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    ctx2.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

for (let x = 0; x < numberOfEnemies2; x++) {
  enemiesArray2.push(new Enemy2());
}

function animate2() {
  ctx2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray2.forEach((enemy2) => {
    enemy2.update();
    enemy2.draw();
  });
  gameFrame2++;
  requestAnimationFrame(animate2);
}

animate2();
