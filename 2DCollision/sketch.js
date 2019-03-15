let balls;
let explosions;

const MAX_BALLS = 10;
const MAX_SPEED = 8;
const RADIUS = 20;

let toggleBallsBtn;
let toggleExplosionsBtn;

let showBalls, showExplosions;

function setup() {
  createCanvas(500, 500);
  handleButtonInput();
  showBalls = true;
  showExplosions = true;

  balls = [];
  explosions = [];
  for (let i = 0; i < MAX_BALLS; i++) {
    balls.push(new Ball(
      random(RADIUS, width - RADIUS),
      random(RADIUS, height - RADIUS),
      RADIUS, random(1, 10),
      random(-6, 6), random(-6, 6)));
  }
}

function draw() {
  background(0, 20);
  updateAndRenderBalls();
  updateAndRenderExplosions();
}

function updateAndRenderExplosions() {
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update();
    if (showExplosions) explosions[i].render();
    if (explosions[i].faded) explosions.splice(i, 1);
  }
}

function updateAndRenderBalls() {
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.update();
    if (showBalls) b.render();
    checkCollision(b);
    if (b.broken) balls.splice(i, 1);
  }
}

function checkCollision(b) {
  for (let i = 0; i < balls.length; i++) {
    let other = balls[i];
    if (other != b && b.collide(other)) {
      let d = createVector(b.pos.x - other.pos.x, b.pos.y - other.pos.y);
      let collisionPoint = createVector(other.pos.x + d.x / 2, other.pos.y + d.y / 2);
      explosions.push(new Explosion(collisionPoint));
    }
    if (other.broken) balls.splice(i, 1);
  }
}

function distSq(v1, v2) {
  let d = createVector(v1.x - v2.x, v1.y - v2.y);
  return (d.x * d.x + d.y * d.y);
}

function handleButtonInput() {
  toggleBallsBtn = createButton("Toggle balls");
  toggleExplosionsBtn = createButton("Toggle explosions");

  toggleBallsBtn.position(2, height + 2);
  toggleExplosionsBtn.position(toggleBallsBtn.width + 20, height + 2);

  toggleBallsBtn.mousePressed(function () {
    showBalls = !showBalls;
  });
  toggleExplosionsBtn.mousePressed(function () {
    showExplosions = !showExplosions;
  });
}