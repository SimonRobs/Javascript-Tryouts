const N_BUILDINGS = 25;
let HEIGHT = 0;
let WIDTH = 0;

const buildings = [];
let skyline;

function setup() {
  HEIGHT = 3 * windowHeight / 4;
  WIDTH = windowWidth;
  createCanvas(WIDTH, HEIGHT);
  addBuildings();

  const skylinePoints = findSkyline();
  skyline = new Skyline(skylinePoints);

}

function draw() {
  background(121, 93, 225);
  
  for (let building of buildings)
    building.show();

  skyline.show();

  noLoop();
}