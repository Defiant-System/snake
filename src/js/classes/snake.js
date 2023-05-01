
class Snake {
	constructor(opt) {
		this.parentState = opt.parentState;
		this.dir = 'e',
		this.currDir = this.dir;
		this.tiles = [];
		for( var i = 0; i < 5; i++ ) {
			this.tiles.push( new SnakeTile({
				parentState: this.parentState,
				parentGroup: this.tiles,
				col: 8 - i,
				row: 3,
				x: ( 8 - i ) * opt.parentState.tileWidth,
				y: 3 * opt.parentState.tileHeight,
				w: opt.parentState.tileWidth - opt.parentState.spacing,
				h: opt.parentState.tileHeight - opt.parentState.spacing
			}));
		}
		this.last = 0;
		this.updateTick = 10;
		this.updateTickMax = this.updateTick;
		this.updateTickLimit = 3;
		this.updateTickChange = 0.2;
		this.deathFlag = 0;
		this.justAteTick = 0;
		this.justAteTickMax = 1;
		this.justAteTickChange = 0.05;

		// sync data grid of the play state
		var i = this.tiles.length;

		while( i-- ) {
			this.parentState.grid.set( this.tiles[ i ].col, this.tiles[ i ].row, 'snake' );
		}
	}

	updateDimensions() {
		var i = this.tiles.length;
		while( i-- ) {
			this.tiles[ i ].updateDimensions();
		}
	}

	update() {
		if( this.parentState.keys.up ) {
			if( this.dir != 's' && this.dir != 'n' && this.currDir != 's' && this.currDir != 'n' ) {
				this.dir = 'n';
			}
		} else if( this.parentState.keys.down) {
			if( this.dir != 'n' && this.dir != 's' && this.currDir != 'n' && this.currDir != 's' ) {
				this.dir = 's';
			}
		} else if( this.parentState.keys.right ) {
			if( this.dir != 'w' && this.dir != 'e' && this.currDir != 'w' && this.currDir != 'e' ) {
				this.dir = 'e';
			}
		} else if( this.parentState.keys.left ) {
			if( this.dir != 'e' && this.dir != 'w' && this.currDir != 'e' && this.currDir != 'w' ) {
				this.dir = 'w';
			}
		}

		this.parentState.keys.up = 0;
		this.parentState.keys.down = 0;
		this.parentState.keys.right = 0;
		this.parentState.keys.left = 0;

		this.updateTick += this.parentState.time.ndelta;
		if( this.updateTick >= this.updateTickMax ) {
			// reset the update timer to 0, or whatever leftover there is
			this.updateTick = ( this.updateTick - this.updateTickMax );

			// rotate snake block array
			this.tiles.unshift( new SnakeTile({
				parentState: this.parentState,
				parentGroup: this.tiles,
				col: this.tiles[ 0 ].col,
				row: this.tiles[ 0 ].row,
				x: this.tiles[ 0 ].col * this.parentState.tileWidth,
				y: this.tiles[ 0 ].row * this.parentState.tileHeight,
				w: this.parentState.tileWidth - this.parentState.spacing,
				h: this.parentState.tileHeight - this.parentState.spacing
			}));
			this.last = this.tiles.pop();
			// this.parentState.stageElem.removeChild( this.last.elem );
			this.last.elem.remove();

			this.parentState.boardTiles.collection[ this.last.col + ( this.last.row * this.parentState.cols ) ].classes.pressed = 2;

			// sync data grid of the play state
			var i = this.tiles.length;

			while( i-- ) {
				this.parentState.grid.set( this.tiles[ i ].col, this.tiles[ i ].row, 'snake' );
			}
			this.parentState.grid.set( this.last.col, this.last.row, 'empty' );


			// move the snake's head
			if ( this.dir == 'n' ) {
				this.currDir = 'n';
				this.tiles[ 0 ].row -= 1;
			} else if( this.dir == 's' ) {
				this.currDir = 's';
				this.tiles[ 0 ].row += 1;
			} else if( this.dir == 'w' ) {
				this.currDir = 'w';
				this.tiles[ 0 ].col -= 1;
			} else if( this.dir == 'e' ) {
				this.currDir = 'e';
				this.tiles[ 0 ].col += 1;
			}

			// wrap walls
			this.wallFlag = false;
			if( this.tiles[ 0 ].col >= this.parentState.cols ) {
				this.tiles[ 0 ].col = 0;
				this.wallFlag = true;
			}
			if( this.tiles[ 0 ].col < 0 ) {
				this.tiles[ 0 ].col = this.parentState.cols - 1;
				this.wallFlag = true;
			}
			if( this.tiles[ 0 ].row >= this.parentState.rows ) {
				this.tiles[ 0 ].row = 0;
				this.wallFlag = true;
			}
			if( this.tiles[ 0 ].row < 0 ) {
				this.tiles[ 0 ].row = this.parentState.rows - 1;
				this.wallFlag = true;
			}

			// check death by eating self
			if( this.parentState.grid.get( this.tiles[ 0 ].col, this.tiles[ 0 ].row ) == 'snake' ) {
				this.deathFlag = 1;
				clearTimeout( this.foodCreateTimeout );
			}

			// check eating of food
			if( this.parentState.grid.get( this.tiles[ 0 ].col, this.tiles[ 0 ].row ) == 'food' ) {
				this.tiles.push( new SnakeTile({
					parentState: this.parentState,
					parentGroup: this.tiles,
					col: this.last.col,
					row: this.last.row,
					x: this.last.col * this.parentState.tileWidth,
					y: this.last.row * this.parentState.tileHeight,
					w: this.parentState.tileWidth - this.parentState.spacing,
					h: this.parentState.tileHeight - this.parentState.spacing
				}));
				if( this.updateTickMax - this.updateTickChange > this.updateTickLimit ) {
					this.updateTickMax -= this.updateTickChange;
				}
				this.parentState.score++;
				this.parentState.scoreElem.html(this.parentState.score);
				this.justAteTick = this.justAteTickMax;

				this.parentState.food.eaten = 1;
				// this.parentState.stageElem.removeChild( this.parentState.food.tile.elem );
				this.parentState.food.tile.elem.remove();

				var _this = this;
				
				this.foodCreateTimeout = setTimeout( function() {
					_this.parentState.food = new Food({
						parentState: _this.parentState
					});
				}, 300);
			}

			// check death by eating self
			if( this.deathFlag ) {
				game.setState( 'play' );
			}
		}

		// update individual snake tiles
		var i = this.tiles.length;
		while( i-- ) {
			this.tiles[ i ].update( i );
		}

		if( this.justAteTick > 0 ) {
			this.justAteTick -= this.justAteTickChange;
		} else if( this.justAteTick < 0 ) {
			this.justAteTick = 0;
		}
	}

	render() {
		// render individual snake tiles
		var i = this.tiles.length;
		while( i-- ) {
			this.tiles[ i ].render( i );
		}
	}
}
