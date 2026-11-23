# digest

> Captured results from earlier runs, not regenerated. This folder has no scripts.

stdlib's `erf` and `ldexp`, 4,053 inputs printed as bits, on every engine they ran on, against one reference digest: `0bf2fbde…b51`, from Node.js 24.19.0, and `c17d8dbb…0bb` when every NaN counts as NaN, whatever its bits. Measured on Claude Code Cloud x86_64 VMs on 21 October and 2 November 2026, and on macOS arm64 on 21 October 2026. Nineteen engines agree under NaN-equality. Some ran through a labelled variant that changes only how output is printed, never the driver or the bundles, and the table says which.

The bundles, the driver, and both reference digests in full are in [`../bundles/`](../bundles/).

## Claim

Every engine here that could run stdlib's bundle and print its output gives the same bits as the reference, except on one line, where some engines encode a signalling NaN their own way. Under NaN-equality, all nineteen agree on every line. The engines that couldn't run the bundle at all are in [`../otto-elk/`](../otto-elk/) and [`../cant-run/`](../cant-run/).

## Tier

c: results only.

## What was run

Each run fed both bundles, `npm.js` and `source.js`, to every engine's shell, took the SHA-256 of its output, and compared it line by line with a reference row from the same run:

- **21 October 2026, Claude Code Cloud x86_64 VM:** two runs, the second in a later container that added Boa and JavaScriptCore 324323. The reference row is d8 15.8.32, whose output is byte-identical to the reference digest above. Runtimes also ran `driver.js` directly from installed packages, without a bundle.
- **21 October 2026, macOS arm64 (Apple M1 Pro):** 24 binaries, against d8 15.8.32 on the same Mac. MicroQuickJS ran each bundle with one line prepended, a shim for `Object.getOwnPropertyNames`, which it doesn't have.
- **2 November 2026, Claude Code Cloud x86_64 VM:** engines that weren't in either October set, against Node.js 24.19.0 on the same VM, each run twice to check that the output repeats.

## What the committed results show

Each row gives the build, and the file and row name where its result is. "Bit for bit" means the output's SHA-256 equals the reference's; "NaN-equal" means it does once every NaN is rewritten as the word `NaN`. A bit-for-bit difference is always the same single line, `ldexp fff797b7ad2f57d7 424`, the signalling NaN, which an engine either keeps, canonicalizes to `7ff8000000000000`, or quiets to `ffff97b7ad2f57d7`.

| Engine | Build | Result | File, row |
| --- | --- | --- | --- |
| V8 | d8 15.8.32, from jsvu | bit for bit (the reference row) | October Cloud, `v8`; October Mac, `v8-15.8.32` |
| SpiderMonkey | 159.0b5, from jsvu; and 115.10.0, Ubuntu's | NaN-equal | October Cloud, `spidermonkey`, `spidermonkey115` |
| JavaScriptCore | WebKitGTK 2.52.6, Ubuntu's; and WebKit 324323, from jsvu | NaN-equal | October Cloud, `javascriptcore`, `jsc-324323` |
| XS | 10.0.2, from jsvu (it reports `XS 17.9.3`) | NaN-equal | October Cloud, `xs` |
| QuickJS-ng | 0.17.0, from jsvu | bit for bit | October Cloud, `quickjs-ng` |
| QuickJS | 2021-03-27, Ubuntu's | bit for bit | October Cloud, `quickjs` |
| Hermes | jsvu's `hermes-0.13.0`, which reports `0.12.0` | NaN-equal | October Cloud, `hermes` |
| GraalJS | 25.0.3, from jsvu | bit for bit | October Cloud, `graaljs` |
| Duktape | 2.7.0 | bit for bit | October Cloud, `duktape` |
| JerryScript | 3.0.0 | bit for bit | October Cloud, `jerryscript` |
| engine262 | npm `engine262@0.0.1-2d7d8d98`, on Node.js | NaN-equal | October Cloud, `engine262` |
| Boa | 0.22.0 | NaN-equal | October Cloud, second run, `boa` |
| MicroQuickJS | commit `6d4d7eb`, two builds, `mqjs` and `mqjs-soft` | bit for bit | October Mac, `mqjs`, `mqjs-soft` |
| Nova | the JavaScript engines zoo's build at `d85a2f8d` | bit for bit | November, `nova` |
| NJS | 0.9.6, the zoo's build at `aa8ff7d0` | bit for bit | November, `njs` |
| LibJS | the zoo's build at `e1ba577a`, with its own `--raw-strings --disable-ansi-colors` | NaN-equal | November, `libjs-raw` |
| Kiesel | 0.1.0-dev+20deb11f1, through the `kiesel-nibble` variant | NaN-equal | November, `kiesel-nibble` |
| Rhino | 2.0.0-SNAPSHOT, the zoo's build at `7386aa0`, through the `rhino-tty` variant | NaN-equal | November, `rhino-tty` |
| goja | commit `622d1007`, through the `goja-stderr` variant | NaN-equal | November, `goja-stderr` |

**Runtimes, the same engines inside:** Node.js 22.22.0, 24.19.0, and 26.7.0, and Bare 1.36.0 (V8 14.8), NaN-equal through bundles and directly; txiki.js 26.6.0 (QuickJS-ng 0.15.1), bit for bit through the bundles. txiki.js can't run `driver.js` directly, since it loads every script as an ES module (`ReferenceError: require is not defined`). Node.js across five release lines is in [`../node-lines/`](../node-lines/).

**The labelled variants** change how an engine's output reaches the file, never `driver.js` or the bundles, and each is a separate row beside the engine's own:

- **`libjs-raw`:** LibJS's own flags. Without them its shell prints every string in quotes, wrapped in a colour escape, even into a pipe.
- **`kiesel-nibble`:** both bundles with the driver's one `toString( 16 )` line replaced by a digit-by-digit conversion. The variant gave the reference digest on Node.js first. Kiesel's whole difference without it was in how it formats hex.
- **`goja-stderr`:** goja prints to stderr, with a timestamp; the variant reads stderr and removes the timestamp. Three lines then differ only in a NaN's payload, since goja's `NaN` is Go's, `7ff8000000000001`.
- **`rhino-tty`:** run on a terminal, with the JVM's warnings removed. Piped, this build loses its last line.

## Files

| File | What it is |
| --- | --- |
| [`2026-10-21-cloud-x86_64-shells.results.txt`](./2026-10-21-cloud-x86_64-shells.results.txt) | The first October Cloud run: versions, the bundled path, and the direct path. |
| [`2026-10-21-cloud-x86_64-shells-b.results.txt`](./2026-10-21-cloud-x86_64-shells-b.results.txt) | The second, adding Boa and JavaScriptCore 324323. |
| [`2026-10-21-macos-arm64-shells.results.txt`](./2026-10-21-macos-arm64-shells.results.txt) | The October Mac run, 24 binaries. |
| [`2026-11-02-cloud-x86_64-engines.results.txt`](./2026-11-02-cloud-x86_64-engines.results.txt) | The November Cloud run: each engine's digest, its repeat, and the variants. |
| [`2026-11-02-cloud-x86_64-engines-outputs.tar.xz`](./2026-11-02-cloud-x86_64-engines-outputs.tar.xz) | That run's raw outputs, 72 files: `ref-*` is Node.js 24.19.0's, then `npm-*` and `source-*` per engine, `.2` for the repeat. Extracted, `ref-npm.txt`, `npm-nova.txt`, and `npm-njs.txt` each hash to `0bf2fbde…b51`. |

## Changes from the runs

The transcripts are copied with these changes and no others: machine paths removed from binary paths; a line naming the notes repository's commit removed; two references to a notes section removed from the Elk rows; the Cloud VM's Java proxy settings shortened to `Picked up JAVA_TOOL_OPTIONS: […]`; and three cuts, each marked in place with `[cut: …]`. The October runs' timing steps and the November run's two sections on the engines' own `Math` functions are out of this repository's scope. Eight files in the outputs archive, Porffor's and Rhino's piped rows, had the same paths and proxy settings removed from their error text, so their SHA-256 may no longer equal the digest the transcript records for them.
