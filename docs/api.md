## Constants

### `PROCESS_KILLED`

Returned on the result channel of a coroutine/process if it is killed before it returns a result.

### `CLOSED`

Returned to channel take-type (`take_`, `take`, `poll`) operations if the channel is closed.

### `NO_VAL`

Returned to `poll` when no value is available immediately - see the documentation of `poll()` for more details.


## Errors

Coroutines started using `go()` have built-in handling for errors. If an effect yields an error type, it causes the value of the error-type to be thrown into the coroutine.

Coroutines should, however, generally not see wrapped errors, as the built-in coroutine scheduler unwraps error-types and throws their value. Hence, functions in this section are mostly of use when building additional effects, or other helpers/channel abstractions.

### `error(e)`

Create a new error-type with its value set to `e`.

### `isError(val)`

Checks whether a given value is an error-type.


## Channels

### `chan(sizeOrBuffer = null, transducer = null, exHandler = null)`

Create a new channel with the specified buffering. If `sizeOrBuffer` is null or not specified, an unbuffered channel is created. Puts into unbuffered channels block until there is a matching take.
If `sizeOrBuffer` is a number, a fixed buffer of the specified size is used.
If `sizeOrBuffer` is a buffer, the given buffer is used.

A channel can also be created with an optional `transducer` (conforming to the [JS transducers spec][transducers-url]) to transform the values being placed into the channel. If a transducer returns the special reduced value, the channel is closed after the value is placed onto it.

Additionally, an optional exception handler function taking a single argument (the exception) `exHandler` can be passed in that will be called if an exception gets thrown within the transducers. If the exception handler returns the constant `CLOSED`, no value is pushed onto the channel. The default exception handler prevents the error from being added to the channel and logs it to the console using `console.log`.

### `close(ch)`

Close a channel `ch`. Any put after this will fail and return false. Any take, similarly, will fail returning the constant `CLOSED`.

Any values still pending within the channel or channel buffer can still be retrieved via corresponding takes.

### `offer(ch, value)`

Try to place a value onto the channel. If the channel cannot accept the value immediately, `offer` returns false. Otherwise, it returns true.

#### Example

```javascript
const ch = chan(1)

let ok = offer(ch, "hi")
if (ok) console.log("all good, value placed")
else console.log("failed to place value")

ok = offer(ch, "hi again")
if (ok) console.log("all good, second value placed")
else console.log("failed to place second value")
```

### `poll(ch)`

Try to take a value from the channel. If the channel cannot provide a value immediately, `poll` returns the constant `NO_VAL`. If the channel is already closed and no value is available, the `CLOSED` constant is returned instead. Otherwise, a value from the channel is returned.

#### Example

```javascript
const ch = chan(1)

let value = poll(ch)
if (value === NO_VAL) console.log("got no value :(")
else console.log("Got value:", value)

put_(ch, "Hi there!")

value = poll(ch)
if (value === NO_VAL) console.log("got no value again :(")
else console.log("Got value this time:", value)
```

### `put_(ch, value, callbackFn = null)`

Place `value` onto the channel. The `callbackFn` callback will be called with true as the first (and only) argument as soon as the value is accepted. If the channel is closed before the value is put, the callback will be called with false as the first argument.

#### Example

```javascript
const ch = chan()

put_(ch, 42, (ok) => {
  if (ok) console.log("All good, value accepted")
  else console.log("Oh no, channel was already closed")
})
take_(ch, (value) => console.log("Value is:", value))
```

### `take_(ch, callbackFn = null)`

Take a value from the channel. As soon as a value can be retrieved from the channel, `callbackFn` will be called with the value, or with the `CLOSED` constant if the channel is closed before a value can be taken.

#### Example

```javascript
const ch = chan()

put_(ch, 42)
take_(ch, (value) => {
  if (value === CLOSED) console.log("Closed!")
  else console.log("Received value:", value)
})
```

### Buffer types

#### `fixedBuffer(size = 1)`

Creates a fixed buffer for use with `chan` that can accept `size` values. Any further put will block until there is space in the buffer. Every take removes exactly one value from the buffer.

#### `droppingBuffer(size = 1)`

Creates a dropping buffer for use with `chan` that can accept `size` values. Any further put will be dropped (and complete immediately). Every take removes exactly one value from the buffer.

#### `slidingBuffer(size = 1)`

Creates a sliding buffer for use with `chan` that can accept `size` values. Any further put will overwrite the oldest value, resulting in a ring buffer behaviour. Every take removes exactly one value from the buffer.

#### `promiseBuffer()`

Creates a promise buffer for use with `chan`. A promise buffer starts in an undelivered state. In this state, the promise buffer can accept exactly one put, at which point it leaves the undelivered state. In the delivered state, all further puts are dropped (ignored) and complete immediately. Every take reads the same delivered value, over and over again, until the channel is closed.

## Coroutines

### `go(fn, ...args)`

Kick off the generator function `fn` as a coroutine, passing in the specified `args` as arguments to the initial function call. Returns a `Process` object that can be passed to `kill` and several effects such as `join`. A `Process` instance also has a property `ch` that represents the result channel.

The generator function can use effects listed in the "Coroutine Effects" section.

If the result of an effect is an error-type value, the value of the error gets thrown into the generator function, and so can be caught via a try...catch block.

Similarly, if a coroutine/process is terminated (e.g. because it was killed, or its parent was killed), the generator function is forced to return, but this can be caught via a try...finally block.

#### Example

```javascript
go(function*(a, b) {
  try {
    const stats = yield cps(fs.stat, "some_file")
  } catch (e) {
    console.log("An error occured:", e)
  } finally {
    if (yield killed()) console.log("I was killed :(")
    else console.log("I died due to an exception")
  }
}, 1, 1)
```

### `kill(...procs)`

Kills the specified `procs`. If the processes have children, the kill propagates down the tree.


## Coroutine Effects

Generator functions started with `go()` can use a number of effects by `yield`ing the effect. The coroutine logic will take care of executing the effect and providing a value synchronously as the return value of the yield.

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

Runs the specified function wrapped as a coroutine, but waits for the result channel, resulting in effectively synchronous execution.

```javascript
go(function*() {
  const result = yield call(function*(a, b) {
    yield sleep(500)
    return a+b
  }, 1, 2)

  // result will now be 3.
})
```


### `cps(fn, ...args)`

Similar to `call`, but `fn` is expected to be a function taking a node-type continuation-passing-style (CPS) callback function as last argument (i.e. a function taking an error first, and a value second - `function(err, result) { ... }`). If the callback gets called with `err` not null, then the result of the `cps` effect will be an error-type containing `err`.

#### Example

```javascript
go(function*() {
  try {
    const stats = yield cps(fs.stat, "some.path")
    console.log("stats for some.path are:", stats)
  } catch (e) {
    console.log("Oh no, error during fs.stat:", e)
  }
})

```

### `fork(procOrFn, ...args)`

Starts `procOrFn` in a new coroutine as a child process of the current one. Returns a `Process` object. If `procOrFn` is a `Process`, then no new process is started, and, instead, `procOrFn` is just marked as a child of the current process.

#### Example

```javascript
go(function*() {
  const child = yield fork(function*(a) {
    try {
      console.log("Hi there!")
      yield sleep(100)
      return a
    } finally {
      if (yield killed()) console.log("Oh no, I was killed!")
    }
  }, 42)
})
```

### `spawn(fn, ...args)`

Same as `fork`, but doesn't mark the process as a child process, so that termination of the current process will not affect the new process.

### `alts(...effects)`

Waits until exactly one of the listed `effects` completes. As soon as one completes, returns an array of `[value, effect]`, where `value` is the result of the effect that completes, and `effect` is the passed in effect that completed.

If a plain value is passed in as the last effect to `alts`, then `alts` will complete immediately - either with one of the normal effects (if any of them is ready immediately) or with the plain value.

Effects get evaluated strictly in order, so if two effects are ready immediately, only the earlier effect completes.

#### Example

```javascript
go(function*() {
  const takeChan = take(someChannel)
  const takeChan2 = take(someOtherChannel)
  const [val, port] = yield alts(takeChan, takeChan2, 19)
  // Returns immediately, with `val` being either:
  //  - a value from `someChannel` (if it is ready immediately)
  //  - a value from `someOtherChannel` (if it is ready immediately)
  //  - the value 19, if neither of the two chanels can provide a
  //    value immediately.
  // `port` will be one of `takeChan`, `takeChan2`, or 19 (depending on
  // which effect completed).
})
```

### `alt([effect, valueOrFn], ...)`

Similar to `alts`, but each argument must be an array of an effect and either a value or a transformation function. Instead of returning an array of `[value, effect]` like alts, `alt` returns the value in the second position of an array, or, if it is a function, the result of applying the function to the completion value of the effect.

#### Example

```javascript
go(function*() {
  const value = yield alt(
    [take(someChannel), val => val+1],
    [sleep(100), "timed-out"]
  )
  // `value` will either be a value taken from someChannel incremented
  // by 1, or the string "timed-out" (if the `take` effect doesn't
  // complete in less than 100ms).
})
```

### `all(...effects)`

Waits for all of the specified `effects` to complete, and returns an array with the results. If any of the effects return an error, `all` completes immediately with the error value, without waiting for any of the remaining effects.

#### Example

```javascript
go(function*() {
  try {
    const [a, b] = yield all(someChannel1, someChannel2)
    // if we get here, a and b will contain a single value from each
    // of the channels.
  } catch (e) {
    // one of the channels provided an error value
  }
})
```

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

Underneath, this effect just passes all of the process return value channels to an `all()` effect, so `join` has the same fail-fast semantics as `all`.

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

Returns a channel that provides a value every `ms` milliseconds. At most `burstLimit` values will be placed on the channel. Any further generated value gets dropped.

`tickerChan` can be used to build rate limiting, with an optional burst acceptance.

#### Example

```javascript
go(function*() {
  const tc = tickerChan(100, 2)

  while (true) {
    // Accept a message from `someOtherChannel` and process it with a call
    // to `doSomething`, but do so at most twice every 100 ms.
    const someValue = yield someOtherChannel
    doSomething(someValue)
    yield tc
  }
})
```

### `timeoutChan(ms)`

Returns a channel that will close after `ms` milliseconds.


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

[transducers-url]: https://github.com/cognitect-labs/transducers-js#transformer-protocol
