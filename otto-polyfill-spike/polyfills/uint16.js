// A feasibility spike, not stdlib code: see ../README.md.

'use strict';

// MODULES //

var mixin = require( './base/typed_array.js' );


// VARIABLES //

// Function which initializes an instance:
var init;


// FUNCTIONS //

/**
* Reads a 16-bit unsigned integer from a byte store, least significant byte first.
*
* @private
* @param {Array} bytes - byte store
* @param {NonNegativeInteger} offset - index of the first byte
* @returns {uinteger16} element value
*/
function read( bytes, offset ) {
	return bytes[ offset ] | ( bytes[ offset+1 ] << 8 );
}

/**
* Writes a value to a byte store as a 16-bit unsigned integer, least significant byte first, wrapping modulo `2^16`.
*
* @private
* @param {Array} bytes - byte store
* @param {NonNegativeInteger} offset - index of the first byte
* @param {*} value - value to write
*/
function write( bytes, offset, value ) {
	bytes[ offset ] = value & 0xff;
	bytes[ offset+1 ] = ( value >>> 8 ) & 0xff;
}


// MAIN //

/**
* Typed array constructor which returns a typed array representing an array of 16-bit unsigned integers, stored least significant byte first.
*
* @constructor
* @param {(NonNegativeInteger|Collection|ArrayBuffer)} [arg] - length, array-like object, or buffer
* @param {NonNegativeInteger} [byteOffset=0] - byte offset
* @param {NonNegativeInteger} [length] - view length
* @throws {TypeError} must be called with `new`
* @throws {TypeError} first argument must be a nonnegative integer, an array-like object, or an array buffer
* @throws {RangeError} byte offset and length must fit the buffer
* @returns {Uint16Array} typed array
*
* @example
* var arr = new Uint16Array( [ 1, 65537 ] );
*
* var v = arr[ 1 ];
* // returns 1
*/
function Uint16Array( arg, byteOffset, length ) { // eslint-disable-line no-unused-vars
	return init( this, arguments );
}

init = mixin( Uint16Array, 'Uint16Array', 2, read, write );


// EXPORTS //

module.exports = Uint16Array;
