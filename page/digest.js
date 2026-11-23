/**
* digest.js -- run a bundle from ../bundles/ and hash its output lines.
*
* Shared by the page (index.html) and by the Node.js check (check-node.js),
* so both compute the digests with the same code. Loaded as a classic script
* in a browser, where it defines `stdlibDigest`, and with `require` in Node.js.
*/
( function factory( root, main ) {
	'use strict';
	if ( typeof module === 'object' && module.exports ) {
		module.exports = main();
	} else {
		root.stdlibDigest = main();
	}
}( this, function main() {
	'use strict';

	// The reference: Node.js 24.19.0 on a Claude Code Cloud x86_64 VM, 2 November 2026.
	var REFERENCE = {
		'bits': '0bf2fbde5ee4eb09080013f91b970eae679c26e25e9fe2c35571e6fb62b59b51',
		'nanEqual': 'c17d8dbbbb4b1c76ccb8da017fd9c2b127d149e51690b8fe48e52c4f9b7b00bb'
	};

	// A float64 NaN, as 16 hex digits: exponent all ones (7ff or fff) and a
	// fraction that isn't zero. The same rule as ../bundles/nan-equal.awk.
	var RE_FLOAT64 = /^[7f]ff[0-9a-f]{13}$/;

	// What each verdict says in the record. "nan-only" follows from the two
	// digests alone: if the NaN-equal digest matches, every line is the same
	// once NaNs are rewritten, so a bit-for-bit difference can only be in how
	// a NaN is encoded.
	var VERDICTS = {
		'match': 'matches the reference',
		'nan-only': 'differs only in how a NaN is encoded',
		'differs': 'DIFFERS from the reference'
	};

	/**
	* Runs a bundle's text and returns the lines it prints.
	*
	* The driver prints with `print` when `typeof print === 'function'`. In a
	* browser, the global `print` is `window.print`, which opens the print
	* dialog, so the bundle runs as the body of a function whose own `print`
	* parameter collects each line instead. The global is never touched.
	*
	* @param {string} src - bundle source
	* @returns {Array<string>} printed lines
	*/
	function run( src ) {
		var lines = [];
		var bundle = new Function( 'print', src ); // eslint-disable-line no-new-func
		bundle( function collect( line ) {
			lines.push( String( line ) );
		});
		return lines;
	}

	/**
	* Rewrites every NaN bit pattern in a line to the word NaN.
	*
	* @param {string} line - output line
	* @returns {string} rewritten line
	*/
	function nanEqual( line ) {
		var fields = line.split( ' ' );
		var i;
		for ( i = 0; i < fields.length; i++ ) {
			if ( RE_FLOAT64.test( fields[ i ] ) && fields[ i ].slice( 3 ) !== '0000000000000' ) {
				fields[ i ] = 'NaN';
			}
		}
		return fields.join( ' ' );
	}

	/**
	* Returns the hex SHA-256 of bytes or of a string's UTF-8.
	*
	* @param {SubtleCrypto} subtle - Web Crypto API
	* @param {(ArrayBuffer|string)} data - input
	* @returns {Promise<string>} hex digest
	*/
	function sha256( subtle, data ) {
		var bytes = ( typeof data === 'string' ) ? new TextEncoder().encode( data ) : data;
		return subtle.digest( 'SHA-256', bytes ).then( function hex( buf ) {
			var out = '';
			var b = new Uint8Array( buf );
			var i;
			for ( i = 0; i < b.length; i++ ) {
				out += ( b[ i ] < 16 ) ? '0' + b[ i ].toString( 16 ) : b[ i ].toString( 16 );
			}
			return out;
		});
	}

	/**
	* Runs a bundle and hashes its output both ways.
	*
	* Each digest is SHA-256 over the lines, each followed by a newline, which
	* is how the reference was hashed.
	*
	* @param {ArrayBuffer} bytes - the bundle file's bytes
	* @param {SubtleCrypto} subtle - Web Crypto API
	* @returns {Promise<Object>} results
	*/
	function digest( bytes, subtle ) {
		var lines = run( new TextDecoder().decode( bytes ) );
		var text = lines.map( function nl( l ) {
			return l + '\n';
		}).join( '' );
		var eq = lines.map( function nl( l ) {
			return nanEqual( l ) + '\n';
		}).join( '' );
		return Promise.all( [ sha256( subtle, bytes ), sha256( subtle, text ), sha256( subtle, eq ) ] ).then( function done( h ) {
			var bitsMatch = ( h[ 1 ] === REFERENCE.bits );
			var nanEqualMatch = ( h[ 2 ] === REFERENCE.nanEqual );
			var bitsVerdict = 'differs';
			if ( bitsMatch ) {
				bitsVerdict = 'match';
			} else if ( nanEqualMatch ) {
				bitsVerdict = 'nan-only';
			}
			return {
				'bundle': h[ 0 ],
				'lines': lines.length,
				'last': lines[ lines.length - 1 ],
				'bits': h[ 1 ],
				'nanEqual': h[ 2 ],
				'bitsMatch': bitsMatch,
				'nanEqualMatch': nanEqualMatch,
				'bitsVerdict': bitsVerdict,
				'nanEqualVerdict': ( nanEqualMatch ) ? 'match' : 'differs'
			};
		});
	}

	/**
	* Formats results as the plain-text record the page shows.
	*
	* @param {Object} r - results from digest()
	* @param {string} hostLabel - "user agent" or "host"
	* @param {string} host - what the host reports about itself
	* @param {string} date - ISO 8601 date and time
	* @returns {string} record
	*/
	function report( r, hostLabel, host, date ) {
		return [
			'date          ' + date,
			'bundle        bundles/npm.js, sha256 ' + r.bundle,
			'lines         ' + r.lines + ', last: ' + r.last,
			'bit for bit   ' + r.bits + '  ' + VERDICTS[ r.bitsVerdict ],
			'NaN-equal     ' + r.nanEqual + '  ' + VERDICTS[ r.nanEqualVerdict ],
			pad( hostLabel ) + host
		].join( '\n' );
	}

	function pad( s ) {
		while ( s.length < 14 ) {
			s += ' ';
		}
		return s;
	}

	return {
		'REFERENCE': REFERENCE,
		'VERDICTS': VERDICTS,
		'run': run,
		'nanEqual': nanEqual,
		'digest': digest,
		'report': report
	};
}));
