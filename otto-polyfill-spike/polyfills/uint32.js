// A feasibility spike, not stdlib code: see ../README.md.

'use strict';

// MODULES //

var mixin = require( './base/typed_array.js' );


// VARIABLES //

// Function which initializes an instance:
var init;


// FUNCTIONS //

/**
* Reads a 32-bit unsigned integer from a byte store, least significant byte first.
*
* @private
* @param {Array} bytes - byte store
* @param {NonNegativeInteger} offset - index of the first byte
* @returns {uinteger32} element value
*/
function read( bytes, offset ) {
	return ( bytes[ offset ] | ( bytes[ offset+1 ] << 8 ) | ( bytes[ offset+2 ] << 16 ) | ( bytes[ offset+3 ] << 24 ) ) >>> 0;
}

/**
* Writes a value to a byte store as a 32-bit unsigned integer, least significant byte first, wrapping modulo `2^32`.
*
* @private
* @param {Array} bytes - byte store
* @param {NonNegativeInteger} offset - index of the first byte
* @param {*} value - value to write
*/
function write( bytes, offset, value ) {
	bytes[ offset ] = value & 0xff;
	bytes[ offset+1 ] = ( value >>> 8 ) & 0xff;
	bytes[ offset+2 ] = ( value >>> 16 ) & 0xff;
	bytes[ offset+3 ] = value >>> 24;
}


// MAIN //

/**
* Typed array constructor which returns a typed array representing an array of 32-bit unsigned integers, stored least significant byte first.
*
* @constructor
* @param {(NonNegativeInteger|Collection|ArrayBuffer)} [arg] - length, array-like object, or buffer
* @param {NonNegativeInteger} [byteOffset=0] - byte offset
* @param {NonNegativeInteger} [length] - view length
* @throws {TypeError} must be called with `new`
* @throws {TypeError} first argument must be a nonnegative integer, an array-like object, or an array buffer
* @throws {RangeError} byte offset and length must fit the buffer
* @returns {Uint32Array} typed array
*
* @example
* var arr = new Uint32Array( [ 1, 4294967297 ] );
*
* var v = arr[ 1 ];
* // returns 1
*/
function Uint32Array( arg, byteOffset, length ) { // eslint-disable-line no-unused-vars
	return init( this, arguments );
}

init = mixin( Uint32Array, 'Uint32Array', 4, read, write );


// EXPORTS //

module.exports = Uint32Array;
