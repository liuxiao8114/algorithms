import { exch, less } from './utils'
/*
insert: 18 17 16 15 14 13 12 11
        MIN_NUMBER
            11
        12      13
      14  15  16  17
    18

;insert: 6, 18
length = 1
qp[6] = 1, pq[qp[6]] = pq[1] = 6, keys[6] = 18
swim(1):
              (6,18)

;insert: 4, 17
length = 2
qp[4] = 2, pq[qp[4]] = pq[2] = 4, keys[4] = 17
swim(2):
              (4,17)
      (6,18)

;insert: 2, 14
length = 3
qp[2] = 3, pq[qp[2]] = pq[3] = 2, keys[2] = 14
swim(3):
              (2,14)
      (6,18)          (4,17)

;insert: 7, 11
length = 4
qp[7] = 4, pq[qp[7]] = pq[4] = 7, keys[7] = 11
swim(4):

;;swim(7)
p = 3
*/
export function IndexMinPQ() {
  this.pq = []
  this.qp = []
  this.keys = []
  this.length = 0
  this.keys[0] = Number.MIN_VALUE
}

IndexMinPQ.prototype = {
  constructor: IndexMinPQ,
  less(i, j) {
    return less(this.pq, this.keys, i, j)
  },
  exch(i, j) {
    return exch(this.pq, this.qp, i, j)
  },
  swim(i) {
    if(i <= 1) return
    const p = Math.floor(i / 2)
    if(this.less(i, p)) {
      this.exch(i, p)
      this.swim(p)
    }
  },
  sink(i) {
    if(i * 2 > this.length) return
    let k = i * 2
    if(k + 1 <= this.length && this.less(k + 1, k))
      k++
    if(this.less(i, k)) {
      this.exch(i, k)
      this.sink(k)
    }
  },
  min() {
    return this.keys[this.pq[1]]
  },
  minIndex() {
    return this.pq[1]
  },
  isEmpty() {
    return this.keys[this.pq[1]] === null
  },
  size() {
    return this.length
  },
  delMin() {
    const minIndex = this.pq[1]
    this.exch(1, this.length)
    this.keys[this.pq[this.length]] = null
    this.qp[this.pq[this.length]] = -1
    this.pq[this.length--] = null
    this.sink(1)
    return minIndex
  },
  insert(i, item) {
    if(this.contains(i))
      throw new Error(`cannot insert for index: ${i}, key: ${this.keys[i]} already exists.`)
    this.length++
    this.pq[this.length] = i
    this.qp[i] = this.length
    this.keys[i] = item
    this.swim(this.length)
  },
  change(i, item) {
    this.keys[i] = item
    this.swim(this.qp[i])
    this.sink(this.qp[i])
  },
  delete(i) {
    if(!this.contains(i))
      throw new Error(`cannot delete for index: ${i} does not exist.`)
    const index = this.qp[i]
    this.exch(index, this.length--)
//    console.log(`delete alert! index: ${index}, qp[i]: ${this.qp[i]}`)
    this.swim(this.pq, index)
    this.sink(this.pq, index)
    this.keys[i] = null
    this.qp[i] = -1
  },
  contains(i) {
    return this.keys[i]
  }
}
