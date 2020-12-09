class Cluster {
    constructor(id, center) {
        this.id = id;
        this.center = center;
        this.points = [];
    }

    clear() {
        this.points = [];
    }

    distanceFromCenter(p) {
        return this.center.getManhattanDistance(p);
    }

    addPoint(p) {
        this.points.push(p);
    }

    recalculateCenter() {
        if (this.points.length == 0) return;
        let sumX = 0;
        let sumY = 0;
        for (let p of this.points) {
            sumX += p.x;
            sumY += p.y;
        }
        let meanX = sumX / this.points.length;
        let meanY = sumY / this.points.length;
        this.center = new Point(meanX, meanY);
    }

    static getRandomCenters() {
        let centers = [];
        for (let i = 0; i < N_DISTRICTS; ++i) {
            centers.push(new Point(0, 0));
        }
        return centers;
    }

    static calculateCumulativeCentersDistance(centers1, centers2) {
        let cumulativeDist = 0;
        for (let i = 0; i < N_DISTRICTS; ++i) {
            let c1 = centers1[i];
            let c2 = centers2[i];
            let dist = c1.getManhattanDistance(c2);
            cumulativeDist += dist;
        }
        return cumulativeDist;
    }
}