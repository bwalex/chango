import { isError } from './error'

export interface IHandler {
  active(): boolean, // "returns true if has callback
  blockable(): boolean, // "returns true if this handler may be blocked, otherwise it must not block"
  commit(): Function, // "commit to fulfilling its end of the transfer, returns cb
}

export class Handler {}

export class FnHandler extends Handler {
  constructor(fn, blockable = true) {
    super()
    this.fn = fn
    this._blockable = blockable
  }

  active = () => true
  blockable = () => this._blockable
  commit = () => this.fn
}

export class AltFlag {
  flag = true
  active = () => this.flag
  commit = () => {
    this.flag = false
  }
}

export class AltHandler extends Handler {
  constructor(flag, fn, parent = null) {
    super()
    this.fn = fn
    this.flag = flag || new AltFlag()
    this.parent = parent
  }

  active = () => this.flag.active() && (!this.parent || this.parent.active())
  blockable = () => true
  commit() {
    this.flag.commit()
    return this.fn
  }
}

export class AllFlag {
  constructor(n, fn, parent = null) {
    this.count = 0
    this.commitCount = 0
    this.n = n
    this.fn = fn
    this.errored = false
    this.values = []
    this.parent = parent
  }

  active = () =>
    !this.errored &&
    this.commitCount < this.n &&
    (!this.parent || this.parent.active())
  commit = index => {
    ++this.commitCount
    return this.handler(index)
  }

  handler = index => val => {
    this.values.push({ index, val })
    this.errored = isError(val)

    if (++this.count === this.n || this.errored) {
      const values = this.values
        .sort((a, b) => a.index - b.index)
        .map(vp => vp.val)

      this.fn(this.errored ? val : values)
    }
  }
}

export class AllHandler extends Handler {
  constructor(flag, index) {
    super()
    this.index = index
    this.flag = flag
  }

  active = () => this.flag.active()
  blockable = () => true
  commit() {
    return this.flag.commit(this.index)
  }
}
