class Precinct {
  constructor(i, j, value) {
    this.i = i;
    this.j = j;
    this.pos = new Point(
      this.j * width / COLS,
      this.i * height / ROWS
    );
    this.districtId = '';
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
    let x = this.pos.x;
    let y = this.pos.y;
    fill(this.color.r, this.color.g, this.color.b);
    strokeWeight(1);
    rect(x, y, pWidth, pHeight);
    // fill(0);
    // text(this.districtId, x + pWidth / 2, y + pHeight / 2);
  }
}