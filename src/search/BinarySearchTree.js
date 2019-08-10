function Node(key, value) {
  this.key = key
  this.value = value
  this.left = null
  this.right = null
  this.N = 1
}

Node.prototype = {
  compareTo(key, counter) {
    return this.key > key ? 1 : this.key < key ? -1 : 0
  }
}

export default function BinarySearchTree() {
  this.root = null
}

BinarySearchTree.prototype = {
  put(key, value, counter = 0) {
    function iter(node, key, value) {
      if(!node) return node = new Node(key, value)
      counter++
      console.log(counter)
      if(this.key > key) return node.left = iter(node.left, key, value)
      if(this.key < key) return node.right = iter(node.right, key, value)
      node.value = value
      node.N = node.left.N + node.right.N + 1
      return node
    }
    const node = iter(this.root, key, value)
    return {
      counter,
      node
    }
  },
  putIterator() {

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
  getIterator() {

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
