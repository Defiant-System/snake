
class StatePlay {
	constructor() {
		this.name = "play";
	}

	init() {
		this.scoreElem = window.find(".score");
		this.stageElem = window.find(".stage");
		this.dimLong = 28;
		this.dimShort = 16;
		this.padding = 0.25;
		this.boardTiles = new Group();
		this.keys = {}
		this.foodCreateTimeout = null;
		this.score = 0;
		this.scoreElem.htm(this.score);
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
		this.bindEvents();
		this.snake = new Snake({
			parentState: this
		});
		this.food = new Food({
			parentState: this
		});
	}

	getDimensions() {
		this.winWidth = window.innerWidth;
		this.winHeight = window.innerHeight;
		this.activeWidth = this.winWidth - ( this.winWidth * this.padding );
		this.activeHeight = this.winHeight - ( this.winHeight * this.padding );
	}

	resize() {
		var _this = game.currentState();

		_this.getDimensions();

		_this.stageRatio = _this.rows / _this.cols;

		if( _this.activeWidth > _this.activeHeight / _this.stageRatio ) {
			_this.stageHeight = _this.activeHeight;
			_this.stageElem.style.height = _this.stageHeight + "px";
			_this.stageWidth = Math.floor( _this.stageHeight /_this.stageRatio );
			_this.stageElem.style.width = _this.stageWidth + "px";
		} else {
			_this.stageWidth = _this.activeWidth;
			_this.stageElem.style.width = _this.stageWidth + "px";
			_this.stageHeight = Math.floor( _this.stageWidth * _this.stageRatio );
			_this.stageElem.style.height = _this.stageHeight + "px";
		}

		_this.tileWidth = ~~( _this.stageWidth / _this.cols );
		_this.tileHeight = ~~( _this.stageHeight / _this.rows );
		_this.dimAvg = ( _this.activeWidth + _this.activeHeight ) / 2;
		_this.spacing = Math.max( 1, ~~( _this.dimAvg * 0.0025 ) );

		_this.stageElem.style.marginTop = ( -_this.stageElem.offsetHeight / 2 ) + _this.headerHeight / 2 + "px";

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

	upOn() {
		game.currentState().keys.up = 1;
	}

	downOn() {
		game.currentState().keys.down = 1;
	}

	rightOn() {
		game.currentState().keys.right = 1;
	}

	leftOn() {
		game.currentState().keys.left = 1;
	}

	upOff() {
		game.currentState().keys.up = 0;
	}

	downOff() {
		game.currentState().keys.down = 0;
	}

	rightOff() {
		game.currentState().keys.right = 0;
	}

	leftOff() {
		game.currentState().keys.left = 0;
	}

	keydown( e ) {
		e.preventDefault();
		var e = ( e.keyCode ? e.keyCode : e.which ),
			_this = game.currentState();
		if( e === 38 || e === 87 ) { _this.upOn(); }
		if( e === 39 || e === 68 ) { _this.rightOn(); }
		if( e === 40 || e === 83 ) { _this.downOn(); }
		if( e === 37 || e === 65 ) { _this.leftOn(); }
	}

	bindEvents() {
		var _this = game.currentState();
		console.log("no good event listeners");
		// window.addEventListener( "keydown", _this.keydown, false );
		// window.addEventListener( "resize", _this.resize, false );
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
		window.removeEventListener( "keydown", this.keydown, false );
		window.removeEventListener( "resize", this.resize, false );
		this.stageElem.htm("");
		this.grid.tiles = null;
		this.time = null;
	}
}
