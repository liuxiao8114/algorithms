import { Node } from './utils'

export default function SequentialSearchST() {
  this.first = null
  this.N = 0 // for exercise 3.1.5
}

SequentialSearchST.prototype = {
  constructor: SequentialSearchST,
  get(key) {  /* running time: N */
    function iter(key, pos) {
      if(!pos) return null
      if(pos.key === key) return pos.value
      return iter(key, pos.next)
    }
    return iter(key, this.first)
  },
  put(key, value) { /* running time: N */
    if(!this.first)
      return this.first = new Node(key, value)

    function iter(that, key, pos) {
      if(!pos) {
        that.N++
        return that.first = new Node(key, value, that.first)
      }
      if(pos.key === key)
        return pos.value = value
      return iter(that, key, pos.next)
    }

    return iter(this, key, this.first)
  },
  contains(key) { /* running time: N */
    return this.get(key) != null
  },
  *items() {
    let next = this.first
    while(next) {
      yield { key: next.key, value: next.value }
      next = next.next
    }
  },
  isEmpty() { /* running time: 1 */
    return !this.first
  },
  toString() { return },
  tostring() { return this.toString() },
}
