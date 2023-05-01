
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

		game.step();
	},
	dispatch(event) {
		let _this = game.currentState(),
			value;
		// console.log(event);
		switch (event.type) {
			case "window.init":
				break;
			case "window.keystroke":
				switch (event.char) {
					case "up":    _this.keys.up = 1; break;
					case "down":  _this.keys.down = 1; break;
					case "left":  _this.keys.left = 1; break;
					case "right": _this.keys.right = 1; break;
					case "p":
						value = game.state === "play" ? "pause" : "play";
						game.setState(value);
						break;
				}
				break;
			case "window.keyup":
				switch (event.char) {
					case "up":    _this.keys.up = 0; break;
					case "down":  _this.keys.down = 0; break;
					case "left":  _this.keys.left = 0; break;
					case "right": _this.keys.right = 0; break;
				}
				break;

			case "open-help":
				karaqu.shell("fs -u '~/help/index.md'");
				break;
		}
	}
};

window.exports = snake;
