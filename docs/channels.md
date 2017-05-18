# Channels

## Constants

### `CLOSED`

Returned to channel take-type (`take_`, `take`, `poll`) operations if the channel is closed.

### `NO_VAL`

Returned to `poll` when no value is available immediately - see the documentation of `poll()` for more details.


## API

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

[transducers-url]: https://github.com/cognitect-labs/transducers-js#transformer-protocol
