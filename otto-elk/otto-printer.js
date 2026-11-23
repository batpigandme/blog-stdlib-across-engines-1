// otto-printer.js -- does stdlib's erf itself load and run without typed
// arrays? A probe for otto, an ES5 engine with no Float64Array. Reading
// stdlib's source says it can't: set-low-word creates a Float64Array when its
// module loads, and erf requires it.
//
// The driver can't answer that on otto, because it prints bits through a
// Float64Array itself, so otto fails in the driver first. This prints erf's
// results as decimal strings instead, with no typed array of its own. Bundled
// to one ES5 file with esbuild (--bundle --format=iife --target=es5). A probe,
// not a digest: its output isn't compared with the reference.

var erf = require( '@stdlib/math-base-special-erf' );

var out = ( typeof print === 'function' ) ? print : console.log;

var X = [ 0, 0.1, 0.5, 1, -1.5, 2, 3, 6 ];
var i;

out( 'loaded' );
for ( i = 0; i < X.length; i++ ) {
	out( 'erf ' + String( X[ i ] ) + ' ' + String( erf( X[ i ] ) ) );
}
out( 'cases ' + X.length );
