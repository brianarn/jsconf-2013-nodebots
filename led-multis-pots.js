var five = require('johnny-five');

var board = new five.Board();

board.on('ready', function(){
	// Set up LEDS
	var red = five.Led(9),
		green = five.Led(10),
		blue = five.Led(11);

	// Set up potentiometers
	var redPot = new five.Sensor({
		pin: 'I0',
		freq: 100
	});
	var greenPot = new five.Sensor({
		pin: 'I1',
		freq: 100
	});
	var bluePot = new five.Sensor({
		pin: 'I2',
		freq: 100
	});

	// Listen for changes
	redPot.on('read', function(err, value){
		red.brightness(this.normalized);
	});
	greenPot.on('read', function(err, value){
		green.brightness(this.normalized);
	});
	bluePot.on('read', function(err, value){
		blue.brightness(this.normalized);
	});

	// Inject into the repl
	board.repl.inject({
		r: red,
		g: green,
		b: blue,
		redPot: redPot,
		greenPot: greenPot,
		bluePot: bluePot
	});
});
