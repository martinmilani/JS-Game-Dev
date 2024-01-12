import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemies.js";
import { UI } from "./UI.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 900;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 50;
      this.speed = 3;
      this.maxSpeed = 3;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.floatingMessages = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.debug = false;
      this.score = 0;
      this.player.currentState = this.player.states[1];
      this.player.currentState.enter();
      this.maxParticles = 50;
      this.time = 0;
      this.maxTime = 3000;
      this.gameOver = false;
      this.winningScore = 40;
      this.lives = 3;
      this.paused = true;
    }
    update(deltaTime) {
      this.time += deltaTime;
      if (this.score >= this.winningScore) this.gameOver = true;
      this, this.background.update();
      this.player.update(this.input.keys, deltaTime);
      //handleEnemies
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);
      });
      // Handle messages
      this.floatingMessages.forEach((message) => {
        message.update();
      });
      // Handle particles
      this.particles.forEach((particle, index) => {
        particle.update();
      });
      if (this.particles.length > this.maxParticles) {
        this.particles.length = this.maxParticles;
      }
      //Handle collisions sprites
      this.collisions.forEach((collision, index) => {
        collision.update(deltaTime);
      });
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
      this.particles = this.particles.filter(
        (particle) => !particle.markedForDeletion
      );
      this.collisions = this.collisions.filter(
        (collision) => !collision.markedForDeletion
      );
      this.floatingMessages = this.floatingMessages.filter(
        (message) => !message.markedForDeletion
      );
    }
    draw(context) {
      this.background.draw(context);
      if (!this.paused) {
        this.player.draw(context);
        this.enemies.forEach((enemy) => {
          enemy.draw(context);
        });
        this.particles.forEach((particle) => {
          particle.draw(context);
        });
        this.collisions.forEach((collisions) => {
          collisions.draw(context);
        });
        this.floatingMessages.forEach((message) => {
          message.draw(context);
        });
      }
      this.UI.draw(context);
    }
    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.5)
        this.enemies.push(new GroundEnemy(this));
      else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
      this.enemies.push(new FlyingEnemy(this));
    }
    start() {
      this.paused = false;
      this.gameOver = false;
      animate(0);
    }
    restartGame() {
      this.player.restart();
      this.background.restart();
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.floatingMessages = [];
      this.enemyTimer = 0;
      this.debug = false;
      this.score = 0;
      this.speed = 3;
      this.player.currentState = this.player.states[1];
      this.player.currentState.enter();
      this.time = 0;
      this.gameOver = false;
      animate(0);
    }
  }

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    if (!game.gameOver && !game.paused) requestAnimationFrame(animate);
  }

  animate(0);
});
