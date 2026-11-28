# otto-elk

> Captured results from earlier runs, not regenerated. This folder has no scripts. `otto-printer.js` is the probe program's source, an input like the driver.

Two small engines that stdlib can't run on, for different reasons, and probes that show how far apart they are. [otto v0.5.1](https://github.com/robertkrimen/otto/tree/v0.5.1) targets ES5 and has no typed arrays; [Elk at `a9bb856`](https://github.com/cesanta/elk/tree/a9bb85619c5cddf49dfa8bdf529770fc9943a7fd) runs a subset with no `var`, `const`, arrays, or `new`. In a Linux aarch64 container on 22 November 2026, otto rejected `let`, Elk rejected `var`, and a program that declares no variable ran on both. Elk's rejection of `const` is from a Linux x86_64 VM on 2 November 2026, and otto's from macOS arm64 on 23 November 2026. A printer that prints `erf`'s results with `String( x )`, using no typed array itself, shows stdlib failing to load on otto, in its `Uint16Array` polyfill, before any maths runs.

## Tier

c: results only.

## What was run

- **The probes,** 22 November 2026, in a Linux aarch64 container, Ubuntu 24.04, on macOS arm64 (Apple M1 Pro), each run twice. How otto and Elk got there is in [`../setup/`](../setup/). Three one-line programs, exactly as run:
  - `var a = 1; console.log(a);`
  - `let a = 1; console.log(a);`
  - `console.log(1 + 2);`
- **The `const` probe,** 23 November 2026, on macOS 26.7.3 arm64 (Apple M1 Pro), with otto v0.5.1 installed by `go install` and built by go1.27.4. Four one-line programs, each its own file, run twice as `otto -underscore=false <file>`, exactly as run:
  - `const a = 1; console.log(a)`
  - `var a = 1; console.log(a)`, `let a = 1; console.log(a)`, and `console.log(1 + 2)`, as controls in the same run
- **The printer,** [`otto-printer.js`](./otto-printer.js): requires `@stdlib/math-base-special-erf` 0.2.6 and prints `erf` of eight inputs as decimal strings. It was bundled with esbuild 0.25.10 (`--bundle --format=iife --target=es5`) on macOS arm64, run once on Node.js 24.22.3 as a control, then run twice on otto in the container.
- **The 2 November smoke run,** on a Linux x86_64 VM: a typed-array probe on otto, and a list of one-line programs on Elk, of which this folder keeps an excerpt.

## What the committed results show

| Program | otto v0.5.1 | Elk at `a9bb856` |
| --- | --- | --- |
| `var a = 1; console.log(a);` | prints `1` | `Error: ERROR: 'var' not implemented` |
| `let a = 1; console.log(a);` | `Line 1:5 Unexpected identifier`, exit 64 | prints `1` |
| `const a = 1; console.log(a)` on otto (23 November); `const c = 1;` on Elk (2 November) | `Line 1:1 Unexpected reserved word`, exit 64 | `Error: ERROR: 'const' not implemented` |
| `console.log(1 + 2);` | prints `3` | prints `3` |

So no program that declares a variable with `var`, `let`, or `const` runs on both, and one that declares none does. On the Mac, otto's `var`, `let`, and `console.log(1 + 2)` controls gave the same results as in the container. Elk's other limits are in the excerpt: no `while`, no array literals, and no `Math` or `JSON`.

**otto and typed arrays.** On 2 November, `typeof` gave `undefined` for `Float64Array`, `Uint32Array`, `ArrayBuffer`, and `Math.fround` on otto, and `object` for `JSON`. The driver prints bits through a `Float64Array`, so it can't run on otto. The printer, which uses no typed array of its own, fails on otto with exit 64:

```text
Error: not implemented
    at polyfill (<anonymous>:1420:19)
    at isLittleEndian (<anonymous>:1466:26)
```

That's stdlib's `Uint16Array` polyfill, which throws "not implemented" ([`array/uint16/lib/polyfill.js` at `b64fd0cc`](https://github.com/stdlib-js/stdlib/blob/b64fd0cc2749bd6937d9ce55ec4555bad1d41e68/lib/node_modules/%40stdlib/array/uint16/lib/polyfill.js#L22-L31)). `@stdlib/assert-is-little-endian` reaches it when `erf` loads, on an engine without `Uint16Array`. stdlib fails on load there, before `erf` computes anything. On Node.js 24.22.3 the same bundle prints all eight results. A sketch of ES5 typed-array polyfills that let it load on otto is in [`../otto-polyfill-spike/`](../otto-polyfill-spike/).

## Files

| File | What it is |
| --- | --- |
| [`2026-11-22-orbstack-arm64-probes.results.txt`](./2026-11-22-orbstack-arm64-probes.results.txt) | The three probes on otto and Elk, each twice with exit codes, and the printer on otto. |
| [`2026-11-23-macos-arm64-otto-const.results.txt`](./2026-11-23-macos-arm64-otto-const.results.txt) | The `const` probe and its three controls on otto, each twice with exit codes, with the host, `go version`, and otto's build information. |
| [`2026-11-22-macos-arm64-printer-build.results.txt`](./2026-11-22-macos-arm64-printer-build.results.txt) | The printer's build: `npm ci`, esbuild's version, the bundle's SHA-256 and the packages in it, and its run on Node.js 24.22.3. |
| [`2026-11-02-cloud-x86_64-smoke-excerpt.results.txt`](./2026-11-02-cloud-x86_64-smoke-excerpt.results.txt) | An excerpt from the 2 November smoke run: otto's and Elk's versions, the typed-array probe on otto, and the one-line programs on Elk. |
| [`otto-printer.js`](./otto-printer.js) | The printer's source. |

## Changes from the runs

The 23 November `const` run is copied unchanged: its transcript already writes the home directory as `~`. The other transcripts are copied with these changes and no others: machine paths shortened, with the home directory as `~`; a line recording a working-tree commit removed from the build file; and in the excerpt, a first line saying what it keeps and a bracketed line giving the typed-array probe's source, which the run printed only as a section heading. **`otto-printer.js`'s header comment was rewritten** to remove its references to other documents; the code below it is unchanged. Its SHA-256 is therefore not the `cb3c1cde…` the build file records. Bundled again with esbuild 0.25.10 on 23 November 2026, it gives `6a48741a…`, the same bundle otto ran, since esbuild drops the comment.
