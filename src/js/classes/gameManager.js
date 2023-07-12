
class GameManager {
	constructor() {
		this.time = new Time();
		this.states = {};

		let that = this;
		this.fpsControl = karaqu.FpsControl({
			callback() {
				console.log(1);
				let state = that.states[that.state];
				if (!state) return this.stop();

				that.states[that.state].step();
				that.time.update();
			}
		});
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
				this.fpsControl.fps = 30;
				this.states.play.init();
				this.fpsControl.start();
				break;
			case "restart":
				this.state = "restart";
				this.states.restart.init();
				this.fpsControl.start();
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

					this.fpsControl.stop();
				}
				break;
		}
	}

	currentState() {
		return this.states[this.state];
	}
}
