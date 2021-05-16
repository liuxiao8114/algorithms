import { Digraph, DirectDFS, DirectCycle } from '../../src/graph/Digraph'

describe('digraph test cases', () => {
  it('test the sample input case in book', () => {
    /*
    1st line: V
    2nd line: E
    3rd line~: from to
    */
    const input =
      `13
      22
      4 2
      2 3
      3 2
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
      8 7
      5 4
      0 5
      6 4
      6 9
      7 6`

    const g = new Digraph(input)

    expect(g.adj[0]).toEqual(new Set([ 1, 5 ]))
    const dfs = new DirectDFS(g, 0)
  })

  it('test cycle input', () => {
    const cycleInput =
      `6
       4
       0 5
       3 5
       4 3
       5 4
       `

    const g = new Digraph(cycleInput)
    const gCycle = new DirectCycle(g)

    expect(gCycle.hasCycle()).toBe(true)
  })
})
