import { chan, close } from './channel'
import { alt } from './effects'
import { go } from './process'
import { CLOSED } from './constants'
import { mult, stop as stopMult, tap, untap, taps } from './mult'

export class Pub {
  constructor(ch, topicFn, bufFn) {
    this.ch = ch
    this.topicFn = topicFn
    this.bufFn = bufFn
    this.running = false
    this.proc = null
    this.mults = {}
  }

  run() {
    const self = this
    this.running = true

    this.proc = go(function*() {
      while (true) {
        const val = yield self.ch
        if (val === CLOSED) {
          self.removeAll()
          break
        } else {
          const topic = self.topicFn(val)
          if (self.mults[topic]) {
            const ok = yield [self.mults[topic].ch, val]
            if (!ok) self.removeAll(topic)
          }
        }
      }
    })

    return this
  }

  stop() {
    if (!this.running) return

    this.proc.kill()
    this.running = false
  }

  add(topic, ch, close = true) {
    if (!this.mults.hasOwnProperty(topic)) {
      const cm = chan(this.bufFn(topic))
      this.mults[topic] = { mult: mult(cm), ch: cm }
    }
    tap(this.mults[topic].mult, ch, close)

    if (!this.running) this.run()
  }

  remove(topic, ch) {
    if (!this.mults.hasOwnProperty(topic)) return

    untap(this.mults[topic].mult, ch)
    if (taps(this.mults[topic].mult) === 0) {
      this.closeTopic(topic)
    }
  }

  closeTopic(topic) {
    // XXX: untap all of them first, to avoid close() propagation?
    close(this.mults[topic].ch)
    delete this.mults[topic]
  }

  removeAll(topic = null) {
    if (topic) {
      if (this.mults[topic]) this.closeTopic(topic)
    } else {
      Object.keys(this.mults).forEach(t => this.closeTopic(t))
    }
  }
}

export function pub(ch, topicFn, bufFnOrBuf = 1) {
  const bufFn = typeof bufFnOrBuf === 'function' ? bufFnOrBuf : _ => bufFnOrBuf

  return new Pub(ch, topicFn, bufFn).run()
}

export function stopPub(p) {
  p.stop()
}

export function sub(p, topic, ch, close = true) {
  p.add(topic, ch, close)
}

export function unsub(p, topic, ch) {
  p.remove(topic, ch)
}

export function unsubAll(p, topic = null) {
  p.removeAll(topic)
}
