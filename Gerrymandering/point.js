class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getManhattanDistance(p) {
        return abs(this.x - p.x) + abs(this.y - p.y);
    }

    static getRandom() {
        return new Point(random(0, width), random(0, height));
    }
}