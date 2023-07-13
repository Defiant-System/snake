
class StatePause {
	constructor() {
		this.name = "pause";
	}

	init() {
		snake.content.addClass("show-paused");
	}

	exit() {
		snake.content.removeClass("show-paused");
	}

	step() {
		
	}
}
