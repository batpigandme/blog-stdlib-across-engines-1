// A feasibility spike, not stdlib code: see ../README.md.

'use strict';

// MODULES //

var mixin = require( './base/typed_array.js' );


// VARIABLES //

// Function which initializes an instance:
var init;


// FUNCTIONS //

/**
* Reads an 8-bit unsigned integer from a byte store.
*
* @private
* @param {Array} bytes - byte store
* @param {NonNegativeInteger} offset - index of the byte
* @returns {uinteger8} element value
*/
function read( bytes, offset ) {
	return bytes[ offset ];
}

/**
* Writes a value to a byte store as an 8-bit unsigned integer, wrapping modulo `2^8`.
*
* @private
* @param {Array} bytes - byte store
* @param {NonNegativeInteger} offset - index of the byte
* @param {*} value - value to write
*/
function write( bytes, offset, value ) {
	bytes[ offset ] = value & 0xff;
}


// MAIN //

/**
* Typed array constructor which returns a typed array representing an array of 8-bit unsigned integers.
*
* @constructor
* @param {(NonNegativeInteger|Collection|ArrayBuffer)} [arg] - length, array-like object, or buffer
* @param {NonNegativeInteger} [byteOffset=0] - byte offset
* @param {NonNegativeInteger} [length] - view length
* @throws {TypeError} must be called with `new`
* @throws {TypeError} first argument must be a nonnegative integer, an array-like object, or an array buffer
* @throws {RangeError} byte offset and length must fit the buffer
* @returns {Uint8Array} typed array
*
* @example
* var arr = new Uint8Array( [ 1, 257 ] );
*
* var v = arr[ 1 ];
* // returns 1
*/
function Uint8Array( arg, byteOffset, length ) { // eslint-disable-line no-unused-vars
	return init( this, arguments );
}

init = mixin( Uint8Array, 'Uint8Array', 1, read, write );


// EXPORTS //

module.exports = Uint8Array;
