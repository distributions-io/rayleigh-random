'use strict';

// MODULES //

var matrix = require( 'dstructs-matrix' ),
	partial = require( './partial.js' );


// RANDOM //

/**
* FUNCTION: random( dims, dt, sigma[, rand] )
*	Creates a matrix of Rayleigh distributed random numbers.
*
* @param {Number[]} dims - dimensions
* @param {String} dt - data type
* @param {Number} sigma - scale parameter
* @param {Function} [rand=Math.random] - random number generator
* @returns {Matrix} matrix filled with Rayleigh random numbers
*/
function random( dims, dt, sigma, rand ) {
	var out,
		draw,
		i;

	draw = partial( sigma, rand );
	out = matrix( dims, dt );
	for ( i = 0; i < out.length; i++ ) {
		out.data[ i ] = draw();
	}
	return out;
} // end FUNCTION random()


// EXPORTS //

module.exports = random;
