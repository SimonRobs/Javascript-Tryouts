const COLS = 60;
const ROWS = 10;

const N = COLS * ROWS;
const M = 50;
const MAX_DIST = Math.ceil(N / M / 2);

let points = [];
let centers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  createRectangle();
  // centers = new Halton();
  centers = new KMeansPlusPlus();
}

function draw() {
  noLoop();
  showRectangle();
  centers.show();
}

function createRectangle() {
  // Initialize the points in the rectangle
  for (i = 0; i < ROWS; ++i) {
    for (j = 0; j < COLS; ++j) {
      let xOffset = width / COLS;
      let yOffset = height / ROWS;
      let x = j * xOffset + xOffset / 2;
      let y = i * yOffset + yOffset / 2;
      points.push(new Point(x, y));
    }
  }
}

function showRectangle() {
  rectMode(CENTER);
  background(255);
  for (let p of points) {
    stroke(51);
    fill(255);
    rect(p.x, p.y, width / COLS, height / ROWS);
  }
}

function getPointsPerClusterBounds(nPoints, nClusters) {
  let low = Math.floor(nPoints / nClusters);
  let high = Math.ceil(nPoints / nClusters);
  return {
    low,
    high
  };
}