
class StateStart {
	constructor() {
		this.name = "start";
	}

	init() {
		snake.content.addClass("show-start show-fireworks");
	}

	exit() {
		snake.content.removeClass("show-start show-fireworks");
	}

	step() {
		
	}
}
