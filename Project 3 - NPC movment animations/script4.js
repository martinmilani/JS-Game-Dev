const canvas4 = document.getElementById("canvas4");
const ctx4 = canvas4.getContext("2d");
CANVAS_WIDTH = canvas4.width = 500;
CANVAS_HEIGHT = canvas4.height = 1000;
const numberOfEnemies4 = 20;
const enemiesArray4 = [];

let gameFrame4 = 0;

canvas4.addEventListener("mousemove", function (event) {
  let rect = canvas4.getBoundingClientRect(); // Get the bounding rectangle of the canvas

  let mouseX = event.clientX - rect.left; // Calculate X-coordinate relative to the canvas
  let mouseY = event.clientY - rect.top; // Calculate Y-coordinate relative to the canvas

  console.log("Mouse X:", mouseX, "Mouse Y:", mouseY);

  // You can use these coordinates for drawing or other canvas-related tasks
});

class Enemy4 {
  constructor() {
    this.image = new Image();
    this.image.src = "enemy4.png";
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 213;
    this.spriteHeight = 212;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (canvas4.width - this.width);
    this.y = Math.random() * (canvas4.height - this.height);
    this.newX = Math.random() * (canvas4.width - this.width);
    this.newY = Math.random() * (canvas4.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.interval = Math.floor(Math.random() * 200 + 50);
  }
  update() {
    if (gameFrame4 % this.interval === 0) {
      this.newX = Math.random() * (canvas4.width - this.width);
      this.newY = Math.random() * (canvas4.height - this.height);
    }
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;
    this.x -= dx / 70;
    this.y -= dy / 70;
    if (this.x + this.width < 0) this.x = canvas4.width;
    // animate sprites
    if (gameFrame4 % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    ctx4.drawImage(
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

for (let x = 0; x < numberOfEnemies4; x++) {
  enemiesArray4.push(new Enemy4());
}

function animate4() {
  ctx4.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray4.forEach((enemy4) => {
    enemy4.update();
    enemy4.draw();
  });
  gameFrame4++;
  requestAnimationFrame(animate4);
}

animate4();
