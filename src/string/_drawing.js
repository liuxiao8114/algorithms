import React, { } from 'react'
import '../index.css'
import { StringST, TernaryST } from './tries'

const e = React.createElement

let i = 5,
    j = 5

function autoDrawNode(ctx, node, options) {
  if(!node)
    return

  ctx.fillRect(0, 0, 500, 300)
  ctx.font = '14px serif'
  ctx.fillText(node.value || 'emp', i += 20, j += 20)

  if(!node.next)
    return

  for(let nextNode of node.next)
    autoDrawNode(ctx, nextNode, options)
}

function *stepDrawNode(ctx, node, options) {
  if(!node)
    return

  ctx.font = '14px serif'
  ctx.fillText(node.value || 'emp', i += 20, j += 20)

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

  const { mode = AUTO } = options

  if(mode === AUTO)
    return autoDrawNode(ctx, trie.root, options)
  return stepDrawNode(ctx, trie.root, options)
}

const AUTO = 'auto'

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

const TEST = `she sells sea shells by the sea shore`.split(/\s+/)
const smallAlphabetOptions = { R: 26, offset: 97 }

drawTrie(new StringST(TEST, smallAlphabetOptions), testZone.getContext('2d'))
