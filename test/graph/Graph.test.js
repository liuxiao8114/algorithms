import assert from 'assert'
import { Graph, DFS, Paths, BreathFirstPaths, CC, Cycle } from '../../src/graph/Graph'

describe('graph test cases', () => {
  /*
  1st line: V
  2nd line: E
  3rd line~: from to
  */
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

  const tinyCG =
  `6
  8
  0 5
  2 4
  2 3
  1 2
  0 1
  3 4
  3 5
  0 2`

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

  const cycleInput =
    `6
     4
     0 5
     3 5
     4 3
     5 4`
  const cycleInput2 =
    `6
     6
     0 5
     3 5
     4 3
     1 5
     1 6
     1 3`

  const noCycleInput =
   `6
    5
    0 5
    3 5
    4 3
    1 5
    1 6
    `
  const noCycleInput2 =
   `6
    5
    0 5
    3 5
    4 3
    1 5
    1 6
    `

  it('test the sample input case in book', () => {
    const g = new Graph(input)

    expect(g.adj[0]).toEqual(new Set([ 6, 1, 2, 5 ]))
    // const dfs = new DirectDFS(g, 0)
  })

  it('test dfs path', () => {
    let g = new Graph(tinyCG)
    let dfsPath = new Paths(g, 0)

    expect(dfsPath.hasPathTo(3)).toBe(true)
    expect(dfsPath.pathTo(3)).toEqual(
      [3, 5, 0]
    )

    g = new Graph(input)
    dfsPath = new Paths(g, 0)

    expect(dfsPath.hasPathTo(12)).toBe(true)
    // expect(dfsPath.pathTo(12)).toEqual(
    //   [12, 5, 0]
    // )
  })

  it('test bfs path', () => {
    const g = new Graph(input)
    const bfsPath = new BreathFirstPaths(g, 0)

    expect(bfsPath.hasPathTo(12)).toBe(true)
    expect(bfsPath.pathTo(12)).toEqual(
      [12, 9, 6, 0]
    )
  })

  it('test CC', () => {
    const g = new Graph(tinyG)
    const cc = new CC(g)

    expect(cc.count).toBe(3)
  })

  it('test cycle input', () => {
    const g = new Graph(cycleInput)
    const dfs = new DFS(g, 0)

    expect(dfs.count()).toBe(4)

    const path = new Paths(g, 0)
    expect(path.pathTo(3)).toEqual([3, 5, 0])

    const gCycle = new Cycle(g)
    expect(gCycle.hasCycle()).toBe(true)
  })
})
