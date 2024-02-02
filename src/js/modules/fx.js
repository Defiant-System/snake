
let FX = {
	particles: [],
	init() {
		// canvas reference
		this.cvs = window.find("canvas.fx-layer");
		this.ctx = this.cvs[0].getContext("2d", { willReadFrequently: true });
		
		let width = +this.cvs.prop("offsetWidth"),
			height = +this.cvs.prop("offsetHeight");
		this.cvs.attr({ width, height });
		this.dim = { width, height };
	},
	explode(tile) {
		var particleCount = 3,
			x = tile.col * 26,
			y = tile.row * 26;
		// shards
		while(particleCount--) {
			this.particles.push(new Shard(this, x, y));
		}
	},
	update() {
		let i = this.particles.length;
		while (i--) {
			this.particles[i].update(i);
		}
	},
	draw() {
		let ctx = this.ctx;
		if (!this.particles.length) return;
		// reset canvas
		this.cvs.attr({ width: this.dim.width });
		this.ctx.save();
		// push origo to sync layers
		this.ctx.translate(70, 70);
		// update particles
		this.update();
		// draw particle
		this.particles.map(p => p.draw(ctx));
		this.ctx.restore();
	}
};
