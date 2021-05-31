export default function BinarySearchST() {
  this.keys = []
  this.values = []
  this.N = 0
}

BinarySearchST.prototype = {
  constructor: BinarySearchST,
  get(key) {    /* running time: logN */
    if(!this.keys.length) return null
    let i = this.rank(key)
    if(this.keys[i] !== key) return null
    return this.values[i]
  },
  put(key, value) {   /* running time: N + logN */
    let i = this.rank(key)
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
  rank(key) {   /* running time: logN */
    return this.rankIterator(key)
  },
  rankRecusive(key, lo = 0, hi = this.keys.length - 1) {
    if(lo > hi) return lo

    let mid = Math.floor((hi + lo) / 2)
    if(this.keys[mid] < key) return this.rankRecusive(key, mid + 1, hi)
    if(this.keys[mid] > key) return this.rankRecusive(key, lo, mid - 1)

    return mid
  },
  // rankRecusive(key) {
  //   function iter(key, keys, lo, hi) {
  //     if(lo > hi) return lo
  //
  //     let mid = Math.floor((hi + lo) / 2)
  //     if(keys[mid] < key) return iter(key, keys, mid + 1, hi)
  //     if(keys[mid] > key) return iter(key, keys, lo, mid - 1)
  //     return mid
  //   }
  //
  //   return iter(key, this.keys, 0, this.keys.length - 1)
  // },
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
  select(i) {   /* running time: 1 */
    return this.keys[i]
  },
  size() {  /* running time: 1 */
    return this.N
  },
  contains(key) { /* running time: 1 */
    return this.get(key) != null
  },
  isEmpty() { /* running time: 1 */
    return !this.keys.length
  },
  min() { /* running time: 1 */
    return this.keys[0]
  },
  max() { /* running time: 1 */
    return this.keys[this.N - 1]
  },
  keys() {  /* running time: 1 */
    return this.keys
  },
  values() {  /* running time: 1 */
    return this.values
  },
}
