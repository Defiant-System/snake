
class SnakeTile {
	constructor(opt) {
		this.parentState = opt.parentState;
		this.parentGroup = opt.parentGroup;
		this.col = opt.col;
		this.row = opt.row;
		this.x = opt.x;
		this.y = opt.y;
		this.w = opt.w;
		this.h = opt.h;
		this.color = null;
		this.scale = 1;
		this.rotation = 0;
		this.blur = 0;
		this.alpha = 1;
		this.borderRadius = 0;
		this.borderRadiusAmount = 0;

		let div = $(`<div style="position: absolute;"></div>`)[0];
		// this.elem = this.parentState.stageElem.append(div);
	}

	update(i) {
		this.x = this.col * this.parentState.tileWidth;
		this.y = this.row * this.parentState.tileHeight;
		if( i == 0 ) {
			this.color = "#fff";
			this.blur = this.parentState.dimAvg * 0.03 + Math.sin( this.parentState.time.elapsed / 200 ) * this.parentState.dimAvg * 0.015;
			if( this.parentState.snake.dir == "n" ) {
				this.borderRadius = this.borderRadiusAmount + "% " + this.borderRadiusAmount + "% 0 0";
			} else if( this.parentState.snake.dir == "s" ) {
				this.borderRadius = "0 0 " + this.borderRadiusAmount + "% " + this.borderRadiusAmount + "%";
			} else if( this.parentState.snake.dir == "e" ) {
				this.borderRadius = "0 " + this.borderRadiusAmount + "% " + this.borderRadiusAmount + "% 0";
			} else if( this.parentState.snake.dir == "w" ) {
				this.borderRadius = this.borderRadiusAmount + "% 0 0 " + this.borderRadiusAmount + "%";
			}
		} else {
			this.color = "#fff";
			this.blur = 0;
			this.borderRadius = "0";
		}
		this.alpha = 1 - ( i / this.parentState.snake.tiles.length ) * 0.6;
		this.rotation = ( this.parentState.snake.justAteTick / this.parentState.snake.justAteTickMax ) * 90;
		this.scale = 1 + ( this.parentState.snake.justAteTick / this.parentState.snake.justAteTickMax ) * 1;
	}

	updateDimensions() {
		this.w = this.parentState.tileWidth - this.parentState.spacing;
		this.h = this.parentState.tileHeight - this.parentState.spacing;
	}

	render(i) {
		// this.elem.css({
		// 	left: this.x + "px",
		// 	top: this.y + "px",
		// 	width: this.w + "px",
		// 	height: this.h + "px",
		// 	backgroundColor: "rgba(255, 255, 255, " + this.alpha + ")",
		// 	boxShadow: "0 0 " + this.blur + "px #fff",
		// 	borderRadius: this.borderRadius,
		// });
	}
}
