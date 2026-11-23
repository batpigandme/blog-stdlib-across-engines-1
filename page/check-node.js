/**
* check-node.js -- the page's digest code, run under Node.js.
*
* Reads ../bundles/npm.js from disk and runs it through the same digest.js the
* page uses. On a conforming engine both digests match the reference, so a
* mismatch in a browser can't be this code's own bug.
*
*   node page/check-node.js
*/
'use strict';

var fs = require( 'fs' );
var path = require( 'path' );
var webcrypto = require( 'crypto' ).webcrypto;
var d = require( './digest.js' );

var file = fs.readFileSync( path.join( __dirname, '..', 'bundles', 'npm.js' ) );
var bytes = file.buffer.slice( file.byteOffset, file.byteOffset + file.byteLength );

d.digest( bytes, webcrypto.subtle ).then( function done( r ) {
	var host = 'Node.js ' + process.version + ', V8 ' + process.versions.v8 + ', ' + process.platform + ' ' + process.arch;
	console.log( d.report( r, 'host', host, new Date().toISOString() ) );
	process.exitCode = ( r.bitsMatch && r.nanEqualMatch ) ? 0 : 1;
});
