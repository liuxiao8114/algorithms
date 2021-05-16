import fs from 'fs'

export function Digraph(vOrInput) {
  if(!vOrInput)
    throw new Error(`Unknown typeof input: ${vOrInput}.`)

  this.adj = []
  this.E = 0

  if(typeof vOrInput === 'number') {
    this.V = vOrInput

    for(let i = 0; i < this.V; i++)
      this.adj[i] = new Set()
  } else if(typeof vOrInput === 'string') {
    const cb = content => {
      const lines = content.trim().split(/\r?\n/)
      this.V = lines[0]

      for(let i = 0; i < this.V; i++)
        this.adj[i] = new Set()

      let edgeIndex = 2

      while(edgeIndex < lines.length) {
        const [ from, to ] = lines[edgeIndex].trim().split(/\s+/)
        this.addEdge(from, to)
        edgeIndex++
      }

      if(this.E != lines[1].trim())
        throw new Error(`It seems we get a difference between edges on the 2nd line: ${lines[1].trim()} and result lines: ${this.E}.`)
    }

    // fs.readFile(vOrInput).then(
    //   cb,
    //   () => cb(vOrInput) // treat input as content string
    // ).catch(e => console.log(`End with err: ${e}`)) // eslint-disable-line

    try {
      cb(fs.readFileSync(vOrInput))
    } catch(e) {
      cb(vOrInput)
    }
  }
}

Digraph.prototype = {
  addEdge(v, w) {
    this.adj[Number(v)].add(Number(w))
    this.E += 1
  },
  adj(v) {
    if(typeof v !== 'number')
      throw new Error(`cannot get adj with v: ${v}`)
    return this.adj[v]
  },
  reverse() {
    const r = new Digraph(this.V)

    for(let v = 0; v < this.adj.length; v++)
      for(let w of this.adj[v])
        r.addEdge(w, v)

    return r
  },
  toString() {

  },
  tostring() {
    return this.toString()
  }
}

// 1. give predefined G and a vertex s, using marked(v) to find if there is a path from s to v.
// 2. give predefined G and vertices sources, using marked(v) to find if there is a path to v from any in sources.
export function DirectDFS(g, sources) {
  this.marked = new Array(g.V).fill(null)

  if(Array.isArray(sources))
    for(let s of sources)
      this._dfs(g, s)
  else if(typeof sources === 'number')
    this._dfs(g, sources)
  else
    throw new Error(`Cannot handle source: ${sources}`)
}

DirectDFS.prototype = {
  _dfs(g, s) {
    if(!this.marked[s]) {
      this.marked[s] = true

      for(let w of g.adj[s]) {
        console.log(`handle vertex: ${w} in ${s}`) // eslint-disable-line
        this._dfs(g, w)
      }
    }
  },

  *_dfsStep(g, s) {
    if(!this.marked[s]) {
      this.marked[s] = true

      for(let w of g.adj[s]) {
        yield w
        this._dfs(g, w)
      }
    }
  },
  marked(v) {
    return this.marked[v]
  }
}

export function DirectCycle(g) {
  this.marked = []
  this.edgeTo = []
  this.onStack = []
  this.cycle = null

  for(let i = 0; i < g.V; i++)
    this._dfs(g, i)
}

DirectCycle.prototype = {
  _dfs(g, v) {
    if(this.marked[v])
      return
    this.marked[v] = true
    this.onStack[v] = true

    for(let w of g.adj[v]) {
      if(!this.marked[w]) {
        this.edgeTo[w] = v
        this._dfs(g, w)
      }
      else if(this.onStack[w]) {
        this.cycle = []

        for(let i = v; i !== w; i = this.edgeTo[i])
          this.cycle.push(i)
      }
    }

    this.onStack[v] = false
  },
  hasCycle() {
    return !!this.cycle
  },
  cycle() {
    return this.cycle
  },
}

function Topological(g) {

}

Topological.prototype = {
  isDAG() {

  },
  order() {

  },
}
