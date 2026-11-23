# nan-equal.awk -- rewrite every float64 bit pattern that encodes a NaN to the
# word NaN, so outputs can be compared under "any NaN equals any NaN".
#
# A NaN is exponent all ones with a nonzero fraction, either sign: high hex
# digits 7ff or fff followed by thirteen digits that are not all zero. The
# infinities, 7ff0000000000000 and fff0000000000000, are left alone.
{
	for ( i = 1; i <= NF; i++ ) {
		if ( $i ~ /^[7f]ff[0-9a-f]{13}$/ && substr( $i, 4 ) != "0000000000000" ) {
			$i = "NaN";
		}
	}
	print
}
