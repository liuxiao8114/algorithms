import fs from 'fs'
import assert from 'assert'
import { Queue } from '../utils'

export function Graph(vOrInput, know = 'No.') {
  this.E = 0
  this.adj = []

  if(typeof vOrInput === 'number') {
    this.V = vOrInput

    for(let i = 0; i < this.V; i++)
      this.adj[i] = new Set()
  } else if(typeof vOrInput === 'string') {
    const cb = content => {
      const lines = content.trim().split(/\r?\n/)
      this.V = Number(lines[0])

      for(let i = 0; i < this.V; i++)
        this.adj[i] = new Set()

      let edgeIndex = 2

      while(edgeIndex < lines.length) {
        const [ from, to ] = lines[edgeIndex].trim().split(/\s+/)
        this.addEdge(from, to)
        edgeIndex++
      }

      if(this.E != lines[1].trim())
        console.log(`It seems we get a difference between edges on the 2nd line: ${lines[1].trim()} and result lines: ${this.E}. You should know this before the initialize. Do you? ${know}`) // eslint-disable-line
    }

    try {
      cb(fs.readFileSync(vOrInput))
    } catch(e) {
      cb(vOrInput)
    }
  }
}

Graph.prototype = {
  addEdge(v, w) {
    this.adj[Number(v)].add(Number(w))
    this.adj[Number(w)].add(Number(v))
    this.E += 1
  },
  adj(v) {
    if(typeof v !== 'number')
      throw new Error(`cannot get adj with v: ${v}`)
    return this.adj[v]
  },
  toString() {

  },
  tostring() {
    return this.toString()
  }
}

function _dfs(that, g, s) {
  that.marked[s] = true
  if(that.counter != null)
    that.counter++

  for(let v of g.adj[s]) {
    if(!that.marked[v]) {
      if(that.edgeTo)
        that.edgeTo[v] = s

      _dfs(that, g, v)
    }
  }
}

function _dfsNoR(that, g, s) {
  function iter(that, v) {
    that.marked[v] = true
    if(that.counter != null)
      that.counter++

    for(let w of g.adj[v])
      subIter(that, v, w, iter)
  }

  function subIter(that, v, w, cb) {
    if(!that.marked[w]) {
      if(that.edgeTo)
        that.edgeTo[w] = v

      cb(that, w)
    }
  }

  return iter(that, s)
}

export function DFS(g, s = 0) {
  assert(g, "A Graph instance must be passed as parameter.")
  this.marked = new Array(g.V).fill(false)
  this.counter = 0

  _dfs(this, g, s)
}

DFS.prototype = {
  marked(v) {
    return this.marked[v]
  },
  count() {
    return this.counter
  },
}

export function Paths(g, s) {
  assert(g, "A Graph instance must be passed as parameter.")
  this.marked = new Array(g.V).fill(false)
  this.edgeTo = new Array(g.V).fill(null)
  this.s = s

  _dfs(this, g, s)
}

Paths.prototype = {
  hasPathTo(v) {
    return this.marked[v]
  },
  pathTo(v) {
    if(!this.hasPathTo(v))
      return

    const path = [ v ]

    for(let w = this.edgeTo[v]; w != null && w !== this.s; w = this.edgeTo[w])
      path.push(w)
    path.push(this.s)

    return path
  }
}

export function BreathFirstPaths(g, s) {
  assert(g, "A Graph instance must be passed as parameter.")
  this.marked = []
  this.edgeTo = []
  this.s = s

  this._bfsR(g, s)
}

BreathFirstPaths.prototype = {
  _bfsR(g, s) {
    function iter(that, g, q) {
      if(q.isEmpty())
        return

      const w = q.dequeue()

      for(let v of g.adj[w]) {
        if(!that.marked[v]) {
          that.marked[v] = true
          that.edgeTo[v] = w
          q.enqueue(v)
        }
      }

      return iter(that, g, q)
    }

    this.marked[s] = true
    return iter(this, g, new Queue(s))
  },
  _bfsR2(g, s) {
    function iter(that, g, v, from = null) {
      if(v == null)
        return

      if(!that.marked[v]) {
        that.marked[v] = true
        if(from != null)
          that.edgeTo[v] = from

        for(let w of g.adj[v])
          iter(that, g, w, v)
      }
    }

    return iter(this, g, s)
  },
  _bfsQ(g, s) {
    const q = new Queue(s)
    this.marked[s] = true

    while(!q.isEmpty()) {
      const w = q.dequeue()

      for(let v of g.adj[w]) {
        if(!this.marked[v]) {
          this.edgeTo[v] = w
          this.marked[v] = true
          q.enqueue(v)
        }
      }
    }
  },
  hasPathTo(v) {
    return this.marked[v]
  },
  pathTo(v) {
    if(!this.hasPathTo(v))
      return

    const path = [ v ]

    for(let w = this.edgeTo[v]; w != null && w !== this.s; w = this.edgeTo[w])
      path.push(w)
    path.push(this.s)

    return path
  },
}

export function CC(g) {
  this.marked = new Array(g.V).fill(false)
  this.id = new Array(g.V).fill(0)
  this.count = 0

  for(let i = 0; i < g.V; i++) {
    if(!this.marked[i]) {
      this.count += 1
      this._dfs(g, i)
    }
  }
}

CC.prototype = {
  _dfs(g, s) {
    if(!this.marked[s]) {
      this.marked[s] = true
      this.id[s] = this.count

      for(let v of g.adj[s])
        this._dfs(g, v)
    }
  },
  getId(v) {
    return this.id[v]
  },
  connected(v, w) {
    return this.id[v] === this.id[w]
  },
}

export function Cycle(g) {
  this.marked = new Array(g.V).fill(false)
  this.edgeTo = new Array(g.V).fill(null)
  this.onStack = []

  this.cycle = null

  for(let i = 0; i < g.V; i++)
    this._dfs_(g, i)

  // for(let i of g.V) {
  //   if(!this.marked[i])
  //     this._dfs(g, i)
  //
  //   this.onStack = []
  // }
}

Cycle.prototype = {
  _dfs_(g, s) {
    if(this.marked[s])
      return

    this.marked[s] = true
    this.onStack[s] = true

    for(let v of g.adj[s]) {
      if(!this.marked[v]) {
        this.edgeTo[v] = s
        this._dfs_(g, v)
      } else if(this.onStack[v]) {
        this.cycle = []

        // 选取从s位置回退至v(即 v -> s), 而不是从v的位置回退至s(即 s -> v). 原因在于
        // v是在s被mark之前就mark过了, 说明一定有一条路径从v -> s
        // for(let i = v; i !== s; i = this.edgeTo[i])
        for(let i = s; i !== v; i = this.edgeTo[i])
          this.cycle.push(i)
      }
    }

    this.onStack[s] = false
  },
  _dfs(g, s) {
    if(!this.marked[s]) {
      this.marked[s] = true
      this.onStack[s] = true

      for(let v of g.adj[s]) {
        if(!this.marked[v])
          this.edgeTo[v] = s
        this._dfs(g, v)
      }
    }
    else if(this.onStack[s]) {
      this.cycle = []

      for(let i = this.edgeTo[s]; i !== s; i = this.edgeTo[i])
        this.cycle.push(i)
    }
  },
  hasCycle() {
    return !!this.cycle
  },
  cycle() {
    return this.cycle
  },
}

export function TwoColor() {

}

TwoColor.prototype = {
  _dfs() {

  },
  isBipartite() {

  },
}
