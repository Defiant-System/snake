
class StateStart {
	constructor() {
		this.name = "start";
	}

	init() {
		snake.content.removeClass("show-pause show-fireworks").addClass("show-start");

		let Play = game.states.play;
		Play.cvs.attr({ width: Play.activeWidth, height: Play.activeHeight });
	}

	exit() {
		snake.content.removeClass("show-start show-fireworks");
	}

	step() {
		
	}
}
