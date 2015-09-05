'use strict';

// FUNCTIONS //

var ln = Math.log,
	sqrt = Math.sqrt;


// PARTIAL //

/**
* FUNCTION: partial( sigma[, rand] )
*	Partially applies `sigma` and returns a function to generate random numbers from the Rayleigh distribution.
*
* @param {Number} sigma - scale parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Function} function which generates random draws from the specified distribution
*/
function partial( sigma, rand ) {
	var random;
	if ( rand ) {
		random = rand;
	} else {
		random = Math.random;
	}
	/**
	* FUNCTION: draw( x )
	*	Generates a random draw for a Rayleigh distribution with parameter `sigma`.
	*
	* @private
	* @returns {Number} random draw from the specified distribution
	*/
	return function draw() {
		var u = random();
		return sigma * sqrt( -2 * ln( u ) );
	}; // end FUNCTION draw()
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
