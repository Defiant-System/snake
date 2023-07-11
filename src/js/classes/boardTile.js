
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
			if (this.classes[ k ]) {
				this.classes[ k ]--;
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
		this.ctx.fillStyle = "rgba(0,0,0,.15)";
		this.ctx.fillRect(this.x, this.y, this.w, this.h);
		
		if (this.classes.path) {
			this.ctx.save();
			this.ctx.fillStyle = "#444";

			switch (true) {
				case !!this.classes.up:
					this.ctx.translate(this.x, this.y);
					this.ctx.beginPath();
					this.ctx.moveTo(8, 15);
					this.ctx.lineTo(12, 10);
					this.ctx.lineTo(16, 15);
					this.ctx.fill();
					break;
				case !!this.classes.down:
					this.ctx.translate(this.x, this.y);
					this.ctx.beginPath();
					this.ctx.moveTo(16, 15);
					this.ctx.lineTo(12, 10);
					this.ctx.lineTo(8, 15);
					this.ctx.fill();
					break;
				case !!this.classes.left:
					this.ctx.translate(this.x, this.y);
					this.ctx.beginPath();
					this.ctx.moveTo(15, 8);
					this.ctx.lineTo(10, 12);
					this.ctx.lineTo(15, 16);
					this.ctx.fill();
					break;
				case !!this.classes.right:
					this.ctx.translate(this.x, this.y);
					this.ctx.beginPath();
					this.ctx.moveTo(10, 8);
					this.ctx.lineTo(15, 12);
					this.ctx.lineTo(10, 16);
					this.ctx.fill();
					break;
			}

			this.ctx.restore();
		}

		if (!!this.classes.pressed) {
			this.ctx.save();

			this.ctx.rect(this.x, this.y, this.w, this.h);
			this.ctx.clip();

			this.ctx.filter = "blur(2px)";
			this.ctx.lineWidth = 3;
			this.ctx.strokeStyle = "rgba(0,0,0,.5)";
			this.ctx.strokeRect(this.x, this.y, this.w, this.h);

			this.ctx.restore();
		}

	}
}
