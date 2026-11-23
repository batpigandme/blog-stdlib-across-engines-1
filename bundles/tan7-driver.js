// tan7-driver.js -- stdlib's tan( 7 ) beside this host's own Math.tan( 7 ),
// each as the bits of a double and as a decimal, on one line.
//
// Built the same way as npm.js (see README.md), so the page can run it the
// way it runs npm.js. It prints with `print` where the host has one, and
// `console.log` otherwise. ES5 only, like driver.js.

var tan = require( '@stdlib/math-base-special-tan' );

var out = ( typeof print === 'function' ) ? print : console.log;

// Bit pattern of a float64, high word first, independent of host endianness.
// Deliberately not @stdlib/number-float64-base-to-words: the thing under test
// should not also be the instrument. Copied from driver.js, so the bits print
// in the same form.
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

var a = tan( 7 );
var m = Math.tan( 7 );

out( 'tan( 7 ) ' + bits( a ) + ' ' + a + ' | Math.tan( 7 ) ' + bits( m ) + ' ' + m );
