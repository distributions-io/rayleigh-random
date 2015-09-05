/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	random = require( './../lib/number.js' ),

	// Theoretical mean of Rayleigh distribution
	rayleighMean = require( 'distributions-rayleigh-mean' ),

	// Theoretical variance of Rayleigh distribution
	rayleighVar = require( 'distributions-rayleigh-variance' ),

	// Module to calculate the mean
	mean = require( 'compute-mean' ),

	// Kolmogorov-Smirnov test
	kstest = require( 'compute-kstest' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'random number', function tests() {

	this.timeout( 50000 );

	it( 'should export a function', function test() {
		expect( random ).to.be.a( 'function' );
	});

	it( 'should generate samples which pass mean test when σ = 1', function test() {
		var out,
			sigma = 1,
			sampleMean,
			n = 50000,
			iTotal = 400,
			s, m,
			ci,
			outside = 0,
			i, j;

		// Mean test
		s = Math.sqrt( rayleighVar( sigma ) ) / Math.sqrt( n );
		m = rayleighMean( sigma );

		// CI
		ci = [ m - 2 * s, m + 2 * s ];

		for ( i = 0; i < iTotal; i++ ) {
			out = new Array( n );
			for ( j = 0; j < 500; j++ ) {
				out[ j ] = random( sigma );
			}
			sampleMean = mean( out );
			if ( sampleMean < ci[ 0 ] || sampleMean > ci[ 1 ] ) {
				outside += 1;
			}
		}
		assert.isBelow( outside / iTotal, 0.05 + 0.025 );

	});

	it( 'should generate samples which pass Kolmogorov-Smirnov test when σ = 1', function test() {
		var data,
			i, j,
			notpassed = 0,
			sigma = 1;

		for ( i = 0; i < 100; i++ ) {
			data = new Array( 500 );
			for ( j = 0; j < 500; j++ ) {
				data[ j ] = random( sigma );
			}
			if ( kstest( data, 'rayleigh' ).pValue < 0.05 ) {
				notpassed += 1;
			}
		}
		assert.isBelow( notpassed / 100, 0.15 );
	});

	it( 'should generate samples which pass mean test when σ = 0.05', function test() {
		var out,
			sigma = 0.05,
			sampleMean,
			n = 50000,
			iTotal = 400,
			s, m,
			ci,
			outside = 0,
			i, j;

		// Mean test
		s = Math.sqrt( rayleighVar( sigma ) ) / Math.sqrt( n );
		m = rayleighMean( sigma );

		// CI
		ci = [ m - 2 * s, m + 2 * s ];

		for ( i = 0; i < iTotal; i++ ) {
			out = new Array( n );
			for ( j = 0; j < 500; j++ ) {
				out[ j ] = random( sigma );
			}
			sampleMean = mean( out );
			if ( sampleMean < ci[ 0 ] || sampleMean > ci[ 1 ] ) {
				outside += 1;
			}
		}
		assert.isBelow( outside / iTotal, 0.05 + 0.025 );

	});

	it( 'should generate samples which pass Kolmogorov-Smirnov test when σ = 0.05', function test() {
		var data,
			sigma = 0.05,
			pval,
			i, j,
			notpassed = 0;

		for ( i = 0; i < 100; i++ ) {
			data = new Array( 40 );
			for ( j = 0; j < 40; j++ ) {
				data[ j ] = random( sigma );
			}
			pval = kstest( data, 'rayleigh', {
				'sigma': sigma
			}).pValue;
			if ( pval < 0.05 ) {
				notpassed += 1;
			}
		}
		assert.isBelow( notpassed / 100, 0.15 );
	});

});
