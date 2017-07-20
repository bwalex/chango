import { Channel, chan } from './channel'
import { nextTick } from './nextTick'
import { handleEffect } from './effects'
import { FnHandler } from './handler'
import { PROCESS_KILL, PROCESS_KILLED } from './constants'
import { isError, error } from './error'
import { warning } from './util'

class InternalProcess {
  constructor(gen, onDone = null) {
    this.gen = gen
    this.onDone = onDone
    this.done = false
    this.killed = false
    this.thrown = false
    this.children = []
  }

  addChild(proc) {
    this.children.push(proc)
  }

  schedule = val => nextTick(() => this.run(val))

  finish(val) {
    if (this.done) return

    this.done = true
    this.children.forEach(child => child.kill())
    if (this.onDone) this.onDone(val)
  }

  kill() {
    if (!this.killed && !this.done) {
      this.killed = true
      this.children.forEach(child => child.kill())
    }
  }

  run = val => {
    if (this.killed && !this.thrown) {
      val = PROCESS_KILL
      this.finish(PROCESS_KILLED)
      this.thrown = true
    }

    const thrw = isError(val)
    const ret = val === PROCESS_KILL
    try {
      var { done, value } = thrw
        ? this.gen.throw(val.value())
        : ret ? this.gen.return(val) : this.gen.next(val)
    } catch (e) {
      var [done, value] = [true, error(e)]
    }

    if (done) {
      this.finish(this.killed ? PROCESS_KILLED : value)
    } else {
      handleEffect(value, this.schedule, this)
    }
  }
}

export class Process {
  constructor(ch: Channel, proc: InternalProcess) {
    this.ch = ch
    this.proc = proc
  }

  kill() {
    this.proc.kill()
  }

  killed() {
    this.proc.killed
  }
}

// returns a channel with the return value of the function
export function go(genfn, ...args) {
  const ch = chan(1)

  const proc = new InternalProcess(genfn(...args), retVal => {
    warning(
      !isError(retVal) || ch.hasTakes(),
      `Process finished with error but return channel has no listeners`,
      retVal,
    )

    ch.put(retVal, new FnHandler(() => ch.close()))
  })

  proc.run()

  return new Process(ch, proc)
}

export function kill(...procs) {
  procs.forEach(p => p.kill())
}

// XXX: add channel tracking to process, so if a process exits (for whatever reason), the tracked channels are automatically closed.
