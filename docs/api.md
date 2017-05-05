## Constants

### PROCESS_KILLED
### CLOSED
### NO_VAL


## Errors


## Channels

### `chan(sizeOrBuffer = null, transducer = null, exHandler = null)`
### `close(ch)`
### `offer(ch, value)`
### `poll(ch)`
### `put_(ch, value, callbackFn = null)`
### `take_(ch, callbackFn = null)`

### Buffer types

#### `fixedBuffer(size = 1)`
#### `droppingBuffer(size = 1)`
#### `slidingBuffer(size = 1)`
#### `promiseBuffer()`


## Coroutines

### `go(fn, ...args)`
### `kill(...procs)`


## Coroutine Effects

### `put(ch, value)`

Place `value` onto the channel `ch`. If the channel cannot accept the value immediately, this effect will block until the channel can accept the value.
Returns true unless the channel is closed before the value is placed onto it, in which case it returns false.

### `take(ch)`

Take a value from the channel `ch`. If the channel cannot provide a value immediately, this effect will block until the channel can provide a value.
Returns the value taken from the channel, or the `CLOSED` constant if the channel is closed before a value can be retrieved.

### `sleep(ms)`

Waits for the specified amount of ms before continuing.

#### Example

```javascript
go(function*() {
  // Waits for 100 ms before continuing
  yield sleep(100)
})
```

### `call(fn, ...args)`
### `cps(fn, ...args)`
### `fork(procOrFn, ...args)`
### `spawn(fn, ...args)`
### `alts(...effects)`
### `alt([effect, valueOrFn], ...)`
### `all(...effects)`
### `nop()`

Reschedules the process to resume immediately (on the next tick). Returns null.

### `map(fn, effect)`

Wraps another effect in a transformation function.

If `effect` is not specified, returns an effect creator with `fn` tied to the argument that was passed in.

#### Example

```javascript
go(function*() {
  // Returns a value taken from someChannel and incremented by 10.
  const val = yield map(v => v+10, take(someChannel))
})
```


### `killed()`

Returns true if the process yielding this effect has been killed.

#### Example

```javascript
go(function*() {
  try {
    yield take(someChannel)
  } finally {
    // wasKilled will be true if the process was killed. If instead
    // an exception was taken as a result of the value on someChannel,
    // the killed() effect will return false instead.
    const wasKilled = yield killed()
  }
})
```

### `join(...procs)`

Wait for the given processes to finish, and returns their return values.
`procs` must be a list of Process handles returned by the `fork` or `spawn` effects or the `go` function.

Underneath, this effect just passes all of the process return value channels to an `all()` effect, so `join` has the same early fail semantics as `all`.

#### Example

```javascript
go(function*() {
  const procs = yield all(fork(someFn), fork(someOtherFn))
  // 'values' will be an array of the return values of the two proceses
  // above, and will only provide a value when both have finished.
  const values = yield join(...procs)
})
```

### `[ch, value]`

Same as `put(ch, value)`.

### `ch`

Same as `take(ch, value)`.

### `value`

Returns exactly this value. Mostly useful as a default value for `alts()`.

#### Example

```javascript
go(function*() {
  // Returns '42' as val and port if someChannel cannot provide a value
  // immediately.
  const [val, port] = yield alts(take(someChannel), 42)
})
```


## Mix

### `mix(ch)`
### `admix(mix, ch)`
### `unmix(mix, ch)`
### `unmixAll(mix)`
### `soloMode(mix, mode)`
### `toggle(mix, ch, stateMap)`
### `toggle(mix, changeList)`
### `stopMix(mix)`
### `stop(mix)`


## Mult

### `mult(ch)`
### `tap(mult, ch, close = true)`
### `taps(mult)`
### `untap(mult, ch)`
### `untapAll(mult)`
### `stopMult(mult)`
### `stop(mult)`


## Pub/Sub

### `pub(ch, topicf, bufFnOrBuf = 1)`
### `sub(pub, topic, ch, close = true)`
### `unsub(pub, topic, ch)`
### `unsubAll(pub, topic = null)`
### `stopPub(pub)`
### `stop(pub)`


## Misc

### `tickerChan(ms, burstLimit = 1)`
### `timeoutChan(ms)`
### `promiseChan(promise, transducer = null, exHandler = null)`
### `cpsChan(fn, ...args)`
### `ontoChan(ch, coll, close = true)`
### `toChan(coll)`
### `intoChan(coll, ch)`
### `mapChan(fn, chs, sizeOrBuffer = 1)`
If chs is not specified, ...
### `reduceChan(fn, init, ch)`
If ch is not specified, ...
### `mergeChan(chs, sizeOrBuffer = 1)`
### `split(predf, ch, tsizeOrBuffer = null, fsizeOrBuffer = null)`
### `pipe(from, to, close = true)`
### `pipeline(to, xf, from, close = true, exh = null)`
### `pipelineGo(to, gf, from, close = true)`
### `pipelineAsync(to, af, from, close = true)`

## Extensions

### addEffectHandler
### handleEffect
### Handler
### FnHandler
