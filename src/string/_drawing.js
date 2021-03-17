import React, { } from 'react'
import '../index.css'
import { StringST, TernaryST } from './tries'

const e = React.createElement

const STEP = 20
const RECT_SIZE = 20
const AUTO_MODE = 'autoMode'

/*
            key | value
                |
  key1 | value1   key2 | value2

(A, null)...(D, null)...(S, 0)...(Z, null)
                           |
            (A, null)...(H, null)...(Z, null)

*/
function autoDrawNode(ctx, node, position, options = {}) {
  if(!node)
    return

  let { x = STEP, y = STEP } = position
  ctx.font = '14px serif'
  // ctx.strokeRect(x / 2, y / 2, RECT_SIZE, RECT_SIZE)
  // ctx.stroke()
  ctx.fillText(options.key || 'no key', x, y)
  x += STEP * 4
  ctx.fillText(node.value || 'no value', x, y)

  if(!node.next)
    return

  const len = node.next.length
  for(let i = 0; i < len; i++) {
    autoDrawNode(
      ctx,
      node.next[i],
      { x: x + STEP * 2, y: y + STEP * 2 },
      Object.assign({}, options, { key: String.fromCharCode(i + (options.offset || 0)) })
    )
  }
}

function *stepDrawNode(ctx, node, options) {
  if(!node)
    return

  ctx.font = '14px serif'
  // ctx.fillText(node.value || 'emp', i += 20, j += 20)

  if(!node.next)
    return

  for(let nextNode of node.next)
    yield *autoDrawNode(ctx, nextNode, options)
}

function drawTrie(trie, ctx, options = {}) {
  if(!(trie instanceof StringST))
    throw new Error(`drawTrie failed.`)

  if(!ctx)
    throw new Error(`no ctx passed.`)

  const { mode = AUTO_MODE } = options

  if(mode === AUTO_MODE)
    return autoDrawNode(ctx, trie.root, {}, options)
  return stepDrawNode(ctx, trie.root, {}, options)
}

function range(from, to) {
  return Math.floor(Math.random() * (to - from) + from)
}

function CanvasCtrl(element) {
  this.zones = new Map()
  this.element = element
}

CanvasCtrl.prototype = {
  createCanvas(name, options) {
    if(!this.element)
      throw new Error('no parent element')

    const canvas = document.createElement('canvas')
    canvas.id = name

    this.zones.set(name, canvas)
    this.element.appendChild(canvas)

    return canvas
  },
  delete(name) {
    let target
    if(name == null)
       target = this.zones.get([ ...this.zones.keys ][ this.zones.size ])
    this.element.removeChild(target)

    return target
  },
  clear() {
    this.zones.clear()
  },
  getCanvas(name) {
    if(name == null)
      return this.zones.get([ ...this.zones.keys ][ this.zones.size ])
    return this.zones.get(name)
  },
}

/* A Test Case */
const canvas = new CanvasCtrl(document.getElementById('string'))

const testZone = canvas.createCanvas('test')
const testZoneRect = testZone.getBoundingClientRect()
testZone.width = testZoneRect.width
testZone.height = testZoneRect.height

const TEST = `she sells sea shells by the sea shore`.split(/\s+/)
const smallAlphabetOptions = { R: 26, offset: 97 }

drawTrie(new StringST(TEST, smallAlphabetOptions), testZone.getContext('2d'))
