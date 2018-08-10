function Node(item, nextNode) {
  this.item = item
  this.next = nextNode
}

export function Queue() {
  this.first = null
  this.last = null
  this.length = 0
}

Queue.prototype = {
  constructor: Queue,
  enqueue(x) {
    if(this.first === null) {
      this.first = this.last = new Node(x, null)
    } else {
      this.last.next = new Node(x, null)
      this.last = this.last.next
    }
    this.length++
  },
  dequeue() {
    let tmp = this.first
    if(tmp)
      this.first = this.first.next
    if(tmp === this.last && this.length === 1)
      this.last = null
    this.length--
    return tmp.item
  },
  isEmpty() {
    return this.first === null
  }
}

export let __utils = {
  less(a, i, j) {
    return a[i] < a[j]
  },
  exch(a, i, j) {
    if(i === j) return
    let tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
  },
  swim(a, k) {
    while(k >= 1) {
      const p = Math.floor(k / 2)
      if(__utils.less(a, p, k)) break
      __utils.exch(a, p, k)
      k = p
    }
  },
  sink(a, k) {
    while(k * 2 < a.length) {
      let s = k * 2
      if(__utils.less(a, s + 1, s)) s++
      if(__utils.less(a, k, s)) break
      __utils.exch(a, k, s)
    }
  }
}

export function MinPQ() {
  this.q = []
  this.q[0] = Number.MIN_VALUE
}

MinPQ.prototype = {
  constructor: MinPQ,
  min() {
    return this.q[1]
  },
  isEmpty() {
    return this.q[1] == null
  },
  size() {
    return this.q.length - 1
  },
  delMin() {
    __utils.exch(this.q, 1, this.q.length - 1)
    __utils.sink(this.q, 1)
  },
  insert(i) {
    if(Array.isArray(i)) {
      for(let j of i) {
        this.q.push(j)
        __utils.swim(this.q, this.q.length - 1)
      }
    } else {
      this.q.push(i)
      __utils.swim(this.q, this.q.length - 1)
    }
  }
}
