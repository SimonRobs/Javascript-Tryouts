class Building {
    constructor(r, l, h) {
        this.right = r;
        this.left = l;
        this.height = h;

        this.color = {
            r: randomInt(0, 255),
            g: randomInt(0, 255),
            b: randomInt(0, 255)
        }
    }

    show() {
        fill(this.color.r, this.color.g, this.color.b, 225);
        const w = this.left - this.right;
        rect(this.right, HEIGHT - this.height, w, this.height);
    }
}