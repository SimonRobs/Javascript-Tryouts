class SkylinePoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        stroke(255, 0, 0);
        strokeWeight(16);
        point(this.x, HEIGHT - this.y);
    }
}