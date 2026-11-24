#!/usr/bin/env bash
#
# package-tests.sh -- run the tests of every stdlib package in the erf and
# ldexp bundle, from the source checkout, twice: as they are, and with the
# spike polyfills forced by force.js. Reports the files whose result changes.
#
#   bash test/package-tests.sh > YYYY-MM-DD-HOST-package-tests.results.txt 2>&1
#
# The package list is read from out/source-natural.js (run build.js first, as
# run.sh does), so it is the load chain the digest ran, not a guess. Each test
# file runs in its
# own Node.js process, as plain `node test/test.js`; native-addon tests
# (test*.native.js) are skipped, since the polyfills don't reach compiled code.
# Nothing is written to the checkout.

set -u
TILDE='~'
HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
STDLIB="${STDLIB:-$HOME/stdlib}"
NODE="${NODE:-node}"
T="$HERE/out/package-tests"
rm -rf "$T"; mkdir -p "$T"

echo "# package-tests.sh $( date '+%Y-%m-%dT%H:%M:%S%z' ); $( uname -srm )"
echo "# stdlib $( git -C "$STDLIB" rev-parse HEAD ) at ${STDLIB/#$HOME/$TILDE}; uncommitted changes there before: $( git -C "$STDLIB" status --porcelain | wc -l | tr -d ' ' )"
"$NODE" -p '"# node " + process.version'
echo "# $( shasum -a 256 "$HERE/out/source-natural.js" | cut -c1-16 )  out/source-natural.js"

PKGS="$( grep -oE '^  // [^ ]*lib/node_modules/@stdlib/[a-z0-9/-]+/lib/' "$HERE/out/source-natural.js" | sed -E 's|.*lib/node_modules/(@stdlib/.*)/lib/$|\1|' | sort -u )"
echo "# packages: $( printf '%s\n' "$PKGS" | wc -l | tr -d ' ' )"

# tally <tap output> -> "pass fail"
tally() { awk '/^# pass/ { p = $3 } /^# fail/ { f = $3 } END { printf "%s %s", ( p == "" ) ? "-" : p, ( f == "" ) ? 0 : f }' "$1"; }

printf '\n%-52s %-22s %-18s %-18s %s\n' package file 'as is (pass fail)' 'forced (pass fail)' verdict
changed=0; files=0
while read -r pkg; do
	for f in "$STDLIB/lib/node_modules/$pkg"/test/test*.js; do
		[ -f "$f" ] || continue
		case "$f" in *native.js ) continue ;; esac
		files=$(( files + 1 ))
		n="$( printf '%s' "$pkg/$( basename "$f" )" | tr '/@' '__' )"
		"$NODE" "$f" > "$T/$n.asis.txt" 2>&1; a=$?
		"$NODE" -r "$HERE/test/force.js" "$f" > "$T/$n.forced.txt" 2>&1; b=$?
		ta="$( tally "$T/$n.asis.txt" )"; tb="$( tally "$T/$n.forced.txt" )"
		if [ "$a" = "$b" ] && [ "$ta" = "$tb" ]; then v=same; else v=CHANGED; changed=$(( changed + 1 )); fi
		printf '%-52s %-22s %-18s %-18s %s\n' "$pkg" "$( basename "$f" )" "$ta (exit $a)" "$tb (exit $b)" "$v"
		if [ "$v" = CHANGED ]; then
			grep -E '^not ok|^    (operator|expected|actual|at):|Error' "$T/$n.forced.txt" | head -8 | cut -c1-200 | sed "s|$HOME|~|g" | sed 's/^/        /'
		fi
	done
done <<< "$PKGS"

echo
echo "# test files run: $files; changed by forcing the polyfills: $changed"
echo "# stdlib uncommitted changes after: $( git -C "$STDLIB" status --porcelain | wc -l | tr -d ' ' )"
