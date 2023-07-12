
class FoodTile {
	constructor(opt) {
		this.parentState = opt.parentState;
		this.parentGroup = opt.parentGroup;
		this.ctx = opt.parentState.ctx;
		this.col = opt.col;
		this.row = opt.row;
		this.x = opt.x;
		this.y = opt.y;
		this.w = opt.w;
		this.h = opt.h;
		this.scale = 1;
		this.opacity = 0;
	}

	update() {
		this.x = this.col * this.parentState.tileWidth;
		this.y = this.row * this.parentState.tileHeight;
		this.scale = 0.55 + Math.sin( this.parentState.time.elapsed / 200 ) * 0.45;

		if( this.parentState.food.birthTick || this.parentState.food.deathTick ) {
			if( this.parentState.food.birthTick ) {
				this.opacity = 1 - ( this.parentState.food.birthTick / 1 ) * 1;
			} else {
				this.opacity = ( this.parentState.food.deathTick / 1 ) * 1;
			}
		} else {
			this.opacity = 1;
		}
	}

	render() {
		let d1 = 7 * this.scale,
			d2 = d1 * 2,
			opacity = this.opacity + .5;
		// exit if dead
		if (this.parentState.snake.deathFlag) return;

		this.ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
		this.ctx.fillRect(this.x+d1, this.y+d1, this.w-d2, this.h-d2);
	}
}
