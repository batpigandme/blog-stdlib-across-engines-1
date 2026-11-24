# stdlib across engines

> Source code for the blog post ["stdlib across engines"][post].

The post asks whether a library's maths can give the same answers on every JavaScript engine, and looks at stdlib across engines and runtimes. This repository holds the results behind its claims, one folder per claim, and a page that runs the same test in your own browser. The results were measured on macOS arm64, on Claude Code Cloud x86_64 VMs, and on OrbStack's aarch64 Linux VM on a Mac.

Each folder's README says what was run, on what, and when, and what the committed files show, so a folder can be read without running anything. Every version a README names links to a pinned source where one exists.

## How to use this repository

- **Most claim folders hold captured results,** copied from earlier runs with machine paths removed, and have no scripts. Each README lists any other change, and marks any cut in place.
- **[`otto-polyfill-spike/`](./otto-polyfill-spike/) and [`mqjs-guard-spike/`](./mqjs-guard-spike/) are sketches with scripts,** not stdlib code: each tries an approach, with the scripts to run it again and a transcript of a fresh run.
- **[`page/`](./page/) is the one thing to run.** It runs stdlib's `erf` and `ldexp` in your browser, on 4,053 inputs, and shows the output's digest beside the reference.
- **[`bundles/`](./bundles/) holds the inputs** every digest refers to, byte for byte.
- **[`ENGINES.md`](./ENGINES.md)** lists every engine, runtime, and tool, with its version, host, and how it got there.

A digest is the SHA-256 of a run's output lines, so equal digests mean equal bits on every line. "NaN-equal" means the digests match once every NaN is counted as NaN, whatever its bits: the inputs include a signalling NaN, which engines encode their own way.

## Index

| In the post | What it backs | Folder |
| --- | --- | --- |
| The table of engines | stdlib's digest on nineteen engines and the runtimes around them | [`digest/`](./digest/) |
| Node.js across release lines | stdlib's digest on Node.js 20 to the 27 alpha, on two hosts, beside `Math`'s own | [`node-lines/`](./node-lines/) |
| The browsers | the page that takes the digest in a browser | [`page/`](./page/) |
| Rhino before and after its fix | the same digest on the build with the `asinh` bug and on the fixed release | [`rhino/`](./rhino/) |
| Integer work | stdlib's 8- and 16-bit paths giving the same output on every engine that loads them | [`integer-paths/`](./integer-paths/) |
| otto and Elk | which programs run on each, and stdlib failing to load on otto | [`otto-elk/`](./otto-elk/) |
| Engines that can't run stdlib | Quanta and Porffor, each with its error | [`cant-run/`](./cant-run/) |
| Different subsets of the language | ES5 typed-array polyfills, swapped in at bundle time, with `erf` and `ldexp` loading on otto and giving the reference's digest NaN-equal | [`otto-polyfill-spike/`](./otto-polyfill-spike/) |
| Gaps that are stdlib's own | two patches to stdlib that let its strided dispatch path load on MicroQuickJS, where `integer-paths/` used engine shims | [`mqjs-guard-spike/`](./mqjs-guard-spike/) |
| Engines that stop early (scriptc) | scriptc 0.4.16 stopping on stdlib's `__defineGetter__` read, which is a deliberate guard, and the digest bit for bit with those reads moved into the fallback's function | [`scriptc/`](./scriptc/) |
| An older engine (lv5) | lv5, an ES5 engine in C++, built from source at a March 2015 commit and giving the reference digest on `npm.js` and `source.js` bit for bit, on two builds and two runs of each bundle | [`lv5/`](./lv5/) |

[`setup/`](./setup/) records how the engines run on 22 November 2026 got onto the machine.

## License

See [LICENSE][license].

## Copyright

Copyright © 2026. The Stdlib [Authors][stdlib-authors].

[post]: https://blog.stdlib.io/stdlib-across-engines/

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[license]: ./LICENSE
