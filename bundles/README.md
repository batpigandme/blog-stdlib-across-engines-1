# bundles

The two bundles every digest in this repository refers to, byte for byte, and the driver they were built from. `npm.js` bundles the published packages [`@stdlib/math-base-special-erf` 0.2.6](https://www.npmjs.com/package/@stdlib/math-base-special-erf/v/0.2.6) and [`@stdlib/math-base-special-ldexp` 0.2.5](https://www.npmjs.com/package/@stdlib/math-base-special-ldexp/v/0.2.5). `source.js` bundles the same two functions from [stdlib's repository at `48e4ff7`](https://github.com/stdlib-js/stdlib/tree/48e4ff7ab1d498ddd9405570ac0ee2fb369fcfc4). Both print the same 4,054 lines: 4,053 inputs through `erf` and `ldexp`, each printed as the bits of a double, then a count. These bytes are what ran.

## Files

| File | What it is |
| --- | --- |
| [`driver.js`](./driver.js) | The program both bundles are built from: fixed edge cases and a sweep of generated inputs through `erf` and `ldexp`, each input and result printed as 16 hex digits, high word first. ES5 only, with no host APIs, so the same file runs on engine shells and runtimes alike. It prints with `print` where the host has one, and `console.log` otherwise. |
| [`npm.js`](./npm.js) | `driver.js` bundled with the published packages, as pinned in `package-lock.json`. sha256 `4aaee0922ebe97e0…` |
| [`source.js`](./source.js) | `driver.js` bundled with `erf` and `ldexp` from stdlib's repository at `48e4ff7`. sha256 `60845e945fa81fad…` |
| [`nan-equal.awk`](./nan-equal.awk) | Rewrites every NaN bit pattern to the word `NaN`, for comparing outputs when any NaN counts as equal to any other. The infinities are left alone. |
| [`package.json`](./package.json), [`package-lock.json`](./package-lock.json) | The pins: the two packages, `@stdlib/string-format` 0.2.3, and esbuild 0.25.10. |

## The two digests

A digest here is the SHA-256 of a bundle's output lines, each followed by a newline. Equal digests mean equal bits on every line.

- **Bit for bit:** `0bf2fbde5ee4eb09080013f91b970eae679c26e25e9fe2c35571e6fb62b59b51`
- **When every NaN counts as NaN,** after `nan-equal.awk`: `c17d8dbbbb4b1c76ccb8da017fd9c2b127d149e51690b8fe48e52c4f9b7b00bb`

Both are from [Node.js 24.19.0](https://github.com/nodejs/node/releases/tag/v24.19.0) on a Claude Code Cloud x86_64 VM, on 2 November 2026. One input, a signalling NaN that the driver stores into a `Float64Array`, is the reason for the second: engines encode that NaN their own way, so only the second digest is expected to match everywhere.

## How they were built

With [esbuild 0.25.10](https://github.com/evanw/esbuild/releases/tag/v0.25.10), after `npm ci`:

```bash
esbuild driver.js --bundle --format=iife --target=es5 --log-level=warning --outfile=npm.js
```

`--target=es5` makes esbuild refuse any syntax an ES5 engine couldn't parse, rather than emit it. `source.js` was built the same way, with each package name aliased to its path in a stdlib checkout at `48e4ff7`, for example `--alias:@stdlib/math-base-special-erf=@stdlib/math/base/special/erf`, resolved through `NODE_PATH`.

Rebuilding `npm.js` from these pins gives the same bytes: on 23 November 2026, `npm ci` and the command above on Node.js 24.22.3 and macOS arm64 produced a file identical to the one here.
