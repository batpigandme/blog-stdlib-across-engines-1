# node-lines

> Captured results from earlier runs, not regenerated, except the five macOS control outputs, which were regenerated (see below). This folder has no scripts.

stdlib's digest on one Node.js release per line, 20, 22, 24, 26, and the 27 alpha, on macOS arm64 and on a Linux x86_64 VM, 22 November 2026, with each release's `process.version` and `process.versions.v8` as the run printed them. stdlib's digest is NaN-equal to the reference on every release on both hosts, and bit-identical except on 26.13.1, whose V8 quiets the driver's one signalling NaN. Beside it, a control: the same releases' own `Math` functions on 7,820 cases, and `Math.tan( 7 )`. The control differs between releases, and between the two hosts at the same release.

## Tier

c: results only.

## What was run

On each host, each release ran by its full path from nvm, never through `nvm use`: both bundles from [`../bundles/`](../bundles/), twice each, then the control twice, then `Math.tan( 7 )`. The run printed each release's version strings from the release itself, each output's SHA-256, and whether it equals the reference. The control is one program that runs 24 `Math` functions on 7,820 cases and prints each input and result as bits, one per line, ending `cases 7820`.

- **macOS arm64:** macOS 26.7.3, Apple M1 Pro. All five releases from nvm 0.41.0.
- **Linux x86_64 VM:** Ubuntu 24.04.5, Intel Xeon @ 2.10GHz, glibc 2.39. The four stable releases from nvm 0.40.1 at `/usr/local/nvm`, and the alpha from nvm 0.41.0 at `/tmp/nvm041`, with `nvm install --only=alpha 27`, so the alpha has a file of its own.

## What the committed results show

| Node.js | V8 | stdlib on macOS arm64 | stdlib on Linux x86_64 | Control, macOS arm64 | Control, Linux x86_64 | `Math.tan( 7 )`, both hosts |
| --- | --- | --- | --- | --- | --- | --- |
| [v20.20.2](https://github.com/nodejs/node/releases/tag/v20.20.2) | 11.3.244.8-node.38 | bit for bit | bit for bit | `0a645665…` | `e8c99d9d…` | `3febe2e6e13eea78` |
| [v22.23.1](https://github.com/nodejs/node/releases/tag/v22.23.1) | 12.4.254.21-node.56 | bit for bit | bit for bit | `0a645665…` | `e8c99d9d…` | `3febe2e6e13eea78` |
| [v24.22.3](https://github.com/nodejs/node/releases/tag/v24.22.3) | 13.6.233.17-node.63 | bit for bit | bit for bit | `40c986c4…` | `0429ac9a…` | `3febe2e6e13eea78` |
| [v26.13.1](https://github.com/nodejs/node/releases/tag/v26.13.1) | 14.6.202.34-node.40 | NaN-equal | NaN-equal | `606a3ac0…` | `4fc3901b…` | `3febe2e6e13eea78` |
| v27.0.0-alpha.0.1.1 | 15.6.75.50-node.14 | bit for bit | bit for bit | `4057b733…` | `d5c2ea1a…` | `3febe2e6e13eea79` |

"Bit for bit" is `0bf2fbde…b51` on both bundles, and "NaN-equal" is `c17d8dbb…0bb` with the bit-for-bit digest differing. On 26.13.1 the one differing line is the driver's signalling NaN, `ldexp fff797b7ad2f57d7 424`, quieted to `ffff97b7ad2f57d7`. The control column gives the first eight hex digits of each control output's SHA-256.

**The control between releases, on each host.** 20 and 22 give the same control output; every later step changes it. From 26.13.1 to the 27 alpha, 446 lines change on macOS and 440 on the x86_64 VM. `Math.tan( 7 )` changes with the alpha on both, by one unit in the last place.

**The control between hosts, at the same release.** Counted by comparing the two hosts' files in [`controls/`](./controls/) line by line, where each line carries the same function and inputs, so only the result can differ:

- **20 to 26:** the same 23 lines on each release. 12 are values one unit in the last place apart: `tan` 5, `asin` 3, and `sin`, `acos`, `atanh`, and `log10` 1 each. 11 are NaNs whose sign bit differs: `sqrt` 5, and `sin`, `cos`, and `tan` of ±Infinity 2 each. The x86_64 VM gives `fff8000000000000` and macOS `7ff8000000000000`.
- **The 27 alpha:** 27 lines. 22 are values, `atan` 12 and `tanh` 10, all one unit apart except one line two units apart. 5 are `sqrt` NaNs.

These are differences between two hosts' outputs. The folder doesn't say which value is right, or why the hosts differ.

## Files

| File | What it is |
| --- | --- |
| [`2026-11-22-macos-arm64-node-lines.results.txt`](./2026-11-22-macos-arm64-node-lines.results.txt) | The macOS run: each release's binary and its SHA-256, version strings, both bundles' digests, the control's digest, `Math.tan( 7 )`, and which control lines differ from one release to the next. |
| [`2026-11-22-cloud-x86_64-fingerprint.results.txt`](./2026-11-22-cloud-x86_64-fingerprint.results.txt) | The x86_64 VM: kernel, distribution, glibc, CPU, compilers, and nvm. |
| [`2026-11-22-cloud-x86_64-node-lines.results.txt`](./2026-11-22-cloud-x86_64-node-lines.results.txt) | The x86_64 VM run of the four stable releases, in the same form as the macOS file. |
| [`2026-11-22-cloud-x86_64-node-lines-alpha.results.txt`](./2026-11-22-cloud-x86_64-node-lines-alpha.results.txt) | The x86_64 VM run of the alpha. Its first lines are nvm's own message from the shell's default nvm, which excludes alpha releases; the run that follows calls the alpha by its full path. |
| [`2026-11-22-cloud-x86_64-node-v26-v27.results.txt`](./2026-11-22-cloud-x86_64-node-v26-v27.results.txt) | The x86_64 VM control's lines that change from 26.13.1 to the alpha, since the two were installed under different nvm directories and the main run couldn't compare them. |
| [`controls/`](./controls/) | The ten control outputs, one per release per host, 7,821 lines each, as plain text so any two can be compared. |

**The five macOS control outputs were regenerated** on 22 November 2026, on the same Mac and the same binaries, because the macOS run kept only their digests. The first 16 hex digits of each file's SHA-256 match the digest that run recorded for its release. The x86_64 VM outputs are captured from that VM's run.

**One leftover in the run files.** Each release's control line reads "same as v24's on 2026-11-18" with yes or NO. That compares the output with an earlier macOS arm64 run of Node.js 24, not in this repository, so it reads yes only for macOS v24.22.3, and NO everywhere on the x86_64 VM, where a different host's output was never expected to match.

## Changes from the runs

The transcripts are copied with these changes and no others: the home directory in binary paths shortened to `~`, and a line recording a working-tree commit removed from each file.
