export class Error {
  constructor(val) {
    this._value = val
  }

  value = () => this._value
}

export function error(e) {
  return new Error(e)
}

export function isError(e) {
  return e instanceof Error
}
