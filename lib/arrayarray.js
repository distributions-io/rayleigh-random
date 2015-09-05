'use strict';

// MODULES //

var partial = require( './partial.js' ),
	recurse = require( './recurse.js' );


// RANDOM //

/**
* FUNCTION: random( dims, sigma[, rand] )
*	Creates a multidimensional array of Rayleigh distributed random numbers.
*
* @param {Number[]} dims - dimensions
* @param {Number} sigma - scale parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Array} multidimensional array filled with Rayleigh random numbers
*/
function random( dims, sigma, rand ) {
	var draw = partial( sigma, rand );
	return recurse( dims, 0, draw );
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
