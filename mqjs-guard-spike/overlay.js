// overlay.js -- the patches, applied to copies of stdlib's files at $COMMIT,
// for build.js (bundles) and test/patched-require.js (stdlib's own tests).
// Nothing in ~/stdlib is written: `git show` reads the originals, and
// `git apply` runs on copies in a temporary directory.

'use strict';

var path = require( 'path' );
var fs = require( 'fs' );
var os = require( 'os' );
var cp = require( 'child_process' );

var HERE = __dirname;
var STDLIB = process.env.STDLIB || path.join( process.env.HOME, 'stdlib' );
var COMMIT = process.env.COMMIT || 'b64fd0cc2749bd6937d9ce55ec4555bad1d41e68';
var SOURCE = path.join( STDLIB, 'lib', 'node_modules' );

// `.../@stdlib/assert/is-enumerable-property/lib/native.js` gives
// `assert-is-enumerable-property/lib/native.js`:
function key( p ) {
	var m = /@stdlib\/(.+?)\/lib\/(.+)$/.exec( p.split( path.sep ).join( '/' ) );
	if ( !m ) {
		return null;
	}
	return m[ 1 ].split( '/' ).join( '-' ) + '/lib/' + m[ 2 ];
}

function isSource( p ) {
	return path.resolve( p ).indexOf( SOURCE ) === 0;
}

function git( args, opts ) {
	return cp.execFileSync( 'git', args, opts || {} );
}

// Applies each patch to copies of stdlib's files at COMMIT, in a directory
// outside any repository (inside one, `git apply` prefixes paths with the
// working directory's own path); returns
// { key: { 'patched': Buffer, 'original': Buffer|null, 'patch': name } }.
function overlay( patches ) {
	var out = {};
	patches.forEach( function apply( name ) {
		var file = path.resolve( HERE, name );
		var tmp = fs.mkdtempSync( path.join( os.tmpdir(), 'guard-spike-' ) );
		var paths = git( [ 'apply', '--numstat', file ], { 'cwd': tmp } ).toString().trim().split( '\n' ).map( function last( l ) {
			return l.split( '\t' )[ 2 ];
		});
		paths.forEach( function copy( p ) {
			var orig;
			try {
				orig = git( [ '-C', STDLIB, 'show', COMMIT + ':' + p ], { 'stdio': [ 'ignore', 'pipe', 'ignore' ] } );
			} catch ( err ) {
				orig = null; // a file the patch creates
			}
			if ( orig ) {
				fs.mkdirSync( path.dirname( path.join( tmp, p ) ), { 'recursive': true } );
				fs.writeFileSync( path.join( tmp, p ), orig );
			}
			if ( out[ key( p ) ] ) {
				throw new Error( 'two patches touch ' + p + '; this overlay does not stack them' );
			}
			out[ key( p ) ] = { 'original': orig, 'patch': path.basename( name ) };
		});
		git( [ 'apply', file ], { 'cwd': tmp } );
		paths.forEach( function read( p ) {
			out[ key( p ) ].patched = fs.readFileSync( path.join( tmp, p ) );
		});
		fs.rmSync( tmp, { 'recursive': true } );
	});
	return out;
}

module.exports = {
	'STDLIB': STDLIB,
	'COMMIT': COMMIT,
	'SOURCE': SOURCE,
	'key': key,
	'isSource': isSource,
	'overlay': overlay
};

// `node overlay.js PATCH PATH` prints PATH (a lib/node_modules/@stdlib/... path)
// as PATCH leaves it, so run.sh can lint the patched copy:
if ( require.main === module ) {
	( function print() {
		var files = overlay( [ path.resolve( process.argv[ 2 ] ) ] );
		var k = key( process.argv[ 3 ] );
		if ( !files[ k ] ) {
			process.stderr.write( process.argv[ 2 ] + ' does not touch ' + process.argv[ 3 ] + '\n' );
			process.exit( 1 );
		}
		process.stdout.write( files[ k ].patched );
	})();
}
