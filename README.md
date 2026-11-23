# stdlib across engines

> Source code for the blog post ["stdlib across engines"][post].

The post asks whether a library's maths can give the same answers on every JavaScript engine, and looks at stdlib across engines and runtimes. This repository holds the results behind its claims, one folder per claim, and a page that runs the same test in your own browser. The results were measured on macOS arm64, on Claude Code Cloud x86_64 VMs, and on OrbStack's aarch64 Linux VM on a Mac.

Each folder's README says what was run, on what, and when, and what the committed files show, so a folder can be read without running anything. Every version a README names links to a pinned source where one exists.

## How to use this repository

- **The claim folders hold captured results,** copied from earlier runs with machine paths removed, and have no scripts. Each README lists any other change, and marks any cut in place.
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
| scriptc and stdlib's own gap | scriptc 0.4.16 stopping on stdlib's `__defineGetter__` read, and the digest bit for bit with one line changed | [`scriptc/`](./scriptc/) |

[`setup/`](./setup/) records how the engines run on 22 November 2026 got onto the machine.

## License

See [LICENSE][license].

## Copyright

Copyright © 2026. The Stdlib [Authors][stdlib-authors].

[post]: https://blog.stdlib.io/stdlib-across-engines/

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[license]: ./LICENSE
