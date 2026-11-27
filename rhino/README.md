# rhino

> Captured results from earlier runs, not regenerated. This folder has no scripts.

Rhino at two builds, on stdlib's digest. The 2.0.0 snapshot at `7386aa0`, the build whose `Math.asinh( 1e300 )` returned `Infinity`, ran on a Linux x86_64 VM on 2 November 2026. [Rhino 1.9.2](https://repo1.maven.org/maven2/org/mozilla/rhino-all/1.9.2/), which fixed `asinh`, ran on an OrbStack aarch64 Linux VM on 22 November 2026. Both are NaN-equal to the reference on both bundles: `7386aa0` through a terminal, since piped output lost its last line there, and 1.9.2 both ways. stdlib never calls `Math.asinh`, so the fix couldn't change its digest. The fix itself is post 2's, in [`plainly-wrong/`](https://github.com/stdlib-js/blog-whose-maths-is-it-1/tree/69d9a01c08ebb2ef6995e98f9f10fe402d7ede15/plainly-wrong) in that post's repository.

## Tier

c: results only.

## What was run

Each build ran both bundles from [`../bundles/`](../bundles/) twice, once with its output piped to a file and once on a terminal, and the output was hashed both ways.

- **`7386aa0`:** the JavaScript engines zoo's build of 3 March 2026, a 2.0.0 snapshot, on OpenJDK 25.0.4.1, on a Linux x86_64 VM, 2 November 2026. Its rows are in [`../digest/`](../digest/)'s November run: `rhino`, piped, and `rhino-tty`, on a terminal with the JVM's warnings removed.
- **1.9.2:** `rhino-all-1.9.2.jar` from Maven Central, checked against Maven's SHA-1 and MD5, on OpenJDK 25.0.2 from conda-forge, in an Ubuntu 24.04 container on OrbStack on macOS arm64 (Apple M1 Pro), 22 November 2026. How the jar and the JVM got there is in [`../setup/`](../setup/).

## What the committed results show

| Build | Host | Piped | On a terminal |
| --- | --- | --- | --- |
| 2.0.0-SNAPSHOT at `7386aa0` | Linux, x86_64 VM | 4,053 lines and the JVM's warnings: the last line, `cases 4053`, is lost | NaN-equal, `d89e89a8c686d154…` |
| 1.9.2 | OrbStack, aarch64 Linux VM on macOS | NaN-equal, `d89e89a8c686d154…` | NaN-equal, `d89e89a8c686d154…` |

`d89e89a8…` is the reference with one line changed: the driver's signalling NaN, `ldexp fff797b7ad2f57d7 424`, canonicalized to `7ff8000000000000`. Both builds give it, on both bundles, and each run repeated identically.

## Files

| File | What it is |
| --- | --- |
| [`2026-11-22-orbstack-arm64-rhino-1.9.2.results.txt`](./2026-11-22-orbstack-arm64-rhino-1.9.2.results.txt) | Rhino 1.9.2: the JVM, the jar's SHA-256, and each bundle piped and on a terminal, with lines, last line, repeat, and both digests. |

## Changes from the run

None. The file is the transcript as the run wrote it.
