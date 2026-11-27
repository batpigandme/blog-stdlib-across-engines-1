# lv5

> Captured results from two runs, not regenerated. `probe.js` is the probe program's source, an input like the driver.

[Constellation/iv](https://github.com/Constellation/iv)'s lv5, an [ES5.1 engine](https://github.com/Constellation/iv/blob/64c3a9c7c517063f29d90d449180ea8f6f4d946f/README.mkd#L16) in C++, built from source on a Linux x86_64 VM on 23 November 2026, and built again from a fresh clone on 24 November. It builds both times, and its output on both digest bundles is the reference digest bit for bit.

## Claim

lv5 at `64c3a9c7c517063f29d90d449180ea8f6f4d946f` runs `bundles/npm.js` and `bundles/source.js` to the reference digest, `0bf2fbde5ee4eb09080013f91b970eae679c26e25e9fe2c35571e6fb62b59b51`, bit for bit, and so also to `c17d8dbb…0bb` under NaN-equality. It keeps the signalling NaN's bits, `fff797b7ad2f57d7`, as Node.js does (line 3382 of the output). The repeat on 24 November, a second build and two runs of each bundle, gave the same bytes every time, and the same bytes as Node.js 24.22.3 run on the same VM. So the 23 November result held on a rebuild, and the output repeats.

## Source

Cloned from `https://github.com/Constellation/iv`, `master`, on 23 November 2026 and again on 24 November, and not patched, checking out the commit named here. The commit built is `64c3a9c7c517063f29d90d449180ea8f6f4d946f`, authored 24 March 2015 ("Getter is called twice in railgun"). That is March 2015; the repository's last-push date on GitHub is later because it counts other branches, and no other branch was built.

## Host and build

Linux 6.18.44 x86_64, Ubuntu 24.04. GCC and G++ 13.3.0, cmake 3.28.3, `libgc-dev` 1:8.2.6-1build1, and `subversion`, from apt. Following `iv/lv5/README.mkd` needed two things it doesn't say, and no source change:

1. `cmake ..` fails without `subversion`: `tools/CMakeLists.txt` declares a SunSpider download from svn.webkit.org. `make lv5` doesn't run it.
2. The link fails with GCC 13 on `multiple definition of 'GC_jmp_buf'`: GCC 10 and later default to `-fno-common`, and the bundled Boehm GC relies on common symbols. Configuring with `-fcommon` fixes it.

```bash
apt-get install -y cmake libgc-dev subversion
git clone https://github.com/Constellation/iv && cd iv
mkdir out && cd out
CFLAGS=-fcommon CXXFLAGS=-fcommon cmake .. -Wno-dev
make lv5 -j4
```

The binary is `iv/lv5/lv5` (`out/iv/lv5/lv5` under the build directory), run as `lv5 file.js`. It was 158,435,952 bytes on 23 November and 158,436,728 on 24 November, a difference of 776 bytes between two builds of the same commit with the same flags. The cause wasn't investigated. The 24 November run's details, including the binary's SHA-256, are in [`2026-11-24-cloud-x86_64.results.txt`](./2026-11-24-cloud-x86_64.results.txt).

## Probe

[`probe.js`](./probe.js) prints `typeof` of each global. Its output on the 24 November build is in [`probe.lv5.output.txt`](./probe.lv5.output.txt):

```text
ArrayBuffer: function
Uint8Array: function
Uint16Array: function
Uint32Array: function
Float64Array: function
Map: function
Symbol: function
```

## Digest

On 24 November, `lv5 bundles/npm.js` and `lv5 bundles/source.js` each ran twice, and Node.js 24.22.3 (from `nvm install 24`, V8 13.6.233.17-node.63) ran each twice on the same VM. Every one of the eight runs exited 0, wrote nothing to stderr, and printed 4,054 lines whose SHA-256 is `0bf2fbde…b51`, and `c17d8dbb…0bb` through `nan-equal.awk`. `cmp` finds the two runs of each engine and bundle identical, and lv5's output identical to Node.js's. [`2026-11-24-cloud-x86_64.results.txt`](./2026-11-24-cloud-x86_64.results.txt) has every digest. [`npm.lv5.output.txt`](./npm.lv5.output.txt) is lv5's output on `npm.js`, from 23 November, and it is byte-identical to the 24 November runs; [`source.lv5.output.txt`](./source.lv5.output.txt) is its output on `source.js`.

The reference is this repository's recorded digest from Node.js 24.19.0, and Node.js 24.22.3 on the VM gives the same bytes, so the two agree.

## Not checked

Any driver but this one. Whether lv5's typed arrays and `Symbol` are complete, beyond what `probe.js` prints: it prints only `typeof`, and `function` doesn't mean the method set is whole. Other hosts or compilers: both builds were on this one VM image with GCC 13.3.0. Why the two binaries differ in size.
