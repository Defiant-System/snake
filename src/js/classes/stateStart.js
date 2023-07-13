
class StateStart {
	constructor() {
		this.name = "start";
	}

	init() {
		let Content = snake.content,
			Play = game.states.play,
			cname = "show-start";

		if (bestScore > 0) {
			cname += " show-score";
			Content.find(".best-score h2 span").html(bestScore);
		}
		Content.removeClass("show-pause show-fireworks").addClass(cname);

		if (Play.score > bestScore) {
			Content.find(".best-score h2 span").html(Play.score);
			Content.addClass("show-fireworks");
			// save new score to settings
			window.settings.setItem("best-score", Play.score);
		}

		Play.cvs.attr({ width: Play.activeWidth, height: Play.activeHeight });
	}

	exit() {
		snake.content.removeClass("show-start show-fireworks");
	}

	step() {
		
	}
}
