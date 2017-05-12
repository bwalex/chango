(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["chango"] = factory();
	else
		root["chango"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 130);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(42)('wks')
  , uid        = __webpack_require__(28)
  , Symbol     = __webpack_require__(5).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PROCESS_KILLED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return PROCESS_KILL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CLOSED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return NO_VAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return TICK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return MIX_MUTE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return MIX_PAUSE; });
/* unused harmony export MIX_SOLO */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return MIX_CHANGED; });
var PROCESS_KILLED = '@@csp/PROCESS_KILLED';
var PROCESS_KILL = '@@csp/PROCESS_KILL';
var CLOSED = '@@csp/CLOSED';
var NO_VAL = '@@csp/NO_VAL';
var TICK = '@@csp/TICK';
var MIX_MUTE = '@@csp/mix/MUTE';
var MIX_PAUSE = '@@csp/mix/PAUSE';
var MIX_SOLO = '@@csp/mix/PAUSE';
var MIX_CHANGED = '@@csp/mix/CHANGED';

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(5)
  , core      = __webpack_require__(0)
  , ctx       = __webpack_require__(34)
  , hide      = __webpack_require__(16)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(10)
  , IE8_DOM_DEFINE = __webpack_require__(57)
  , toPrimitive    = __webpack_require__(44)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(11) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Channel; });
/* harmony export (immutable) */ __webpack_exports__["b"] = chan;
/* harmony export (immutable) */ __webpack_exports__["c"] = close;
/* harmony export (immutable) */ __webpack_exports__["d"] = offer;
/* harmony export (immutable) */ __webpack_exports__["e"] = poll;
/* harmony export (immutable) */ __webpack_exports__["f"] = put_;
/* harmony export (immutable) */ __webpack_exports__["g"] = take_;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__buffer__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__transducers__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dispatch__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__handler__ = __webpack_require__(23);











var BufferAddTransformer = {
  '@@transducer/init': function transducerInit() {},
  '@@transducer/result': function transducerResult(result) {
    return result;
  },
  '@@transducer/step': function transducerStep(result, input) {
    return result.add(input);
  }
};

function exHandler(ex) {
  console.log(ex);
  return __WEBPACK_IMPORTED_MODULE_6__constants__["b" /* CLOSED */];
}

function handleEx(buf) {
  var exh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var handler = function handler(ex) {
    var val = (exh || exHandler)(ex);
    return val === __WEBPACK_IMPORTED_MODULE_6__constants__["b" /* CLOSED */] ? buf : buf.add(val);
  };

  return function (xf) {
    return {
      '@@transducer/init': function transducerInit() {},
      '@@transducer/result': function transducerResult(result) {
        try {
          return result(xf, result);
        } catch (e) {
          return handler(e);
        }
      },
      '@@transducer/step': function transducerStep(result, input) {
        try {
          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__transducers__["a" /* step */])(xf, result, input);
        } catch (e) {
          return handler(e);
        }
      }
    };
  };
}

function commitAndRun(handler) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (!handler.active()) return;

  var cb = handler.commit();
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__dispatch__["a" /* run */])(function () {
    return cb.apply(undefined, args);
  });
}

var Channel = function () {
  function Channel(buffer, transducer, exHandler, unbuffered) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Channel);

    this._closed = false;
    this.buffer = buffer;
    this.exHandler = exHandler;
    this.puts = [];
    this.takes = [];
    this.unbuffered = unbuffered;

    var xform = transducer ? transducer(BufferAddTransformer) : BufferAddTransformer;
    this.xform = handleEx(this.buffer, exHandler)(xform);
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Channel, [{
    key: 'close',
    value: function close() {
      if (this._closed) return;

      this._closed = true;

      while (this.takes.length > 0) {
        var taker = this.takes.shift();
        commitAndRun(taker, __WEBPACK_IMPORTED_MODULE_6__constants__["b" /* CLOSED */]);
      }

      if (!this.unbuffered) {
        while (this.puts.length > 0) {
          var _puts$shift = this.puts.shift(),
              _puts$shift2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(_puts$shift, 2),
              val = _puts$shift2[0],
              putter = _puts$shift2[1];

          commitAndRun(putter, false);
        }
      }

      this.buffer.close();
    }
  }, {
    key: 'closed',
    value: function closed() {
      return this._closed;
    }
  }, {
    key: 'put',
    value: function put(val, handler) {
      if (!handler.active()) return false;

      if (this._closed) {
        commitAndRun(handler, false);
        return true;
      }

      if (!(this.buffer.blocking() && this.buffer.full()) && (!this.unbuffered || this.takes.length > 0)) {
        this.putOne(handler, val);
        return true;
      } else if (handler.blockable()) {
        this.puts.push([val, handler]);
        return false;
      }

      return false;
    }
  }, {
    key: 'putOne',
    value: function putOne(handler, val) {
      if (!handler.active()) return;

      var done = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__transducers__["b" /* reduced */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__transducers__["a" /* step */])(this.xform, this.buffer, val));
      commitAndRun(handler, true);

      while (this.buffer.count() > 0 && this.takes.length > 0) {
        var taker = this.takes.shift();
        if (taker.active()) {
          var _val = this.buffer.remove();
          commitAndRun(taker, _val);
        }
      }

      if (done) this.close();
    }
  }, {
    key: 'take',
    value: function take(handler) {
      if (!handler.active()) return __WEBPACK_IMPORTED_MODULE_6__constants__["c" /* NO_VAL */];

      if (this.buffer.count() > 0) {
        var val = this.buffer.remove();
        commitAndRun(handler, val);

        while (!this.buffer.full() && this.puts.length > 0) {
          var _puts$shift3 = this.puts.shift(),
              _puts$shift4 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(_puts$shift3, 2),
              _val2 = _puts$shift4[0],
              putter = _puts$shift4[1];

          this.putOne(putter, _val2);
        }
        return val;
      } else if (this.unbuffered && this.puts.length > 0) {
        var _puts$shift5 = this.puts.shift(),
            _puts$shift6 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(_puts$shift5, 2),
            _val3 = _puts$shift6[0],
            putter = _puts$shift6[1];

        this.takes.push(handler);
        this.putOne(putter, _val3);
      } else if (this._closed) {
        commitAndRun(handler, __WEBPACK_IMPORTED_MODULE_6__constants__["b" /* CLOSED */]);
        return __WEBPACK_IMPORTED_MODULE_6__constants__["b" /* CLOSED */];
      } else if (handler.blockable()) {
        this.takes.push(handler);
        return __WEBPACK_IMPORTED_MODULE_6__constants__["c" /* NO_VAL */];
      }

      return __WEBPACK_IMPORTED_MODULE_6__constants__["c" /* NO_VAL */];
    }
  }]);

  return Channel;
}();

function chan() {
  var sizeOrBuffer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var transducer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var exHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var unbuffered = sizeOrBuffer === null;

  var buffer = unbuffered || typeof sizeOrBuffer === 'number' ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__buffer__["a" /* fixedBuffer */])(unbuffered ? 1 : sizeOrBuffer) : sizeOrBuffer;

  return new Channel(buffer, transducer, exHandler, unbuffered);
}

function close(ch) {
  ch.close();
}

function offer(ch, val) {
  return ch.put(val, new __WEBPACK_IMPORTED_MODULE_7__handler__["b" /* FnHandler */](function () {}, false));
}

function poll(ch) {
  return ch.take(new __WEBPACK_IMPORTED_MODULE_7__handler__["b" /* FnHandler */](function () {}, false));
}

function put_(ch, val) {
  var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (!cb) cb = function cb() {};
  return ch.put(val, new __WEBPACK_IMPORTED_MODULE_7__handler__["b" /* FnHandler */](cb));
}

function take_(ch, cb) {
  return ch.take(new __WEBPACK_IMPORTED_MODULE_7__handler__["b" /* FnHandler */](cb));
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["addEffectHandler"] = addEffectHandler;
/* harmony export (immutable) */ __webpack_exports__["runEffectTranslators"] = runEffectTranslators;
/* harmony export (immutable) */ __webpack_exports__["handleEffect"] = handleEffect;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "put", function() { return put; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "take", function() { return take; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sleep", function() { return sleep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "call", function() { return call; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cps", function() { return cps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fork", function() { return fork; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spawn", function() { return spawn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alts", function() { return alts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alt", function() { return alt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "all", function() { return all; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nop", function() { return nop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "killed", function() { return killed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "join", function() { return join; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__handler__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__channel__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__process__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helper__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__error__ = __webpack_require__(19);








var effectHandlers = {};

function addEffectHandler(name, handler) {
  if (effectHandlers.hasOwnProperty(name)) {
    // XXX: warning
  }
  effectHandlers[name] = handler;
}

function runEffectTranslators(effect) {
  // XXX: add some special magic to cope with effect being:
  //  - instanceof Channel -> implied take
  //  - [instanceof Channel, any] -> implied put
  // -> generic concept of effect translators?
  if (effect instanceof __WEBPACK_IMPORTED_MODULE_3__channel__["a" /* Channel */]) {
    return take(effect);
  } else if (Array.isArray(effect) && effect.length == 2 && effect[0] instanceof __WEBPACK_IMPORTED_MODULE_3__channel__["a" /* Channel */]) {
    return put(effect[0], effect[1]);
  } else {
    return effect;
  }
}

function handleEffect(effect, doneFn, proc) {
  effect = runEffectTranslators(effect);

  if (effect && effect.hasOwnProperty('type')) {
    var name = effect.type;
    if (effectHandlers.hasOwnProperty(name)) {
      effectHandlers[name](effect, doneFn, proc);
      return;
    }
  }

  dummyHandler(effect, doneFn);
}

// effect generators
var put = function put(ch, val) {
  return {
    type: 'put',
    ch: ch,
    val: val
  };
};

var take = function take(ch) {
  return {
    type: 'take',
    ch: ch
  };
};

var sleep = function sleep(ms) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__helper__["b" /* timeoutChan */])(ms);
};

var call = function call(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return {
    type: 'call',
    fn: fn,
    args: args
  };
};

// error-first callback function
var cps = function cps(fn) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return __WEBPACK_IMPORTED_MODULE_5__helper__["d" /* cpsChan */].apply(undefined, [fn].concat(args));
};

var fork = function fork(procOrFn) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return {
    type: 'fork',
    procOrFn: procOrFn,
    args: args
  };
};

var spawn = function spawn(fn) {
  for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  return {
    type: 'spawn',
    fn: fn,
    args: args
  };
};

var alts = function alts() {
  for (var _len5 = arguments.length, ports = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    ports[_key5] = arguments[_key5];
  }

  return {
    type: 'alts',
    ports: ports
  };
};

var alt = function alt() {
  for (var _len6 = arguments.length, ports = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    ports[_key6] = arguments[_key6];
  }

  return {
    type: 'alt',
    ports: ports
  };
};

var all = function all() {
  for (var _len7 = arguments.length, ports = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    ports[_key7] = arguments[_key7];
  }

  return {
    type: 'all',
    ports: ports
  };
};

var nop = function nop() {
  return {
    type: 'nop'
  };
};

var _map = function _map(fn, effect) {
  return {
    type: 'map',
    fn: fn,
    effect: effect
  };
};

var map = function map(fn) {
  var effect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return effect ? _map(fn, effect) : function (eff) {
    return _map(fn, eff);
  };
};

var killed = function killed() {
  return {
    type: 'killed'
  };
};

var join = function join() {
  for (var _len8 = arguments.length, procs = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    procs[_key8] = arguments[_key8];
  }

  return all.apply(undefined, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(procs.map(function (p) {
    return p.ch;
  })));
};

function putHandler(_ref, doneFn) {
  var ch = _ref.ch,
      val = _ref.val;

  var handler = doneFn instanceof __WEBPACK_IMPORTED_MODULE_2__handler__["a" /* Handler */] ? doneFn : new __WEBPACK_IMPORTED_MODULE_2__handler__["b" /* FnHandler */](doneFn);
  ch.put(val, handler);
}

function takeHandler(_ref2, doneFn) {
  var ch = _ref2.ch;

  var handler = doneFn instanceof __WEBPACK_IMPORTED_MODULE_2__handler__["a" /* Handler */] ? doneFn : new __WEBPACK_IMPORTED_MODULE_2__handler__["b" /* FnHandler */](doneFn);
  ch.take(handler);
}

function callHandler(_ref3, doneFn) {
  var fn = _ref3.fn,
      args = _ref3.args;

  var handler = doneFn instanceof __WEBPACK_IMPORTED_MODULE_2__handler__["a" /* Handler */] ? doneFn : new __WEBPACK_IMPORTED_MODULE_2__handler__["b" /* FnHandler */](doneFn);
  var proc = __WEBPACK_IMPORTED_MODULE_4__process__["b" /* go */].apply(undefined, [fn].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(args)));
  proc.ch.take(handler);
}

function forkHandler(_ref4, doneFn, parent) {
  var procOrFn = _ref4.procOrFn,
      args = _ref4.args;

  var handler = doneFn instanceof __WEBPACK_IMPORTED_MODULE_2__handler__["a" /* Handler */] ? doneFn : new __WEBPACK_IMPORTED_MODULE_2__handler__["b" /* FnHandler */](doneFn);
  var proc = procOrFn instanceof __WEBPACK_IMPORTED_MODULE_4__process__["a" /* Process */] ? procOrFn : __WEBPACK_IMPORTED_MODULE_4__process__["b" /* go */].apply(undefined, [procOrFn].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(args)));
  parent.addChild(proc);
  if (handler.active()) {
    handler.commit()(proc);
  }
}

function spawnHandler(_ref5, doneFn) {
  var fn = _ref5.fn,
      args = _ref5.args;

  var handler = doneFn instanceof __WEBPACK_IMPORTED_MODULE_2__handler__["a" /* Handler */] ? doneFn : new __WEBPACK_IMPORTED_MODULE_2__handler__["b" /* FnHandler */](doneFn);
  var proc = __WEBPACK_IMPORTED_MODULE_4__process__["b" /* go */].apply(undefined, [fn].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(args)));
  if (handler.active()) {
    handler.commit()(proc);
  }
}

function dummyHandler(value, doneFn) {
  var handler = doneFn instanceof __WEBPACK_IMPORTED_MODULE_2__handler__["a" /* Handler */] ? doneFn : new __WEBPACK_IMPORTED_MODULE_2__handler__["b" /* FnHandler */](doneFn);
  if (handler.active()) {
    handler.commit()(value);
  }
}

function nopHandler(effect, doneFn) {
  dummyHandler(null, doneFn);
}

function mapHandler(_ref6, doneFn, proc) {
  var fn = _ref6.fn,
      effect = _ref6.effect;

  var handler = doneFn instanceof __WEBPACK_IMPORTED_MODULE_2__handler__["a" /* Handler */] ? doneFn : new __WEBPACK_IMPORTED_MODULE_2__handler__["b" /* FnHandler */](doneFn);
  var h = new __WEBPACK_IMPORTED_MODULE_2__handler__["b" /* FnHandler */](function (v) {
    if (handler.active()) {
      var val = typeof fn === 'function' ? fn(v) : fn;
      handler.commit()(val);
    }
  });

  handleEffect(effect, h, proc);
}

function killedHandler(effect, doneFn, proc) {
  dummyHandler(proc.killed, doneFn);
}

function makeAltsHandler(alt) {
  return function (_ref7, doneFn, parent) {
    var ports = _ref7.ports;

    var handler = doneFn instanceof __WEBPACK_IMPORTED_MODULE_2__handler__["a" /* Handler */] ? doneFn : new __WEBPACK_IMPORTED_MODULE_2__handler__["b" /* FnHandler */](doneFn);
    var flag = new __WEBPACK_IMPORTED_MODULE_2__handler__["c" /* AltFlag */]();

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var p = _step.value;

        var port = alt ? p[0] : p;
        var xform = alt && p.length > 1 && typeof p[1] === 'function' ? p[1] : null;

        var h = new __WEBPACK_IMPORTED_MODULE_2__handler__["d" /* AltHandler */](flag, function (val) {
          if (handler.active()) {
            var result = xform ? xform(val, port) : alt ? p[1] : [val, port];
            handler.commit()(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__error__["c" /* isError */])(val) ? val : result);
          }
        }, handler);

        handleEffect(port, h, parent);

        if (!flag.active()) return 'break';
      };

      for (var _iterator = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(ports), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ret = _loop();

        if (_ret === 'break') break;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };
}

function allHandler(_ref8, doneFn, parent) {
  var ports = _ref8.ports;

  var handler = doneFn instanceof __WEBPACK_IMPORTED_MODULE_2__handler__["a" /* Handler */] ? doneFn : new __WEBPACK_IMPORTED_MODULE_2__handler__["b" /* FnHandler */](doneFn);
  var n = ports.length;
  var flag = new __WEBPACK_IMPORTED_MODULE_2__handler__["e" /* AllFlag */](n, function (result) {
    if (handler.active()) {
      handler.commit()(result);
    }
  }, handler);

  ports.forEach(function (port, index) {
    var h = new __WEBPACK_IMPORTED_MODULE_2__handler__["f" /* AllHandler */](flag, index);
    handleEffect(port, h, parent);
  });
}

addEffectHandler('put', putHandler);
addEffectHandler('take', takeHandler);
addEffectHandler('call', callHandler);
addEffectHandler('fork', forkHandler);
addEffectHandler('spawn', spawnHandler);
addEffectHandler('nop', nopHandler);
addEffectHandler('map', mapHandler);
addEffectHandler('killed', killedHandler);
addEffectHandler('alts', makeAltsHandler(false));
addEffectHandler('alt', makeAltsHandler(true));
addEffectHandler('all', allHandler);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(74);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(20);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(15)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(58)
  , defined = __webpack_require__(35);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Process; });
/* harmony export (immutable) */ __webpack_exports__["b"] = go;
/* harmony export (immutable) */ __webpack_exports__["c"] = kill;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__channel__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nextTick__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__effects__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__handler__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__error__ = __webpack_require__(19);









var InternalProcess = function () {
  function InternalProcess(gen) {
    var _this = this;

    var onDone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, InternalProcess);

    this.schedule = function (val) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__nextTick__["a" /* nextTick */])(function () {
        return _this.run(val);
      });
    };

    this.run = function (val) {
      if (_this.killed && !_this.thrown) {
        val = __WEBPACK_IMPORTED_MODULE_6__constants__["h" /* PROCESS_KILL */];
        _this.finish(__WEBPACK_IMPORTED_MODULE_6__constants__["a" /* PROCESS_KILLED */]);
        _this.thrown = true;
      }

      var thrw = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__error__["c" /* isError */])(val);
      var ret = val === __WEBPACK_IMPORTED_MODULE_6__constants__["h" /* PROCESS_KILL */];
      try {
        var _ref = thrw ? _this.gen.throw(val.value()) : ret ? _this.gen.return(val) : _this.gen.next(val),
            done = _ref.done,
            value = _ref.value;
      } catch (e) {
        var done = true,
            value = e;
      }

      if (done) {
        _this.finish(_this.killed ? __WEBPACK_IMPORTED_MODULE_6__constants__["a" /* PROCESS_KILLED */] : value);
      } else {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__effects__["handleEffect"])(value, _this.schedule, _this);
      }
    };

    this.gen = gen;
    this.onDone = onDone;
    this.done = false;
    this.killed = false;
    this.thrown = false;
    this.children = [];
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(InternalProcess, [{
    key: 'addChild',
    value: function addChild(proc) {
      this.children.push(proc);
    }
  }, {
    key: 'finish',
    value: function finish(val) {
      if (this.done) return;

      this.done = true;
      this.children.forEach(function (child) {
        return child.kill();
      });
      if (this.onDone) this.onDone(val);
    }
  }, {
    key: 'kill',
    value: function kill() {
      if (!this.killed && !this.done) {
        this.killed = true;
        this.children.forEach(function (child) {
          return child.kill();
        });
      }
    }
  }]);

  return InternalProcess;
}();

var Process = function () {
  function Process(ch, proc) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Process);

    this.ch = ch;
    this.proc = proc;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Process, [{
    key: 'kill',
    value: function kill() {
      this.proc.kill();
    }
  }, {
    key: 'killed',
    value: function killed() {
      this.proc.killed;
    }
  }]);

  return Process;
}();

// returns a channel with the return value of the function
function go(genfn) {
  var ch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__channel__["b" /* chan */])(1);

  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var proc = new InternalProcess(genfn.apply(undefined, args), function (retVal) {
    ch.put(retVal, new __WEBPACK_IMPORTED_MODULE_5__handler__["b" /* FnHandler */](function () {
      return ch.close();
    }));
  });

  proc.run();

  return new Process(ch, proc);
}

function kill() {
  for (var _len2 = arguments.length, procs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    procs[_key2] = arguments[_key2];
  }

  procs.forEach(function (p) {
    return p.kill();
  });
}

// XXX: add channel tracking to process, so if a process exits (for whatever reason), the tracked channels are automatically closed.

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(6)
  , createDesc = __webpack_require__(21);
module.exports = __webpack_require__(11) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(63)
  , enumBugKeys = __webpack_require__(36);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Error; });
/* harmony export (immutable) */ __webpack_exports__["b"] = error;
/* harmony export (immutable) */ __webpack_exports__["c"] = isError;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);

var Error = function Error(val) {
  var _this = this;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Error);

  this.value = function () {
    return _this._value;
  };

  this._value = val;
};

function error(e) {
  return new Error(e);
}

function isError(e) {
  return e instanceof Error;
}

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(35);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Handler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FnHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return AltFlag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return AltHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return AllFlag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return AllHandler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_createClass__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__error__ = __webpack_require__(19);







var Handler = function Handler() {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default()(this, Handler);
};

var FnHandler = function (_Handler) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(FnHandler, _Handler);

  function FnHandler(fn) {
    var blockable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default()(this, FnHandler);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (FnHandler.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(FnHandler)).call(this));

    _this.active = function () {
      return true;
    };

    _this.blockable = function () {
      return _this._blockable;
    };

    _this.commit = function () {
      return _this.fn;
    };

    _this.fn = fn;
    _this._blockable = blockable;
    return _this;
  }

  return FnHandler;
}(Handler);

var AltFlag = function AltFlag() {
  var _this2 = this;

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default()(this, AltFlag);

  this.flag = true;

  this.active = function () {
    return _this2.flag;
  };

  this.commit = function () {
    _this2.flag = false;
  };
};

var AltHandler = function (_Handler2) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(AltHandler, _Handler2);

  function AltHandler(flag, fn) {
    var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default()(this, AltHandler);

    var _this3 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (AltHandler.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(AltHandler)).call(this));

    _this3.active = function () {
      return _this3.flag.active() && (!_this3.parent || _this3.parent.active());
    };

    _this3.blockable = function () {
      return true;
    };

    _this3.fn = fn;
    _this3.flag = flag || new AltFlag();
    _this3.parent = parent;
    return _this3;
  }

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_createClass___default()(AltHandler, [{
    key: 'commit',
    value: function commit() {
      this.flag.commit();
      return this.fn;
    }
  }]);

  return AltHandler;
}(Handler);

var AllFlag = function AllFlag(n, fn) {
  var _this4 = this;

  var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default()(this, AllFlag);

  this.active = function () {
    return !_this4.errored && _this4.commitCount < _this4.n && (!_this4.parent || _this4.parent.active());
  };

  this.commit = function (index) {
    ++_this4.commitCount;
    return _this4.handler(index);
  };

  this.handler = function (index) {
    return function (val) {
      _this4.values.push({ index: index, val: val });
      _this4.errored = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__error__["c" /* isError */])(val);

      if (++_this4.count === _this4.n || _this4.errored) {
        var values = _this4.values.sort(function (a, b) {
          return a.index - b.index;
        }).map(function (vp) {
          return vp.val;
        });

        _this4.fn(_this4.errored ? val : values);
      }
    };
  };

  this.count = 0;
  this.commitCount = 0;
  this.n = n;
  this.fn = fn;
  this.errored = false;
  this.values = [];
  this.parent = parent;
};

var AllHandler = function (_Handler3) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(AllHandler, _Handler3);

  function AllHandler(flag, index) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default()(this, AllHandler);

    var _this5 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (AllHandler.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(AllHandler)).call(this));

    _this5.active = function () {
      return _this5.flag.active();
    };

    _this5.blockable = function () {
      return true;
    };

    _this5.index = index;
    _this5.flag = flag;
    return _this5;
  }

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_createClass___default()(AllHandler, [{
    key: 'commit',
    value: function commit() {
      return this.flag.commit(this.index);
    }
  }]);

  return AllHandler;
}(Handler);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(84), __esModule: true };

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(53);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(128);


/***/ }),
/* 27 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(112)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(59)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fixedBuffer;
/* harmony export (immutable) */ __webpack_exports__["b"] = droppingBuffer;
/* harmony export (immutable) */ __webpack_exports__["c"] = slidingBuffer;
/* harmony export (immutable) */ __webpack_exports__["d"] = promiseBuffer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(2);




var FixedBuffer = function () {
  function FixedBuffer() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, FixedBuffer);

    this.size = size;
    this.entries = [];
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(FixedBuffer, [{
    key: 'full',
    value: function full() {
      return this.entries.length >= this.size;
    }
  }, {
    key: 'add',
    value: function add(val) {
      this.entries.push(val);
      return this;
    }
  }, {
    key: 'remove',
    value: function remove() {
      return this.entries.shift();
    }
  }, {
    key: 'count',
    value: function count() {
      return this.entries.length;
    }
  }, {
    key: 'close',
    value: function close() {}
  }, {
    key: 'blocking',
    value: function blocking() {
      return true;
    }
  }]);

  return FixedBuffer;
}();

var DroppingBuffer = function () {
  function DroppingBuffer() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, DroppingBuffer);

    this.size = size;
    this.entries = [];
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(DroppingBuffer, [{
    key: 'full',
    value: function full() {
      return false;
    }
  }, {
    key: 'add',
    value: function add(val) {
      if (this.entries.length < this.size) this.entries.push(val);
      return this;
    }
  }, {
    key: 'remove',
    value: function remove() {
      return this.entries.shift();
    }
  }, {
    key: 'count',
    value: function count() {
      return this.entries.length;
    }
  }, {
    key: 'close',
    value: function close() {}
  }, {
    key: 'blocking',
    value: function blocking() {
      return false;
    }
  }]);

  return DroppingBuffer;
}();

var SlidingBuffer = function () {
  function SlidingBuffer() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, SlidingBuffer);

    this.size = size;
    this.entries = [];
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(SlidingBuffer, [{
    key: 'full',
    value: function full() {
      return false;
    }
  }, {
    key: 'add',
    value: function add(val) {
      if (this.entries.push(val) > this.size) this.entries.shift();
      return this;
    }
  }, {
    key: 'remove',
    value: function remove() {
      return this.entries.shift();
    }
  }, {
    key: 'count',
    value: function count() {
      return this.entries.length;
    }
  }, {
    key: 'close',
    value: function close() {}
  }, {
    key: 'blocking',
    value: function blocking() {
      return false;
    }
  }]);

  return SlidingBuffer;
}();

var PromiseBuffer = function () {
  function PromiseBuffer() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, PromiseBuffer);

    this.value = __WEBPACK_IMPORTED_MODULE_2__constants__["c" /* NO_VAL */];
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(PromiseBuffer, [{
    key: 'full',
    value: function full() {
      return false;
    }
  }, {
    key: 'add',
    value: function add(val) {
      if (this.undelivered()) this.value = val;
      return this;
    }
  }, {
    key: 'remove',
    value: function remove() {
      return this.undelivered() ? undefined : this.value;
    }
  }, {
    key: 'count',
    value: function count() {
      return this.undelivered() ? 0 : 1;
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.undelivered()) this.value = null;
    }
  }, {
    key: 'undelivered',
    value: function undelivered() {
      return this.value === __WEBPACK_IMPORTED_MODULE_2__constants__["c" /* NO_VAL */];
    }
  }, {
    key: 'blocking',
    value: function blocking() {
      return false;
    }
  }]);

  return PromiseBuffer;
}();

function fixedBuffer() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  return new FixedBuffer(size);
}

function droppingBuffer() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  return new DroppingBuffer(size);
}

function slidingBuffer() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  return new SlidingBuffer(size);
}

function promiseBuffer() {
  return new PromiseBuffer();
}

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return Mult; });
/* harmony export (immutable) */ __webpack_exports__["a"] = mult;
/* harmony export (immutable) */ __webpack_exports__["b"] = stopMult;
/* harmony export (immutable) */ __webpack_exports__["c"] = tap;
/* harmony export (immutable) */ __webpack_exports__["d"] = taps;
/* harmony export (immutable) */ __webpack_exports__["e"] = untap;
/* harmony export (immutable) */ __webpack_exports__["f"] = untapAll;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__channel__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__effects__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__process__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants__ = __webpack_require__(2);









var Mult = function () {
  function Mult(ch) {
    var close = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Mult);

    this.ch = ch;
    this.taps = [];
    this.running = false;
    this.proc = null;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Mult, [{
    key: 'run',
    value: function run() {
      var self = this;
      this.running = true;

      this.proc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__process__["b" /* go */])(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
        var _this = this;

        var _loop, _ret;

        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _loop = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _loop() {
                  var val;
                  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _loop$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return self.ch;

                        case 2:
                          val = _context.sent;

                          if (!(self.taps.length > 0)) {
                            _context.next = 13;
                            break;
                          }

                          if (!(val === __WEBPACK_IMPORTED_MODULE_7__constants__["b" /* CLOSED */])) {
                            _context.next = 9;
                            break;
                          }

                          self.taps.filter(function (t) {
                            return t.close;
                          }).forEach(function (t) {
                            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__channel__["c" /* close */])(t.ch);
                          });
                          return _context.abrupt('return', 'break');

                        case 9:
                          _context.next = 11;
                          return __WEBPACK_IMPORTED_MODULE_5__effects__["all"].apply(undefined, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(self.taps.map(function (t) {
                            return [t.ch, val];
                          })));

                        case 11:
                          _context.next = 15;
                          break;

                        case 13:
                          if (!(val === __WEBPACK_IMPORTED_MODULE_7__constants__["b" /* CLOSED */])) {
                            _context.next = 15;
                            break;
                          }

                          return _context.abrupt('return', 'break');

                        case 15:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _loop, _this);
                });

              case 1:
                if (false) {
                  _context2.next = 8;
                  break;
                }

                return _context2.delegateYield(_loop(), 't0', 3);

              case 3:
                _ret = _context2.t0;

                if (!(_ret === 'break')) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt('break', 8);

              case 6:
                _context2.next = 1;
                break;

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee, this);
      }));

      return this;
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (!this.running) return;

      this.proc.kill();
      this.running = false;
    }
  }, {
    key: 'add',
    value: function add(ch) {
      var close = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var index = this.taps.findIndex(function (t) {
        return t.ch === ch;
      });
      if (index === -1) this.taps.push({ ch: ch, close: close });

      if (!this.running) this.run();
    }
  }, {
    key: 'remove',
    value: function remove(ch) {
      var index = this.taps.findIndex(function (t) {
        return t.ch === ch;
      });
      if (index > -1) this.taps.splice(index, 1);
    }
  }, {
    key: 'removeAll',
    value: function removeAll() {
      this.taps = [];
    }
  }]);

  return Mult;
}();

function mult(ch) {
  return new Mult(ch).run();
}

function stopMult(mult) {
  mult.stop();
}

function tap(mult, ch) {
  var close = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  mult.add(ch, close);
}

function taps(mult) {
  return mult.taps.length;
}

function untap(mult, ch) {
  mult.remove(ch);
}

function untapAll(mult) {
  mult.removeAll();
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(71);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(24);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 33 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(94);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 35 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(10)
  , dPs         = __webpack_require__(109)
  , enumBugKeys = __webpack_require__(36)
  , IE_PROTO    = __webpack_require__(41)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(56)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(99).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(6).f
  , has = __webpack_require__(12)
  , TAG = __webpack_require__(1)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(42)('keys')
  , uid    = __webpack_require__(28);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 43 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(20);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(5)
  , core           = __webpack_require__(0)
  , LIBRARY        = __webpack_require__(37)
  , wksExt         = __webpack_require__(46)
  , defineProperty = __webpack_require__(6).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1);

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(117);
var global        = __webpack_require__(5)
  , hide          = __webpack_require__(16)
  , Iterators     = __webpack_require__(17)
  , TO_STRING_TAG = __webpack_require__(1)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 48 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = tickerChan;
/* harmony export (immutable) */ __webpack_exports__["b"] = timeoutChan;
/* harmony export (immutable) */ __webpack_exports__["c"] = promiseChan;
/* harmony export (immutable) */ __webpack_exports__["d"] = cpsChan;
/* harmony export (immutable) */ __webpack_exports__["e"] = ontoChan;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return toChan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return intoChan; });
/* harmony export (immutable) */ __webpack_exports__["h"] = mapChan;
/* harmony export (immutable) */ __webpack_exports__["i"] = reduceChan;
/* harmony export (immutable) */ __webpack_exports__["j"] = mergeChan;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return pipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return pipelineGo; });
/* harmony export (immutable) */ __webpack_exports__["m"] = pipeline;
/* harmony export (immutable) */ __webpack_exports__["n"] = pipelineAsync;
/* harmony export (immutable) */ __webpack_exports__["o"] = split;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_array_from__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_array_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__channel__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__buffer__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__effects__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__process__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__constants__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__error__ = __webpack_require__(19);












function tickerChan(ms) {
  var burstLimit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var ch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["b" /* chan */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__buffer__["b" /* droppingBuffer */])(burstLimit));

  var interval = setInterval(function () {
    if (!ch.closed()) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["f" /* put_ */])(ch, __WEBPACK_IMPORTED_MODULE_9__constants__["f" /* TICK */]);
    } else {
      clearInterval(interval);
    }
  }, ms);

  return ch;
}

function timeoutChan(ms) {
  var ch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["b" /* chan */])();

  setTimeout(function () {
    return ch.close();
  }, ms);

  return ch;
}

function promiseChan(promise) {
  var transducer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var exHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var ch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["b" /* chan */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__buffer__["d" /* promiseBuffer */])(), transducer, exHandler);

  promise.then(function (val) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["f" /* put_ */])(ch, val, function () {
      return ch.close();
    });
  }).catch(function (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["f" /* put_ */])(ch, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__error__["b" /* error */])(e), function () {
      return ch.close();
    });
  });

  return ch;
}

// error-first callback function
function cpsChan(fn) {
  var ch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["b" /* chan */])();

  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  fn.apply(undefined, args.concat([function (err, result) {
    if (err) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["f" /* put_ */])(ch, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__error__["b" /* error */])(err), function () {
      return ch.close();
    });else __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["f" /* put_ */])(ch, result, function () {
      return ch.close();
    });
  }]));

  return ch;
}

function ontoChan(ch, coll) {
  var closeWhenDone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__process__["b" /* go */])(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.mark(function _callee() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, val;

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 3;
            _iterator = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_core_js_get_iterator___default()(coll);

          case 5:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 12;
              break;
            }

            val = _step.value;
            _context.next = 9;
            return [ch, val];

          case 9:
            _iteratorNormalCompletion = true;
            _context.next = 5;
            break;

          case 12:
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](3);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 18:
            _context.prev = 18;
            _context.prev = 19;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 21:
            _context.prev = 21;

            if (!_didIteratorError) {
              _context.next = 24;
              break;
            }

            throw _iteratorError;

          case 24:
            return _context.finish(21);

          case 25:
            return _context.finish(18);

          case 26:

            if (closeWhenDone) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["c" /* close */])(ch);

          case 27:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 14, 18, 26], [19,, 21, 25]]);
  }));

  return ch;
}

var toChan = function toChan(coll) {
  return ontoChan(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["b" /* chan */])(), coll, true);
};

var intoChan = function intoChan(coll, ch) {
  return reduceChan(function (acc, v) {
    return acc.concat([v]);
  }, __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_array_from___default()(coll), ch);
};

function _mapChan(fn, chs) {
  var sizeOrBuffer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  var ch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["b" /* chan */])(sizeOrBuffer);

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__process__["b" /* go */])(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.mark(function _callee2() {
    var values;
    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (ch.closed()) {
              _context2.next = 13;
              break;
            }

            _context2.next = 3;
            return __WEBPACK_IMPORTED_MODULE_7__effects__["all"].apply(undefined, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(chs));

          case 3:
            values = _context2.sent;

            if (!(values.indexOf(__WEBPACK_IMPORTED_MODULE_9__constants__["b" /* CLOSED */]) !== -1)) {
              _context2.next = 9;
              break;
            }

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["c" /* close */])(ch);
            return _context2.abrupt('break', 13);

          case 9:
            _context2.next = 11;
            return [ch, fn.apply(undefined, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(values))];

          case 11:
            _context2.next = 0;
            break;

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return ch;
}

function mapChan(fn) {
  var chs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var sizeOrBuffer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  return chs ? _mapChan(fn, chs, sizeOrBuffer) : function (chs) {
    var sizeOrBuffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return _mapChan(fn, chs, sizeOrBuffer);
  };
}

function _reduceChan(fn, init) {
  var ch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var proc;
  proc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__process__["b" /* go */])(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.mark(function _callee3() {
    var acc, value;
    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            acc = init;

          case 1:
            if (!(!proc || !proc.ch.closed())) {
              _context3.next = 10;
              break;
            }

            _context3.next = 4;
            return ch;

          case 4:
            value = _context3.sent;

            if (!(value === __WEBPACK_IMPORTED_MODULE_9__constants__["b" /* CLOSED */])) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt('break', 10);

          case 7:
            acc = fn(acc, value);
            _context3.next = 1;
            break;

          case 10:
            return _context3.abrupt('return', acc);

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return proc.ch;
}

function reduceChan(fn, init) {
  var ch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  return ch ? _reduceChan(fn, init, ch) : function (ch) {
    return _reduceChan(fn, init, ch);
  };
}

function mergeChan(inChs) {
  var sizeOrBuffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var ch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["b" /* chan */])(sizeOrBuffer);
  var chs = inChs.slice();

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__process__["b" /* go */])(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.mark(function _callee4() {
    var _ref, _ref2, value, inCh, index;

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (ch.closed()) {
              _context4.next = 19;
              break;
            }

            if (!(chs.length === 0)) {
              _context4.next = 4;
              break;
            }

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["c" /* close */])(ch);
            return _context4.abrupt('break', 19);

          case 4:
            _context4.next = 6;
            return __WEBPACK_IMPORTED_MODULE_7__effects__["alts"].apply(undefined, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(chs));

          case 6:
            _ref = _context4.sent;
            _ref2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(_ref, 2);
            value = _ref2[0];
            inCh = _ref2[1];

            if (!(value === __WEBPACK_IMPORTED_MODULE_9__constants__["b" /* CLOSED */])) {
              _context4.next = 15;
              break;
            }

            index = chs.indexOf(inCh);

            chs.splice(index, 1);
            _context4.next = 17;
            break;

          case 15:
            _context4.next = 17;
            return [ch, value];

          case 17:
            _context4.next = 0;
            break;

          case 19:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return ch;
}

var _makePipe = function _makePipe(fnEff) {
  return function (from, to) {
    var closeWhenDone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__process__["b" /* go */])(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.mark(function _callee5() {
      var value, ok;
      return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (false) {
                _context5.next = 16;
                break;
              }

              _context5.next = 3;
              return from;

            case 3:
              value = _context5.sent;

              if (!(value === __WEBPACK_IMPORTED_MODULE_9__constants__["b" /* CLOSED */])) {
                _context5.next = 9;
                break;
              }

              if (closeWhenDone) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["c" /* close */])(to);
              return _context5.abrupt('break', 16);

            case 9:
              _context5.next = 11;
              return fnEff(to, value);

            case 11:
              ok = _context5.sent;

              if (ok) {
                _context5.next = 14;
                break;
              }

              return _context5.abrupt('break', 16);

            case 14:
              _context5.next = 0;
              break;

            case 16:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));
  };
};

var pipe = function pipe(from, to) {
  var closeWhenDone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return _makePipe(function (to, v) {
    return [to, v];
  })(from, to, closeWhenDone);
};

var pipelineGo = function pipelineGo(to, af, from) {
  var closeWhenDone = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  return _makePipe(function (to, v) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__effects__["fork"])(af, v, to);
  })(from, to, closeWhenDone);
};

function pipeline(to, xf, from) {
  var closeWhenDone = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var exh = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  var ch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["b" /* chan */])(1, xf, exh);

  pipe(from, ch, closeWhenDone);
  pipe(ch, to, closeWhenDone);
}

function pipelineAsync(to, af, from) {
  var closeWhenDone = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__process__["b" /* go */])(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.mark(function _callee6() {
    var value, ch, result, ok;
    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (false) {
              _context6.next = 22;
              break;
            }

            _context6.next = 3;
            return from;

          case 3:
            value = _context6.sent;

            if (!(value === __WEBPACK_IMPORTED_MODULE_9__constants__["b" /* CLOSED */])) {
              _context6.next = 9;
              break;
            }

            if (closeWhenDone) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["c" /* close */])(to);
            return _context6.abrupt('break', 22);

          case 9:
            ch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["b" /* chan */])();

            af(value, ch);
            _context6.next = 13;
            return ch;

          case 13:
            result = _context6.sent;

            if (!(result !== __WEBPACK_IMPORTED_MODULE_9__constants__["b" /* CLOSED */])) {
              _context6.next = 20;
              break;
            }

            _context6.next = 17;
            return [to, result];

          case 17:
            ok = _context6.sent;

            if (ok) {
              _context6.next = 20;
              break;
            }

            return _context6.abrupt('break', 22);

          case 20:
            _context6.next = 0;
            break;

          case 22:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));
}

function split(pred, ch) {
  var tsizeOrBuffer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var fsizeOrBuffer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  if (!tsizeOrBuffer) tsizeOrBuffer = 1;
  if (!fsizeOrBuffer) fsizeOrBuffer = tsizeOrBuffer;

  var ct = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["b" /* chan */])(tsizeOrBuffer);
  var cf = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["b" /* chan */])(fsizeOrBuffer);

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__process__["b" /* go */])(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.mark(function _callee7() {
    var value;
    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            if (ct.closed() && cf.closed()) {
              _context7.next = 19;
              break;
            }

            _context7.next = 3;
            return ch;

          case 3:
            value = _context7.sent;

            if (!(value === __WEBPACK_IMPORTED_MODULE_9__constants__["b" /* CLOSED */])) {
              _context7.next = 10;
              break;
            }

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["c" /* close */])(ct);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__channel__["c" /* close */])(cf);
            return _context7.abrupt('break', 19);

          case 10:
            if (!pred(value)) {
              _context7.next = 15;
              break;
            }

            _context7.next = 13;
            return [ct, value];

          case 13:
            _context7.next = 17;
            break;

          case 15:
            _context7.next = 17;
            return [cf, value];

          case 17:
            _context7.next = 0;
            break;

          case 19:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return [ct, cf];
}

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return Mix; });
/* harmony export (immutable) */ __webpack_exports__["a"] = mix;
/* harmony export (immutable) */ __webpack_exports__["b"] = stopMix;
/* harmony export (immutable) */ __webpack_exports__["c"] = admix;
/* harmony export (immutable) */ __webpack_exports__["d"] = unmix;
/* harmony export (immutable) */ __webpack_exports__["e"] = unmixAll;
/* harmony export (immutable) */ __webpack_exports__["f"] = soloMode;
/* harmony export (immutable) */ __webpack_exports__["g"] = toggle;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__channel__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__effects__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__process__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__constants__ = __webpack_require__(2);












var Mix = function () {
  function Mix(ch) {
    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_classCallCheck___default()(this, Mix);

    this.ch = ch;
    this.sources = [];
    this.soloMode = __WEBPACK_IMPORTED_MODULE_10__constants__["d" /* MIX_MUTE */];
    this.changeCh = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__channel__["b" /* chan */])();
  }

  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_createClass___default()(Mix, [{
    key: 'run',
    value: function run() {
      var self = this;
      this.running = true;

      this.proc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__process__["b" /* go */])(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee() {
        var _this = this;

        var _loop, _ret;

        return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _loop = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _loop() {
                  var solo, activeSources, mutedSources, altChannels, _ref, _ref2, active, chan, value, ok;

                  return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _loop$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          solo = self.sources.findIndex(function (s) {
                            return s.solo;
                          }) !== -1;
                          activeSources = self.sources.filter(function (s) {
                            return solo ? s.solo : !(s.mute || s.pause);
                          });
                          mutedSources = self.sources.filter(function (s) {
                            return solo ? self.soloMode === __WEBPACK_IMPORTED_MODULE_10__constants__["d" /* MIX_MUTE */] && !s.solo && !s.pause : s.mute && !s.pause;
                          });
                          altChannels = [].concat([[self.changeCh, [__WEBPACK_IMPORTED_MODULE_10__constants__["g" /* MIX_CHANGED */]]]], activeSources.map(function (s) {
                            return [s.ch, function (v) {
                              return [true, s.ch, v];
                            }];
                          }), mutedSources.map(function (s) {
                            return [s.ch, [false, s.ch]];
                          }));
                          _context.next = 6;
                          return __WEBPACK_IMPORTED_MODULE_8__effects__["alt"].apply(undefined, __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_toConsumableArray___default()(altChannels));

                        case 6:
                          _ref = _context.sent;
                          _ref2 = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray___default()(_ref, 3);
                          active = _ref2[0];
                          chan = _ref2[1];
                          value = _ref2[2];

                          if (!(value === __WEBPACK_IMPORTED_MODULE_10__constants__["b" /* CLOSED */])) {
                            _context.next = 15;
                            break;
                          }

                          self.remove(chan);
                          _context.next = 25;
                          break;

                        case 15:
                          if (!(active === __WEBPACK_IMPORTED_MODULE_10__constants__["g" /* MIX_CHANGED */])) {
                            _context.next = 19;
                            break;
                          }

                          return _context.abrupt('return', 'continue');

                        case 19:
                          if (!active) {
                            _context.next = 25;
                            break;
                          }

                          _context.next = 22;
                          return [self.ch, value];

                        case 22:
                          ok = _context.sent;

                          if (ok) {
                            _context.next = 25;
                            break;
                          }

                          return _context.abrupt('return', 'break');

                        case 25:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _loop, _this);
                });

              case 1:
                if (!(self.sources.length !== 0)) {
                  _context2.next = 11;
                  break;
                }

                return _context2.delegateYield(_loop(), 't0', 3);

              case 3:
                _ret = _context2.t0;
                _context2.t1 = _ret;
                _context2.next = _context2.t1 === 'continue' ? 7 : _context2.t1 === 'break' ? 8 : 9;
                break;

              case 7:
                return _context2.abrupt('continue', 1);

              case 8:
                return _context2.abrupt('break', 11);

              case 9:
                _context2.next = 1;
                break;

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee, this);
      }));

      return this;
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (!this.running) return;

      this.proc.kill();
      this.running = false;
    }
  }, {
    key: 'add',
    value: function add(ch) {
      var mute = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var pause = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var solo = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      this.sources.push({ ch: ch, mute: mute, pause: pause, solo: solo });

      if (!this.running) this.run();else __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__channel__["f" /* put_ */])(this.changeCh, null);
    }
  }, {
    key: 'remove',
    value: function remove(ch) {
      var index = this.sources.findIndex(function (t) {
        return t.ch === ch;
      });
      if (index > -1) {
        this.sources.splice(index, 1);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__channel__["f" /* put_ */])(this.changeCh, null);
      }
    }
  }, {
    key: 'removeAll',
    value: function removeAll() {
      this.sources = [];
      this.stop();
    }
  }, {
    key: 'setSoloMode',
    value: function setSoloMode(mode) {
      this.soloMode = mode;
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__channel__["f" /* put_ */])(this.changeCh, null);
    }
  }, {
    key: 'toggle',
    value: function toggle(ch) {
      var stateMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var index = this.sources.findIndex(function (t) {
        return t.ch === ch;
      });
      if (index > -1) {
        var source = this.sources[index];
        this.sources[index] = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, source, {
          mute: stateMap.hasOwnProperty('mute') ? stateMap.mute : source.mute,
          pause: stateMap.hasOwnProperty('pause') ? stateMap.pause : source.pause,
          solo: stateMap.hasOwnProperty('solo') ? stateMap.solo : source.solo
        });
      } else {
        var mute = !!stateMap.mute;
        var pause = !!stateMap.pause;
        var _solo = !!stateMap.solo;
        this.add(ch, mute, pause, _solo);
      }

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__channel__["f" /* put_ */])(this.changeCh, null);
    }
  }]);

  return Mix;
}();

function mix(ch) {
  return new Mix(ch);
}

function stopMix(mix) {
  mix.stop();
}

function admix(mix, ch) {
  mix.add(ch);
}

function unmix(mix, ch) {
  mix.remove(ch);
}

function unmixAll(mix) {
  mix.removeAll();
}

function soloMode(mix, mode) {
  mix.setSoloMode(mode);
}

// XXX: objects cannot really be keys, so can't use a map
function toggle(mix, chOrList) {
  var stateMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (chOrList instanceof __WEBPACK_IMPORTED_MODULE_7__channel__["a" /* Channel */]) {
    mix.toggle(chOrList, stateMap);
  } else {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(chOrList), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray___default()(_step.value, 2),
            ch = _step$value[0],
            _stateMap = _step$value[1];

        mix.toggle(ch, _stateMap);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
}

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return nextTick; });
// Based on, but significantly changed from:
//
// Copyright 2013 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var hasMC = typeof MessageChannel !== 'undefined';
var hasWindow = typeof window !== 'undefined';
var hasGlobal = typeof global !== 'undefined';
var hasWindowProto = typeof Window !== 'undefined' && Window.prototype;
var hasImpScripts = typeof importScripts !== 'undefined';
var hasNavigator = typeof navigator !== 'undefined';
var ua = hasNavigator && navigator ? navigator.userAgent : '';
var isEdge = ua.indexOf('Edge') !== -1;
var isPresto = ua.indexOf('Presto') !== -1;
var isIE = ua.indexOf('MSIE') !== -1 || ua.indexOf('Trident') !== -1;

function implSetTimeout() {
  return function (fn) {
    setTimeout(fn, 0);
  };
}

function implPostMessage() {
  var messagePrefix = 'setImmediate$' + Math.random() + '$';

  var head = { next: null };
  var tail = head;

  addEventListener('message', function (event) {
    if (typeof event.data === 'string' && event.data === messagePrefix) {
      if (head.next) {
        head = head.next;
        head.fn();
      }
    }
  }, false);

  return function (fn) {
    tail.next = { fn: fn, next: null };
    tail = tail.next;
    postMessage(messagePrefix, '*');
  };
}

function implMessageChannel() {
  var channel = new MessageChannel();

  var head = { next: null };
  var tail = head;

  channel.port1.onmessage = function () {
    if (head.next) {
      head = head.next;
      head.fn();
    }
  };

  return function (fn) {
    tail.next = { fn: fn, next: null };
    tail = tail.next;
    channel.port2.postMessage(0);
  };
}

function getNextTickImpl() {
  if (isEdge && typeof window.setImmediate !== 'undefined') {
    return window.setImmediate;
  }
  if (!hasWindowProto && hasGlobal && typeof global.setImmediate !== 'undefined') {
    return global.setImmediate;
  }

  if (!hasMC && hasWindow && window.postMessage && window.addEventListener && !hasImpScripts && !isPresto) {
    return implPostMessage();
  }

  if (hasMC && !isIE) {
    return implMessageChannel();
  }

  return implSetTimeout();
}

var nextTick = getNextTickImpl();
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(48)))

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return Pub; });
/* harmony export (immutable) */ __webpack_exports__["a"] = pub;
/* harmony export (immutable) */ __webpack_exports__["b"] = stopPub;
/* harmony export (immutable) */ __webpack_exports__["c"] = sub;
/* harmony export (immutable) */ __webpack_exports__["d"] = unsub;
/* harmony export (immutable) */ __webpack_exports__["e"] = unsubAll;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__channel__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__effects__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__process__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mult__ = __webpack_require__(31);










var Pub = function () {
  function Pub(ch, topicFn, bufFn) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Pub);

    this.ch = ch;
    this.topicFn = topicFn;
    this.bufFn = bufFn;
    this.running = false;
    this.proc = null;
    this.mults = {};
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Pub, [{
    key: 'run',
    value: function run() {
      var self = this;
      this.running = true;

      this.proc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__process__["b" /* go */])(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee() {
        var val, topic, ok;
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (false) {
                  _context.next = 17;
                  break;
                }

                _context.next = 3;
                return self.ch;

              case 3:
                val = _context.sent;

                if (!(val === __WEBPACK_IMPORTED_MODULE_7__constants__["b" /* CLOSED */])) {
                  _context.next = 9;
                  break;
                }

                self.removeAll();
                return _context.abrupt('break', 17);

              case 9:
                topic = self.topicFn(val);

                if (!self.mults[topic]) {
                  _context.next = 15;
                  break;
                }

                _context.next = 13;
                return [self.mults[topic].ch, val];

              case 13:
                ok = _context.sent;

                if (!ok) self.removeAll(topic);

              case 15:
                _context.next = 0;
                break;

              case 17:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return this;
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (!this.running) return;

      this.proc.kill();
      this.running = false;
    }
  }, {
    key: 'add',
    value: function add(topic, ch) {
      var close = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (!this.mults.hasOwnProperty(topic)) {
        var cm = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__channel__["b" /* chan */])(this.bufFn(topic));
        this.mults[topic] = { mult: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__mult__["a" /* mult */])(cm), ch: cm };
      }
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__mult__["c" /* tap */])(this.mults[topic].mult, ch, close);

      if (!this.running) this.run();
    }
  }, {
    key: 'remove',
    value: function remove(topic, ch) {
      if (!this.mults.hasOwnProperty(topic)) return;

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__mult__["e" /* untap */])(this.mults[topic].mult, ch);
      if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__mult__["d" /* taps */])(this.mults[topic].mult) === 0) {
        this.closeTopic(topic);
      }
    }
  }, {
    key: 'closeTopic',
    value: function closeTopic(topic) {
      // XXX: untap all of them first, to avoid close() propagation?
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__channel__["c" /* close */])(this.mults[topic].ch);
      delete this.mults[topic];
    }
  }, {
    key: 'removeAll',
    value: function removeAll() {
      var _this = this;

      var topic = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (topic) {
        if (this.mults[topic]) this.closeTopic(topic);
      } else {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(this.mults).forEach(function (t) {
          return _this.closeTopic(t);
        });
      }
    }
  }]);

  return Pub;
}();

function pub(ch, topicFn) {
  var bufFnOrBuf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  var bufFn = typeof bufFnOrBuf === 'function' ? bufFnOrBuf : function (_) {
    return bufFnOrBuf;
  };

  return new Pub(ch, topicFn, bufFn).run();
}

function stopPub(p) {
  p.stop();
}

function sub(p, topic, ch) {
  var close = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  p.add(topic, ch, close);
}

function unsub(p, topic, ch) {
  p.remove(topic, ch);
}

function unsubAll(p) {
  var topic = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  p.removeAll(topic);
}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(79);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(78);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(33)
  , TAG = __webpack_require__(1)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(20)
  , document = __webpack_require__(5).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(11) && !__webpack_require__(15)(function(){
  return Object.defineProperty(__webpack_require__(56)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(33);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(37)
  , $export        = __webpack_require__(4)
  , redefine       = __webpack_require__(65)
  , hide           = __webpack_require__(16)
  , has            = __webpack_require__(12)
  , Iterators      = __webpack_require__(17)
  , $iterCreate    = __webpack_require__(103)
  , setToStringTag = __webpack_require__(40)
  , getPrototypeOf = __webpack_require__(62)
  , ITERATOR       = __webpack_require__(1)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(27)
  , createDesc     = __webpack_require__(21)
  , toIObject      = __webpack_require__(13)
  , toPrimitive    = __webpack_require__(44)
  , has            = __webpack_require__(12)
  , IE8_DOM_DEFINE = __webpack_require__(57)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(11) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(63)
  , hiddenKeys = __webpack_require__(36).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(12)
  , toObject    = __webpack_require__(22)
  , IE_PROTO    = __webpack_require__(41)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(12)
  , toIObject    = __webpack_require__(13)
  , arrayIndexOf = __webpack_require__(96)(false)
  , IE_PROTO     = __webpack_require__(41)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(4)
  , core    = __webpack_require__(0)
  , fails   = __webpack_require__(15);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(43)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(55)
  , ITERATOR  = __webpack_require__(1)('iterator')
  , Iterators = __webpack_require__(17);
module.exports = __webpack_require__(0).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["stop"] = stop;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__internal_constants__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PROCESS_KILLED", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_constants__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CLOSED", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_constants__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "NO_VAL", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_constants__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "MIX_MUTE", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_constants__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "MIX_PAUSE", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_constants__["e"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__internal_process__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Process", function() { return __WEBPACK_IMPORTED_MODULE_1__internal_process__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "go", function() { return __WEBPACK_IMPORTED_MODULE_1__internal_process__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "kill", function() { return __WEBPACK_IMPORTED_MODULE_1__internal_process__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__internal_buffer__ = __webpack_require__(30);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fixedBuffer", function() { return __WEBPACK_IMPORTED_MODULE_2__internal_buffer__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "droppingBuffer", function() { return __WEBPACK_IMPORTED_MODULE_2__internal_buffer__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "slidingBuffer", function() { return __WEBPACK_IMPORTED_MODULE_2__internal_buffer__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "promiseBuffer", function() { return __WEBPACK_IMPORTED_MODULE_2__internal_buffer__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__internal_channel__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Channel", function() { return __WEBPACK_IMPORTED_MODULE_3__internal_channel__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "chan", function() { return __WEBPACK_IMPORTED_MODULE_3__internal_channel__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "close", function() { return __WEBPACK_IMPORTED_MODULE_3__internal_channel__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "offer", function() { return __WEBPACK_IMPORTED_MODULE_3__internal_channel__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "poll", function() { return __WEBPACK_IMPORTED_MODULE_3__internal_channel__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "put_", function() { return __WEBPACK_IMPORTED_MODULE_3__internal_channel__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "take_", function() { return __WEBPACK_IMPORTED_MODULE_3__internal_channel__["g"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__internal_error__ = __webpack_require__(19);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Error", function() { return __WEBPACK_IMPORTED_MODULE_4__internal_error__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "error", function() { return __WEBPACK_IMPORTED_MODULE_4__internal_error__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "isError", function() { return __WEBPACK_IMPORTED_MODULE_4__internal_error__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__internal_handler__ = __webpack_require__(23);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Handler", function() { return __WEBPACK_IMPORTED_MODULE_5__internal_handler__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FnHandler", function() { return __WEBPACK_IMPORTED_MODULE_5__internal_handler__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__internal_mix__ = __webpack_require__(50);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mix", function() { return __WEBPACK_IMPORTED_MODULE_6__internal_mix__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stopMix", function() { return __WEBPACK_IMPORTED_MODULE_6__internal_mix__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "admix", function() { return __WEBPACK_IMPORTED_MODULE_6__internal_mix__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "unmix", function() { return __WEBPACK_IMPORTED_MODULE_6__internal_mix__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "unmixAll", function() { return __WEBPACK_IMPORTED_MODULE_6__internal_mix__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "soloMode", function() { return __WEBPACK_IMPORTED_MODULE_6__internal_mix__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "toggle", function() { return __WEBPACK_IMPORTED_MODULE_6__internal_mix__["g"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__internal_mult__ = __webpack_require__(31);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mult", function() { return __WEBPACK_IMPORTED_MODULE_7__internal_mult__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stopMult", function() { return __WEBPACK_IMPORTED_MODULE_7__internal_mult__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "tap", function() { return __WEBPACK_IMPORTED_MODULE_7__internal_mult__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "taps", function() { return __WEBPACK_IMPORTED_MODULE_7__internal_mult__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "untap", function() { return __WEBPACK_IMPORTED_MODULE_7__internal_mult__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "untapAll", function() { return __WEBPACK_IMPORTED_MODULE_7__internal_mult__["f"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__internal_pub__ = __webpack_require__(52);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "pub", function() { return __WEBPACK_IMPORTED_MODULE_8__internal_pub__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stopPub", function() { return __WEBPACK_IMPORTED_MODULE_8__internal_pub__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return __WEBPACK_IMPORTED_MODULE_8__internal_pub__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "unsub", function() { return __WEBPACK_IMPORTED_MODULE_8__internal_pub__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "unsubAll", function() { return __WEBPACK_IMPORTED_MODULE_8__internal_pub__["e"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__internal_helper__ = __webpack_require__(49);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "tickerChan", function() { return __WEBPACK_IMPORTED_MODULE_9__internal_helper__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "timeoutChan", function() { return __WEBPACK_IMPORTED_MODULE_9__internal_helper__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "promiseChan", function() { return __WEBPACK_IMPORTED_MODULE_9__internal_helper__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "cpsChan", function() { return __WEBPACK_IMPORTED_MODULE_9__internal_helper__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ontoChan", function() { return __WEBPACK_IMPORTED_MODULE_9__internal_helper__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "toChan", function() { return __WEBPACK_IMPORTED_MODULE_9__internal_helper__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "intoChan", function() { return __WEBPACK_IMPORTED_MODULE_9__internal_helper__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mapChan", function() { return __WEBPACK_IMPORTED_MODULE_9__internal_helper__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "reduceChan", function() { return __WEBPACK_IMPORTED_MODULE_9__internal_helper__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mergeChan", function() { return __WEBPACK_IMPORTED_MODULE_9__internal_helper__["j"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "pipe", function() { return __WEBPACK_IMPORTED_MODULE_9__internal_helper__["k"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "pipelineGo", function() { return __WEBPACK_IMPORTED_MODULE_9__internal_helper__["l"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "pipeline", function() { return __WEBPACK_IMPORTED_MODULE_9__internal_helper__["m"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "pipelineAsync", function() { return __WEBPACK_IMPORTED_MODULE_9__internal_helper__["n"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "split", function() { return __WEBPACK_IMPORTED_MODULE_9__internal_helper__["o"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__internal_effects__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "addEffectHandler", function() { return __WEBPACK_IMPORTED_MODULE_10__internal_effects__["addEffectHandler"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "handleEffect", function() { return __WEBPACK_IMPORTED_MODULE_10__internal_effects__["handleEffect"]; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "effects", function() { return __WEBPACK_IMPORTED_MODULE_10__internal_effects__; });






















function stop(o) {
  if (o instanceof __WEBPACK_IMPORTED_MODULE_8__internal_pub__["f" /* Pub */]) stopPub(o);else if (o instanceof __WEBPACK_IMPORTED_MODULE_7__internal_mult__["g" /* Mult */]) stopMult(o);else if (o instanceof __WEBPACK_IMPORTED_MODULE_6__internal_mix__["h" /* Mix */]) stopMix(o);
}








/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = run;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nextTick__ = __webpack_require__(51);


// clojurescript-style 'dispatch'
var tasks = [];
var TASK_BATCH_SIZE = 1024;
var running = false;
var queued = false;

function processMessages() {
  running = true;
  queued = false;

  var count = 0;

  while (tasks.length > 0 && count < TASK_BATCH_SIZE) {
    var task = tasks.shift();

    task();

    ++count;
  }

  running = false;

  if (tasks.length > 0) queueDispatcher();
}

function queueDispatcher() {
  if (!(queued && running)) {
    queued = true;
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__nextTick__["a" /* nextTick */])(processMessages);
  }
}

function run(fn) {
  tasks.push(fn);
  queueDispatcher();
}

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return reduced; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return step; });
/* unused harmony export result */
var reduced = function reduced(t) {
  return t && t.hasOwnProperty('@@transducer/reduced');
};
var step = function step(t, result, input) {
  return t['@@transducer/step'](result, input);
};
var result = function result(t, _result) {
  return t['@@transducer/result'](_result);
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(87), __esModule: true };

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(90), __esModule: true };

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(91), __esModule: true };

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(92), __esModule: true };

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(72);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(77);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(73);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(54);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(54);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29);
__webpack_require__(116);
module.exports = __webpack_require__(0).Array.from;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47);
__webpack_require__(29);
module.exports = __webpack_require__(114);

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47);
__webpack_require__(29);
module.exports = __webpack_require__(115);

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(118);
module.exports = __webpack_require__(0).Object.assign;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(119);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(120);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(121);
module.exports = __webpack_require__(0).Object.getPrototypeOf;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(122);
module.exports = __webpack_require__(0).Object.keys;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(123);
module.exports = __webpack_require__(0).Object.setPrototypeOf;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(125);
__webpack_require__(124);
__webpack_require__(126);
__webpack_require__(127);
module.exports = __webpack_require__(0).Symbol;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29);
__webpack_require__(47);
module.exports = __webpack_require__(46).f('iterator');

/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(13)
  , toLength  = __webpack_require__(66)
  , toIndex   = __webpack_require__(113);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(6)
  , createDesc      = __webpack_require__(21);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(18)
  , gOPS    = __webpack_require__(39)
  , pIE     = __webpack_require__(27);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5).document && document.documentElement;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(17)
  , ITERATOR   = __webpack_require__(1)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(33);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(10);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(38)
  , descriptor     = __webpack_require__(21)
  , setToStringTag = __webpack_require__(40)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(16)(IteratorPrototype, __webpack_require__(1)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(1)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(18)
  , toIObject = __webpack_require__(13);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(28)('meta')
  , isObject = __webpack_require__(20)
  , has      = __webpack_require__(12)
  , setDesc  = __webpack_require__(6).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(15)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(18)
  , gOPS     = __webpack_require__(39)
  , pIE      = __webpack_require__(27)
  , toObject = __webpack_require__(22)
  , IObject  = __webpack_require__(58)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(15)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(6)
  , anObject = __webpack_require__(10)
  , getKeys  = __webpack_require__(18);

module.exports = __webpack_require__(11) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(13)
  , gOPN      = __webpack_require__(61).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(20)
  , anObject = __webpack_require__(10);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(34)(Function.call, __webpack_require__(60).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(43)
  , defined   = __webpack_require__(35);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(43)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(10)
  , get      = __webpack_require__(67);
module.exports = __webpack_require__(0).getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(55)
  , ITERATOR  = __webpack_require__(1)('iterator')
  , Iterators = __webpack_require__(17);
module.exports = __webpack_require__(0).isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(34)
  , $export        = __webpack_require__(4)
  , toObject       = __webpack_require__(22)
  , call           = __webpack_require__(102)
  , isArrayIter    = __webpack_require__(100)
  , toLength       = __webpack_require__(66)
  , createProperty = __webpack_require__(97)
  , getIterFn      = __webpack_require__(67);

$export($export.S + $export.F * !__webpack_require__(104)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(95)
  , step             = __webpack_require__(105)
  , Iterators        = __webpack_require__(17)
  , toIObject        = __webpack_require__(13);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(59)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(4);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(108)});

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(38)});

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(11), 'Object', {defineProperty: __webpack_require__(6).f});

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(22)
  , $getPrototypeOf = __webpack_require__(62);

__webpack_require__(64)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(22)
  , $keys    = __webpack_require__(18);

__webpack_require__(64)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(4);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(111).set});

/***/ }),
/* 124 */
/***/ (function(module, exports) {



/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(5)
  , has            = __webpack_require__(12)
  , DESCRIPTORS    = __webpack_require__(11)
  , $export        = __webpack_require__(4)
  , redefine       = __webpack_require__(65)
  , META           = __webpack_require__(107).KEY
  , $fails         = __webpack_require__(15)
  , shared         = __webpack_require__(42)
  , setToStringTag = __webpack_require__(40)
  , uid            = __webpack_require__(28)
  , wks            = __webpack_require__(1)
  , wksExt         = __webpack_require__(46)
  , wksDefine      = __webpack_require__(45)
  , keyOf          = __webpack_require__(106)
  , enumKeys       = __webpack_require__(98)
  , isArray        = __webpack_require__(101)
  , anObject       = __webpack_require__(10)
  , toIObject      = __webpack_require__(13)
  , toPrimitive    = __webpack_require__(44)
  , createDesc     = __webpack_require__(21)
  , _create        = __webpack_require__(38)
  , gOPNExt        = __webpack_require__(110)
  , $GOPD          = __webpack_require__(60)
  , $DP            = __webpack_require__(6)
  , $keys          = __webpack_require__(18)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(61).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(27).f  = $propertyIsEnumerable;
  __webpack_require__(39).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(37)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(16)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(45)('asyncIterator');

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(45)('observable');

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g =
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this;

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(129);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(48)))

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(48)))

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(68);


/***/ })
/******/ ]);
});
//# sourceMappingURL=chango.es5.js.map