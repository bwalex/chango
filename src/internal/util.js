export function warning(condition, message: string, ...other) {
  if (!condition && typeof console !== undefined) {
    console.error('Warning: ' + message, ...other)
    try {
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message)
    } catch (e) {}
  }
}

export const isPromise = obj =>
  obj &&
  (typeof obj === 'object' || typeof obj === 'function') &&
  typeof obj.then === 'function'

export function shuffle(arr) {
  let a = arr.slice()

  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i)
    ;[a[i - 1], a[j]] = [a[j], a[i - 1]]
  }

  return a
}
