var five = require('johnny-five');

var board = new five.Board();

board.on('ready', function(){
	// Set up an array of LEDs on pins
	var leds = [], startPin = 2, numPin = 9, pin;

	for (pin = 0; pin < numPin; pin++) {
		console.log('Initializing pin ', pin+startPin);
		leds.push(five.Led(pin+startPin));
	}

	// Set up a scaled potentiometer
	var potentiometer = new five.Sensor({
		pin: 'A0',
		freq: 100
	});
	potentiometer.scale(1, 10);

	// Set up some strobe speed and a scaling factor
	var speed = 1000, speedScale = 10;

	// Listen for changes
	potentiometer.on('read', function(err, value){
		// Simply change the speed
		speed = this.scaled * speedScale;
	});

	// Set up an interval to move to the next light
	var currentLed = 0, step = 1;
	leds[0].on();

	function moveToNextLED() {
		// Determine next Led
		var nextLed = currentLed + step;

		// Safety check:
		// Switch direction once we're out
		if (nextLed < 0 || nextLed >= numPin) {
			step = (step === 1) ? -1 : 1;
			nextLed = currentLed + step;
		}

		// Toggle and queue!
		leds[currentLed].off();
		leds[nextLed].on();
		currentLed = nextLed;
		setTimeout(moveToNextLED, speed);
	}

	// Start it up!
	setTimeout(moveToNextLED, speed);

	// Inject into the repl
	board.repl.inject({
		pot: potentiometer,
		leds: leds,
		cur: currentLed,
		speed: speed
	});
});
