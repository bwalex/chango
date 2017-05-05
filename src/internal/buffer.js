import { NO_VAL } from './constants'

export interface Buffer<T> {
  full(): boolean,
  add(val: ?T): Buffer,
  remove(): ?T,
  close(): void,
  count(): number,
  blocking(): boolean,
}

class FixedBuffer<T> {
  constructor(size: number = 1) {
    this.size = size
    this.entries = []
  }

  full() {
    return this.entries.length >= this.size
  }

  add(val: ?T): Buffer {
    this.entries.push(val)
    return this
  }

  remove(): ?T {
    return this.entries.shift()
  }

  count(): number {
    return this.entries.length
  }

  close() {}

  blocking(): boolean {
    return true
  }
}

class DroppingBuffer<T> {
  constructor(size: number = 1) {
    this.size = size
    this.entries = []
  }

  full() {
    return false
  }

  add(val: ?T): Buffer {
    if (this.entries.length < this.size) this.entries.push(val)
    return this
  }

  remove(): ?T {
    return this.entries.shift()
  }

  count(): number {
    return this.entries.length
  }

  close() {}

  blocking(): boolean {
    return false
  }
}

class SlidingBuffer<T> {
  constructor(size: number = 1) {
    this.size = size
    this.entries = []
  }

  full() {
    return false
  }

  add(val: ?T): Buffer {
    if (this.entries.push(val) > this.size) this.entries.shift()
    return this
  }

  remove(): ?T {
    return this.entries.shift()
  }

  count(): number {
    return this.entries.length
  }

  close() {}

  blocking(): boolean {
    return false
  }
}

class PromiseBuffer<T> {
  constructor() {
    this.value = NO_VAL
  }

  full() {
    return false
  }

  add(val: ?T): Buffer {
    if (this.undelivered()) this.value = val
    return this
  }

  remove(): ?T {
    return this.undelivered() ? undefined : this.value
  }

  count(): number {
    return this.undelivered() ? 0 : 1
  }

  close() {
    if (this.undelivered()) this.value = null
  }

  undelivered() {
    return this.value === NO_VAL
  }

  blocking(): boolean {
    return false
  }
}

export function fixedBuffer(size: number = 1) {
  return new FixedBuffer(size)
}

export function droppingBuffer(size: number = 1) {
  return new DroppingBuffer(size)
}

export function slidingBuffer(size: number = 1) {
  return new SlidingBuffer(size)
}

export function promiseBuffer() {
  return new PromiseBuffer()
}
