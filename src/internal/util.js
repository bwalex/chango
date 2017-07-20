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
