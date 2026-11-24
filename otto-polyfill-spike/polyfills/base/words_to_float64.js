// A feasibility spike, not stdlib code: see ../../README.md.

'use strict';

// MODULES //

var pow2 = require( './pow2.js' );


// VARIABLES //

var TWO52 = pow2( 52 );
var TWO32 = pow2( 32 );
var SMALLEST_SUBNORMAL = pow2( -1074 );


// MAIN //

/**
* Builds a double from its higher and lower order 32-bit words, using arithmetic only.
*
* ## Notes
*
* -   Each result is one multiplication of an integer below `2^53` by a power of two, and the product is always representable, so it is exact.
* -   Every NaN bit pattern returns the engine's NaN; the payload is dropped.
*
* @private
* @param {uinteger32} high - higher order word
* @param {uinteger32} low - lower order word
* @returns {number} double
*
* @example
* var v = wordsToFloat64( 1072693248, 0 );
* // returns 1.0
*/
function wordsToFloat64( high, low ) {
	var frac;
	var sign;
	var exp;
	var x;

	sign = high >>> 31;
	exp = ( high >>> 20 ) & 0x7ff;
	frac = ( ( high & 0xfffff ) * TWO32 ) + ( low >>> 0 );
	if ( exp === 0x7ff ) {
		if ( frac !== 0 ) {
			return 0.0/0.0;
		}
		return ( sign ) ? -1.0/0.0 : 1.0/0.0;
	}
	if ( exp === 0 ) {
		// Zero or a subnormal:
		x = frac * SMALLEST_SUBNORMAL;
	} else {
		// The exponent is unbiased by `1023` and lowered by `52` to account for the integer significand:
		x = ( TWO52+frac ) * pow2( exp-1075 );
	}
	return ( sign ) ? -x : x;
}


// EXPORTS //

module.exports = wordsToFloat64;
