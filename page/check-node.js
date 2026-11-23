/**
* check-node.js -- the page's digest code, run under Node.js.
*
* Reads ../bundles/npm.js from disk and runs it through the same digest.js the
* page uses, and prints the same record. On Node.js 24.22.3 both digests match
* the reference, so a mismatch in a browser can't be this code's own bug. Also
* runs ../bundles/tan7.js the same way and prints its one line. Exits 0 when
* the NaN-equal digest matches, the one expected to match everywhere, and the
* tan( 7 ) line is well formed with stdlib's bits at 3febe2e6e13eea78. The
* host's own Math.tan( 7 ) is printed and not checked, since it is the thing
* that varies.
*
*   node page/check-node.js
*/
'use strict';

var fs = require( 'fs' );
var path = require( 'path' );
var webcrypto = require( 'crypto' ).webcrypto;
var d = require( './digest.js' );

// stdlib's tan( 7 ), as the bits of a double. It is built from operations
// ECMA-262 fixes exactly, so it is the same under every Node.js line.
var TAN7_STDLIB = '3febe2e6e13eea78';
var RE_TAN7 = /^tan\( 7 \) ([0-9a-f]{16}) (\S+) \| Math\.tan\( 7 \) ([0-9a-f]{16}) (\S+)$/;

/**
* Returns the bits of a double as 16 hex digits, high word first.
*
* @param {number} x - double
* @returns {string} bits
*/
function bits( x ) {
	var b = Buffer.alloc( 8 );
	b.writeDoubleBE( x, 0 );
	return b.toString( 'hex' );
}

/**
* Checks the line printed by ../bundles/tan7.js.
*
* @param {string} src - the bundle's text
* @returns {Object} the line, and whether it passed
*/
function checkTan7( src ) {
	var lines = d.run( src );
	var m = ( lines.length === 1 ) ? RE_TAN7.exec( lines[ 0 ] ) : null;
	var ok = false;
	var why = '';
	if ( lines.length !== 1 ) {
		why = 'expected one line, got ' + lines.length;
	} else if ( !m ) {
		why = 'the line is not in the expected form';
	} else if ( m[ 1 ] !== TAN7_STDLIB ) {
		why = 'stdlib\'s bits are ' + m[ 1 ] + ', not ' + TAN7_STDLIB;
	} else if ( bits( parseFloat( m[ 2 ] ) ) !== m[ 1 ] || bits( parseFloat( m[ 4 ] ) ) !== m[ 3 ] ) {
		why = 'a decimal does not parse back to the bits printed beside it';
	} else if ( m[ 3 ] !== bits( Math.tan( 7 ) ) ) {
		why = 'the bundle\'s Math.tan( 7 ) bits differ from this process\'s';
	} else {
		ok = true;
	}
	return {
		'line': lines.join( '\n' ),
		'ok': ok,
		'why': why
	};
}

var file = fs.readFileSync( path.join( __dirname, '..', 'bundles', 'npm.js' ) );
var bytes = file.buffer.slice( file.byteOffset, file.byteOffset + file.byteLength );
var tan7 = checkTan7( fs.readFileSync( path.join( __dirname, '..', 'bundles', 'tan7.js' ), 'utf8' ) );

d.digest( bytes, webcrypto.subtle ).then( function done( r ) {
	var host = 'Node.js ' + process.version + ', V8 ' + process.versions.v8 + ', ' + process.platform + ' ' + process.arch;
	console.log( d.report( r, 'host', host, new Date().toISOString() ) );
	console.log( 'tan7 bundle   ' + tan7.line + ( ( tan7.ok ) ? '' : '  FAILED: ' + tan7.why ) );
	process.exitCode = ( r.nanEqualMatch && tan7.ok ) ? 0 : 1;
});
