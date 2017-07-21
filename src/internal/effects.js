import {
  AltHandler,
  AltFlag,
  FnHandler,
  Handler,
  AllHandler,
  AllFlag,
} from './handler'
import { Channel } from './channel'
import { Process, go } from './process'
import { cpsChan, callbackChan, promiseChan, timeoutChan } from './helper'
import { isError } from './error'
import { warning, isPromise } from './util'

let effectHandlers = {}

export function addEffectHandler(name, handler) {
  warning(
    !effectHandlers.hasOwnProperty(name),
    `Overriding built-in effect handler ${name}`,
  )

  effectHandlers[name] = handler
}

export function runEffectTranslators(effect) {
  if (effect instanceof Channel) {
    return take(effect)
  } else if (
    Array.isArray(effect) &&
    effect.length == 2 &&
    effect[0] instanceof Channel
  ) {
    return put(effect[0], effect[1])
  } else if (isPromise(effect)) {
    return take(promiseChan(effect))
  } else {
    return effect
  }
}

export function handleEffect(effect, doneFn, proc) {
  effect = runEffectTranslators(effect)

  if (effect && effect.hasOwnProperty('type')) {
    const name = effect.type
    if (effectHandlers.hasOwnProperty(name)) {
      effectHandlers[name](effect, doneFn, proc)
      return
    }
  }

  dummyHandler(effect, doneFn)
}

// effect generators
export const put = (ch, val) => ({
  type: 'put',
  ch,
  val,
})

export const take = ch => ({
  type: 'take',
  ch,
})

export const sleep = ms => timeoutChan(ms)

export const call = (fn, ...args) => ({
  type: 'call',
  fn,
  args,
})

// error-first callback function
export const cps = (fn, ...args) => cpsChan(fn, ...args)

// only result callback function
export const callback = (fn, ...args) => callbackChan(fn, ...args)

export const fork = (procOrFn, ...args) => ({
  type: 'fork',
  procOrFn,
  args,
})

export const spawn = (fn, ...args) => ({
  type: 'spawn',
  fn,
  args,
})

export const alts = (...ports) => ({
  type: 'alts',
  ports,
})

export const alt = (...ports) => ({
  type: 'alt',
  ports,
})

export const all = (...ports) => ({
  type: 'all',
  ports,
})

export const nop = () => ({
  type: 'nop',
})

const _map = (fn, effect) => ({
  type: 'map',
  fn,
  effect,
})

export const map = (fn, effect = null) =>
  effect ? _map(fn, effect) : eff => _map(fn, eff)

export const killed = () => ({
  type: 'killed',
})

export const join = (...procs) => all(...procs.map(p => p.ch))

function putHandler({ ch, val }, doneFn) {
  const handler = doneFn instanceof Handler ? doneFn : new FnHandler(doneFn)
  ch.put(val, handler)
}

function takeHandler({ ch }, doneFn) {
  const handler = doneFn instanceof Handler ? doneFn : new FnHandler(doneFn)
  ch.take(handler)
}

function callHandler({ fn, args }, doneFn) {
  const handler = doneFn instanceof Handler ? doneFn : new FnHandler(doneFn)
  const proc = go(fn, ...args)
  proc.ch.take(handler)
}

function forkHandler({ procOrFn, args }, doneFn, parent) {
  const handler = doneFn instanceof Handler ? doneFn : new FnHandler(doneFn)
  const proc = procOrFn instanceof Process ? procOrFn : go(procOrFn, ...args)
  parent.addChild(proc)
  if (handler.active()) {
    handler.commit()(proc)
  }
}

function spawnHandler({ fn, args }, doneFn) {
  const handler = doneFn instanceof Handler ? doneFn : new FnHandler(doneFn)
  const proc = go(fn, ...args)
  if (handler.active()) {
    handler.commit()(proc)
  }
}

function dummyHandler(value, doneFn) {
  const handler = doneFn instanceof Handler ? doneFn : new FnHandler(doneFn)
  if (handler.active()) {
    handler.commit()(value)
  }
}

function nopHandler(effect, doneFn) {
  dummyHandler(null, doneFn)
}

function mapHandler({ fn, effect }, doneFn, proc) {
  const handler = doneFn instanceof Handler ? doneFn : new FnHandler(doneFn)
  const h = new FnHandler(v => {
    if (handler.active()) {
      const val = typeof fn === 'function' ? fn(v) : fn
      handler.commit()(val)
    }
  })

  handleEffect(effect, h, proc)
}

function killedHandler(effect, doneFn, proc) {
  dummyHandler(proc.killed, doneFn)
}

function makeAltsHandler(alt) {
  return ({ ports }, doneFn, parent) => {
    const handler = doneFn instanceof Handler ? doneFn : new FnHandler(doneFn)
    const flag = new AltFlag()

    for (let p of ports) {
      const port = alt ? p[0] : p
      const xform = alt && p.length > 1 && typeof p[1] === 'function'
        ? p[1]
        : null

      const h = new AltHandler(
        flag,
        val => {
          if (handler.active()) {
            const result = xform ? xform(val, port) : alt ? p[1] : [val, port]
            handler.commit()(isError(val) ? val : result)
          }
        },
        handler,
      )

      handleEffect(port, h, parent)

      if (!flag.active()) break
    }
  }
}

function allHandler({ ports }, doneFn, parent) {
  const handler = doneFn instanceof Handler ? doneFn : new FnHandler(doneFn)
  const n = ports.length
  const flag = new AllFlag(
    n,
    result => {
      if (handler.active()) {
        handler.commit()(result)
      }
    },
    handler,
  )

  ports.forEach((port, index) => {
    const h = new AllHandler(flag, index)
    handleEffect(port, h, parent)
  })
}

addEffectHandler('put', putHandler)
addEffectHandler('take', takeHandler)
addEffectHandler('call', callHandler)
addEffectHandler('fork', forkHandler)
addEffectHandler('spawn', spawnHandler)
addEffectHandler('nop', nopHandler)
addEffectHandler('map', mapHandler)
addEffectHandler('killed', killedHandler)
addEffectHandler('alts', makeAltsHandler(false))
addEffectHandler('alt', makeAltsHandler(true))
addEffectHandler('all', allHandler)
