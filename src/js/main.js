
@import "./modules/misc.js"
@import "./modules/test.js"


@import "./classes/boardTile.js"
@import "./classes/grid.js"
@import "./classes/group.js"
@import "./classes/time.js"
@import "./classes/statePlay.js"
@import "./classes/gameManager.js"


let game;

const snake = {
	init() {
		// fast references
		this.stage = window.find(".stage");

		game = new GameManager();
		game.addState(new StatePlay());
		game.setState("new");
	},
	dispatch(event) {
		let APP = snake,
			el;
		// console.log(event);
		switch (event.type) {
			case "window.init":
				break;
			case "open-help":
				karaqu.shell("fs -u '~/help/index.md'");
				break;
		}
	}
};

window.exports = snake;
