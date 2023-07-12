
class Grid {
	constructor(cols, rows) {
		this.cols = cols;
		this.rows = rows;
		this.tiles = [];
		for (let x = 0; x < cols; x++) {
			this.tiles[x] = [];
			for (let y = 0; y < rows; y++) {
				this.tiles[x].push( "empty" );
			}
		}
	}

	get(x, y) {
		return this.tiles[x][y];
	}

	set(x, y, val) {
		this.tiles[x][y] = val;
	}

	distance(tile1, tile2) {
		let dx = tile1[0] - tile2[0];
        let dy = tile1[1] - tile2[1];
		return Math.sqrt(dx * dx + dy * dy);
	}
}
