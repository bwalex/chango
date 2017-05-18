# Coroutine Effects

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

