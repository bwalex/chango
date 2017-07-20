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
/******/ 	return __webpack_require__(__webpack_require__.s = 81);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const PROCESS_KILLED = '@@csp/PROCESS_KILLED';
/* harmony export (immutable) */ __webpack_exports__["a"] = PROCESS_KILLED;

const PROCESS_KILL = '@@csp/PROCESS_KILL';
/* harmony export (immutable) */ __webpack_exports__["h"] = PROCESS_KILL;

const CLOSED = '@@csp/CLOSED';
/* harmony export (immutable) */ __webpack_exports__["b"] = CLOSED;

const NO_VAL = '@@csp/NO_VAL';
/* harmony export (immutable) */ __webpack_exports__["c"] = NO_VAL;

const TICK = '@@csp/TICK';
/* harmony export (immutable) */ __webpack_exports__["f"] = TICK;

const MIX_MUTE = '@@csp/mix/MUTE';
/* harmony export (immutable) */ __webpack_exports__["d"] = MIX_MUTE;

const MIX_PAUSE = '@@csp/mix/PAUSE';
/* harmony export (immutable) */ __webpack_exports__["e"] = MIX_PAUSE;

const MIX_SOLO = '@@csp/mix/PAUSE';
/* unused harmony export MIX_SOLO */

const MIX_CHANGED = '@@csp/mix/CHANGED';
/* harmony export (immutable) */ __webpack_exports__["g"] = MIX_CHANGED;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = chan;
/* harmony export (immutable) */ __webpack_exports__["c"] = close;
/* harmony export (immutable) */ __webpack_exports__["d"] = offer;
/* harmony export (immutable) */ __webpack_exports__["e"] = poll;
/* harmony export (immutable) */ __webpack_exports__["f"] = put_;
/* harmony export (immutable) */ __webpack_exports__["g"] = take_;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__buffer__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transducers__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dispatch__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__handler__ = __webpack_require__(8);








const BufferAddTransformer = {
  '@@transducer/init': function () {},
  '@@transducer/result': result => result,
  '@@transducer/step': (result, input) => result.add(input)
};

function exHandler(ex) {
  console.log(ex);
  return __WEBPACK_IMPORTED_MODULE_3__constants__["b" /* CLOSED */];
}

function handleEx(buf, exh = null) {
  const handler = function (ex) {
    const val = (exh || exHandler)(ex);
    return val === __WEBPACK_IMPORTED_MODULE_3__constants__["b" /* CLOSED */] ? buf : buf.add(val);
  };

  return function (xf) {
    return {
      '@@transducer/init': function () {},
      '@@transducer/result': function (result) {
        try {
          return result(xf, result);
        } catch (e) {
          return handler(e);
        }
      },
      '@@transducer/step': function (result, input) {
        try {
          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__transducers__["a" /* step */])(xf, result, input);
        } catch (e) {
          return handler(e);
        }
      }
    };
  };
}

function commitAndRun(handler, ...args) {
  if (!handler.active()) return;

  const cb = handler.commit();
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__dispatch__["a" /* run */])(() => cb(...args));
}

class Channel {
  constructor(buffer, transducer, exHandler, unbuffered) {
    this._closed = false;
    this.buffer = buffer;
    this.exHandler = exHandler;
    this.puts = [];
    this.takes = [];
    this.unbuffered = unbuffered;

    let xform = transducer ? transducer(BufferAddTransformer) : BufferAddTransformer;
    this.xform = handleEx(this.buffer, exHandler)(xform);
  }

  hasTakes() {
    return this.takes.length > 0;
  }

  close() {
    if (this._closed) return;

    this._closed = true;

    while (this.takes.length > 0) {
      const taker = this.takes.shift();
      commitAndRun(taker, __WEBPACK_IMPORTED_MODULE_3__constants__["b" /* CLOSED */]);
    }

    if (!this.unbuffered) {
      while (this.puts.length > 0) {
        const [val, putter] = this.puts.shift();
        commitAndRun(putter, false);
      }
    }

    this.buffer.close();
  }

  closed() {
    return this._closed;
  }

  put(val, handler) {
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

  putOne(handler, val) {
    if (!handler.active()) return;

    const done = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__transducers__["b" /* reduced */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__transducers__["a" /* step */])(this.xform, this.buffer, val));
    commitAndRun(handler, true);

    while (this.buffer.count() > 0 && this.takes.length > 0) {
      const taker = this.takes.shift();
      if (taker.active()) {
        const val = this.buffer.remove();
        commitAndRun(taker, val);
      }
    }

    if (done) this.close();
  }

  take(handler) {
    if (!handler.active()) return __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* NO_VAL */];

    if (this.buffer.count() > 0) {
      const val = this.buffer.remove();
      commitAndRun(handler, val);

      while (!this.buffer.full() && this.puts.length > 0) {
        const [val, putter] = this.puts.shift();
        this.putOne(putter, val);
      }
      return val;
    } else if (this.unbuffered && this.puts.length > 0) {
      const [val, putter] = this.puts.shift();
      this.takes.push(handler);
      this.putOne(putter, val);
    } else if (this._closed) {
      commitAndRun(handler, __WEBPACK_IMPORTED_MODULE_3__constants__["b" /* CLOSED */]);
      return __WEBPACK_IMPORTED_MODULE_3__constants__["b" /* CLOSED */];
    } else if (handler.blockable()) {
      this.takes.push(handler);
      return __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* NO_VAL */];
    }

    return __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* NO_VAL */];
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Channel;


function chan(sizeOrBuffer = null, transducer = null, exHandler = null) {
  const unbuffered = sizeOrBuffer === null;

  const buffer = unbuffered || typeof sizeOrBuffer === 'number' ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__buffer__["a" /* fixedBuffer */])(unbuffered ? 1 : sizeOrBuffer) : sizeOrBuffer;

  return new Channel(buffer, transducer, exHandler, unbuffered);
}

function close(ch) {
  ch.close();
}

function offer(ch, val) {
  return ch.put(val, new __WEBPACK_IMPORTED_MODULE_4__handler__["b" /* FnHandler */](function () {}, false));
}

function poll(ch) {
  return ch.take(new __WEBPACK_IMPORTED_MODULE_4__handler__["b" /* FnHandler */](function () {}, false));
}

function put_(ch, val, cb = null) {
  if (!cb) cb = function () {};
  return ch.put(val, new __WEBPACK_IMPORTED_MODULE_4__handler__["b" /* FnHandler */](cb));
}

function take_(ch, cb) {
  return ch.take(new __WEBPACK_IMPORTED_MODULE_4__handler__["b" /* FnHandler */](cb));
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["addEffectHandler"] = addEffectHandler;
/* harmony export (immutable) */ __webpack_exports__["runEffectTranslators"] = runEffectTranslators;
/* harmony export (immutable) */ __webpack_exports__["handleEffect"] = handleEffect;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__handler__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__channel__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__process__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__error__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util__ = __webpack_require__(30);







let effectHandlers = {};

function addEffectHandler(name, handler) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util__["a" /* warning */])(!effectHandlers.hasOwnProperty(name), `Overriding built-in effect handler ${name}`);

  effectHandlers[name] = handler;
}

function runEffectTranslators(effect) {
  if (effect instanceof __WEBPACK_IMPORTED_MODULE_1__channel__["a" /* Channel */]) {
    return take(effect);
  } else if (Array.isArray(effect) && effect.length == 2 && effect[0] instanceof __WEBPACK_IMPORTED_MODULE_1__channel__["a" /* Channel */]) {
    return put(effect[0], effect[1]);
  } else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util__["b" /* isPromise */])(effect)) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__helper__["c" /* promiseChan */])(effect);
  } else {
    return effect;
  }
}

function handleEffect(effect, doneFn, proc) {
  effect = runEffectTranslators(effect);

  if (effect && effect.hasOwnProperty('type')) {
    const name = effect.type;
    if (effectHandlers.hasOwnProperty(name)) {
      effectHandlers[name](effect, doneFn, proc);
      return;
    }
  }

  dummyHandler(effect, doneFn);
}

// effect generators
const put = (ch, val) => ({
  type: 'put',
  ch,
  val
});
/* harmony export (immutable) */ __webpack_exports__["put"] = put;


const take = ch => ({
  type: 'take',
  ch
});
/* harmony export (immutable) */ __webpack_exports__["take"] = take;


const sleep = ms => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__helper__["b" /* timeoutChan */])(ms);
/* harmony export (immutable) */ __webpack_exports__["sleep"] = sleep;


const call = (fn, ...args) => ({
  type: 'call',
  fn,
  args
});
/* harmony export (immutable) */ __webpack_exports__["call"] = call;


// error-first callback function
const cps = (fn, ...args) => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__helper__["d" /* cpsChan */])(fn, ...args);
/* harmony export (immutable) */ __webpack_exports__["cps"] = cps;


const fork = (procOrFn, ...args) => ({
  type: 'fork',
  procOrFn,
  args
});
/* harmony export (immutable) */ __webpack_exports__["fork"] = fork;


const spawn = (fn, ...args) => ({
  type: 'spawn',
  fn,
  args
});
/* harmony export (immutable) */ __webpack_exports__["spawn"] = spawn;


const alts = (...ports) => ({
  type: 'alts',
  ports
});
/* harmony export (immutable) */ __webpack_exports__["alts"] = alts;


const alt = (...ports) => ({
  type: 'alt',
  ports
});
/* harmony export (immutable) */ __webpack_exports__["alt"] = alt;


const all = (...ports) => ({
  type: 'all',
  ports
});
/* harmony export (immutable) */ __webpack_exports__["all"] = all;


const nop = () => ({
  type: 'nop'
});
/* harmony export (immutable) */ __webpack_exports__["nop"] = nop;


const _map = (fn, effect) => ({
  type: 'map',
  fn,
  effect
});

const map = (fn, effect = null) => effect ? _map(fn, effect) : eff => _map(fn, eff);
/* harmony export (immutable) */ __webpack_exports__["map"] = map;


const killed = () => ({
  type: 'killed'
});
/* harmony export (immutable) */ __webpack_exports__["killed"] = killed;


const join = (...procs) => all(...procs.map(p => p.ch));
/* harmony export (immutable) */ __webpack_exports__["join"] = join;


function putHandler({ ch, val }, doneFn) {
  const handler = doneFn instanceof __WEBPACK_IMPORTED_MODULE_0__handler__["a" /* Handler */] ? doneFn : new __WEBPACK_IMPORTED_MODULE_0__handler__["b" /* FnHandler */](doneFn);
  ch.put(val, handler);
}

function takeHandler({ ch }, doneFn) {
  const handler = doneFn instanceof __WEBPACK_IMPORTED_MODULE_0__handler__["a" /* Handler */] ? doneFn : new __WEBPACK_IMPORTED_MODULE_0__handler__["b" /* FnHandler */](doneFn);
  ch.take(handler);
}

function callHandler({ fn, args }, doneFn) {
  const handler = doneFn instanceof __WEBPACK_IMPORTED_MODULE_0__handler__["a" /* Handler */] ? doneFn : new __WEBPACK_IMPORTED_MODULE_0__handler__["b" /* FnHandler */](doneFn);
  const proc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__process__["b" /* go */])(fn, ...args);
  proc.ch.take(handler);
}

function forkHandler({ procOrFn, args }, doneFn, parent) {
  const handler = doneFn instanceof __WEBPACK_IMPORTED_MODULE_0__handler__["a" /* Handler */] ? doneFn : new __WEBPACK_IMPORTED_MODULE_0__handler__["b" /* FnHandler */](doneFn);
  const proc = procOrFn instanceof __WEBPACK_IMPORTED_MODULE_2__process__["a" /* Process */] ? procOrFn : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__process__["b" /* go */])(procOrFn, ...args);
  parent.addChild(proc);
  if (handler.active()) {
    handler.commit()(proc);
  }
}

function spawnHandler({ fn, args }, doneFn) {
  const handler = doneFn instanceof __WEBPACK_IMPORTED_MODULE_0__handler__["a" /* Handler */] ? doneFn : new __WEBPACK_IMPORTED_MODULE_0__handler__["b" /* FnHandler */](doneFn);
  const proc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__process__["b" /* go */])(fn, ...args);
  if (handler.active()) {
    handler.commit()(proc);
  }
}

function dummyHandler(value, doneFn) {
  const handler = doneFn instanceof __WEBPACK_IMPORTED_MODULE_0__handler__["a" /* Handler */] ? doneFn : new __WEBPACK_IMPORTED_MODULE_0__handler__["b" /* FnHandler */](doneFn);
  if (handler.active()) {
    handler.commit()(value);
  }
}

function nopHandler(effect, doneFn) {
  dummyHandler(null, doneFn);
}

function mapHandler({ fn, effect }, doneFn, proc) {
  const handler = doneFn instanceof __WEBPACK_IMPORTED_MODULE_0__handler__["a" /* Handler */] ? doneFn : new __WEBPACK_IMPORTED_MODULE_0__handler__["b" /* FnHandler */](doneFn);
  const h = new __WEBPACK_IMPORTED_MODULE_0__handler__["b" /* FnHandler */](v => {
    if (handler.active()) {
      const val = typeof fn === 'function' ? fn(v) : fn;
      handler.commit()(val);
    }
  });

  handleEffect(effect, h, proc);
}

function killedHandler(effect, doneFn, proc) {
  dummyHandler(proc.killed, doneFn);
}

function makeAltsHandler(alt) {
  return ({ ports }, doneFn, parent) => {
    const handler = doneFn instanceof __WEBPACK_IMPORTED_MODULE_0__handler__["a" /* Handler */] ? doneFn : new __WEBPACK_IMPORTED_MODULE_0__handler__["b" /* FnHandler */](doneFn);
    const flag = new __WEBPACK_IMPORTED_MODULE_0__handler__["c" /* AltFlag */]();

    for (let p of ports) {
      const port = alt ? p[0] : p;
      const xform = alt && p.length > 1 && typeof p[1] === 'function' ? p[1] : null;

      const h = new __WEBPACK_IMPORTED_MODULE_0__handler__["d" /* AltHandler */](flag, val => {
        if (handler.active()) {
          const result = xform ? xform(val, port) : alt ? p[1] : [val, port];
          handler.commit()(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__error__["c" /* isError */])(val) ? val : result);
        }
      }, handler);

      handleEffect(port, h, parent);

      if (!flag.active()) break;
    }
  };
}

function allHandler({ ports }, doneFn, parent) {
  const handler = doneFn instanceof __WEBPACK_IMPORTED_MODULE_0__handler__["a" /* Handler */] ? doneFn : new __WEBPACK_IMPORTED_MODULE_0__handler__["b" /* FnHandler */](doneFn);
  const n = ports.length;
  const flag = new __WEBPACK_IMPORTED_MODULE_0__handler__["e" /* AllFlag */](n, result => {
    if (handler.active()) {
      handler.commit()(result);
    }
  }, handler);

  ports.forEach((port, index) => {
    const h = new __WEBPACK_IMPORTED_MODULE_0__handler__["f" /* AllHandler */](flag, index);
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(37)('wks')
  , uid        = __webpack_require__(40)
  , Symbol     = __webpack_require__(7).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = go;
/* harmony export (immutable) */ __webpack_exports__["c"] = kill;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__channel__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nextTick__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__effects__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__handler__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__error__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util__ = __webpack_require__(30);








class InternalProcess {
  constructor(gen, onDone = null) {
    this.schedule = val => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__nextTick__["a" /* nextTick */])(() => this.run(val));

    this.run = val => {
      if (this.killed && !this.thrown) {
        val = __WEBPACK_IMPORTED_MODULE_4__constants__["h" /* PROCESS_KILL */];
        this.finish(__WEBPACK_IMPORTED_MODULE_4__constants__["a" /* PROCESS_KILLED */]);
        this.thrown = true;
      }

      const thrw = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__error__["c" /* isError */])(val);
      const ret = val === __WEBPACK_IMPORTED_MODULE_4__constants__["h" /* PROCESS_KILL */];
      try {
        var { done, value } = thrw ? this.gen.throw(val.value()) : ret ? this.gen.return(val) : this.gen.next(val);
      } catch (e) {
        var [done, value] = [true, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__error__["b" /* error */])(e)];
      }

      if (done) {
        this.finish(this.killed ? __WEBPACK_IMPORTED_MODULE_4__constants__["a" /* PROCESS_KILLED */] : value);
      } else {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__effects__["handleEffect"])(value, this.schedule, this);
      }
    };

    this.gen = gen;
    this.onDone = onDone;
    this.done = false;
    this.killed = false;
    this.thrown = false;
    this.children = [];
  }

  addChild(proc) {
    this.children.push(proc);
  }

  finish(val) {
    if (this.done) return;

    this.done = true;
    this.children.forEach(child => child.kill());
    if (this.onDone) this.onDone(val);
  }

  kill() {
    if (!this.killed && !this.done) {
      this.killed = true;
      this.children.forEach(child => child.kill());
    }
  }

}

class Process {
  constructor(ch, proc) {
    this.ch = ch;
    this.proc = proc;
  }

  kill() {
    this.proc.kill();
  }

  killed() {
    this.proc.killed;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Process;


// returns a channel with the return value of the function
function go(genfn, ...args) {
  const ch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__channel__["b" /* chan */])(1);

  const proc = new InternalProcess(genfn(...args), retVal => {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util__["a" /* warning */])(!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__error__["c" /* isError */])(retVal) || ch.hasTakes(), `Process finished with error but return channel has no listeners`, retVal);

    ch.put(retVal, new __WEBPACK_IMPORTED_MODULE_3__handler__["b" /* FnHandler */](() => ch.close()));
  });

  proc.run();

  return new Process(ch, proc);
}

function kill(...procs) {
  procs.forEach(p => p.kill());
}

// XXX: add channel tracking to process, so if a process exits (for whatever reason), the tracked channels are automatically closed.

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = error;
/* harmony export (immutable) */ __webpack_exports__["c"] = isError;
class Error {
  constructor(val) {
    this.value = () => this._value;

    this._value = val;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Error;


function error(e) {
  return new Error(e);
}

function isError(e) {
  return e instanceof Error;
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__error__ = __webpack_require__(6);


class Handler {}
/* harmony export (immutable) */ __webpack_exports__["a"] = Handler;


class FnHandler extends Handler {
  constructor(fn, blockable = true) {
    super();

    this.active = () => true;

    this.blockable = () => this._blockable;

    this.commit = () => this.fn;

    this.fn = fn;
    this._blockable = blockable;
  }

}
/* harmony export (immutable) */ __webpack_exports__["b"] = FnHandler;


class AltFlag {
  constructor() {
    this.flag = true;

    this.active = () => this.flag;

    this.commit = () => {
      this.flag = false;
    };
  }

}
/* harmony export (immutable) */ __webpack_exports__["c"] = AltFlag;


class AltHandler extends Handler {
  constructor(flag, fn, parent = null) {
    super();

    this.active = () => this.flag.active() && (!this.parent || this.parent.active());

    this.blockable = () => true;

    this.fn = fn;
    this.flag = flag || new AltFlag();
    this.parent = parent;
  }

  commit() {
    this.flag.commit();
    return this.fn;
  }
}
/* harmony export (immutable) */ __webpack_exports__["d"] = AltHandler;


class AllFlag {
  constructor(n, fn, parent = null) {
    this.active = () => !this.errored && this.commitCount < this.n && (!this.parent || this.parent.active());

    this.commit = index => {
      ++this.commitCount;
      return this.handler(index);
    };

    this.handler = index => val => {
      this.values.push({ index, val });
      this.errored = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__error__["c" /* isError */])(val);

      if (++this.count === this.n || this.errored) {
        const values = this.values.sort((a, b) => a.index - b.index).map(vp => vp.val);

        this.fn(this.errored ? val : values);
      }
    };

    this.count = 0;
    this.commitCount = 0;
    this.n = n;
    this.fn = fn;
    this.errored = false;
    this.values = [];
    this.parent = parent;
  }

}
/* harmony export (immutable) */ __webpack_exports__["e"] = AllFlag;


class AllHandler extends Handler {
  constructor(flag, index) {
    super();

    this.active = () => this.flag.active();

    this.blockable = () => true;

    this.index = index;
    this.flag = flag;
  }

  commit() {
    return this.flag.commit(this.index);
  }
}
/* harmony export (immutable) */ __webpack_exports__["f"] = AllHandler;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(20);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(12)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(7)
  , core      = __webpack_require__(5)
  , ctx       = __webpack_require__(32)
  , hide      = __webpack_require__(14)
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
/* 12 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(15)
  , createDesc = __webpack_require__(23);
module.exports = __webpack_require__(10) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(9)
  , IE8_DOM_DEFINE = __webpack_require__(56)
  , toPrimitive    = __webpack_require__(74)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(10) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(19);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fixedBuffer;
/* harmony export (immutable) */ __webpack_exports__["b"] = droppingBuffer;
/* harmony export (immutable) */ __webpack_exports__["c"] = slidingBuffer;
/* harmony export (immutable) */ __webpack_exports__["d"] = promiseBuffer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(0);


class FixedBuffer {
  constructor(size = 1) {
    this.size = size;
    this.entries = [];
  }

  full() {
    return this.entries.length >= this.size;
  }

  add(val) {
    this.entries.push(val);
    return this;
  }

  remove() {
    return this.entries.shift();
  }

  count() {
    return this.entries.length;
  }

  close() {}

  blocking() {
    return true;
  }
}

class DroppingBuffer {
  constructor(size = 1) {
    this.size = size;
    this.entries = [];
  }

  full() {
    return false;
  }

  add(val) {
    if (this.entries.length < this.size) this.entries.push(val);
    return this;
  }

  remove() {
    return this.entries.shift();
  }

  count() {
    return this.entries.length;
  }

  close() {}

  blocking() {
    return false;
  }
}

class SlidingBuffer {
  constructor(size = 1) {
    this.size = size;
    this.entries = [];
  }

  full() {
    return false;
  }

  add(val) {
    if (this.entries.push(val) > this.size) this.entries.shift();
    return this;
  }

  remove() {
    return this.entries.shift();
  }

  count() {
    return this.entries.length;
  }

  close() {}

  blocking() {
    return false;
  }
}

class PromiseBuffer {
  constructor() {
    this.value = __WEBPACK_IMPORTED_MODULE_0__constants__["c" /* NO_VAL */];
  }

  full() {
    return false;
  }

  add(val) {
    if (this.undelivered()) this.value = val;
    return this;
  }

  remove() {
    return this.undelivered() ? undefined : this.value;
  }

  count() {
    return this.undelivered() ? 0 : 1;
  }

  close() {
    if (this.undelivered()) this.value = null;
  }

  undelivered() {
    return this.value === __WEBPACK_IMPORTED_MODULE_0__constants__["c" /* NO_VAL */];
  }

  blocking() {
    return false;
  }
}

function fixedBuffer(size = 1) {
  return new FixedBuffer(size);
}

function droppingBuffer(size = 1) {
  return new DroppingBuffer(size);
}

function slidingBuffer(size = 1) {
  return new SlidingBuffer(size);
}

function promiseBuffer() {
  return new PromiseBuffer();
}

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = mult;
/* harmony export (immutable) */ __webpack_exports__["b"] = stopMult;
/* harmony export (immutable) */ __webpack_exports__["c"] = tap;
/* harmony export (immutable) */ __webpack_exports__["d"] = taps;
/* harmony export (immutable) */ __webpack_exports__["e"] = untap;
/* harmony export (immutable) */ __webpack_exports__["f"] = untapAll;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__channel__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__effects__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__process__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__(0);





class Mult {
  constructor(ch, close = true) {
    this.ch = ch;
    this.taps = [];
    this.running = false;
    this.proc = null;
  }

  run() {
    const self = this;
    this.running = true;

    this.proc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__process__["b" /* go */])(function* () {
      while (true) {
        const val = yield self.ch;
        if (self.taps.length > 0) {
          if (val === __WEBPACK_IMPORTED_MODULE_3__constants__["b" /* CLOSED */]) {
            self.taps.filter(t => t.close).forEach(t => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__channel__["c" /* close */])(t.ch));
            break;
          } else {
            yield __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__effects__["all"])(...self.taps.map(t => [t.ch, val]));
          }
        } else if (val === __WEBPACK_IMPORTED_MODULE_3__constants__["b" /* CLOSED */]) {
          break;
        }
      }
    });

    return this;
  }

  stop() {
    if (!this.running) return;

    this.proc.kill();
    this.running = false;
  }

  add(ch, close = true) {
    const index = this.taps.findIndex(t => t.ch === ch);
    if (index === -1) this.taps.push({ ch, close });

    if (!this.running) this.run();
  }

  remove(ch) {
    const index = this.taps.findIndex(t => t.ch === ch);
    if (index > -1) this.taps.splice(index, 1);
  }

  removeAll() {
    this.taps = [];
  }
}
/* harmony export (immutable) */ __webpack_exports__["g"] = Mult;


function mult(ch) {
  return new Mult(ch).run();
}

function stopMult(mult) {
  mult.stop();
}

function tap(mult, ch, close = true) {
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
/* 19 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(68)
  , enumBugKeys = __webpack_require__(34);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(37)('keys')
  , uid    = __webpack_require__(40);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = tickerChan;
/* harmony export (immutable) */ __webpack_exports__["b"] = timeoutChan;
/* harmony export (immutable) */ __webpack_exports__["c"] = promiseChan;
/* harmony export (immutable) */ __webpack_exports__["d"] = cpsChan;
/* harmony export (immutable) */ __webpack_exports__["e"] = ontoChan;
/* harmony export (immutable) */ __webpack_exports__["h"] = mapChan;
/* harmony export (immutable) */ __webpack_exports__["i"] = reduceChan;
/* harmony export (immutable) */ __webpack_exports__["j"] = mergeChan;
/* harmony export (immutable) */ __webpack_exports__["m"] = pipeline;
/* harmony export (immutable) */ __webpack_exports__["n"] = pipelineAsync;
/* harmony export (immutable) */ __webpack_exports__["o"] = split;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__channel__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buffer__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__effects__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__process__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__error__ = __webpack_require__(6);








function tickerChan(ms, burstLimit = 1) {
  const ch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["b" /* chan */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__buffer__["b" /* droppingBuffer */])(burstLimit));

  const interval = setInterval(function () {
    if (!ch.closed()) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["f" /* put_ */])(ch, __WEBPACK_IMPORTED_MODULE_5__constants__["f" /* TICK */]);
    } else {
      clearInterval(interval);
    }
  }, ms);

  return ch;
}

function timeoutChan(ms) {
  const ch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["b" /* chan */])();

  setTimeout(() => ch.close(), ms);

  return ch;
}

function promiseChan(promise, transducer = null, exHandler = null) {
  const ch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["b" /* chan */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__buffer__["d" /* promiseBuffer */])(), transducer, exHandler);

  promise.then(val => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["f" /* put_ */])(ch, val, () => ch.close())).catch(e => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["f" /* put_ */])(ch, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__error__["b" /* error */])(e), () => ch.close()));

  return ch;
}

// error-first callback function
function cpsChan(fn, ...args) {
  const ch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["b" /* chan */])();

  fn(...args, function (err, result) {
    if (err) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["f" /* put_ */])(ch, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__error__["b" /* error */])(err), () => ch.close());else __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["f" /* put_ */])(ch, result, () => ch.close());
  });

  return ch;
}

function ontoChan(ch, coll, closeWhenDone = true) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__process__["b" /* go */])(function* () {
    for (let val of coll) {
      yield [ch, val];
    }

    if (closeWhenDone) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["c" /* close */])(ch);
  });

  return ch;
}

const toChan = coll => ontoChan(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["b" /* chan */])(), coll, true);
/* harmony export (immutable) */ __webpack_exports__["f"] = toChan;


const intoChan = (coll, ch) => reduceChan((acc, v) => acc.concat([v]), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from___default()(coll), ch);
/* harmony export (immutable) */ __webpack_exports__["g"] = intoChan;


function _mapChan(fn, chs, sizeOrBuffer = 1) {
  const ch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["b" /* chan */])(sizeOrBuffer);

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__process__["b" /* go */])(function* () {
    while (!ch.closed()) {
      const values = yield __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__effects__["all"])(...chs);
      if (values.indexOf(__WEBPACK_IMPORTED_MODULE_5__constants__["b" /* CLOSED */]) !== -1) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["c" /* close */])(ch);
        break;
      } else {
        yield [ch, fn(...values)];
      }
    }
  });

  return ch;
}

function mapChan(fn, chs = null, sizeOrBuffer = 1) {
  return chs ? _mapChan(fn, chs, sizeOrBuffer) : (chs, sizeOrBuffer = 1) => _mapChan(fn, chs, sizeOrBuffer);
}

function _reduceChan(fn, init, ch = null) {
  var proc;
  proc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__process__["b" /* go */])(function* () {
    let acc = init;

    while (!proc || !proc.ch.closed()) {
      const value = yield ch;
      if (value === __WEBPACK_IMPORTED_MODULE_5__constants__["b" /* CLOSED */]) break;
      acc = fn(acc, value);
    }

    return acc;
  });

  return proc.ch;
}

function reduceChan(fn, init, ch = null) {
  return ch ? _reduceChan(fn, init, ch) : ch => _reduceChan(fn, init, ch);
}

function mergeChan(inChs, sizeOrBuffer = 1) {
  const ch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["b" /* chan */])(sizeOrBuffer);
  let chs = inChs.slice();

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__process__["b" /* go */])(function* () {
    while (!ch.closed()) {
      if (chs.length === 0) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["c" /* close */])(ch);
        break;
      }
      const [value, inCh] = yield __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__effects__["alts"])(...chs);
      if (value === __WEBPACK_IMPORTED_MODULE_5__constants__["b" /* CLOSED */]) {
        const index = chs.indexOf(inCh);
        chs.splice(index, 1);
      } else {
        yield [ch, value];
      }
    }
  });

  return ch;
}

const _makePipe = fnEff => (from, to, closeWhenDone = true) => {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__process__["b" /* go */])(function* () {
    while (true) {
      const value = yield from;
      if (value === __WEBPACK_IMPORTED_MODULE_5__constants__["b" /* CLOSED */]) {
        if (closeWhenDone) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["c" /* close */])(to);
        break;
      } else {
        const ok = yield fnEff(to, value);
        if (!ok) break;
      }
    }
  });
};

const pipe = (from, to, closeWhenDone = true) => _makePipe((to, v) => [to, v])(from, to, closeWhenDone);
/* harmony export (immutable) */ __webpack_exports__["k"] = pipe;


const pipelineGo = (to, af, from, closeWhenDone = true) => _makePipe((to, v) => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__effects__["fork"])(af, v, to))(from, to, closeWhenDone);
/* harmony export (immutable) */ __webpack_exports__["l"] = pipelineGo;


function pipeline(to, xf, from, closeWhenDone = true, exh = null) {
  const ch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["b" /* chan */])(1, xf, exh);

  pipe(from, ch, closeWhenDone);
  pipe(ch, to, closeWhenDone);
}

function pipelineAsync(to, af, from, closeWhenDone = true) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__process__["b" /* go */])(function* () {
    while (true) {
      const value = yield from;
      if (value === __WEBPACK_IMPORTED_MODULE_5__constants__["b" /* CLOSED */]) {
        if (closeWhenDone) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["c" /* close */])(to);
        break;
      } else {
        const ch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["b" /* chan */])();
        af(value, ch);
        const result = yield ch;
        if (result !== __WEBPACK_IMPORTED_MODULE_5__constants__["b" /* CLOSED */]) {
          const ok = yield [to, result];
          if (!ok) break;
        }
      }
    }
  });
}

function split(pred, ch, tsizeOrBuffer = null, fsizeOrBuffer = null) {
  if (!tsizeOrBuffer) tsizeOrBuffer = 1;
  if (!fsizeOrBuffer) fsizeOrBuffer = tsizeOrBuffer;

  const ct = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["b" /* chan */])(tsizeOrBuffer);
  const cf = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["b" /* chan */])(fsizeOrBuffer);

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__process__["b" /* go */])(function* () {
    while (!(ct.closed() && cf.closed())) {
      const value = yield ch;
      if (value === __WEBPACK_IMPORTED_MODULE_5__constants__["b" /* CLOSED */]) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["c" /* close */])(ct);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["c" /* close */])(cf);
        break;
      } else {
        if (pred(value)) {
          yield [ct, value];
        } else {
          yield [cf, value];
        }
      }
    }
  });

  return [ct, cf];
}

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = mix;
/* harmony export (immutable) */ __webpack_exports__["b"] = stopMix;
/* harmony export (immutable) */ __webpack_exports__["c"] = admix;
/* harmony export (immutable) */ __webpack_exports__["d"] = unmix;
/* harmony export (immutable) */ __webpack_exports__["e"] = unmixAll;
/* harmony export (immutable) */ __webpack_exports__["f"] = soloMode;
/* harmony export (immutable) */ __webpack_exports__["g"] = toggle;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__channel__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__effects__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__process__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants__ = __webpack_require__(0);






class Mix {
  constructor(ch) {
    this.ch = ch;
    this.sources = [];
    this.soloMode = __WEBPACK_IMPORTED_MODULE_4__constants__["d" /* MIX_MUTE */];
    this.changeCh = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["b" /* chan */])();
  }

  run() {
    const self = this;
    this.running = true;

    this.proc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__process__["b" /* go */])(function* () {
      while (self.sources.length !== 0) {
        const solo = self.sources.findIndex(s => s.solo) !== -1;
        const activeSources = self.sources.filter(s => solo ? s.solo : !(s.mute || s.pause));
        const mutedSources = self.sources.filter(s => solo ? self.soloMode === __WEBPACK_IMPORTED_MODULE_4__constants__["d" /* MIX_MUTE */] && !s.solo && !s.pause : s.mute && !s.pause);

        const altChannels = [].concat([[self.changeCh, [__WEBPACK_IMPORTED_MODULE_4__constants__["g" /* MIX_CHANGED */]]]], activeSources.map(s => [s.ch, v => [true, s.ch, v]]), mutedSources.map(s => [s.ch, [false, s.ch]]));

        const [active, chan, value] = yield __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__effects__["alt"])(...altChannels);
        if (value === __WEBPACK_IMPORTED_MODULE_4__constants__["b" /* CLOSED */]) {
          self.remove(chan);
        } else if (active === __WEBPACK_IMPORTED_MODULE_4__constants__["g" /* MIX_CHANGED */]) {
          continue;
        } else if (active) {
          const ok = yield [self.ch, value];
          if (!ok) break;
        }
      }
    });

    return this;
  }

  stop() {
    if (!this.running) return;

    this.proc.kill();
    this.running = false;
  }

  add(ch, mute = false, pause = false, solo = false) {
    this.sources.push({ ch, mute, pause, solo });

    if (!this.running) this.run();else __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["f" /* put_ */])(this.changeCh, null);
  }

  remove(ch) {
    const index = this.sources.findIndex(t => t.ch === ch);
    if (index > -1) {
      this.sources.splice(index, 1);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["f" /* put_ */])(this.changeCh, null);
    }
  }

  removeAll() {
    this.sources = [];
    this.stop();
  }

  setSoloMode(mode) {
    this.soloMode = mode;
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["f" /* put_ */])(this.changeCh, null);
  }

  toggle(ch, stateMap = {}) {
    const index = this.sources.findIndex(t => t.ch === ch);
    if (index > -1) {
      const source = this.sources[index];
      this.sources[index] = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, source, {
        mute: stateMap.hasOwnProperty('mute') ? stateMap.mute : source.mute,
        pause: stateMap.hasOwnProperty('pause') ? stateMap.pause : source.pause,
        solo: stateMap.hasOwnProperty('solo') ? stateMap.solo : source.solo
      });
    } else {
      const mute = !!stateMap.mute;
      const pause = !!stateMap.pause;
      const solo = !!stateMap.solo;
      this.add(ch, mute, pause, solo);
    }

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["f" /* put_ */])(this.changeCh, null);
  }
}
/* harmony export (immutable) */ __webpack_exports__["h"] = Mix;


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

function toggle(mix, chOrList, stateMap = null) {
  if (chOrList instanceof __WEBPACK_IMPORTED_MODULE_1__channel__["a" /* Channel */]) {
    mix.toggle(chOrList, stateMap);
  } else {
    for (let [ch, stateMap] of chOrList) {
      mix.toggle(ch, stateMap);
    }
  }
}

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {// Based on, but significantly changed from:
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

const hasMC = typeof MessageChannel !== 'undefined';
const hasWindow = typeof window !== 'undefined';
const hasGlobal = typeof global !== 'undefined';
const hasWindowProto = typeof Window !== 'undefined' && Window.prototype;
const hasImpScripts = typeof importScripts !== 'undefined';
const hasNavigator = typeof navigator !== 'undefined';
const ua = hasNavigator && navigator ? navigator.userAgent : '';
const isEdge = ua.indexOf('Edge') !== -1;
const isPresto = ua.indexOf('Presto') !== -1;
const isIE = ua.indexOf('MSIE') !== -1 || ua.indexOf('Trident') !== -1;

function implSetTimeout() {
  return function (fn) {
    setTimeout(fn, 0);
  };
}

function implPostMessage() {
  let messagePrefix = 'setImmediate$' + Math.random() + '$';

  let head = { next: null };
  let tail = head;

  addEventListener('message', function (event) {
    if (typeof event.data === 'string' && event.data === messagePrefix) {
      if (head.next) {
        head = head.next;
        head.fn();
      }
    }
  }, false);

  return function (fn) {
    tail.next = { fn, next: null };
    tail = tail.next;
    postMessage(messagePrefix, '*');
  };
}

function implMessageChannel() {
  let channel = new MessageChannel();

  let head = { next: null };
  let tail = head;

  channel.port1.onmessage = function () {
    if (head.next) {
      head = head.next;
      head.fn();
    }
  };

  return function (fn) {
    tail.next = { fn, next: null };
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

const nextTick = getNextTickImpl();
/* harmony export (immutable) */ __webpack_exports__["a"] = nextTick;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(80)))

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = pub;
/* harmony export (immutable) */ __webpack_exports__["b"] = stopPub;
/* harmony export (immutable) */ __webpack_exports__["c"] = sub;
/* harmony export (immutable) */ __webpack_exports__["d"] = unsub;
/* harmony export (immutable) */ __webpack_exports__["e"] = unsubAll;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__channel__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__effects__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__process__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mult__ = __webpack_require__(18);







class Pub {
  constructor(ch, topicFn, bufFn) {
    this.ch = ch;
    this.topicFn = topicFn;
    this.bufFn = bufFn;
    this.running = false;
    this.proc = null;
    this.mults = {};
  }

  run() {
    const self = this;
    this.running = true;

    this.proc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__process__["b" /* go */])(function* () {
      while (true) {
        const val = yield self.ch;
        if (val === __WEBPACK_IMPORTED_MODULE_4__constants__["b" /* CLOSED */]) {
          self.removeAll();
          break;
        } else {
          const topic = self.topicFn(val);
          if (self.mults[topic]) {
            const ok = yield [self.mults[topic].ch, val];
            if (!ok) self.removeAll(topic);
          }
        }
      }
    });

    return this;
  }

  stop() {
    if (!this.running) return;

    this.proc.kill();
    this.running = false;
  }

  add(topic, ch, close = true) {
    if (!this.mults.hasOwnProperty(topic)) {
      const cm = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["b" /* chan */])(this.bufFn(topic));
      this.mults[topic] = { mult: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__mult__["a" /* mult */])(cm), ch: cm };
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__mult__["c" /* tap */])(this.mults[topic].mult, ch, close);

    if (!this.running) this.run();
  }

  remove(topic, ch) {
    if (!this.mults.hasOwnProperty(topic)) return;

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__mult__["e" /* untap */])(this.mults[topic].mult, ch);
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__mult__["d" /* taps */])(this.mults[topic].mult) === 0) {
      this.closeTopic(topic);
    }
  }

  closeTopic(topic) {
    // XXX: untap all of them first, to avoid close() propagation?
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__channel__["c" /* close */])(this.mults[topic].ch);
    delete this.mults[topic];
  }

  removeAll(topic = null) {
    if (topic) {
      if (this.mults[topic]) this.closeTopic(topic);
    } else {
      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(this.mults).forEach(t => this.closeTopic(t));
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["f"] = Pub;


function pub(ch, topicFn, bufFnOrBuf = 1) {
  const bufFn = typeof bufFnOrBuf === 'function' ? bufFnOrBuf : _ => bufFnOrBuf;

  return new Pub(ch, topicFn, bufFn).run();
}

function stopPub(p) {
  p.stop();
}

function sub(p, topic, ch, close = true) {
  p.add(topic, ch, close);
}

function unsub(p, topic, ch) {
  p.remove(topic, ch);
}

function unsubAll(p, topic = null) {
  p.removeAll(topic);
}

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
function warning(condition, message, ...other) {
  if (!condition && typeof console !== undefined) {
    console.error('Warning: ' + message, ...other);
    try {
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (e) {}
  }
}

const isPromise = obj => obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
/* harmony export (immutable) */ __webpack_exports__["b"] = isPromise;


/***/ }),
/* 31 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(51);
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(20)
  , document = __webpack_require__(7).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(31);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(15).f
  , has = __webpack_require__(13)
  , TAG = __webpack_require__(3)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(7)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(35)
  , defined = __webpack_require__(19);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(25)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["stop"] = stop;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__internal_constants__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PROCESS_KILLED", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_constants__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CLOSED", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_constants__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "NO_VAL", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_constants__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "MIX_MUTE", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_constants__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "MIX_PAUSE", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_constants__["e"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__internal_process__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Process", function() { return __WEBPACK_IMPORTED_MODULE_1__internal_process__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "go", function() { return __WEBPACK_IMPORTED_MODULE_1__internal_process__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "kill", function() { return __WEBPACK_IMPORTED_MODULE_1__internal_process__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__internal_buffer__ = __webpack_require__(17);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fixedBuffer", function() { return __WEBPACK_IMPORTED_MODULE_2__internal_buffer__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "droppingBuffer", function() { return __WEBPACK_IMPORTED_MODULE_2__internal_buffer__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "slidingBuffer", function() { return __WEBPACK_IMPORTED_MODULE_2__internal_buffer__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "promiseBuffer", function() { return __WEBPACK_IMPORTED_MODULE_2__internal_buffer__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__internal_channel__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Channel", function() { return __WEBPACK_IMPORTED_MODULE_3__internal_channel__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "chan", function() { return __WEBPACK_IMPORTED_MODULE_3__internal_channel__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "close", function() { return __WEBPACK_IMPORTED_MODULE_3__internal_channel__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "offer", function() { return __WEBPACK_IMPORTED_MODULE_3__internal_channel__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "poll", function() { return __WEBPACK_IMPORTED_MODULE_3__internal_channel__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "put_", function() { return __WEBPACK_IMPORTED_MODULE_3__internal_channel__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "take_", function() { return __WEBPACK_IMPORTED_MODULE_3__internal_channel__["g"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__internal_error__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Error", function() { return __WEBPACK_IMPORTED_MODULE_4__internal_error__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "error", function() { return __WEBPACK_IMPORTED_MODULE_4__internal_error__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "isError", function() { return __WEBPACK_IMPORTED_MODULE_4__internal_error__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__internal_handler__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Handler", function() { return __WEBPACK_IMPORTED_MODULE_5__internal_handler__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FnHandler", function() { return __WEBPACK_IMPORTED_MODULE_5__internal_handler__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__internal_mix__ = __webpack_require__(27);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mix", function() { return __WEBPACK_IMPORTED_MODULE_6__internal_mix__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stopMix", function() { return __WEBPACK_IMPORTED_MODULE_6__internal_mix__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "admix", function() { return __WEBPACK_IMPORTED_MODULE_6__internal_mix__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "unmix", function() { return __WEBPACK_IMPORTED_MODULE_6__internal_mix__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "unmixAll", function() { return __WEBPACK_IMPORTED_MODULE_6__internal_mix__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "soloMode", function() { return __WEBPACK_IMPORTED_MODULE_6__internal_mix__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "toggle", function() { return __WEBPACK_IMPORTED_MODULE_6__internal_mix__["g"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__internal_mult__ = __webpack_require__(18);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mult", function() { return __WEBPACK_IMPORTED_MODULE_7__internal_mult__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stopMult", function() { return __WEBPACK_IMPORTED_MODULE_7__internal_mult__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "tap", function() { return __WEBPACK_IMPORTED_MODULE_7__internal_mult__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "taps", function() { return __WEBPACK_IMPORTED_MODULE_7__internal_mult__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "untap", function() { return __WEBPACK_IMPORTED_MODULE_7__internal_mult__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "untapAll", function() { return __WEBPACK_IMPORTED_MODULE_7__internal_mult__["f"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__internal_pub__ = __webpack_require__(29);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "pub", function() { return __WEBPACK_IMPORTED_MODULE_8__internal_pub__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stopPub", function() { return __WEBPACK_IMPORTED_MODULE_8__internal_pub__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return __WEBPACK_IMPORTED_MODULE_8__internal_pub__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "unsub", function() { return __WEBPACK_IMPORTED_MODULE_8__internal_pub__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "unsubAll", function() { return __WEBPACK_IMPORTED_MODULE_8__internal_pub__["e"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__internal_helper__ = __webpack_require__(26);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__internal_effects__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "addEffectHandler", function() { return __WEBPACK_IMPORTED_MODULE_10__internal_effects__["addEffectHandler"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "handleEffect", function() { return __WEBPACK_IMPORTED_MODULE_10__internal_effects__["handleEffect"]; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "effects", function() { return __WEBPACK_IMPORTED_MODULE_10__internal_effects__; });






















function stop(o) {
  if (o instanceof __WEBPACK_IMPORTED_MODULE_8__internal_pub__["f" /* Pub */]) stopPub(o);else if (o instanceof __WEBPACK_IMPORTED_MODULE_7__internal_mult__["g" /* Mult */]) stopMult(o);else if (o instanceof __WEBPACK_IMPORTED_MODULE_6__internal_mix__["h" /* Mix */]) stopMix(o);
}








/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = run;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nextTick__ = __webpack_require__(28);


// clojurescript-style 'dispatch'
let tasks = [];
const TASK_BATCH_SIZE = 1024;
let running = false;
let queued = false;

function processMessages() {
  running = true;
  queued = false;

  let count = 0;

  while (tasks.length > 0 && count < TASK_BATCH_SIZE) {
    const task = tasks.shift();

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
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const reduced = t => t && t.hasOwnProperty('@@transducer/reduced');
/* harmony export (immutable) */ __webpack_exports__["b"] = reduced;

const step = (t, result, input) => t['@@transducer/step'](result, input);
/* harmony export (immutable) */ __webpack_exports__["a"] = step;

const result = (t, result) => t['@@transducer/result'](result);
/* unused harmony export result */


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(48), __esModule: true };

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(49), __esModule: true };

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(50), __esModule: true };

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(45);

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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(79);
__webpack_require__(76);
module.exports = __webpack_require__(5).Array.from;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(77);
module.exports = __webpack_require__(5).Object.assign;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(78);
module.exports = __webpack_require__(5).Object.keys;

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(38)
  , toLength  = __webpack_require__(39)
  , toIndex   = __webpack_require__(73);
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(31)
  , TAG = __webpack_require__(3)('toStringTag')
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
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(15)
  , createDesc      = __webpack_require__(23);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7).document && document.documentElement;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(10) && !__webpack_require__(12)(function(){
  return Object.defineProperty(__webpack_require__(33)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(21)
  , ITERATOR   = __webpack_require__(3)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(9);
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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(64)
  , descriptor     = __webpack_require__(23)
  , setToStringTag = __webpack_require__(36)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(14)(IteratorPrototype, __webpack_require__(3)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(62)
  , $export        = __webpack_require__(11)
  , redefine       = __webpack_require__(71)
  , hide           = __webpack_require__(14)
  , has            = __webpack_require__(13)
  , Iterators      = __webpack_require__(21)
  , $iterCreate    = __webpack_require__(59)
  , setToStringTag = __webpack_require__(36)
  , getPrototypeOf = __webpack_require__(67)
  , ITERATOR       = __webpack_require__(3)('iterator')
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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(3)('iterator')
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
/* 62 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(22)
  , gOPS     = __webpack_require__(66)
  , pIE      = __webpack_require__(69)
  , toObject = __webpack_require__(16)
  , IObject  = __webpack_require__(35)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(12)(function(){
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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(9)
  , dPs         = __webpack_require__(65)
  , enumBugKeys = __webpack_require__(34)
  , IE_PROTO    = __webpack_require__(24)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(33)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(55).appendChild(iframe);
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
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(15)
  , anObject = __webpack_require__(9)
  , getKeys  = __webpack_require__(22);

module.exports = __webpack_require__(10) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 66 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(13)
  , toObject    = __webpack_require__(16)
  , IE_PROTO    = __webpack_require__(24)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(13)
  , toIObject    = __webpack_require__(38)
  , arrayIndexOf = __webpack_require__(52)(false)
  , IE_PROTO     = __webpack_require__(24)('IE_PROTO');

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
/* 69 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(11)
  , core    = __webpack_require__(5)
  , fails   = __webpack_require__(12);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(25)
  , defined   = __webpack_require__(19);
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
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(25)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 74 */
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
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(53)
  , ITERATOR  = __webpack_require__(3)('iterator')
  , Iterators = __webpack_require__(21);
module.exports = __webpack_require__(5).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(32)
  , $export        = __webpack_require__(11)
  , toObject       = __webpack_require__(16)
  , call           = __webpack_require__(58)
  , isArrayIter    = __webpack_require__(57)
  , toLength       = __webpack_require__(39)
  , createProperty = __webpack_require__(54)
  , getIterFn      = __webpack_require__(75);

$export($export.S + $export.F * !__webpack_require__(61)(function(iter){ Array.from(iter); }), 'Array', {
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
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(11);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(63)});

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(16)
  , $keys    = __webpack_require__(22);

__webpack_require__(70)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(72)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(60)(String, 'String', function(iterated){
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
/* 80 */
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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(41);


/***/ })
/******/ ]);
});
//# sourceMappingURL=chango.js.map