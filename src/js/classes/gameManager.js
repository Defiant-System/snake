
class GameManager {
	constructor() {
		this.time = new Time();
		this.states = {};
		this.config = {
			title: "Snakely",
		};
	}

	addState(state) {
		this.states[ state.name ] = state;
	}

	setState(name) {
		this.state = name;
		switch (this.state) {
			case "pause":
				// todo !
				break;
			case "play":
				if (this.states[this.state].stageElem) {
					// resume
					this.step();
				} else {
					this.states[this.state].init();
				}
				break;
			case "dispose":
				this.states[this.state].exit();
				break;
		}
	}

	currentState() {
		return this.states[this.state];
	}

	step() {
		if (!this.state || this.state === "pause") return;

		requestAnimationFrame(this.step.bind(this));
		this.states[ this.state ].step();
		this.time.update();
	}
}
