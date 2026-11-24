// build.js -- bundle one entry file with zero or more of the spike's patches
// applied to stdlib at bundle time. Nothing in ~/stdlib or in node_modules is
// edited: each patch is applied to copies of the files it touches, taken from
// stdlib at $COMMIT with `git show`, and an esbuild plugin serves the patched
// copies in place of the originals.
//
//   node build.js OUT.js ENTRY.js [PATCH ...] [--banner FILE]
//
//   PATCH    a file in patches/, in stdlib's lib/node_modules/@stdlib/... paths
//   --banner the contents of FILE go at the top of the bundle (esbuild's banner)
//
// Packages resolve from $STDLIB/lib/node_modules (default ~/stdlib, at
// $COMMIT), by their slash names, as the entry files spell them. esbuild itself
// comes from ../bundles/node_modules ($NPM_MODULES overrides it): run `npm ci`
// in ../bundles first.
//
// The build stops if the file on disk isn't byte-identical to stdlib's at
// $COMMIT, so a patch can't land on different code; if a patched file was never
// loaded, so a patch can't silently miss the bundle; and if any package came
// from node_modules, not the checkout. The patches themselves are applied by
// overlay.js.
//
// Prints one line: the bundle's sha256, its size, and which patched files it
// loaded.

'use strict';

var path = require( 'path' );
var fs = require( 'fs' );
var crypto = require( 'crypto' );
var ov_ = require( './overlay.js' );

var HERE = __dirname;
var COMMIT = ov_.COMMIT;
var SOURCE = ov_.SOURCE;
var key = ov_.key;
var isSource = ov_.isSource;
var overlay = ov_.overlay;
var NPM = process.env.NPM_MODULES || path.join( HERE, '..', 'bundles', 'node_modules' );
var esbuild = require( path.join( NPM, 'esbuild' ) );

function plugin( ov, hits ) {
	return {
		'name': 'guard-spike',
		'setup': function setup( build ) {
			// A file a patch creates doesn't exist on disk, so resolve it here:
			build.onResolve( { 'filter': /^\.\.?\// }, function onRelative( args ) {
				var p = path.resolve( args.resolveDir, args.path );
				var k = key( p );
				if ( k && ov[ k ] && ov[ k ].original === null ) {
					return { 'path': p };
				}
				return null;
			});
			build.onLoad( { 'filter': /@stdlib[\\/].*\.js$/ }, function onLoad( args ) {
				var k = key( args.path );
				if ( !k || !ov[ k ] || !isSource( args.path ) ) {
					return null;
				}
				if ( ov[ k ].original !== null && !fs.readFileSync( args.path ).equals( ov[ k ].original ) ) {
					throw new Error( args.path + ' differs from stdlib ' + COMMIT.slice( 0, 8 ) + "'s copy; not patching it" );
				}
				hits[ k ] = ( hits[ k ] || 0 ) + 1;
				return {
					'contents': ov[ k ].patched,
					'loader': 'js',
					'resolveDir': path.dirname( args.path )
				};
			});
		}
	};
}

async function main() {
	var args = process.argv.slice( 2 );
	var banner = '';
	var patches = [];
	var hits = {};
	var outfile;
	var inputs;
	var stray;
	var entry;
	var res;
	var txt;
	var ov;
	var i;

	outfile = path.resolve( args[ 0 ] );
	entry = path.resolve( args[ 1 ] );
	if ( !outfile || !entry ) {
		throw new Error( 'usage: node build.js OUT.js ENTRY.js [PATCH ...] [--banner FILE]' );
	}
	for ( i = 2; i < args.length; i++ ) {
		if ( args[ i ] === '--banner' ) {
			i += 1;
			banner = fs.readFileSync( args[ i ], 'utf8' ).trim();
		} else {
			patches.push( args[ i ] );
		}
	}
	ov = overlay( patches );
	fs.mkdirSync( path.dirname( outfile ), { 'recursive': true } );
	res = await esbuild.build({
		'entryPoints': [ entry ],
		'bundle': true,
		'format': 'iife',
		'target': 'es5',
		'logLevel': 'warning',
		'metafile': true,
		'outfile': outfile,
		'banner': ( banner ) ? { 'js': banner } : {},
		'nodePaths': [ SOURCE ],
		'plugins': [ plugin( ov, hits ) ]
	});
	Object.keys( ov ).forEach( function check( k ) {
		if ( !hits[ k ] ) {
			throw new Error( path.basename( outfile ) + ': patched file never loaded: ' + k + ' (' + ov[ k ].patch + ')' );
		}
	});
	inputs = Object.keys( res.metafile.inputs );
	stray = inputs.filter( function isStray( p ) {
		return /(^|\/)node_modules\/@stdlib\//.test( p ) && !isSource( p );
	});
	if ( stray.length ) {
		throw new Error( path.basename( outfile ) + ': resolved from node_modules, not the stdlib checkout: ' + stray[ 0 ] );
	}
	txt = fs.readFileSync( outfile );
	console.log( '%s  %s bytes  %s  patched: %s',
		crypto.createHash( 'sha256' ).update( txt ).digest( 'hex' ).slice( 0, 16 ),
		txt.length,
		path.basename( outfile ),
		Object.keys( hits ).sort().join( ', ' ) || 'none'
	);
}

main().catch( function onError( err ) {
	console.error( err.message );
	process.exit( 1 );
});
