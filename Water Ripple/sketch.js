let current, previous;
let cols, rows;

let dampening;
let dampeningSlider;
let dampeningP;

/**
 * The setup function
 */
function setup() {
  createCanvas(150, 150);
  cols = width;
  rows = height;
  current = [];
  previous = [];
  for (let i = 0; i < cols * rows; i++) {
    current.push(0);
    previous.push(0);
  }
  //Set default dampening
  dampening = 0.87;

  //Init the dampening Slider element
  dampeningSlider = createSlider(0.5, 0.99, dampening, 0.01);
  dampeningSlider.position(0, height + 10);
  
  //Init the dampening P element
  dampeningP = createP("Dampening: " + dampening);
  dampeningP.position(2, height + dampeningSlider.height + 10);

  pixelDensity(1);
}

/**
 * The draw function
 */
function draw() {
  background(0);
  
  //Update DOM values
  dampening = dampeningSlider.value();
  dampeningP.html("Dampening: " + dampening);
  
  loadPixels();
  //Loop through each of the pixels and update it's color
  //according to the water ripple algorithm
  for (let i = 1; i < cols - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      let index = i + j * cols;
      current[index] =
        (previous[i + 1 + j * cols] +
          previous[i - 1 + j * cols] +
          previous[i + (j + 1) * cols] +
          previous[i + (j - 1) * cols]) / 2 - current[index];

      current[index] *= dampening;
      set(i, j, color(current[index] * 255));
    }
  }
  updatePixels();
  //Swap the buffers
  let temp = current;
  current = previous;
  previous = temp;
}

/**
 * Mouse dragged event handler to allow water ripple creation
 */
function mouseDragged() {
  if (mouseX > 0 && mouseX < width - 1 && mouseY > 0 && mouseY < height - 1)
    previous[mouseX + mouseY * cols] = 255;
}