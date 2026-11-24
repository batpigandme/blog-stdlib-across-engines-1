// build.js -- bundle the digest driver, the otto printer, and the self-test,
// with the spike polyfills swapped in for stdlib's stubs at bundle time.
// Nothing in the stdlib checkout or in node_modules is edited.
//
//   node build.js            # writes out/*.js and prints one line per bundle
//
// Two swaps, both done by an esbuild plugin:
//
//   swap    `require( './polyfill.js' )` from the lib/index.js of array/buffer,
//           array/uint8, array/uint16, array/uint32 and array/float64 resolves
//           to polyfills/<name>.js here. This is the only change a pull
//           request would make, so a "natural" bundle has this swap alone and
//           leaves the choice of built-in or polyfill to stdlib's own
//           has-*-support checks.
//   force   `@stdlib/assert/has-<type>-support` resolves to
//           force/no_support.js, which returns false, so the polyfill is
//           picked even on Node.js. A "forced" bundle has both swaps.
//
// Each digest bundle is built from the published packages (the lock file in
// ../bundles) and from the source checkout, the same pair as ../bundles/npm.js
// and ../bundles/source.js. The build fails if an expected swap didn't happen,
// or if a source bundle took a package from node_modules.
//
// Needs `npm ci` in ../bundles, for esbuild and the published packages, and a
// stdlib checkout at $STDLIB (default ~/stdlib), which is only read.

'use strict';

var path = require( 'path' );
var fs = require( 'fs' );
var crypto = require( 'crypto' );

var HERE = __dirname;
var ROOT = path.resolve( HERE, '..' );
var BUNDLES = path.join( ROOT, 'bundles' );
var STDLIB = process.env.STDLIB || path.join( process.env.HOME, 'stdlib' );
var SOURCE = path.join( STDLIB, 'lib', 'node_modules' );
var OUT = path.join( HERE, 'out' );
var esbuild = require( path.join( BUNDLES, 'node_modules', 'esbuild' ) );

var RE_INDEX = /@stdlib\/array[-/](buffer|uint8|uint16|uint32|float64)\/lib\/index\.js$/;
var RE_SUPPORT = /^@stdlib\/assert[-/]has-(arraybuffer|uint8array|uint16array|uint32array|float64array)-support$/;

// The hyphenated names driver.js, the printer and entry.js use, mapped to the source tree:
var SOURCE_ALIASES = {
	'@stdlib/math-base-special-erf': '@stdlib/math/base/special/erf',
	'@stdlib/math-base-special-ldexp': '@stdlib/math/base/special/ldexp',
	'@stdlib/array-uint8': '@stdlib/array/uint8',
	'@stdlib/array-uint16': '@stdlib/array/uint16',
	'@stdlib/array-uint32': '@stdlib/array/uint32',
	'@stdlib/array-float64': '@stdlib/array/float64'
};

function plugin( swapped, forced, hits ) {
	return {
		'name': 'polyfill-spike',
		'setup': function setup( build ) {
			if ( !swapped ) {
				return;
			}
			build.onResolve( { 'filter': /^\.\/polyfill\.js$/ }, function onPolyfill( args ) {
				var m = RE_INDEX.exec( args.importer.split( path.sep ).join( '/' ) );
				if ( !m ) {
					return null;
				}
				hits.swap[ m[ 1 ] ] = true;
				return { 'path': path.join( HERE, 'polyfills', m[ 1 ] + '.js' ) };
			});
			if ( !forced ) {
				return;
			}
			build.onResolve( { 'filter': RE_SUPPORT }, function onSupport( args ) {
				hits.force[ RE_SUPPORT.exec( args.path )[ 1 ] ] = true;
				return { 'path': path.join( HERE, 'force', 'no_support.js' ) };
			});
		}
	};
}

async function bundle( name, entry, from, swapped, forced ) {
	var outfile = path.join( OUT, name + '.js' );
	var hits = { 'swap': {}, 'force': {} };
	var inputs;
	var stray;
	var res;
	var txt;

	res = await esbuild.build({
		'entryPoints': [ entry ],
		'bundle': true,
		'format': 'iife',
		'target': 'es5',
		'logLevel': 'warning',
		'metafile': true,
		'outfile': outfile,
		'nodePaths': [ ( from === 'source' ) ? SOURCE : path.join( BUNDLES, 'node_modules' ) ],
		'alias': ( from === 'source' ) ? SOURCE_ALIASES : {},
		'plugins': [ plugin( swapped, forced, hits ) ]
	});
	inputs = Object.keys( res.metafile.inputs );
	if ( from === 'source' ) {
		stray = inputs.filter( function isStray( p ) {
			return /(^|\/)node_modules\/@stdlib\//.test( p ) && path.resolve( p ).indexOf( SOURCE ) !== 0;
		});
		if ( stray.length ) {
			throw new Error( name + ': resolved from node_modules, not ' + STDLIB + ': ' + stray[ 0 ] );
		}
	}
	txt = fs.readFileSync( outfile );
	console.log( '%s  %s bytes  %s  swapped: %s  forced: %s  @stdlib packages: %d',
		crypto.createHash( 'sha256' ).update( txt ).digest( 'hex' ),
		txt.length,
		path.relative( HERE, outfile ),
		Object.keys( hits.swap ).sort().join( ',' ) || 'none',
		Object.keys( hits.force ).sort().join( ',' ) || 'none',
		inputs.filter( function isMain( p ) {
			return /@stdlib\/.*\/lib\/(main|index)\.js$/.test( p );
		}).map( function dir( p ) {
			return path.dirname( p );
		}).filter( function uniq( p, i, arr ) {
			return arr.indexOf( p ) === i;
		}).length
	);
	return hits;
}

async function main() {
	var hits;
	var from;
	var i;
	var j;

	fs.mkdirSync( OUT, { 'recursive': true } );
	console.log( '# esbuild %s; node %s', esbuild.version, process.version );
	console.log( '# stdlib source: %s', STDLIB.replace( process.env.HOME, '~' ) );
	for ( i = 0; i < 2; i++ ) {
		from = [ 'npm', 'source' ][ i ];

		// The digest driver, behind entry.js:
		for ( j = 0; j < 2; j++ ) {
			hits = await bundle( from + '-' + [ 'natural', 'forced' ][ j ], path.join( HERE, 'entry.js' ), from, true, j === 1 );

			// The erf and ldexp load chain reaches four of the five; array/buffer isn't on it.
			[ 'uint8', 'uint16', 'uint32', 'float64' ].forEach( function check( t ) {
				if ( !hits.swap[ t ] ) {
					throw new Error( from + ': the ' + t + ' polyfill was not swapped in' );
				}
			});
		}
	}
	// The otto printer, from ../otto-elk, unchanged, from the published
	// packages: once with stdlib's stubs untouched, and once with the swap:
	await bundle( 'printer-npm-stubs', path.join( ROOT, 'otto-elk', 'otto-printer.js' ), 'npm', false, false );
	await bundle( 'printer-npm-natural', path.join( ROOT, 'otto-elk', 'otto-printer.js' ), 'npm', true, false );

	// The self-test has no stdlib in it:
	await bundle( 'selftest', path.join( HERE, 'test', 'selftest.js' ), 'npm', true, false );
}

main().catch( function onError( err ) {
	console.error( err.message );
	process.exit( 1 );
});
