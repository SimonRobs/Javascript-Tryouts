let GameOfLife = function (p) {

  /**
   * Setup function for the game of life
   */
  p.setup = function () {
    p.createCanvas(800, 800);
    cols = p.width / CELL_SIZE;
    rows = p.height / CELL_SIZE;

    world = new World(p);
    world.populate();
  }

  /**
   * Draw function for the game of life
   */
  p.draw = function () {
    p.background(0);
    world.show();
    world.update();
  }

  /**
   * Gets the neighbours of the clicked organism
   */
  p.mousePressed = function () {
    if (CELL_SIZE == 100) {
      if (p.mouseX > 0 && p.mouseY > 0 &&
        p.mouseX < p.width && p.mouseY < p.height) {

        let index = world.findClosestIndex(p.mouseX, p.mouseY);
        let neighbours = world.getNeighbours(index);
        let prep = new Neighbours(neighbours);

        if (targetNeighboursDiv != null) {
          targetNeighboursDiv.remove();
          targetNeighboursDiv.canvas.remove();
        }

        targetNeighboursDiv = new p5(prep, 'mainSketchDiv');
      }
    }
  }
}