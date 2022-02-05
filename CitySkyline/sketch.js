const GRID_COLS = 30;
const GRID_ROWS = 30;
const TILE_STROKE_WEIGHT = 1;

let hoveredTile = undefined;
let leftCorner = undefined;
let rightCorner = undefined;
let tempBuilding = undefined;
let swapped = false;

const N_BUILDINGS = 10;
let HEIGHT = 0;
let WIDTH = 0;

const canvasGrid = [];
const buildings = [];
let skyline;

function setup() {
  HEIGHT = windowHeight;
  WIDTH = windowHeight;
  createCanvas(WIDTH + TILE_STROKE_WEIGHT, HEIGHT);
  createGrid();

  // addBuildings();
  // const skylinePoints = findSkyline();
  // skyline = new Skyline(skylinePoints);

}

function draw() {
  background(255, 100)
  for (let tile of canvasGrid) {
    drawTile(tile);
  }
  line(WIDTH, 0, WIDTH, HEIGHT);

  for (let building of buildings)
    building.show();


  if (skyline) skyline.show();


  if (tempBuilding) {
    tempBuilding.show();
  }

  drawHoveredTile();

}

function createGrid() {
  for (let i = 0; i < GRID_ROWS; ++i) {
    for (let j = 0; j < GRID_COLS; ++j) {
      canvasGrid.push({ i, j });
    }
  }
}

function drawTile(tile) {
  const tileWidth = WIDTH / GRID_COLS;
  const tileHeight = HEIGHT / GRID_ROWS;
  const pos = getTilePos(tile);
  stroke(0);
  strokeWeight(TILE_STROKE_WEIGHT);
  fill(255, 10);
  rect(pos.x, pos.y, tileWidth, tileHeight);
}

function drawHoveredTile() {
  if(!hoveredTile) return;
  const tileWidth = WIDTH / GRID_COLS;
  const tileHeight = HEIGHT / GRID_ROWS;
  const pos = getTilePos(hoveredTile);
  fill(200, 100);
  strokeWeight(TILE_STROKE_WEIGHT);
  rect(pos.x, pos.y, tileWidth, tileHeight);
  fill(0);
  noStroke();
  textSize(18);
  textAlign(CENTER, CENTER);
  if (GRID_COLS > 25) {
    if (hoveredTile.j === 0)
      textAlign(LEFT, CENTER);
    else if (hoveredTile.j === GRID_COLS - 1)
      textAlign(RIGHT, CENTER);
  }
  text(`(${GRID_COLS - hoveredTile.i},${hoveredTile.j + 1})`, pos.x + tileWidth / 2, pos.y + tileHeight / 2);

}

function getTilePos(tile) {
  const tileWidth = WIDTH / GRID_COLS;
  const tileHeight = HEIGHT / GRID_ROWS;
  const xPos = tile.j * tileWidth;
  const yPos = tile.i * tileHeight;
  return createVector(xPos, yPos);
}

function mouseMoved() {
  hoveredTile = getHoveredTile(mouseX, mouseY);
}

function mouseDragged() {
  if (!hoveredTile) return;
  hoveredTile = getHoveredTile(mouseX, mouseY);
  if (!swapped && leftCorner === undefined)
    leftCorner = hoveredTile;
  if (swapped && rightCorner === undefined)
    rightCorner = hoveredTile;

  if (!swapped)
    rightCorner = hoveredTile;
  else leftCorner = hoveredTile;

  if (rightCorner.j < leftCorner.j) {
    let temp = rightCorner;
    rightCorner = leftCorner;
    leftCorner = temp;
    swapped = !swapped
  }

  tempBuilding = getTempBuilding();
}

function mouseReleased() {
  if (!leftCorner) return;
  tempBuilding.randomizeColor();
  buildings.push(tempBuilding);
  leftCorner = undefined;
  rightCorner = undefined;
  tempBuilding = undefined;
}

function keyPressed() {
  if (keyCode === 32) {
    skyline = [];
    const skylinePoints = findSkyline();
    skyline = new Skyline(skylinePoints);
  }
}

function getHoveredTile() {
  if (mouseX >= WIDTH || mouseY >= HEIGHT || mouseX < 0 || mouseY < 0) {
    hoveredTile = undefined;
    return;
  }
  const tileRow = int(mouseY / HEIGHT * GRID_ROWS);
  const tileCol = int(mouseX / WIDTH * GRID_COLS);
  return canvasGrid[tileRow * GRID_COLS + tileCol];
}

function getTempBuilding() {
  const l = leftCorner.j * WIDTH / GRID_COLS;
  const r = (rightCorner.j + 1) * WIDTH / GRID_COLS;
  const h = HEIGHT - hoveredTile.i * HEIGHT / GRID_ROWS;
  return new Building(l, r, h, { r: 230, g: 230, b: 230 });
}