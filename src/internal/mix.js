import { Channel, chan, close, put_ } from './channel'
import { alt } from './effects'
import { go } from './process'
import { CLOSED, MIX_MUTE, MIX_PAUSE, MIX_SOLO, MIX_CHANGED } from './constants'

export class Mix {
  constructor(ch) {
    this.ch = ch
    this.sources = []
    this.soloMode = MIX_MUTE
    this.changeCh = chan()
  }

  run() {
    const self = this
    this.running = true

    this.proc = go(function*() {
      while (self.sources.length !== 0) {
        const solo = self.sources.findIndex(s => s.solo) !== -1
        const activeSources = self.sources.filter(
          s => (solo ? s.solo : !(s.mute || s.pause)),
        )
        const mutedSources = self.sources.filter(
          s =>
            solo
              ? self.soloMode === MIX_MUTE && !s.solo && !s.pause
              : s.mute && !s.pause,
        )

        const altChannels = [].concat(
          [[self.changeCh, [MIX_CHANGED]]],
          activeSources.map(s => [s.ch, v => [true, s.ch, v]]),
          mutedSources.map(s => [s.ch, [false, s.ch]]),
        )

        const [active, chan, value] = yield alt(...altChannels)
        if (value === CLOSED) {
          self.remove(chan)
        } else if (active === MIX_CHANGED) {
          continue
        } else if (active) {
          const ok = yield [self.ch, value]
          if (!ok) break
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

  add(ch, mute = false, pause = false, solo = false) {
    this.sources.push({ ch, mute, pause, solo })

    if (!this.running) this.run()
    else put_(this.changeCh, null)
  }

  remove(ch) {
    const index = this.sources.findIndex(t => t.ch === ch)
    if (index > -1) {
      this.sources.splice(index, 1)
      put_(this.changeCh, null)
    }
  }

  removeAll() {
    this.sources = []
    this.stop()
  }

  setSoloMode(mode) {
    this.soloMode = mode
    put_(this.changeCh, null)
  }

  toggle(ch, stateMap = {}) {
    const index = this.sources.findIndex(t => t.ch === ch)
    if (index > -1) {
      const source = this.sources[index]
      this.sources[index] = {
        ...source,
        mute: stateMap.hasOwnProperty('mute') ? stateMap.mute : source.mute,
        pause: stateMap.hasOwnProperty('pause') ? stateMap.pause : source.pause,
        solo: stateMap.hasOwnProperty('solo') ? stateMap.solo : source.solo,
      }
    } else {
      const mute = !!stateMap.mute
      const pause = !!stateMap.pause
      const solo = !!stateMap.solo
      this.add(ch, mute, pause, solo)
    }

    put_(this.changeCh, null)
  }
}

export function mix(ch) {
  return new Mix(ch)
}

export function stopMix(mix) {
  mix.stop()
}

export function admix(mix, ch) {
  mix.add(ch)
}

export function unmix(mix, ch) {
  mix.remove(ch)
}

export function unmixAll(mix) {
  mix.removeAll()
}

export function soloMode(mix, mode) {
  mix.setSoloMode(mode)
}

// XXX: objects cannot really be keys, so can't use a map
export function toggle(mix, chOrList, stateMap = null) {
  if (chOrList instanceof Channel) {
    mix.toggle(chOrList, stateMap)
  } else {
    for (let [ch, stateMap] of chOrList) {
      mix.toggle(ch, stateMap)
    }
  }
}
