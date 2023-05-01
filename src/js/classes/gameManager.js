
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
		if ( this.state ) {
			this.states[ this.state ].exit();
		}
		this.state = name;
		this.states[ this.state ].init();
	}

	currentState() {
		return this.states[this.state];
	}

	step() {
		requestAnimationFrame(this.step.bind(this));
		this.states[ this.state ].step();
		this.time.update();
	}
}
