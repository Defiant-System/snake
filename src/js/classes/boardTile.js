
class BoardTile {
	constructor(opt) {
		this.parentGroup = opt.parentGroup;
		this.parentState = opt.parentState;
		this.ctx = opt.parentState.ctx;
		this.col = opt.col;
		this.row = opt.row;
		this.x = opt.x;
		this.y = opt.y;
		this.w = opt.w;
		this.h = opt.h;

		this.classes = {
			pressed: 0,
			path: 0,
			up: 0,
			down: 0,
			left: 0,
			right: 0
		}

		this.x = this.col * this.parentState.tileWidth;
		this.y = this.row * this.parentState.tileHeight;
		this.w = this.parentState.tileWidth - this.parentState.spacing;
		this.h = this.parentState.tileHeight - this.parentState.spacing;
	}

	update() {
		for (var k in this.classes) {
			if (this.classes[ k ] > 0) {
				this.classes[ k ] -= .025;
			}
		}

		if (this.parentState.food.tile.col == this.col || this.parentState.food.tile.row == this.row) {
			this.classes.path = 1;
			this.classes.right = this.col < this.parentState.food.tile.col ? 1 : 0;
			this.classes.left = this.col > this.parentState.food.tile.col ? 1 : 0;
			this.classes.up = this.row > this.parentState.food.tile.row ? 1 : 0;
			this.classes.down = this.row < this.parentState.food.tile.row ? 1 : 0;
		} else {
			this.classes.path = 0;
		}

		if (this.parentState.food.eaten) {
			this.classes.path = 0;
		}
	}

	render() {
		// prevents "transparent" snake body
		let tile = this.parentState.grid.get(this.row, this.col),
			isDead = this.parentState.snake.deathFlag;

		// paint grid cell
		this.ctx.fillStyle = "rgba(0,0,0,.15)";
		this.ctx.fillRect(this.x, this.y, this.w, this.h);
		if (tile === "snake" || isDead) return;

		let triangle = poly => {
				this.ctx.translate(this.x, this.y);
				this.ctx.beginPath();
				this.ctx.moveTo(...poly[0]);
				this.ctx.lineTo(...poly[1]);
				this.ctx.lineTo(...poly[2]);
				this.ctx.fill();
			};
		
		// paind path
		if (this.classes.path) {
			let food = this.parentState.food,
				foodPos = [food.tile.col, food.tile.row],
				thisPos = [this.col, this.row],
				distance = food.pulseTick - this.parentState.grid.distance(foodPos, thisPos),
				alpha = distance < 5 && distance > 0 ? distance / 4 : .2;

			this.ctx.save();
			this.ctx.fillStyle = `rgba(120,120,120,${alpha})`;

			switch (true) {
				case !!this.classes.up: triangle([[8,15], [12,10], [16,15]]); break;
				case !!this.classes.down: triangle([[16,10], [12,15], [8,10]]); break;
				case !!this.classes.left: triangle([[15,8], [10,12], [15,16]]); break;
				case !!this.classes.right: triangle([[10,8], [15,12], [10,16]]); break;
			}

			this.ctx.restore();
		}

		// paint pressed snake path
		if (this.classes.pressed > 0) {
			this.ctx.fillStyle = `rgba(0,0,0,${this.classes.pressed * .1})`;
			this.ctx.fillRect(this.x, this.y, this.w, this.h);

			this.ctx.save();
			this.ctx.rect(this.x, this.y, this.w, this.h);
			this.ctx.clip();

			this.ctx.filter = "blur(4px)";
			this.ctx.lineWidth = 3;
			this.ctx.strokeStyle = `rgba(10,10,10,${this.classes.pressed * .75})`;
			this.ctx.strokeRect(this.x, this.y, this.w, this.h);
			this.ctx.restore();
		}

	}
}
