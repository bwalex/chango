/* @flow */
import type { Buffer } from './buffer'
import { fixedBuffer } from './buffer'
import { reduced, step, result } from './transducers'
import { run } from './dispatch'
import { CLOSED, NO_VAL } from './constants'
import { FnHandler } from './handler'

const BufferAddTransformer = {
  '@@transducer/init': function() {},
  '@@transducer/result': result => result,
  '@@transducer/step': (result, input) => result.add(input),
}

function exHandler(ex) {
  console.log(ex)
  return CLOSED
}

function handleEx(buf, exh: ?Function = null) {
  const handler = function(ex) {
    const val = (exh || exHandler)(ex)
    return val === CLOSED ? buf : buf.add(val)
  }

  return function(xf) {
    return {
      '@@transducer/init': function() {},
      '@@transducer/result': function(result) {
        try {
          return result(xf, result)
        } catch (e) {
          return handler(e)
        }
      },
      '@@transducer/step': function(result, input) {
        try {
          return step(xf, result, input)
        } catch (e) {
          return handler(e)
        }
      },
    }
  }
}

function commitAndRun(handler, ...args) {
  if (!handler.active()) return

  const cb = handler.commit()
  run(() => cb(...args))
}

export class Channel {
  constructor(
    buffer: Buffer,
    transducer: ?Function,
    exHandler: ?Function,
    unbuffered,
  ) {
    this._closed = false
    this.buffer = buffer
    this.exHandler = exHandler
    this.puts = []
    this.takes = []
    this.unbuffered = unbuffered

    let xform = transducer
      ? transducer(BufferAddTransformer)
      : BufferAddTransformer
    this.xform = handleEx(this.buffer, exHandler)(xform)
  }

  close() {
    if (this._closed) return

    this._closed = true

    while (this.takes.length > 0) {
      const taker = this.takes.shift()
      commitAndRun(taker, CLOSED)
    }

    if (!this.unbuffered) {
      while (this.puts.length > 0) {
        const [val, putter] = this.puts.shift()
        commitAndRun(putter, false)
      }
    }

    this.buffer.close()
  }

  closed(): boolean {
    return this._closed
  }

  put(val, handler) {
    if (!handler.active()) return false

    if (this._closed) {
      commitAndRun(handler, false)
      return true
    }

    if (
      !(this.buffer.blocking() && this.buffer.full()) &&
      (!this.unbuffered || this.takes.length > 0)
    ) {
      this.putOne(handler, val)
      return true
    } else if (handler.blockable()) {
      this.puts.push([val, handler])
      return false
    }

    return false
  }

  putOne(handler, val) {
    if (!handler.active()) return

    const done = reduced(step(this.xform, this.buffer, val))
    commitAndRun(handler, true)

    while (this.buffer.count() > 0 && this.takes.length > 0) {
      const taker = this.takes.shift()
      if (taker.active()) {
        const val = this.buffer.remove()
        commitAndRun(taker, val)
      }
    }

    if (done) this.close()
  }

  take(handler) {
    if (!handler.active()) return NO_VAL

    if (this.buffer.count() > 0) {
      const val = this.buffer.remove()
      commitAndRun(handler, val)

      while (!this.buffer.full() && this.puts.length > 0) {
        const [val, putter] = this.puts.shift()
        this.putOne(putter, val)
      }
      return val
    } else if (this.unbuffered && this.puts.length > 0) {
      const [val, putter] = this.puts.shift()
      this.takes.push(handler)
      this.putOne(putter, val)
    } else if (this._closed) {
      commitAndRun(handler, CLOSED)
      return CLOSED
    } else if (handler.blockable()) {
      this.takes.push(handler)
      return NO_VAL
    }

    return NO_VAL
  }
}

export function chan(sizeOrBuffer = null, transducer = null, exHandler = null) {
  const unbuffered = sizeOrBuffer === null

  const buffer = unbuffered || typeof sizeOrBuffer === 'number'
    ? fixedBuffer(unbuffered ? 1 : sizeOrBuffer)
    : sizeOrBuffer

  return new Channel(buffer, transducer, exHandler, unbuffered)
}

export function close(ch: Channel) {
  ch.close()
}

export function offer(ch: Channel, val) {
  return ch.put(val, new FnHandler(function() {}, false))
}

export function poll(ch: Channel) {
  return ch.take(new FnHandler(function() {}, false))
}

export function put_(ch: Channel, val, cb = null) {
  if (!cb) cb = function() {}
  return ch.put(val, new FnHandler(cb))
}

export function take_(ch: Channel, cb) {
  return ch.take(new FnHandler(cb))
}
