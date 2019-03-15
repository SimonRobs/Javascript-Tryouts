class Ball {
	/**
	 * Constructor for a Ball object
	 * @param {int} x - x position
	 * @param {int} y - y position
	 * @param {int} r - radius
	 * @param {int} m - mass
	 * @param {double} dx - x speed
	 * @param {double} dy - y speed
	 */
	constructor(x, y, r, m, dx, dy) {
		this.pos = createVector(x, y);
		this.r = r;
		this.m = m;

		if (dx == null || dy == null)
			this.vel = createVector(0, 0);
		else
			this.vel = createVector(dx, dy);

		this.red = 23;
		this.green = 214;
		this.blue = 154;

		this.broken = false;

	}

	/**
	 * Bounce off the walls of the canvas
	 */
	bounce() {
		if (this.pos.x + this.vel.x < this.r ||
			this.pos.x + this.vel.x > width - this.r)
			this.vel.x *= -1;
		if (this.pos.y + this.vel.y < this.r ||
			this.pos.y + this.vel.y > height - this.r)
			this.vel.y *= -1;
	}

	/**
	 * Update the ball position
	 */
	move() {
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
	}

	/**
	 * Constrains the ball's speed to the maximum speed
	 */
	correctSpeed() {
		if (this.vel.x > MAX_SPEED) this.vel.x = MAX_SPEED;
		if (this.vel.y > MAX_SPEED) this.vel.y = MAX_SPEED;
	}

	/**
	 * Updates the color of the ball.
	 * If the ball becomes red it breaks
	 */
	updateStatus() {
		this.red++;
		if (this.green > 0) this.green--;
		if (this.green < this.blue && this.blue > 0) this.blue--;
		if (this.red > 255) {
			this.red = 255;
			this.broken = true;
		}
	}

	/**
	 * Collision logic between this ball and the parameter
	 * @param {Ball} ball 
	 */
	collide(ball) {
		//Check if in range
		let safeDist = createVector(this.pos.x + this.vel.x, this.pos.y + this.vel.y);
		if (distSq(safeDist, ball.pos) <= (this.r + ball.r) * (this.r + ball.r)) {

			//Calculate normal and tangent vector (and normalize them).
			let un = (createVector(this.pos.x - ball.pos.x, this.pos.y - ball.pos.y)).normalize();
			let ut = createVector(-un.y, un.x);

			//Calculate speed components relative to normal and tangent vector.
			let v1n = un.x * this.vel.x + un.y * this.vel.y;
			let v1t = ut.x * this.vel.x + ut.y * this.vel.y;

			let v2n = un.x * ball.vel.x + un.y * ball.vel.y;
			let v2t = ut.x * ball.vel.x + ut.y * ball.vel.y;

			//Calculate the new normal speed (Tangent speed stays the same because there's no force in that direction).
			let vp1n = (v1n * (this.m - ball.m) + 2 * ball.m * v2n) / (this.m + ball.m);
			let vp2n = (v2n * (ball.m - this.m) + 2 * this.m * v1n) / (this.m + ball.m);

			//Recalculate normal and tangent module.
			let newThisVelNorm = createVector(un.x * vp1n, un.y * vp1n);
			let newThisVelTang = createVector(ut.x * v1t, ut.y * v1t);

			let newBallVelNorm = createVector(un.x * vp2n, un.y * vp2n);
			let newBallVelTang = createVector(ut.x * v2t, ut.y * v2t);

			//Assign the new speed vector to balls.
			this.vel = newThisVelNorm.add(newThisVelTang);
			ball.vel = newBallVelNorm.add(newBallVelTang);

			//Update broken status.
			this.updateStatus();
			ball.updateStatus();

			return true;
		}
		return false;
	}

	/**
	 * Update method called every frame
	 */
	update() {
		this.move();
		this.bounce();
	}

	/**
	 * Render method called every frame
	 */
	render() {
		noStroke();
		fill(this.red, this.green, this.blue, 100);
		ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
	}
}