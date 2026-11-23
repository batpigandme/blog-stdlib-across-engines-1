// driver.js -- the same inputs through two @stdlib/* functions, printed as
// raw float64 bit patterns so engines can be compared byte for byte.
//
// Runtimes run this file directly (`node driver.js`, `bare driver.js`).
// Engine shells cannot resolve `require`, so they run bundle.js, which is this
// file bundled by build.sh. Both paths print the same lines or something is
// wrong with one of them.
//
// ES5 only, because Duktape and JerryScript are in the set. Inputs come from
// fixed edge cases plus a xorshift32 sweep that uses only 32-bit integer
// operators, so every engine generates the same doubles before any stdlib
// code runs. No Math.random, no Date, no host APIs.

var erf = require( '@stdlib/math-base-special-erf' );
var ldexp = require( '@stdlib/math-base-special-ldexp' );

var out = ( typeof print === 'function' ) ? print : console.log;

// Bit pattern of a float64, high word first, independent of host endianness.
// Deliberately not @stdlib/number-float64-base-to-words: the thing under test
// should not also be the instrument.
var F64 = new Float64Array( 1 );
var U32 = new Uint32Array( F64.buffer );
var LE = ( new Uint8Array( new Uint16Array( [ 1 ] ).buffer ) )[ 0 ] === 1;
var HI = ( LE ) ? 1 : 0;
var LO = ( LE ) ? 0 : 1;

function hex8( n ) {
	var s = n.toString( 16 );
	while ( s.length < 8 ) {
		s = '0' + s;
	}
	return s;
}

function bits( x ) {
	F64[ 0 ] = x;
	return hex8( U32[ HI ] ) + hex8( U32[ LO ] );
}

function fromBits( hi, lo ) {
	U32[ HI ] = hi >>> 0;
	U32[ LO ] = lo >>> 0;
	return F64[ 0 ];
}

// xorshift32: integer-only, so identical on every conforming engine.
var state = 2463534242;
function next() {
	state ^= state << 13;
	state ^= state >>> 17;
	state ^= state << 5;
	state >>>= 0;
	return state;
}

// A double uniform on [0,1) with 53 random bits; both halves are exact.
function uniform() {
	var a = next() >>> 5;
	var b = next() >>> 6;
	return ( ( a * 67108864 ) + b ) / 9007199254740992;
}

var i;
var x;
var n;
var count = 0;

// erf: special values, subnormals, and both sides of the kernel's branch
// thresholds (0.84375, 1.25, 1/0.35, 6, 28; see erf's lib/main.js).
var ERF_FIXED = [
	0, -0, NaN, 1 / 0, -1 / 0,
	5e-324, -5e-324, 2.2250738585072014e-308, 1e-300, 3.725290298461914e-9,
	1e-10, 0.1, 0.5, 0.84375, 0.8437499999999999,
	1, 1.25, 1.2499999999999998, 2, 2.857142857142857,
	2.8571428571428568, 3, 5.9, 6, 6.000000000000001,
	27.999999999999996, 28, -0.3, -1.5, -4
];
for ( i = 0; i < ERF_FIXED.length; i++ ) {
	x = ERF_FIXED[ i ];
	out( 'erf ' + bits( x ) + ' ' + bits( erf( x ) ) );
	count += 1;
}
for ( i = 0; i < 2000; i++ ) {
	x = ( uniform() * 14 ) - 7;
	out( 'erf ' + bits( x ) + ' ' + bits( erf( x ) ) );
	count += 1;
}

// ldexp: overflow, underflow into and out of the subnormal range, rounding
// at the bottom of it, and signed zero.
var LDEXP_FIXED = [
	[ 1, 1023 ], [ 1, 1024 ], [ 1, -1022 ], [ 1, -1074 ], [ 1, -1075 ],
	[ 0.75, -1074 ], [ 1.5, -1074 ], [ 3, -1075 ], [ 5e-324, 1074 ], [ 5e-324, -1 ],
	[ 2.2250738585072014e-308, -1 ], [ 2.2250738585072014e-308, -52 ], [ -0, 10 ], [ 0, -10 ], [ NaN, 1 ],
	[ 1 / 0, -5 ], [ -1 / 0, 5 ], [ 1.7976931348623157e308, 1 ], [ 1.7976931348623157e308, -2098 ], [ 1, 2000 ],
	[ 1, -2000 ], [ -3.5, 7 ], [ 0.1, 3 ]
];
for ( i = 0; i < LDEXP_FIXED.length; i++ ) {
	x = LDEXP_FIXED[ i ][ 0 ];
	n = LDEXP_FIXED[ i ][ 1 ];
	out( 'ldexp ' + bits( x ) + ' ' + n + ' ' + bits( ldexp( x, n ) ) );
	count += 1;
}
// Random bit patterns rather than random values, so the sweep reaches
// subnormals, huge magnitudes, NaN payloads and both signs; exponents span
// past both ends of the representable range.
for ( i = 0; i < 2000; i++ ) {
	x = fromBits( next(), next() );
	n = ( next() % 2201 ) - 1100;
	out( 'ldexp ' + bits( x ) + ' ' + n + ' ' + bits( ldexp( x, n ) ) );
	count += 1;
}

out( 'cases ' + count );
