let IsLoaded;
let dataSet;
let coefficients;
let IsInitialMatrix = true;
let linear = false;

//DOM elements
let linearToggleBtn;
let header;
let resetBtn;
let functionLabel;

/**
 * Snap to grid boolean
 */
let snapping = false;

let scale = 400;

function setup() {
  createCanvas(800, 800);
  dataSet = new Array();
  coefficients = new Array();
  initDOM();
}

function draw() {
  background(55);
  strokeWeight(5);
  translate(width / 2, height / 2);
  displayAxis();
  displayMouseCoordinates();

  stroke(255);
  for (let i = 0; i < dataSet.length; i++) {
    point(dataSet[i].x * (width / (2 * scale)), dataSet[i].y * (width / (2 * scale)));
  }

  if (linear)
    drawLinearRegression(dataSet);
  else
    drawPolynomialFitting(dataSet);
}

/**
 * Initialises each DOM element
 */
function initDOM() {
  //Header
  header = createElement("h3", "<-- Polynomial Fitting");
  header.position(width + 10, 20);
  //Linear/Polynomial Toggle Button
  linearToggleBtn = createButton("Linear");
  linearToggleBtn.mousePressed(function () {
    linear = !linear;
    reset();
  });
  linearToggleBtn.position(width + 10, 80);

  //Reset Button
  resetBtn = createButton("Reset");
  resetBtn.mousePressed(function () {
    reset();
  });
  resetBtn.position(width + linearToggleBtn.width + 70, 80);

  //Label for info and function
  functionLabel = createElement(
    'text',
    "Click anywhere on the canvas!</br>" +
    "Hold shift to snap the cursor to the grid.</br>" +
    "Use the mouse wheel to zoom in or out."
  );
  functionLabel.position(10, height + 10);
}

/**
 * Resets the graph and updates the DOM
 */
function reset() {
  if (linear) {
    linearToggleBtn.html("Polynomial");
    functionLabel.html(
      "Click anywhere on the canvas!</br>" +
      "Drag the mouse to draw multiple points!"
    );
    header.html("<-- Linear Regression");
    scale = 400;
  } else {
    linearToggleBtn.html("Linear");
    functionLabel.html(
      "Click anywhere on the canvas!</br>" +
      "Hold shift to snap the cursor to the grid.</br>" +
      "Use the mouse wheel to zoom in or out."
    );
    header.html("<-- Polynomial Fitting");
  }
  dataSet = new Array();
  coefficients = new Array();
  IsLoaded = false;
}