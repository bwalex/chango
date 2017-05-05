import { chan, offer, poll, put_, take_, close } from './channel'
import {
  fixedBuffer,
  droppingBuffer,
  slidingBuffer,
  promiseBuffer,
} from './buffer'
import { all, alts, fork } from './effects'
import { go } from './process'
import { TICK, CLOSED } from './constants'
import { error } from './error'

export function tickerChan(ms, burstLimit = 1) {
  const ch = chan(droppingBuffer(burstLimit))

  const interval = setInterval(function() {
    if (!ch.closed()) {
      put_(ch, TICK)
    } else {
      clearInterval(interval)
    }
  }, ms)

  return ch
}

export function timeoutChan(ms) {
  const ch = chan()

  setTimeout(() => ch.close(), ms)

  return ch
}

export function promiseChan(promise, transducer = null, exHandler = null) {
  const ch = chan(promiseBuffer(), transducer, exHandler)

  promise
    .then(val => put_(ch, val, () => ch.close()))
    .catch(e => put_(ch, error(e), () => ch.close()))

  return ch
}

// error-first callback function
export function cpsChan(fn, ...args) {
  const ch = chan()

  fn(...args, function(err, result) {
    if (err) put_(ch, error(err), () => ch.close())
    else put_(ch, result, () => ch.close())
  })

  return ch
}

export function ontoChan(ch, coll, closeWhenDone = true) {
  go(function*() {
    for (let val of coll) {
      yield [ch, val]
    }

    if (closeWhenDone) close(ch)
  })

  return ch
}

export const toChan = coll => ontoChan(chan(), coll, true)

export const intoChan = (coll, ch) =>
  reduceChan((acc, v) => acc.concat([v]), Array.from(coll), ch)

function _mapChan(fn, chs, sizeOrBuffer = 1) {
  const ch = chan(sizeOrBuffer)

  go(function*() {
    while (!ch.closed()) {
      const values = yield all(...chs)
      if (values.indexOf(CLOSED) !== -1) {
        close(ch)
        break
      } else {
        yield [ch, fn(...values)]
      }
    }
  })

  return ch
}

export function mapChan(fn, chs = null, sizeOrBuffer = 1) {
  return chs
    ? _mapChan(fn, chs, sizeOrBuffer)
    : (chs, sizeOrBuffer = 1) => _mapChan(fn, chs, sizeOrBuffer)
}

function _reduceChan(fn, init, ch = null) {
  var proc
  proc = go(function*() {
    let acc = init

    while (!proc || !proc.ch.closed()) {
      const value = yield ch
      if (value === CLOSED) break
      acc = fn(acc, value)
    }

    return acc
  })

  return proc.ch
}

export function reduceChan(fn, init, ch = null) {
  return ch ? _reduceChan(fn, init, ch) : ch => _reduceChan(fn, init, ch)
}

export function mergeChan(inChs, sizeOrBuffer = 1) {
  const ch = chan(sizeOrBuffer)
  let chs = inChs.slice()

  go(function*() {
    while (!ch.closed()) {
      if (chs.length === 0) {
        close(ch)
        break
      }
      const [value, inCh] = yield alts(...chs)
      if (value === CLOSED) {
        const index = chs.indexOf(inCh)
        chs.splice(index, 1)
      } else {
        yield [ch, value]
      }
    }
  })

  return ch
}

const _makePipe = fnEff => (from, to, closeWhenDone = true) => {
  go(function*() {
    while (true) {
      const value = yield from
      if (value === CLOSED) {
        if (closeWhenDone) close(to)
        break
      } else {
        const ok = yield fnEff(to, value)
        if (!ok) break
      }
    }
  })
}

export const pipe = (from, to, closeWhenDone = true) =>
  _makePipe((to, v) => [to, v])(from, to, closeWhenDone)

export const pipelineGo = (to, af, from, closeWhenDone = true) =>
  _makePipe((to, v) => fork(af, v, to))(from, to, closeWhenDone)

export function pipeline(to, xf, from, closeWhenDone = true, exh = null) {
  const ch = chan(1, xf, exh)

  pipe(from, ch, closeWhenDone)
  pipe(ch, to, closeWhenDone)
}

export function pipelineAsync(to, af, from, closeWhenDone = true) {
  go(function*() {
    while (true) {
      const value = yield from
      if (value === CLOSED) {
        if (closeWhenDone) close(to)
        break
      } else {
        const ch = chan()
        af(value, ch)
        const result = yield ch
        if (result !== CLOSED) {
          const ok = yield [to, result]
          if (!ok) break
        }
      }
    }
  })
}

export function split(pred, ch, tsizeOrBuffer = null, fsizeOrBuffer = null) {
  if (!tsizeOrBuffer) tsizeOrBuffer = 1
  if (!fsizeOrBuffer) fsizeOrBuffer = tsizeOrBuffer

  const ct = chan(tsizeOrBuffer)
  const cf = chan(fsizeOrBuffer)

  go(function*() {
    while (!(ct.closed() && cf.closed())) {
      const value = yield ch
      if (value === CLOSED) {
        close(ct)
        close(cf)
        break
      } else {
        if (pred(value)) {
          yield [ct, value]
        } else {
          yield [cf, value]
        }
      }
    }
  })

  return [ct, cf]
}
