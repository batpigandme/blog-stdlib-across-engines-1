// mqjs-probes.js -- what MicroQuickJS has of the built-ins the two patches touch,
// and how it treats enumerability, since patch 1's fallback rests on Object.keys.
var out = ( typeof print === 'function' ) ? print : console.log;
var P = Object.prototype;
var h = P.hasOwnProperty;
var o = {};
var k = [];
var p;
out( 'typeof propertyIsEnumerable ' + typeof P.propertyIsEnumerable );
out( 'typeof isPrototypeOf ' + typeof P.isPrototypeOf );
out( 'typeof Object.getOwnPropertyNames ' + typeof Object.getOwnPropertyNames );
out( 'typeof Object.getOwnPropertyDescriptor ' + typeof Object.getOwnPropertyDescriptor );
out( 'typeof Object( "beep" ) ' + typeof Object( 'beep' ) );
out( 'hasOwnProperty.call( "beep", "0" ) ' + h.call( 'beep', '0' ) );
Object.defineProperty( o, 'x', { 'value': 1, 'enumerable': false } );
o.y = 2;
out( 'Object.keys after defineProperty( o, "x", { enumerable: false } ) ' + JSON.stringify( Object.keys( o ) ) );
for ( p in o ) {
	k.push( p );
}
out( 'for-in on the same object ' + JSON.stringify( k ) );
