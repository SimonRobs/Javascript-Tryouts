class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getManhattanDistance(p) {
        return abs(this.x - p.x) + abs(this.y - p.y);
    }

    getMinDistanceFrom(points) {
        let minDist = Number.MAX_SAFE_INTEGER;
        for (let p of points) {
            let dist = this.getManhattanDistance(p);
            if (!this.equals(p) && dist < minDist) {
                minDist = dist;
            }
        }
        return minDist;
    }

    equals(p) {
        return this.x === p.x && this.y === p.y;
    }

    static getRandom() {
        return new Point(random(0, width), random(0, height));
    }
}