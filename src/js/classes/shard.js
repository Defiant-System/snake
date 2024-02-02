
class Shard {
	constructor(parent, x, y) {
		this.parent = parent;
		this.x = x;
		this.y = y;

		this.w =
		this.h = Util.rand(7, 13);
		this.cX =
		this.cY = this.w * .5;

		// set a random angle in all possible directions, in radians
		this.angle = Util.rand(-1.75, -2.5) + (Math.random() > .5 ? 0 : Math.PI * .33);
		this.speed = Util.rand(4, 10);

		this.moveRotation = Util.rand(-12, 12);
		this.rotation = 0;
		this.rad = Math.PI / 180;

		// friction will slow the shard down
		this.friction = 0.925;
		// gravity will be applied and pull the shard down
		this.gravity = 2.5;
		// set how fast the shard fades out
		this.decay = Util.rand(0.04, 0.07);
		this.alpha = 1;
	}

	update(index) {
		// slow down the shard
		this.speed *= this.friction;
		// apply velocity
		this.x += Math.cos(this.angle) * this.speed;
		this.y += Math.sin(this.angle) * this.speed + this.gravity;
		// fade out the shard
		this.alpha -= this.decay;

		this.rotation += this.moveRotation;
		// this.rotation %= 360;

		// remove the shard once the alpha is low enough, based on the passed in index
		if (this.alpha <= this.decay) {
			this.parent.particles.splice(index, 1);
		}
	}

	draw(ctx) {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotation * this.rad);

		ctx.fillStyle = "#fff";
		ctx.globalAlpha = this.alpha;
		// ctx.globalCompositeOperation = "lighter";
		ctx.fillRect(-this.cX, -this.cY, this.w, this.h);

		ctx.restore();
	}
}
