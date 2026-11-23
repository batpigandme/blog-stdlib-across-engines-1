# cant-run

> Captured results from earlier runs, not regenerated. This folder has no scripts.

Three engines that couldn't run stdlib's bundle, each for a reason of its own, measured on a Claude Code Cloud x86_64 VM on 2 November 2026. Quanta at `767a49f`: its parser hangs on stdlib's `new ctors[ 'uint16' ]( 1 )`, so the bundle never loads. Porffor 0.0.0-alpha.19, an ahead-of-time compiler: stdlib's `var UINT32_MAX` collides with the `<stdint.h>` macro in the C it generates, reproduced on an OrbStack aarch64 Linux VM on 3 November 2026. scriptc 0.4.7, ahead of time too: it compiles the bundle, then throws on the `define-property` polyfill's module-level read of `__defineGetter__`. Quanta's and Porffor's aren't filed upstream.

## Tier

c: results only.

## What was run

On 2 November 2026, on a Claude Code Cloud x86_64 VM, each engine was given both bundles from [`../bundles/`](../bundles/), as in [`../digest/`](../digest/). Their rows and raw outputs are in that folder's November transcript and its outputs archive, so they aren't copied here:

- **Quanta,** the JavaScript engines zoo's build at revision `767a49f`, release `20260303`. Rows `quanta`; outputs `npm-quanta.txt` and `source-quanta.txt`, each one line: `[unrun-stdlib-math: timed out after 120 s]`.
- **Porffor 0.0.0-alpha.19,** from npm, compiling with `porf native`, which generates C and compiles it with GCC 13. Rows `porffor`, and `porffor-run` for its default mode; outputs `npm-porffor.txt` and `npm-porffor-run.txt`, which hold the compiler's errors.
- **scriptc 0.4.7,** from npm, with `scriptc.exe build`, then the compiled program. Row `scriptc`; output `npm-scriptc.txt`, one line: `Uncaught TypeError: scriptc: Object.prototype reflection and mutation are not supported yet`.

On 3 November 2026, Porffor 0.0.0-alpha.19 ran again in an Ubuntu 24.04 container on OrbStack on macOS arm64, on a two-line program and on `npm.js`, with the container's GCC 13.3.0. That excerpt is the one file here.

## What the committed results show

**Porffor.** The C that Porffor generates keeps stdlib's variable name `UINT32_MAX` (bundle line 1020, `var UINT32_MAX = 4294967295;`), and `<stdint.h>` defines `UINT32_MAX` as a macro, so GCC stops: `error: expected identifier or '(' before numeric constant`, at the same generated line, 36867, on x86_64 and on arm64. The two-line program `var UINT32_MAX = 4294967295; console.log(UINT32_MAX);` fails the same way, and renamed `UINT32_MAXX` it compiles and prints `4294967295`. That rename is a diagnostic, not a result: no digest anywhere in this repository comes from a renamed bundle.

**Quanta and scriptc, as recorded during the run.** The outputs show the hang and the error. Which line of the bundle causes each was found during the same run by narrowing it down, and recorded in prose, not captured as output:

- **Quanta:** the first 1,465 lines of the bundle return at once, and 1,466 lines never do. Line 1466 is `uint16view = new ctors["uint16"](1);`, from `@stdlib/assert-is-little-endian`. The minimal case `var c = { u: Uint16Array }; var v = new c["u"](1);` hangs, even inside a function that is never called, so the hang is in parsing, not evaluation; `new c.u(1)` and `new (c["u"])(1)` both run.
- **scriptc:** the first construct that throws is a read, `objectProtoype.__defineGetter__` (bundle line 741), at module level in `@stdlib/utils-define-property`'s polyfill, which runs on load even where the polyfill isn't used. `var p = Object.prototype; var g = p.__defineGetter__;` reproduces it.

The bundle lines cited are lines of [`../bundles/npm.js`](../bundles/npm.js), so each can be checked there.

**Not here:** newer releases, Porffor 0.0.0-alpha.25 and scriptc 0.4.16, were tried on 22 November 2026 and gave no clear result in that environment. The versions given are the ones measured.

## Files

| File | What it is |
| --- | --- |
| [`2026-11-03-orbstack-arm64-porffor-excerpt.results.txt`](./2026-11-03-orbstack-arm64-porffor-excerpt.results.txt) | An excerpt from the 3 November run: Porffor on the two-line program, renamed, compiled from its generated C, and on `npm.js`, each twice. |

## Changes from the run

The excerpt is copied with these changes and no others: a first line saying what it keeps; the section heading shortened to name the case; container paths shortened to start at `bin/` or the environment's directory; and a reference to a notes document removed from one line.
