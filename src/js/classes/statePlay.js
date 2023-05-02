
class StatePlay {
	constructor() {
		this.name = "play";
	}

	init() {
		this.stageElem = window.find(".stage");
		this.dimLong = 28;
		this.dimShort = 16;
		this.margin = 8;
		this.boardTiles = new Group();
		this.keys = {}
		this.foodCreateTimeout = null;
		this.score = 0;
		this.setScore();
		this.time = new Time();
		this.getDimensions();
		if( this.winWidth < this.winHeight ) {
			this.rows = this.dimLong;
			this.cols = this.dimShort;
		} else {
			this.rows = this.dimShort;
			this.cols = this.dimLong;
		}
		this.spacing = 1;
		this.grid = new Grid( this.cols, this.rows );
		this.resize();
		this.createBoardTiles();

		this.snake = new Snake({
			parentState: this
		});
		this.food = new Food({
			parentState: this
		});
	}

	setScore(score) {
		window.title = `Snake - Score: ${this.score}`;
	}

	getDimensions() {
		this.winWidth = window.innerWidth;
		this.winHeight = window.innerHeight;
		this.activeWidth = this.winWidth - ( this.margin * 2 );
		this.activeHeight = this.winHeight - ( this.margin * 2 );
	}

	resize() {
		var _this = game.currentState();

		_this.getDimensions();
		_this.stageRatio = _this.rows / _this.cols;

		if( _this.activeWidth > _this.activeHeight / _this.stageRatio ) {
			_this.stageHeight = _this.activeHeight;
			_this.stageWidth = Math.floor( _this.stageHeight /_this.stageRatio );
		} else {
			_this.stageWidth = _this.activeWidth;
			_this.stageHeight = Math.floor( _this.stageWidth * _this.stageRatio );
		}

		_this.tileWidth = ~~( _this.stageWidth / _this.cols );
		_this.tileHeight = ~~( _this.stageHeight / _this.rows );
		// _this.dimAvg = ( _this.activeWidth + _this.activeHeight ) / 2;
		// _this.spacing = Math.max( 1, ~~( _this.dimAvg * 0.0025 ) );
		_this.spacing = 1;

		// _this.stageElem.css({
		// 	height: _this.stageHeight,
		// 	width: _this.stageWidth,
		// 	marginTop: ( -_this.stageHeight / 2 ) + _this.headerHeight / 2,
		// });

		_this.boardTiles.each( "updateDimensions" );
		_this.snake !== undefined && _this.snake.updateDimensions();
		_this.food !== undefined && _this.food.updateDimensions();
	}

	createBoardTiles() {
		for( var y = 0; y < this.rows; y++ ) {
			for( var x = 0; x < this.cols; x++ ) {
				this.boardTiles.add( new BoardTile({
					parentState: this,
					parentGroup: this.boardTiles,
					col: x,
					row: y,
					x: x * this.tileWidth,
					y: y * this.tileHeight,
					w: this.tileWidth - this.spacing,
					h: this.tileHeight - this.spacing
				}));
			}
		}
	}

	step() {
		this.boardTiles.each( "update" );
		this.boardTiles.each( "render" );
		this.snake.update();
		this.snake.render();
		this.food.update();
		this.food.render();
		this.time.update();
	}

	exit() {
		this.stageElem.html("");
		this.grid.tiles = null;
		this.time = null;
	}
}
