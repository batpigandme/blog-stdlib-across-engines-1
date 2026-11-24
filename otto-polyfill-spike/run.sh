#!/usr/bin/env bash
#
# run.sh -- everything this folder measures, in order.
#
#   bash otto-polyfill-spike/run.sh > otto-polyfill-spike/YYYY-MM-DD-HOST-polyfill-spike.results.txt 2>&1
#
# Needs:
#   - otto v0.5.1: go install github.com/robertkrimen/otto/otto@v0.5.1
#     ($OTTO overrides the default, $( go env GOPATH )/bin/otto)
#   - Node.js 24.22.3 as `node` ($NODE overrides it)
#   - `npm ci` run in ../bundles, for esbuild 0.25.10 and the published packages
#   - a stdlib checkout at b64fd0cc2749 in $STDLIB (default ~/stdlib), which is
#     only read
#
# The digests are taken as the page and ../bundles take them: the sha256 of the
# output, and of the output with every NaN bit pattern rewritten to one word
# (../bundles/nan-equal.awk). entry.js adds two lines that start with "# ";
# they are removed before hashing, and nothing driver.js prints starts that way.

set -u
TILDE='~'
HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT="$( cd "$HERE/.." && pwd )"
BUNDLES="$ROOT/bundles"
STDLIB="${STDLIB:-$HOME/stdlib}"
NODE="${NODE:-node}"
OTTO="${OTTO:-$( go env GOPATH )/bin/otto}"
REF=0bf2fbde5ee4eb09080013f91b970eae679c26e25e9fe2c35571e6fb62b59b51
REF_NAN=c17d8dbbbb4b1c76ccb8da017fd9c2b127d149e51690b8fe48e52c4f9b7b00bb
T="$HERE/out/run"
NOGLOBALS='var n = [ "ArrayBuffer", "SharedArrayBuffer", "DataView", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array" ]; var i; for ( i = 0; i < n.length; i++ ) { delete globalThis[ n[ i ] ]; } require( process.argv[ 1 ] );'

say() { printf '\n== %s\n' "$*"; }
sha() { shasum -a 256 "$@" | cut -d' ' -f1; }
nan_equal() { awk -f "$BUNDLES/nan-equal.awk"; }

# digest <label> <output file> <exit code>
digest() {
	local label="$1" f="$2" rc="$3" bits lax
	grep -v '^# ' "$f" > "$f.lines"
	bits="$( sha "$f.lines" )"
	lax="$( nan_equal < "$f.lines" | sha )"
	printf '%-34s exit %s  %s lines\n' "$label" "$rc" "$( wc -l < "$f.lines" | tr -d ' ' )"
	grep '^# ' "$f" | sed 's/^/     /'
	printf '     bits      %s  %s\n' "$bits" "$( [ "$bits" = "$REF" ] && echo 'IDENTICAL to the reference' || echo DIFFERS )"
	printf '     nan-equal %s  %s\n' "$lax" "$( [ "$lax" = "$REF_NAN" ] && echo 'IDENTICAL to the reference' || echo DIFFERS )"
	if [ "$bits" != "$REF" ]; then
		printf '     lines that differ from the reference: %s\n' "$( diff "$T/ref.txt" "$f.lines" | grep -c '^>' )"
		diff "$T/ref.txt" "$f.lines" | grep '^[<>]' | head -6 | cut -c1-160 | sed 's/^/       /'
	fi
}

echo "# run.sh $( date '+%Y-%m-%dT%H:%M:%S%z' ); $( uname -srm ); macOS $( sw_vers -productVersion ) ($( sw_vers -buildVersion ))"
echo "# stdlib $( git -C "$STDLIB" rev-parse HEAD ) at ${STDLIB/#$HOME/$TILDE}; uncommitted changes there: $( git -C "$STDLIB" status --porcelain | wc -l | tr -d ' ' )"
command -v "$NODE" > /dev/null || { echo "!! MISSING node"; exit 1; }
[ -x "$OTTO" ] || { echo "!! MISSING otto at ${OTTO/#$HOME/$TILDE}"; exit 1; }
"$NODE" -p '"# node " + process.version + " V8 " + process.versions.v8'
echo "# otto: ${OTTO/#$HOME/$TILDE}, sha256 $( sha "$OTTO" )"
go version -m "$OTTO" | sed -n '1,3p' | sed "s|$HOME|~|g" | sed 's/^/#   /'
rm -rf "$T"; mkdir -p "$T"
cd "$HERE" || exit 1
echo "# spike files:"
for f in polyfills/*.js polyfills/base/*.js force/no_support.js entry.js build.js test/*.js; do
	printf '#   %s  %4s lines  %s\n' "$( sha "$f" | cut -c1-16 )" "$( wc -l < "$f" | tr -d ' ' )" "$f"
done

say "1. build"
"$NODE" build.js || exit 1

say "2. the failure: the otto printer from ../otto-elk, with stdlib's stubs untouched, on otto"
echo "out/printer-npm-stubs.js sha256 $( sha out/printer-npm-stubs.js )"
"$OTTO" -underscore=false out/printer-npm-stubs.js > "$T/before.txt" 2>&1; echo "exit $?"
sed 's/^/   /' "$T/before.txt" | head -12

say "3. the polyfills' self-test"
echo "-- Node.js, the files as they are"
"$NODE" test/selftest.js; echo "exit $?"
echo "-- Node.js, bundled"
"$NODE" out/selftest.js; echo "exit $?"
echo "-- otto, bundled"
"$OTTO" -underscore=false out/selftest.js; echo "exit $?"

say "4. the same printer, bundled with the polyfills, on otto"
"$OTTO" -underscore=false out/printer-npm-natural.js; echo "exit $?"
echo "-- Node.js, the same bundle"
"$NODE" out/printer-npm-natural.js; echo "exit $?"

say "5. the digest"
"$NODE" "$BUNDLES/npm.js" > "$T/ref.txt" 2>&1
echo "reference: bundles/npm.js on Node.js, $( wc -l < "$T/ref.txt" | tr -d ' ' ) lines, $( sha "$T/ref.txt" ) $( [ "$( sha "$T/ref.txt" )" = "$REF" ] && echo '(the recorded reference)' || echo '!! NOT the recorded reference' )"
echo "recorded reference $REF; NaN-equal $REF_NAN"
for b in npm-natural npm-forced source-natural source-forced; do
	echo
	echo "-- out/$b.js, sha256 $( sha "out/$b.js" )"
	"$NODE" "out/$b.js" > "$T/$b.node.txt" 2>&1
	digest "node" "$T/$b.node.txt" "$?"
	"$NODE" -e "$NOGLOBALS" "./out/$b.js" > "$T/$b.node-noglobals.txt" 2>&1
	digest "node, typed-array globals removed" "$T/$b.node-noglobals.txt" "$?"
	for k in 1 2; do
		"$OTTO" -underscore=false "out/$b.js" > "$T/$b.otto$k.txt" 2>&1
		digest "otto, run $k" "$T/$b.otto$k.txt" "$?"
	done
	cmp -s "$T/$b.otto1.txt" "$T/$b.otto2.txt" && echo "     otto: repeat identical" || echo "     otto: REPEAT DIFFERS"
done

say "6. what otto has, and what a function's name is there (test/otto-probes.js, no stdlib)"
echo "-- otto"
"$OTTO" -underscore=false test/otto-probes.js; echo "exit $?"
echo "-- Node.js"
"$NODE" test/otto-probes.js; echo "exit $?"

echo
echo "# stdlib uncommitted changes after: $( git -C "$STDLIB" status --porcelain | wc -l | tr -d ' ' )"
