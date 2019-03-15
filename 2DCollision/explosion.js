class Explosion {
  /**
   * Constructor for an Explosion object
   * @param {double} collisionPoint - Point where the collision happened
   */
  constructor(collisionPoint) {
    this.pos = collisionPoint;

    this.explosionRadius = 0;
    this.explosionAlpha = 255;

    this.red = 255;
    this.blue = 255;
    this.green = 255;

    this.faded = false;
  }

  /**
   * Update method called every frame
   */
  update() {
    this.explosionRadius += 2;
    let alphaStep = 3;
    let blueStep = 6;
    let greenStep = 4;
    if (this.explosionAlpha - alphaStep > 0) this.explosionAlpha -= alphaStep;
    if (this.blue - blueStep > 0) this.blue -= blueStep;
    if (this.green - greenStep > 0) this.green -= greenStep;
    if (this.explosionRadius > RADIUS * 3)
      this.faded = true;
  }

  /**
   * Render method called every frame
   */
  render() {
    noFill();
    stroke(this.red, this.green, this.blue, this.explosionAlpha);
    ellipse(this.pos.x, this.pos.y, this.explosionRadius, this.explosionRadius);
  }

}