'use strict';

// MODULES //

var partial = require( './partial.js' );


// RANDOM //

/**
* FUNCTION: random( len, sigma[, rand] )
*	Creates an array of numbers drawn from a Rayleigh distribution.
*
* @param {Number} len - array length
* @param {Number} sigma - scale parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Number[]} array filled with Rayleigh random numbers
*/
function random( len, sigma, rand ) {
	var out,
		draw,
		i;

	draw = partial( sigma, rand );
	// Ensure fast elements...
	if ( len < 64000 ) {
		out = new Array( len );
		for ( i = 0; i < len; i++ ) {
			out[ i ] = draw();
		}
	} else {
		out = [];
		for ( i = 0; i < len; i++ ) {
			out.push( draw() );
		}
	}
	return out;
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
