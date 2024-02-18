
class Grid {
	constructor(cols, rows) {
		this.cols = cols;
		this.rows = rows;
		this.tiles = [];
		for (let y = 0; y < rows; y++) {
			this.tiles[y] = [];
			for (let x = 0; x < cols; x++) {
				this.tiles[y].push( "empty" );
			}
		}
	}

	get(y, x) {
		return this.tiles[y][x];
	}

	set(y, x, val) {
		this.tiles[y][x] = val;
	}

	distance(tile1, tile2) {
		let dx = tile1[0] - tile2[0];
        let dy = tile1[1] - tile2[1];
		return Math.sqrt(dx * dx + dy * dy);
	}
}
