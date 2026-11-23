(function() {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = function(cb, mod) {
    return function __require() {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
  };

  // node_modules/@stdlib/math-base-assert-is-nan/lib/main.js
  var require_main = __commonJS({
    "node_modules/@stdlib/math-base-assert-is-nan/lib/main.js": function(exports, module) {
      "use strict";
      function isnan(x2) {
        return x2 !== x2;
      }
      module.exports = isnan;
    }
  });

  // node_modules/@stdlib/math-base-assert-is-nan/lib/index.js
  var require_lib = __commonJS({
    "node_modules/@stdlib/math-base-assert-is-nan/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/math-base-special-floor/lib/main.js
  var require_main2 = __commonJS({
    "node_modules/@stdlib/math-base-special-floor/lib/main.js": function(exports, module) {
      "use strict";
      var floor = Math.floor;
      module.exports = floor;
    }
  });

  // node_modules/@stdlib/math-base-special-floor/lib/index.js
  var require_lib2 = __commonJS({
    "node_modules/@stdlib/math-base-special-floor/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main2();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/math-base-special-ceil/lib/main.js
  var require_main3 = __commonJS({
    "node_modules/@stdlib/math-base-special-ceil/lib/main.js": function(exports, module) {
      "use strict";
      var ceil = Math.ceil;
      module.exports = ceil;
    }
  });

  // node_modules/@stdlib/math-base-special-ceil/lib/index.js
  var require_lib3 = __commonJS({
    "node_modules/@stdlib/math-base-special-ceil/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main3();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/math-base-special-trunc/lib/main.js
  var require_main4 = __commonJS({
    "node_modules/@stdlib/math-base-special-trunc/lib/main.js": function(exports, module) {
      "use strict";
      var floor = require_lib2();
      var ceil = require_lib3();
      function trunc(x2) {
        if (x2 < 0) {
          return ceil(x2);
        }
        return floor(x2);
      }
      module.exports = trunc;
    }
  });

  // node_modules/@stdlib/math-base-special-trunc/lib/index.js
  var require_lib4 = __commonJS({
    "node_modules/@stdlib/math-base-special-trunc/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main4();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/number-ctor/lib/main.js
  var require_main5 = __commonJS({
    "node_modules/@stdlib/number-ctor/lib/main.js": function(exports, module) {
      "use strict";
      module.exports = Number;
    }
  });

  // node_modules/@stdlib/number-ctor/lib/index.js
  var require_lib5 = __commonJS({
    "node_modules/@stdlib/number-ctor/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main5();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/constants-float64-ninf/lib/index.js
  var require_lib6 = __commonJS({
    "node_modules/@stdlib/constants-float64-ninf/lib/index.js": function(exports, module) {
      "use strict";
      var Number2 = require_lib5();
      var FLOAT64_NINF = Number2.NEGATIVE_INFINITY;
      module.exports = FLOAT64_NINF;
    }
  });

  // node_modules/@stdlib/constants-float64-pinf/lib/index.js
  var require_lib7 = __commonJS({
    "node_modules/@stdlib/constants-float64-pinf/lib/index.js": function(exports, module) {
      "use strict";
      var FLOAT64_PINF = Number.POSITIVE_INFINITY;
      module.exports = FLOAT64_PINF;
    }
  });

  // node_modules/@stdlib/constants-float64-exponent-bias/lib/index.js
  var require_lib8 = __commonJS({
    "node_modules/@stdlib/constants-float64-exponent-bias/lib/index.js": function(exports, module) {
      "use strict";
      var FLOAT64_EXPONENT_BIAS = 1023 | 0;
      module.exports = FLOAT64_EXPONENT_BIAS;
    }
  });

  // node_modules/@stdlib/constants-float64-max-base2-exponent/lib/index.js
  var require_lib9 = __commonJS({
    "node_modules/@stdlib/constants-float64-max-base2-exponent/lib/index.js": function(exports, module) {
      "use strict";
      var FLOAT64_MAX_BASE2_EXPONENT = 1023 | 0;
      module.exports = FLOAT64_MAX_BASE2_EXPONENT;
    }
  });

  // node_modules/@stdlib/constants-float64-max-base2-exponent-subnormal/lib/index.js
  var require_lib10 = __commonJS({
    "node_modules/@stdlib/constants-float64-max-base2-exponent-subnormal/lib/index.js": function(exports, module) {
      "use strict";
      var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = -1023 | 0;
      module.exports = FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL;
    }
  });

  // node_modules/@stdlib/constants-float64-min-base2-exponent-subnormal/lib/index.js
  var require_lib11 = __commonJS({
    "node_modules/@stdlib/constants-float64-min-base2-exponent-subnormal/lib/index.js": function(exports, module) {
      "use strict";
      var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = -1074 | 0;
      module.exports = FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL;
    }
  });

  // node_modules/@stdlib/math-base-assert-is-infinite/lib/main.js
  var require_main6 = __commonJS({
    "node_modules/@stdlib/math-base-assert-is-infinite/lib/main.js": function(exports, module) {
      "use strict";
      var PINF = require_lib7();
      var NINF = require_lib6();
      function isInfinite(x2) {
        return x2 === PINF || x2 === NINF;
      }
      module.exports = isInfinite;
    }
  });

  // node_modules/@stdlib/math-base-assert-is-infinite/lib/index.js
  var require_lib12 = __commonJS({
    "node_modules/@stdlib/math-base-assert-is-infinite/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main6();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/constants-float64-high-word-sign-mask/lib/index.js
  var require_lib13 = __commonJS({
    "node_modules/@stdlib/constants-float64-high-word-sign-mask/lib/index.js": function(exports, module) {
      "use strict";
      var FLOAT64_HIGH_WORD_SIGN_MASK = 2147483648 >>> 0;
      module.exports = FLOAT64_HIGH_WORD_SIGN_MASK;
    }
  });

  // node_modules/@stdlib/constants-float64-high-word-abs-mask/lib/index.js
  var require_lib14 = __commonJS({
    "node_modules/@stdlib/constants-float64-high-word-abs-mask/lib/index.js": function(exports, module) {
      "use strict";
      var FLOAT64_HIGH_WORD_ABS_MASK = 2147483647 >>> 0;
      module.exports = FLOAT64_HIGH_WORD_ABS_MASK;
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
      function zeros(n2) {
        var out2 = "";
        var i2;
        for (i2 = 0; i2 < n2; i2++) {
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
        var i2;
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
        i2 = parseInt(out2, 10);
        if (!isFinite(i2)) {
          if (!isNumber(out2)) {
            throw new Error("invalid integer. Value: " + out2);
          }
          i2 = 0;
        }
        if (i2 < 0 && (token.specifier === "u" || base !== 10)) {
          i2 = 4294967295 + i2 + 1;
        }
        if (i2 < 0) {
          out2 = (-i2).toString(base);
          if (token.precision) {
            out2 = zeroPad(out2, token.precision, token.padRight);
          }
          out2 = "-" + out2;
        } else {
          out2 = i2.toString(base);
          if (!i2 && !token.precision) {
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
      function spaces(n2) {
        var out2 = "";
        var i2;
        for (i2 = 0; i2 < n2; i2++) {
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
  var require_main7 = __commonJS({
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
        var i2;
        var j;
        if (!isArray(tokens)) {
          throw new TypeError("invalid argument. First argument must be an array. Value: `" + tokens + "`.");
        }
        out2 = "";
        pos = 1;
        for (i2 = 0; i2 < tokens.length; i2++) {
          token = tokens[i2];
          if (isString(token)) {
            out2 += token;
          } else {
            hasPeriod = token.precision !== void 0;
            token = initialize(token);
            if (!token.specifier) {
              throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `" + i2 + "`. Value: `" + token + "`.");
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
  var require_lib15 = __commonJS({
    "node_modules/@stdlib/string-base-format-interpolate/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main7();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/string-base-format-tokenize/lib/main.js
  var require_main8 = __commonJS({
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
  var require_lib16 = __commonJS({
    "node_modules/@stdlib/string-base-format-tokenize/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main8();
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
  var require_main9 = __commonJS({
    "node_modules/@stdlib/string-format/lib/main.js": function(exports, module) {
      "use strict";
      var interpolate = require_lib15();
      var tokenize = require_lib16();
      var isString = require_is_string2();
      function format(str) {
        var args;
        var i2;
        if (!isString(str)) {
          throw new TypeError(format("invalid argument. First argument must be a string. Value: `%s`.", str));
        }
        args = [tokenize(str)];
        for (i2 = 1; i2 < arguments.length; i2++) {
          args.push(arguments[i2]);
        }
        return interpolate.apply(null, args);
      }
      module.exports = format;
    }
  });

  // node_modules/@stdlib/string-format/lib/index.js
  var require_lib17 = __commonJS({
    "node_modules/@stdlib/string-format/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main9();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/utils-define-property/lib/polyfill.js
  var require_polyfill = __commonJS({
    "node_modules/@stdlib/utils-define-property/lib/polyfill.js": function(exports, module) {
      "use strict";
      var format = require_lib17();
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
  var require_lib18 = __commonJS({
    "node_modules/@stdlib/utils-define-property/lib/index.js": function(exports, module) {
      "use strict";
      var hasDefinePropertySupport = require_has_define_property_support();
      var builtin = require_builtin();
      var polyfill = require_polyfill();
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
  var require_main10 = __commonJS({
    "node_modules/@stdlib/utils-define-nonenumerable-read-only-property/lib/main.js": function(exports, module) {
      "use strict";
      var defineProperty = require_lib18();
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
  var require_lib19 = __commonJS({
    "node_modules/@stdlib/utils-define-nonenumerable-read-only-property/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main10();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/assert-has-symbol-support/lib/main.js
  var require_main11 = __commonJS({
    "node_modules/@stdlib/assert-has-symbol-support/lib/main.js": function(exports, module) {
      "use strict";
      function hasSymbolSupport() {
        return typeof Symbol === "function" && typeof Symbol("foo") === "symbol";
      }
      module.exports = hasSymbolSupport;
    }
  });

  // node_modules/@stdlib/assert-has-symbol-support/lib/index.js
  var require_lib20 = __commonJS({
    "node_modules/@stdlib/assert-has-symbol-support/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main11();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/assert-has-tostringtag-support/lib/main.js
  var require_main12 = __commonJS({
    "node_modules/@stdlib/assert-has-tostringtag-support/lib/main.js": function(exports, module) {
      "use strict";
      var hasSymbols = require_lib20();
      var FLG = hasSymbols();
      function hasToStringTagSupport() {
        return FLG && typeof Symbol.toStringTag === "symbol";
      }
      module.exports = hasToStringTagSupport;
    }
  });

  // node_modules/@stdlib/assert-has-tostringtag-support/lib/index.js
  var require_lib21 = __commonJS({
    "node_modules/@stdlib/assert-has-tostringtag-support/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main12();
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
  var require_main13 = __commonJS({
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
  var require_main14 = __commonJS({
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
  var require_lib22 = __commonJS({
    "node_modules/@stdlib/assert-has-own-property/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main14();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/symbol-ctor/lib/main.js
  var require_main15 = __commonJS({
    "node_modules/@stdlib/symbol-ctor/lib/main.js": function(exports, module) {
      "use strict";
      var Sym = typeof Symbol === "function" ? Symbol : void 0;
      module.exports = Sym;
    }
  });

  // node_modules/@stdlib/symbol-ctor/lib/index.js
  var require_lib23 = __commonJS({
    "node_modules/@stdlib/symbol-ctor/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main15();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/utils-native-class/lib/tostringtag.js
  var require_tostringtag = __commonJS({
    "node_modules/@stdlib/utils-native-class/lib/tostringtag.js": function(exports, module) {
      "use strict";
      var Symbol2 = require_lib23();
      var toStrTag = typeof Symbol2 === "function" ? Symbol2.toStringTag : "";
      module.exports = toStrTag;
    }
  });

  // node_modules/@stdlib/utils-native-class/lib/polyfill.js
  var require_polyfill2 = __commonJS({
    "node_modules/@stdlib/utils-native-class/lib/polyfill.js": function(exports, module) {
      "use strict";
      var hasOwnProp = require_lib22();
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
  var require_lib24 = __commonJS({
    "node_modules/@stdlib/utils-native-class/lib/index.js": function(exports, module) {
      "use strict";
      var hasToStringTag = require_lib21();
      var builtin = require_main13();
      var polyfill = require_polyfill2();
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
  var require_main16 = __commonJS({
    "node_modules/@stdlib/assert-is-uint32array/lib/main.js": function(exports, module) {
      "use strict";
      var nativeClass = require_lib24();
      var hasUint32Array = typeof Uint32Array === "function";
      function isUint32Array(value) {
        return hasUint32Array && value instanceof Uint32Array || // eslint-disable-line stdlib/require-globals
        nativeClass(value) === "[object Uint32Array]";
      }
      module.exports = isUint32Array;
    }
  });

  // node_modules/@stdlib/assert-is-uint32array/lib/index.js
  var require_lib25 = __commonJS({
    "node_modules/@stdlib/assert-is-uint32array/lib/index.js": function(exports, module) {
      "use strict";
      var isUint32Array = require_main16();
      module.exports = isUint32Array;
    }
  });

  // node_modules/@stdlib/constants-uint32-max/lib/index.js
  var require_lib26 = __commonJS({
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
  var require_main17 = __commonJS({
    "node_modules/@stdlib/assert-has-uint32array-support/lib/main.js": function(exports, module) {
      "use strict";
      var isUint32Array = require_lib25();
      var UINT32_MAX = require_lib26();
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
  var require_lib27 = __commonJS({
    "node_modules/@stdlib/assert-has-uint32array-support/lib/index.js": function(exports, module) {
      "use strict";
      var hasUint32ArraySupport = require_main17();
      module.exports = hasUint32ArraySupport;
    }
  });

  // node_modules/@stdlib/array-uint32/lib/main.js
  var require_main18 = __commonJS({
    "node_modules/@stdlib/array-uint32/lib/main.js": function(exports, module) {
      "use strict";
      var ctor = typeof Uint32Array === "function" ? Uint32Array : void 0;
      module.exports = ctor;
    }
  });

  // node_modules/@stdlib/array-uint32/lib/polyfill.js
  var require_polyfill3 = __commonJS({
    "node_modules/@stdlib/array-uint32/lib/polyfill.js": function(exports, module) {
      "use strict";
      function polyfill() {
        throw new Error("not implemented");
      }
      module.exports = polyfill;
    }
  });

  // node_modules/@stdlib/array-uint32/lib/index.js
  var require_lib28 = __commonJS({
    "node_modules/@stdlib/array-uint32/lib/index.js": function(exports, module) {
      "use strict";
      var hasUint32ArraySupport = require_lib27();
      var builtin = require_main18();
      var polyfill = require_polyfill3();
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
  var require_main19 = __commonJS({
    "node_modules/@stdlib/assert-is-float64array/lib/main.js": function(exports, module) {
      "use strict";
      var nativeClass = require_lib24();
      var hasFloat64Array = typeof Float64Array === "function";
      function isFloat64Array(value) {
        return hasFloat64Array && value instanceof Float64Array || // eslint-disable-line stdlib/require-globals
        nativeClass(value) === "[object Float64Array]";
      }
      module.exports = isFloat64Array;
    }
  });

  // node_modules/@stdlib/assert-is-float64array/lib/index.js
  var require_lib29 = __commonJS({
    "node_modules/@stdlib/assert-is-float64array/lib/index.js": function(exports, module) {
      "use strict";
      var isFloat64Array = require_main19();
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
  var require_main20 = __commonJS({
    "node_modules/@stdlib/assert-has-float64array-support/lib/main.js": function(exports, module) {
      "use strict";
      var isFloat64Array = require_lib29();
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
  var require_lib30 = __commonJS({
    "node_modules/@stdlib/assert-has-float64array-support/lib/index.js": function(exports, module) {
      "use strict";
      var hasFloat64ArraySupport = require_main20();
      module.exports = hasFloat64ArraySupport;
    }
  });

  // node_modules/@stdlib/array-float64/lib/main.js
  var require_main21 = __commonJS({
    "node_modules/@stdlib/array-float64/lib/main.js": function(exports, module) {
      "use strict";
      var ctor = typeof Float64Array === "function" ? Float64Array : void 0;
      module.exports = ctor;
    }
  });

  // node_modules/@stdlib/array-float64/lib/polyfill.js
  var require_polyfill4 = __commonJS({
    "node_modules/@stdlib/array-float64/lib/polyfill.js": function(exports, module) {
      "use strict";
      function polyfill() {
        throw new Error("not implemented");
      }
      module.exports = polyfill;
    }
  });

  // node_modules/@stdlib/array-float64/lib/index.js
  var require_lib31 = __commonJS({
    "node_modules/@stdlib/array-float64/lib/index.js": function(exports, module) {
      "use strict";
      var hasFloat64ArraySupport = require_lib30();
      var builtin = require_main21();
      var polyfill = require_polyfill4();
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
  var require_main22 = __commonJS({
    "node_modules/@stdlib/assert-is-uint8array/lib/main.js": function(exports, module) {
      "use strict";
      var nativeClass = require_lib24();
      var hasUint8Array = typeof Uint8Array === "function";
      function isUint8Array(value) {
        return hasUint8Array && value instanceof Uint8Array || // eslint-disable-line stdlib/require-globals
        nativeClass(value) === "[object Uint8Array]";
      }
      module.exports = isUint8Array;
    }
  });

  // node_modules/@stdlib/assert-is-uint8array/lib/index.js
  var require_lib32 = __commonJS({
    "node_modules/@stdlib/assert-is-uint8array/lib/index.js": function(exports, module) {
      "use strict";
      var isUint8Array = require_main22();
      module.exports = isUint8Array;
    }
  });

  // node_modules/@stdlib/constants-uint8-max/lib/index.js
  var require_lib33 = __commonJS({
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
  var require_main23 = __commonJS({
    "node_modules/@stdlib/assert-has-uint8array-support/lib/main.js": function(exports, module) {
      "use strict";
      var isUint8Array = require_lib32();
      var UINT8_MAX = require_lib33();
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
  var require_lib34 = __commonJS({
    "node_modules/@stdlib/assert-has-uint8array-support/lib/index.js": function(exports, module) {
      "use strict";
      var hasUint8ArraySupport = require_main23();
      module.exports = hasUint8ArraySupport;
    }
  });

  // node_modules/@stdlib/array-uint8/lib/main.js
  var require_main24 = __commonJS({
    "node_modules/@stdlib/array-uint8/lib/main.js": function(exports, module) {
      "use strict";
      var ctor = typeof Uint8Array === "function" ? Uint8Array : void 0;
      module.exports = ctor;
    }
  });

  // node_modules/@stdlib/array-uint8/lib/polyfill.js
  var require_polyfill5 = __commonJS({
    "node_modules/@stdlib/array-uint8/lib/polyfill.js": function(exports, module) {
      "use strict";
      function polyfill() {
        throw new Error("not implemented");
      }
      module.exports = polyfill;
    }
  });

  // node_modules/@stdlib/array-uint8/lib/index.js
  var require_lib35 = __commonJS({
    "node_modules/@stdlib/array-uint8/lib/index.js": function(exports, module) {
      "use strict";
      var hasUint8ArraySupport = require_lib34();
      var builtin = require_main24();
      var polyfill = require_polyfill5();
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
  var require_main25 = __commonJS({
    "node_modules/@stdlib/assert-is-uint16array/lib/main.js": function(exports, module) {
      "use strict";
      var nativeClass = require_lib24();
      var hasUint16Array = typeof Uint16Array === "function";
      function isUint16Array(value) {
        return hasUint16Array && value instanceof Uint16Array || // eslint-disable-line stdlib/require-globals
        nativeClass(value) === "[object Uint16Array]";
      }
      module.exports = isUint16Array;
    }
  });

  // node_modules/@stdlib/assert-is-uint16array/lib/index.js
  var require_lib36 = __commonJS({
    "node_modules/@stdlib/assert-is-uint16array/lib/index.js": function(exports, module) {
      "use strict";
      var isUint16Array = require_main25();
      module.exports = isUint16Array;
    }
  });

  // node_modules/@stdlib/constants-uint16-max/lib/index.js
  var require_lib37 = __commonJS({
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
  var require_main26 = __commonJS({
    "node_modules/@stdlib/assert-has-uint16array-support/lib/main.js": function(exports, module) {
      "use strict";
      var isUint16Array = require_lib36();
      var UINT16_MAX = require_lib37();
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
  var require_lib38 = __commonJS({
    "node_modules/@stdlib/assert-has-uint16array-support/lib/index.js": function(exports, module) {
      "use strict";
      var hasUint16ArraySupport = require_main26();
      module.exports = hasUint16ArraySupport;
    }
  });

  // node_modules/@stdlib/array-uint16/lib/main.js
  var require_main27 = __commonJS({
    "node_modules/@stdlib/array-uint16/lib/main.js": function(exports, module) {
      "use strict";
      var ctor = typeof Uint16Array === "function" ? Uint16Array : void 0;
      module.exports = ctor;
    }
  });

  // node_modules/@stdlib/array-uint16/lib/polyfill.js
  var require_polyfill6 = __commonJS({
    "node_modules/@stdlib/array-uint16/lib/polyfill.js": function(exports, module) {
      "use strict";
      function polyfill() {
        throw new Error("not implemented");
      }
      module.exports = polyfill;
    }
  });

  // node_modules/@stdlib/array-uint16/lib/index.js
  var require_lib39 = __commonJS({
    "node_modules/@stdlib/array-uint16/lib/index.js": function(exports, module) {
      "use strict";
      var hasUint16ArraySupport = require_lib38();
      var builtin = require_main27();
      var polyfill = require_polyfill6();
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
      var Uint8Array2 = require_lib35();
      var Uint16Array2 = require_lib39();
      var ctors = {
        "uint16": Uint16Array2,
        "uint8": Uint8Array2
      };
      module.exports = ctors;
    }
  });

  // node_modules/@stdlib/assert-is-little-endian/lib/main.js
  var require_main28 = __commonJS({
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
  var require_lib40 = __commonJS({
    "node_modules/@stdlib/assert-is-little-endian/lib/index.js": function(exports, module) {
      "use strict";
      var IS_LITTLE_ENDIAN = require_main28();
      module.exports = IS_LITTLE_ENDIAN;
    }
  });

  // node_modules/@stdlib/number-float64-base-to-words/lib/indices.js
  var require_indices = __commonJS({
    "node_modules/@stdlib/number-float64-base-to-words/lib/indices.js": function(exports, module) {
      "use strict";
      var isLittleEndian = require_lib40();
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
      var Uint32Array2 = require_lib28();
      var Float64Array2 = require_lib31();
      var indices = require_indices();
      var FLOAT64_VIEW = new Float64Array2(1);
      var UINT32_VIEW = new Uint32Array2(FLOAT64_VIEW.buffer);
      var HIGH = indices.HIGH;
      var LOW = indices.LOW;
      function toWords(x2, out2, stride, offset) {
        FLOAT64_VIEW[0] = x2;
        out2[offset] = UINT32_VIEW[HIGH];
        out2[offset + stride] = UINT32_VIEW[LOW];
        return out2;
      }
      module.exports = toWords;
    }
  });

  // node_modules/@stdlib/number-float64-base-to-words/lib/main.js
  var require_main29 = __commonJS({
    "node_modules/@stdlib/number-float64-base-to-words/lib/main.js": function(exports, module) {
      "use strict";
      var fcn = require_assign();
      function toWords(x2) {
        return fcn(x2, [0 >>> 0, 0 >>> 0], 1, 0);
      }
      module.exports = toWords;
    }
  });

  // node_modules/@stdlib/number-float64-base-to-words/lib/index.js
  var require_lib41 = __commonJS({
    "node_modules/@stdlib/number-float64-base-to-words/lib/index.js": function(exports, module) {
      "use strict";
      var setReadOnly = require_lib19();
      var main = require_main29();
      var assign = require_assign();
      setReadOnly(main, "assign", assign);
      module.exports = main;
    }
  });

  // node_modules/@stdlib/number-float64-base-get-high-word/lib/high.js
  var require_high = __commonJS({
    "node_modules/@stdlib/number-float64-base-get-high-word/lib/high.js": function(exports, module) {
      "use strict";
      var isLittleEndian = require_lib40();
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
  var require_main30 = __commonJS({
    "node_modules/@stdlib/number-float64-base-get-high-word/lib/main.js": function(exports, module) {
      "use strict";
      var Uint32Array2 = require_lib28();
      var Float64Array2 = require_lib31();
      var HIGH = require_high();
      var FLOAT64_VIEW = new Float64Array2(1);
      var UINT32_VIEW = new Uint32Array2(FLOAT64_VIEW.buffer);
      function getHighWord(x2) {
        FLOAT64_VIEW[0] = x2;
        return UINT32_VIEW[HIGH];
      }
      module.exports = getHighWord;
    }
  });

  // node_modules/@stdlib/number-float64-base-get-high-word/lib/index.js
  var require_lib42 = __commonJS({
    "node_modules/@stdlib/number-float64-base-get-high-word/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main30();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/number-float64-base-from-words/lib/indices.js
  var require_indices2 = __commonJS({
    "node_modules/@stdlib/number-float64-base-from-words/lib/indices.js": function(exports, module) {
      "use strict";
      var isLittleEndian = require_lib40();
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
  var require_main31 = __commonJS({
    "node_modules/@stdlib/number-float64-base-from-words/lib/main.js": function(exports, module) {
      "use strict";
      var Uint32Array2 = require_lib28();
      var Float64Array2 = require_lib31();
      var indices = require_indices2();
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
  var require_lib43 = __commonJS({
    "node_modules/@stdlib/number-float64-base-from-words/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main31();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/math-base-special-copysign/lib/main.js
  var require_main32 = __commonJS({
    "node_modules/@stdlib/math-base-special-copysign/lib/main.js": function(exports, module) {
      "use strict";
      var SIGN_MASK = require_lib13();
      var ABS_MASK = require_lib14();
      var toWords = require_lib41();
      var getHighWord = require_lib42();
      var fromWords = require_lib43();
      var WORDS = [0, 0];
      function copysign(x2, y) {
        var hx;
        var hy;
        toWords.assign(x2, WORDS, 1, 0);
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
  var require_lib44 = __commonJS({
    "node_modules/@stdlib/math-base-special-copysign/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main32();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/constants-float64-smallest-normal/lib/index.js
  var require_lib45 = __commonJS({
    "node_modules/@stdlib/constants-float64-smallest-normal/lib/index.js": function(exports, module) {
      "use strict";
      var FLOAT64_SMALLEST_NORMAL = 22250738585072014e-324;
      module.exports = FLOAT64_SMALLEST_NORMAL;
    }
  });

  // node_modules/@stdlib/math-base-special-abs/lib/main.js
  var require_main33 = __commonJS({
    "node_modules/@stdlib/math-base-special-abs/lib/main.js": function(exports, module) {
      "use strict";
      function abs(x2) {
        return Math.abs(x2);
      }
      module.exports = abs;
    }
  });

  // node_modules/@stdlib/math-base-special-abs/lib/index.js
  var require_lib46 = __commonJS({
    "node_modules/@stdlib/math-base-special-abs/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main33();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/number-float64-base-normalize/lib/assign.js
  var require_assign2 = __commonJS({
    "node_modules/@stdlib/number-float64-base-normalize/lib/assign.js": function(exports, module) {
      "use strict";
      var FLOAT64_SMALLEST_NORMAL = require_lib45();
      var isInfinite = require_lib12();
      var isnan = require_lib();
      var abs = require_lib46();
      var SCALAR = 4503599627370496;
      function normalize(x2, out2, stride, offset) {
        if (isnan(x2) || isInfinite(x2)) {
          out2[offset] = x2;
          out2[offset + stride] = 0;
          return out2;
        }
        if (x2 !== 0 && abs(x2) < FLOAT64_SMALLEST_NORMAL) {
          out2[offset] = x2 * SCALAR;
          out2[offset + stride] = -52;
          return out2;
        }
        out2[offset] = x2;
        out2[offset + stride] = 0;
        return out2;
      }
      module.exports = normalize;
    }
  });

  // node_modules/@stdlib/number-float64-base-normalize/lib/main.js
  var require_main34 = __commonJS({
    "node_modules/@stdlib/number-float64-base-normalize/lib/main.js": function(exports, module) {
      "use strict";
      var fcn = require_assign2();
      function normalize(x2) {
        return fcn(x2, [0, 0], 1, 0);
      }
      module.exports = normalize;
    }
  });

  // node_modules/@stdlib/number-float64-base-normalize/lib/index.js
  var require_lib47 = __commonJS({
    "node_modules/@stdlib/number-float64-base-normalize/lib/index.js": function(exports, module) {
      "use strict";
      var setReadOnly = require_lib19();
      var main = require_main34();
      var assign = require_assign2();
      setReadOnly(main, "assign", assign);
      module.exports = main;
    }
  });

  // node_modules/@stdlib/constants-float64-high-word-exponent-mask/lib/index.js
  var require_lib48 = __commonJS({
    "node_modules/@stdlib/constants-float64-high-word-exponent-mask/lib/index.js": function(exports, module) {
      "use strict";
      var FLOAT64_HIGH_WORD_EXPONENT_MASK = 2146435072;
      module.exports = FLOAT64_HIGH_WORD_EXPONENT_MASK;
    }
  });

  // node_modules/@stdlib/number-float64-base-exponent/lib/main.js
  var require_main35 = __commonJS({
    "node_modules/@stdlib/number-float64-base-exponent/lib/main.js": function(exports, module) {
      "use strict";
      var getHighWord = require_lib42();
      var EXP_MASK = require_lib48();
      var BIAS = require_lib8();
      function exponent(x2) {
        var high = getHighWord(x2);
        high = (high & EXP_MASK) >>> 20;
        return high - BIAS | 0;
      }
      module.exports = exponent;
    }
  });

  // node_modules/@stdlib/number-float64-base-exponent/lib/index.js
  var require_lib49 = __commonJS({
    "node_modules/@stdlib/number-float64-base-exponent/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main35();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/math-base-special-ldexp/lib/main.js
  var require_main36 = __commonJS({
    "node_modules/@stdlib/math-base-special-ldexp/lib/main.js": function(exports, module) {
      "use strict";
      var PINF = require_lib7();
      var NINF = require_lib6();
      var BIAS = require_lib8();
      var MAX_EXPONENT = require_lib9();
      var MAX_SUBNORMAL_EXPONENT = require_lib10();
      var MIN_SUBNORMAL_EXPONENT = require_lib11();
      var isnan = require_lib();
      var isInfinite = require_lib12();
      var copysign = require_lib44();
      var normalize = require_lib47().assign;
      var floatExp = require_lib49();
      var toWords = require_lib41();
      var fromWords = require_lib43();
      var TWO52_INV = 2220446049250313e-31;
      var CLEAR_EXP_MASK = 2148532223 >>> 0;
      var FRAC = [0, 0];
      var WORDS = [0, 0];
      function ldexp2(frac, exp) {
        var high;
        var m;
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
          m = TWO52_INV;
        } else {
          m = 1;
        }
        toWords.assign(frac, WORDS, 1, 0);
        high = WORDS[0];
        high &= CLEAR_EXP_MASK;
        high |= exp + BIAS << 20;
        return m * fromWords(high, WORDS[1]);
      }
      module.exports = ldexp2;
    }
  });

  // node_modules/@stdlib/math-base-special-ldexp/lib/index.js
  var require_lib50 = __commonJS({
    "node_modules/@stdlib/math-base-special-ldexp/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main36();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/math-base-special-exp/lib/polyval_p.js
  var require_polyval_p = __commonJS({
    "node_modules/@stdlib/math-base-special-exp/lib/polyval_p.js": function(exports, module) {
      "use strict";
      function evalpoly(x2) {
        if (x2 === 0) {
          return 0.16666666666666602;
        }
        return 0.16666666666666602 + x2 * (-0.0027777777777015593 + x2 * (6613756321437934e-20 + x2 * (-16533902205465252e-22 + x2 * 41381367970572385e-24)));
      }
      module.exports = evalpoly;
    }
  });

  // node_modules/@stdlib/math-base-special-exp/lib/expmulti.js
  var require_expmulti = __commonJS({
    "node_modules/@stdlib/math-base-special-exp/lib/expmulti.js": function(exports, module) {
      "use strict";
      var ldexp2 = require_lib50();
      var polyvalP = require_polyval_p();
      function expmulti(hi, lo, k) {
        var r;
        var t;
        var c;
        var y;
        r = hi - lo;
        t = r * r;
        c = r - t * polyvalP(t);
        y = 1 - (lo - r * c / (2 - c) - hi);
        return ldexp2(y, k);
      }
      module.exports = expmulti;
    }
  });

  // node_modules/@stdlib/math-base-special-exp/lib/main.js
  var require_main37 = __commonJS({
    "node_modules/@stdlib/math-base-special-exp/lib/main.js": function(exports, module) {
      "use strict";
      var isnan = require_lib();
      var trunc = require_lib4();
      var NINF = require_lib6();
      var PINF = require_lib7();
      var expmulti = require_expmulti();
      var LN2_HI = 0.6931471803691238;
      var LN2_LO = 19082149292705877e-26;
      var LOG2_E = 1.4426950408889634;
      var OVERFLOW = 709.782712893384;
      var UNDERFLOW = -745.1332191019411;
      var NEARZERO = 1 / (1 << 28);
      var NEG_NEARZERO = -NEARZERO;
      function exp(x2) {
        var hi;
        var lo;
        var k;
        if (isnan(x2) || x2 === PINF) {
          return x2;
        }
        if (x2 === NINF) {
          return 0;
        }
        if (x2 > OVERFLOW) {
          return PINF;
        }
        if (x2 < UNDERFLOW) {
          return 0;
        }
        if (x2 > NEG_NEARZERO && x2 < NEARZERO) {
          return 1 + x2;
        }
        if (x2 < 0) {
          k = trunc(LOG2_E * x2 - 0.5);
        } else {
          k = trunc(LOG2_E * x2 + 0.5);
        }
        hi = x2 - k * LN2_HI;
        lo = k * LN2_LO;
        return expmulti(hi, lo, k);
      }
      module.exports = exp;
    }
  });

  // node_modules/@stdlib/math-base-special-exp/lib/index.js
  var require_lib51 = __commonJS({
    "node_modules/@stdlib/math-base-special-exp/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main37();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/number-float64-base-set-low-word/lib/low.js
  var require_low = __commonJS({
    "node_modules/@stdlib/number-float64-base-set-low-word/lib/low.js": function(exports, module) {
      "use strict";
      var isLittleEndian = require_lib40();
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
  var require_main38 = __commonJS({
    "node_modules/@stdlib/number-float64-base-set-low-word/lib/main.js": function(exports, module) {
      "use strict";
      var Uint32Array2 = require_lib28();
      var Float64Array2 = require_lib31();
      var LOW = require_low();
      var FLOAT64_VIEW = new Float64Array2(1);
      var UINT32_VIEW = new Uint32Array2(FLOAT64_VIEW.buffer);
      function setLowWord(x2, low) {
        FLOAT64_VIEW[0] = x2;
        UINT32_VIEW[LOW] = low >>> 0;
        return FLOAT64_VIEW[0];
      }
      module.exports = setLowWord;
    }
  });

  // node_modules/@stdlib/number-float64-base-set-low-word/lib/index.js
  var require_lib52 = __commonJS({
    "node_modules/@stdlib/number-float64-base-set-low-word/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main38();
      module.exports = main;
    }
  });

  // node_modules/@stdlib/math-base-special-erf/lib/polyval_pp.js
  var require_polyval_pp = __commonJS({
    "node_modules/@stdlib/math-base-special-erf/lib/polyval_pp.js": function(exports, module) {
      "use strict";
      function evalpoly(x2) {
        if (x2 === 0) {
          return -0.3250421072470015;
        }
        return -0.3250421072470015 + x2 * (-0.02848174957559851 + x2 * (-0.005770270296489442 + x2 * -23763016656650163e-21));
      }
      module.exports = evalpoly;
    }
  });

  // node_modules/@stdlib/math-base-special-erf/lib/polyval_qq.js
  var require_polyval_qq = __commonJS({
    "node_modules/@stdlib/math-base-special-erf/lib/polyval_qq.js": function(exports, module) {
      "use strict";
      function evalpoly(x2) {
        if (x2 === 0) {
          return 0.39791722395915535;
        }
        return 0.39791722395915535 + x2 * (0.0650222499887673 + x2 * (0.005081306281875766 + x2 * (13249473800432164e-20 + x2 * -3960228278775368e-21)));
      }
      module.exports = evalpoly;
    }
  });

  // node_modules/@stdlib/math-base-special-erf/lib/polyval_pa.js
  var require_polyval_pa = __commonJS({
    "node_modules/@stdlib/math-base-special-erf/lib/polyval_pa.js": function(exports, module) {
      "use strict";
      function evalpoly(x2) {
        if (x2 === 0) {
          return 0.41485611868374833;
        }
        return 0.41485611868374833 + x2 * (-0.3722078760357013 + x2 * (0.31834661990116175 + x2 * (-0.11089469428239668 + x2 * (0.035478304325618236 + x2 * -0.002166375594868791))));
      }
      module.exports = evalpoly;
    }
  });

  // node_modules/@stdlib/math-base-special-erf/lib/polyval_qa.js
  var require_polyval_qa = __commonJS({
    "node_modules/@stdlib/math-base-special-erf/lib/polyval_qa.js": function(exports, module) {
      "use strict";
      function evalpoly(x2) {
        if (x2 === 0) {
          return 0.10642088040084423;
        }
        return 0.10642088040084423 + x2 * (0.540397917702171 + x2 * (0.07182865441419627 + x2 * (0.12617121980876164 + x2 * (0.01363708391202905 + x2 * 0.011984499846799107))));
      }
      module.exports = evalpoly;
    }
  });

  // node_modules/@stdlib/math-base-special-erf/lib/polyval_ra.js
  var require_polyval_ra = __commonJS({
    "node_modules/@stdlib/math-base-special-erf/lib/polyval_ra.js": function(exports, module) {
      "use strict";
      function evalpoly(x2) {
        if (x2 === 0) {
          return -0.6938585727071818;
        }
        return -0.6938585727071818 + x2 * (-10.558626225323291 + x2 * (-62.375332450326006 + x2 * (-162.39666946257347 + x2 * (-184.60509290671104 + x2 * (-81.2874355063066 + x2 * -9.814329344169145)))));
      }
      module.exports = evalpoly;
    }
  });

  // node_modules/@stdlib/math-base-special-erf/lib/polyval_sa.js
  var require_polyval_sa = __commonJS({
    "node_modules/@stdlib/math-base-special-erf/lib/polyval_sa.js": function(exports, module) {
      "use strict";
      function evalpoly(x2) {
        if (x2 === 0) {
          return 19.651271667439257;
        }
        return 19.651271667439257 + x2 * (137.65775414351904 + x2 * (434.56587747522923 + x2 * (645.3872717332679 + x2 * (429.00814002756783 + x2 * (108.63500554177944 + x2 * (6.570249770319282 + x2 * -0.0604244152148581))))));
      }
      module.exports = evalpoly;
    }
  });

  // node_modules/@stdlib/math-base-special-erf/lib/polyval_rb.js
  var require_polyval_rb = __commonJS({
    "node_modules/@stdlib/math-base-special-erf/lib/polyval_rb.js": function(exports, module) {
      "use strict";
      function evalpoly(x2) {
        if (x2 === 0) {
          return -0.799283237680523;
        }
        return -0.799283237680523 + x2 * (-17.757954917754752 + x2 * (-160.63638485582192 + x2 * (-637.5664433683896 + x2 * (-1025.0951316110772 + x2 * -483.5191916086514))));
      }
      module.exports = evalpoly;
    }
  });

  // node_modules/@stdlib/math-base-special-erf/lib/polyval_sb.js
  var require_polyval_sb = __commonJS({
    "node_modules/@stdlib/math-base-special-erf/lib/polyval_sb.js": function(exports, module) {
      "use strict";
      function evalpoly(x2) {
        if (x2 === 0) {
          return 30.33806074348246;
        }
        return 30.33806074348246 + x2 * (325.7925129965739 + x2 * (1536.729586084437 + x2 * (3199.8582195085955 + x2 * (2553.0504064331644 + x2 * (474.52854120695537 + x2 * -22.44095244658582)))));
      }
      module.exports = evalpoly;
    }
  });

  // node_modules/@stdlib/math-base-special-erf/lib/main.js
  var require_main39 = __commonJS({
    "node_modules/@stdlib/math-base-special-erf/lib/main.js": function(exports, module) {
      "use strict";
      var isnan = require_lib();
      var exp = require_lib51();
      var setLowWord = require_lib52();
      var PINF = require_lib7();
      var NINF = require_lib6();
      var polyvalPP = require_polyval_pp();
      var polyvalQQ = require_polyval_qq();
      var polyvalPA = require_polyval_pa();
      var polyvalQA = require_polyval_qa();
      var polyvalRA = require_polyval_ra();
      var polyvalSA = require_polyval_sa();
      var polyvalRB = require_polyval_rb();
      var polyvalSB = require_polyval_sb();
      var TINY = 1e-300;
      var VERY_TINY = 2848094538889218e-321;
      var SMALL = 3725290298461914e-24;
      var ERX = 0.8450629115104675;
      var EFX = 0.1283791670955126;
      var EFX8 = 1.0270333367641007;
      var PPC = 0.12837916709551256;
      var QQC = 1;
      var PAC = -0.0023621185607526594;
      var QAC = 1;
      var RAC = -0.009864944034847148;
      var SAC = 1;
      var RBC = -0.0098649429247001;
      var SBC = 1;
      function erf2(x2) {
        var sign;
        var ax;
        var z;
        var r;
        var s;
        var y;
        var p;
        var q;
        if (isnan(x2)) {
          return NaN;
        }
        if (x2 === PINF) {
          return 1;
        }
        if (x2 === NINF) {
          return -1;
        }
        if (x2 === 0) {
          return x2;
        }
        if (x2 < 0) {
          sign = true;
          ax = -x2;
        } else {
          sign = false;
          ax = x2;
        }
        if (ax < 0.84375) {
          if (ax < SMALL) {
            if (ax < VERY_TINY) {
              return 0.125 * (8 * x2 + EFX8 * x2);
            }
            return x2 + EFX * x2;
          }
          z = x2 * x2;
          r = PPC + z * polyvalPP(z);
          s = QQC + z * polyvalQQ(z);
          y = r / s;
          return x2 + x2 * y;
        }
        if (ax < 1.25) {
          s = ax - 1;
          p = PAC + s * polyvalPA(s);
          q = QAC + s * polyvalQA(s);
          if (sign) {
            return -ERX - p / q;
          }
          return ERX + p / q;
        }
        if (ax >= 6) {
          if (sign) {
            return TINY - 1;
          }
          return 1 - TINY;
        }
        s = 1 / (ax * ax);
        if (ax < 2.857142857142857) {
          r = RAC + s * polyvalRA(s);
          s = SAC + s * polyvalSA(s);
        } else {
          r = RBC + s * polyvalRB(s);
          s = SBC + s * polyvalSB(s);
        }
        z = setLowWord(ax, 0);
        r = exp(-(z * z) - 0.5625) * exp((z - ax) * (z + ax) + r / s);
        if (sign) {
          return r / ax - 1;
        }
        return 1 - r / ax;
      }
      module.exports = erf2;
    }
  });

  // node_modules/@stdlib/math-base-special-erf/lib/index.js
  var require_lib53 = __commonJS({
    "node_modules/@stdlib/math-base-special-erf/lib/index.js": function(exports, module) {
      "use strict";
      var main = require_main39();
      module.exports = main;
    }
  });

  // driver.js
  var erf = require_lib53();
  var ldexp = require_lib50();
  var out = typeof print === "function" ? print : console.log;
  var F64 = new Float64Array(1);
  var U32 = new Uint32Array(F64.buffer);
  var LE = new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  var HI = LE ? 1 : 0;
  var LO = LE ? 0 : 1;
  function hex8(n2) {
    var s = n2.toString(16);
    while (s.length < 8) {
      s = "0" + s;
    }
    return s;
  }
  function bits(x2) {
    F64[0] = x2;
    return hex8(U32[HI]) + hex8(U32[LO]);
  }
  function fromBits(hi, lo) {
    U32[HI] = hi >>> 0;
    U32[LO] = lo >>> 0;
    return F64[0];
  }
  var state = 2463534242;
  function next() {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    return state;
  }
  function uniform() {
    var a = next() >>> 5;
    var b = next() >>> 6;
    return (a * 67108864 + b) / 9007199254740992;
  }
  var i;
  var x;
  var n;
  var count = 0;
  var ERF_FIXED = [
    0,
    -0,
    NaN,
    1 / 0,
    -1 / 0,
    5e-324,
    -5e-324,
    22250738585072014e-324,
    1e-300,
    3725290298461914e-24,
    1e-10,
    0.1,
    0.5,
    0.84375,
    0.8437499999999999,
    1,
    1.25,
    1.2499999999999998,
    2,
    2.857142857142857,
    2.8571428571428568,
    3,
    5.9,
    6,
    6.000000000000001,
    27.999999999999996,
    28,
    -0.3,
    -1.5,
    -4
  ];
  for (i = 0; i < ERF_FIXED.length; i++) {
    x = ERF_FIXED[i];
    out("erf " + bits(x) + " " + bits(erf(x)));
    count += 1;
  }
  for (i = 0; i < 2e3; i++) {
    x = uniform() * 14 - 7;
    out("erf " + bits(x) + " " + bits(erf(x)));
    count += 1;
  }
  var LDEXP_FIXED = [
    [1, 1023],
    [1, 1024],
    [1, -1022],
    [1, -1074],
    [1, -1075],
    [0.75, -1074],
    [1.5, -1074],
    [3, -1075],
    [5e-324, 1074],
    [5e-324, -1],
    [22250738585072014e-324, -1],
    [22250738585072014e-324, -52],
    [-0, 10],
    [0, -10],
    [NaN, 1],
    [1 / 0, -5],
    [-1 / 0, 5],
    [17976931348623157e292, 1],
    [17976931348623157e292, -2098],
    [1, 2e3],
    [1, -2e3],
    [-3.5, 7],
    [0.1, 3]
  ];
  for (i = 0; i < LDEXP_FIXED.length; i++) {
    x = LDEXP_FIXED[i][0];
    n = LDEXP_FIXED[i][1];
    out("ldexp " + bits(x) + " " + n + " " + bits(ldexp(x, n)));
    count += 1;
  }
  for (i = 0; i < 2e3; i++) {
    x = fromBits(next(), next());
    n = next() % 2201 - 1100;
    out("ldexp " + bits(x) + " " + n + " " + bits(ldexp(x, n)));
    count += 1;
  }
  out("cases " + count);
})();
/*! Bundled license information:

@stdlib/math-base-assert-is-nan/lib/main.js:
@stdlib/math-base-assert-is-nan/lib/index.js:
@stdlib/math-base-special-floor/lib/main.js:
@stdlib/math-base-special-floor/lib/index.js:
@stdlib/math-base-special-ceil/lib/main.js:
@stdlib/math-base-special-ceil/lib/index.js:
@stdlib/math-base-special-trunc/lib/main.js:
@stdlib/math-base-special-trunc/lib/index.js:
@stdlib/number-ctor/lib/main.js:
@stdlib/number-ctor/lib/index.js:
@stdlib/constants-float64-ninf/lib/index.js:
@stdlib/constants-float64-pinf/lib/index.js:
@stdlib/constants-float64-exponent-bias/lib/index.js:
@stdlib/constants-float64-max-base2-exponent/lib/index.js:
@stdlib/constants-float64-max-base2-exponent-subnormal/lib/index.js:
@stdlib/constants-float64-min-base2-exponent-subnormal/lib/index.js:
@stdlib/math-base-assert-is-infinite/lib/main.js:
@stdlib/math-base-assert-is-infinite/lib/index.js:
@stdlib/utils-define-property/lib/builtin.js:
@stdlib/utils-define-property/lib/polyfill.js:
@stdlib/utils-define-property/lib/index.js:
@stdlib/utils-define-nonenumerable-read-only-property/lib/main.js:
@stdlib/utils-define-nonenumerable-read-only-property/lib/index.js:
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
@stdlib/number-float64-base-to-words/lib/indices.js:
@stdlib/number-float64-base-to-words/lib/assign.js:
@stdlib/number-float64-base-to-words/lib/main.js:
@stdlib/number-float64-base-to-words/lib/index.js:
@stdlib/number-float64-base-get-high-word/lib/high.js:
@stdlib/number-float64-base-get-high-word/lib/main.js:
@stdlib/number-float64-base-get-high-word/lib/index.js:
@stdlib/number-float64-base-from-words/lib/indices.js:
@stdlib/number-float64-base-from-words/lib/main.js:
@stdlib/number-float64-base-from-words/lib/index.js:
@stdlib/math-base-special-copysign/lib/main.js:
@stdlib/math-base-special-copysign/lib/index.js:
@stdlib/constants-float64-smallest-normal/lib/index.js:
@stdlib/math-base-special-abs/lib/index.js:
@stdlib/number-float64-base-normalize/lib/assign.js:
@stdlib/number-float64-base-normalize/lib/main.js:
@stdlib/number-float64-base-normalize/lib/index.js:
@stdlib/constants-float64-high-word-exponent-mask/lib/index.js:
@stdlib/number-float64-base-exponent/lib/main.js:
@stdlib/number-float64-base-exponent/lib/index.js:
@stdlib/math-base-special-ldexp/lib/main.js:
@stdlib/math-base-special-ldexp/lib/index.js:
@stdlib/math-base-special-exp/lib/index.js:
@stdlib/number-float64-base-set-low-word/lib/low.js:
@stdlib/number-float64-base-set-low-word/lib/main.js:
@stdlib/number-float64-base-set-low-word/lib/index.js:
@stdlib/math-base-special-erf/lib/index.js:
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

@stdlib/constants-float64-high-word-sign-mask/lib/index.js:
@stdlib/constants-float64-high-word-abs-mask/lib/index.js:
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
@stdlib/math-base-special-exp/lib/polyval_p.js:
@stdlib/math-base-special-erf/lib/polyval_pp.js:
@stdlib/math-base-special-erf/lib/polyval_qq.js:
@stdlib/math-base-special-erf/lib/polyval_pa.js:
@stdlib/math-base-special-erf/lib/polyval_qa.js:
@stdlib/math-base-special-erf/lib/polyval_ra.js:
@stdlib/math-base-special-erf/lib/polyval_sa.js:
@stdlib/math-base-special-erf/lib/polyval_rb.js:
@stdlib/math-base-special-erf/lib/polyval_sb.js:
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

@stdlib/utils-define-property/lib/define_property.js:
@stdlib/utils-define-property/lib/has_define_property_support.js:
@stdlib/math-base-special-abs/lib/main.js:
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

@stdlib/math-base-special-exp/lib/expmulti.js:
@stdlib/math-base-special-exp/lib/main.js:
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
  * The following copyrights, licenses, and long comment were part of the original implementation available as part of [Go]{@link https://github.com/golang/go/blob/cb07765045aed5104a3df31507564ac99e6ddce8/src/math/exp.go}, which in turn was based on an implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_exp.c}. The implementation follows the original, but has been modified for JavaScript.
  *
  * ```text
  * Copyright (c) 2009 The Go Authors. All rights reserved.
  *
  * Redistribution and use in source and binary forms, with or without
  * modification, are permitted provided that the following conditions are
  * met:
  *
  *    * Redistributions of source code must retain the above copyright
  * notice, this list of conditions and the following disclaimer.
  *    * Redistributions in binary form must reproduce the above
  * copyright notice, this list of conditions and the following disclaimer
  * in the documentation and/or other materials provided with the
  * distribution.
  *    * Neither the name of Google Inc. nor the names of its
  * contributors may be used to endorse or promote products derived from
  * this software without specific prior written permission.
  *
  * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
  * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
  * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
  * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
  * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
  * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
  * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
  * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
  * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
  * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  * ```
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

@stdlib/math-base-special-erf/lib/main.js:
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
  * The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_erf.c}. The implementation follows the original, but has been modified for JavaScript.
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
