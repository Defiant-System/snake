
class BoardTile {
	constructor(opt) {
		this.parentState = opt.parentState;
		this.parentGroup = opt.parentGroup;
		this.col = opt.col;
		this.row = opt.row;
		this.x = opt.x;
		this.y = opt.y;
		this.z = 0;
		this.w = opt.w;
		this.h = opt.h;

		let div = $(`<div class="tile"></div>`)[0];
		this.elem = this.parentState.stageElem.append(div);
		this.classes = {
			pressed: 0,
			path: 0,
			up: 0,
			down: 0,
			left: 0,
			right: 0
		}
		this.updateDimensions();
	}

	update() {
		for( var k in this.classes ) {
			if( this.classes[ k ] ) {
				this.classes[ k ]--;
			}
		}

		if( this.parentState.food.tile.col == this.col || this.parentState.food.tile.row == this.row ) {
			this.classes.path = 1;
			if( this.col < this.parentState.food.tile.col ) {
				this.classes.right = 1;
			} else {
				this.classes.right = 0;
			}
			if( this.col > this.parentState.food.tile.col ) {
				this.classes.left = 1;
			} else {
				this.classes.left = 0;
			}
			if( this.row > this.parentState.food.tile.row ) {
				this.classes.up = 1;
			} else {
				this.classes.up = 0;
			}
			if( this.row < this.parentState.food.tile.row ) {
				this.classes.down = 1;
			} else {
				this.classes.down = 0;
			}
		} else {
			this.classes.path = 0;
		}

		if( this.parentState.food.eaten ) {
			this.classes.path = 0;
		}
	}

	updateDimensions() {
		this.x = this.col * this.parentState.tileWidth;
		this.y = this.row * this.parentState.tileHeight;
		this.w = this.parentState.tileWidth - this.parentState.spacing;
		this.h = this.parentState.tileHeight - this.parentState.spacing;
		
		this.elem.css({
			left: this.x,
			top: this.y,
			width: this.w,
			height: this.h,
		});
	}

	render() {
		var classString = "";
		for( var k in this.classes ) {
			if( this.classes[ k ] ) {
				classString += k + " ";
			}
		}
		this.elem.prop({ className: "tile " + classString });
	}
}
