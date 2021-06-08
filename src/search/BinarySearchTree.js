export function Node(key, value) {
  this.key = key
  this.value = value
  this.left = null
  this.right = null
  this.N = 1
}

Node.prototype.toString = function() {
  return `{ ${this.key}(${this.N}): ${this.value} }`
}

Node.prototype.compareTo = function(x) {
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
}

export default function BinarySearchTree() {
  this.root = null
}

BinarySearchTree.prototype = {
  constructor: BinarySearchTree,
  put(key, value) {
    if(!this.root)
      return this.root = new Node(key, value)

    const iter = (node, key, value) => {
      if(!node)
        return new Node(key, value)

      const compared = node.compareTo(key)

      if(compared > 0)
        node.left = iter(node.left, key, value)
      else if(compared < 0)
        node.right = iter(node.right, key, value)
      else {
        node.value = value
        return node
      }

      node.N = this.size(node.left) + this.size(node.right) + 1
      return node
    }

    return iter(this.root, key, value)
  },
  getNode(key, node = this.root) {
    if(!node) return null
    const compared = node.compareTo(key)
    if(compared > 0) return this.getNode(key, node.left)
    if(compared < 0) return this.getNode(key, node.right)

    return node
  },
  get(key) {
    function iter(key, node) {
      if(!node) return null
      const compared = node.compareTo(key)
      if(compared > 0) return iter(key, node.left)
      if(compared < 0) return iter(key, node.right)
      return node.value
    }
    return iter(key, this.root)
  },
  max(fromNode = this.root) {
    if(!fromNode) throw new Error(`BST is empty starting at: ${fromNode}`)
    function iter(node) {
      if(!node.right) return node
      return iter(node.right)
    }
    return iter(fromNode)
  },
  min(fromNode = this.root) {
    if(!fromNode) throw new Error(`BST is empty starting at: ${fromNode}`)
    function iter(node) {
      if(!node.left) return node
      return iter(node.left)
    }
    return iter(fromNode)
  },
  size(x = this.root) {
    if(x == null) return 0
    return x.N
  },
  /*
    floor() is used to find the largest key that is less than or equal to the given key.
    In BST, if a given key is less than the key at the root, then the floor of key
    (the largest key in the BST less than or equal to key) must be in the left subtree.
    If key is greater than the key at the root, then the floor of key could be in the right subtree,
    but only if there is a key smaller than or equal to key in the right subtree
  */
  __floor(key, node = this.root) {
    if(!node)
      return null
    if(node.compareTo(key) === 0)
      return node
    if(key < node.key)
      return this.__floor(key, node.left)

    const t = this.__floor(key, node.right)
    if(t)
      return t
    else
      return node
  },
  floor(key) {
    function iter(node, candicate) {
      if(!node)
        return candicate
      if(node.compareTo(key) === 0)
        return node
      if(node.compareTo(key) > 0)
        return iter(node.left, candicate)
      return iter(node.right, node)
    }

    return iter(this.root, null)
  },
  floorIterator(key) {
    if(!this.root)
      return null

    let node = this.root,
        candicate = null

    while(node) {
      if(node.compareTo(key) === 0)
        return node

      if(node.compareTo(key) > 0) {
        node = node.left
      } else {
        candicate = node
        node = node.right
      }
    }

    return candicate
  },
  __ceiling(key, node = this.root) {
    if(!node)
      return null

    if(node.compareTo(key) === 0)
      return node
    if(node.compareTo(key) < 0)
      return this.__ceiling(key, node.right)

    const t = this.__ceiling(key, node.left)
    if(t)
      return t
    else
      return node
  },
  ceiling(key, node = this.root, candicate = this.root) {
    if(!node)
      return candicate

    if(node.compareTo(key) === 0)
      return node
    if(node.compareTo(key) < 0)
      return this.ceiling(key, node.right, candicate)
    return this.ceiling(key, node.left, node)
  },
  __rank(key, x = this.root) {
    if(!x) return 0
    if(x.compareTo(key) > 0) return this.__rank(key, x.left)
    if(x.compareTo(key) < 0) return this.size(x.left) + 1 + this.__rank(key, x.right)

    return this.size(x.left)
  },
  rank(key, node = this.root, ret = 0) {
    if(!node)
      return ret

    if(node.compareTo(key) > 0)
      return this.rank(key, node.left, ret)

    if(node.compareTo(key) < 0)
      return this.rank(key, node.right, ret + this.size(node.left) + 1)

    return ret + this.size(node.left)
  },
  select(i) {
    const node = this.__selectNode(i)
    return node && node.key
  },
  __selectNode(k, x = this.root) {
    if(!x)  return null // case select larger than bst.size()
    const t = this.size(x.left)

    if(k < t)
      return this.__selectNode(k, x.left)
    if(k > t)
      return this.__selectNode(k - t - 1/* substract the node itself */, x.right)

    return x
  },
  __deleteMin() {
    return this.root = this.__deleteMinNode(this.root)
  },
  __deleteMinNode(x) {
    if(!x) return null
    if(!x.left) return x.right
    x.left = this.__deleteMinNode(x.left)
    x.N = this.size(x.left) + this.size(x.right) + 1
    return x
  },
  deleteMin(fromNode = this.root) {
    if(!this.root)
      return null
    if(this.size() === 1)
      return this.root = null

    function iter(node, nodeParent) {
      node.N--

      if(!node.left) {
        if(node.right)
          return nodeParent.left = node.right
        return nodeParent.left = null
      }

      return iter(node.left, node)
    }

    return iter(fromNode, fromNode)
  },
  __deleteMax() {
    return this.root = this.__deleteMaxNode(this.root)
  },
  __deleteMaxNode(x) {
    if(!x) return null
    if(!x.right) return x.left
    x.right = this.__deleteMaxNode(x.right)
    x.N = this.size(x.left) + this.size(x.right) + 1
    return x
  },
  deleteMax(fromNode = this.root) {
    if(!this.root)
      return null
    if(this.size() === 1)
      return this.root = null

    function iter(node, nodeParent) {
      node.N--

      if(!node.right) {
        if(node.left)
          return nodeParent.right = node.left
        return nodeParent.right = null
      }

      return iter(node.right, node)
    }

    return iter(fromNode, fromNode)
  },
  delete(key) {
    return this.root = this.__deleteNode(key, this.root)
  },
  __deleteNode(key, node) {
    if(!node)
      return null

    if(node.compareTo(key) > 0)
      node.left = this.__deleteNode(key, node.left)
    else if(node.compareTo(key) < 0)
      node.right = this.__deleteNode(key, node.right)
    else {
      if(node.left && node.right) {
        const rightMinNode = this.min(node.right)
        node.right = this.__deleteMinNode(node.right)
        rightMinNode.left = node.left
        rightMinNode.right = node.right

        node = rightMinNode
      } else {
        node = node.left || node.right
      }
    }

    if(node)
      node.N = this.size(node.left) + this.size(node.right) + 1
    return node
  },
  keys(lo, hi, fromNode = this.root) {
    if(!this.root)
      return null

    lo = lo || this.min().key
    hi = hi || this.max().key
    // const ret =

    function iter(x, ret) {
      if(!x) return ret

      if(x.compareTo(lo) < 0) return iter(x.right, ret)
      if(x.compareTo(hi) > 0) return iter(x.left, ret)

      ret.push(x.key)
      iter(x.left, ret)
      iter(x.right, ret)
      return ret
    }

    return iter(fromNode, [])
  },
  toString(node = this.root) {
    if(!node)
      return

    let ret = ``

    ret += `{ ${node.toString()}, left: ${node.left && node.left.toString()}, right: ${node.right && node.right.toString()} }`
    ret += `
`

    ret += this.toString(node.left) || ''
    ret += this.toString(node.right) || ''

    return ret
  }
}
