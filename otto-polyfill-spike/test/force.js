// force.js -- a Node.js preload that makes a stdlib checkout use the spike
// polyfills, without editing it. Used by package-tests.sh:
//
//   node -r ./test/force.js ~/stdlib/lib/node_modules/@stdlib/<pkg>/test/test.js
//
// It wraps Module._resolveFilename, so the same two swaps build.js makes at
// bundle time happen at require time:
//
//   swap    lib/polyfill.js of array/buffer, array/uint8, array/uint16,
//           array/uint32 and array/float64 resolves to ../polyfills/<name>.js
//   force   lib/index.js of the matching @stdlib/assert/has-*-support packages
//           resolves to ../force/no_support.js, so each package picks its
//           polyfill although Node.js has the built-in
//
// SPIKE_FORCE=swap does the first alone; anything else does both. The global
// typed arrays stay, so tape, and tests that build their own fixtures with
// `new Float64Array(...)` from the global scope, still get native ones.

'use strict';

var path = require( 'path' );
var Module = require( 'module' );

var HERE = path.resolve( __dirname, '..' );
var RE_POLYFILL = /@stdlib\/array\/(buffer|uint8|uint16|uint32|float64)\/lib\/polyfill\.js$/;
var RE_SUPPORT = /@stdlib\/assert\/has-(arraybuffer|uint8array|uint16array|uint32array|float64array)-support\/lib\/index\.js$/;
var FORCE = ( process.env.SPIKE_FORCE !== 'swap' );
var resolveFilename = Module._resolveFilename;

Module._resolveFilename = function resolve() {
	var file = resolveFilename.apply( this, arguments );
	var m = RE_POLYFILL.exec( file.split( path.sep ).join( '/' ) );
	if ( m ) {
		return path.join( HERE, 'polyfills', m[ 1 ] + '.js' );
	}
	if ( FORCE && RE_SUPPORT.test( file.split( path.sep ).join( '/' ) ) ) {
		return path.join( HERE, 'force', 'no_support.js' );
	}
	return file;
};
