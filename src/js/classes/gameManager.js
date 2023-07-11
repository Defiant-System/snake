
class GameManager {
	constructor() {
		this.time = new Time();
		this.states = {};
	}

	addState(state) {
		this.states[state.name] = state;
	}

	setState(name) {
		let APP = snake,
			currState = this.state;

		this.state = name;

		switch (this.state) {
			case "new":
				if (this.state === "play") return;
				// APP.content.removeClass("show-game-over show-paused");
				this.state = "play";
				this.states.play.init();
				this.step();
				break;
			case "over":
				// APP.content.addClass("show-game-over");
				this.states.play.exit();
				break;
			case "pause":
				if (currState === "play") {
					// APP.content.addClass("show-paused");
				} else {
					// APP.content.removeClass("show-game-over show-paused");
					// resume
					this.state = "play";
					this.step();
				}
				break;
		}
	}

	currentState() {
		return this.states[this.state];
	}

	step() {
		if (!this.state || this.state !== "play") return;

		// requestAnimationFrame(this.step.bind(this));
		this.states[ this.state ].step();
		this.time.update();
	}
}
