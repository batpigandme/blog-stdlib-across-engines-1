// driver.js -- stdlib's integer-dtype paths on fixed inputs, every output
// printed as an integer so engines can be compared byte for byte.
//
// Three choices, each a different way stdlib reaches 8- and 16-bit integers
// (see ../../integer-paths/README.md for why these and not others):
//
//   1. @stdlib/math/strided/ops/add and /mul -- the dtype-dispatched strided
//      entry point. uint8, int16 and uint16 inputs and outputs: the callback
//      is float64 arithmetic, and the narrowing is the typed array's own
//      element store (ToUint8, ToInt16, ToUint16 in ECMA-262).
//   2. @stdlib/blas/ext/base/gsorthp -- a generic strided kernel with no
//      arithmetic on the data at all: comparisons and swaps on an Int16Array.
//   3. @stdlib/number/uint16/base/mul and @stdlib/number/uint8/base/add
//      applied element-wise by @stdlib/strided/base/binary -- stdlib's own
//      dtype-named integer arithmetic. uint16 mul goes through
//      @stdlib/number/int32/base/mul, which is Math.imul where the engine has
//      it and a polyfill where it does not, so the driver reports which.
//
// ES5 only (Duktape, JerryScript). Inputs from a xorshift32 sweep that uses
// only 32-bit integer operators, plus fixed edge values at each type's limits.
// No Math.random, no Date, no host APIs.

var add = require( '@stdlib/math/strided/ops/add' );
var mul = require( '@stdlib/math/strided/ops/mul' );
var gsorthp = require( '@stdlib/blas/ext/base/gsorthp' );
var binary = require( '@stdlib/strided/base/binary' );
var mul16 = require( '@stdlib/number/uint16/base/mul' );
var add8 = require( '@stdlib/number/uint8/base/add' );

var out = ( typeof print === 'function' ) ? print : console.log;
// N is 4096 unless a prelude sets DRIVER_N, for engines whose default heap
// cannot hold the full-size output (see ../../integer-paths/README.md).
var N = ( typeof DRIVER_N === 'number' ) ? DRIVER_N : 4096;

var state = 2463534242;
function next() {
	state ^= state << 13;
	state ^= state >>> 17;
	state ^= state << 5;
	state >>>= 0;
	return state;
}

// Edge values first, then the sweep, both already in range for the type, so
// the inputs need no conversion and are the same on every engine.
function fill( arr, lo, hi, edges ) {
	var span = hi - lo + 1;
	var i;
	for ( i = 0; i < edges.length; i++ ) {
		arr[ i ] = edges[ i ];
	}
	for ( ; i < arr.length; i++ ) {
		arr[ i ] = lo + ( next() % span );
	}
	return arr;
}

function line( name, arr ) {
	var s = [];
	var i;
	for ( i = 0; i < arr.length; i++ ) {
		s.push( arr[ i ] );
	}
	out( name + ' ' + s.join( ',' ) );
}

var E8 = [ 0, 1, 127, 128, 254, 255, 255, 0, 200, 100 ];
var E16S = [ -32768, 32767, -1, 1, 0, -32768, 32767, 32767, -32768, 12345 ];
var E16U = [ 0, 1, 65535, 65534, 32768, 65535, 65535, 0, 40000, 256 ];

var u8x = fill( new Uint8Array( N ), 0, 255, E8 );
var u8y = fill( new Uint8Array( N ), 0, 255, E8.slice().reverse() );
var i16x = fill( new Int16Array( N ), -32768, 32767, E16S );
var i16y = fill( new Int16Array( N ), -32768, 32767, E16S.slice().reverse() );
var u16x = fill( new Uint16Array( N ), 0, 65535, E16U );
var u16y = fill( new Uint16Array( N ), 0, 65535, E16U.slice().reverse() );

out( 'meta Math.imul ' + ( ( typeof Math.imul === 'function' ) ? 'native' : 'absent (stdlib polyfill)' ) );
line( 'in-u8x', u8x );
line( 'in-i16x', i16x );
line( 'in-u16x', u16x );
line( 'in-u8y', u8y );
line( 'in-i16y', i16y );
line( 'in-u16y', u16y );

// 1. dtype dispatch
var z;
z = new Uint8Array( N );
add( N, 'uint8', u8x, 1, 'uint8', u8y, 1, 'uint8', z, 1 );
line( 'ops.add uint8,uint8->uint8', z );
z = new Uint16Array( N );
add( N, 'uint8', u8x, 1, 'uint8', u8y, 1, 'uint16', z, 1 );
line( 'ops.add uint8,uint8->uint16', z );
z = new Int16Array( N );
add( N, 'int16', i16x, 1, 'int16', i16y, 1, 'int16', z, 1 );
line( 'ops.add int16,int16->int16', z );
z = new Int32Array( N );
add( N, 'int16', i16x, 1, 'int16', i16y, 1, 'int32', z, 1 );
line( 'ops.add int16,int16->int32', z );
z = new Uint16Array( N );
add( N, 'uint16', u16x, 1, 'uint16', u16y, 1, 'uint16', z, 1 );
line( 'ops.add uint16,uint16->uint16', z );
z = new Uint16Array( N );
mul( N, 'uint16', u16x, 1, 'uint16', u16y, 1, 'uint16', z, 1 );
line( 'ops.mul uint16,uint16->uint16', z );
z = new Uint32Array( N );
mul( N, 'uint16', u16x, 1, 'uint16', u16y, 1, 'uint32', z, 1 );
line( 'ops.mul uint16,uint16->uint32', z );
z = new Int16Array( N );
mul( N, 'int16', i16x, 1, 'int16', i16y, 1, 'int16', z, 1 );
line( 'ops.mul int16,int16->int16', z );
z = new Uint8Array( N );
mul( N, 'uint8', u8x, 1, 'uint8', u8y, 1, 'uint8', z, 1 );
line( 'ops.mul uint8,uint8->uint8', z );

// Strided, not contiguous: every other element, written backwards.
z = new Int16Array( N );
add( N / 2, 'int16', i16x, 2, 'int16', i16y, 2, 'int16', z, -2 );
line( 'ops.add int16 stride 2,2,-2', z );

// 2. generic kernel, comparisons only
var s = new Int16Array( i16x );
gsorthp( N, 1.0, s, 1 );
line( 'gsorthp int16 ascending', s );
s = new Uint16Array( u16x );
gsorthp( N, -1.0, s, 1 );
line( 'gsorthp uint16 descending', s );
s = new Uint8Array( u8x );
gsorthp( N / 2, 1.0, s, 2 );
line( 'gsorthp uint8 stride 2', s );

// 3. dtype-named arithmetic, element-wise
z = new Uint16Array( N );
binary( [ u16x, u16y, z ], [ N ], [ 1, 1, 1 ], mul16 );
line( 'binary number.uint16.base.mul', z );
z = new Uint8Array( N );
binary( [ u8x, u8y, z ], [ N ], [ 1, 1, 1 ], add8 );
line( 'binary number.uint8.base.add', z );

out( 'done' );
