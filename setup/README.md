# setup

> Captured results from earlier runs, not regenerated. This folder has no scripts.

How the engines run on 22 November 2026 got onto the machine: the Mac, Docker, and the pinned container image, then Rhino 1.9.2, otto v0.5.1, and Elk, each checked against a published or saved hash. The runs that used them are in [`../rhino/`](../rhino/) and [`../otto-elk/`](../otto-elk/).

## Tier

c: results only.

## What the committed results show

- **The host:** macOS 26.7.3 on an Apple M1 Pro with 32 GiB; Docker 29.8.2, `linux/arm64`. Every Linux run is a Linux aarch64 container, Ubuntu 24.04.5, from `ubuntu:24.04@sha256:fe81560990fae86dc4743202b2cb4d3df98d0bcf949173cecef15ce1127ef852`, running natively on arm64.
- **The toolchain:** a frozen [pixi](https://github.com/prefix-dev/pixi/releases/tag/v0.83.0) 0.83.0 environment for the container, whose release tarball matched its published SHA-256. It supplies Go 1.24.7 and OpenJDK 25.0.2.
- **Rhino 1.9.2:** `rhino-all-1.9.2.jar` from Maven Central; its SHA-1 and MD5 match Maven's, and its manifest reads `Implementation-Version: 1.9.2`. SHA-256 `9b4fc23fdd7902beabd542099b6f590f05638dbbb054e9784f444982a6296493`, the same as an earlier download of 3 November 2026.
- **otto v0.5.1:** built with `go install github.com/robertkrimen/otto/otto@v0.5.1` on Go 1.24.7; `go version -m` lists the module and its two dependencies with their hashes. Binary SHA-256 `d229b5b4…`.
- **Elk:** the JavaScript engines zoo's arm64 build from its [`20260303` release](https://github.com/ivankra/javascript-zoo/releases/tag/20260303), revision `a9bb856`. Binary SHA-256 `71783fc2…f7a2`, which matches the hash in the zoo's own data for that build.

## Files

| File | What it is |
| --- | --- |
| [`2026-11-22-orbstack-host.results.txt`](./2026-11-22-orbstack-host.results.txt) | The Mac, Docker, the image pulled, the pixi workspace's hashes, and pixi's checked download. |
| [`2026-11-22-orbstack-arm64-setup.results.txt`](./2026-11-22-orbstack-arm64-setup.results.txt) | In the container: Rhino's jar and its checks, otto's build and its `go version -m`, and Elk's tarball and binary. |

## Changes from the runs

A line recording a working-tree commit removed from the host file; the container's paths shortened to start at `bin/`; and one cut in the setup file, marked in place with `[cut: …]`: the install of two ahead-of-time compilers for a run this repository doesn't include. An earlier attempt at the same setup failed when Docker couldn't create a mount point, and isn't included.
