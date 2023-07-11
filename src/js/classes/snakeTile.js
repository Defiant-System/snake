
class SnakeTile {
	constructor(opt) {
		this.parentState = opt.parentState;
		this.ctx = opt.parentState.ctx;
		this.col = opt.col;
		this.row = opt.row;
		this.x = opt.x;
		this.y = opt.y;
		this.w = opt.w;
		this.h = opt.h;
		this.alpha = 1;
	}

	update(i) {
		this.x = this.col * this.parentState.tileWidth;
		this.y = this.row * this.parentState.tileHeight;
		this.alpha = 1 - ( i / this.parentState.snake.tiles.length ) * 0.6;
	}

	render(i) {
		this.ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
		this.ctx.fillRect(this.x, this.y, this.w, this.h);
	}
}
