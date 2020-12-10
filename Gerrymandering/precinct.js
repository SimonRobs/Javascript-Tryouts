class Precinct {
  constructor(i, j, value) {
    this.i = i;
    this.j = j;
    this.pos = new Point(
      this.j + 0.5,
      this.i + 0.5
    );
    this.color = WHITE;
    this.value = value;
    this.inDistrict = false;
  }

  getDistanceFrom(p) {
    return abs(this.i - p.i) + abs(this.j - p.j);
  }

  show() {
    let pWidth = width / COLS;
    let pHeight = height / ROWS;
    let x = this.j * width / COLS;
    let y = this.i * height / ROWS;
    fill(this.color.r, this.color.g, this.color.b);
    stroke(51)
    strokeWeight(1);
    rect(x, y, pWidth, pHeight);
  }
}