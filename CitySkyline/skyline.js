

class Skyline {
    constructor(points) {
        this.points = points;
        this.skyline = [];
        this.buildSkyline(points);
    }

    buildSkyline(points) {
        if (points.length < 1) return;
        this.skyline.push(new SkylinePoint(points[0].x, 0));

        for (let i = 0; i < points.length - 1; ++i) {
            this.skyline.push(points[i]);
            this.skyline.push(new SkylinePoint(points[i + 1].x, points[i].y));
        }

        this.skyline.push(new SkylinePoint(points[points.length - 1].x, 0));

    }

    show() {
        stroke(0);
        strokeWeight(3);
        fill(255, 150);
        beginShape();
        for (let i = 0; i < this.skyline.length - 1; ++i) {
            const p1 = this.skyline[i];
            const p2 = this.skyline[i + 1];
            vertex(p1.x, HEIGHT - p1.y);
            vertex(p2.x, HEIGHT - p2.y);
        }
        endShape(CLOSE);


        // for (let point of this.points)
        //     point.show();

    }
}