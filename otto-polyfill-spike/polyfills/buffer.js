// A feasibility spike, not stdlib code: see ../README.md.

'use strict';

// FUNCTIONS //

/**
* Defines a non-enumerable read-only property.
*
* ## Notes
*
* -   In stdlib this would be `@stdlib/utils/define-nonenumerable-read-only-property`. The spike calls `Object.defineProperty` directly so that these files resolve the same way from the published packages and from a source checkout.
*
* @private
* @param {Object} obj - object on which to define the property
* @param {string} prop - property name
* @param {*} value - value to set
*/
function setReadOnly( obj, prop, value ) {
	Object.defineProperty( obj, prop, {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': value
	});
}

/**
* Tests whether a value is a nonnegative integer.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is a nonnegative integer
*/
function isNonNegativeInteger( value ) {
	return (
		typeof value === 'number' &&
		value >= 0 &&
		value < 1.0/0.0 &&
		Math.floor( value ) === value
	);
}

/**
* Resolves a relative index to an index between zero and a length.
*
* @private
* @param {*} idx - index, where a negative value counts back from the end
* @param {NonNegativeInteger} len - length
* @param {NonNegativeInteger} def - value to use when the index is `undefined`
* @returns {NonNegativeInteger} resolved index
*/
function resolve( idx, len, def ) {
	if ( idx === void 0 ) {
		return def;
	}
	idx = ( idx < 0 ) ? Math.ceil( idx ) : Math.floor( idx );
	if ( idx !== idx ) {
		return 0;
	}
	if ( idx < 0 ) {
		idx += len;
		return ( idx < 0 ) ? 0 : idx;
	}
	return ( idx > len ) ? len : idx;
}


// MAIN //

/**
* Constructor which returns an object used to represent a generic, fixed-length raw binary data buffer.
*
* ## Notes
*
* -   The bytes are held in a plain array of integers from `0` to `255`, on the private `_bytes` property. Every view over the buffer reads and writes that one array, which is what makes two views alias each other.
*
* @constructor
* @param {NonNegativeInteger} [size=0] - number of bytes
* @throws {TypeError} must be called with `new`
* @throws {RangeError} must provide a nonnegative integer
* @returns {ArrayBuffer} array buffer
*
* @example
* var buf = new ArrayBuffer( 5 );
* // returns <ArrayBuffer>
*
* var len = buf.byteLength;
* // returns 5
*/
function ArrayBuffer( size ) {
	var bytes;
	var i;
	if ( !( this instanceof ArrayBuffer ) ) {
		throw new TypeError( 'invalid invocation. Constructor must be called with the `new` keyword.' );
	}
	if ( arguments.length === 0 ) {
		size = 0;
	} else if ( !isNonNegativeInteger( size ) ) {
		throw new RangeError( 'invalid argument. Must provide a nonnegative integer. Value: `' + size + '`.' );
	}
	bytes = [];
	for ( i = 0; i < size; i++ ) {
		bytes.push( 0 );
	}
	setReadOnly( this, 'byteLength', size );
	setReadOnly( this, '_bytes', bytes );
	return this;
}

// A bundler may have renamed the declaration; put the name back where the engine allows it (see `setName` in `./base/typed_array.js`):
try {
	setReadOnly( ArrayBuffer, 'name', 'ArrayBuffer' );
} catch ( err ) { // eslint-disable-line no-unused-vars
	// The name can't be redefined on this engine...
}

/**
* Copies the bytes of an array buffer to a new array buffer.
*
* @name slice
* @memberof ArrayBuffer.prototype
* @type {Function}
* @param {integer} [start=0] - starting index (inclusive)
* @param {integer} [end=buf.byteLength] - ending index (exclusive)
* @throws {TypeError} `this` must be an array buffer
* @returns {ArrayBuffer} new array buffer
*
* @example
* var b1 = new ArrayBuffer( 10 );
*
* var b2 = b1.slice( 2, 6 );
* // returns <ArrayBuffer>
*
* var len = b2.byteLength;
* // returns 4
*/
setReadOnly( ArrayBuffer.prototype, 'slice', function slice( start, end ) {
	var src;
	var dst;
	var out;
	var i;
	if ( !( this instanceof ArrayBuffer ) ) {
		throw new TypeError( 'invalid invocation. `this` is not an array buffer.' );
	}
	start = resolve( start, this.byteLength, 0 );
	end = resolve( end, this.byteLength, this.byteLength );
	out = new ArrayBuffer( ( end > start ) ? end-start : 0 );
	src = this._bytes;
	dst = out._bytes;
	for ( i = start; i < end; i++ ) {
		dst[ i-start ] = src[ i ];
	}
	return out;
});


// EXPORTS //

module.exports = ArrayBuffer;
