export function Node(ch, freq, left, right) {
  this.ch = ch
  this.freq = freq
  this.left = left
  this.right = right
}

Node.prototype.isLeaf = function() {
  return this.left === null && this.right === null
}

Node.prototype.compareTo = function(that) {
  return this.freq - that.freq
}
