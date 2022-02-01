class Building {
    constructor(l, r, h) {
        this.left = l;
        this.right = r;
        this.height = h;

        this.color = {
            r: randomInt(0, 255),
            g: randomInt(0, 255),
            b: randomInt(0, 255)
        }
    }

    show() {
        fill(this.color.r, this.color.g, this.color.b, 225);
        const w = this.right - this.left;
        rect(this.left, HEIGHT - this.height, w, this.height);
    }
}