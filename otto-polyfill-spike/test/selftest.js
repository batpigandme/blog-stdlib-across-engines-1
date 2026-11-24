// selftest.js -- checks of the spike polyfills that run the same way on
// Node.js and, once bundled, on otto. No test harness, because otto can't load
// tape; each check prints one line and the last line is the tally.
//
// Where the engine has its own typed arrays (Node.js), the IEEE 754 conversion
// is also compared with them over a sweep of random bit patterns. On otto
// there is nothing to compare with, so only the fixed table runs.

'use strict';

var ArrayBuffer_ = require( './../polyfills/buffer.js' );
var Uint8Array_ = require( './../polyfills/uint8.js' );
var Uint16Array_ = require( './../polyfills/uint16.js' );
var Uint32Array_ = require( './../polyfills/uint32.js' );
var Float64Array_ = require( './../polyfills/float64.js' );
var float64ToWords = require( './../polyfills/base/float64_to_words.js' );
var wordsToFloat64 = require( './../polyfills/base/words_to_float64.js' );

var out = ( typeof print === 'function' ) ? print : console.log;
var HAS_NATIVE = ( typeof Float64Array === 'function' && typeof Uint32Array === 'function' );
var pass = 0;
var fail = 0;

function ok( bool, msg ) {
	if ( bool ) {
		pass += 1;
	} else {
		fail += 1;
		out( 'FAIL ' + msg );
	}
}

// Same value, with +0 and -0 distinct and NaN equal to NaN:
function same( a, b ) {
	if ( a !== a ) {
		return b !== b;
	}
	if ( a === 0 && b === 0 ) {
		return ( 1/a ) === ( 1/b );
	}
	return a === b;
}

function throws( fcn ) {
	try {
		fcn();
	} catch ( err ) {
		return ( err instanceof Error );
	}
	return false;
}

var state = 2463534242;
function next() {
	state ^= state << 13;
	state ^= state >>> 17;
	state ^= state << 5;
	state >>>= 0;
	return state;
}

var f64;
var u32;
var u16;
var u8;
var buf;
var sub;
var w;
var x;
var i;

// 1. The is-little-endian case: two views of different widths over one buffer.
u16 = new Uint16Array_( 1 );
u16[ 0 ] = 0x1234;
u8 = new Uint8Array_( u16.buffer );
ok( u8.length === 2 && u8[ 0 ] === 0x34 && u8[ 1 ] === 0x12, 'uint8 view sees the uint16 write, least significant byte first' );
u8[ 1 ] = 0xab;
ok( u16[ 0 ] === 0xab34, 'uint16 view sees the uint8 write' );

// 2. The set-low-word case: a Float64Array and a Uint32Array over one buffer.
f64 = new Float64Array_( 1 );
u32 = new Uint32Array_( f64.buffer );
f64[ 0 ] = 1.0;
ok( u32.length === 2 && u32[ 0 ] === 0 && u32[ 1 ] === 0x3ff00000, 'uint32 view sees the float64 write' );
u32[ 0 ] = 5;
ok( f64[ 0 ] === 1.000000000000001, 'float64 view sees the uint32 write' );
u32[ 1 ] = 0x7ff00000;
u32[ 0 ] = 0;
ok( f64[ 0 ] === 1/0, 'writing the words of +infinity' );

// 3. Wrap-around and truncation on write, as the has-*-support checks test it.
u16 = new Uint16Array_( [ 1, 3.14, -3.14, 65536, 65537 ] );
ok( u16[ 0 ] === 1 && u16[ 1 ] === 3 && u16[ 2 ] === 65533 && u16[ 3 ] === 0 && u16[ 4 ] === 1, 'uint16 truncates and wraps' );
u8 = new Uint8Array_( [ 1, 3.14, -3.14, 256, 257 ] );
ok( u8[ 0 ] === 1 && u8[ 1 ] === 3 && u8[ 2 ] === 253 && u8[ 3 ] === 0 && u8[ 4 ] === 1, 'uint8 truncates and wraps' );
u32 = new Uint32Array_( [ 1, 3.14, -3.14, 4294967296, 4294967297 ] );
ok( u32[ 0 ] === 1 && u32[ 1 ] === 3 && u32[ 2 ] === 4294967293 && u32[ 3 ] === 0 && u32[ 4 ] === 1, 'uint32 truncates and wraps' );
u8[ 0 ] = NaN;
ok( u8[ 0 ] === 0, 'NaN writes zero to an integer array' );

// 4. Properties.
f64 = new Float64Array_( [ 1.5, -2.5, 3.5 ] );
ok( f64.length === 3 && f64.byteLength === 24 && f64.byteOffset === 0, 'length, byteLength, byteOffset' );
ok( f64.BYTES_PER_ELEMENT === 8 && Float64Array_.BYTES_PER_ELEMENT === 8 && Uint16Array_.BYTES_PER_ELEMENT === 2, 'BYTES_PER_ELEMENT' );
ok( f64.buffer instanceof ArrayBuffer_ && f64.buffer.byteLength === 24, 'buffer' );
ok( Float64Array_.name === 'Float64Array' && Uint8Array_.name === 'Uint8Array' && Uint16Array_.name === 'Uint16Array' && Uint32Array_.name === 'Uint32Array' && ArrayBuffer_.name === 'ArrayBuffer', 'name' );
ok( ( new Uint16Array_( 1 ) ).constructor === Uint16Array_ && ( new Uint16Array_( 1 ) ).constructor.name === 'Uint16Array', 'constructor and its name' );
ok( f64[ 0 ] === 1.5 && f64[ 1 ] === -2.5 && f64[ 2 ] === 3.5 && f64[ 3 ] === void 0, 'element reads, and an out-of-bounds read' );
ok( ( new Float64Array_() ).length === 0, 'no arguments' );

// 5. Views with an offset and a length; subarray; set; slice.
buf = new ArrayBuffer_( 16 );
f64 = new Float64Array_( buf, 8 );
u8 = new Uint8Array_( buf, 8, 8 );
f64[ 0 ] = -2.0;
ok( f64.length === 1 && f64.byteOffset === 8 && u8[ 7 ] === 0xc0 && ( new Uint8Array_( buf ) )[ 7 ] === 0, 'a view at a byte offset' );
f64 = new Float64Array_( [ 1.0, 2.0, 3.0, 4.0 ] );
sub = f64.subarray( 1, 3 );
sub[ 0 ] = 20.0;
ok( sub.length === 2 && f64[ 1 ] === 20.0 && sub[ 1 ] === 3.0 && sub.buffer === f64.buffer, 'subarray aliases its parent' );
ok( f64.subarray( -1 ).length === 1 && f64.subarray( -1 )[ 0 ] === 4.0, 'subarray with a negative index' );
f64.set( [ 7.0, 8.0 ], 2 );
ok( f64[ 2 ] === 7.0 && f64[ 3 ] === 8.0, 'set' );
f64.set( f64.subarray( 0, 3 ), 1 );
ok( f64[ 0 ] === 1.0 && f64[ 1 ] === 1.0 && f64[ 2 ] === 20.0 && f64[ 3 ] === 7.0, 'set from an overlapping view' );
u8 = new Uint8Array_( [ 1, 2, 3, 4 ] );
buf = u8.buffer.slice( 1, 3 );
u8[ 1 ] = 9;
ok( buf.byteLength === 2 && ( new Uint8Array_( buf ) )[ 0 ] === 2, 'slice copies' );
ok( same( ( new Float64Array_( new Uint8Array_( [ 1, 2 ] ) ) )[ 1 ], 2.0 ), 'construction from another typed array' );

// 6. Errors.
ok( throws( function f() { return Float64Array_( 1 ); } ), 'throws without new' );
ok( throws( function f() { return new Float64Array_( -1 ); } ), 'throws on a negative length' );
ok( throws( function f() { return new Float64Array_( new ArrayBuffer_( 7 ) ); } ), 'throws when the buffer size is not a multiple of the element size' );
ok( throws( function f() { return new Float64Array_( new ArrayBuffer_( 16 ), 4 ); } ), 'throws on an unaligned byte offset' );
ok( throws( function f() { return new Float64Array_( new ArrayBuffer_( 16 ), 8, 2 ); } ), 'throws when the view overruns the buffer' );
ok( throws( function f() { return new ArrayBuffer_( -1 ); } ), 'ArrayBuffer throws on a negative size' );
ok( throws( function f() { ( new Uint8Array_( 2 ) ).set( [ 1, 2, 3 ] ); } ), 'set throws when the source is too long' );

// 7. IEEE 754 conversion, against bit patterns written out by hand.
var TABLE = [
	[ 0.0, 0x00000000, 0x00000000 ],
	[ -0.0, 0x80000000, 0x00000000 ],
	[ 1.0, 0x3ff00000, 0x00000000 ],
	[ -1.0, 0xbff00000, 0x00000000 ],
	[ 2.0, 0x40000000, 0x00000000 ],
	[ 0.5, 0x3fe00000, 0x00000000 ],
	[ 0.1, 0x3fb99999, 0x9999999a ],
	[ 3.141592653589793, 0x400921fb, 0x54442d18 ],
	[ 5e-324, 0x00000000, 0x00000001 ],
	[ -5e-324, 0x80000000, 0x00000001 ],
	[ 2.225073858507201e-308, 0x000fffff, 0xffffffff ],
	[ 2.2250738585072014e-308, 0x00100000, 0x00000000 ],
	[ 2.225073858507202e-308, 0x00100000, 0x00000001 ],
	[ 1.7976931348623157e308, 0x7fefffff, 0xffffffff ],
	[ 4503599627370496, 0x43300000, 0x00000000 ],
	[ 9007199254740991, 0x433fffff, 0xffffffff ],
	[ 1.0000000000000002, 0x3ff00000, 0x00000001 ],
	[ 0.9999999999999999, 0x3fefffff, 0xffffffff ],
	[ 1/0, 0x7ff00000, 0x00000000 ],
	[ -1/0, 0xfff00000, 0x00000000 ]
];
for ( i = 0; i < TABLE.length; i++ ) {
	w = float64ToWords( TABLE[ i ][ 0 ], [ 0, 0 ] );
	ok( w[ 0 ] === TABLE[ i ][ 1 ] && w[ 1 ] === TABLE[ i ][ 2 ], 'to words: ' + TABLE[ i ][ 0 ] + ' gave ' + w[ 0 ].toString( 16 ) + ' ' + w[ 1 ].toString( 16 ) );
	x = wordsToFloat64( TABLE[ i ][ 1 ], TABLE[ i ][ 2 ] );
	ok( same( x, TABLE[ i ][ 0 ] ), 'from words: ' + TABLE[ i ][ 1 ].toString( 16 ) + ' ' + TABLE[ i ][ 2 ].toString( 16 ) + ' gave ' + x );
}
w = float64ToWords( 0/0, [ 0, 0 ] );
ok( w[ 0 ] === 0x7ff80000 && w[ 1 ] === 0, 'NaN encodes as the one quiet NaN' );
x = wordsToFloat64( 0xfff00000, 1 );
ok( x !== x, 'a NaN bit pattern decodes as NaN' );

// 8. IEEE 754 conversion, against the engine's own typed arrays, where it has them.
var N = 200000;
var F64;
var U32;
var HI;
var LO;
var hi;
var lo;
var bad = 0;
if ( HAS_NATIVE ) {
	F64 = new Float64Array( 1 );
	U32 = new Uint32Array( F64.buffer );
	HI = ( ( new Uint8Array( new Uint16Array( [ 1 ] ).buffer ) )[ 0 ] === 1 ) ? 1 : 0;
	LO = 1 - HI;
	for ( i = 0; i < N; i++ ) {
		hi = next();
		lo = next();
		if ( i % 4 === 1 ) {
			hi &= 0x800fffff; // a subnormal, or zero
		} else if ( i % 4 === 2 ) {
			hi = ( hi & 0x800fffff ) | ( ( 1 + ( i % 3 ) ) << 20 ); // just above the subnormal range
		}
		U32[ HI ] = hi;
		U32[ LO ] = lo;
		x = F64[ 0 ];
		if ( !same( wordsToFloat64( hi >>> 0, lo ), x ) ) {
			bad += 1;
		}
		w = float64ToWords( x, [ 0, 0 ] );
		if ( x === x && ( w[ 0 ] !== ( hi >>> 0 ) || w[ 1 ] !== lo ) ) {
			bad += 1;
		}
	}
	ok( bad === 0, 'sweep of ' + N + ' random bit patterns against native typed arrays: ' + bad + ' mismatches' );
	out( 'native sweep: ' + N + ' bit patterns, ' + bad + ' mismatches' );
} else {
	out( 'native sweep: skipped, this engine has no typed arrays' );
}

out( 'selftest pass ' + pass + ' fail ' + fail );
