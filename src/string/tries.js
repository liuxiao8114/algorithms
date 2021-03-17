/*
TODO:
 1. Why d === key.length used in StringST rather than  d === length - 1 used in TernaryST.

*/

import { Queue } from './utils'

function Node(value = null, R = 256) {
  this.value = value
  this.next = new Array(R).fill(null)
}

Node.prototype.toString = function() {
  return this.value
}

function charCodeAtWithOffset(s, c, offset = 0) {
  return s.charCodeAt(c) - offset
}

function fromCharCode(i, offset = 0) {
  return String.fromCharCode(i + offset)
}

export function StringST(a, options = {}) {
  this.size = 0
  this.R = options.R || 256
  this.offset = options.offset || 0
  this.root = new Node(null, this.R)

  if(typeof a === 'string')
    this.put(a, this.size)
  else if(Array.isArray(a))
    a.forEach((one, i) => {
      if(typeof one === 'string')
        this.put(one, i)
      else if(typeof one === 'object') {
        const { key, value } = one
        this.put(key, value)
      } else
        throw new Error(`cannot parse ${a} with item: ${one}`)
    })
  else if(a && a.key && a.value)
    this.put(a.key, a.value)
}

StringST.prototype = {
  constructor: StringST,
  get(key) {
    const node = this.getNode(this.root, key, 0)
    return node && node.value
  },
  getNode(node, key, d) {
    // console.log(`getNode -- node: ${node && node.toString()}, key: ${key}, d: ${d}`)
    if(!node)
      return null
    if(d === key.length)
      return node
    return this.getNode(node.next[charCodeAtWithOffset(key, d, this.offset)], key, d + 1)
  },
  put(key, value) {
    return this.putNode(this.root, key, value, 0)
  },
  putNode(node, key, value, d) {
    // console.log(`putNode -- node: ${node && node.toString()}, key: ${key}, d: ${d}`)
    if(!node)
      node = new Node(null, this.R)
    if(d === key.length) {
      if(node.value === null)
        this.size += 1
      node.value = value
      return node
    }

    const c = charCodeAtWithOffset(key, d, this.offset)
    node.next[c] = this.putNode(node.next[c], key, value, d + 1)

    return node
  },

  // 5.2.5
  putNonRecursive(key, value) {
    let node = this.root,
        d = 0

    while(d < key.length) {
      // console.log(`putNonRecursive -- node: ${node && node.toString()}, key: ${key}, d: ${d}`)
      const c = charCodeAtWithOffset(key, d, this.offset)
      if(!node.next[c])
        node.next[c] = new Node(null, this.R)
      node = node.next[c]
      d += 1
    }

    if(node.value == null)
      this.size += 1

    node.value = value
    return node
  },
  getNonRecursive(key) {
    let node = this.root
    let d = 0

    while(d < key.length) {
      // console.log(`getNonRecursive -- node: ${node && node.toString()}, key: ${key}, d: ${d}`)
      if(!node)
        return null

      node = node.next[charCodeAtWithOffset(key, d, this.offset)]
      d += 1
    }

    return node && node.value
  },
  getSize() {
    return this.size
  },
  keys() {
    return this.keysWithPrefix("")
  },
  keysWithPrefix(pre) {
    const q = new Queue()
    this.collect(this.getNode(this.root, pre, 0), pre, q)

    return q
  },
  keysWithPrefixNonRecursive(pre) {
    const q = new Queue()
    const matchNode = this.getNode(this.root, pre, 0)

    let node = matchNode
    while(node) {
      if(node.value != null)
        q.enqueue(node)

      for(let i = 0; i < this.R; i++) {
        let nextNode = node.next[i]
      }
    }
  },
  collect(node, s, q) {
    // console.log(`collect -- node: ${node && node.toString()}, key: ${s}, q: ${q.toString()}`)
    if(!node)
      return

    if(node.value != null)
      q.enqueue(s)

    for(let i = 0; i < this.R; i++)
      this.collect(node.next[i], s + fromCharCode(i, this.offset), q)
  },
  longestPrefixOf(s) {
    return this.search(this.root, s, 0, 0)
  },
  search(node, s, d, len) {
    if(node == null || d > s.length)
      return len

    const c = charCodeAtWithOffset(s, d, this.offset)

    if(node.value != null)
      return this.search(node.next[c], s, d + 1, d)
    return this.search(node.next[c], s, d + 1, len)
  },
  delete(key) {
    return this.deleteNode(this.root, key, 0)
  },
  deleteNode(node, key, d) {
    // console.log(`deleteNode -- node: ${node && node.toString()}, key: ${key}, d: ${d}`)
    if(node == null)
      return null

    if(d === key.length) {
      node.value = null
      this.size -= 1
    } else {
      const c = charCodeAtWithOffset(key, d, this.offset)
      node.next[c] = this.deleteNode(node.next[c], key, d + 1)
    }

    if(node.value != null)
      return node

    for(let i = 0; i < this.R; i++)
      if(node.next[i] != null) return node

    return null
  },
  deleteNonRecursive(key) {
    let node = this.root
    let d = 0
    const stack = []

    while(d < key.length) {
      if(!node)
        return

      const c = charCodeAtWithOffset(key, d, this.offset)
      stack.push({ node, c })
      node = node.next[c]
      d += 1
    }

    if(node.value != null) {
      this.size -= 1
      node.value = null
    }

    while(stack.length > 0) {
      // console.log(`deleteNonRecursive -- node: ${node && node.toString()}, key: ${key}`)
      if(node.value != null)
        return

      for(let i = 0; i < this.R; i++)
        if(node.next[i])
          return

      const { node: parentNode, c } = stack.pop()
      // console.log(`deleteNonRecursive -- check parrentNode: ${parentNode && parentNode.toString()}, c: ${c}`)
      parentNode.next[c] = null
      node = parentNode
    }
  }
}

function TernaryNode(c) {
  this.c = c
  this.left = null
  this.mid = null
  this.right = null
  this.value = null
}

TernaryNode.prototype.toString = function() {
  return `Node ${this.c}, Value ${this.value}`
}

export function TernaryST(a, options = {}) {
  this.root = new TernaryNode(-1)
  this.size = 0
  this.R = options.R || 256
  this.offset = options.offset || 0

  if(typeof a === 'string')
    this.put(a, this.size)
  else if(Array.isArray(a))
    a.forEach((one, i) => {
      if(typeof one === 'string')
        this.put(one, i)
      else if(typeof one === 'object') {
        const { key, value } = one
        this.put(key, value)
      } else
        throw new Error(`cannot parse ${a} with item: ${one}`)
    })
  else if(a && a.key && a.value)
    this.put(a.key, a.value)
}

TernaryST.prototype = {
  constructor: TernaryST,
  getSize() {
    return this.size
  },
  get(key) {
    const node = this.getNode(this.root, key, 0)
    return node && node.value
  },
  getNode(node, key, d) {
    // console.log(`getNode -- node: ${node && node.toString()}, key: ${key}, d: ${d}`)
    if(node == null)
      return null

    const c = charCodeAtWithOffset(key, d, this.offset)

    if(c < node.c)
      return this.getNode(node.left, key, d)
    if(c > node.c)
      return this.getNode(node.right, key, d)
    if(d < key.length - 1)
      return this.getNode(node.mid, key, d + 1)

    return node
  },
  put(key, value) {
    return this.putNode(this.root, key, value, 0)
  },
  putNode(node, key, value, d) {
    // console.log(`putNode -- node: ${node && node.toString()}, key: ${key}, d: ${d}`)
    const c = charCodeAtWithOffset(key, d, this.offset)

    if(node == null)
      node = new TernaryNode(c)

    if(c < node.c)
      node.left = this.putNode(node.left, key, value, d)
    else if(c > node.c)
      node.right = this.putNode(node.right, key, value, d)
    else if(d < key.length - 1)
      node.mid = this.putNode(node.mid, key, value, d + 1)
    else {
      if(node.value == null)
        this.size += 1
      node.value = value
    }

    return node
  },
}
