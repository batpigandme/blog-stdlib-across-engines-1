// patched-require.js -- a Node.js require hook (node -r) that serves the
// spike's patched copies of stdlib's files, from overlay.js, in place of the
// originals in $STDLIB, so stdlib's own tests can run against a patch without
// any file in the checkout being edited.
//
//   GUARD_PATCHES=patches/1-is-enumerable-property.patch node -r ./test/patched-require.js FILE
//
// GUARD_PATCHES  comma-separated patch files, relative to the spike folder
// GUARD_DELETE   comma-separated Object.prototype methods to delete before
//                anything loads (propertyIsEnumerable forces patch 1's fallback);
//                each built-in is kept as global.__builtin_<name> first
// Prints nothing unless a patched file is never loaded, which it reports to
// stderr at exit, so a test run can't pass on unpatched code by mistake.

'use strict';

var path = require( 'path' );
var fs = require( 'fs' );
var Module = require( 'module' );
var ov = require( path.join( __dirname, '..', 'overlay.js' ) );

var HERE = path.join( __dirname, '..' );
var patches = ( process.env.GUARD_PATCHES || '' ).split( ',' ).filter( Boolean );
var files = ov.overlay( patches.map( function abs( p ) {
	return path.resolve( HERE, p );
}));
var hits = {};
var resolve = Module._resolveFilename;
var compileJS = Module._extensions[ '.js' ];

( process.env.GUARD_DELETE || '' ).split( ',' ).filter( Boolean ).forEach( function del( name ) {
	global[ '__builtin_' + name ] = Object.prototype[ name ];
	delete Object.prototype[ name ];
});

// A file a patch creates doesn't exist on disk, so resolve it here:
Module._resolveFilename = function resolveFilename( request, parent ) {
	var p;
	var k;
	if ( /^\.\.?\//.test( request ) && parent && parent.filename ) {
		p = path.resolve( path.dirname( parent.filename ), request );
		k = ov.key( p );
		if ( k && files[ k ] && files[ k ].original === null && ov.isSource( p ) ) {
			return p;
		}
	}
	return resolve.apply( this, arguments );
};

Module._extensions[ '.js' ] = function load( module, filename ) {
	var k = ov.key( filename );
	if ( k && files[ k ] && ov.isSource( filename ) ) {
		if ( files[ k ].original !== null && !fs.readFileSync( filename ).equals( files[ k ].original ) ) {
			throw new Error( filename + ' differs from stdlib ' + ov.COMMIT.slice( 0, 8 ) + "'s copy; not patching it" );
		}
		hits[ k ] = true;
		return module._compile( files[ k ].patched.toString( 'utf8' ), filename );
	}
	return compileJS( module, filename );
};

process.on( 'exit', function onExit() {
	Object.keys( files ).forEach( function check( k ) {
		if ( !hits[ k ] ) {
			process.stderr.write( 'patched-require: patched file never loaded: ' + k + '\n' );
		}
	});
});
