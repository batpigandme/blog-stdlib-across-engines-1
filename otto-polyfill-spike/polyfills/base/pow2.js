// A feasibility spike, not stdlib code: see ../../README.md.

'use strict';

// VARIABLES //

// Offset of `2^0` in the table:
var BIAS = 1074;

// Table of every power of two a double can hold, from `2^-1074` to `2^1023`:
var TABLE = table();


// FUNCTIONS //

/**
* Builds a table of powers of two using only doubling and halving.
*
* ## Notes
*
* -   Multiplying or dividing a double by two is exact unless the result leaves the representable range, and every entry here is in range. So the table doesn't depend on how an engine implements `Math.pow`.
*
* @private
* @returns {Array<number>} table in which element `i` is `2^(i-1074)`
*/
function table() {
	var out;
	var x;
	var i;

	out = [];
	x = 1.0;
	for ( i = 0; i <= 1023; i++ ) {
		out[ i+BIAS ] = x;
		x *= 2.0;
	}
	x = 1.0;
	for ( i = 0; i >= -1074; i-- ) {
		out[ i+BIAS ] = x;
		x /= 2.0;
	}
	return out;
}


// MAIN //

/**
* Returns two raised to an integer power.
*
* @private
* @param {integer} n - exponent, between `-1074` and `1023`
* @returns {number} `2^n`, exactly
*
* @example
* var v = pow2( 10 );
* // returns 1024.0
*
* @example
* var v = pow2( -1074 );
* // returns 5.0e-324
*/
function pow2( n ) {
	return TABLE[ n+BIAS ];
}


// EXPORTS //

module.exports = pow2;
