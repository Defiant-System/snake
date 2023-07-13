
@import "./modules/misc.js"
@import "./modules/test.js"


@import "./classes/boardTile.js"
@import "./classes/snake.js"
@import "./classes/snakeTile.js"
@import "./classes/food.js"
@import "./classes/foodTile.js"
@import "./classes/grid.js"
@import "./classes/group.js"
@import "./classes/time.js"
@import "./classes/stateStart.js"
@import "./classes/statePlay.js"
@import "./classes/stateRestart.js"
@import "./classes/statePause.js"
@import "./classes/gameManager.js"


let game = new GameManager();
game.addState(new StateStart);
game.addState(new StatePlay);
game.addState(new StatePause);
game.addState(new StateRestart);


const snake = {
	init() {
		// fast references
		this.content = window.find("content");

		game.setState("start");
	},
	dispatch(event) {
		let APP = snake,
			Keys = game.states.play.keys;
		// console.log(event);
		switch (event.type) {
			case "window.init":
				break;
			case "window.keystroke":
				switch (event.char) {
					case "w":
					case "up":    Keys.up = 1; break;
					case "s":
					case "down":  Keys.down = 1; break;
					case "a":
					case "left":  Keys.left = 1; break;
					case "d":
					case "right": Keys.right = 1; break;
					case "r":
						game.setState("restart");
						break;
					case "p":
						game.setState("pause");
						break;
				}
				break;
			case "window.keyup":
				switch (event.char) {
					case "w":
					case "up":    Keys.up = 0; break;
					case "s":
					case "down":  Keys.down = 0; break;
					case "a":
					case "left":  Keys.left = 0; break;
					case "d":
					case "right": Keys.right = 0; break;
				}
				break;
			case "open-help":
				karaqu.shell("fs -u '~/help/index.md'");
				break;
		}
	}
};

window.exports = snake;
