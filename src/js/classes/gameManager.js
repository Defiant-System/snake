
class GameManager {
	constructor() {
		this.time = new Time();
		this.states = {};
		FX.init();

		let that = this;
		this.fpsControl = karaqu.FpsControl({
			callback() {
				let state = that.states[that.state];
				if (!state) return this.stop();

				that.states[that.state].step();
				that.time.update();
				FX.draw();
			}
		});
	}

	addState(state) {
		this.states[state.name] = state;
	}

	setState(name) {
		let currState = this.state;

		this.state = name;
		
		switch (this.state) {
			case "start":
				this.states.start.init();
				this.fpsControl.stop();
				break;
			case "over":
				setTimeout(() => this.setState("restart"), 1000);
				break;
			case "new":
				if (this.state === "play") return;
				this.state = "play";
				this.fpsControl.fps = 60;
				this.states.play.init();
				this.fpsControl.start();
				break;
			case "restart":
				this.states.restart.init();
				this.fpsControl.start();
				break;
			case "pause":
				if (currState === "play") {
					this.states.pause.init();
					this.fpsControl.stop();
				} else {
					// resume
					this.state = "play";
					this.states.pause.exit();
					this.fpsControl.start();
				}
				break;
		}
	}

	currentState() {
		return this.states[this.state];
	}
}
