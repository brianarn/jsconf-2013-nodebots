var five = require('johnny-five');

var board = new five.Board();

board.on('ready', function(){
	// LED on pin 13
	var led = five.Led(2);

	// Frequency
	var frequency = -10;

	var potentiometer = new five.Sensor({
		pin: 'A0',
		freq: 100
	});

	// Inject into the repl
	board.repl.inject({
		led: led,
		pot: potentiometer
	});

	potentiometer.on('read', function(err, value){
		//console.log(value, this.normalized);
		if (value < frequency - 5 || value > frequency + 5) {
			console.log('Updating value to', value);
			frequency = value + 1;
			led.strobe(frequency);
		}
	});
});
