// Based on, but significantly changed from:
//
// Copyright 2013 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const hasMC = typeof MessageChannel !== 'undefined'
const hasWindow = typeof window !== 'undefined'
const hasGlobal = typeof global !== 'undefined'
const hasWindowProto = typeof Window !== 'undefined' && Window.prototype
const hasImpScripts = typeof importScripts !== 'undefined'
const hasNavigator = typeof navigator !== 'undefined'
const ua = hasNavigator && navigator ? navigator.userAgent : ''
const isEdge = ua.indexOf('Edge') !== -1
const isPresto = ua.indexOf('Presto') !== -1
const isIE = ua.indexOf('MSIE') !== -1 || ua.indexOf('Trident') !== -1

function implSetTimeout() {
  return function(fn) {
    setTimeout(fn, 0)
  }
}

function implPostMessage() {
  let messagePrefix = 'setImmediate$' + Math.random() + '$'

  let head = { next: null }
  let tail = head

  addEventListener(
    'message',
    function(event) {
      if (typeof event.data === 'string' && event.data === messagePrefix) {
        if (head.next) {
          head = head.next
          head.fn()
        }
      }
    },
    false,
  )

  return function(fn) {
    tail.next = { fn, next: null }
    tail = tail.next
    postMessage(messagePrefix, '*')
  }
}

function implMessageChannel() {
  let channel = new MessageChannel()

  let head = { next: null }
  let tail = head

  channel.port1.onmessage = function() {
    if (head.next) {
      head = head.next
      head.fn()
    }
  }

  return function(fn) {
    tail.next = { fn, next: null }
    tail = tail.next
    channel.port2.postMessage(0)
  }
}

function getNextTickImpl() {
  if (isEdge && typeof window.setImmediate !== 'undefined') {
    return window.setImmediate
  }
  if (
    !hasWindowProto &&
    hasGlobal &&
    typeof global.setImmediate !== 'undefined'
  ) {
    return global.setImmediate
  }

  if (
    !hasMC &&
    hasWindow &&
    window.postMessage &&
    window.addEventListener &&
    !hasImpScripts &&
    !isPresto
  ) {
    return implPostMessage()
  }

  if (hasMC && !isIE) {
    return implMessageChannel()
  }

  return implSetTimeout()
}

export const nextTick = getNextTickImpl()
