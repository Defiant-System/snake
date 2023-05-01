
@import "./modules/misc.js"

@import "./classes/group.js"
@import "./classes/time.js"
@import "./classes/grid.js"
@import "./classes/boardTile.js"
@import "./classes/snakeTile.js"
@import "./classes/foodTile.js"
@import "./classes/food.js"
@import "./classes/snake.js"
@import "./classes/statePlay.js"
@import "./classes/gameManager.js"

let game;

const snake = {
	init() {
		// fast references
		this.content = window.find("content");

		game = new GameManager();
		game.addState(new StatePlay());
		game.setState("play");
	},
	dispatch(event) {
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
