import { nextTick } from './nextTick'

// clojurescript-style 'dispatch'
let tasks = []
const TASK_BATCH_SIZE = 1024
let running = false
let queued = false

function processMessages() {
  running = true
  queued = false

  let count = 0

  while (tasks.length > 0 && count < TASK_BATCH_SIZE) {
    const task = tasks.shift()

    task()

    ++count
  }

  running = false

  if (tasks.length > 0) queueDispatcher()
}

function queueDispatcher() {
  if (!(queued && running)) {
    queued = true
    nextTick(processMessages)
  }
}

export function run(fn) {
  tasks.push(fn)
  queueDispatcher()
}
