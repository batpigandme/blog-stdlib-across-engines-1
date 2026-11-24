// ops-add-uint16.js -- 1,000 uint16 pairs through @stdlib/math/strided/ops/add
// (dtype dispatch), uint16 output. For MQuickJS flash and heap figures; prints
// a checksum and `done`.
var add = require( '@stdlib/math/strided/ops/add' );
var out = ( typeof print === "function" ) ? print : console.log;
var N = 1000;
var state = 2463534242;
function next() { state ^= state << 13; state ^= state >>> 17; state ^= state << 5; state >>>= 0; return state; }
function fill( arr, lo, span ) { var i; for ( i = 0; i < arr.length; i++ ) { arr[ i ] = lo + ( next() % span ); } return arr; }
// Checksum: an order-sensitive integer fold, exact on every conforming engine.
function check( arr ) { var h = 0; var i; for ( i = 0; i < arr.length; i++ ) { h = ( ( h * 31 ) + arr[ i ] ) % 1000000007; } return h; }
var x = fill( new Uint16Array( N ), 0, 65536 );
var y = fill( new Uint16Array( N ), 0, 65536 );
var z = new Uint16Array( N );
add( N, 'uint16', x, 1, 'uint16', y, 1, 'uint16', z, 1 );
out( 'ops.add uint16 ' + check( z ) );
out( 'done' );
