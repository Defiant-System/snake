
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
		// var classString = "";
		// for (var k in this.classes) {
		// 	if (this.classes[ k ]) {
		// 		classString += k + " ";
		// 	}
		// }
		// this.elem.prop({ className: "tile " + classString });

		this.ctx.fillStyle = "rgba(0,0,0,.15)";
		this.ctx.fillRect(this.x, this.y, this.w, this.h);
		
		for (var k in this.classes) {
			if (this.classes.path) {
				switch (k) {
					case "up":
						break;
					case "down":
						break;
					case "left":
						this.ctx.fillStyle = "rgba(255,0,0,1)";
						this.ctx.fillRect(this.x, this.y, this.w, this.h);
						break;
					case "right":
						break;
				}
			}
		}
	}
}
