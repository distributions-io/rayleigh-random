'use strict';

// MODULES //

var ln = Math.log,
	sqrt = Math.sqrt;


// GENERATE RAYLEIGH RANDOM NUMBERS //

/**
* FUNCTION random( sigma[, rand] )
*	Generates a random draw from a Rayleigh distribution with parameter `sigma`.
*
* @param {Number} sigma - scale parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Number} random draw from the specified distribution
*/
function random( sigma, rand ) {
	var u;
	u = rand ? rand() : Math.random();
	return sigma * sqrt( -2 * ln( u ) );
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
