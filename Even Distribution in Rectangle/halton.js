class Halton {

    constructor() {
        this.centers = [];
        // Distribute the centers following a Halton Sequence
        for (let i = 0; i < M; i++) {
            let x = this.getHalton(i, M) * width;
            let y = this.getHalton(i, 3) * height
            this.centers.push(new Point(x, y));
        }
    }

    show() {
        for (let c of this.centers) {
            noStroke();
            fill(255, 0, 0);
            ellipse(c.x, c.y, 10);
        }
    }

    getHalton(index, base) {
        var result = 0,
            frac = 1 / base,
            i = index + 1;

        while (i > 0) {
            result += frac * (i % base);
            i = Math.floor(i / base);
            frac = frac / base;
        }

        return result;
    }
}