# otto-polyfill-spike

> A sketch, not stdlib code: it tries an approach, and isn't the implementation. The polyfills are plain scripts, the tests are plain scripts, and none of it is linted to stdlib's rules. Please don't copy it into stdlib.

stdlib's typed-array polyfills are stubs that throw "not implemented", which stops `@stdlib/math/base/special/erf` as it loads on [otto v0.5.1](https://github.com/robertkrimen/otto/tree/v0.5.1), an ES5 engine with no typed arrays (see [`../otto-elk/`](../otto-elk/)). This folder holds ES5 polyfills for `ArrayBuffer`, `Uint8Array`, `Uint16Array`, `Uint32Array`, and `Float64Array`, swapped in for the stubs at bundle time, and the runs that show the result. It backs [stdlib-js/stdlib#16795](https://github.com/stdlib-js/stdlib/issues/16795).

Built against stdlib at [`b64fd0cc2749`](https://github.com/stdlib-js/stdlib/tree/b64fd0cc2749bd6937d9ce55ec4555bad1d41e68) and the published packages pinned in [`../bundles/`](../bundles/). Run on macOS arm64 on 24 November 2026 with otto v0.5.1 (go1.27.4), Node.js 24.22.3, and esbuild 0.25.10.

## What it shows

- **`erf` and `ldexp` load on otto and match the reference NaN-equal on 4,053 inputs.** The digest is `c17d8dbb…`, on all four bundles (published packages and source, each with and without the polyfills forced on), each run twice. The otto printer from [`../otto-elk/`](../otto-elk/) stops with `Error: not implemented` without the polyfills, and prints `loaded` and eight values with them.
- **One line differs in bits,** the driver's signalling NaN, which comes out as `7ff8000000000000`: ES5 code can't observe a NaN's payload. The bit-for-bit digest is `d89e89a8…`, the one Firefox and Safari give in [`../page/`](../page/).
- **Forced on under Node.js, the polyfills are bit-identical to the reference,** `0bf2fbde…`, from the published packages and from source, with Node.js's own typed arrays printing the bits.
- **stdlib's own tests with the polyfills forced:** of 86 test files, 58 give the same tally and 28 change, for four stated reasons (the test asserts the stub, forcing replaces the package under test, `is-*array` doesn't recognize a polyfill instance, and a test-only dependency needs `Float32Array`).
- **What it leaves out:** every method but the basics, `Float32Array` and the other constructors, and every engine besides otto and Node.js.

## How to rerun

From the repository's root:

```bash
go install github.com/robertkrimen/otto/otto@v0.5.1
```

```bash
(cd bundles && npm ci --ignore-scripts)
```

```bash
git clone https://github.com/stdlib-js/stdlib.git ~/stdlib && git -C ~/stdlib checkout b64fd0cc2749
```

```bash
bash otto-polyfill-spike/run.sh
```

```bash
bash otto-polyfill-spike/test/package-tests.sh
```

The second script reads the bundle the first built. `$STDLIB`, `$OTTO`, and `$NODE` point at other copies. Bundles go to `out/`, which git ignores, and the stdlib checkout is only read.

## Files

[`polyfills/`](./polyfills/) holds the polyfills, [`build.js`](./build.js) swaps them in, and [`entry.js`](./entry.js) runs [`../bundles/driver.js`](../bundles/driver.js) unchanged. [`test/`](./test/) holds the self-test, the otto probes, and the runner for stdlib's own tests. The two `.results.txt` files are the transcripts of the commands above, as the scripts printed them.
