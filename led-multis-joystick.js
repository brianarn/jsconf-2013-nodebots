var five = require('johnny-five');

var board = new five.Board();

board.on('ready', function(){
	// Set up LEDS
	var red = five.Led(9),
		green = five.Led(10),
		blue = five.Led(11);

	// Set up a scaled potentiometer
	var potentiometer = new five.Sensor({
		pin: 'I2',
		freq: 100
	});
	potentiometer.scale(1, 10);

	// Set up the joystick
	var joystick = new five.Joystick({
		pins: ['I0', 'I1'],
		freq: 100
	});

	// Listen for changes
	potentiometer.on('read', function(err, value){
		green.brightness(this.normalized);
	});
	joystick.on('axismove', function(){
		var x = this.fixed.x, y = this.fixed.y;

		red.brightness(255*x);
		blue.brightness(255*y);
	});

	// Inject into the repl
	board.repl.inject({
		r: red,
		g: green,
		b: blue,
		pot: potentiometer,
		joy: joystick
	});
});
