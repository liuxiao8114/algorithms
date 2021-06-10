import assert from 'assert'
import BinarySearchTree from './BinarySearchTree'

export function Node(key, value, isRed = true) {
  this.key = key
  this.value = value
  this.left = null
  this.right = null
  this.N = 1
  this.red = isRed
}

Node.prototype = {
  constructor: Node,
  compareTo(x) {
    if(x == null) x = 0

    if(typeof x === 'number' || typeof x === 'string') {
      if(this.key > x) return 1
      if(this.key === x) return 0
      if(this.key < x) return -1
    }

    if(x instanceof Node) {
      if(this.key > x.key) return 1
      if(this.key === x.key) return 0
      if(this.key < x.key) return -1
    }
  },
  toString() {
    return `{ ${this.key}(${this.N}): ${this.value} }`
  }
}

export default function RedBlackBinarySearchTree() {
  this.root = null
}

RedBlackBinarySearchTree.prototype = {
  ...BinarySearchTree.prototype,
  constructor: RedBlackBinarySearchTree,
  isRed(h) {
    if(!h || !(h instanceof Node)) return false
    return h.red
  },
  rotationLeft(h) {
    assert(h instanceof Node, 'Calling rotationLeft(h) with a Node parm.')

    const x = h.right

    // location
    h.right = x.left
    x.left = h
    // color
    x.red = h.red
    h.red = true
    // size
    x.N = h.N
    h.N = 1 + this.size(h.left) + this.size(h.right)

    return x
  },
  rotationRight(h) {
    assert(h instanceof Node, 'Calling rotationRight(h) with a Node parm.')
    const x = h.left

    // location
    h.left = x.right
    x.right = h
    // color
    x.red = h.red
    h.red = true
    // size
    x.N = h.N
    h.N = 1 + this.size(h.left) + this.size(h.right)

    return x
  },
  flipColor(h) {
    assert(h instanceof Node, 'Calling flipColor(h) with a Node parm.')
    assert(h.left && h.right, `Node need to have both branches. left: ${h.left}, right: ${h.right}`)
    assert(h.left.red === true && h.right.red === true, `both branches need to be red when calling flip, left: ${h.left.red}, right: ${h.right.red}`)

    h.left.red = false
    h.right.red = false
    h.red = true

    return h
  },
  size(h) {
    if(!h || !(h instanceof Node)) return 0
    return h.N
  },
  put(key, value, fromNode = this.root) {
    if(!this.root)
      this.root = new Node(key, value, false)

    const iter = (node, key, value) => {
      if(!node) return new Node(key, value)

      assert(node instanceof Node, `Put {${key}: ${value}} in a node.`)
      const compared = node.compareTo(key)

      if(compared < 0) node.right = iter(node.right, key, value)
      else if(compared > 0) node.left = iter(node.left, key, value)
      else {
        node.value = value
        return node
      }

      // updateSize
      node.N = 1 + this.size(node.left) + this.size(node.right)

      // redBlack
      if(this.isRed(node.right) && !this.isRed(node.left)) node = this.rotationLeft(node)
      if(this.isRed(node.left) && this.isRed(node.left.left)) node = this.rotationRight(node)
      if(this.isRed(node.left) && this.isRed(node.right)) this.flipColor(node)

      return node
    }

    return iter(fromNode, key, value)
  },
}
