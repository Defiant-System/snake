
class StateInit {
	constructor() {
		this.name = "init";
	}

	init() {
		snake.content.addClass("show-game-over");
	}

	exit() {
		snake.content.removeClass("show-game-over");
	}

	step() {
		
	}
}
