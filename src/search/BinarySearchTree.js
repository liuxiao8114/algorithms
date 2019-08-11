function Node(key, value) {
  this.key = key
  this.value = value
  this.left = null
  this.right = null
  this.N = 1
}

Node.prototype.toString = Node.prototype.tostring = function() {
  return `(${this.key}, ${this.value})`
}

export default function BinarySearchTree() {
  this.root = null
}

function size(x) {
  return x && x.N
}

BinarySearchTree.prototype = {
  put(key, value) {
    if(!this.root) this.root = new Node(key, value)

    function iter(node, key, value) {
      if(!node) return new Node(key, value)
      if(node.key > key) return node.right = iter(node.right, key, value)
      if(node.key < key) return node.left = iter(node.left, key, value)
      node.value = value
      node.N = size(node.left) + size(node.right) + 1
      return node
    }
    return iter(this.root, key, value)
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
    if(!this.root) throw new Error('cannot get MAX from empty BST')
    function iter(node) {
      if(!node.right) return node
      return iter(node.right)
    }
    return iter(this.root)
  },
  min() {
    if(!this.root) throw new Error('cannot get MIN from empty BST')
    function iter(node) {
      if(!node.left) return node
      return iter(node.left)
    }
    return iter(this.root)
  },
  size() {
    if(!this.root) return 0
    return this.root.N
  },
  rank(key) {
    function iter(node) {
      if(!node || key === node.key) return 0
      if(key < node.key) return iter(node.left)
      if(key > node.key) return iter(node.right) + 1
    }
    return iter(this.root)
  },
  select(i) {
    return i
  }
}
