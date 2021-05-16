function FlowEdge(v, w, capacity) {
  this.v = v
  this.w = w
  this.capacity = capacity
  this.flow = 0.0
}

FlowEdge.prototype = {
  constructor: FlowEdge,
  from() {
    return this.v
  },
  to() {
    return this.w
  },
  other(v) {
    if(this.v === v) return this.w
    return this.v
  },
  residualCapacityTo(v) {
    if(this.v === v) return this.flow
    return this.capacity - this.flow
  },
  addResidualFlowTo(v, delta) {
    if(this.v === v) return this.flow -= delta
    return this.flow += delta
  }
}

function Node(item, nextNode) {
  this.item = item
  this.next = nextNode
}

function Queue() {
  this.first = null
  this.last = null
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
  },
  dequeue() {
    let tmp = this.first
    if(tmp)
      this.first = this.first.next

    return tmp.item
  }
}

function FlowNetwork(v) {
  this.V
  this.E
  this.adj = []
}

FlowNetwork.prototype.addEdge = function(e) {
  this.E++
  this.adj[e.from()].add(e)
  this.adj[e.to()].add(e)
}

FlowNetwork.prototype.edges = function() {
  let edges = new Set()
  for(let i = 0; i < this.V; i++) {
    for(let e of this.adj[i]) {
      if(e.other(i) !== i)
        edges.add(e)
    }
  }
  return edges
}

function FordFulkerson(G, s, t) {
  this.marked = null
  this.edgeTo = null
  this.value = 0.0

  let bottle = Number.MAX_VALUE()

  while(this.hasAugmentingPath(G, s, t)) {
    for(let v = t; v != s;) {
      let e = this.edgeTo[v],
          w = e.other(v)
      bottle = Math.min(bottle, e.residualCapacityTo(w))
      v = w
    }

    for(let v = t; v != s; ) {
      let e = this.edgeTo[v],
          w = e.other(v)
      e.addResidualFlowTo(w, bottle)
    }

    this.value += bottle
  }
}

FordFulkerson.readInput = input => {
  return
}

FordFulkerson.prototype.hasAugmentingPath = function(g, s, t) {
  this.marked = []
  this.edgeTo = []

  let q = new Queue()
  q.enqueue(s)

  while(!q.isEmpty()) {
    let v = q.dequeue()
    for(let e of v.adj()) {
      let w = e.other(v)
      if(e.residualCapacityTo(w) > 0 && !this.marked[w]) {
        this.marked[w] = true
        this.edgeTo[w] = e
        q.enqueue(w)
      }
    }
  }

  return this.marked[t]
}

FordFulkerson.prototype.isInCut = function(v) {
  return this.marked[v]
}
