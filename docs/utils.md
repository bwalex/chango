# Higher-level utility/helper functions

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

Puts the contents of `coll` into the supplied channel `ch`. By default, the channel will be closed after all items have been placed onto the channel, but the behaviour can be disabled by setting `close` to `false`.

`coll` can be any JavaScript collection that adheres to the [iterable protocol][iterable-mdn-url], e.g. Array.

Returns the channel `ch` itself.

### `toChan(coll)`

Creates and returns a channel, and places the contents of `coll` onto this channel. The channel will close after all items ahve been placed onto it.

`coll` can be any JavaScript collection that adheres to the [iterable protocol][iterable-mdn-url], e.g. Array.

### `intoChan(coll, ch)`

Returns a channel containing the single result (as an Array) of the items taken from the channel `ch` prepended with the supplied collection `coll`. `ch` must close before a result is produced on the returned channel.

`coll` can be any JavaScript collection that adheres to the [iterable protocol][iterable-mdn-url], e.g. Array.

### `mapChan(fn, chs, sizeOrBuffer = 1)`

If chs is not specified, ...


### `reduceChan(fn, init, ch)`

If ch is not specified, ...

### `mergeChan(chs, sizeOrBuffer = 1)`

Takes an array of channels `chs` and returns a channel which contains all the values from these channels. The buffering on the returned channel can be adjusted with `sizeOrBuffer` - see the documentation of `chan()` for more details on the buffering settings.

The returned channel will close whenever all source channels `chs` have closed.


### `split(predf, ch, tsizeOrBuffer = null, fsizeOrBuffer = null)`

Takes a predicate function `predf` and a source channel `ch`. Returns an array of two channels, the first of which will contain the values from `ch` for which the predicate function `predf` returned true, and the second of which will contain the values from `ch` for which the predicate function `predf` returned false.

The buffering on the channels can be adjusted with `tsizeOrBuffer` for the first channel, and `fsizeOrBuffer` for the second channel. See the documentation of `chan()` for more details on the buffering settings.

### `pipe(from, to, close = true)`
### `pipeline(to, xf, from, close = true, exh = null)`
### `pipelineGo(to, gf, from, close = true)`
### `pipelineAsync(to, af, from, close = true)`

[transducers-url]: https://github.com/cognitect-labs/transducers-js#transformer-protocol
[iterable-mdn-url]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols
