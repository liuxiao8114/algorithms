export default function BinarySearchST() {
  this.keys = []
  this.values = []
  this.N = 0
}

BinarySearchST.prototype = {
  constructor: BinarySearchST,
  get(key) {
    if(!this.keys.length) return null
    let i = this.rankIterator(key)
    if(this.keys[i] !== key) return null
    return this.values[i]
  },
  put(key, value) {
    let i = this.rankIterator(key)
    if(this.keys[i] === key) this.values[i] = value
    else {
      for(let j = this.N; j > i; j--) {
        this.keys[j] = this.keys[j - 1]
        this.values[j] = this.values[j - 1]
      }
      this.N++
      this.keys[i] = key
      this.values[i] = value
    }
  },
  rankRecusive(key) {
    function iter(key, keys, lo, hi) {
      /*
      if(lo === hi) {
        if(this.keys[lo] < key) return lo + 1
        if(this.keys[lo] > key) return lo
        return lo
      }
      */
      if(lo > hi) return lo

      let mid = Math.floor((hi + lo) / 2)
      if(keys[mid] < key) return iter(key, keys, mid + 1, hi)
      if(keys[mid] > key) return iter(key, keys, lo, mid - 1)
      return mid
    }

    return iter(key, this.keys, 0, this.keys.length - 1)
  },
  rankIterator(key) {
    let lo = 0,
        hi = this.keys.length
    while(lo <= hi) {
      let mid = Math.floor((hi + lo) / 2)
      if(this.keys[mid] === key)
        return mid

      if(this.keys[mid] < key) lo = mid + 1
      else hi = mid - 1
    }
    return lo
  },
  select(i) {
    return this.keys[i]
  },
  contains(key) {
    return !!this.get(key)
  },
  isEmpty() {
    return !this.keys.length
  },
  min() {
    return this.keys[0]
  },
  max() {
    return this.keys[this.N - 1]
  },
  keys() {
    return this.keys
  }
}
