let instances = 0;

class Building {
    constructor(l, r, h, color) {

        this.id = instances;
        instances++;

        this.left = l;
        this.right = r;
        this.height = h;

        this.color = color ? color : {
            r: randomInt(0, 255),
            g: randomInt(0, 255),
            b: randomInt(0, 255)
        }
    }

    randomizeColor() {
        this.color = {
            r: randomInt(0, 255),
            g: randomInt(0, 255),
            b: randomInt(0, 255)
        }
    }

    show() {
        strokeWeight(0)
        fill(this.color.r, this.color.g, this.color.b, 225);
        const w = this.right - this.left;
        rect(this.left, HEIGHT - this.height, w, this.height);

        // fill(0);
        // textSize(32);
        // text(this.id,this.left + min(10, w/2), HEIGHT - 10);
    }
}