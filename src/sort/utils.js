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
  },
  toString() {
    if(this.first == null || this.last == null || this.length === 0)
      return 'empty queue'

    let s = this.first.item,
        next = this.first.next

    while(next != null) {
      s += `, ${next.item}`
      next = next.next
    }

    return s
  }
}

export let __utils = {
  less(a, i, j) {
    if(a[i] && a[j] && typeof a[i].compareTo === 'function')
      return a[i].compareTo(a[j]) < 0
    return a[i] - a[j] < 0
  },
  exch(a, i, j) {
    if(i === j) return
    let tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
  },
  swim(a, k) {
    if(k <= 1) return
    const p = Math.floor(k / 2)
    if(__utils.less(a, p, k)) return
    __utils.exch(a, p, k)
    __utils.swim(a, p)
  },
  sink(a, k, length) {
    let l = length || a.length - 1
    while(k * 2 <= l) {
      let s = k * 2
      if(s < l && __utils.less(a, s + 1, s)) s++
      if(__utils.less(a, k, s)) break
      __utils.exch(a, k, s)
      k = s
    }
  }
}

export function MinPQ() {
  this.q = []
  this.q[0] = Number.MIN_VALUE
  this.length = 0
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
    return this.length
  },
  delMin() {
    let min = this.min()
    exch(this.q, 1, this.length) // this.length is less 1 than this.q.length
    this.q[this.length--] = null
    __utils.sink(this.q, 1, this.length)
    return min
  },
  insert(...i) {
    for(let j of i) {
      this.q[++this.length] = j
      __utils.swim(this.q, this.length)
    }
  }
}

export function MaxPQ() {
  this.q = []
  this.q.push(Number.MIN_VALUE)
  this.length = 0
}

MaxPQ.prototype = {
  constructor: MaxPQ,
  insert(...items) {
    for(let i = 0; i < items.length; i++) {
      this.q.push(items[i])
      __utils.swim(this.q, ++this.length)
    }
  },
  delMin() {
    const min = this.q[1]
    __utils.exch(this.q, 1, this.length)
    this.q[this.length--] = null
    __utils.sink(this.q, 1)
    return min
  }
}

/* utils */
function less(indices, keys, i, j) {
  if(!Array.isArray(indices))
    throw new Error('exch need array as first param')

  // indexPQ
  if(Array.isArray(keys))
    return keys[indices[i]] < keys[indices[j]]
  // normal
  else if(typeof keys === 'number') {
    j = i
    i = keys
    return indices[i] < indices[j]
  }
  else throw new Error('unknown less args')
}

/*
i: 1, pq[i] = 10, qp[10] = 1, keys[10] = 'i'
j: 2, pq[j] = 20, qp[20] = 2, keys[20] = 'j'
exch:
pq[i] = 20
pq[j] = 10
qp[pq[i]] = i
qp[pq[j]] = j

pq[1] = 20, qp[20] = 1, keys[20] = 'j'
pq[2] = 10, qp[10] = 2, keys[10] = 'i'
exch(k, N)
this.pq[k]
this.pq[N]
this.qp[k]
*/

function exch(p, q, i, j) {
  if(!Array.isArray(p))
    throw new Error('exch need array as first param')

  // indexPQ
  if(Array.isArray(q)) {
    const temp = p[i]
    p[i] = p[j]
    p[j] = temp
    q[p[i]] = i
    q[p[j]] = j
  }
  // normal
  else if(typeof q === 'number') {
    j = i
    i = q
    const temp = p[i]
    p[i] = p[j]
    p[j] = temp
  }
  else throw new Error('unknown exch args')
}

function swim(a, i) {
  if(!Array.isArray(a))
    throw new Error('exch need array as first param')

  if(i <= 1) return
  const p = Math.floor(i / 2)
  if(less(a, i, p)) {
    exch(a, i, p)
    swim(a, p)
  }
}

function sink(a, i, n) {
  if(!Array.isArray(a))
    throw new Error('exch need array as first param')

  if(!n) n = a.length - 1
  if(i * 2 > n) return
  let s = i * 2
  if(s + 1 <= n && less(a, s + 1, s))
    s++
  if(less(a, s, i)) {
    exch(a, i, s)
    sink(a, s, n)
  }
}

export { less, exch, swim, sink }
