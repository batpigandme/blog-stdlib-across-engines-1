# scriptc

> Captured results from earlier runs, not regenerated. This folder has no scripts.

[scriptc](https://scriptc.dev), an ahead-of-time compiler, on stdlib's digest. At [scriptc 0.4.16](https://www.npmjs.com/package/scriptc/v/0.4.16), the current release, on macOS arm64 on 23 November 2026, stdlib as published compiles, then stops at once on a read of `__defineGetter__` in its own `define-property` polyfill, which loads even where it isn't used. With the polyfill's four reads of `Object.prototype` moved from module scope into the polyfill's function, so that they run only when the polyfill is called, scriptc gives the reference digest bit for bit, on both bundles. A second form of the change, loading the polyfill only in the branch that uses it, gives the same result, but stdlib doesn't take it: a conditional `require` breaks the translation of stdlib's CommonJS into ES modules. Both changes were written for a test, and neither is a fix stdlib would take: the module-scope reads are deliberate, and the first change gives up the guard they provide (see [The change](#the-change)). scriptc 0.4.7, on Linux x86_64 on 2 November 2026, stopped on the same read; that case is under [History](#history).

## Tier

c: results only.

## What was run

- **The bundles:** stdlib's digest driver, the same `driver.js` as [`../bundles/`](../bundles/)'s, bundled again for this run, in six forms. Three come from the published packages, resolved from the same lock file as `../bundles/npm.js`, and three from stdlib's repository at `b64fd0cc`. Each comes unchanged (`none` in the excerpt), with the change below (`2b`), and with the conditional `require` (`2`), each applied at bundle time by an esbuild plugin, with stdlib's own files left untouched. These aren't byte-identical to the bundles in `../bundles/`; the excerpt gives each one's SHA-256 prefix and size.
- **scriptc 0.4.16,** from npm, `npm install scriptc@0.4.16`; the excerpt gives its binary's SHA-256. On macOS 26.7.3, arm64, with Apple clang 21.0.0 as the C compiler scriptc calls. Each bundle was compiled and the program run twice.
- **"Bits"** in the excerpt compares the SHA-256 of the first run's output with the reference digest, `0bf2fbde…b51`, and **"repeat"** compares the two runs' outputs byte for byte.

## The change

The polyfill's four reads of `Object.prototype` move from module scope into the polyfill's function, `defineProperty`, so they run only when it's called. Four lines go from module scope; inside the function, four declarations, a comment, and four assignments come in. The patch, as applied, in stdlib's repository paths; the same lines are in the published package's `utils-define-property/lib/polyfill.js`:

```diff
--- a/lib/node_modules/@stdlib/utils/define-property/lib/polyfill.js
+++ b/lib/node_modules/@stdlib/utils/define-property/lib/polyfill.js
@@ -29,10 +29,6 @@
 
 var objectProtoype = Object.prototype;
 var toStr = objectProtoype.toString;
-var defineGetter = objectProtoype.__defineGetter__;
-var defineSetter = objectProtoype.__defineSetter__;
-var lookupGetter = objectProtoype.__lookupGetter__;
-var lookupSetter = objectProtoype.__lookupSetter__;
 
 
 // MAIN //
@@ -69,11 +65,21 @@
 * // returns 'bar'
 */
 function defineProperty( obj, prop, descriptor ) {
+	var defineGetter;
+	var defineSetter;
+	var lookupGetter;
+	var lookupSetter;
 	var prototype;
 	var hasValue;
 	var hasGet;
 	var hasSet;
 
+	// Note: read on use rather than as the module loads, as some environments throw on reading these properties...
+	defineGetter = objectProtoype.__defineGetter__;
+	defineSetter = objectProtoype.__defineSetter__;
+	lookupGetter = objectProtoype.__lookupGetter__;
+	lookupSetter = objectProtoype.__lookupSetter__;
+
 	if ( typeof obj !== 'object' || obj === null || toStr.call( obj ) === '[object Array]' ) {
 		throw new TypeError( format( 'invalid argument. First argument must be an object. Value: `%s`.', obj ) );
 	}
```

scriptc has `Object.defineProperty`, so stdlib's support check picks the built-in, and the polyfill's function, where the reads now are, is never called. In stdlib's repository at `b64fd0cc`, the polyfill reads `__defineGetter__`, `__defineSetter__`, `__lookupGetter__`, and `__lookupSetter__` at module level ([`utils/define-property/lib/polyfill.js`, lines 32–35](https://github.com/stdlib-js/stdlib/blob/b64fd0cc2749bd6937d9ce55ec4555bad1d41e68/lib/node_modules/%40stdlib/utils/define-property/lib/polyfill.js#L32-L35)), and `index.js` requires it unconditionally ([line 43](https://github.com/stdlib-js/stdlib/blob/b64fd0cc2749bd6937d9ce55ec4555bad1d41e68/lib/node_modules/%40stdlib/utils/define-property/lib/index.js#L43)). That static `require` stays.

**The reads are deliberate.** Taken at module scope, they cache the accessors before other code can change `Object.prototype`, a guard against prototype pollution: a library that later replaces `Object.prototype.__defineGetter__` can't change what the polyfill calls. Moving the reads into the function gives that guard up, so this change shows what scriptc needs, not a fix stdlib would make.

### The form stdlib doesn't take

The other change, `2` in the excerpt, moves the `require` itself into the branch that uses the polyfill, so the polyfill never loads where the built-in exists. It gets past the read the same way, and its rows match `2b`'s. stdlib doesn't take it, because a `require` inside a branch breaks the translation of stdlib's CommonJS into ES modules:

```diff
--- a/lib/node_modules/@stdlib/utils/define-property/lib/index.js
+++ b/lib/node_modules/@stdlib/utils/define-property/lib/index.js
@@ -40,7 +40,6 @@
 
 var hasDefinePropertySupport = require( './has_define_property_support.js' );
 var builtin = require( './builtin.js' );
-var polyfill = require( './polyfill.js' );
 
 
 // MAIN //
@@ -49,7 +48,7 @@
 if ( hasDefinePropertySupport() ) {
 	defineProperty = builtin;
 } else {
-	defineProperty = polyfill;
+	defineProperty = require( './polyfill.js' ); // Note: the polyfill reads `__defineGetter__` et al. as it loads, so load it only where it is used
 }
 
 
```

## What the committed results show

| Bundle | As published (`none`) | With the change (`2b`) | With the conditional `require` (`2`) |
| --- | --- | --- | --- |
| Published packages | exit 1, one line: `Uncaught TypeError: scriptc: Object.prototype reflection and mutation are not supported yet [SC1090]` | exit 0, 4,054 lines, the reference digest bit for bit | the same as `2b` |
| Source at `b64fd0cc` | exit 1, the same one line | exit 0, 4,054 lines, the reference digest bit for bit | the same as `2b` |

Each run repeated identically. With either change, the output's last line is `cases 4053`, and the signalling-NaN row keeps its bits, so the match is bit for bit rather than NaN-equal.

## History

**scriptc 0.4.7, on Linux x86_64, 2 November 2026.** Given both bundles from [`../bundles/`](../bundles/), as in [`../digest/`](../digest/), scriptc 0.4.7, from npm, compiled the bundle with `scriptc.exe build`, then the compiled program stopped. Its row, `scriptc`, and its output, `npm-scriptc.txt`, are in that folder's November transcript and outputs archive, one line: `Uncaught TypeError: scriptc: Object.prototype reflection and mutation are not supported yet`.

Which line of the bundle causes it was found during the same run by narrowing it down, and recorded in prose, not captured as output: the first construct that throws is a read, `objectProtoype.__defineGetter__` (line 741 of [`../bundles/npm.js`](../bundles/npm.js)), at module level in `@stdlib/utils-define-property`'s polyfill, which runs on load even where the polyfill isn't used. `var p = Object.prototype; var g = p.__defineGetter__;` reproduces it.

## Files

| File | What it is |
| --- | --- |
| [`2026-11-23-macos-arm64-scriptc-0.4.16-excerpt.results.txt`](./2026-11-23-macos-arm64-scriptc-0.4.16-excerpt.results.txt) | An excerpt from the 23 November run: the host and clang, stdlib's commit, the four bundles' SHA-256 prefixes and sizes, scriptc 0.4.16's SHA-256, and, for each of the six bundles, the exit codes, line count, digest check, repeat check, and last line. |

## Changes from the run

The excerpt is copied with these changes and no others: a first line saying what it keeps; the run script's name cut from the header; and cuts, each marked in place, of the same run's scriptc 0.4.7 and 0.4.8 sections and of probe programs that aren't in this repository. An earlier copy of the excerpt also cut the `2b` bundles and rows; they're restored, unchanged. The 0.4.7 case under History moved here from [`../cant-run/`](../cant-run/), unchanged in substance.
