// A feasibility spike, not stdlib code: see ../../README.md.

'use strict';

// MODULES //

var pow2 = require( './pow2.js' );


// VARIABLES //

var SMALLEST_NORMAL = pow2( -1022 );
var TWO1022 = pow2( 1022 );
var TWO52 = pow2( 52 );
var TWO32 = pow2( 32 );

// High words of the special values:
var HIGH_WORD_NAN = 0x7ff80000;
var HIGH_WORD_PINF = 0x7ff00000;
var HIGH_WORD_NINF = 0xfff00000;
var HIGH_WORD_NEGATIVE_ZERO = 0x80000000;


// FUNCTIONS //

/**
* Returns the base two exponent of a positive normal double.
*
* ## Notes
*
* -   A binary search over exact powers of two, so the result doesn't depend on how an engine implements `Math.log`.
*
* @private
* @param {number} x - positive normal double
* @returns {integer} `e` such that `2^e <= x < 2^(e+1)`
*/
function exponent( x ) {
	var mid;
	var lo;
	var hi;

	lo = -1022;
	hi = 1023;
	while ( lo < hi ) {
		mid = ( lo+hi+1 ) >> 1; // the midpoint, rounded up
		if ( pow2( mid ) <= x ) {
			lo = mid;
		} else {
			hi = mid - 1;
		}
	}
	return lo;
}


// MAIN //

/**
* Splits a double into its higher and lower order 32-bit words, using arithmetic only.
*
* ## Notes
*
* -   Every step is exact: comparisons, multiplication and division by a power of two, one subtraction of `1` from a value in `[1,2)`, and `floor`.
* -   Every NaN becomes the one quiet NaN `0x7ff8000000000000`. A NaN's sign and payload aren't observable to ES5 code, so they can't be kept.
*
* @private
* @param {number} x - input value
* @param {Array} out - output array
* @returns {Array} output array, holding the higher order word and then the lower order word
*
* @example
* var w = float64ToWords( 1.0, [ 0, 0 ] );
* // returns [ 1072693248, 0 ]
*/
function float64ToWords( x, out ) {
	var frac;
	var sign;
	var exp;
	var fhi;

	if ( x !== x ) {
		out[ 0 ] = HIGH_WORD_NAN;
		out[ 1 ] = 0;
		return out;
	}
	if ( x === 0.0 ) {
		out[ 0 ] = ( 1.0/x < 0.0 ) ? HIGH_WORD_NEGATIVE_ZERO : 0;
		out[ 1 ] = 0;
		return out;
	}
	if ( x === 1.0/0.0 ) {
		out[ 0 ] = HIGH_WORD_PINF;
		out[ 1 ] = 0;
		return out;
	}
	if ( x === -1.0/0.0 ) {
		out[ 0 ] = HIGH_WORD_NINF;
		out[ 1 ] = 0;
		return out;
	}
	sign = 0;
	if ( x < 0.0 ) {
		sign = 1;
		x = -x;
	}
	if ( x < SMALLEST_NORMAL ) {
		// A subnormal is an integer multiple of `2^-1074`, and that integer is its fraction...
		exp = 0;
		frac = ( x*TWO1022 ) * TWO52;
	} else {
		exp = exponent( x );
		frac = ( ( x/pow2( exp ) ) - 1.0 ) * TWO52;
		exp += 1023;
	}
	// Split the 52-bit fraction into its upper 20 bits and lower 32 bits:
	fhi = Math.floor( frac / TWO32 );
	out[ 0 ] = ( ( sign << 31 ) | ( exp << 20 ) | fhi ) >>> 0;
	out[ 1 ] = ( frac - ( fhi*TWO32 ) ) >>> 0;
	return out;
}


// EXPORTS //

module.exports = float64ToWords;
