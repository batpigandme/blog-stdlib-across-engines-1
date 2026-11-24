# integer-paths

> Captured results from an earlier run, not regenerated. This folder has no scripts.

stdlib's 8- and 16-bit integer work, on every engine that could load it. Three routes by which integer typed arrays reach stdlib's array and strided code ran on 4,096 elements, with the extremes of each type, on a Claude Code Cloud x86_64 VM on 22 October 2026. Every binary that completed gave the same output, byte for byte, and an independent check, which recomputes each output from the printed inputs with unbounded integers and ECMA-262's conversion rules, found every value as the specification requires. What differed between engines was whether the code loaded, not what it computed.

## Tier

c: results only.

## What was run

One bundle, `bundles/driver.js` in the run's own tree (its SHA-256 begins `3b34cd9b738fdeb4`), built from stdlib's repository at `8e3f446c4620` with esbuild 0.25.10 (`--bundle --format=iife --target=es5`). It isn't committed here; the transcript records its hash. It takes one package for each route:

1. **Dtype dispatch:** `@stdlib/math/strided/ops/add` and `mul`, where the typed array's own element store does the narrowing.
2. **A generic kernel with no arithmetic on the data:** `@stdlib/blas/ext/base/gsorthp`, comparisons and swaps only, on `Int16Array`, `Uint16Array`, and `Uint8Array`.
3. **stdlib's dtype-named integer arithmetic:** `@stdlib/number/uint16/base/mul` and `number/uint8/base/add`, applied through `@stdlib/strided/base/binary`. `uint16` multiplication goes through `Math.imul` where the engine has it, and stdlib's polyfill where it doesn't.

Each binary ran the bundle with its output on standard output, which was hashed and checked. Retries, each with one named change, followed the failures. Node.js also ran the packages unbundled, from the stdlib checkout.

## What the committed results show

**The bundle, unchanged:** 26 binaries ran it, and 22 completed with output `2117a64ea336`: d8 13.6.233, 14.1.146, 14.6.202, 15.4.8, and 15.8.32; SpiderMonkey 159.0b5 and 115.10.0; JavaScriptCore 324323 and WebKitGTK 2.52.6; XS 10.0.2; QuickJS-ng 0.17.0; QuickJS 2021-03-27; Hermes 0.13.0; GraalJS 25.0.3; Duktape 2.7.0; Boa 0.22; engine262; Node.js 22.22.0, 24.19.0, and 26.7.0; Bare 1.36.0; and txiki.js 26.6.0.

**The four that didn't complete, and their retries:**

| Binary | Unchanged | Retry, with one change | After the retry |
| --- | --- | --- | --- |
| MicroQuickJS, three builds | doesn't load: `TypeError: cannot read property 'call' of undefined` | shims for `Object.prototype.propertyIsEnumerable` and `isPrototypeOf`, which it lacks and the strided dispatch path calls | `2117a64ea336`, all three |
| JerryScript 3.0.0 | exit 10, out of memory at its default heap | N = 1,024 instead of 4,096 | `918752e38eeb`, the same as Node.js 26.7.0 at N = 1,024 |

**The same two gaps, closed in stdlib instead:** [`../mqjs-guard-spike/`](../mqjs-guard-spike/) is a sketch of two patches to stdlib's own files that let MicroQuickJS load the strided dispatch path with neither shim, and give the same output.

**`Math.imul` removed:** every engine has `Math.imul`, so stdlib's polyfill ran nowhere by default. With `Math.imul` removed before the bundle loads, Node.js 26.7.0 and Duktape 2.7.0 both gave `cdc6dd7c3eef`, which differs from `2117a64ea336` only in the line that reports which `imul` ran.

**Unbundled:** Node.js 22.22.0, 24.19.0, and 26.7.0 gave `2117a64ea336`, the same as the bundle. Bare 1.36.0 stopped with `MODULE_NOT_FOUND: Cannot find module 'path'`. txiki.js and the engine shells weren't run unbundled, since they can't resolve `require`.

**The independent check:** every completed run, retries included, has "15 of 15 lines correct". The transcript opens with a negative control, an output with one value changed, which the check rejects, so it can fail.

## Files

| File | What it is |
| --- | --- |
| [`2026-10-22-cloud-x86_64-integer-paths.results.txt`](./2026-10-22-cloud-x86_64-integer-paths.results.txt) | The run's transcript: the host, the bundle's hash, the check's negative control, every binary's exit status, line count, output hash, and verdict, the retries, the unbundled runs, the last error line of each failure, and the groups of identical output. |
| [`2026-10-22-cloud-x86_64-integer-paths-outputs.tar.xz`](./2026-10-22-cloud-x86_64-integer-paths-outputs.tar.xz) | Every binary's raw output, 74 files: `<name>.txt` for standard output and `<name>.err` for standard error, `direct-*` for the unbundled runs. |

## Changes from the run

- **The transcript:** the stdlib checkout's path, `/home/user/`, becomes `~/` (one line), and two references to documents outside this repository are cut in place, each marked `[cut: a note reference]`.
- **The outputs:** the same path becomes `~/` in `direct-bare-1.36.0.err`, the only file that had it. The files were then re-archived in sorted order; none was added, removed, or otherwise changed.
- **Left out:** the driver, the bundle, the check's own code, and the scripts that ran them, since this folder holds results only; and the same run's measurements of MicroQuickJS's bytecode and heap sizes, which are about cost, not agreement.
