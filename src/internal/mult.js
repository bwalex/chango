import { chan, close } from './channel'
import { all } from './effects'
import { go } from './process'
import { CLOSED } from './constants'

export class Mult {
  constructor(ch, close = true) {
    this.ch = ch
    this.taps = []
    this.running = false
    this.proc = null
  }

  run() {
    const self = this
    this.running = true

    this.proc = go(function*() {
      while (true) {
        const val = yield self.ch
        if (self.taps.length > 0) {
          if (val === CLOSED) {
            self.taps.filter(t => t.close).forEach(t => close(t.ch))
            break
          } else {
            yield all(...self.taps.map(t => [t.ch, val]))
          }
        } else if (val === CLOSED) {
          break
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

  add(ch, close = true) {
    const index = this.taps.findIndex(t => t.ch === ch)
    if (index === -1) this.taps.push({ ch, close })

    if (!this.running) this.run()
  }

  remove(ch) {
    const index = this.taps.findIndex(t => t.ch === ch)
    if (index > -1) this.taps.splice(index, 1)
  }

  removeAll() {
    this.taps = []
  }
}

export function mult(ch) {
  return new Mult(ch).run()
}

export function stopMult(mult) {
  mult.stop()
}

export function tap(mult, ch, close = true) {
  mult.add(ch, close)
}

export function taps(mult) {
  return mult.taps.length
}

export function untap(mult, ch) {
  mult.remove(ch)
}

export function untapAll(mult) {
  mult.removeAll()
}
