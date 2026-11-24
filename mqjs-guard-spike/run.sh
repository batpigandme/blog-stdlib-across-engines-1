#!/usr/bin/env bash
#
# run.sh -- everything this folder measures, in order.
#
#   MQJS=/path/to/mqjs bash mqjs-guard-spike/run.sh > mqjs-guard-spike/YYYY-MM-DD-HOST-guard-spike.results.txt 2>&1
#
# The two patches in patches/ are applied at bundle time (build.js) or at test
# time (test/patched-require.js) to copies of stdlib's files. $STDLIB is only
# read, and its `git status` is printed before and after.
#
# Needs:
#   - $MQJS, a MicroQuickJS `mqjs` binary built from commit 6d4d7eb6b990
#     (git clone https://github.com/bellard/mquickjs, git checkout 6d4d7eb6b990,
#     make); where it sits in that checkout, the run records the commit
#   - Node.js 24.22.3 as `node` ($NODE overrides it)
#   - `npm ci` run in ../bundles, for esbuild 0.25.10 ($NPM_MODULES overrides
#     the node_modules it is taken from)
#   - Python 3, for the oracle
#   - a stdlib checkout at b64fd0cc2749 in $STDLIB (default ~/stdlib), with its
#     own dependencies installed, for its ESLint and its tests

set -u
HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
TILDE='~'
STDLIB="${STDLIB:-$HOME/stdlib}"
NODE="${NODE:-node}"
MQJS="${MQJS:?set MQJS to a MicroQuickJS mqjs binary, built from 6d4d7eb6b990}"
export NPM_MODULES="${NPM_MODULES:-$HERE/../bundles/node_modules}"
export STDLIB
IP_REF=2117a64ea336   # the integer-paths driver's output on 22 binaries; see ../integer-paths
D="$HERE/drivers"
T=out   # relative, so no path to this machine reaches the transcript
P1=patches/1-is-enumerable-property.patch
P1B=patches/1b-is-plain-object.patch
GOPN=shims/getownpropertynames.js

say() { printf '\n== %s\n' "$*"; }
sha() { shasum -a 256 "$@" | cut -d' ' -f1; }
build() { "$NODE" "$HERE/build.js" "$@" || { echo "!! build failed: $*"; exit 1; }; }

echo "# run.sh $( date '+%Y-%m-%dT%H:%M:%S%z' ); $( uname -srm ); macOS $( sw_vers -productVersion ) ($( sw_vers -buildVersion ))"
echo "# stdlib $( git -C "$STDLIB" rev-parse HEAD ) at ${STDLIB/#$HOME/$TILDE}; uncommitted changes there: $( git -C "$STDLIB" status --porcelain | wc -l | tr -d ' ' )"
command -v "$NODE" > /dev/null || { echo "!! MISSING node"; exit 1; }
[ -x "$MQJS" ] || { echo "!! MISSING the mqjs binary"; exit 1; }
"$NODE" -p '"# node " + process.version + " V8 " + process.versions.v8'
echo "# esbuild $( "$NODE" -p "require('$NPM_MODULES/esbuild').version" )"
echo "# mqjs sha256 $( sha "$MQJS" ), source tree at $( git -C "$( dirname "$MQJS" )" rev-parse HEAD 2>/dev/null || echo 'an unknown commit' )"
cd "$HERE" || exit 1
rm -rf "$T"; mkdir -p "$T"
echo "# folder files:"
for f in patches/*.patch shims/*.js build.js overlay.js test/*.js drivers/*; do
	printf '#   %s  %4s lines  %s\n' "$( sha "$f" | cut -c1-16 )" "$( wc -l < "$f" | tr -d ' ' )" "$f"
done

NS="$( mktemp -d )"
say "1. the patches: do they apply to stdlib at b64fd0cc (git apply --check, which writes nothing), and their size"
for p in patches/*.patch; do
	( cd "$STDLIB" && git apply --check "$HERE/$p" ) && ok=applies || ok='DOES NOT APPLY'
	printf '%-40s %s\n' "$p" "$ok"
	# --numstat outside any repository, so the paths aren't prefixed with this one's:
	( cd "$NS" && git apply --numstat "$HERE/$p" ) | awk '{ printf "    +%-3s -%-3s %s\n", $1, $2, $3 }'
	printf '    lines of code changed, comments and blank lines left out: +%s -%s\n' \
		"$( grep -E '^\+[^+]' "$p" | grep -cvE '^\+[[:space:]]*($|\*|/\*\*|//)' )" "$( grep -E '^-[^-]' "$p" | grep -cvE '^-[[:space:]]*($|\*|/\*\*|//)' )"
done
rmdir "$NS"

say "2. stdlib's own ESLint on each patched file (stdin, named as its stdlib path; nothing written), the original as control"
for spec in "$P1|lib/node_modules/@stdlib/assert/is-enumerable-property/lib/native.js" \
	"$P1|lib/node_modules/@stdlib/assert/is-enumerable-property/lib/polyfill.js" \
	"$P1B|lib/node_modules/@stdlib/assert/is-plain-object/lib/main.js"; do
	p="${spec%%|*}"; f="${spec##*|}"
	"$NODE" overlay.js "$p" "$f" > "$T/lint.js"
	echo "-- $f, as $( basename "$p" ) leaves it"
	( cd "$STDLIB" && "$NODE" node_modules/.bin/eslint --stdin --stdin-filename "$f" < "$HERE/$T/lint.js" 2>/dev/null ) | sed "s|$HOME|~|g"; echo "   eslint exit ${PIPESTATUS[0]}"
	if git -C "$STDLIB" cat-file -e "b64fd0cc:$f" 2>/dev/null; then
		( cd "$STDLIB" && git show "b64fd0cc:$f" | "$NODE" node_modules/.bin/eslint --stdin --stdin-filename "$f" 2>/dev/null ) | sed "s|$HOME|~|g"; echo "   original: eslint exit ${PIPESTATUS[0]}"
	else
		echo "   original: none (the patch creates this file)"
	fi
done
echo "(native.js's one error, if any, is stdlib/require-file-extensions failing to find ./polyfill.js on disk: the file exists only in the patch, which linting from stdin can't show it)"

say "3. MicroQuickJS: the built-ins in question"
"$MQJS" test/mqjs-probes.js; echo "exit $?"

say "4. MicroQuickJS: the integer-paths driver, from stdlib source, with the getOwnPropertyNames shim"
build "$T/ip-ref.js" "$D/driver.js" --banner "$GOPN"
"$NODE" "$T/ip-ref.js" > "$T/ip-ref.node.txt" 2>&1
echo "Node.js, unpatched: exit $?, $( wc -l < "$T/ip-ref.node.txt" | tr -d ' ' ) lines, $( sha "$T/ip-ref.node.txt" | cut -c1-12 ) $( [ "$( sha "$T/ip-ref.node.txt" | cut -c1-12 )" = "$IP_REF" ] && echo "(= $IP_REF, the digest ../integer-paths records)" || echo "!! not $IP_REF" )"
python3 "$D/oracle.py" < "$T/ip-ref.node.txt" | tail -1
# The oracle's own negative control: one changed value must be rejected.
awk 'NR == 9 { sub( /,[0-9]+,/, ",1,", $0 ) } { print }' "$T/ip-ref.node.txt" > "$T/ip-bad.txt"
python3 "$D/oracle.py" < "$T/ip-bad.txt" > "$T/ip-bad.oracle" 2>&1 && echo "!! oracle control FAILED: it accepted a changed value" || echo "oracle control ok: it rejects a changed value"
for v in "none|" "1|$P1" "1b|$P1B" "1+1b|$P1 $P1B"; do
	n="${v%%|*}"; ps="${v##*|}"
	echo
	# shellcheck disable=SC2086
	build "$T/ip-$n.js" "$D/driver.js" $ps --banner "$GOPN"
	"$MQJS" "$T/ip-$n.js" > "$T/ip-$n.mq.txt" 2>&1; rc=$?
	printf 'mqjs, patches %-5s exit %s, %s lines, %s; ' "$n" "$rc" "$( wc -l < "$T/ip-$n.mq.txt" | tr -d ' ' )" "$( sha "$T/ip-$n.mq.txt" | cut -c1-12 )"
	cmp -s "$T/ip-$n.mq.txt" "$T/ip-ref.node.txt" && echo "IDENTICAL to Node.js" || { echo "differs from Node.js; first error line:"; grep -m1 'Error' "$T/ip-$n.mq.txt" | sed $'s/\033\\[[0-9;]*m//g' | sed 's/^/     /'; }
	grep -q '^done$' "$T/ip-$n.mq.txt" && python3 "$D/oracle.py" < "$T/ip-$n.mq.txt" | tail -1 | sed 's/^/     /'
done
echo
echo "-- patches 1+1b without the getOwnPropertyNames shim, on mqjs, then on Node.js with the built-in deleted (for a stack)"
build "$T/ip-noshim.js" "$D/driver.js" "$P1" "$P1B"
"$MQJS" "$T/ip-noshim.js" 2>&1 | grep -m1 'Error' | sed $'s/\033\\[[0-9;]*m//g'; echo "exit ${PIPESTATUS[0]}"
printf 'delete Object.getOwnPropertyNames;\n' > "$T/del-gopn.js"
build "$T/ip-delgopn.js" "$D/driver.js" "$P1" "$P1B" --banner "$T/del-gopn.js"
"$NODE" "$T/ip-delgopn.js" 2>&1 | grep -m1 'TypeError'
sed -n 2,7p "$T/ip-delgopn.js" | cut -c1-110 | sed 's/^/   bundle: /'

say "5. MicroQuickJS: the ops-add-uint16 driver (one package, the strided dispatch path), unpatched and with 1+1b"
build "$T/ops-none.js" "$D/ops-add-uint16.js" --banner "$GOPN"
build "$T/ops-1-1b.js" "$D/ops-add-uint16.js" "$P1" "$P1B" --banner "$GOPN"
"$NODE" "$T/ops-none.js" > "$T/ops.node.txt" 2>&1
echo "Node.js, unpatched: $( tr '\n' ' ' < "$T/ops.node.txt" )"
for n in none 1-1b; do
	"$MQJS" "$T/ops-$n.js" > "$T/ops-$n.mq.txt" 2>&1; rc=$?
	printf 'mqjs, %-5s exit %s: %s  %s\n' "$n" "$rc" "$( sed $'s/\033\\[[0-9;]*m//g' < "$T/ops-$n.mq.txt" | tr '\n' ' ' )" "$( cmp -s "$T/ops-$n.mq.txt" "$T/ops.node.txt" && echo IDENTICAL to Node.js || echo differs )"
done

say "6. Node.js: patch 1's fallback against the built-in, with the built-in deleted before stdlib loads"
build "$T/iep.js" test/is-enumerable-property.js "$P1" --banner shims/no-property-is-enumerable.js
"$NODE" "$T/iep.js"; echo "exit $?"
echo "-- control, unpatched: the same deletion must stop stdlib loading"
build "$T/iep-unpatched.js" test/is-enumerable-property.js --banner shims/no-property-is-enumerable.js
"$NODE" "$T/iep-unpatched.js" 2>&1 | grep -m1 'Error'; echo "exit ${PIPESTATUS[0]}"

say "7. Node.js: stdlib's own tests for each patched package, from source (test/patched-require.js; nothing written)"
tally() { awk '/^# pass/ { p = $3 } /^# fail/ { f = $3 } END { printf "%s pass, %s fail", ( p == "" ) ? "-" : p, ( f == "" ) ? 0 : f }' "$1"; }
S="$STDLIB/lib/node_modules/@stdlib"
for spec in \
	"as is||assert/is-enumerable-property" \
	"1|$P1|assert/is-enumerable-property" \
	"1, built-in deleted|$P1|assert/is-enumerable-property|propertyIsEnumerable" \
	"none, built-in deleted (control)||assert/is-enumerable-property|propertyIsEnumerable" \
	"as is||assert/is-plain-object" \
	"1b|$P1B|assert/is-plain-object"; do
	IFS='|' read -r label ps pkg del <<< "$spec"
	for f in "$S/$pkg"/test/test*.js; do
		GUARD_PATCHES="$ps" GUARD_DELETE="$del" "$NODE" -r "$HERE/test/patched-require.js" "$f" > "$T/t.txt" 2>&1; rc=$?
		printf '%-30s %-34s %-26s %s\n' "$pkg" "$label" "$( basename "$f" )" "$( tally "$T/t.txt" ), exit $rc"
		grep -m2 'patched-require\|^not ok' "$T/t.txt" | cut -c1-150 | sed "s|$HERE/||g" | sed "s|$HOME|~|g" | sed 's/^/     /'
	done
done
echo '(a "patched file never loaded" line would mean a row ran unpatched code)'

say "8. stdlib checkout after the run"
echo "stdlib $( git -C "$STDLIB" rev-parse HEAD ); uncommitted changes there: $( git -C "$STDLIB" status --porcelain | wc -l | tr -d ' ' )"
