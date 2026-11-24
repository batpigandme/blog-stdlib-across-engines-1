// otto-probes.js -- the two direct probes behind README §4.1 and §4.3. Plain
// ES5 with no stdlib, run as it is on otto and on Node.js:
//
//   otto -underscore=false test/otto-probes.js
//   node test/otto-probes.js
//
// Part 1 asks whether the engine has what the polyfills are built on: accessor
// properties on an instance and on a prototype, the integer conversions, and
// exact doubling and halving at the ends of the double range. Part 2 asks what
// a function's `name` is and whether it can be redefined.

// -- Part 1: accessors, integer conversions, powers of two --

var o = {};
var store = [ 7 ];
Object.defineProperty( o, 0, {
	'configurable': false,
	'enumerable': true,
	'get': function get() { return store[ 0 ]; },
	'set': function set( v ) { store[ 0 ] = v & 0xff; }
});
o[ 0 ] = 513;
console.log( 'accessor', o[ 0 ], store[ 0 ], Object.keys( o ).length );
function F() { Object.defineProperty( this, 'length', { 'value': 3 } ); }
Object.defineProperty( F.prototype, 1, { 'get': function g() { return this.length * 2; }, 'set': function s( v ) { this.w = v; } } );
var f = new F();
f[ 1 ] = 9;
console.log( 'proto accessor', f[ 1 ], f.w, f.hasOwnProperty( 1 ) );
console.log( 'ints', ( -3.14 >>> 0 ) & 0xffff, 4294967295 >>> 0, ( 65537 >>> 0 ) & 0xffff, ( 0xdeadbeef >>> 24 ) );
console.log( 'pow', 1 / 0, 1 / -0, 5e-324 * 2, 5e-324 / 2, 8.98846567431158e307 * 2, 2.2250738585072014e-308 * 0.5 );
console.log( 'typeof', typeof Float64Array, typeof ArrayBuffer, typeof Object.freeze, typeof Object.create, typeof Array.isArray );
console.log( 'toString16', ( 4294967295 ).toString( 16 ), ( 0 ).toString( 16 ) );

// -- Part 2: a function's name --

function Foo() {}
console.log( 'name:', typeof Foo.name, JSON.stringify( Foo.name ), Foo.hasOwnProperty( 'name' ), JSON.stringify( Object.getOwnPropertyDescriptor( Foo, 'name' ) ) );
console.log( 'ctor name:', JSON.stringify( ( new Foo() ).constructor.name ), ( new Foo() ).constructor === Foo );
try { Object.defineProperty( Foo, 'name', { 'value': 'Bar' } ); console.log( 'defined', Foo.name ); } catch ( e ) { console.log( 'define threw:', e.message ); }
try { Object.defineProperty( Foo, 'BYTES', { 'value': 2 } ); console.log( 'other static ok', Foo.BYTES ); } catch ( e ) { console.log( 'define threw:', e.message ); }
console.log( 'toString:', String( Foo ) );
console.log( 'Object.prototype.toString:', Object.prototype.toString.call( new Foo() ) );
