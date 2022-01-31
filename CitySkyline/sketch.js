let HEIGHT = 0;
let WIDTH = 0;

const buildings = [];

function setup() {
  HEIGHT = 3 * windowHeight / 4;
  WIDTH = windowWidth;
  createCanvas(WIDTH, HEIGHT);
  addBuildings();
}

function draw() {
  background(51);
  for (let building of buildings) {
    building.show();
  }
  noLoop();
}