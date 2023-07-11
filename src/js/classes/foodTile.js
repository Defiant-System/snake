
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
		this.blur = 0;
		this.scale = 1;
		this.opacity = 0;
		
		let div = $(`<div style="position: absolute;"></div>`)[0];
		// this.elem = this.parentState.stageElem.append(div);
	}

	updateDimensions() {
		this.w = this.parentState.tileWidth - this.parentState.spacing;
		this.h = this.parentState.tileHeight - this.parentState.spacing;
	}

	update() {
		this.x = this.col * this.parentState.tileWidth;
		this.y = this.row * this.parentState.tileHeight;
		this.blur = this.parentState.dimAvg * 0.03 + Math.sin( this.parentState.time.elapsed / 200 ) * this.parentState.dimAvg * 0.015;
		this.scale = 0.8 + Math.sin( this.parentState.time.elapsed / 200 ) * 0.2;

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
		let d1 = 4 * this.scale,
			d2 = d1 * 2,
			opacity = this.opacity + .5;

		this.ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
		this.ctx.fillRect(this.x + d1, this.y + d1, this.w - d2, this.h - d2);
	}
}
