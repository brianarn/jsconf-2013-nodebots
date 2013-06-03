var five = require('johnny-five');

var board = new five.Board();

board.on('ready', function(){
	// Set up an array of LEDs on pins
	var leds = [], startPin = 2, numPin = 9,
		currentLed = 0, pin;

	for (pin = 0; pin < numPin; pin++) {
		console.log('Initializing pin ', pin+startPin);
		leds.push(five.Led(pin+startPin));
	}

	var potentiometer = new five.Sensor({
		pin: 'A0',
		freq: 100
	});

	// Scale it a bit
	potentiometer.scale(0, numPin);

	// Listen for data
	potentiometer.on('read', function(err, value){
		// Get our pin, normalized a bit
		// (as occasionally we hit the max value)
		var newLed = Math.min(Math.floor(this.scaled), numPin - 1);

		// If we haven't changed, dump out
		if (newLed === currentLed) { return; }

		// We've changed, update!
		console.log('Shifting to LED', newLed);
		leds[currentLed].stop().off();
		leds[newLed].on();
		currentLed = newLed;
	});

	// Inject into the repl
	board.repl.inject({
		pot: potentiometer,
		leds: leds
	});
});
