/* 
 * *************************************
 *  CONSTANTS
 * *************************************
 **/
const PLANK_WIDTH = 48;
const MAX_NEEDLES = 6177;
const NEEDLES_PER_FRAME = 100;
const NEEDLE_WIDTH = 5 * PLANK_WIDTH / 6;
/* 
 * *************************************
 * *************************************
 **/

let plankLines = [];
let needles = [];

// Variables to calculate pi
let nNeedlesCrossing = 0;
let approximation = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupDOM();
  for (let i = 0; i < windowWidth; i += PLANK_WIDTH) {
    plankLines.push(i);
  }
  drawPlanks();
}

function draw() {
  addNeedles(NEEDLES_PER_FRAME);
}

const addNeedles = (n) => {
  for (let i = 0; i < n; ++i) {
    if (needles.length < MAX_NEEDLES) {

      // Get the center point
      const center = createVector(random(0, width), random(0, height));

      // Initialize a random vector
      const v = p5.Vector.random2D();
      v.normalize();
      v.mult(NEEDLE_WIDTH / 2);

      // Calculate the two edge points of the needle
      const p0 = p5.Vector.add(center, v);
      const p1 = p5.Vector.sub(center, v);

      let r = 255;
      let g = 255;
      let b = 255;

      // Check for line intersection
      const maxX = max(p0.x, p1.x);
      const minX = min(p0.x, p1.x);
      const targetPlankX = plankLines[floor(maxX / PLANK_WIDTH)];
      if (maxX >= targetPlankX && minX <= targetPlankX) {
        nNeedlesCrossing++;
        r = 0;
        b = 0;
      }

      // Add the needle
      needles.push({
        p0: p0,
        p1: p1,
        r: r,
        g: g,
        b: b,
      });

      drawNeedle(needles[needles.length - 1]);
      updateApproximation();
    }
  }
}

const setupDOM = () => {
  approxP = select('#approx');
  select('#plankWidthP').html(`Plank Width (${PLANK_WIDTH})`);
  select('#needleWidthP').html(`Needle Width (${NEEDLE_WIDTH})`);
  select('#maxNeedlesP').html(`Max Needles (${MAX_NEEDLES})`);
  select('#needlesPerFrameP').html(`Needles Per Frame (${NEEDLES_PER_FRAME})`);
  select('#reset').mousePressed(reset);
};

const drawPlanks = () => {
  background(51);
  stroke(21);
  for (let plankX of plankLines)
    line(plankX, 0, plankX, height);
};

const drawNeedle = (n) => {
  stroke(n.r, n.g, n.b, 180);
  line(n.p0.x, n.p0.y, n.p1.x, n.p1.y);
};

const updateApproximation = () => {
  const numerator = 2 * NEEDLE_WIDTH * needles.length;
  const denominator = PLANK_WIDTH * nNeedlesCrossing;
  approximation = numerator / denominator;
  approxP.html(approximation.toFixed(8));
};

const reset = () => {
  needles = [];
  nNeedlesCrossing = 0;
  approximation = 0;
  drawPlanks();
};