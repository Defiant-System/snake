
let Test = {
	init() {
		snake.dispatch({ type: "window.keystroke", char: "p" });
	}
};

// DEV-ONLY-START
setTimeout(() => Test.init(), 100);
// DEV-ONLY-END
