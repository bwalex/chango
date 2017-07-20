import test from 'tape'
import { PROCESS_KILLED, CLOSED, NO_VAL, MIX_MUTE, MIX_PAUSE } from '../src/index'
import { go, Process, kill, isError, chan, offer, poll, put_, take_, close, fixedBuffer, droppingBuffer, slidingBuffer, promiseBuffer, toChan, mapChan, reduceChan, mergeChan, intoChan, pipe, pipeline, pipelineGo, pipelineAsync, split, tickerChan, promiseChan, mult, tap, untap, untapAll, mix, admix, unmix, unmixAll, soloMode, toggle, pub, sub, unsub, unsubAll } from '../src/index'

import { sleep, put, take, fork, spawn, nop, call, alts, alt, killed, all, join, map, cps } from '../src/effects'

test('sleep effect', function(t) {
  t.plan(1)

  const start = Date.now()

  go(function*() {
    yield sleep(500)
    t.ok((Date.now() - start) >= 500)
  })
})

test('return value on channel', function(t) {
  t.plan(2)

  let proc = go(function*() {
    yield sleep(10)
    return 42
  })

  go(function*() {
    t.equal(yield take(proc.ch), 42)
    t.equal(yield take(proc.ch), CLOSED)
  })
})

test('killed process', function(t) {
  t.plan(1)

  let proc = go(function*() {
    yield sleep(10)
    return 42
  })

  kill(proc)

  go(function*() {
    t.equal(yield take(proc.ch), PROCESS_KILLED)
  })
})

test('killed process with try/finally', function(t) {
  t.plan(2)

  let proc = go(function*() {
    try {
      yield sleep(10)
      return 42
    } finally {
      t.ok(true)
    }
  })

  proc.kill()

  go(function*() {
    t.equal(yield take(proc.ch), PROCESS_KILLED)
  })
})

test('killed process with try/finally and yield', function(t) {
  t.plan(2)

  let proc = go(function*() {
    try {
      yield sleep(10)
      return 42
    } finally {
      t.equal(yield killed(), true)
    }
  })

  proc.kill()

  go(function*() {
    t.equal(yield take(proc.ch), PROCESS_KILLED)
  })
})

test('killed child process', function(t) {
  t.plan(2)
  var proc2

  let proc = go(function*() {
    proc2 = yield fork(function*() {
      yield sleep(100)
      return 43
    })

    yield sleep(100)
    return 42
  })


  go(function*() {
    yield nop()
    proc.kill()

    t.equal(yield take(proc.ch), PROCESS_KILLED)
    t.equal(yield take(proc2.ch), PROCESS_KILLED)
  })
})

test('forked lifetime with try/finally', function(t) {
  t.plan(5)
  var proc2

  let proc = go(function*() {
    proc2 = yield fork(function*() {
      try {
        yield sleep(10)
        return 43
      } finally {
        t.equal(yield killed(), true)
      }
    })

    return 42
  })


  go(function*() {
    yield nop()

    t.equal(yield take(proc.ch), 42)
    t.equal(yield take(proc.ch), CLOSED)
    t.equal(yield take(proc2.ch), PROCESS_KILLED)
    t.equal(yield take(proc2.ch), CLOSED)
  })
})

test('forked lifetime', function(t) {
  t.plan(4)
  var proc2

  let proc = go(function*() {
    proc2 = yield fork(function*() {
      yield sleep(10)
      return 43
    })

    return 42
  })


  go(function*() {
    yield nop()

    t.equal(yield take(proc.ch), 42)
    t.equal(yield take(proc.ch), CLOSED)
    t.equal(yield take(proc2.ch), PROCESS_KILLED)
    t.equal(yield take(proc2.ch), CLOSED)
  })
})

test('forked lifetime with fork taking existing proc', function(t) {
  t.plan(4)

  let proc2 = go(function*() {
    yield sleep(10)
    return 43
  })

  let proc = go(function*() {
    yield fork(proc2)

    return 42
  })


  go(function*() {
    yield nop()

    t.equal(yield take(proc.ch), 42)
    t.equal(yield take(proc.ch), CLOSED)
    t.equal(yield take(proc2.ch), PROCESS_KILLED)
    t.equal(yield take(proc2.ch), CLOSED)
  })
})

test('basic fork', function(t) {
  t.plan(3)

  go(function*() {
    const proc = yield fork(function*() {
      t.ok(true)
    })
    t.ok(proc instanceof Process)
  })
  t.ok(true)
})

test('basic spawn', function(t) {
  t.plan(3)

  go(function*() {
    const proc = yield spawn(function*() {
      yield nop()
      t.ok(true)
    })
    t.ok(proc instanceof Process)
  })
  t.ok(true)
})

test('fork and wait for child using channel', function(t) {
  t.plan(2)
  go(function*() {
    const proc = yield spawn(function*() {
      yield nop()
      return 42
    })

    t.equal(yield take(proc.ch), 42)
    t.equal(yield take(proc.ch), CLOSED)
  })
})

test('call waits for child', function(t) {
  t.plan(1)
  go(function*() {
    const val = yield call(function*(valToInc) {
      yield nop()
      return valToInc+1
    }, 41)

    t.equal(val, 42)
  })
})

test('call throws if child throws', function(t) {
  t.plan(1)
  go(function*() {
    try {
      const val = yield call(function*(valToInc) {
        yield nop()
        throw 'throw!'
        return valToInc+1
      }, 41)
      t.notOk('Should have thrown!')
    } catch (e) {
      t.equal(e, 'throw!')
    }
  })
})

test('value passthrough if not an effect', function(t) {
  t.plan(1)

  go(function*() {
    t.equal(yield "dinosaurs", "dinosaurs")
  })
})

test('fixed buffer has limited acceptance', function(t) {
  t.plan(3)
  const ch = chan(fixedBuffer(2))

  go(function*() {
    var val;

    val = yield alt([put(ch, 1), "sent"], [nop(), "nop"])
    t.equal(val, "sent")
    val = yield alt([put(ch, 1), "sent"], [nop(), "nop"])
    t.equal(val, "sent")
    val = yield alt([put(ch, 1), "sent"], [nop(), "nop"])
    t.equal(val, "nop")
    ch.close()
  })
})

test('sliding buffer can always accept', function(t) {
  t.plan(1)
  const ch = chan(slidingBuffer(3))

  go(function*() {
    yield put(ch, 1)
    yield put(ch, 2)
    yield put(ch, 3)
    yield put(ch, 4)
    yield put(ch, 5)

    t.ok(true)
    ch.close()
  })
})

test('sliding buffer slides old values out', function(t) {
  t.plan(3)
  const ch = chan(slidingBuffer(3))

  go(function*() {
    yield put(ch, 1)
    yield put(ch, 2)
    yield put(ch, 3)
    yield put(ch, 4)
    yield put(ch, 5)

    t.equal(yield take(ch), 3)
    t.equal(yield take(ch), 4)
    t.equal(yield take(ch), 5)
    ch.close()
  })
})

test('dropping buffer can always accept', function(t) {
  t.plan(1)
  const ch = chan(droppingBuffer(3))

  go(function*() {
    yield put(ch, 1)
    yield put(ch, 2)
    yield put(ch, 3)
    yield put(ch, 4)
    yield put(ch, 5)

    t.ok(true)
    ch.close()
  })
})

test('dropping buffer drops new values', function(t) {
  t.plan(3)
  const ch = chan(droppingBuffer(3))

  go(function*() {
    yield put(ch, 1)
    yield put(ch, 2)
    yield put(ch, 3)
    yield put(ch, 4)
    yield put(ch, 5)

    t.equal(yield take(ch), 1)
    t.equal(yield take(ch), 2)
    t.equal(yield take(ch), 3)
    ch.close()
  })
})

test('can take value multiple times from promise buffer', function(t) {
  t.plan(3)
  const ch = chan(promiseBuffer())

  go(function*() {
    yield put(ch, 42)

    t.equal(yield take(ch), 42)
    t.equal(yield take(ch), 42)
    t.equal(yield take(ch), 42)
    ch.close()
  })
})

test('promise buffer ignores all but first put', function(t) {
  t.plan(3)
  const ch = chan(promiseBuffer())

  go(function*() {
    yield put(ch, 42)
    yield put(ch, 99)

    t.equal(yield take(ch), 42)
    t.equal(yield take(ch), 42)
    t.equal(yield take(ch), 42)
  })
})

test('promise buffer blocks until first put', function(t) {
  t.plan(3)
  const ch = chan(promiseBuffer())

  go(function*() {
    let val = yield alt([take(ch), "take"], [nop(), "nop"])
    t.equal(val, "nop")
    yield put(ch, 42)

    val = yield alt([take(ch), v => v], [nop(), "nop"])
    t.equal(val, 42)
    t.equal(yield take(ch), 42)
    ch.close()
  })
})

test('channel supports waiting puts', function(t) {
  t.plan(2)
  const ch = chan()

  go(function*() {
    yield put(ch, 1)
    yield put(ch, 2)
    yield put(ch, 3)
  })

  go(function*() {
    yield sleep(50)
    t.equal(yield take(ch), 1)
    t.equal(yield take(ch), 2)
  })
})


test('channel supports waiting takes', function(t) {
  t.plan(2)
  const ch = chan()

  go(function*() {
    t.equal(yield take(ch), 1)
    t.equal(yield take(ch), 2)
  })

  go(function*() {
    yield sleep(50)
    yield put(ch, 1)
    yield put(ch, 2)
    yield put(ch, 3)
  })
})

test('yielding a channel is synonymous to take', function(t) {
  t.plan(1)
  const ch = chan()

  go(function*() {
    yield put(ch, 3)
  })

  go(function*() {
    t.equal(yield ch, 3)
  })
})

test('put on an open & buffered channel returns true', function(t) {
  t.plan(1)
  const ch = chan(1)

  go(function*() {
    t.equal(yield put(ch, 1), true)
  })
})

test('put on a closed channel returns false', function(t) {
  t.plan(1)
  const ch = chan()
  ch.close()

  go(function*() {
    t.equal(yield put(ch, 1), false)
  })
})

test('closing a (buffered) channel clears out pending puts', function(t) {
  t.plan(3)
  const ch = chan(1)

  go(function*() {
    t.equal(yield put(ch, 1), true)
    t.equal(yield put(ch, 1), false)
    t.equal(yield put(ch, 1), false)
  })

  go(function*() {
    yield sleep(50)
    yield nop()
    ch.close()
  })
})

test('closing a channel clears out pending takes', function(t) {
  t.plan(3)
  const ch = chan()

  go(function*() {
    t.equal(yield take(ch), CLOSED)
    t.equal(yield take(ch), CLOSED)
    t.equal(yield take(ch), CLOSED)
  })

  go(function*() {
    yield sleep(50)
    yield nop()
    ch.close()
  })
})

test('can close a channel', function(t) {
  t.plan(2)

  const ch = chan()

  t.equal(ch.closed(), false)
  ch.close()
  t.equal(ch.closed(), true)
})

test('yielding a [channel, value] pair is synonymous to put', function(t) {
  t.plan(1)
  const ch = chan()

  go(function*() {
    yield [ch, 3]
  })

  go(function*() {
    t.equal(yield take(ch), 3)
  })
})

test('basic alts', function(t) {
  t.plan(1)
  const ch = chan()

  go(function*() {
    const takeOp = take(ch)
    const sleepOp = sleep(20)
    const [val, port] = yield alts(takeOp, sleepOp)
    t.equal(port, sleepOp)
  })
})

test('alts default value', function(t) {
  t.plan(1)
  const ch = chan()

  go(function*() {
    const takeOp = take(ch)
    const [val, port] = yield alts(takeOp, 42)
    t.equal(val, 42)
  })
})

test('alts put & take', function(t) {
  t.plan(2)
  const ch = chan()

  go(function*() {
    const putOp = put(ch, 42)
    const takeOp = take(ch)
    const [val, port] = yield alts(putOp, takeOp)
    t.equal(port, putOp)
    t.equal(yield takeOp, 42)
  })
})

test('alts default only used if not immediately ready', function(t) {
  t.plan(2)
  const ch = chan()

  go(function*() {
    const putOp = put(ch, 42)
    const takeOp = take(ch)
    const [val, port] = yield alts(putOp, takeOp, 42)
    t.equal(port, putOp)
    t.equal(val, true)
  })
})

test('basic alt', function(t) {
  t.plan(1)
  const ch = chan()

  go(function*() {
    const putOp = put(ch, 42)
    const takeOp = take(ch)
    const val = yield alt([putOp, "put!"], [takeOp, "taken!"])
    t.equal(val, "put!")
  })
})

test('basic alt with transform', function(t) {

  t.plan(1)
  const ch = chan(1)

  go(function*() {
    yield put(ch, 41)
    const putOp = put(ch, 5)
    const takeOp = take(ch)
    const val = yield alt([putOp, "put!"], [takeOp, v => v+1])
    t.equal(val, 42)
  })
})

import * as tx1 from 'transducers-js'
import * as tx2 from 'transducers.js'

test('basic transducer functionality with transducers-js', function(t) {
  t.plan(2)
  const transducer = tx1.comp(tx1.filter(v => v%2 === 1), tx1.map(v => v+10))
  const ch = chan(fixedBuffer(1), transducer)

  go(function*() {
    t.equal(yield take(ch), 11)
    t.equal(yield take(ch), 13)
  })

  go(function*() {
    yield put(ch, 1)
    yield put(ch, 2)
    yield put(ch, 3)
  })
})

test('basic transducer functionality with transducers.js', function(t) {
  t.plan(2)
  const transducer = tx2.compose(tx2.filter(v => v%2 === 1), tx2.map(v => v+10))
  const ch = chan(fixedBuffer(1), transducer)

  go(function*() {
    t.equal(yield take(ch), 11)
    t.equal(yield take(ch), 13)
  })

  go(function*() {
    yield put(ch, 1)
    yield put(ch, 2)
    yield put(ch, 3)
  })
})

test('basic exception handler for transducer', function(t) {
  t.plan(2)
  const transducer = tx1.comp(
    tx1.map(v => {
      if (v%2) return v
      else throw "xyz"
    }),
    tx1.map(v => v+10)
  )
  const ch = chan(fixedBuffer(1), transducer)

  go(function*() {
    t.equal(yield take(ch), 11)
    t.equal(yield take(ch), 13)
  })

  go(function*() {
    yield put(ch, 1)
    yield put(ch, 2)
    yield put(ch, 3)
  })
})

import sinon from 'sinon'

test('custom dropping exception handler for transducer', function(t) {
  t.plan(4)
  const exh = sinon.stub().returns(CLOSED)
  const transducer = tx2.compose(
    tx2.map(v => {
      if (v%2) return v
      else throw "xyz"
    }),
    tx2.map(v => v+10)
  )
  const ch = chan(fixedBuffer(1), transducer, exh)

  go(function*() {
    t.equal(yield take(ch), 11)
    t.equal(yield take(ch), 13)
    t.ok(exh.calledOnce)
    t.ok(exh.calledWith("xyz"))
  })

  go(function*() {
    yield put(ch, 1)
    yield put(ch, 2)
    yield put(ch, 3)
  })
})

test('custom non-dropping exception handler for transducer', function(t) {
  t.plan(5)
  const exh = sinon.spy(e => `error: ${e}`)
  const transducer = tx2.compose(
    tx2.map(v => {
      if (v%2) return v
      else throw "xyz"
    }),
    tx2.map(v => v+10)
  )
  const ch = chan(fixedBuffer(1), transducer, exh)

  go(function*() {
    t.equal(yield take(ch), 11)
    t.equal(yield take(ch), "error: xyz")
    t.equal(yield take(ch), 13)
    t.ok(exh.calledOnce)
    t.ok(exh.calledWith("xyz"))
  })

  go(function*() {
    yield put(ch, 1)
    yield put(ch, 2)
    yield put(ch, 3)
  })
})

test('transducer reduced value causes channel to close', function(t) {

  t.plan(4)
  const transducer = tx2.compose(
    tx2.map(v => v+10),
    tx2.take(2)
  )
  const ch = chan(fixedBuffer(1), transducer)

  go(function*() {
    t.equal(yield take(ch), 11)
    t.equal(yield take(ch), 12)
    t.equal(yield take(ch), CLOSED)
  })

  go(function*() {
    yield put(ch, 1)
    yield put(ch, 2)
    t.equal(yield put(ch, 3), false)
  })
})

test('transducer reduced value causes channel to close with pending put', function(t) {
  t.plan(6)
  const transducer = tx2.compose(
    tx2.map(v => v+10),
    tx2.take(2)
  )
  const ch = chan(fixedBuffer(1), transducer)

  put_(ch, 1, ok => t.equal(ok, true))
  put_(ch, 2, ok => t.equal(ok, true))
  put_(ch, 3, ok => t.equal(ok, false))

  go(function*() {
    t.equal(yield take(ch), 11)
    t.equal(yield take(ch), 12)
    t.equal(yield take(ch), CLOSED)
  })
})

test('double-closing a channel doesn\'t expode', function(t) {
  const ch = chan(2)
  ch.close()
  t.equal(ch.closed(), true)
  ch.close()
  t.equal(ch.closed(), true)

  t.end()
})

test('channel offer', function(t) {
  const ch = chan(2)

  t.equal(offer(ch, 1), true)
  t.equal(offer(ch, 2), true)
  t.equal(offer(ch, 3), false)

  t.end()
})

test('channel poll', function(t) {
  const ch = chan(2)

  t.equal(poll(ch), NO_VAL)
  t.equal(offer(ch, 1), true)
  t.equal(poll(ch), 1)
  t.equal(poll(ch), NO_VAL)

  t.end()
})

test('poll on closed channel', function(t) {
  const ch = chan(2)

  t.equal(poll(ch), NO_VAL)
  t.equal(offer(ch, 1), true)
  t.equal(poll(ch), 1)
  ch.close()
  t.equal(poll(ch), CLOSED)

  t.end()
})

test('basic all effect', function(t) {
  t.plan(1)

  const chs = [
    chan(1),
    chan(1),
    chan(1),
  ]

  go(function*() {
    t.deepEqual(yield all(...chs), [1, 2, 3])
  })

  go(function*() {
    yield put(chs[1], 2)
    yield put(chs[2], 3)
    yield put(chs[0], 1)
  })
})

test('basic map effect', function(t) {
  t.plan(1)

  const ch = chan()

  go(function*() {
    const val = yield map(v => v+10, take(ch))
    t.equal(val, 11)
  })

  go(function*() {
    yield put(ch, 1)
  })
})

test('basic map 1-arity version', function(t) {
  t.plan(1)

  const ch = chan()
  const m = map(v => v+10)

  go(function*() {
    const val = yield m(take(ch))
    t.equal(val, 11)
  })

  go(function*() {
    yield put(ch, 1)
  })
})

test('nested map effect', function(t) {
  t.plan(1)

  const chs = [
    chan(1),
    chan(1),
    chan(1),
  ]

  const m = map(v => v+10)

  go(function*() {
    const value = yield all(...chs.map(ch => m(take(ch))))
    t.deepEqual(value, [11, 12, 13])
  })

  go(function*() {
    yield put(chs[1], 2)
    yield put(chs[2], 3)
    yield put(chs[0], 1)
  })
})

test('basic join effect', function(t) {
  t.plan(1)

  const gen = function*(val) {
    yield nop()
    return val
  }

  go(function*() {
    const procs = yield all(
      fork(gen, 1),
      fork(gen, 2),
      fork(gen, 3),
    )

    const value = yield join(...procs)
    t.deepEqual(value, [1, 2, 3])
  })
})

test('basic successful cps effect', function(t) {
  t.plan(1)

  function f(a, cb) {
    setTimeout(() => cb(null, a), 10)
  }

  go(function*() {
    const value = yield cps(f, 42)
    t.equal(value, 42)
  })
})

test('basic failed cps effect', function(t) {
  t.plan(1)

  function f(a, cb) {
    setTimeout(() => cb("explode", a), 10)
  }

  go(function*() {
    try {
      const value = yield cps(f, 42)
    } catch (e) {
      t.equal(e, "explode")
    }
  })
})

test('basic toChan', function(t) {
  t.plan(4)
  const ch = toChan([1, 2, 3])

  go(function*() {
    t.equal(yield ch, 1)
    t.equal(yield ch, 2)
    t.equal(yield ch, 3)
    t.equal(yield ch, CLOSED)
  })
})

test('basic mapChan', function(t) {
  t.plan(4)

  const chs = [
    toChan([1, 2, 3, 4]),
    toChan([-3, -2, -1]),
  ]

  const ch = mapChan((...vals) => vals.reduce((acc, val) => acc + val), chs)

  go(function*() {
    t.equal(yield ch, -2)
    t.equal(yield ch, 0)
    t.equal(yield ch, 2)
    t.equal(yield ch, CLOSED)
  })
})

test('basic 1-arity mapChan', function(t) {
  t.plan(4)

  const chs = [
    toChan([1, 2, 3, 4]),
    toChan([-3, -2, -1]),
  ]

  const m = mapChan((...vals) => vals.reduce((acc, val) => acc + val))
  const ch = m(chs)

  go(function*() {
    t.equal(yield ch, -2)
    t.equal(yield ch, 0)
    t.equal(yield ch, 2)
    t.equal(yield ch, CLOSED)
  })
})

test('basic reduceChan', function(t) {
  t.plan(2)

  const inCh = toChan([1, 2, 3, 4])
  const r = reduceChan((acc, v) => acc + v, 0)
  const ch = r(inCh)

  go(function*() {
    t.equal(yield ch, 10)
    t.equal(yield ch, CLOSED)
  })
})

test('basic mult', function(t) {
  t.plan(1)

  const ch = chan()
  const m = mult(ch)

  const cx = chan()
  const cy = chan()
  const cz = chan()

  tap(m, cx)
  tap(m, cy)
  tap(m, cz)

  go(function*() {
    const values = yield all(cx, cy, cz)
    t.deepEqual(values, ["sent to all", "sent to all", "sent to all"])
  })

  put_(ch, "sent to all")
})

test('basic mult with bogus untap and/or multiple add works', function(t) {
  t.plan(1)

  const ch = chan()
  const m = mult(ch)

  const cx = chan()
  const cy = chan()
  const cz = chan()

  tap(m, cx)
  tap(m, cx)
  tap(m, cy)
  tap(m, cz)
  untap(m, ch)

  go(function*() {
    const values = yield all(cx, cy, cz)
    t.deepEqual(values, ["sent to all", "sent to all", "sent to all"])
  })

  put_(ch, "sent to all")
})

test('mult closes tap channels by default if the source channel closes', function(t) {
  t.plan(2)

  const ch = chan()
  const m = mult(ch)

  const cx = chan()
  const cy = chan()
  const cz = chan()

  tap(m, cx)
  tap(m, cy)
  tap(m, cz)

  go(function*() {
    let values = yield all(cx, cy, cz)
    t.deepEqual(values, ["sent to all", "sent to all", "sent to all"])

    values = yield all(cx, cy, cz)
    t.deepEqual(values, [CLOSED, CLOSED, CLOSED])
  })

  put_(ch, "sent to all", () => close(ch))
})

test('can prevent mult from closing taps if the source channel closes', function(t) {
  t.plan(3)

  const ch = chan()
  const m = mult(ch)

  const cx = chan()
  const cy = chan()
  const cz = chan()

  tap(m, cx)
  tap(m, cy)
  tap(m, cz, false)

  go(function*() {
    let values = yield all(cx, cy, cz)
    t.deepEqual(values, ["sent to all", "sent to all", "sent to all"])

    values = yield all(cx, cy)
    t.deepEqual(values, [CLOSED, CLOSED])

    t.equal(cz.closed(), false)
  })

  put_(ch, "sent to all", () => close(ch))
})

test('can untap from a mult', function(t) {
  t.plan(3)

  const ch = chan()
  const m = mult(ch)

  const cx = chan()

  tap(m, cx)

  go(function*() {
    yield put(ch, "hi")
    yield nop() // Give it time to propagate to cx
    let [val] = yield alts(cx, "not-taken")
    t.equal(val, "hi")

    untap(m, cx)

    yield put(ch, "hi again")
    yield nop() // Give it time to propagate
    let [val2] = yield alts(cx, "not-taken")
    t.equal(val2, "not-taken")

    // Still nothing, it was dropped already.
    tap(m, cx)
    let [val3] = yield alts(cx, "not-taken")
    t.equal(val3, "not-taken")
  })
})

test('can untapAll from a mult', function(t) {
  t.plan(2)

  const ch = chan()
  const m = mult(ch)

  const cx = chan()

  tap(m, cx)

  go(function*() {
    yield put(ch, "hi")
    yield nop() // Give it time to propagate to cx
    let [val] = yield alts(cx, "not-taken")
    t.equal(val, "hi")

    untapAll(m)

    yield put(ch, "hi again")
    yield nop() // Give it time to propagate
    let [val2] = yield alts(cx, "not-taken")
    t.equal(val2, "not-taken")
  })
})

test('basic merge', function(t) {
  t.plan(5)

  const cx = chan()
  const cy = chan()

  const mc = mergeChan([cx, cy])

  go(function*() {
    t.equal(yield mc, 1)
    t.equal(yield mc, 2)
    t.equal(yield mc, -1)
    t.equal(yield mc, -2)
    t.equal(yield mc, CLOSED)
  })

  go(function*() {
    yield [cx, 1]
    yield [cx, 2]
    yield [cy, -1]
    close(cx)
    yield [cy, -2]
    close(cy)
  })
})

test('basic into', function(t) {
  t.plan(1)

  go(function*() {
    const ci = intoChan(['a', 'b', 'c'], toChan([1, 2, 3]))
    t.deepEqual(yield ci, ['a', 'b', 'c', 1, 2, 3])
  })
})

test('basic pipe', function(t) {
  t.plan(2)

  const cx = chan()
  const cy = chan()

  pipe(cx, cy)

  go(function*() {
    t.equal(yield cy, "going into cx")
    t.equal(yield cy, CLOSED)
  })

  go(function*() {
    yield [cx, "going into cx"]
    close(cx)
  })
})

test('basic pipe without self-close', function(t) {
  t.plan(3)

  const cx = chan()
  const cy = chan()

  pipe(cx, cy, false)

  go(function*() {
    t.equal(yield cy, "going into cx")
    t.equal(yield cy, "going into cy")
    t.equal(yield cy, CLOSED)
  })

  go(function*() {
    yield [cx, "going into cx"]
    close(cx)
    yield nop() // Give it time to propagate
    yield [cy, "going into cy"]
    close(cy)
  })
})

test('basic pipeline', function(t) {
  t.plan(3)
  const cx = chan()
  const cy = chan()

  const transducer = tx2.compose(tx2.filter(v => v%2 === 1))

  pipeline(cy, transducer, cx)

  go(function*() {
    t.equal(yield cy, 1)
    t.equal(yield cy, 3)
    t.equal(yield cy, CLOSED)
  })

  go(function*() {
    yield [cx, 1]
    yield [cx, 2]
    yield [cx, 3]
    yield [cx, 4]
    close(cx)
  })
})

test('basic pipelineGo', function(t) {
  t.plan(3)
  const cx = chan()
  const cy = chan()

  const af = function*(v, to) {
    if (v%2 === 1) yield [to, v]
  }

  pipelineGo(cy, af, cx)

  go(function*() {
    t.equal(yield cy, 1)
    t.equal(yield cy, 3)
    t.equal(yield cy, CLOSED)
  })

  go(function*() {
    yield [cx, 1]
    yield [cx, 2]
    yield [cx, 3]
    yield [cx, 4]
    close(cx)
  })
})

test('basic pipelineAsync', function(t) {
  t.plan(3)
  const cx = chan()
  const cy = chan()

  const af = function(v, to) {
    setTimeout(() => {
      if (v%2 === 1) put_(to, v, () => close(to))
      else close(to)
    }, 10)
  }

  pipelineAsync(cy, af, cx)

  go(function*() {
    t.equal(yield cy, 1)
    t.equal(yield cy, 3)
    t.equal(yield cy, CLOSED)
  })

  go(function*() {
    yield [cx, 1]
    yield [cx, 2]
    yield [cx, 3]
    yield [cx, 4]
    close(cx)
  })
})

test('basic split', function(t) {
  t.plan(5)

  const ch = toChan([1, 2, 3])
  const [ct, cf] = split(v => v%2 === 0, ch)

  go(function*() {
    t.equal(yield ct, 2)
    t.equal(yield ct, CLOSED)
  })

  go(function*() {
    t.equal(yield cf, 1)
    t.equal(yield cf, 3)
    t.equal(yield cf, CLOSED)
  })
})

test('basic mix', function(t) {
  t.plan(2)

  const ch = chan()
  const m = mix(ch)

  const cx = chan()
  const cy = chan()

  admix(m, cx)
  admix(m, cy)

  go(function*() {
    t.equal(yield ch, 1)
    t.equal(yield ch, 2)
    close(ch)
  })

  go(function*() {
    yield [cx, 1]
    yield [cy, 2]
  })
})

test('basic mix with a muted channel', function(t) {
  t.plan(3)

  const ch = chan()
  const m = mix(ch)

  const cx = chan(1)
  const cy = chan(1)

  admix(m, cx)
  toggle(m, cy, { pause: false, mute: true })

  go(function*() {
    t.equal(yield ch, 1)
    t.equal(yield ch, 3)
    toggle(m, [[cy, { mute: false }]])
    t.equal(yield ch, 4)
    close(ch)
  })

  go(function*() {
    yield [cx, 1]
    yield [cy, 2]
    yield [cx, 3]
    yield [cy, 4]
  })
})

test('basic mix and unmix', function(t) {
  t.plan(3)

  const ch = chan()
  const m = mix(ch)

  const cx = chan()
  const cy = chan()

  admix(m, cx)
  admix(m, cy)

  go(function*() {
    t.equal(yield ch, 1)
    t.equal(yield ch, 2)
    t.equal(yield ch, 4)
    close(ch)
  })

  go(function*() {
    yield [cx, 1]
    yield [cy, 2]
    unmix(m, cx)
    yield [cx, 3]
    yield [cy, 4]
  })
})

test('basic mix and close', function(t) {
  t.plan(3)

  const ch = chan()
  const m = mix(ch)

  const cx = chan()
  const cy = chan()

  admix(m, cx)
  admix(m, cy)

  go(function*() {
    t.equal(yield ch, 1)
    t.equal(yield ch, 2)
    t.equal(yield ch, 4)
    close(ch)
  })

  go(function*() {
    yield [cx, 1]
    yield [cy, 2]
    close(cx)
    yield [cx, 3]
    yield [cy, 4]
  })
})

test('basic mix with pause/unpause', function(t) {
  t.plan(3)

  const ch = chan()
  const m = mix(ch)

  const cx = chan(1)
  const cy = chan(1)

  admix(m, cx)
  toggle(m, cy, { pause: true, mute: false })

  go(function*() {
    t.equal(yield ch, 1)
    t.equal(yield ch, 3)
    toggle(m, [[cy, { pause: false }]])
    t.equal(yield ch, 2)
    close(ch)
  })

  go(function*() {
    yield [cx, 1]
    yield [cy, 2]
    yield [cx, 3]
    yield [cy, 4]
  })
})

test('basic solo with mute mode', function(t) {
  t.plan(3)

  const ch = chan()
  const m = mix(ch)
  soloMode(m, MIX_MUTE)

  const cx = chan(1)
  const cy = chan(1)

  toggle(m, cx, { solo: true })
  admix(m, cy)

  go(function*() {
    t.equal(yield ch, 1)
    t.equal(yield ch, 3)
    toggle(m, cy, { solo: true })
    t.equal(yield ch, 4)
    close(ch)
  })

  go(function*() {
    yield [cx, 1]
    yield [cy, 2]
    yield [cx, 3]
    yield [cy, 4]
  })
})

test('basic solo with pause mode', function(t) {
  t.plan(3)

  const ch = chan()
  const m = mix(ch)
  soloMode(m, MIX_PAUSE)

  const cx = chan(1)
  const cy = chan(1)

  toggle(m, cx, { solo: true })
  admix(m, cy)

  go(function*() {
    t.equal(yield ch, 1)
    t.equal(yield ch, 3)
    toggle(m, cy, { solo: true })
    t.equal(yield ch, 2)
    close(ch)
  })

  go(function*() {
    yield [cx, 1]
    yield [cy, 2]
    yield [cx, 3]
    yield [cy, 4]
  })
})

test('basic pub', function(t) {
  t.plan(6)

  const ch = chan()
  const p = pub(ch, v => v.topic)

  const cx = chan()
  const cy = chan()
  const cz = chan()

  sub(p, 'celebrity-gossip', cx)
  sub(p, 'space-x', cy)
  sub(p, 'space-x', cz)

  go(function*() {
    t.deepEqual(yield cx, { topic: 'celebrity-gossip', data: 'gossip' })
    t.deepEqual(yield cx, CLOSED)
  })

  go(function*() {
    t.deepEqual(yield cy, { topic: 'space-x', data: 'launch!' })
    t.deepEqual(yield cy, CLOSED)
  })

  go(function*() {
    t.deepEqual(yield cz, { topic: 'space-x', data: 'launch!' })
    t.deepEqual(yield cz, CLOSED)
  })

  go(function*() {
    yield [ch, { topic: 'celebrity-gossip', data: 'gossip' }]
    yield [ch, { topic: 'space-x', data: 'launch!' }]
    yield nop() // allow propagation
    close(ch)
  })
})

test('basic pub & unsub', function(t) {
  t.plan(5)

  const ch = chan()
  const p = pub(ch, v => v.topic)

  const cx = chan()
  const cy = chan()
  const cz = chan()

  sub(p, 'celebrity-gossip', cx)
  sub(p, 'space-x', cy)
  sub(p, 'space-x', cz)

  go(function*() {
    t.deepEqual(yield cx, { topic: 'celebrity-gossip', data: 'gossip' })
    t.deepEqual(yield cx, CLOSED)
  })

  go(function*() {
    t.deepEqual(yield cy, CLOSED)
  })

  go(function*() {
    t.deepEqual(yield cz, { topic: 'space-x', data: 'launch!' })
    t.deepEqual(yield cz, CLOSED)
  })

  go(function*() {
    yield [ch, { topic: 'celebrity-gossip', data: 'gossip' }]
    unsub(p, 'space-x', cy)
    yield [ch, { topic: 'space-x', data: 'launch!' }]
    yield nop() // allow propagation
    close(ch)
    close(cy)
  })
})

test('basic pub & unsub all on a topic', function(t) {
  t.plan(4)

  const ch = chan()
  const p = pub(ch, v => v.topic)

  const cx = chan()
  const cy = chan()
  const cz = chan()

  sub(p, 'celebrity-gossip', cx)
  sub(p, 'space-x', cy)
  sub(p, 'space-x', cz)

  go(function*() {
    t.deepEqual(yield cx, { topic: 'celebrity-gossip', data: 'gossip' })
    t.deepEqual(yield cx, CLOSED)
  })

  go(function*() {
    t.deepEqual(yield cy, CLOSED)
  })

  go(function*() {
    t.deepEqual(yield cz, CLOSED)
  })

  go(function*() {
    yield [ch, { topic: 'celebrity-gossip', data: 'gossip' }]
    unsubAll(p, 'space-x')
    yield [ch, { topic: 'space-x', data: 'launch!' }]
    yield nop() // allow propagation
    close(ch)
  })
})

test('basic pub & unsub individuall all from topic', function(t) {
  t.plan(4)

  const ch = chan()
  const p = pub(ch, v => v.topic)

  const cx = chan()
  const cy = chan()
  const cz = chan()

  sub(p, 'celebrity-gossip', cx)
  sub(p, 'space-x', cy)
  sub(p, 'space-x', cz)

  go(function*() {
    t.deepEqual(yield cx, { topic: 'celebrity-gossip', data: 'gossip' })
    t.deepEqual(yield cx, CLOSED)
  })

  go(function*() {
    t.deepEqual(yield cy, CLOSED)
  })

  go(function*() {
    t.deepEqual(yield cz, CLOSED)
  })

  go(function*() {
    yield [ch, { topic: 'celebrity-gossip', data: 'gossip' }]
    unsub(p, 'space-x', cy)
    unsub(p, 'space-x', cz)
    yield [ch, { topic: 'space-x', data: 'launch!' }]
    yield nop() // allow propagation
    close(ch)
    close(cy)
    close(cz)
  })
})


test('basic pub & unsub non-existant topic', function(t) {
  t.plan(6)

  const ch = chan()
  const p = pub(ch, v => v.topic)

  const cx = chan()
  const cy = chan()
  const cz = chan()

  sub(p, 'celebrity-gossip', cx)
  sub(p, 'space-x', cy)
  sub(p, 'space-x', cz)

  go(function*() {
    t.deepEqual(yield cx, { topic: 'celebrity-gossip', data: 'gossip' })
    t.deepEqual(yield cx, CLOSED)
  })

  go(function*() {
    t.deepEqual(yield cy, { topic: 'space-x', data: 'launch!' })
    t.deepEqual(yield cy, CLOSED)
  })

  go(function*() {
    t.deepEqual(yield cz, { topic: 'space-x', data: 'launch!' })
    t.deepEqual(yield cz, CLOSED)
  })

  go(function*() {
    yield [ch, { topic: 'celebrity-gossip', data: 'gossip' }]
    unsub(p, 'nasa', cy)
    unsubAll(p, 'nasa')
    yield [ch, { topic: 'space-x', data: 'launch!' }]
    yield nop() // allow propagation
    close(ch)
  })
})

test('basic tickerChan', function(t) {
  t.plan(5)
  const clock = sinon.useFakeTimers('setInterval', 'clearInterval')
  const ch = tickerChan(50)
  clock.tick(55)

  go(function*() {
    yield ch
    t.pass(true)
    t.equal(poll(ch), NO_VAL)
    clock.tick(55)
    yield ch
    t.pass(true)
    t.equal(poll(ch), NO_VAL)
    clock.tick(55)
    yield ch
    t.pass(true)
    ch.close()
    clock.restore()
  })
})

test('tickerChan with burstLimit', function(t) {
  t.plan(4)
  const clock = sinon.useFakeTimers('setInterval', 'clearInterval')
  const ch = tickerChan(50, 2)
  clock.tick(55)
  clock.tick(55)

  go(function*() {
    yield ch
    yield ch
    t.pass(true)
    t.equal(poll(ch), NO_VAL)
    clock.tick(50)
    yield ch
    t.pass(true)
    t.equal(poll(ch), NO_VAL)
    ch.close()
    clock.tick(55)
    clock.restore()
  })
})

test('basic promiseChan', function(t) {
  t.plan(4)
  const cx = chan()

  const p = new Promise((resolve, reject) => {
    go(function*() {
      yield cx
      resolve(42)
    })
  })

  const ch = promiseChan(p)

  go(function*() {
    t.equal(poll(ch), NO_VAL)
    const [val] = yield all(ch, [cx, 'now!'])
    t.equal(val, 42)
    t.equal(poll(ch), 42)
    t.equal(poll(ch), 42)
  })
})

test('basic promiseChan with rejected promise', function(t) {
  t.plan(3)
  const cx = chan()

  const p = new Promise((resolve, reject) => {
    go(function*() {
      yield cx
      reject("boo!")
    })
  })

  const ch = promiseChan(p)

  go(function*() {
    t.equal(poll(ch), NO_VAL)
    try {
      const [val] = yield all(ch, [cx, 'now!'])
    } catch (e) {
      t.equal(e, "boo!")
      t.pass(isError(poll(ch)))
    }
  })
})

test('basic put close take', function(t) {
  t.plan(2)
  const ch = chan()

  put_(ch, 42)
  close(ch)

  go(function*() {
    t.equal(yield ch, 42)
    t.equal(yield ch, CLOSED)
  })
})

test('basic put close take (buffered)', function(t) {
  t.plan(2)
  go(function*() {
    const ch = chan(1)
    yield [ch, 42]
    close(ch)
    t.equal(yield ch, 42)
    t.equal(yield ch, CLOSED)
  })
})

test('basic put_ and take_', function(t) {
  t.plan(2)

  const ch = chan(1)
  put_(ch, 42, (ok) => {
    t.equal(ok, true)
    take_(ch, val => t.equal(val, 42))
  })
})

test('close an undelivered promise chan', function(t) {
  t.plan(1)

  const ch = chan(promiseBuffer())
  ch.close()
  take_(ch, val => t.equal(val, null))
})

test('nested alt & all where all is used', function(t) {
  t.plan(3)

  const cx = chan()
  const cy = chan()
  const cz = chan()

  go(function*() {
    const a = all(cx, cy)
    const [val, port] = yield alts(a, cz)
    t.equal(port, a)
    t.deepEqual(val, [1, 5])

    const valz = yield cz
    t.equal(valz, 42)
  })

  go(function*() {
    yield put(cx, 1)
    yield put(cy, 5)
    yield put(cz, 42)
  })
})

test('nested alt & all where all is not used', function(t) {
  t.plan(3)

  const cx = chan()
  const cy = chan()
  const cz = chan()

  go(function*() {
    const a = all(cx, cy)
    const [val, port] = yield alts(a, cz)
    t.equal(port, cz)
    t.equal(val, 42)

    const vala = yield a
    t.deepEqual(vala, [1, 5])
  })

  go(function*() {
    yield put(cz, 42)
    yield put(cx, 1)
    yield put(cy, 5)
  })
})

test('nested all & alt', function(t) {
  t.plan(2)

  const cx = chan()
  const cy = chan()
  const cz = chan()

  go(function*() {
    const vals = yield all(alt([cy, 'y'], [cz, 'z']), cx)
    t.deepEqual(vals, ['z', 1])

    const val = yield cy
    t.equal(val, 5)
  })

  go(function*() {
    yield put(cz, 42)
    yield put(cy, 5)
    yield put(cx, 1)
  })
})
