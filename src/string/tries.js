/*
TODO:
 1. Why d === key.length used in StringST rather than  d === length - 1 used in TernaryST.

    A. In Tries, the root is always with non-value.
        Inserting and Seaching always start at root.next but the loop starts at the root node while d is setting with 0.
        So when reach the root.next in loop, it has setted the d with 1 already.
*/

import { Queue, charCodeAtWithOffset, fromCharCode } from './utils'

function Node(value = null, R = 256) {
  this.value = value
  this.next = new Array(R).fill(null)
}

Node.prototype.toString = function() {
  return this.value
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

    if(!matchNode)
      return null

    const stack = [ { node: matchNode, s: pre } ]

    while(stack.length > 0) {
      const { node, s } = stack.pop()

      if(node.value != null)
        q.enqueue(s)

      for(let i = 0; i < this.R; i++)
        node.next[i]
          && stack.push({ node: node.next[i], s: s + fromCharCode(i, this.offset) })
    }

    return q
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
  longestPrefixOfNoRecursive(s) {
    let node = this.root,
        d = 0,
        len = 0

    while(node && d <= s.length) {
      if(node.value != null)
        len = d

      node = node.next[charCodeAtWithOffset(s, d, this.offset)]
      d += 1
    }

    return len
  },
  delete(key) {
    return this.deleteNode(this.root, key, 0)
  },
  /*
    recursive delete when:
      1. no value && 2. no sub from current
  */
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
  this.root = new TernaryNode(Number.MIN_VALUE)
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
  getNonRecursive(key) {
    let node = this.root,
        d = 0

    while(d < key.length - 1) {
      const c = charCodeAtWithOffset(key, d, this.offset)
      // console.log(`getNonRecursive in TernaryST -- node: ${node && node.toString()}, c: ${c}, d: ${d}`)
      if(!node)
        return null

      if(c < node.c)
        node = node.left
      else if(c > node.c)
        node = node.right
      else {
        node = node.mid
        d += 1
      }
    }
    // console.log(`getNonRecursive in TernaryST -- node: ${node && node.toString()}, c: ${charCodeAtWithOffset(key, d, this.offset)}, d: ${d}`)

    return node && node.value
  },
  putNonRecursive(key, value) {
    let node = this.root,
        d = 0

    while(d < key.length - 1) {
      const c = charCodeAtWithOffset(key, d, this.offset)

      if(!node)
        node = new TernaryNode(c)

      if(c < node.c) {
        if(!node.left)
          node.left = new TernaryNode(c)
        node = node.left
      } else if(c > node.c) {
        if(!node.right)
          node.right = new TernaryNode(c)
        node = node.right
      } else {
        d += 1
        if(!node.mid)
          node.mid = new TernaryNode(charCodeAtWithOffset(key, d, this.offset))
        node = node.mid
      }
    }

    if(node.value == null)
      this.size += 1
    node.value = value

    return node
  },
  delete(key) {
    return this.deleteNode(this.root, key, 0)
  },
  deleteNode(node, key, d) {
    if(!node)
      return null

    if(d < key.length - 1) {
      const c = charCodeAtWithOffset(key, d, this.offset)
      // console.log(`deleteNode in TernaryST -- node: ${node && node.toString()}, c: ${c}, d: ${d}`)

      if(c < node.c)
        node.left = this.deleteNode(node.left, key, d)
      else if(c > node.c)
        node.right = this.deleteNode(node.right, key, d)
      else
        node.mid = this.deleteNode(node.mid, key, d + 1)
    } else {
      if(node.value != null)
        this.size -= 1

      node.value = null
    }

    if(node.value == null &&
      !node.left &&
      !node.right &&
      !node.mid
    ) return null

    return node
  },
  deleteNonRecursive(key) {
    let node = this.root,
        d = 0,
        stack = []

    while(d < key.length - 1) {
      if(!node)
        return null

      const c = charCodeAtWithOffset(key, d, this.offset)
      if(c < node.c) {
        stack.push({ node, direction: 'left' })
        node = node.left
      } else if(c > node.c) {
        stack.push({ node, direction: 'right' })
        node = node.right
      } else {
        stack.push({ node, direction: 'mid' })
        node = node.mid
        d += 1
      }
    }

    if(!node)
      return null
    if(node.value != null)
      this.size -= 1

    node.value = null

    while(node.value == null &&
      !node.left &&
      !node.right &&
      !node.mid &&
      stack.length > 0
    ) {
      const { node: parentNode, direction } = stack.pop()
      parentNode[direction] = null

      node = parentNode
    }
  },
  keysWithPrefix(pre) {
    const preNode = this.getNode(this.root, pre, 0)

    if(!preNode)
      return null

    const q = new Queue()
    q.enqueue(pre)

    return this.collect(preNode.mid, pre, q)
  },
  collect(node, key, q) {
    if(!node)
      return q

    const c = fromCharCode(node.c, this.offset)
    if(node.value != null)
      q.enqueue(key + c)

    this.collect(node.left, key, q)
    this.collect(node.mid, key + c, q)
    this.collect(node.right, key, q)

    return q
  }
}
