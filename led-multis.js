var five = require('johnny-five');

var board = new five.Board();

board.on('ready', function(){
	// Set up LEDS
	var red = five.Led(9),
		green = five.Led(10),
		blue = five.Led(11);

	// Inject into the repl
	board.repl.inject({
		r: red,
		g: green,
		b: blue
	});

	red.brightness(50);
	green.brightness(50);
	blue.brightness(50);
});
