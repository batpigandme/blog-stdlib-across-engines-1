# mqjs-guard-spike

> A sketch, not stdlib code, and not the fix stdlib would take: it tries an approach, and the patches were written for this test. Please don't copy it into stdlib.

On MicroQuickJS, stdlib's strided dispatch path fails to load: its feature detection calls `Object.prototype.propertyIsEnumerable` as a module loads, and the engine doesn't have it. This folder holds two small patches to stdlib's own files, applied at bundle time, and the run showing that with them the path loads and prints the same output as Node.js. It backs [stdlib-js/stdlib#16798](https://github.com/stdlib-js/stdlib/issues/16798).

Built against stdlib at [`b64fd0cc2749`](https://github.com/stdlib-js/stdlib/tree/b64fd0cc2749bd6937d9ce55ec4555bad1d41e68), with [MicroQuickJS](https://github.com/bellard/mquickjs) at [`6d4d7eb6b990`](https://github.com/bellard/mquickjs/tree/6d4d7eb6b99011d5aab6e88a9b99e8fd4d86c6e9). Run on macOS arm64 on 24 November 2026 with Node.js 24.22.3 and esbuild 0.25.10.

[`../integer-paths/`](../integer-paths/) reached the same output, `2117a64ea336`, with two shims in the engine for `propertyIsEnumerable` and `isPrototypeOf`. **Here the two gaps are closed by patches to stdlib instead,** with neither shim. One shim stays, for `Object.getOwnPropertyNames`, which esbuild's own wrapper calls.

## What it shows

- **[Patch 1](./patches/1-is-enumerable-property.patch)** gives `assert/is-enumerable-property` a fallback where the built-in is missing, built on `Object.keys`. **[Patch 1b](./patches/1b-is-plain-object.patch)** moves `assert/is-plain-object`'s `isPrototypeOf` test inside its cross-realm branch.
- **With both, the integer-paths driver loads on MicroQuickJS,** exits 0, and prints 23 lines identical to Node.js, digest `2117a64ea336`; a Python oracle accepts every line. The single-package `ops-add-uint16` driver does the same. Each patch alone still fails.
- **The fallback matches the built-in** over 270 cases on Node.js with the built-in deleted, and stdlib's own tests for both packages pass.
- **Not covered:** anything past these drivers' load paths, and any other engine that lacks these built-ins.

stdlib's `utils/define-property` polyfill also reads `Object.prototype`'s accessors as it loads, which stops scriptc. Those reads are a deliberate guard, so nothing here changes them; see [`../scriptc/`](../scriptc/).

## How to rerun

From the repository's root, with MicroQuickJS built outside it:

```bash
git clone https://github.com/bellard/mquickjs.git ~/mquickjs && git -C ~/mquickjs checkout 6d4d7eb6b990 && make -C ~/mquickjs
```

```bash
(cd bundles && npm ci --ignore-scripts)
```

```bash
git clone https://github.com/stdlib-js/stdlib.git ~/stdlib && git -C ~/stdlib checkout b64fd0cc2749
```

```bash
MQJS=~/mquickjs/mqjs bash mqjs-guard-spike/run.sh
```

`MQJS` must be an absolute path. The ESLint and test sections need the stdlib checkout's own dependencies installed. `$STDLIB` and `$NODE` point at other copies. Bundles go to `out/`, which git ignores, and the checkout is only read.

## Files

[`patches/`](./patches/) holds the two patches, applied by [`overlay.js`](./overlay.js) and [`build.js`](./build.js). [`drivers/`](./drivers/) holds the integer-paths driver and its oracle, and the single-package driver; [`test/`](./test/) the fallback check, the engine probes, and the hook that runs stdlib's tests against the patches. [`2026-11-24-macos-arm64-guard-spike.results.txt`](./2026-11-24-macos-arm64-guard-spike.results.txt) is the transcript of `run.sh`, as the script printed it.
