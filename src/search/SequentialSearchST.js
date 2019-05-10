function Node(key, value) {
  this.next = null
  this.item = { key, value }
}

export default function SequentialSearchST() {
  this.first = null
}

SequentialSearchST.prototype = {
  constructor: SequentialSearchST,
  get(key) {
    function iter(key, pos) {
      if(!pos) return null
      if(pos.item.key === key) return pos.item.value
      return iter(key, pos.next)
    }
    return iter(key, this.first)
  },
  put(key, value) {
    function iter(key, pos) {
      if(!pos)
        throw new Error('pos cannot be null! Unpossible to reach here')
      if(pos.item.key === key)
        return pos.item.value = value
      if(!pos.next) {
        const last = new Node(key, value)
        pos.next = last
      }
      return iter(key, pos.next)
    }
    if(!this.first) return this.first = new Node(key, value)
    return iter(key, this.first)
  },
  contains(key) {
    return this.get(key) !== null
  },
  *items() {
    let next = this.first
    while(next) {
      yield next.item
      next = next.next
    }
  },
  isEmpty() {
    return !this.first
  }
}
