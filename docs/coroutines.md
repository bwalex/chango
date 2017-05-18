# Coroutines

## Constants

### `PROCESS_KILLED`

Returned on the result channel of a coroutine/process if it is killed before it returns a result.

## Errors

Coroutines started using `go()` have built-in handling for errors. If an effect yields an error type, it causes the value of the error-type to be thrown into the coroutine.

Coroutines should, however, generally not see wrapped errors, as the built-in coroutine scheduler unwraps error-types and throws their value. Hence, functions in this section are mostly of use when building additional effects, or other helpers/channel abstractions.

### `error(e)`

Create a new error-type with its value set to `e`.

### `isError(val)`

Checks whether a given value is an error-type.


## API

### `go(fn, ...args)`

Kick off the generator function `fn` as a coroutine, passing in the specified `args` as arguments to the initial function call. Returns a `Process` object that can be passed to `kill` and several effects such as `join`. A `Process` instance also has a property `ch` that represents the result channel.

The generator function can use effects listed in [effects.md](/docs/effects.md)

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
