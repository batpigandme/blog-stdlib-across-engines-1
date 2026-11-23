# page

A page that runs stdlib's `erf` and `ldexp` on 4,053 inputs in the browser that opens it, and shows the digest of the output beside the reference. Equal digests mean equal bits on every line. It loads [`../bundles/npm.js`](../bundles/), unchanged, and runs it in that browser's own JavaScript engine; nothing is sent anywhere.

## What it shows

- **Two digests,** each the SHA-256 of the bundle's output lines, each followed by a newline:
  - **bit for bit,** against `0bf2fbde5ee4eb09080013f91b970eae679c26e25e9fe2c35571e6fb62b59b51`;
  - **NaN-equal,** with every NaN bit pattern rewritten to the word `NaN` first, by the same rule as [`../bundles/nan-equal.awk`](../bundles/nan-equal.awk), against `c17d8dbbbb4b1c76ccb8da017fd9c2b127d149e51690b8fe48e52c4f9b7b00bb`.

  The inputs include a signalling NaN, and engines encode that NaN their own way, so the NaN-equal digest is the one expected to match everywhere.

  Each digest gets a verdict. The NaN-equal one matches or differs. The bit-for-bit one matches, differs, or **differs only in how a NaN is encoded**, which the page says whenever the bit-for-bit digest differs and the NaN-equal one matches. That follows from the digests alone: if the NaN-equal digest matches, every line is the same once NaNs are rewritten, so the only lines that can differ in their bits are NaNs. Both references are from [Node.js 24.19.0](https://github.com/nodejs/node/releases/tag/v24.19.0) on a Claude Code Cloud x86_64 VM, 2 November 2026.
- **The line count and the last line,** which should be 4,054 and `cases 4053`.
- **`navigator.userAgent`:** what the browser reports about itself. It's a record, not a version check; a browser's version is read from the browser itself.
- **A plain-text record** of all of it, with the date, the SHA-256 of the bundle file as fetched, and the page's own URL.

## Three browsers, 23 November 2026

Results only: recorded by opening the page in each browser, on macOS 26.7.3 (25G342), on an Apple M1 Pro. The page was served from this repository with `python3 -m http.server`, at `http://localhost:8080/page/`. Each browser's version is from the browser itself, not from its user agent.

| Browser | Version | Engine | Bit for bit | NaN-equal |
| --- | --- | --- | --- | --- |
| Chrome | 158.0.8127.37 (Official Build) (arm64) | V8 15.8.62.31 | matches the reference | matches the reference |
| Firefox | 160.0.1 (aarch64) | SpiderMonkey | `d89e89a8…`: differs only in how a NaN is encoded | matches the reference |
| Safari | 27.2 (21625.2.8.18.4) | JavaScriptCore | `d89e89a8…`: differs only in how a NaN is encoded | matches the reference |

`d89e89a8…` is the reference with one line changed: the driver's signalling NaN, `ldexp fff797b7ad2f57d7 424`, stored as `7ff8000000000000`. The same digest came from SpiderMonkey's and JavaScriptCore's own shells on 21 October 2026, in [`../digest/`](../digest/). So all three browsers give stdlib's results, and Chrome keeps the signalling NaN's bits too.

Each browser's record, as the page printed it:

```text
date          2026-11-23T14:23:18.213Z
bundle        bundles/npm.js, sha256 4aaee0922ebe97e0512703668f2c3196f118cebb2a387d927eba889ef3415b46
lines         4054, last: cases 4053
bit for bit   0bf2fbde5ee4eb09080013f91b970eae679c26e25e9fe2c35571e6fb62b59b51  matches the reference
NaN-equal     c17d8dbbbb4b1c76ccb8da017fd9c2b127d149e51690b8fe48e52c4f9b7b00bb  matches the reference
user agent    Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/158.0.0.0 Safari/537.36
page          http://localhost:8080/page/
```

```text
date          2026-11-23T14:24:15.907Z
bundle        bundles/npm.js, sha256 4aaee0922ebe97e0512703668f2c3196f118cebb2a387d927eba889ef3415b46
lines         4054, last: cases 4053
bit for bit   d89e89a8c686d15446d1c951d2ece7c49bf77c8b5dfe453d4138478aefd66544  DIFFERS from the reference
NaN-equal     c17d8dbbbb4b1c76ccb8da017fd9c2b127d149e51690b8fe48e52c4f9b7b00bb  matches the reference
user agent    Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:160.0) Gecko/20100101 Firefox/160.0
page          http://localhost:8080/page/
```

```text
date          2026-11-23T14:27:31.602Z
bundle        bundles/npm.js, sha256 4aaee0922ebe97e0512703668f2c3196f118cebb2a387d927eba889ef3415b46
lines         4054, last: cases 4053
bit for bit   d89e89a8c686d15446d1c951d2ece7c49bf77c8b5dfe453d4138478aefd66544  differs only in how a NaN is encoded
NaN-equal     c17d8dbbbb4b1c76ccb8da017fd9c2b127d149e51690b8fe48e52c4f9b7b00bb  matches the reference
user agent    Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/27.2 Safari/605.1.15
page          http://localhost:8080/page/
```

Firefox's record says "DIFFERS from the reference" because it was taken before the page's verdict wording changed, between the Firefox and Safari records. The wording is the only difference: the digests are computed the same way, and the NaN-equal digest, which matches, shows that only a NaN's encoding differs.

## How it runs the bundle

The driver prints with `print` when the host has one. In a browser the global `print` is `window.print`, which opens the print dialog, so the page runs the bundle's text as the body of a function whose own `print` parameter collects each line, and never touches the global. The bundle is ES5; the page's own script uses `fetch`, `async`, and `crypto.subtle`, which every browser it targets has.

`crypto.subtle` works only in a secure context: a page served over HTTPS, or from `localhost`. Opened as a file, the page says so and stops.

## Files

| File | What it is |
| --- | --- |
| [`index.html`](./index.html) | The page. |
| [`digest.js`](./digest.js) | Runs a bundle and computes both digests and the record. The page and the Node.js check both use it. |
| [`check-node.js`](./check-node.js) | Runs `digest.js` over `../bundles/npm.js` under Node.js, so a mismatch in a browser can't be the page's own code. |

## Running it yourself

From the repository's root, so the page can reach `../bundles/`:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

Then open `http://localhost:8080/page/`.

The check, from the repository's root:

```bash
node page/check-node.js
```

On 23 November 2026, on macOS arm64, it printed both reference digests under [Node.js 24.22.3](https://github.com/nodejs/node/releases/tag/v24.22.3), 20.20.2, and the 27.0.0 alpha. Under 26.13.1 the NaN-equal digest matched and the bit-for-bit one didn't, since that release's V8 quiets the signalling NaN. The page itself gave both reference digests in a Chromium-based browser served from `localhost` the same day.
