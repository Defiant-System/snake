
class Grid {
	constructor(cols, rows) {
		this.cols = cols;
		this.rows = rows;
		this.tiles = [];
		for( var x = 0; x < cols; x++ ) {
			this.tiles[ x ] = [];
			for( var y = 0; y < rows; y++ ) {
				this.tiles[ x ].push( 'empty' );
			}
		}
	}

	get(x, y) {
		return this.tiles[ x ][ y ];
	}

	set(x, y, val) {
		this.tiles[ x ][ y ] = val;
	}
}
