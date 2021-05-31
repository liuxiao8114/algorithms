function Node(key, value) {
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
  put(key, value) {
    if(!this.root)
      return this.root = new Node(key, value)

    function iter(node, key, value) {
      console.log(`put: (${key}, ${value}), current node: (${node && node.key}, ${node && node.value})`)
      if(!node)
        return new Node(key, value)
      if(node.key > key) {
        node.right = iter(node.right, key, value)
        return node.right
      }
      if(node.key < key) {
        node.left = iter(node.left, key, value)
        return node.left
      }
      node.value = value
      node.N = node.left.N + node.right.N + 1
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
  size(x = this.root) {
    if(x == null) return 0
    return x.N
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
