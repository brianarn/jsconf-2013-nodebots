var five = require('johnny-five');

var board = new five.Board();

board.on('ready', function(){
	// LED on pin 13, the onboard LED
	var led = five.Led(13);

	// Make sure we're off
	led.off();

	// Range of times and increment
	var step = 20,
		minTime = 20,
		maxTime = 500,
		time = maxTime;

	// Function for toggling and setting up next pulse
	function toggleLED() {
		var newTime;

		// First, actually toggle the on/off state
		led.toggle();

		// Then, if turned off, tweak times
		if (!led.isOn) {
			newTime = time + step;

			if (newTime < minTime || newTime > maxTime) {
				// Flip it and reverse it
				step = -step;
				newTime = time + step;
			}
		}

		// Queue up using the new time,
		// then set the current time to be the new time.
		// Intentionally doing it this way to ensure both the
		// on and off cycles are of same length from the start.
		setTimeout(toggleLED, time);
		time = newTime || time;

		// Display a little notice for some on-screen feedback
		console.log('LED turned', led.isOn ? 'on' : 'off', '- next toggle in', time, 'ms');

	}

	// Start it up
	toggleLED();

	// Inject into the repl for direct play
	board.repl.inject({
		led: led,
		toggleLED: toggleLED
	});
});
