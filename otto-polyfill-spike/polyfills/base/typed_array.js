// A feasibility spike, not stdlib code: see ../../README.md.

/* eslint-disable no-invalid-this, no-underscore-dangle */

'use strict';

// MODULES //

var ArrayBuffer = require( './../buffer.js' );


// FUNCTIONS //

/**
* Defines a non-enumerable read-only property.
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
* Tries to set a constructor's `name`.
*
* ## Notes
*
* -   A constructor's name comes from its declaration, but a bundler renames a declaration that shares its name with a global used elsewhere in the bundle (esbuild turns `function Uint16Array` into `function Uint16Array2`). From ES2015 on, `name` is configurable and this puts it back. On an ES5 engine it isn't: on otto the call throws, and the name stays whatever the bundler left.
*
* @private
* @param {Function} ctor - constructor
* @param {string} name - constructor name
* @returns {boolean} boolean indicating whether the constructor now has the name
*/
function setName( ctor, name ) {
	try {
		setReadOnly( ctor, 'name', name );
	} catch ( err ) { // eslint-disable-line no-unused-vars
		// The name can't be redefined on this engine...
	}
	return ( ctor.name === name );
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
* Tests whether a value is an array-like object.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is an array-like object
*/
function isCollection( value ) {
	return (
		typeof value === 'object' &&
		value !== null &&
		isNonNegativeInteger( value.length )
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

/**
* Defines one indexed element as an accessor property over the bytes of a buffer.
*
* ## Notes
*
* -   ES5 has no way to intercept `arr[ i ] = v`, so each index is its own accessor property, as in the `@stdlib/array/float16` polyfill. The getter decodes from the shared bytes on every read and the setter encodes into them on every write. Nothing is cached, so another view over the same bytes always sees the write.
*
* @private
* @param {Object} arr - typed array instance
* @param {NonNegativeInteger} idx - element index
* @param {Array} bytes - byte store of the underlying buffer
* @param {NonNegativeInteger} offset - index of the element's first byte
* @param {Function} read - function which decodes an element from bytes
* @param {Function} write - function which encodes an element to bytes
*/
function defineElement( arr, idx, bytes, offset, read, write ) {
	Object.defineProperty( arr, idx, {
		'configurable': false,
		'enumerable': true,
		'get': get,
		'set': set
	});

	/**
	* Returns an array element.
	*
	* @private
	* @returns {number} array element
	*/
	function get() {
		return read( bytes, offset );
	}

	/**
	* Sets an array element.
	*
	* @private
	* @param {*} value - value to set
	*/
	function set( value ) {
		write( bytes, offset, value );
	}
}


// MAIN //

/**
* Gives a typed array constructor its static properties and prototype methods, and returns the function which initializes an instance.
*
* ## Notes
*
* -   The constructor itself is declared in each polyfill's own file, not built here, because of its `name`. On an ES5 engine a function's `name` comes from its declaration and can't be redefined, so one shared constructor would report the same name for every type.
*
* @private
* @param {Function} TypedArray - typed array constructor
* @param {string} name - constructor name
* @param {PositiveInteger} nbytes - size of an element, in bytes
* @param {Function} read - function which decodes an element from a byte store, starting at a byte offset
* @param {Function} write - function which encodes a value to a byte store, starting at a byte offset
* @returns {Function} function which initializes a typed array instance from the constructor's arguments
*/
function mixin( TypedArray, name, nbytes, read, write ) {
	setName( TypedArray, name );

	/**
	* Size (in bytes) of each array element.
	*
	* @private
	* @name BYTES_PER_ELEMENT
	* @memberof TypedArray
	* @readonly
	* @type {PositiveInteger}
	*/
	setReadOnly( TypedArray, 'BYTES_PER_ELEMENT', nbytes );

	/**
	* Size (in bytes) of each array element.
	*
	* @private
	* @name BYTES_PER_ELEMENT
	* @memberof TypedArray.prototype
	* @readonly
	* @type {PositiveInteger}
	*/
	setReadOnly( TypedArray.prototype, 'BYTES_PER_ELEMENT', nbytes );

	/**
	* Sets one or more array elements.
	*
	* @private
	* @name set
	* @memberof TypedArray.prototype
	* @type {Function}
	* @param {Collection} source - values to set
	* @param {NonNegativeInteger} [offset=0] - index at which to start writing
	* @throws {TypeError} `this` must be a typed array instance
	* @throws {TypeError} first argument must be an array-like object
	* @throws {RangeError} index argument is out-of-bounds
	* @throws {RangeError} target array lacks sufficient storage
	* @returns {void}
	*/
	setReadOnly( TypedArray.prototype, 'set', function set( source, offset ) {
		var tmp;
		var N;
		var i;
		if ( !( this instanceof TypedArray ) ) {
			throw new TypeError( 'invalid invocation. `this` is not a typed array created by this polyfill.' );
		}
		if ( !isCollection( source ) ) {
			throw new TypeError( 'invalid argument. First argument must be an array-like object. Value: `' + source + '`.' );
		}
		if ( arguments.length < 2 ) {
			offset = 0;
		} else if ( !isNonNegativeInteger( offset ) ) {
			throw new RangeError( 'invalid argument. Index argument is out-of-bounds. Value: `' + offset + '`.' );
		}
		N = source.length;
		if ( offset+N > this.length ) {
			throw new RangeError( 'invalid arguments. Target array lacks sufficient storage to accommodate source values.' );
		}
		// Copy the source first, in case it is a view over the same bytes:
		tmp = [];
		for ( i = 0; i < N; i++ ) {
			tmp.push( source[ i ] );
		}
		for ( i = 0; i < N; i++ ) {
			this[ offset+i ] = tmp[ i ];
		}
	});

	/**
	* Creates a new typed array view over the same underlying buffer.
	*
	* @private
	* @name subarray
	* @memberof TypedArray.prototype
	* @type {Function}
	* @param {integer} [begin=0] - starting index (inclusive)
	* @param {integer} [end=arr.length] - ending index (exclusive)
	* @throws {TypeError} `this` must be a typed array instance
	* @returns {TypedArray} subarray
	*/
	setReadOnly( TypedArray.prototype, 'subarray', function subarray( begin, end ) {
		if ( !( this instanceof TypedArray ) ) {
			throw new TypeError( 'invalid invocation. `this` is not a typed array created by this polyfill.' );
		}
		begin = resolve( begin, this.length, 0 );
		end = resolve( end, this.length, this.length );
		return new TypedArray( this.buffer, this.byteOffset+( begin*nbytes ), ( end > begin ) ? end-begin : 0 );
	});

	return init;

	/**
	* Initializes a typed array instance.
	*
	* @private
	* @param {Object} self - instance being constructed
	* @param {Arguments} args - constructor arguments: a length, an array-like object, or a buffer with an optional byte offset and view length
	* @throws {TypeError} must be called with `new`
	* @throws {TypeError} first argument must be a nonnegative integer, an array-like object, or an array buffer
	* @throws {RangeError} byte offset must be a nonnegative integer multiple of the element size
	* @throws {RangeError} byte offset and length must fit the buffer
	* @returns {TypedArray} the instance
	*/
	function init( self, args ) {
		var nargs;
		var bytes;
		var arg;
		var src;
		var buf;
		var len;
		var off;
		var i;

		if ( !( self instanceof TypedArray ) ) {
			throw new TypeError( 'invalid invocation. Constructor must be called with the `new` keyword.' );
		}
		nargs = args.length;
		arg = args[ 0 ];
		off = 0;
		if ( nargs === 0 ) {
			len = 0;
			buf = new ArrayBuffer( 0 );
		} else if ( isNonNegativeInteger( arg ) ) {
			len = arg;
			buf = new ArrayBuffer( len*nbytes );
		} else if ( arg instanceof ArrayBuffer ) {
			buf = arg;
			if ( nargs > 1 ) {
				off = args[ 1 ];
				if ( !isNonNegativeInteger( off ) || off%nbytes !== 0 ) {
					throw new RangeError( 'invalid argument. Byte offset must be a nonnegative integer multiple of ' + nbytes + '. Value: `' + off + '`.' );
				}
			}
			if ( off > buf.byteLength ) {
				throw new RangeError( 'invalid argument. Byte offset exceeds the buffer size. Value: `' + off + '`.' );
			}
			if ( nargs > 2 ) {
				len = args[ 2 ];
				if ( !isNonNegativeInteger( len ) ) {
					throw new TypeError( 'invalid argument. Length must be a nonnegative integer. Value: `' + len + '`.' );
				}
				if ( off+( len*nbytes ) > buf.byteLength ) {
					throw new RangeError( 'invalid arguments. The buffer is too small for the view. Value: `' + ( len*nbytes ) + '`.' );
				}
			} else {
				len = ( buf.byteLength-off ) / nbytes;
				if ( !isNonNegativeInteger( len ) ) {
					throw new RangeError( 'invalid argument. The size of the buffer after the byte offset must be a multiple of ' + nbytes + '. Value: `' + ( buf.byteLength-off ) + '`.' );
				}
			}
		} else if ( isCollection( arg ) ) {
			src = arg;
			len = src.length;
			buf = new ArrayBuffer( len*nbytes );
		} else {
			throw new TypeError( 'invalid argument. First argument must be a nonnegative integer, an array-like object, or an array buffer created by this polyfill. Value: `' + arg + '`.' );
		}
		bytes = buf._bytes;
		setReadOnly( self, 'buffer', buf );
		setReadOnly( self, 'byteOffset', off );
		setReadOnly( self, 'byteLength', len*nbytes );
		setReadOnly( self, 'length', len );
		for ( i = 0; i < len; i++ ) {
			defineElement( self, i, bytes, off+( i*nbytes ), read, write );
		}
		if ( src ) {
			for ( i = 0; i < len; i++ ) {
				write( bytes, i*nbytes, src[ i ] );
			}
		}
		return self;
	}
}


// EXPORTS //

module.exports = mixin;
