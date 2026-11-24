# Engines

Every engine, runtime, and tool a result in this repository comes from: its version or commit, the host it ran on, how it got there, and the folder whose files show it. Hosts are macOS arm64 (Apple M1 Pro), Claude Code Cloud x86_64 VMs, and OrbStack's aarch64 Linux VM on that Mac. Each version is as the run printed or recorded it.

## Engines

The macOS arm64 run of 21 October also ran most of the October engines, some at older versions too; its file in `digest/` names each binary it ran. The Cloud x86_64 run of 22 October, in `integer-paths/`, ran the same Cloud engines and runtimes, plus d8 13.6.233, 14.1.146, 14.6.202, and 15.4.8 and three builds of MicroQuickJS; its transcript names each binary.

| Engine | Version or commit | Host, date | How it was obtained | Folder |
| --- | --- | --- | --- | --- |
| V8 (d8) | 15.8.32 | Cloud x86_64 and macOS arm64, 21 Oct 2026 | [jsvu](https://github.com/GoogleChromeLabs/jsvu) | `digest/` |
| SpiderMonkey | 159.0b5; 115.10.0 | Cloud x86_64, 21 Oct 2026 | jsvu; Ubuntu's package | `digest/` |
| JavaScriptCore | WebKitGTK 2.52.6; WebKit 324323 | Cloud x86_64, 21 Oct 2026 | Ubuntu's package; jsvu | `digest/` |
| XS | 10.0.2 (reports 17.9.3) | Cloud x86_64, 21 Oct 2026 | jsvu | `digest/` |
| QuickJS-ng | 0.17.0 | Cloud x86_64, 21 Oct 2026 | jsvu | `digest/` |
| QuickJS | 2021-03-27 | Cloud x86_64, 21 Oct 2026 | Ubuntu's package | `digest/` |
| Hermes | jsvu's 0.13.0 (reports 0.12.0) | Cloud x86_64, 21 Oct 2026 | jsvu | `digest/` |
| GraalJS | 25.0.3 | Cloud x86_64, 21 Oct 2026 | jsvu | `digest/` |
| Duktape | 2.7.0 | Cloud x86_64, 21 Oct 2026 | built from its release source | `digest/` |
| JerryScript | 3.0.0 | Cloud x86_64, 21 Oct 2026 | built from its release tag | `digest/` |
| engine262 | 0.0.1 at `2d7d8d98` | Cloud x86_64, 21 Oct 2026 | npm, on Node.js 22 | `digest/` |
| Boa | 0.22.0 | Cloud x86_64, 21 Oct 2026 | release binary | `digest/` |
| MicroQuickJS | `6d4d7eb`, two builds | macOS arm64, 21 Oct 2026 | built from source | `digest/` |
| MicroQuickJS | [`6d4d7eb6b990`](https://github.com/bellard/mquickjs/tree/6d4d7eb6b99011d5aab6e88a9b99e8fd4d86c6e9), one build | macOS arm64, built 21 Oct 2026, run 24 Nov 2026 | built from source | `mqjs-guard-spike/` |
| Nova | `d85a2f8d` | Cloud x86_64, 2 Nov 2026 | the [JavaScript engines zoo](https://github.com/ivankra/javascript-zoo/releases/tag/20260303), release `20260303` | `digest/` |
| NJS | 0.9.6, `aa8ff7d0` | Cloud x86_64, 2 Nov 2026 | the zoo, `20260303` | `digest/` |
| LibJS | `e1ba577a` | Cloud x86_64, 2 Nov 2026 | the zoo, `20260303` | `digest/` |
| Kiesel | 0.1.0-dev+20deb11f1 | Cloud x86_64, 2 Nov 2026 | the zoo, `20260303` | `digest/` |
| Rhino | 2.0.0-SNAPSHOT at `7386aa0`, on OpenJDK 25.0.4.1 | Cloud x86_64, 2 Nov 2026 | the zoo, `20260303` | `digest/`, `rhino/` |
| Rhino | [1.9.2](https://repo1.maven.org/maven2/org/mozilla/rhino-all/1.9.2/), on OpenJDK 25.0.2 | OrbStack aarch64, 22 Nov 2026 | Maven Central, checked against its sums | `rhino/`, `setup/` |
| goja | `622d1007`, Go 1.26.10 | Cloud x86_64, 2 Nov 2026 | `go install` | `digest/` |
| otto | [v0.5.1](https://github.com/robertkrimen/otto/tree/v0.5.1), Go 1.24.7; Go 1.27.4 on macOS | Cloud x86_64, 2 Nov 2026; OrbStack aarch64, 22 Nov 2026; macOS arm64, 23 and 24 Nov 2026 | `go install` | `otto-elk/`, `otto-polyfill-spike/`, `setup/` |
| Elk | [`a9bb856`](https://github.com/cesanta/elk/tree/a9bb85619c5cddf49dfa8bdf529770fc9943a7fd) | Cloud x86_64, 2 Nov 2026; OrbStack aarch64, 22 Nov 2026 | the zoo, `20260303`, checked against the zoo's hash | `otto-elk/`, `setup/` |
| Quanta | `767a49f` | Cloud x86_64, 2 Nov 2026 | the zoo, `20260303` | `cant-run/` |
| Porffor | 0.0.0-alpha.19 | Cloud x86_64, 2 Nov 2026; OrbStack aarch64, 3 Nov 2026 | npm | `cant-run/` |
| scriptc | 0.4.7; [0.4.16](https://www.npmjs.com/package/scriptc/v/0.4.16), with Apple clang 21.0.0 | Cloud x86_64, 2 Nov 2026; macOS arm64, 23 Nov 2026 | npm | `scriptc/` |
| lv5 | [`64c3a9c`](https://github.com/Constellation/iv/tree/64c3a9c7c517063f29d90d449180ea8f6f4d946f), GCC 13.3.0 | Cloud x86_64, 23 Nov 2026; one run, repeat pending | built from source, with `-fcommon` | `lv5/` |

## Runtimes

| Runtime | Version, and its engine | Host, date | How it was obtained | Folder |
| --- | --- | --- | --- | --- |
| Node.js | 22.22.0, 24.19.0, 26.7.0 | Cloud x86_64, 21 Oct 2026 | nvm | `digest/` |
| Node.js | 22.22.1, 24.19.0, 26.7.0, 26.12.0 | macOS arm64, 21 Oct 2026 | nvm | `digest/` |
| Node.js | 24.19.0, V8 13.6.233.17-node.51: the reference | Cloud x86_64, 2 Nov 2026 | nvm | `bundles/`, `digest/` |
| Node.js | 20.20.2, 22.23.1, 24.22.3, 26.13.1, 27.0.0-alpha.0.1.1 | macOS arm64 and Cloud x86_64, 22 Nov 2026 | nvm 0.41.0; on Cloud, nvm 0.40.1 for the four stable releases | `node-lines/` |
| Node.js | 24.22.3, V8 13.6.233.17-node.63 | macOS arm64, 24 Nov 2026 | nvm | `otto-polyfill-spike/`, `mqjs-guard-spike/` |
| Bare | 1.36.0, V8 14.8.178.31 | Cloud x86_64 and macOS arm64, 21 Oct 2026 | npm | `digest/` |
| txiki.js | 26.6.0, QuickJS-ng 0.15.1 | Cloud x86_64, 21 Oct 2026 | built from source | `digest/` |

## Tools

| Tool | Version | Used for |
| --- | --- | --- |
| esbuild | [0.25.10](https://github.com/evanw/esbuild/releases/tag/v0.25.10) | building the bundles, the otto printer, and the two spikes' bundles |
| pixi | [0.83.0](https://github.com/prefix-dev/pixi/releases/tag/v0.83.0) | the OrbStack container's Go and OpenJDK |
| Docker image | `ubuntu:24.04@sha256:fe81560990fae86dc4743202b2cb4d3df98d0bcf949173cecef15ce1127ef852` | every OrbStack run |
