(function() {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = function(cb, mod) {
    return function __require() {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
  };

  // node_modules/@stdlib/assert-has-symbol-support/lib/main.js
  var require_main = __commonJS({
    "node_modules/@stdlib/assert-has-symbol-support/lib/main.js": function(exports, module) {
      "use strict";
      function hasSymbolSupport() {
        return typeof Symbol === "function" && typeof Symbol("foo") === "symbol";
      }
      module.exports = hasSymbolSupport;
    }
  });

  // node_modules/@stdlib/assert-has-symbol-support/lib/index.js
  var require_lib = __commonJS({
    "node_modules/@stdlib/assert-has-symbol-support/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/assert-has-tostringtag-support/lib/main.js
  var require_main2 = __commonJS({
    "node_modules/@stdlib/assert-has-tostringtag-support/lib/main.js": function(exports, module) {
      "use strict";
      var hasSymbols = require_lib();
      var FLG = hasSymbols();
      function hasToStringTagSupport() {
        return FLG && typeof Symbol.toStringTag === "symbol";
      }
      module.exports = hasToStringTagSupport;
    }
  });

  // node_modules/@stdlib/assert-has-tostringtag-support/lib/index.js
  var require_lib2 = __commonJS({
    "node_modules/@stdlib/assert-has-tostringtag-support/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main2();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/utils-native-class/lib/tostring.js
  var require_tostring = __commonJS({
    "node_modules/@stdlib/utils-native-class/lib/tostring.js": function(exports, module) {
      "use strict";
      var toStr = Object.prototype.toString;
      module.exports = toStr;
    }
  });

  // node_modules/@stdlib/utils-native-class/lib/main.js
  var require_main3 = __commonJS({
    "node_modules/@stdlib/utils-native-class/lib/main.js": function(exports, module) {
      "use strict";
      var toStr = require_tostring();
      function nativeClass(v) {
        return toStr.call(v);
      }
      module.exports = nativeClass;
    }
  });

  // node_modules/@stdlib/assert-has-own-property/lib/main.js
  var require_main4 = __commonJS({
    "node_modules/@stdlib/assert-has-own-property/lib/main.js": function(exports, module) {
      "use strict";
      var has = Object.prototype.hasOwnProperty;
      function hasOwnProp(value, property) {
        if (value === void 0 || value === null) {
          return false;
        }
        return has.call(value, property);
      }
      module.exports = hasOwnProp;
    }
  });

  // node_modules/@stdlib/assert-has-own-property/lib/index.js
  var require_lib3 = __commonJS({
    "node_modules/@stdlib/assert-has-own-property/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main4();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/symbol-ctor/lib/main.js
  var require_main5 = __commonJS({
    "node_modules/@stdlib/symbol-ctor/lib/main.js": function(exports, module) {
      "use strict";
      var Sym = typeof Symbol === "function" ? Symbol : void 0;
      module.exports = Sym;
    }
  });

  // node_modules/@stdlib/symbol-ctor/lib/index.js
  var require_lib4 = __commonJS({
    "node_modules/@stdlib/symbol-ctor/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main5();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/utils-native-class/lib/tostringtag.js
  var require_tostringtag = __commonJS({
    "node_modules/@stdlib/utils-native-class/lib/tostringtag.js": function(exports, module) {
      "use strict";
      var Symbol2 = require_lib4();
      var toStrTag = typeof Symbol2 === "function" ? Symbol2.toStringTag : "";
      module.exports = toStrTag;
    }
  });

  // node_modules/@stdlib/utils-native-class/lib/polyfill.js
  var require_polyfill = __commonJS({
    "node_modules/@stdlib/utils-native-class/lib/polyfill.js": function(exports, module) {
      "use strict";
      var hasOwnProp = require_lib3();
      var toStringTag = require_tostringtag();
      var toStr = require_tostring();
      function nativeClass(v) {
        var isOwn;
        var tag;
        var out2;
        if (v === null || v === void 0) {
          return toStr.call(v);
        }
        tag = v[toStringTag];
        isOwn = hasOwnProp(v, toStringTag);
        try {
          v[toStringTag] = void 0;
        } catch (err) {
          return toStr.call(v);
        }
        out2 = toStr.call(v);
        if (isOwn) {
          v[toStringTag] = tag;
        } else {
          delete v[toStringTag];
        }
        return out2;
      }
      module.exports = nativeClass;
    }
  });

  // node_modules/@stdlib/utils-native-class/lib/index.js
  var require_lib5 = __commonJS({
    "node_modules/@stdlib/utils-native-class/lib/index.js": function(exports, module) {
      "use strict";
      var hasToStringTag = require_lib2();
      var builtin = require_main3();
      var polyfill = require_polyfill();
      var main;
      if (hasToStringTag()) {
        main = polyfill;
      } else {
        main = builtin;
      }
      module.exports = main;
    }
  });

  // node_modules/@stdlib/assert-is-uint32array/lib/main.js
  var require_main6 = __commonJS({
    "node_modules/@stdlib/assert-is-uint32array/lib/main.js": function(exports, module) {
      "use strict";
      var nativeClass = require_lib5();
      var hasUint32Array = typeof Uint32Array === "function";
      function isUint32Array(value) {
        return hasUint32Array && value instanceof Uint32Array || // eslint-disable-line stdlib/require-globals
        nativeClass(value) === "[object Uint32Array]";
      }
      module.exports = isUint32Array;
    }
  });

  // node_modules/@stdlib/assert-is-uint32array/lib/index.js
  var require_lib6 = __commonJS({
    "node_modules/@stdlib/assert-is-uint32array/lib/index.js": function(exports, module) {
      "use strict";
      var isUint32Array = require_main6();
      module.exports = isUint32Array;
    }
  });

  // node_modules/@stdlib/constants-uint32-max/lib/index.js
  var require_lib7 = __commonJS({
    "node_modules/@stdlib/constants-uint32-max/lib/index.js": function(exports, module) {
      "use strict";
      var UINT32_MAX = 4294967295;
      module.exports = UINT32_MAX;
    }
  });

  // node_modules/@stdlib/assert-has-uint32array-support/lib/uint32array.js
  var require_uint32array = __commonJS({
    "node_modules/@stdlib/assert-has-uint32array-support/lib/uint32array.js": function(exports, module) {
      "use strict";
      var main = typeof Uint32Array === "function" ? Uint32Array : null;
      module.exports = main;
    }
  });

  // node_modules/@stdlib/assert-has-uint32array-support/lib/main.js
  var require_main7 = __commonJS({
    "node_modules/@stdlib/assert-has-uint32array-support/lib/main.js": function(exports, module) {
      "use strict";
      var isUint32Array = require_lib6();
      var UINT32_MAX = require_lib7();
      var GlobalUint32Array = require_uint32array();
      function hasUint32ArraySupport() {
        var bool;
        var arr;
        if (typeof GlobalUint32Array !== "function") {
          return false;
        }
        try {
          arr = [1, 3.14, -3.14, UINT32_MAX + 1, UINT32_MAX + 2];
          arr = new GlobalUint32Array(arr);
          bool = isUint32Array(arr) && arr[0] === 1 && arr[1] === 3 && // truncation
          arr[2] === UINT32_MAX - 2 && // truncation and wrap around
          arr[3] === 0 && // wrap around
          arr[4] === 1;
        } catch (err) {
          bool = false;
        }
        return bool;
      }
      module.exports = hasUint32ArraySupport;
    }
  });

  // node_modules/@stdlib/assert-has-uint32array-support/lib/index.js
  var require_lib8 = __commonJS({
    "node_modules/@stdlib/assert-has-uint32array-support/lib/index.js": function(exports, module) {
      "use strict";
      var hasUint32ArraySupport = require_main7();
      module.exports = hasUint32ArraySupport;
    }
  });

  // node_modules/@stdlib/array-uint32/lib/main.js
  var require_main8 = __commonJS({
    "node_modules/@stdlib/array-uint32/lib/main.js": function(exports, module) {
      "use strict";
      var ctor = typeof Uint32Array === "function" ? Uint32Array : void 0;
      module.exports = ctor;
    }
  });

  // node_modules/@stdlib/array-uint32/lib/polyfill.js
  var require_polyfill2 = __commonJS({
    "node_modules/@stdlib/array-uint32/lib/polyfill.js": function(exports, module) {
      "use strict";
      function polyfill() {
        throw new Error("not implemented");
      }
      module.exports = polyfill;
    }
  });

  // node_modules/@stdlib/array-uint32/lib/index.js
  var require_lib9 = __commonJS({
    "node_modules/@stdlib/array-uint32/lib/index.js": function(exports, module) {
      "use strict";
      var hasUint32ArraySupport = require_lib8();
      var builtin = require_main8();
      var polyfill = require_polyfill2();
      var ctor;
      if (hasUint32ArraySupport()) {
        ctor = builtin;
      } else {
        ctor = polyfill;
      }
      module.exports = ctor;
    }
  });

  // node_modules/@stdlib/assert-is-float64array/lib/main.js
  var require_main9 = __commonJS({
    "node_modules/@stdlib/assert-is-float64array/lib/main.js": function(exports, module) {
      "use strict";
      var nativeClass = require_lib5();
      var hasFloat64Array = typeof Float64Array === "function";
      function isFloat64Array(value) {
        return hasFloat64Array && value instanceof Float64Array || // eslint-disable-line stdlib/require-globals
        nativeClass(value) === "[object Float64Array]";
      }
      module.exports = isFloat64Array;
    }
  });

  // node_modules/@stdlib/assert-is-float64array/lib/index.js
  var require_lib10 = __commonJS({
    "node_modules/@stdlib/assert-is-float64array/lib/index.js": function(exports, module) {
      "use strict";
      var isFloat64Array = require_main9();
      module.exports = isFloat64Array;
    }
  });

  // node_modules/@stdlib/assert-has-float64array-support/lib/float64array.js
  var require_float64array = __commonJS({
    "node_modules/@stdlib/assert-has-float64array-support/lib/float64array.js": function(exports, module) {
      "use strict";
      var main = typeof Float64Array === "function" ? Float64Array : null;
      module.exports = main;
    }
  });

  // node_modules/@stdlib/assert-has-float64array-support/lib/main.js
  var require_main10 = __commonJS({
    "node_modules/@stdlib/assert-has-float64array-support/lib/main.js": function(exports, module) {
      "use strict";
      var isFloat64Array = require_lib10();
      var GlobalFloat64Array = require_float64array();
      function hasFloat64ArraySupport() {
        var bool;
        var arr;
        if (typeof GlobalFloat64Array !== "function") {
          return false;
        }
        try {
          arr = new GlobalFloat64Array([1, 3.14, -3.14, NaN]);
          bool = isFloat64Array(arr) && arr[0] === 1 && arr[1] === 3.14 && arr[2] === -3.14 && arr[3] !== arr[3];
        } catch (err) {
          bool = false;
        }
        return bool;
      }
      module.exports = hasFloat64ArraySupport;
    }
  });

  // node_modules/@stdlib/assert-has-float64array-support/lib/index.js
  var require_lib11 = __commonJS({
    "node_modules/@stdlib/assert-has-float64array-support/lib/index.js": function(exports, module) {
      "use strict";
      var hasFloat64ArraySupport = require_main10();
      module.exports = hasFloat64ArraySupport;
    }
  });

  // node_modules/@stdlib/array-float64/lib/main.js
  var require_main11 = __commonJS({
    "node_modules/@stdlib/array-float64/lib/main.js": function(exports, module) {
      "use strict";
      var ctor = typeof Float64Array === "function" ? Float64Array : void 0;
      module.exports = ctor;
    }
  });

  // node_modules/@stdlib/array-float64/lib/polyfill.js
  var require_polyfill3 = __commonJS({
    "node_modules/@stdlib/array-float64/lib/polyfill.js": function(exports, module) {
      "use strict";
      function polyfill() {
        throw new Error("not implemented");
      }
      module.exports = polyfill;
    }
  });

  // node_modules/@stdlib/array-float64/lib/index.js
  var require_lib12 = __commonJS({
    "node_modules/@stdlib/array-float64/lib/index.js": function(exports, module) {
      "use strict";
      var hasFloat64ArraySupport = require_lib11();
      var builtin = require_main11();
      var polyfill = require_polyfill3();
      var ctor;
      if (hasFloat64ArraySupport()) {
        ctor = builtin;
      } else {
        ctor = polyfill;
      }
      module.exports = ctor;
    }
  });

  // node_modules/@stdlib/assert-is-uint8array/lib/main.js
  var require_main12 = __commonJS({
    "node_modules/@stdlib/assert-is-uint8array/lib/main.js": function(exports, module) {
      "use strict";
      var nativeClass = require_lib5();
      var hasUint8Array = typeof Uint8Array === "function";
      function isUint8Array(value) {
        return hasUint8Array && value instanceof Uint8Array || // eslint-disable-line stdlib/require-globals
        nativeClass(value) === "[object Uint8Array]";
      }
      module.exports = isUint8Array;
    }
  });

  // node_modules/@stdlib/assert-is-uint8array/lib/index.js
  var require_lib13 = __commonJS({
    "node_modules/@stdlib/assert-is-uint8array/lib/index.js": function(exports, module) {
      "use strict";
      var isUint8Array = require_main12();
      module.exports = isUint8Array;
    }
  });

  // node_modules/@stdlib/constants-uint8-max/lib/index.js
  var require_lib14 = __commonJS({
    "node_modules/@stdlib/constants-uint8-max/lib/index.js": function(exports, module) {
      "use strict";
      var UINT8_MAX = 255 | 0;
      module.exports = UINT8_MAX;
    }
  });

  // node_modules/@stdlib/assert-has-uint8array-support/lib/uint8array.js
  var require_uint8array = __commonJS({
    "node_modules/@stdlib/assert-has-uint8array-support/lib/uint8array.js": function(exports, module) {
      "use strict";
      var main = typeof Uint8Array === "function" ? Uint8Array : null;
      module.exports = main;
    }
  });

  // node_modules/@stdlib/assert-has-uint8array-support/lib/main.js
  var require_main13 = __commonJS({
    "node_modules/@stdlib/assert-has-uint8array-support/lib/main.js": function(exports, module) {
      "use strict";
      var isUint8Array = require_lib13();
      var UINT8_MAX = require_lib14();
      var GlobalUint8Array = require_uint8array();
      function hasUint8ArraySupport() {
        var bool;
        var arr;
        if (typeof GlobalUint8Array !== "function") {
          return false;
        }
        try {
          arr = [1, 3.14, -3.14, UINT8_MAX + 1, UINT8_MAX + 2];
          arr = new GlobalUint8Array(arr);
          bool = isUint8Array(arr) && arr[0] === 1 && arr[1] === 3 && // truncation
          arr[2] === UINT8_MAX - 2 && // truncation and wrap around
          arr[3] === 0 && // wrap around
          arr[4] === 1;
        } catch (err) {
          bool = false;
        }
        return bool;
      }
      module.exports = hasUint8ArraySupport;
    }
  });

  // node_modules/@stdlib/assert-has-uint8array-support/lib/index.js
  var require_lib15 = __commonJS({
    "node_modules/@stdlib/assert-has-uint8array-support/lib/index.js": function(exports, module) {
      "use strict";
      var hasUint8ArraySupport = require_main13();
      module.exports = hasUint8ArraySupport;
    }
  });

  // node_modules/@stdlib/array-uint8/lib/main.js
  var require_main14 = __commonJS({
    "node_modules/@stdlib/array-uint8/lib/main.js": function(exports, module) {
      "use strict";
      var ctor = typeof Uint8Array === "function" ? Uint8Array : void 0;
      module.exports = ctor;
    }
  });

  // node_modules/@stdlib/array-uint8/lib/polyfill.js
  var require_polyfill4 = __commonJS({
    "node_modules/@stdlib/array-uint8/lib/polyfill.js": function(exports, module) {
      "use strict";
      function polyfill() {
        throw new Error("not implemented");
      }
      module.exports = polyfill;
    }
  });

  // node_modules/@stdlib/array-uint8/lib/index.js
  var require_lib16 = __commonJS({
    "node_modules/@stdlib/array-uint8/lib/index.js": function(exports, module) {
      "use strict";
      var hasUint8ArraySupport = require_lib15();
      var builtin = require_main14();
      var polyfill = require_polyfill4();
      var ctor;
      if (hasUint8ArraySupport()) {
        ctor = builtin;
      } else {
        ctor = polyfill;
      }
      module.exports = ctor;
    }
  });

  // node_modules/@stdlib/assert-is-uint16array/lib/main.js
  var require_main15 = __commonJS({
    "node_modules/@stdlib/assert-is-uint16array/lib/main.js": function(exports, module) {
      "use strict";
      var nativeClass = require_lib5();
      var hasUint16Array = typeof Uint16Array === "function";
      function isUint16Array(value) {
        return hasUint16Array && value instanceof Uint16Array || // eslint-disable-line stdlib/require-globals
        nativeClass(value) === "[object Uint16Array]";
      }
      module.exports = isUint16Array;
    }
  });

  // node_modules/@stdlib/assert-is-uint16array/lib/index.js
  var require_lib17 = __commonJS({
    "node_modules/@stdlib/assert-is-uint16array/lib/index.js": function(exports, module) {
      "use strict";
      var isUint16Array = require_main15();
      module.exports = isUint16Array;
    }
  });

  // node_modules/@stdlib/constants-uint16-max/lib/index.js
  var require_lib18 = __commonJS({
    "node_modules/@stdlib/constants-uint16-max/lib/index.js": function(exports, module) {
      "use strict";
      var UINT16_MAX = 65535 | 0;
      module.exports = UINT16_MAX;
    }
  });

  // node_modules/@stdlib/assert-has-uint16array-support/lib/uint16array.js
  var require_uint16array = __commonJS({
    "node_modules/@stdlib/assert-has-uint16array-support/lib/uint16array.js": function(exports, module) {
      "use strict";
      var main = typeof Uint16Array === "function" ? Uint16Array : null;
      module.exports = main;
    }
  });

  // node_modules/@stdlib/assert-has-uint16array-support/lib/main.js
  var require_main16 = __commonJS({
    "node_modules/@stdlib/assert-has-uint16array-support/lib/main.js": function(exports, module) {
      "use strict";
      var isUint16Array = require_lib17();
      var UINT16_MAX = require_lib18();
      var GlobalUint16Array = require_uint16array();
      function hasUint16ArraySupport() {
        var bool;
        var arr;
        if (typeof GlobalUint16Array !== "function") {
          return false;
        }
        try {
          arr = [1, 3.14, -3.14, UINT16_MAX + 1, UINT16_MAX + 2];
          arr = new GlobalUint16Array(arr);
          bool = isUint16Array(arr) && arr[0] === 1 && arr[1] === 3 && // truncation
          arr[2] === UINT16_MAX - 2 && // truncation and wrap around
          arr[3] === 0 && // wrap around
          arr[4] === 1;
        } catch (err) {
          bool = false;
        }
        return bool;
      }
      module.exports = hasUint16ArraySupport;
    }
  });

  // node_modules/@stdlib/assert-has-uint16array-support/lib/index.js
  var require_lib19 = __commonJS({
    "node_modules/@stdlib/assert-has-uint16array-support/lib/index.js": function(exports, module) {
      "use strict";
      var hasUint16ArraySupport = require_main16();
      module.exports = hasUint16ArraySupport;
    }
  });

  // node_modules/@stdlib/array-uint16/lib/main.js
  var require_main17 = __commonJS({
    "node_modules/@stdlib/array-uint16/lib/main.js": function(exports, module) {
      "use strict";
      var ctor = typeof Uint16Array === "function" ? Uint16Array : void 0;
      module.exports = ctor;
    }
  });

  // node_modules/@stdlib/array-uint16/lib/polyfill.js
  var require_polyfill5 = __commonJS({
    "node_modules/@stdlib/array-uint16/lib/polyfill.js": function(exports, module) {
      "use strict";
      function polyfill() {
        throw new Error("not implemented");
      }
      module.exports = polyfill;
    }
  });

  // node_modules/@stdlib/array-uint16/lib/index.js
  var require_lib20 = __commonJS({
    "node_modules/@stdlib/array-uint16/lib/index.js": function(exports, module) {
      "use strict";
      var hasUint16ArraySupport = require_lib19();
      var builtin = require_main17();
      var polyfill = require_polyfill5();
      var ctor;
      if (hasUint16ArraySupport()) {
        ctor = builtin;
      } else {
        ctor = polyfill;
      }
      module.exports = ctor;
    }
  });

  // node_modules/@stdlib/assert-is-little-endian/lib/ctors.js
  var require_ctors = __commonJS({
    "node_modules/@stdlib/assert-is-little-endian/lib/ctors.js": function(exports, module) {
      "use strict";
      var Uint8Array2 = require_lib16();
      var Uint16Array2 = require_lib20();
      var ctors = {
        "uint16": Uint16Array2,
        "uint8": Uint8Array2
      };
      module.exports = ctors;
    }
  });

  // node_modules/@stdlib/assert-is-little-endian/lib/main.js
  var require_main18 = __commonJS({
    "node_modules/@stdlib/assert-is-little-endian/lib/main.js": function(exports, module) {
      "use strict";
      var ctors = require_ctors();
      var bool;
      function isLittleEndian() {
        var uint16view;
        var uint8view;
        uint16view = new ctors["uint16"](1);
        uint16view[0] = 4660;
        uint8view = new ctors["uint8"](uint16view.buffer);
        return uint8view[0] === 52;
      }
      bool = isLittleEndian();
      module.exports = bool;
    }
  });

  // node_modules/@stdlib/assert-is-little-endian/lib/index.js
  var require_lib21 = __commonJS({
    "node_modules/@stdlib/assert-is-little-endian/lib/index.js": function(exports, module) {
      "use strict";
      var IS_LITTLE_ENDIAN = require_main18();
      module.exports = IS_LITTLE_ENDIAN;
    }
  });

  // node_modules/@stdlib/number-float64-base-get-high-word/lib/high.js
  var require_high = __commonJS({
    "node_modules/@stdlib/number-float64-base-get-high-word/lib/high.js": function(exports, module) {
      "use strict";
      var isLittleEndian = require_lib21();
      var HIGH;
      if (isLittleEndian === true) {
        HIGH = 1;
      } else {
        HIGH = 0;
      }
      module.exports = HIGH;
    }
  });

  // node_modules/@stdlib/number-float64-base-get-high-word/lib/main.js
  var require_main19 = __commonJS({
    "node_modules/@stdlib/number-float64-base-get-high-word/lib/main.js": function(exports, module) {
      "use strict";
      var Uint32Array2 = require_lib9();
      var Float64Array2 = require_lib12();
      var HIGH = require_high();
      var FLOAT64_VIEW = new Float64Array2(1);
      var UINT32_VIEW = new Uint32Array2(FLOAT64_VIEW.buffer);
      function getHighWord(x) {
        FLOAT64_VIEW[0] = x;
        return UINT32_VIEW[HIGH];
      }
      module.exports = getHighWord;
    }
  });

  // node_modules/@stdlib/number-float64-base-get-high-word/lib/index.js
  var require_lib22 = __commonJS({
    "node_modules/@stdlib/number-float64-base-get-high-word/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main19();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/number-float64-base-set-low-word/lib/low.js
  var require_low = __commonJS({
    "node_modules/@stdlib/number-float64-base-set-low-word/lib/low.js": function(exports, module) {
      "use strict";
      var isLittleEndian = require_lib21();
      var LOW;
      if (isLittleEndian === true) {
        LOW = 0;
      } else {
        LOW = 1;
      }
      module.exports = LOW;
    }
  });

  // node_modules/@stdlib/number-float64-base-set-low-word/lib/main.js
  var require_main20 = __commonJS({
    "node_modules/@stdlib/number-float64-base-set-low-word/lib/main.js": function(exports, module) {
      "use strict";
      var Uint32Array2 = require_lib9();
      var Float64Array2 = require_lib12();
      var LOW = require_low();
      var FLOAT64_VIEW = new Float64Array2(1);
      var UINT32_VIEW = new Uint32Array2(FLOAT64_VIEW.buffer);
      function setLowWord(x, low) {
        FLOAT64_VIEW[0] = x;
        UINT32_VIEW[LOW] = low >>> 0;
        return FLOAT64_VIEW[0];
      }
      module.exports = setLowWord;
    }
  });

  // node_modules/@stdlib/number-float64-base-set-low-word/lib/index.js
  var require_lib23 = __commonJS({
    "node_modules/@stdlib/number-float64-base-set-low-word/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main20();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/math-base-special-kernel-tan/lib/polyval_t_odd.js
  var require_polyval_t_odd = __commonJS({
    "node_modules/@stdlib/math-base-special-kernel-tan/lib/polyval_t_odd.js": function(exports, module) {
      "use strict";
      function evalpoly(x) {
        if (x === 0) {
          return 0.13333333333320124;
        }
        return 0.13333333333320124 + x * (0.021869488294859542 + x * (0.0035920791075913124 + x * (5880412408202641e-19 + x * (7817944429395571e-20 + x * -18558637485527546e-21))));
      }
      module.exports = evalpoly;
    }
  });

  // node_modules/@stdlib/math-base-special-kernel-tan/lib/polyval_t_even.js
  var require_polyval_t_even = __commonJS({
    "node_modules/@stdlib/math-base-special-kernel-tan/lib/polyval_t_even.js": function(exports, module) {
      "use strict";
      function evalpoly(x) {
        if (x === 0) {
          return 0.05396825397622605;
        }
        return 0.05396825397622605 + x * (0.0088632398235993 + x * (0.0014562094543252903 + x * (2464631348184699e-19 + x * (7140724913826082e-20 + x * 2590730518636337e-20))));
      }
      module.exports = evalpoly;
    }
  });

  // node_modules/@stdlib/math-base-special-kernel-tan/lib/main.js
  var require_main21 = __commonJS({
    "node_modules/@stdlib/math-base-special-kernel-tan/lib/main.js": function(exports, module) {
      "use strict";
      var getHighWord = require_lib22();
      var setLowWord = require_lib23();
      var polyvalOdd = require_polyval_t_odd();
      var polyvalEven = require_polyval_t_even();
      var PIO4 = 0.7853981633974483;
      var PIO4LO = 3061616997868383e-32;
      var T0 = 0.3333333333333341;
      var HIGH_WORD_ABS_MASK = 2147483647 | 0;
      function kernelTan(x, y, k) {
        var hx;
        var ix;
        var a2;
        var r;
        var s;
        var t;
        var v;
        var w;
        var z;
        hx = getHighWord(x);
        ix = hx & HIGH_WORD_ABS_MASK | 0;
        if (ix >= 1072010280) {
          if (x < 0) {
            x = -x;
            y = -y;
          }
          z = PIO4 - x;
          w = PIO4LO - y;
          x = z + w;
          y = 0;
        }
        z = x * x;
        w = z * z;
        r = polyvalOdd(w);
        v = z * polyvalEven(w);
        s = z * x;
        r = y + z * (s * (r + v) + y);
        r += T0 * s;
        w = x + r;
        if (ix >= 1072010280) {
          v = k;
          return (1 - (hx >> 30 & 2)) * (v - 2 * (x - (w * w / (w + v) - r)));
        }
        if (k === 1) {
          return w;
        }
        z = setLowWord(w, 0);
        v = r - (z - x);
        a2 = -1 / w;
        t = setLowWord(a2, 0);
        s = 1 + t * z;
        return t + a2 * (s + t * v);
      }
      module.exports = kernelTan;
    }
  });

  // node_modules/@stdlib/math-base-special-kernel-tan/lib/index.js
  var require_lib24 = __commonJS({
    "node_modules/@stdlib/math-base-special-kernel-tan/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main21();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/constants-float64-high-word-abs-mask/lib/index.js
  var require_lib25 = __commonJS({
    "node_modules/@stdlib/constants-float64-high-word-abs-mask/lib/index.js": function(exports, module) {
      "use strict";
      var FLOAT64_HIGH_WORD_ABS_MASK = 2147483647 >>> 0;
      module.exports = FLOAT64_HIGH_WORD_ABS_MASK;
    }
  });

  // node_modules/@stdlib/constants-float64-high-word-exponent-mask/lib/index.js
  var require_lib26 = __commonJS({
    "node_modules/@stdlib/constants-float64-high-word-exponent-mask/lib/index.js": function(exports, module) {
      "use strict";
      var FLOAT64_HIGH_WORD_EXPONENT_MASK = 2146435072;
      module.exports = FLOAT64_HIGH_WORD_EXPONENT_MASK;
    }
  });

  // node_modules/@stdlib/constants-float64-high-word-significand-mask/lib/index.js
  var require_lib27 = __commonJS({
    "node_modules/@stdlib/constants-float64-high-word-significand-mask/lib/index.js": function(exports, module) {
      "use strict";
      var FLOAT64_HIGH_WORD_SIGNIFICAND_MASK = 1048575;
      module.exports = FLOAT64_HIGH_WORD_SIGNIFICAND_MASK;
    }
  });

  // node_modules/@stdlib/number-float64-base-get-low-word/lib/low.js
  var require_low2 = __commonJS({
    "node_modules/@stdlib/number-float64-base-get-low-word/lib/low.js": function(exports, module) {
      "use strict";
      var isLittleEndian = require_lib21();
      var LOW;
      if (isLittleEndian === true) {
        LOW = 0;
      } else {
        LOW = 1;
      }
      module.exports = LOW;
    }
  });

  // node_modules/@stdlib/number-float64-base-get-low-word/lib/main.js
  var require_main22 = __commonJS({
    "node_modules/@stdlib/number-float64-base-get-low-word/lib/main.js": function(exports, module) {
      "use strict";
      var Uint32Array2 = require_lib9();
      var Float64Array2 = require_lib12();
      var LOW = require_low2();
      var FLOAT64_VIEW = new Float64Array2(1);
      var UINT32_VIEW = new Uint32Array2(FLOAT64_VIEW.buffer);
      function getLowWord(x) {
        FLOAT64_VIEW[0] = x;
        return UINT32_VIEW[LOW];
      }
      module.exports = getLowWord;
    }
  });

  // node_modules/@stdlib/number-float64-base-get-low-word/lib/index.js
  var require_lib28 = __commonJS({
    "node_modules/@stdlib/number-float64-base-get-low-word/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main22();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/number-float64-base-from-words/lib/indices.js
  var require_indices = __commonJS({
    "node_modules/@stdlib/number-float64-base-from-words/lib/indices.js": function(exports, module) {
      "use strict";
      var isLittleEndian = require_lib21();
      var indices;
      var HIGH;
      var LOW;
      if (isLittleEndian === true) {
        HIGH = 1;
        LOW = 0;
      } else {
        HIGH = 0;
        LOW = 1;
      }
      indices = {
        "HIGH": HIGH,
        "LOW": LOW
      };
      module.exports = indices;
    }
  });

  // node_modules/@stdlib/number-float64-base-from-words/lib/main.js
  var require_main23 = __commonJS({
    "node_modules/@stdlib/number-float64-base-from-words/lib/main.js": function(exports, module) {
      "use strict";
      var Uint32Array2 = require_lib9();
      var Float64Array2 = require_lib12();
      var indices = require_indices();
      var FLOAT64_VIEW = new Float64Array2(1);
      var UINT32_VIEW = new Uint32Array2(FLOAT64_VIEW.buffer);
      var HIGH = indices.HIGH;
      var LOW = indices.LOW;
      function fromWords(high, low) {
        UINT32_VIEW[HIGH] = high;
        UINT32_VIEW[LOW] = low;
        return FLOAT64_VIEW[0];
      }
      module.exports = fromWords;
    }
  });

  // node_modules/@stdlib/number-float64-base-from-words/lib/index.js
  var require_lib29 = __commonJS({
    "node_modules/@stdlib/number-float64-base-from-words/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main23();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/math-base-special-floor/lib/main.js
  var require_main24 = __commonJS({
    "node_modules/@stdlib/math-base-special-floor/lib/main.js": function(exports, module) {
      "use strict";
      var floor = Math.floor;
      module.exports = floor;
    }
  });

  // node_modules/@stdlib/math-base-special-floor/lib/index.js
  var require_lib30 = __commonJS({
    "node_modules/@stdlib/math-base-special-floor/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main24();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/constants-float64-pinf/lib/index.js
  var require_lib31 = __commonJS({
    "node_modules/@stdlib/constants-float64-pinf/lib/index.js": function(exports, module) {
      "use strict";
      var FLOAT64_PINF = Number.POSITIVE_INFINITY;
      module.exports = FLOAT64_PINF;
    }
  });

  // node_modules/@stdlib/number-ctor/lib/main.js
  var require_main25 = __commonJS({
    "node_modules/@stdlib/number-ctor/lib/main.js": function(exports, module) {
      "use strict";
      module.exports = Number;
    }
  });

  // node_modules/@stdlib/number-ctor/lib/index.js
  var require_lib32 = __commonJS({
    "node_modules/@stdlib/number-ctor/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main25();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/constants-float64-ninf/lib/index.js
  var require_lib33 = __commonJS({
    "node_modules/@stdlib/constants-float64-ninf/lib/index.js": function(exports, module) {
      "use strict";
      var Number2 = require_lib32();
      var FLOAT64_NINF = Number2.NEGATIVE_INFINITY;
      module.exports = FLOAT64_NINF;
    }
  });

  // node_modules/@stdlib/constants-float64-exponent-bias/lib/index.js
  var require_lib34 = __commonJS({
    "node_modules/@stdlib/constants-float64-exponent-bias/lib/index.js": function(exports, module) {
      "use strict";
      var FLOAT64_EXPONENT_BIAS = 1023 | 0;
      module.exports = FLOAT64_EXPONENT_BIAS;
    }
  });

  // node_modules/@stdlib/constants-float64-max-base2-exponent/lib/index.js
  var require_lib35 = __commonJS({
    "node_modules/@stdlib/constants-float64-max-base2-exponent/lib/index.js": function(exports, module) {
      "use strict";
      var FLOAT64_MAX_BASE2_EXPONENT = 1023 | 0;
      module.exports = FLOAT64_MAX_BASE2_EXPONENT;
    }
  });

  // node_modules/@stdlib/constants-float64-max-base2-exponent-subnormal/lib/index.js
  var require_lib36 = __commonJS({
    "node_modules/@stdlib/constants-float64-max-base2-exponent-subnormal/lib/index.js": function(exports, module) {
      "use strict";
      var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = -1023 | 0;
      module.exports = FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL;
    }
  });

  // node_modules/@stdlib/constants-float64-min-base2-exponent-subnormal/lib/index.js
  var require_lib37 = __commonJS({
    "node_modules/@stdlib/constants-float64-min-base2-exponent-subnormal/lib/index.js": function(exports, module) {
      "use strict";
      var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = -1074 | 0;
      module.exports = FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL;
    }
  });

  // node_modules/@stdlib/math-base-assert-is-nan/lib/main.js
  var require_main26 = __commonJS({
    "node_modules/@stdlib/math-base-assert-is-nan/lib/main.js": function(exports, module) {
      "use strict";
      function isnan(x) {
        return x !== x;
      }
      module.exports = isnan;
    }
  });

  // node_modules/@stdlib/math-base-assert-is-nan/lib/index.js
  var require_lib38 = __commonJS({
    "node_modules/@stdlib/math-base-assert-is-nan/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main26();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/math-base-assert-is-infinite/lib/main.js
  var require_main27 = __commonJS({
    "node_modules/@stdlib/math-base-assert-is-infinite/lib/main.js": function(exports, module) {
      "use strict";
      var PINF = require_lib31();
      var NINF = require_lib33();
      function isInfinite(x) {
        return x === PINF || x === NINF;
      }
      module.exports = isInfinite;
    }
  });

  // node_modules/@stdlib/math-base-assert-is-infinite/lib/index.js
  var require_lib39 = __commonJS({
    "node_modules/@stdlib/math-base-assert-is-infinite/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main27();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/constants-float64-high-word-sign-mask/lib/index.js
  var require_lib40 = __commonJS({
    "node_modules/@stdlib/constants-float64-high-word-sign-mask/lib/index.js": function(exports, module) {
      "use strict";
      var FLOAT64_HIGH_WORD_SIGN_MASK = 2147483648 >>> 0;
      module.exports = FLOAT64_HIGH_WORD_SIGN_MASK;
    }
  });

  // node_modules/@stdlib/utils-define-property/lib/define_property.js
  var require_define_property = __commonJS({
    "node_modules/@stdlib/utils-define-property/lib/define_property.js": function(exports, module) {
      "use strict";
      var main = typeof Object.defineProperty === "function" ? Object.defineProperty : null;
      module.exports = main;
    }
  });

  // node_modules/@stdlib/utils-define-property/lib/has_define_property_support.js
  var require_has_define_property_support = __commonJS({
    "node_modules/@stdlib/utils-define-property/lib/has_define_property_support.js": function(exports, module) {
      "use strict";
      var defineProperty = require_define_property();
      function hasDefinePropertySupport() {
        try {
          defineProperty({}, "x", {});
          return true;
        } catch (err) {
          return false;
        }
      }
      module.exports = hasDefinePropertySupport;
    }
  });

  // node_modules/@stdlib/utils-define-property/lib/builtin.js
  var require_builtin = __commonJS({
    "node_modules/@stdlib/utils-define-property/lib/builtin.js": function(exports, module) {
      "use strict";
      var defineProperty = Object.defineProperty;
      module.exports = defineProperty;
    }
  });

  // node_modules/@stdlib/string-base-format-interpolate/lib/is_number.js
  var require_is_number = __commonJS({
    "node_modules/@stdlib/string-base-format-interpolate/lib/is_number.js": function(exports, module) {
      "use strict";
      function isNumber(value) {
        return typeof value === "number";
      }
      module.exports = isNumber;
    }
  });

  // node_modules/@stdlib/string-base-format-interpolate/lib/zero_pad.js
  var require_zero_pad = __commonJS({
    "node_modules/@stdlib/string-base-format-interpolate/lib/zero_pad.js": function(exports, module) {
      "use strict";
      function startsWithMinus(str) {
        return str[0] === "-";
      }
      function zeros(n) {
        var out2 = "";
        var i;
        for (i = 0; i < n; i++) {
          out2 += "0";
        }
        return out2;
      }
      function zeroPad(str, width, right) {
        var negative = false;
        var pad = width - str.length;
        if (pad < 0) {
          return str;
        }
        if (startsWithMinus(str)) {
          negative = true;
          str = str.substr(1);
        }
        str = right ? str + zeros(pad) : zeros(pad) + str;
        if (negative) {
          str = "-" + str;
        }
        return str;
      }
      module.exports = zeroPad;
    }
  });

  // node_modules/@stdlib/string-base-format-interpolate/lib/format_integer.js
  var require_format_integer = __commonJS({
    "node_modules/@stdlib/string-base-format-interpolate/lib/format_integer.js": function(exports, module) {
      "use strict";
      var isNumber = require_is_number();
      var zeroPad = require_zero_pad();
      var lowercase = String.prototype.toLowerCase;
      var uppercase = String.prototype.toUpperCase;
      function formatInteger(token) {
        var base;
        var out2;
        var i;
        switch (token.specifier) {
          case "b":
            base = 2;
            break;
          case "o":
            base = 8;
            break;
          case "x":
          case "X":
            base = 16;
            break;
          case "d":
          case "i":
          case "u":
          default:
            base = 10;
            break;
        }
        out2 = token.arg;
        i = parseInt(out2, 10);
        if (!isFinite(i)) {
          if (!isNumber(out2)) {
            throw new Error("invalid integer. Value: " + out2);
          }
          i = 0;
        }
        if (i < 0 && (token.specifier === "u" || base !== 10)) {
          i = 4294967295 + i + 1;
        }
        if (i < 0) {
          out2 = (-i).toString(base);
          if (token.precision) {
            out2 = zeroPad(out2, token.precision, token.padRight);
          }
          out2 = "-" + out2;
        } else {
          out2 = i.toString(base);
          if (!i && !token.precision) {
            out2 = "";
          } else if (token.precision) {
            out2 = zeroPad(out2, token.precision, token.padRight);
          }
          if (token.sign) {
            out2 = token.sign + out2;
          }
        }
        if (base === 16) {
          if (token.alternate) {
            out2 = "0x" + out2;
          }
          out2 = token.specifier === uppercase.call(token.specifier) ? uppercase.call(out2) : lowercase.call(out2);
        }
        if (base === 8) {
          if (token.alternate && out2.charAt(0) !== "0") {
            out2 = "0" + out2;
          }
        }
        return out2;
      }
      module.exports = formatInteger;
    }
  });

  // node_modules/@stdlib/string-base-format-interpolate/lib/is_string.js
  var require_is_string = __commonJS({
    "node_modules/@stdlib/string-base-format-interpolate/lib/is_string.js": function(exports, module) {
      "use strict";
      function isString(value) {
        return typeof value === "string";
      }
      module.exports = isString;
    }
  });

  // node_modules/@stdlib/string-base-format-interpolate/lib/format_double.js
  var require_format_double = __commonJS({
    "node_modules/@stdlib/string-base-format-interpolate/lib/format_double.js": function(exports, module) {
      "use strict";
      var abs = Math.abs;
      var lowercase = String.prototype.toLowerCase;
      var uppercase = String.prototype.toUpperCase;
      var replace = String.prototype.replace;
      var RE_EXP_POS_DIGITS = /e\+(\d)$/;
      var RE_EXP_NEG_DIGITS = /e-(\d)$/;
      var RE_ONLY_DIGITS = /^(\d+)$/;
      var RE_DIGITS_BEFORE_EXP = /^(\d+)e/;
      var RE_TRAILING_PERIOD_ZERO = /\.0$/;
      var RE_PERIOD_ZERO_EXP = /\.0*e/;
      var RE_ZERO_BEFORE_EXP = /(\..*[^0])0*e/;
      function formatDouble(f, token) {
        var digits;
        var out2;
        switch (token.specifier) {
          case "e":
          case "E":
            out2 = f.toExponential(token.precision);
            break;
          case "f":
          case "F":
            out2 = f.toFixed(token.precision);
            break;
          case "g":
          case "G":
            if (abs(f) < 1e-4) {
              digits = token.precision;
              if (digits > 0) {
                digits -= 1;
              }
              out2 = f.toExponential(digits);
            } else {
              out2 = f.toPrecision(token.precision);
            }
            if (!token.alternate) {
              out2 = replace.call(out2, RE_ZERO_BEFORE_EXP, "$1e");
              out2 = replace.call(out2, RE_PERIOD_ZERO_EXP, "e");
              out2 = replace.call(out2, RE_TRAILING_PERIOD_ZERO, "");
            }
            break;
          default:
            throw new Error("invalid double notation. Value: " + token.specifier);
        }
        out2 = replace.call(out2, RE_EXP_POS_DIGITS, "e+0$1");
        out2 = replace.call(out2, RE_EXP_NEG_DIGITS, "e-0$1");
        if (token.alternate) {
          out2 = replace.call(out2, RE_ONLY_DIGITS, "$1.");
          out2 = replace.call(out2, RE_DIGITS_BEFORE_EXP, "$1.e");
        }
        if (f >= 0 && token.sign) {
          out2 = token.sign + out2;
        }
        out2 = token.specifier === uppercase.call(token.specifier) ? uppercase.call(out2) : lowercase.call(out2);
        return out2;
      }
      module.exports = formatDouble;
    }
  });

  // node_modules/@stdlib/string-base-format-interpolate/lib/space_pad.js
  var require_space_pad = __commonJS({
    "node_modules/@stdlib/string-base-format-interpolate/lib/space_pad.js": function(exports, module) {
      "use strict";
      function spaces(n) {
        var out2 = "";
        var i;
        for (i = 0; i < n; i++) {
          out2 += " ";
        }
        return out2;
      }
      function spacePad(str, width, right) {
        var pad = width - str.length;
        if (pad < 0) {
          return str;
        }
        str = right ? str + spaces(pad) : spaces(pad) + str;
        return str;
      }
      module.exports = spacePad;
    }
  });

  // node_modules/@stdlib/string-base-format-interpolate/lib/main.js
  var require_main28 = __commonJS({
    "node_modules/@stdlib/string-base-format-interpolate/lib/main.js": function(exports, module) {
      "use strict";
      var formatInteger = require_format_integer();
      var isString = require_is_string();
      var isNumber = require_is_number();
      var formatDouble = require_format_double();
      var spacePad = require_space_pad();
      var zeroPad = require_zero_pad();
      var fromCharCode = String.fromCharCode;
      var isArray = Array.isArray;
      function isnan(value) {
        return value !== value;
      }
      function initialize(token) {
        var out2 = {};
        out2.specifier = token.specifier;
        out2.precision = token.precision === void 0 ? 1 : token.precision;
        out2.width = token.width;
        out2.flags = token.flags || "";
        out2.mapping = token.mapping;
        return out2;
      }
      function formatInterpolate(tokens) {
        var hasPeriod;
        var flags;
        var token;
        var flag;
        var num;
        var out2;
        var pos;
        var f;
        var i;
        var j;
        if (!isArray(tokens)) {
          throw new TypeError("invalid argument. First argument must be an array. Value: `" + tokens + "`.");
        }
        out2 = "";
        pos = 1;
        for (i = 0; i < tokens.length; i++) {
          token = tokens[i];
          if (isString(token)) {
            out2 += token;
          } else {
            hasPeriod = token.precision !== void 0;
            token = initialize(token);
            if (!token.specifier) {
              throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `" + i + "`. Value: `" + token + "`.");
            }
            if (token.mapping) {
              pos = token.mapping;
            }
            flags = token.flags;
            for (j = 0; j < flags.length; j++) {
              flag = flags.charAt(j);
              switch (flag) {
                case " ":
                  token.sign = " ";
                  break;
                case "+":
                  token.sign = "+";
                  break;
                case "-":
                  token.padRight = true;
                  token.padZeros = false;
                  break;
                case "0":
                  token.padZeros = flags.indexOf("-") < 0;
                  break;
                case "#":
                  token.alternate = true;
                  break;
                default:
                  throw new Error("invalid flag: " + flag);
              }
            }
            if (token.width === "*") {
              token.width = parseInt(arguments[pos], 10);
              pos += 1;
              if (isnan(token.width)) {
                throw new TypeError("the argument for * width at position " + pos + " is not a number. Value: `" + token.width + "`.");
              }
              if (token.width < 0) {
                token.padRight = true;
                token.width = -token.width;
              }
            }
            if (hasPeriod) {
              if (token.precision === "*") {
                token.precision = parseInt(arguments[pos], 10);
                pos += 1;
                if (isnan(token.precision)) {
                  throw new TypeError("the argument for * precision at position " + pos + " is not a number. Value: `" + token.precision + "`.");
                }
                if (token.precision < 0) {
                  token.precision = 1;
                  hasPeriod = false;
                }
              }
            }
            token.arg = arguments[pos];
            switch (token.specifier) {
              case "b":
              case "o":
              case "x":
              case "X":
              case "d":
              case "i":
              case "u":
                if (hasPeriod) {
                  token.padZeros = false;
                }
                token.arg = formatInteger(token);
                break;
              case "s":
                token.maxWidth = hasPeriod ? token.precision : -1;
                token.arg = String(token.arg);
                break;
              case "c":
                if (!isnan(token.arg)) {
                  num = parseInt(token.arg, 10);
                  if (num < 0 || num > 127) {
                    throw new Error("invalid character code. Value: " + token.arg);
                  }
                  token.arg = isnan(num) ? String(token.arg) : fromCharCode(num);
                }
                break;
              case "e":
              case "E":
              case "f":
              case "F":
              case "g":
              case "G":
                if (!hasPeriod) {
                  token.precision = 6;
                }
                f = parseFloat(token.arg);
                if (!isFinite(f)) {
                  if (!isNumber(token.arg)) {
                    throw new Error("invalid floating-point number. Value: " + out2);
                  }
                  f = token.arg;
                  token.padZeros = false;
                }
                token.arg = formatDouble(f, token);
                break;
              default:
                throw new Error("invalid specifier: " + token.specifier);
            }
            if (token.maxWidth >= 0 && token.arg.length > token.maxWidth) {
              token.arg = token.arg.substring(0, token.maxWidth);
            }
            if (token.padZeros) {
              token.arg = zeroPad(token.arg, token.width || token.precision, token.padRight);
            } else if (token.width) {
              token.arg = spacePad(token.arg, token.width, token.padRight);
            }
            out2 += token.arg || "";
            pos += 1;
          }
        }
        return out2;
      }
      module.exports = formatInterpolate;
    }
  });

  // node_modules/@stdlib/string-base-format-interpolate/lib/index.js
  var require_lib41 = __commonJS({
    "node_modules/@stdlib/string-base-format-interpolate/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main28();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/string-base-format-tokenize/lib/main.js
  var require_main29 = __commonJS({
    "node_modules/@stdlib/string-base-format-tokenize/lib/main.js": function(exports, module) {
      "use strict";
      var RE = /%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;
      function parse(match) {
        var token = {
          "mapping": match[1] ? parseInt(match[1], 10) : void 0,
          "flags": match[2],
          "width": match[3],
          "precision": match[5],
          "specifier": match[6]
        };
        if (match[4] === "." && match[5] === void 0) {
          token.precision = "1";
        }
        return token;
      }
      function formatTokenize(str) {
        var content;
        var tokens;
        var match;
        var prev;
        tokens = [];
        prev = 0;
        match = RE.exec(str);
        while (match) {
          content = str.slice(prev, RE.lastIndex - match[0].length);
          if (content.length) {
            tokens.push(content);
          }
          if (match[6] === "%") {
            tokens.push("%");
          } else {
            tokens.push(parse(match));
          }
          prev = RE.lastIndex;
          match = RE.exec(str);
        }
        content = str.slice(prev);
        if (content.length) {
          tokens.push(content);
        }
        return tokens;
      }
      module.exports = formatTokenize;
    }
  });

  // node_modules/@stdlib/string-base-format-tokenize/lib/index.js
  var require_lib42 = __commonJS({
    "node_modules/@stdlib/string-base-format-tokenize/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main29();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/string-format/lib/is_string.js
  var require_is_string2 = __commonJS({
    "node_modules/@stdlib/string-format/lib/is_string.js": function(exports, module) {
      "use strict";
      function isString(value) {
        return typeof value === "string";
      }
      module.exports = isString;
    }
  });

  // node_modules/@stdlib/string-format/lib/main.js
  var require_main30 = __commonJS({
    "node_modules/@stdlib/string-format/lib/main.js": function(exports, module) {
      "use strict";
      var interpolate = require_lib41();
      var tokenize = require_lib42();
      var isString = require_is_string2();
      function format(str) {
        var args;
        var i;
        if (!isString(str)) {
          throw new TypeError(format("invalid argument. First argument must be a string. Value: `%s`.", str));
        }
        args = [tokenize(str)];
        for (i = 1; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        return interpolate.apply(null, args);
      }
      module.exports = format;
    }
  });

  // node_modules/@stdlib/string-format/lib/index.js
  var require_lib43 = __commonJS({
    "node_modules/@stdlib/string-format/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main30();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/utils-define-property/lib/polyfill.js
  var require_polyfill6 = __commonJS({
    "node_modules/@stdlib/utils-define-property/lib/polyfill.js": function(exports, module) {
      "use strict";
      var format = require_lib43();
      var objectProtoype = Object.prototype;
      var toStr = objectProtoype.toString;
      var defineGetter = objectProtoype.__defineGetter__;
      var defineSetter = objectProtoype.__defineSetter__;
      var lookupGetter = objectProtoype.__lookupGetter__;
      var lookupSetter = objectProtoype.__lookupSetter__;
      function defineProperty(obj, prop, descriptor) {
        var prototype;
        var hasValue;
        var hasGet;
        var hasSet;
        if (typeof obj !== "object" || obj === null || toStr.call(obj) === "[object Array]") {
          throw new TypeError(format("invalid argument. First argument must be an object. Value: `%s`.", obj));
        }
        if (typeof descriptor !== "object" || descriptor === null || toStr.call(descriptor) === "[object Array]") {
          throw new TypeError(format("invalid argument. Property descriptor must be an object. Value: `%s`.", descriptor));
        }
        hasValue = "value" in descriptor;
        if (hasValue) {
          if (lookupGetter.call(obj, prop) || lookupSetter.call(obj, prop)) {
            prototype = obj.__proto__;
            obj.__proto__ = objectProtoype;
            delete obj[prop];
            obj[prop] = descriptor.value;
            obj.__proto__ = prototype;
          } else {
            obj[prop] = descriptor.value;
          }
        }
        hasGet = "get" in descriptor;
        hasSet = "set" in descriptor;
        if (hasValue && (hasGet || hasSet)) {
          throw new Error("invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.");
        }
        if (hasGet && defineGetter) {
          defineGetter.call(obj, prop, descriptor.get);
        }
        if (hasSet && defineSetter) {
          defineSetter.call(obj, prop, descriptor.set);
        }
        return obj;
      }
      module.exports = defineProperty;
    }
  });

  // node_modules/@stdlib/utils-define-property/lib/index.js
  var require_lib44 = __commonJS({
    "node_modules/@stdlib/utils-define-property/lib/index.js": function(exports, module) {
      "use strict";
      var hasDefinePropertySupport = require_has_define_property_support();
      var builtin = require_builtin();
      var polyfill = require_polyfill6();
      var defineProperty;
      if (hasDefinePropertySupport()) {
        defineProperty = builtin;
      } else {
        defineProperty = polyfill;
      }
      module.exports = defineProperty;
    }
  });

  // node_modules/@stdlib/utils-define-nonenumerable-read-only-property/lib/main.js
  var require_main31 = __commonJS({
    "node_modules/@stdlib/utils-define-nonenumerable-read-only-property/lib/main.js": function(exports, module) {
      "use strict";
      var defineProperty = require_lib44();
      function setNonEnumerableReadOnly(obj, prop, value) {
        defineProperty(obj, prop, {
          "configurable": false,
          "enumerable": false,
          "writable": false,
          "value": value
        });
      }
      module.exports = setNonEnumerableReadOnly;
    }
  });

  // node_modules/@stdlib/utils-define-nonenumerable-read-only-property/lib/index.js
  var require_lib45 = __commonJS({
    "node_modules/@stdlib/utils-define-nonenumerable-read-only-property/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main31();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/number-float64-base-to-words/lib/indices.js
  var require_indices2 = __commonJS({
    "node_modules/@stdlib/number-float64-base-to-words/lib/indices.js": function(exports, module) {
      "use strict";
      var isLittleEndian = require_lib21();
      var indices;
      var HIGH;
      var LOW;
      if (isLittleEndian === true) {
        HIGH = 1;
        LOW = 0;
      } else {
        HIGH = 0;
        LOW = 1;
      }
      indices = {
        "HIGH": HIGH,
        "LOW": LOW
      };
      module.exports = indices;
    }
  });

  // node_modules/@stdlib/number-float64-base-to-words/lib/assign.js
  var require_assign = __commonJS({
    "node_modules/@stdlib/number-float64-base-to-words/lib/assign.js": function(exports, module) {
      "use strict";
      var Uint32Array2 = require_lib9();
      var Float64Array2 = require_lib12();
      var indices = require_indices2();
      var FLOAT64_VIEW = new Float64Array2(1);
      var UINT32_VIEW = new Uint32Array2(FLOAT64_VIEW.buffer);
      var HIGH = indices.HIGH;
      var LOW = indices.LOW;
      function toWords(x, out2, stride, offset) {
        FLOAT64_VIEW[0] = x;
        out2[offset] = UINT32_VIEW[HIGH];
        out2[offset + stride] = UINT32_VIEW[LOW];
        return out2;
      }
      module.exports = toWords;
    }
  });

  // node_modules/@stdlib/number-float64-base-to-words/lib/main.js
  var require_main32 = __commonJS({
    "node_modules/@stdlib/number-float64-base-to-words/lib/main.js": function(exports, module) {
      "use strict";
      var fcn = require_assign();
      function toWords(x) {
        return fcn(x, [0 >>> 0, 0 >>> 0], 1, 0);
      }
      module.exports = toWords;
    }
  });

  // node_modules/@stdlib/number-float64-base-to-words/lib/index.js
  var require_lib46 = __commonJS({
    "node_modules/@stdlib/number-float64-base-to-words/lib/index.js": function(exports, module) {
      "use strict";
      var setReadOnly = require_lib45();
      var main = require_main32();
      var assign = require_assign();
      setReadOnly(main, "assign", assign);
      module.exports = main;
    }
  });

  // node_modules/@stdlib/math-base-special-copysign/lib/main.js
  var require_main33 = __commonJS({
    "node_modules/@stdlib/math-base-special-copysign/lib/main.js": function(exports, module) {
      "use strict";
      var SIGN_MASK = require_lib40();
      var ABS_MASK = require_lib25();
      var toWords = require_lib46();
      var getHighWord = require_lib22();
      var fromWords = require_lib29();
      var WORDS = [0, 0];
      function copysign(x, y) {
        var hx;
        var hy;
        toWords.assign(x, WORDS, 1, 0);
        hx = WORDS[0];
        hx &= ABS_MASK;
        hy = getHighWord(y);
        hy &= SIGN_MASK;
        hx |= hy;
        return fromWords(hx, WORDS[1]);
      }
      module.exports = copysign;
    }
  });

  // node_modules/@stdlib/math-base-special-copysign/lib/index.js
  var require_lib47 = __commonJS({
    "node_modules/@stdlib/math-base-special-copysign/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main33();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/constants-float64-smallest-normal/lib/index.js
  var require_lib48 = __commonJS({
    "node_modules/@stdlib/constants-float64-smallest-normal/lib/index.js": function(exports, module) {
      "use strict";
      var FLOAT64_SMALLEST_NORMAL = 22250738585072014e-324;
      module.exports = FLOAT64_SMALLEST_NORMAL;
    }
  });

  // node_modules/@stdlib/math-base-special-abs/lib/main.js
  var require_main34 = __commonJS({
    "node_modules/@stdlib/math-base-special-abs/lib/main.js": function(exports, module) {
      "use strict";
      function abs(x) {
        return Math.abs(x);
      }
      module.exports = abs;
    }
  });

  // node_modules/@stdlib/math-base-special-abs/lib/index.js
  var require_lib49 = __commonJS({
    "node_modules/@stdlib/math-base-special-abs/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main34();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/number-float64-base-normalize/lib/assign.js
  var require_assign2 = __commonJS({
    "node_modules/@stdlib/number-float64-base-normalize/lib/assign.js": function(exports, module) {
      "use strict";
      var FLOAT64_SMALLEST_NORMAL = require_lib48();
      var isInfinite = require_lib39();
      var isnan = require_lib38();
      var abs = require_lib49();
      var SCALAR = 4503599627370496;
      function normalize(x, out2, stride, offset) {
        if (isnan(x) || isInfinite(x)) {
          out2[offset] = x;
          out2[offset + stride] = 0;
          return out2;
        }
        if (x !== 0 && abs(x) < FLOAT64_SMALLEST_NORMAL) {
          out2[offset] = x * SCALAR;
          out2[offset + stride] = -52;
          return out2;
        }
        out2[offset] = x;
        out2[offset + stride] = 0;
        return out2;
      }
      module.exports = normalize;
    }
  });

  // node_modules/@stdlib/number-float64-base-normalize/lib/main.js
  var require_main35 = __commonJS({
    "node_modules/@stdlib/number-float64-base-normalize/lib/main.js": function(exports, module) {
      "use strict";
      var fcn = require_assign2();
      function normalize(x) {
        return fcn(x, [0, 0], 1, 0);
      }
      module.exports = normalize;
    }
  });

  // node_modules/@stdlib/number-float64-base-normalize/lib/index.js
  var require_lib50 = __commonJS({
    "node_modules/@stdlib/number-float64-base-normalize/lib/index.js": function(exports, module) {
      "use strict";
      var setReadOnly = require_lib45();
      var main = require_main35();
      var assign = require_assign2();
      setReadOnly(main, "assign", assign);
      module.exports = main;
    }
  });

  // node_modules/@stdlib/number-float64-base-exponent/lib/main.js
  var require_main36 = __commonJS({
    "node_modules/@stdlib/number-float64-base-exponent/lib/main.js": function(exports, module) {
      "use strict";
      var getHighWord = require_lib22();
      var EXP_MASK = require_lib26();
      var BIAS = require_lib34();
      function exponent(x) {
        var high = getHighWord(x);
        high = (high & EXP_MASK) >>> 20;
        return high - BIAS | 0;
      }
      module.exports = exponent;
    }
  });

  // node_modules/@stdlib/number-float64-base-exponent/lib/index.js
  var require_lib51 = __commonJS({
    "node_modules/@stdlib/number-float64-base-exponent/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main36();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/math-base-special-ldexp/lib/main.js
  var require_main37 = __commonJS({
    "node_modules/@stdlib/math-base-special-ldexp/lib/main.js": function(exports, module) {
      "use strict";
      var PINF = require_lib31();
      var NINF = require_lib33();
      var BIAS = require_lib34();
      var MAX_EXPONENT = require_lib35();
      var MAX_SUBNORMAL_EXPONENT = require_lib36();
      var MIN_SUBNORMAL_EXPONENT = require_lib37();
      var isnan = require_lib38();
      var isInfinite = require_lib39();
      var copysign = require_lib47();
      var normalize = require_lib50().assign;
      var floatExp = require_lib51();
      var toWords = require_lib46();
      var fromWords = require_lib29();
      var TWO52_INV = 2220446049250313e-31;
      var CLEAR_EXP_MASK = 2148532223 >>> 0;
      var FRAC = [0, 0];
      var WORDS = [0, 0];
      function ldexp(frac, exp) {
        var high;
        var m2;
        if (exp === 0 || frac === 0 || // handles +-0
        isnan(frac) || isInfinite(frac)) {
          return frac;
        }
        normalize(frac, FRAC, 1, 0);
        frac = FRAC[0];
        exp += FRAC[1];
        exp += floatExp(frac);
        if (exp < MIN_SUBNORMAL_EXPONENT) {
          return copysign(0, frac);
        }
        if (exp > MAX_EXPONENT) {
          if (frac < 0) {
            return NINF;
          }
          return PINF;
        }
        if (exp <= MAX_SUBNORMAL_EXPONENT) {
          exp += 52;
          m2 = TWO52_INV;
        } else {
          m2 = 1;
        }
        toWords.assign(frac, WORDS, 1, 0);
        high = WORDS[0];
        high &= CLEAR_EXP_MASK;
        high |= exp + BIAS << 20;
        return m2 * fromWords(high, WORDS[1]);
      }
      module.exports = ldexp;
    }
  });

  // node_modules/@stdlib/math-base-special-ldexp/lib/index.js
  var require_lib52 = __commonJS({
    "node_modules/@stdlib/math-base-special-ldexp/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main37();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/array-base-filled/lib/main.js
  var require_main38 = __commonJS({
    "node_modules/@stdlib/array-base-filled/lib/main.js": function(exports, module) {
      "use strict";
      function filled(value, len) {
        var arr;
        var i;
        arr = [];
        for (i = 0; i < len; i++) {
          arr.push(value);
        }
        return arr;
      }
      module.exports = filled;
    }
  });

  // node_modules/@stdlib/array-base-filled/lib/index.js
  var require_lib53 = __commonJS({
    "node_modules/@stdlib/array-base-filled/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main38();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/array-base-zeros/lib/main.js
  var require_main39 = __commonJS({
    "node_modules/@stdlib/array-base-zeros/lib/main.js": function(exports, module) {
      "use strict";
      var filled = require_lib53();
      function zeros(len) {
        return filled(0, len);
      }
      module.exports = zeros;
    }
  });

  // node_modules/@stdlib/array-base-zeros/lib/index.js
  var require_lib54 = __commonJS({
    "node_modules/@stdlib/array-base-zeros/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main39();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/math-base-special-rempio2/lib/kernel_rempio2.js
  var require_kernel_rempio2 = __commonJS({
    "node_modules/@stdlib/math-base-special-rempio2/lib/kernel_rempio2.js": function(exports, module) {
      "use strict";
      var floor = require_lib30();
      var ldexp = require_lib52();
      var zeros = require_lib54();
      var IPIO2 = [
        10680707,
        7228996,
        1387004,
        2578385,
        16069853,
        12639074,
        9804092,
        4427841,
        16666979,
        11263675,
        12935607,
        2387514,
        4345298,
        14681673,
        3074569,
        13734428,
        16653803,
        1880361,
        10960616,
        8533493,
        3062596,
        8710556,
        7349940,
        6258241,
        3772886,
        3769171,
        3798172,
        8675211,
        12450088,
        3874808,
        9961438,
        366607,
        15675153,
        9132554,
        7151469,
        3571407,
        2607881,
        12013382,
        4155038,
        6285869,
        7677882,
        13102053,
        15825725,
        473591,
        9065106,
        15363067,
        6271263,
        9264392,
        5636912,
        4652155,
        7056368,
        13614112,
        10155062,
        1944035,
        9527646,
        15080200,
        6658437,
        6231200,
        6832269,
        16767104,
        5075751,
        3212806,
        1398474,
        7579849,
        6349435,
        12618859
      ];
      var PIO2 = [
        1.570796251296997,
        // 0x3FF921FB, 0x40000000
        7549789415861596e-23,
        // 0x3E74442D, 0x00000000
        5390302529957765e-30,
        // 0x3CF84698, 0x80000000
        3282003415807913e-37,
        // 0x3B78CC51, 0x60000000
        1270655753080676e-44,
        // 0x39F01B83, 0x80000000
        12293330898111133e-52,
        // 0x387A2520, 0x40000000
        27337005381646456e-60,
        // 0x36E38222, 0x80000000
        21674168387780482e-67
        // 0x3569F31D, 0x00000000
      ];
      var TWO24 = 16777216;
      var TWON24 = 5960464477539063e-23;
      var F = zeros(20);
      var Q = zeros(20);
      var FQ = zeros(20);
      var IQ = zeros(20);
      function compute(x, y, jz, q, q0, jk, jv, jx, f) {
        var carry;
        var fw;
        var ih;
        var jp;
        var i;
        var k;
        var n;
        var j;
        var z;
        jp = jk;
        z = q[jz];
        j = jz;
        for (i = 0; j > 0; i++) {
          fw = TWON24 * z | 0;
          IQ[i] = z - TWO24 * fw | 0;
          z = q[j - 1] + fw;
          j -= 1;
        }
        z = ldexp(z, q0);
        z -= 8 * floor(z * 0.125);
        n = z | 0;
        z -= n;
        ih = 0;
        if (q0 > 0) {
          i = IQ[jz - 1] >> 24 - q0;
          n += i;
          IQ[jz - 1] -= i << 24 - q0;
          ih = IQ[jz - 1] >> 23 - q0;
        } else if (q0 === 0) {
          ih = IQ[jz - 1] >> 23;
        } else if (z >= 0.5) {
          ih = 2;
        }
        if (ih > 0) {
          n += 1;
          carry = 0;
          for (i = 0; i < jz; i++) {
            j = IQ[i];
            if (carry === 0) {
              if (j !== 0) {
                carry = 1;
                IQ[i] = 16777216 - j;
              }
            } else {
              IQ[i] = 16777215 - j;
            }
          }
          if (q0 > 0) {
            switch (q0) {
              // eslint-disable-line default-case
              case 1:
                IQ[jz - 1] &= 8388607;
                break;
              case 2:
                IQ[jz - 1] &= 4194303;
                break;
            }
          }
          if (ih === 2) {
            z = 1 - z;
            if (carry !== 0) {
              z -= ldexp(1, q0);
            }
          }
        }
        if (z === 0) {
          j = 0;
          for (i = jz - 1; i >= jk; i--) {
            j |= IQ[i];
          }
          if (j === 0) {
            for (k = 1; IQ[jk - k] === 0; k++) {
            }
            for (i = jz + 1; i <= jz + k; i++) {
              f[jx + i] = IPIO2[jv + i];
              fw = 0;
              for (j = 0; j <= jx; j++) {
                fw += x[j] * f[jx + (i - j)];
              }
              q[i] = fw;
            }
            jz += k;
            return compute(x, y, jz, q, q0, jk, jv, jx, f);
          }
          jz -= 1;
          q0 -= 24;
          while (IQ[jz] === 0) {
            jz -= 1;
            q0 -= 24;
          }
        } else {
          z = ldexp(z, -q0);
          if (z >= TWO24) {
            fw = TWON24 * z | 0;
            IQ[jz] = z - TWO24 * fw | 0;
            jz += 1;
            q0 += 24;
            IQ[jz] = fw;
          } else {
            IQ[jz] = z | 0;
          }
        }
        fw = ldexp(1, q0);
        for (i = jz; i >= 0; i--) {
          q[i] = fw * IQ[i];
          fw *= TWON24;
        }
        for (i = jz; i >= 0; i--) {
          fw = 0;
          for (k = 0; k <= jp && k <= jz - i; k++) {
            fw += PIO2[k] * q[i + k];
          }
          FQ[jz - i] = fw;
        }
        fw = 0;
        for (i = jz; i >= 0; i--) {
          fw += FQ[i];
        }
        if (ih === 0) {
          y[0] = fw;
        } else {
          y[0] = -fw;
        }
        fw = FQ[0] - fw;
        for (i = 1; i <= jz; i++) {
          fw += FQ[i];
        }
        if (ih === 0) {
          y[1] = fw;
        } else {
          y[1] = -fw;
        }
        return n & 7;
      }
      function kernelRempio2(x, y, e0, nx) {
        var fw;
        var jk;
        var jv;
        var jx;
        var jz;
        var q0;
        var i;
        var j;
        var m2;
        jk = 4;
        jx = nx - 1;
        jv = (e0 - 3) / 24 | 0;
        if (jv < 0) {
          jv = 0;
        }
        q0 = e0 - 24 * (jv + 1);
        j = jv - jx;
        m2 = jx + jk;
        for (i = 0; i <= m2; i++) {
          if (j < 0) {
            F[i] = 0;
          } else {
            F[i] = IPIO2[j];
          }
          j += 1;
        }
        for (i = 0; i <= jk; i++) {
          fw = 0;
          for (j = 0; j <= jx; j++) {
            fw += x[j] * F[jx + (i - j)];
          }
          Q[i] = fw;
        }
        jz = jk;
        return compute(x, y, jz, Q, q0, jk, jv, jx, F);
      }
      module.exports = kernelRempio2;
    }
  });

  // node_modules/@stdlib/math-base-special-round/lib/main.js
  var require_main40 = __commonJS({
    "node_modules/@stdlib/math-base-special-round/lib/main.js": function(exports, module) {
      "use strict";
      var round = Math.round;
      module.exports = round;
    }
  });

  // node_modules/@stdlib/math-base-special-round/lib/index.js
  var require_lib55 = __commonJS({
    "node_modules/@stdlib/math-base-special-round/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main40();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/math-base-special-rempio2/lib/rempio2_medium.js
  var require_rempio2_medium = __commonJS({
    "node_modules/@stdlib/math-base-special-rempio2/lib/rempio2_medium.js": function(exports, module) {
      "use strict";
      var round = require_lib55();
      var getHighWord = require_lib22();
      var INVPIO2 = 0.6366197723675814;
      var PIO2_1 = 1.5707963267341256;
      var PIO2_1T = 6077100506506192e-26;
      var PIO2_2 = 6077100506303966e-26;
      var PIO2_2T = 20222662487959506e-37;
      var PIO2_3 = 20222662487111665e-37;
      var PIO2_3T = 84784276603689e-45;
      var EXPONENT_MASK = 2047 | 0;
      function rempio2Medium(x, ix, y) {
        var high;
        var n;
        var t;
        var r;
        var w;
        var i;
        var j;
        n = round(x * INVPIO2);
        r = x - n * PIO2_1;
        w = n * PIO2_1T;
        j = ix >> 20 | 0;
        y[0] = r - w;
        high = getHighWord(y[0]);
        i = j - (high >> 20 & EXPONENT_MASK);
        if (i > 16) {
          t = r;
          w = n * PIO2_2;
          r = t - w;
          w = n * PIO2_2T - (t - r - w);
          y[0] = r - w;
          high = getHighWord(y[0]);
          i = j - (high >> 20 & EXPONENT_MASK);
          if (i > 49) {
            t = r;
            w = n * PIO2_3;
            r = t - w;
            w = n * PIO2_3T - (t - r - w);
            y[0] = r - w;
          }
        }
        y[1] = r - y[0] - w;
        return n;
      }
      module.exports = rempio2Medium;
    }
  });

  // node_modules/@stdlib/math-base-special-rempio2/lib/main.js
  var require_main41 = __commonJS({
    "node_modules/@stdlib/math-base-special-rempio2/lib/main.js": function(exports, module) {
      "use strict";
      var ABS_MASK = require_lib25();
      var EXPONENT_MASK = require_lib26();
      var SIGNIFICAND_MASK = require_lib27();
      var getHighWord = require_lib22();
      var getLowWord = require_lib28();
      var fromWords = require_lib29();
      var rempio2Kernel = require_kernel_rempio2();
      var rempio2Medium = require_rempio2_medium();
      var ZERO = 0;
      var TWO24 = 16777216;
      var PIO2_1 = 1.5707963267341256;
      var PIO2_1T = 6077100506506192e-26;
      var TWO_PIO2_1T = 2 * PIO2_1T;
      var THREE_PIO2_1T = 3 * PIO2_1T;
      var FOUR_PIO2_1T = 4 * PIO2_1T;
      var PI_HIGH_WORD_SIGNIFICAND = 598523 | 0;
      var PIO4_HIGH_WORD = 1072243195 | 0;
      var THREE_PIO4_HIGH_WORD = 1073928572 | 0;
      var FIVE_PIO4_HIGH_WORD = 1074752122 | 0;
      var THREE_PIO2_HIGH_WORD = 1074977148 | 0;
      var SEVEN_PIO4_HIGH_WORD = 1075183036 | 0;
      var TWO_PI_HIGH_WORD = 1075388923 | 0;
      var NINE_PIO4_HIGH_WORD = 1075594811 | 0;
      var MEDIUM = 1094263291 | 0;
      var TX = [0, 0, 0];
      var TY = [0, 0];
      function rempio2(x, y) {
        var low;
        var e0;
        var hx;
        var ix;
        var nx;
        var i;
        var n;
        var z;
        hx = getHighWord(x) | 0;
        ix = hx & ABS_MASK | 0;
        if (ix <= PIO4_HIGH_WORD) {
          y[0] = x;
          y[1] = 0;
          return 0;
        }
        if (ix <= FIVE_PIO4_HIGH_WORD) {
          if ((ix & SIGNIFICAND_MASK) === PI_HIGH_WORD_SIGNIFICAND) {
            return rempio2Medium(x, ix, y);
          }
          if (ix <= THREE_PIO4_HIGH_WORD) {
            if (hx > 0) {
              z = x - PIO2_1;
              y[0] = z - PIO2_1T;
              y[1] = z - y[0] - PIO2_1T;
              return 1;
            }
            z = x + PIO2_1;
            y[0] = z + PIO2_1T;
            y[1] = z - y[0] + PIO2_1T;
            return -1;
          }
          if (hx > 0) {
            z = x - 2 * PIO2_1;
            y[0] = z - TWO_PIO2_1T;
            y[1] = z - y[0] - TWO_PIO2_1T;
            return 2;
          }
          z = x + 2 * PIO2_1;
          y[0] = z + TWO_PIO2_1T;
          y[1] = z - y[0] + TWO_PIO2_1T;
          return -2;
        }
        if (ix <= NINE_PIO4_HIGH_WORD) {
          if (ix <= SEVEN_PIO4_HIGH_WORD) {
            if (ix === THREE_PIO2_HIGH_WORD) {
              return rempio2Medium(x, ix, y);
            }
            if (hx > 0) {
              z = x - 3 * PIO2_1;
              y[0] = z - THREE_PIO2_1T;
              y[1] = z - y[0] - THREE_PIO2_1T;
              return 3;
            }
            z = x + 3 * PIO2_1;
            y[0] = z + THREE_PIO2_1T;
            y[1] = z - y[0] + THREE_PIO2_1T;
            return -3;
          }
          if (ix === TWO_PI_HIGH_WORD) {
            return rempio2Medium(x, ix, y);
          }
          if (hx > 0) {
            z = x - 4 * PIO2_1;
            y[0] = z - FOUR_PIO2_1T;
            y[1] = z - y[0] - FOUR_PIO2_1T;
            return 4;
          }
          z = x + 4 * PIO2_1;
          y[0] = z + FOUR_PIO2_1T;
          y[1] = z - y[0] + FOUR_PIO2_1T;
          return -4;
        }
        if (ix < MEDIUM) {
          return rempio2Medium(x, ix, y);
        }
        if (ix >= EXPONENT_MASK) {
          y[0] = NaN;
          y[1] = NaN;
          return 0;
        }
        low = getLowWord(x);
        e0 = (ix >> 20) - 1046;
        z = fromWords(ix - (e0 << 20 | 0), low);
        for (i = 0; i < 2; i++) {
          TX[i] = z | 0;
          z = (z - TX[i]) * TWO24;
        }
        TX[2] = z;
        nx = 3;
        while (TX[nx - 1] === ZERO) {
          nx -= 1;
        }
        n = rempio2Kernel(TX, TY, e0, nx, 1);
        if (hx < 0) {
          y[0] = -TY[0];
          y[1] = -TY[1];
          return -n;
        }
        y[0] = TY[0];
        y[1] = TY[1];
        return n;
      }
      module.exports = rempio2;
    }
  });

  // node_modules/@stdlib/math-base-special-rempio2/lib/index.js
  var require_lib56 = __commonJS({
    "node_modules/@stdlib/math-base-special-rempio2/lib/index.js": function(exports, module) {
      "use strict";
      var rempio2 = require_main41();
      module.exports = rempio2;
    }
  });

  // node_modules/@stdlib/math-base-special-tan/lib/main.js
  var require_main42 = __commonJS({
    "node_modules/@stdlib/math-base-special-tan/lib/main.js": function(exports, module) {
      "use strict";
      var getHighWord = require_lib22();
      var kernelTan = require_lib24();
      var rempio2 = require_lib56();
      var HIGH_WORD_ABS_MASK = require_lib25();
      var HIGH_WORD_EXPONENT_MASK = require_lib26();
      var buffer = [0, 0];
      var HIGH_WORD_PIO4 = 1072243195 | 0;
      var HIGH_WORD_TWO_NEG_27 = 1044381696 | 0;
      function tan2(x) {
        var ix;
        var n;
        ix = getHighWord(x);
        ix &= HIGH_WORD_ABS_MASK;
        if (ix <= HIGH_WORD_PIO4) {
          if (ix < HIGH_WORD_TWO_NEG_27) {
            return x;
          }
          return kernelTan(x, 0, 1);
        }
        if (ix >= HIGH_WORD_EXPONENT_MASK) {
          return NaN;
        }
        n = rempio2(x, buffer);
        return kernelTan(buffer[0], buffer[1], 1 - ((n & 1) << 1));
      }
      module.exports = tan2;
    }
  });

  // node_modules/@stdlib/math-base-special-tan/lib/index.js
  var require_lib57 = __commonJS({
    "node_modules/@stdlib/math-base-special-tan/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main42();
      module.exports = main;
    }
  });

  // tan7-driver.js
  var tan = require_lib57();
  var out = typeof print === "function" ? print : console.log;
  var F64 = new Float64Array(1);
  var U32 = new Uint32Array(F64.buffer);
  var LE = new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  var HI = LE ? 1 : 0;
  var LO = LE ? 0 : 1;
  function hex8(n) {
    var s = n.toString(16);
    while (s.length < 8) {
      s = "0" + s;
    }
    return s;
  }
  function bits(x) {
    F64[0] = x;
    return hex8(U32[HI]) + hex8(U32[LO]);
  }
  var a = tan(7);
  var m = Math.tan(7);
  out("tan( 7 ) " + bits(a) + " " + a + " | Math.tan( 7 ) " + bits(m) + " " + m);
})();
/*! Bundled license information:

@stdlib/assert-has-symbol-support/lib/main.js:
@stdlib/assert-has-symbol-support/lib/index.js:
@stdlib/assert-has-tostringtag-support/lib/main.js:
@stdlib/assert-has-tostringtag-support/lib/index.js:
@stdlib/utils-native-class/lib/tostring.js:
@stdlib/utils-native-class/lib/main.js:
@stdlib/assert-has-own-property/lib/main.js:
@stdlib/assert-has-own-property/lib/index.js:
@stdlib/symbol-ctor/lib/main.js:
@stdlib/symbol-ctor/lib/index.js:
@stdlib/utils-native-class/lib/tostringtag.js:
@stdlib/utils-native-class/lib/polyfill.js:
@stdlib/utils-native-class/lib/index.js:
@stdlib/assert-is-uint32array/lib/main.js:
@stdlib/assert-is-uint32array/lib/index.js:
@stdlib/constants-uint32-max/lib/index.js:
@stdlib/assert-has-uint32array-support/lib/uint32array.js:
@stdlib/assert-has-uint32array-support/lib/main.js:
@stdlib/assert-has-uint32array-support/lib/index.js:
@stdlib/array-uint32/lib/main.js:
@stdlib/array-uint32/lib/polyfill.js:
@stdlib/array-uint32/lib/index.js:
@stdlib/assert-is-float64array/lib/main.js:
@stdlib/assert-is-float64array/lib/index.js:
@stdlib/assert-has-float64array-support/lib/float64array.js:
@stdlib/assert-has-float64array-support/lib/main.js:
@stdlib/assert-has-float64array-support/lib/index.js:
@stdlib/array-float64/lib/main.js:
@stdlib/array-float64/lib/polyfill.js:
@stdlib/array-float64/lib/index.js:
@stdlib/assert-is-uint8array/lib/main.js:
@stdlib/assert-is-uint8array/lib/index.js:
@stdlib/constants-uint8-max/lib/index.js:
@stdlib/assert-has-uint8array-support/lib/uint8array.js:
@stdlib/assert-has-uint8array-support/lib/main.js:
@stdlib/assert-has-uint8array-support/lib/index.js:
@stdlib/array-uint8/lib/main.js:
@stdlib/array-uint8/lib/polyfill.js:
@stdlib/array-uint8/lib/index.js:
@stdlib/assert-is-uint16array/lib/main.js:
@stdlib/assert-is-uint16array/lib/index.js:
@stdlib/constants-uint16-max/lib/index.js:
@stdlib/assert-has-uint16array-support/lib/uint16array.js:
@stdlib/assert-has-uint16array-support/lib/main.js:
@stdlib/assert-has-uint16array-support/lib/index.js:
@stdlib/array-uint16/lib/main.js:
@stdlib/array-uint16/lib/polyfill.js:
@stdlib/array-uint16/lib/index.js:
@stdlib/assert-is-little-endian/lib/ctors.js:
@stdlib/assert-is-little-endian/lib/main.js:
@stdlib/assert-is-little-endian/lib/index.js:
@stdlib/number-float64-base-get-high-word/lib/high.js:
@stdlib/number-float64-base-get-high-word/lib/main.js:
@stdlib/number-float64-base-get-high-word/lib/index.js:
@stdlib/number-float64-base-set-low-word/lib/low.js:
@stdlib/number-float64-base-set-low-word/lib/main.js:
@stdlib/number-float64-base-set-low-word/lib/index.js:
@stdlib/math-base-special-kernel-tan/lib/index.js:
@stdlib/constants-float64-high-word-exponent-mask/lib/index.js:
@stdlib/constants-float64-high-word-significand-mask/lib/index.js:
@stdlib/number-float64-base-get-low-word/lib/low.js:
@stdlib/number-float64-base-get-low-word/lib/main.js:
@stdlib/number-float64-base-get-low-word/lib/index.js:
@stdlib/number-float64-base-from-words/lib/indices.js:
@stdlib/number-float64-base-from-words/lib/main.js:
@stdlib/number-float64-base-from-words/lib/index.js:
@stdlib/math-base-special-floor/lib/main.js:
@stdlib/math-base-special-floor/lib/index.js:
@stdlib/constants-float64-pinf/lib/index.js:
@stdlib/number-ctor/lib/main.js:
@stdlib/number-ctor/lib/index.js:
@stdlib/constants-float64-ninf/lib/index.js:
@stdlib/constants-float64-exponent-bias/lib/index.js:
@stdlib/constants-float64-max-base2-exponent/lib/index.js:
@stdlib/constants-float64-max-base2-exponent-subnormal/lib/index.js:
@stdlib/constants-float64-min-base2-exponent-subnormal/lib/index.js:
@stdlib/math-base-assert-is-nan/lib/main.js:
@stdlib/math-base-assert-is-nan/lib/index.js:
@stdlib/math-base-assert-is-infinite/lib/main.js:
@stdlib/math-base-assert-is-infinite/lib/index.js:
@stdlib/utils-define-property/lib/builtin.js:
@stdlib/utils-define-property/lib/polyfill.js:
@stdlib/utils-define-property/lib/index.js:
@stdlib/utils-define-nonenumerable-read-only-property/lib/main.js:
@stdlib/utils-define-nonenumerable-read-only-property/lib/index.js:
@stdlib/number-float64-base-to-words/lib/indices.js:
@stdlib/number-float64-base-to-words/lib/assign.js:
@stdlib/number-float64-base-to-words/lib/main.js:
@stdlib/number-float64-base-to-words/lib/index.js:
@stdlib/math-base-special-copysign/lib/main.js:
@stdlib/math-base-special-copysign/lib/index.js:
@stdlib/constants-float64-smallest-normal/lib/index.js:
@stdlib/math-base-special-abs/lib/index.js:
@stdlib/number-float64-base-normalize/lib/assign.js:
@stdlib/number-float64-base-normalize/lib/main.js:
@stdlib/number-float64-base-normalize/lib/index.js:
@stdlib/number-float64-base-exponent/lib/main.js:
@stdlib/number-float64-base-exponent/lib/index.js:
@stdlib/math-base-special-ldexp/lib/main.js:
@stdlib/math-base-special-ldexp/lib/index.js:
@stdlib/math-base-special-round/lib/main.js:
@stdlib/math-base-special-round/lib/index.js:
@stdlib/math-base-special-rempio2/lib/index.js:
@stdlib/math-base-special-tan/lib/index.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)

@stdlib/math-base-special-kernel-tan/lib/polyval_t_odd.js:
@stdlib/math-base-special-kernel-tan/lib/polyval_t_even.js:
@stdlib/constants-float64-high-word-abs-mask/lib/index.js:
@stdlib/constants-float64-high-word-sign-mask/lib/index.js:
@stdlib/string-base-format-interpolate/lib/is_number.js:
@stdlib/string-base-format-interpolate/lib/zero_pad.js:
@stdlib/string-base-format-interpolate/lib/format_integer.js:
@stdlib/string-base-format-interpolate/lib/is_string.js:
@stdlib/string-base-format-interpolate/lib/format_double.js:
@stdlib/string-base-format-interpolate/lib/space_pad.js:
@stdlib/string-base-format-interpolate/lib/main.js:
@stdlib/string-base-format-interpolate/lib/index.js:
@stdlib/string-base-format-tokenize/lib/main.js:
@stdlib/string-base-format-tokenize/lib/index.js:
@stdlib/string-format/lib/is_string.js:
@stdlib/string-format/lib/main.js:
@stdlib/string-format/lib/index.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2022 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)

@stdlib/math-base-special-kernel-tan/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/12.2.0/lib/msun/src/k_tan.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  * ```
  *)

@stdlib/utils-define-property/lib/define_property.js:
@stdlib/utils-define-property/lib/has_define_property_support.js:
@stdlib/math-base-special-abs/lib/main.js:
@stdlib/array-base-filled/lib/main.js:
@stdlib/array-base-filled/lib/index.js:
@stdlib/array-base-zeros/lib/main.js:
@stdlib/array-base-zeros/lib/index.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2021 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)

@stdlib/math-base-special-rempio2/lib/kernel_rempio2.js:
@stdlib/math-base-special-rempio2/lib/rempio2_medium.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_rem_pio2.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  * ```
  *)

@stdlib/math-base-special-rempio2/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_rem_pio2.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  *
  * Optimized by Bruce D. Evans.
  * ```
  *)

@stdlib/math-base-special-tan/lib/main.js:
  (**
  * @license Apache-2.0
  *
  * Copyright (c) 2018 The Stdlib Authors.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *    http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *
  *
  * ## Notice
  *
  * The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_tan.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
  *
  * Developed at SunPro, a Sun Microsystems, Inc. business.
  * Permission to use, copy, modify, and distribute this
  * software is freely granted, provided that this notice
  * is preserved.
  * ```
  *)
*/
