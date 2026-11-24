// A feasibility spike, not stdlib code: see ../README.md.

'use strict';

// MAIN //

/**
* Stands in for a `@stdlib/assert/has-*-support` check, so that a package picks its polyfill on an engine which has the built-in.
*
* @private
* @returns {boolean} always `false`
*/
function hasSupport() {
	return false;
}


// EXPORTS //

module.exports = hasSupport;
