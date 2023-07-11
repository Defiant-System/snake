
class Food {
	constructor(opt) {
		this.parentState = opt.parentState;
		this.tile = new FoodTile({
			parentState: this.parentState,
			col: 0,
			row: 0,
			x: 0,
			y: 0,
			w: opt.parentState.tileWidth - opt.parentState.spacing,
			h: opt.parentState.tileHeight - opt.parentState.spacing
		});
		this.reset();
		this.eaten = 0;
		this.birthTick = 1;
		this.deathTick = 0;
		this.birthTickChange = 0.025;
		this.deathTickChange = 0.05;
	}

	reset() {
		var empty = [];
		for (var x = 0; x < this.parentState.cols; x++) {
			for (var y = 0; y < this.parentState.rows; y++) {
				var tile = this.parentState.grid.get(x, y);
				if (tile == "empty" ) {
					empty.push({ x: x, y: y } );
				}
			}
		}
		var newTile = empty[ Util.randInt(0, empty.length - 1) ];
		this.tile.col = newTile.x;
		this.tile.row = newTile.y;
	}

	updateDimensions() {
		this.tile.updateDimensions();
	}

	update() {
		// update food tile
		this.tile.update();

		if (this.birthTick > 0) {
			this.birthTick -= this.birthTickChange;
		} else if (this.birthTick < 0) {
			this.birthTick = 0;
		}

		// sync data grid of the play state
		this.parentState.grid.set(this.tile.col, this.tile.row, "food");
	}

	render() {
		this.tile.render();
	}
}
