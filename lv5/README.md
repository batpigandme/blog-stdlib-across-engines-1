# lv5

> Captured result from one run, not regenerated. `probe.js` is the probe program's source, an input like the driver.

[Constellation/iv](https://github.com/Constellation/iv)'s lv5, an ES5 engine in C++, built from source on a Claude Code Cloud x86_64 VM on 23 November 2026, then run on the digest bundle. It builds, and its output on `bundles/npm.js` is the reference digest bit for bit.

## Claim

lv5 at `64c3a9c7c517063f29d90d449180ea8f6f4d946f` runs `bundles/npm.js` to the reference digest, `0bf2fbde5ee4eb09080013f91b970eae679c26e25e9fe2c35571e6fb62b59b51`, bit for bit, and so also to `c17d8dbb…0bb` under NaN-equality. It keeps the signalling NaN's bits, `fff797b7ad2f57d7`, as Node.js 24.19.0 does (line 3382 of the output). The run was single, and a repeat is pending. The same session also ran `bundles/source.js`, but its output isn't committed, so this folder makes no claim about it.

## Source

Cloned from `https://github.com/Constellation/iv`, `master`, 23 November 2026, and not patched. The commit built is `64c3a9c7c517063f29d90d449180ea8f6f4d946f`, authored 24 March 2015 ("Getter is called twice in railgun"). That is March 2015; the repository's last-push date on GitHub is later because it counts other branches, and no other branch was built.

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

The binary is `iv/lv5/lv5`, 158,435,952 bytes, run as `lv5 file.js`.

## Probe

[`probe.js`](./probe.js) prints `typeof` of each global, and printed:

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

`lv5 bundles/npm.js` exited 0 with nothing on stderr and printed 4,054 lines, whose SHA-256 is `0bf2fbde…b51`, bit for bit, and `c17d8dbbbb4b1c76ccb8da017fd9c2b127d149e51690b8fe48e52c4f9b7b00bb` through `nan-equal.awk`. [`npm.lv5.output.txt`](./npm.lv5.output.txt) is that output. The comparison is against this repository's recorded reference, not a Node.js run on the VM.

## Not checked

Repeatability: the run was single. Any driver but this one. Whether lv5's typed arrays and `Symbol` are complete, beyond `typeof`.
