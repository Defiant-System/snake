
class StateRestart {
	constructor() {
		this.name = "restart";
	}

	init() {
		game.fpsControl.fps = 40;
	}

	exit() {
		setTimeout(() => game.setState("start"), 1200);
	}

	step() {
		let Play = game.states.play;
		if (!Play.snake.tiles.length) return this.exit();
		
		let tile = Play.snake.tiles.pop();
		// explode effect
		FX.explode(tile);
		Play.grid.set(tile.col, tile.row, "empty");
		Play.boardTiles.collection[tile.col + (tile.row * Play.cols)].classes.pressed = 2;
		
		Play.boardTiles.each("update");
		Play.food.update();

		// reset canvas / board
		Play.cvs.attr({ width: Play.activeWidth, height: Play.activeHeight });

		Play.boardTiles.each("render");
		Play.food.render();
		Play.snake.render();
	}

}
