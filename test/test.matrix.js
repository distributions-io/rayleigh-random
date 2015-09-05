/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	random = require( './../lib/matrix.js' ),

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

describe( 'random matrix', function tests() {

	this.timeout( 50000 );

	it( 'should export a function', function test() {
		expect( random ).to.be.a( 'function' );
	});

	it( 'should generate samples which pass mean test when σ = 1', function test() {
		var out,
			sigma = 1,
			sampleMean,
			M = 200,
			N = 200,
			iTotal = 400,
			s, m,
			ci,
			outside = 0,
			i;

		// Mean test
		s = Math.sqrt( rayleighVar( sigma ) ) / Math.sqrt( M * N );
		m = rayleighMean( sigma );

		// CI
		ci = [ m - 2 * s, m + 2 * s ];

		for ( i = 0; i < iTotal; i++ ) {
			out = random( [M,N], 'float64', sigma );
			sampleMean = mean( out.data );
			if ( sampleMean < ci[ 0 ] || sampleMean > ci[ 1 ] ) {
				outside += 1;
			}
		}
		assert.isBelow( outside / iTotal, 0.05 + 0.025 );

	});

	it( 'should generate samples which pass Kolmogorov-Smirnov test when σ = 1', function test() {
		var data,
			mat,
			sigma = 1,
			pval,
			i,
			notpassed = 0;

		for ( i = 0; i < 100; i++ ) {
			mat = random( [20,20], 'float64', sigma );
			data = mat.data;
			pval = kstest( data, 'rayleigh' ).pValue;
			if ( pval < 0.05 ) {
				notpassed += 1;
			}
		}
		assert.isBelow( notpassed / 100, 0.15 );
	});

	it( 'should generate samples which pass mean test when σ = 4', function test() {
		var out,
			sigma = 4,
			sampleMean,
			M = 200,
			N = 200,
			iTotal = 400,
			s, m,
			ci,
			outside = 0,
			i;

		// Mean test
		s = Math.sqrt( rayleighVar( sigma ) ) / Math.sqrt( M * N );
		m = rayleighMean( sigma );

		// CI
		ci = [ m - 2 * s, m + 2 * s ];

		for ( i = 0; i < iTotal; i++ ) {
			out = random( [M,N], 'float64', sigma );
			sampleMean = mean( out.data );
			if ( sampleMean < ci[ 0 ] || sampleMean > ci[ 1 ] ) {
				outside += 1;
			}
		}
		assert.isBelow( outside / iTotal, 0.05 + 0.025 );

	});

	it( 'should generate samples which pass Kolmogorov-Smirnov test when σ = 4', function test() {
		var data,
			mat,
			sigma = 4,
			pval,
			i,
			notpassed = 0;

		for ( i = 0; i < 100; i++ ) {
			mat = random( [20,20], 'float64', sigma );
			data = mat.data;
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
