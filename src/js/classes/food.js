
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
		this.pulseTick = this.parentState.rows * 2;
		this.birthTick = 1;
		this.deathTick = 0;
		this.pulseTickChange = 0.5;
		this.birthTickChange = 0.025;
	}

	reset() {
		let empty = [];
		// let snake = [];
		for (let x = 0; x < this.parentState.cols; x++) {
			for (let y = 0; y < this.parentState.rows; y++) {
				let name = this.parentState.grid.get(y, x);
				if (name == "empty") {
					empty.push({ name, x, y });
				}
			}
		}

		let newTile = empty[ Util.randInt(0, empty.length - 1) ];
		// console.log( newTile.name, newTile.x, newTile.y );
		if (newTile.name !== "empty") return this.reset();
		// newTile = {x: 21, y: 6};
		this.tile.col = newTile.x;
		this.tile.row = newTile.y;
	}

	update() {
		// update food tile
		this.tile.update();

		if (this.pulseTick > 0) this.pulseTick -= this.pulseTickChange;
		else if (this.pulseTick <= 0) this.pulseTick = this.parentState.rows * 2;

		if (this.birthTick > 0) this.birthTick -= this.birthTickChange;
		else if (this.birthTick < 0) this.birthTick = 0;

		// sync data grid of the play state
		this.parentState.grid.set(this.tile.row, this.tile.col, "food");
	}

	render() {
		this.tile.render();
	}
}
