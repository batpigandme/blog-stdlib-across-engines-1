// entry.js -- run ../bundles/driver.js, unchanged, on an engine that may have
// no typed arrays.
//
// driver.js prints each float64's bits through a Float64Array of its own, from
// the global scope, so that the thing under test isn't also the instrument. On
// otto there is no such global and driver.js would fail before stdlib ran. So
// where the engine has none, this file first loads stdlib's four typed-array
// packages, which there resolve to the polyfills, and installs what they
// export as globals. Then it runs driver.js.
//
// That makes the instrument differ by engine, and the README says which rows
// had which:
//
//   Node.js                  native typed arrays print the bits
//   Node.js, globals removed the polyfills print the bits
//   otto                     the polyfills print the bits
//
// The four packages are loaded before the globals are set, so every
// `typeof Float64Array` check stdlib makes at load time has already run and
// found nothing. Not strict mode: `this` in the function below is the global
// object.

var Uint8ArrayCtor = require( '@stdlib/array-uint8' );
var Uint16ArrayCtor = require( '@stdlib/array-uint16' );
var Uint32ArrayCtor = require( '@stdlib/array-uint32' );
var Float64ArrayCtor = require( '@stdlib/array-float64' );

var out = ( typeof print === 'function' ) ? print : console.log;
var root = ( function getGlobal() {
	return this;
})();

if ( typeof Float64Array === 'function' ) {
	out( '# instrument: native typed arrays' );
} else {
	root.Uint8Array = Uint8ArrayCtor;
	root.Uint16Array = Uint16ArrayCtor;
	root.Uint32Array = Uint32ArrayCtor;
	root.Float64Array = Float64ArrayCtor;
	out( '# instrument: the polyfills, installed as globals' );
}
out( '# stdlib Float64Array: ' + ( ( String( Float64ArrayCtor ).indexOf( '[native code]' ) === -1 ) ? 'the polyfill' : 'native' ) );

require( './../bundles/driver.js' );
