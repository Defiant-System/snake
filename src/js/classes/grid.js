
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

	distance(p1, p2) {
		let dx = p1[0] - p2[0];
        let dy = p1[1] - p2[1];
		return Math.sqrt(dx * dx + dy * dy);
	}
}
