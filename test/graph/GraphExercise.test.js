import assert from 'assert'
import { Graph, DFS, Paths, BreathFirstPaths, CC, Cycle } from '../../src/graph/Graph'

describe('graph exercises', () => {
  const input =
    `13
    20
    4 2
    2 3
    6 0
    0 1
    2 0
    11 12
    12 9
    9 10
    9 11
    8 9
    10 12
    11 4
    4 3
    3 5
    7 8
    5 4
    0 5
    6 4
    6 9
    7 6`

  const tinyG =
    `13
    13
    0 1
    0 2
    0 5
    0 6
    3 4
    3 5
    4 5
    4 6
    7 8
    9 10
    9 11
    9 12
    11 12`

  const tinyGex2 =
`12
16
8 4
2 3
1 11
0 6
3 6
10 3
7 11
7 8
11 8
2 0
6 2
5 2
5 10
3 10
8 1
4 1`

  // 4.1.1 What is the maximum number of edges in a graph with V vertices and no parallel
  // edges? What is the minimum number of edges in a graph with V vertices, none of
  // which are isolated?

  // 4.1.2 Draw, in the style of the figure in the text (page 524), the adjacency
  // lists built by Graph’s input stream constructor for the file tinyGex2.txt depicted at left.

  // 4.1.3 Create a copy constructor for Graph that takes as input a
  // graph G and creates and initializes a new copy of the graph. Any
  // changes a client makes to G should not affect the newly created graph.
  it('test 4.1.3', () => {
    function GraphCopy(g) {
      this.V = g.V
      this.E = g.E
      this.adj = []

      for(let set of g.adj)
        this.adj.push(new Set(set))
    }

    GraphCopy.prototype = {
      ...Graph.prototype,
      constructor: GraphCopy,
    }

    const g = new GraphCopy(new Graph(input))

    expect(g.adj[0]).toEqual(new Set([ 6, 1, 2, 5 ]))
  })

  // 4.1.4 Add a method hasEdge() to Graph which takes two int arguments v and w and
  // returns true if the graph has an edge v-w, false otherwise.
  it('test 4.1.4', () => {
    // 应该在构造函数中事先通过递归构造this.edgeTo[], 保证hasEdge有常数级的访问速度。
    Graph.prototype.hasEdge = function(v, w) {
      let marked = []
      let adj = this.adj

      const stack = [v]

      while(stack.length > 0) {
        const next = stack.pop()

        for(let one of adj[next]) {
          if(one == w) return true
          if(!marked[one]) {
            marked[one] = true
            stack.push(one)
          }
        }
      }

      return false
    }

    let g = new Graph(input)
    expect(g.hasEdge(0, 12)).toBe(true)

    g = new Graph(tinyG)
    expect(g.hasEdge(0, 12)).toBe(false)
  })

  // 4.1.5 Modify Graph to disallow parallel edges and self-loops.
  it('test 4.1.5', () => {
    const ng1 =
    `4
    4
    0 1
    0 2
    0 0
    1 2`

    const ng2 =
    `4
    4
    2 1
    0 2
    0 0
    1 2`

    function GraphCopy(vOrInput) {
      Graph.call(this, vOrInput, 'Yes!')
    }

    GraphCopy.prototype = {
      ...Graph.prototype,
      constructor: GraphCopy,
      addEdge(v, w) {
        if(v !== w &&
          !this.adj[Number(v)].has(Number(w))) {
            this.adj[Number(v)].add(Number(w))
            this.adj[Number(w)].add(Number(v))
            this.E += 1
          }
      }
    }

    expect(new GraphCopy(ng1).E).toBe(3)
    expect(new GraphCopy(ng2).E).toBe(2)
  })

  // 4.1.6 Consider the four-vertex graph with edges 0-1, 1-2, 2-3, and 3-0.
  // Draw an array of adjacency-lists that could not have been
  // built calling addEdge() for these edges no matter what order.

  // 4.1.7 Develop a test client for Graph that reads a graph from the input stream named
  // as command-line argument and then prints it, relying on toString().

  // 4.1.8 Develop an implementation for the Search API on page 528 that uses UF, as described
  // in the text.

  // 4.1.9 Show, in the style of the figure on page 533, a detailed trace of the call dfs(0) for
  // the graph built by Graph’s input stream constructor for the file tinyGex2.txt (see Exercise
  // 4.1.2). Also, draw the tree represented by edgeTo[].
  /*
    G() {
      this.V = 12
      this.E = 16
      this.adj =
        0: Set(2, 6)
        1: Set(11, 8, 4)
        2: Set(0, 3, 6, 5)
        3: Set(2, 6, 10, |10|)
        4: Set(1, 8)
        5: Set(0, 2, 10)
        6: Set(0, 2, 3)
        7: Set(8, 11)
        8: Set(1, 4, 7, 11)
        9: Set()
       10: Set(3, |3|, 5)
       11: Set(1, 7, 8)
    }

    dfs                     marked[]                      edgeTo[]
                    0 1 2 3 4 5 6 7 8 9 10 11     0 1 2 3 4 5 6 7 8 9 10 11
     0              T
      2             T   T                             0
        0           isMarked
        3           T   T T                           0 2
          2         isMarked
          6         T   T T     T                     0 2     3
            0       isMarked
            2       isMarked
            3       isMarked
          10        T   T T     T       T             0 2     3       3
            3       isMarked
            5       T   T T   T T       T             0 2   103       3
        6           isMarked
        5           isMarked
      6             isMarked

    // 4.1.11 Draw the tree represented by edgeTo[] after the call bfs(G, 0) in Algorithm 4.2
    // for the graph built by Graph’s input stream constructor for the file tinyGex2.txt
    // (see Exercise 4.1.2).
    bfs                     marked[]                      edgeTo[]
     q              0 1 2 3 4 5 6 7 8 9 10 11     0 1 2 3 4 5 6 7 8 9 10 11
     0              T
     enq 2
     enq 6
     deq 2
     2, 6           T   T T   T T                     0 2   2 0
     enq 3
     enq 5
     deq 6
     6, 3 5         T   T T   T T                     0 2   2 0
     deq 3
     3, 5           T   T T   T T       T             0 2   2 0       3
     enq 10
     deq 5
     5, 10
     deq 10
  */

  // 4.1.10 Prove that every connected graph has a vertex whose removal (including all
  // adjacent edges) will not disconnect the graph, and write a DFS method that finds such
  // a vertex. Hint : Consider a vertex whose adjacent vertices are all marked.

  /*
  Definition in Page519:
    A graph is connected if there is a path from every vertex to every other
    vertex in the graph. A graph that is not connected consists of a set of connected components,
    which are maximal connected subgraphs.
  */
  it('test 4.1.10', () => {
    const test1 =
    `4
    3
    0 1
    1 2
    2 3`

    Graph.prototype.removalNotDisconnect = function(from) {
      const marked = []
      let result = null

      function dfs(g, v) {
        let isMarkedAll = true
        marked[v] = true

        for(let w of g.adj[v]) {
          if(!marked[w]) {
            isMarkedAll = false
            dfs(g, w)
          }
        }

        if(isMarkedAll && result === null)
          result = v
      }

      dfs(this, from)

      return result
    }

    // Graph.prototype.removalNotDisconnect = function(from) {
    //   const marked = []
    //
    //   function dfs(g, v) {
    //     marked[v] = true
    //     let isContinue = true
    //
    //     for(let w of g.adj[v])
    //       isContinue = iter(g, w, dfs) && isContinue
    //
    //     if(isContinue)
    //       return v
    //   }
    //
    //   function iter(g, w, cb) {
    //     if(!marked[w])
    //       return cb(g, w)
    //     return true
    //   }
    //
    //   return dfs(this, from)
    // }

    expect(new Graph(test1).removalNotDisconnect(0)).toBe(3)
    expect(new Graph(test1).removalNotDisconnect(3)).toBe(0)
  })

  // 4.1.12 What does the BFS tree tell us about the distance from v to w
  // when neither is at the root?


  // 4.1.13 Add a distTo() method to the BreadthFirstPaths API and implementation,
  // which returns the number of edges on the shortest path from the source to a given vertex.
  // A distTo() query should run in constant time.
  it('test 4.1.13', () => {
    BreathFirstPaths.prototype.distTo = function(v) {

    }
  })

  // 4.1.14 Suppose you use a stack instead of a queue when running breadth-first search.
  // Does it still compute shortest paths?

  // 4.1.15 Modify the input stream constructor for Graph to also allow adjacency lists from standard
  // input (in a manner similar to SymbolGraph), as in
  // the example tinyGadj.txt shown at right. After
  // the number of vertices and edges, each line contains
  // a vertex and its list of adjacent vertices.

  // 4.1.16 The eccentricity of a vertex v is the the length of the shortest path from that vertex
  // to the furthest vertex from v. The diameter of a graph is the maximum eccentricity
  // of any vertex. The radius of a graph is the smallest eccentricity of any vertex. A center is
  // a vertex whose eccentricity is the radius. Implement the following API:
})
