
class FoodTile {
	constructor(opt) {
		this.parentState = opt.parentState;
		this.parentGroup = opt.parentGroup;
		this.col = opt.col;
		this.row = opt.row;
		this.x = opt.x;
		this.y = opt.y;
		this.w = opt.w;
		this.h = opt.h;
		this.blur = 0;
		this.scale = 1;
		this.hue = 100;
		this.opacity = 0;
		
		let div = $(`<div style="position: absolute;"></div>`)[0];
		this.elem = this.parentState.stageElem.append(div);
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
	};

	updateDimensions() {
		this.w = this.parentState.tileWidth - this.parentState.spacing;
		this.h = this.parentState.tileHeight - this.parentState.spacing;
	};

	render() {
		this.elem.css({
			left: this.x + "px",
			top: this.y + "px",
			width: this.w + "px",
			height: this.h + "px",
			transform: "translateZ(0) scale(" + this.scale + ")",
			backgroundColor: "hsla(" + this.hue + ", 100%, 60%, 1)",
			boxShadow: "0 0 " + this.blur + "px hsla(" + this.hue + ", 100%, 60%, 1)",
			opacity: this.opacity,
		});
	};
}
