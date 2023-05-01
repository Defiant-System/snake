
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
		this.elem = document.createElement( 'div' );
		this.elem.style.position = 'absolute';
		this.parentState.stageElem.appendChild( this.elem );
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
		this.elem.style.left = this.x + 'px';
		this.elem.style.top = this.y + 'px';
		this.elem.style.width = this.w + 'px';
		this.elem.style.height = this.h + 'px';
		this.elem.style[ 'transform' ] = 'translateZ(0) scale(' + this.scale + ')';
		this.elem.style.backgroundColor = 'hsla(' + this.hue + ', 100%, 60%, 1)';
		this.elem.style.boxShadow = '0 0 ' + this.blur + 'px hsla(' + this.hue + ', 100%, 60%, 1)';
		this.elem.style.opacity = this.opacity;
	};
}
