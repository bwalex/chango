export {
  PROCESS_KILLED,
  CLOSED,
  NO_VAL,
  MIX_MUTE,
  MIX_PAUSE,
} from './internal/constants'

export { Process, go, kill } from './internal/process'

export {
  fixedBuffer,
  droppingBuffer,
  slidingBuffer,
  promiseBuffer,
} from './internal/buffer'

export {
  Channel,
  chan,
  close,
  offer,
  poll,
  put_,
  take_,
} from './internal/channel'

export { Error, error, isError } from './internal/error'

export { Handler, FnHandler } from './internal/handler'

export {
  mix,
  stopMix,
  admix,
  unmix,
  unmixAll,
  soloMode,
  toggle,
} from './internal/mix'

export { mult, stopMult, tap, taps, untap, untapAll } from './internal/mult'

export { pub, stopPub, sub, unsub, unsubAll } from './internal/pub'

import { Pub } from './internal/pub'
import { Mult } from './internal/mult'
import { Mix } from './internal/mix'

export function stop(o) {
  if (o instanceof Pub) stopPub(o)
  else if (o instanceof Mult) stopMult(o)
  else if (o instanceof Mix) stopMix(o)
}

export {
  tickerChan,
  timeoutChan,
  promiseChan,
  cpsChan,
  ontoChan,
  toChan,
  intoChan,
  mapChan,
  reduceChan,
  mergeChan,
  pipe,
  pipelineGo,
  pipeline,
  pipelineAsync,
  split,
} from './internal/helper'

export { addEffectHandler, handleEffect } from './internal/effects'

import * as effects from './internal/effects'
export { effects }
