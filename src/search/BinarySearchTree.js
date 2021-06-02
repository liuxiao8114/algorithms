export function Node(key, value) {
  this.key = key
  this.value = value
  this.left = null
  this.right = null
  this.N = 1
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

      if(key === node.key) {
        node.value = value
        return node
      }

      if(key < node.key)
        node.left = iter(node.left, key, value)
      else
        node.right = iter(node.right, key, value)

      node.N = this.size(node.left) + this.size(node.right) + 1

      return node
    }

    return iter(this.root, key, value)
  },
  getNode(key, node = this.root) {
    if(!node) return null
    if(node.key > key) return this.getNode(key, node.left)
    if(node.key < key) return this.getNode(key, node.right)

    return node
  },
  get(key) {
    function iter(key, node) {
      if(!node) return null
      if(node.key > key) return iter(key, node.left)
      if(node.key < key) return iter(key, node.right)
      return node.value
    }
    return iter(key, this.root)
  },
  max() {
    if(!this.root) throw new Error('BST is empty')
    function iter(node) {
      if(!node.right) return node
      return iter(node.right)
    }
    return iter(this.root)
  },
  min() {
    if(!this.root) throw new Error('BST is empty')
    function iter(node) {
      if(!node.left) return node
      return iter(node.left)
    }
    return iter(this.root)
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
    if(key === node.key)
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
      if(key === node.key)
        return node
      if(key < node.key)
        return iter(node.left, candicate)
      return iter(node.right, node)
    }

    return iter(this.root, this.root)
  },
  floorIterator(key) {
    if(!this.root)
      return null

    let node = this.root,
        candicate = node

    while(node) {
      if(key === node.key)
        return node

      if(key < node.key) {
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

    if(key === node.key)
      return node
    if(key > node.key)
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

    if(key === node.key)
      return node
    if(key > node.key)
      return this.ceiling(key, node.right, candicate)
    return this.ceiling(key, node.left, node)
  },
  __rank(key, x = this.root) {
    if(!x) return 0
    if(key < x.key) return this.__rank(key, x.left)
    if(key > x.key) return this.size(x.left) + 1 + this.__rank(key, x.right)

    return this.size(x.left)
  },
  rank(key, node = this.root, ret = 0) {
    if(!node)
      return ret

    if(key < node.key)
      return this.rank(key, node.left, ret)

    if(key > node.key)
      return this.rank(key, node.right, ret + this.size(node.left) + 1)

    return ret + this.size(node.left)
  },
  select(i) {
    const node = this.__selectNode(i)
    return node && node.key
  },
  __selectNode(k, x = this.root) {
    if(!x)  return null
    const t = this.size(x.left)

    if(k < t)
      return this.__selectNode(k, x.left)
    if(k > t)
      return this.__selectNode(k - t - 1, x.right)

    return x
  },
  selectNode(i) {
    function iter(node, j) {
      if(!node) // case select larger than bst.size()
        return null

      if(node.left) {
        if(j === node.left.N)
          return node
        if(j < node.left.N)
          return iter(node.left, j)
        return iter(node.right, j - node.left.N - 1 /* substract the node itself */)
      }

      if(j === 0)
        return node

      return iter(node.right, j - 1)
    }

    return iter(this.root, i)
  },
  __deleteMin() {
    return this.root = this.__deleteMinNode(this.root)
  },
  __deleteMinNode(x = this.root) {
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
  __deleteMaxNode(x = this.root) {
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
  delete(key, node = this.root) {
    if(!node)
      return null

    if(key < node.key)
      node.left = this.delete(key, node.left)
    else if(key > node.key)
      node.right = this.delete(key, node.right)

    if(node.left && node.right) {
      const rightMinNode = this.min(node.right)
      this.__deleteMin(node.right)
    }

    return node.left || node.right

  },
  keys() {

  }
}
