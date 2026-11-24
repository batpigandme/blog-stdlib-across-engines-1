// is-enumerable-property.js -- with patch 1 bundled and the banner
// shims/no-property-is-enumerable.js, which saves the built-in as
// __builtinPropertyIsEnumerable and deletes it, compare
// @stdlib/assert/is-enumerable-property (now on the fallback) with the
// built-in on fixed cases. Node.js only: MicroQuickJS has no built-in to
// compare with. Prints one line per disagreement, then a count.

/* global __builtinPropertyIsEnumerable */
var isEnumerableProperty = require( '@stdlib/assert/is-enumerable-property' );

var out = ( typeof print === 'function' ) ? print : console.log;
var hidden = {};
Object.defineProperty( hidden, 'h', { 'value': 1, 'enumerable': false } );
hidden.v = 2;
function Foo() {
	this.own = 1;
}
Foo.prototype.inherited = 2;
var values = [ {}, { 'a': 1, 'toString': null }, [ 1, 2, 3 ], 'beep', '', 3.14, true, hidden, new Foo(), Foo, function noop() {}, Math, Object.prototype, /re/g, new Date( 0 ) ];
var props = [ 'a', 'toString', '0', '1', '3', 'length', 'h', 'v', 'own', 'inherited', 'prototype', 'name', 'PI', 'hasOwnProperty', 'lastIndex', 'source', 0, 1 ];
var n = 0;
var bad = 0;
var want;
var got;
var i;
var j;
out( 'built-in deleted: ' + ( typeof Object.prototype.propertyIsEnumerable === 'undefined' ) );
for ( i = 0; i < values.length; i++ ) {
	for ( j = 0; j < props.length; j++ ) {
		want = __builtinPropertyIsEnumerable.call( values[ i ], props[ j ] );
		got = isEnumerableProperty( values[ i ], props[ j ] );
		n += 1;
		if ( want !== got ) {
			bad += 1;
			out( 'DIFFERS: value ' + i + ', property ' + String( props[ j ] ) + ': built-in ' + want + ', fallback ' + got );
		}
	}
}
out( n + ' cases, ' + bad + ' disagreements' );
