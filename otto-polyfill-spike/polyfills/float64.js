// A feasibility spike, not stdlib code: see ../README.md.

'use strict';

// MODULES //

var mixin = require( './base/typed_array.js' );
var float64ToWords = require( './base/float64_to_words.js' );
var wordsToFloat64 = require( './base/words_to_float64.js' );


// VARIABLES //

// Scratch array for the two words of a double, reused on every write:
var WORDS = [ 0, 0 ];

// Function which initializes an instance:
var init;


// FUNCTIONS //

/**
* Reads a double from a byte store, least significant byte first.
*
* @private
* @param {Array} bytes - byte store
* @param {NonNegativeInteger} offset - index of the first byte
* @returns {number} element value
*/
function read( bytes, offset ) {
	var high;
	var low;

	low = ( bytes[ offset ] | ( bytes[ offset+1 ] << 8 ) | ( bytes[ offset+2 ] << 16 ) | ( bytes[ offset+3 ] << 24 ) ) >>> 0;
	high = ( bytes[ offset+4 ] | ( bytes[ offset+5 ] << 8 ) | ( bytes[ offset+6 ] << 16 ) | ( bytes[ offset+7 ] << 24 ) ) >>> 0;
	return wordsToFloat64( high, low );
}

/**
* Writes a value to a byte store as a double, least significant byte first.
*
* @private
* @param {Array} bytes - byte store
* @param {NonNegativeInteger} offset - index of the first byte
* @param {*} value - value to write
*/
function write( bytes, offset, value ) {
	var high;
	var low;

	float64ToWords( +value, WORDS );
	high = WORDS[ 0 ];
	low = WORDS[ 1 ];
	bytes[ offset ] = low & 0xff;
	bytes[ offset+1 ] = ( low >>> 8 ) & 0xff;
	bytes[ offset+2 ] = ( low >>> 16 ) & 0xff;
	bytes[ offset+3 ] = low >>> 24;
	bytes[ offset+4 ] = high & 0xff;
	bytes[ offset+5 ] = ( high >>> 8 ) & 0xff;
	bytes[ offset+6 ] = ( high >>> 16 ) & 0xff;
	bytes[ offset+7 ] = high >>> 24;
}


// MAIN //

/**
* Typed array constructor which returns a typed array representing an array of double-precision floating-point numbers, stored least significant byte first.
*
* @constructor
* @param {(NonNegativeInteger|Collection|ArrayBuffer)} [arg] - length, array-like object, or buffer
* @param {NonNegativeInteger} [byteOffset=0] - byte offset
* @param {NonNegativeInteger} [length] - view length
* @throws {TypeError} must be called with `new`
* @throws {TypeError} first argument must be a nonnegative integer, an array-like object, or an array buffer
* @throws {RangeError} byte offset and length must fit the buffer
* @returns {Float64Array} typed array
*
* @example
* var arr = new Float64Array( [ 1.0, 2.0 ] );
*
* var v = arr[ 1 ];
* // returns 2.0
*/
function Float64Array( arg, byteOffset, length ) { // eslint-disable-line no-unused-vars
	return init( this, arguments );
}

init = mixin( Float64Array, 'Float64Array', 8, read, write );


// EXPORTS //

module.exports = Float64Array;
