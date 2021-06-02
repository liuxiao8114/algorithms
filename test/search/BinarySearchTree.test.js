import BinarySearchTree from '../../src/search/BinarySearchTree'
import { frequencyCounter } from '../../src/search/utils'

describe('BinarySearchTree test cases', () => {
  it('tests searchexample', () => {
    const st = new BinarySearchTree()
                 // `0123456789012`
    const example = `SEARCHEXAMPLE`

    for(let i = 0; i < example.length; i++)
      st.put(example[i], i)

    /*
    S:          S(0)

    E:          S(0)
              /
            E(1)

    A:          S(0)
              /
            E(1)
            /
          A(2)

    R:          S(0)
              /
            E(1)
            / \
          A(2) R(3)

    C:          S(0)
              /
            E(1)
            / \
          A(2) R(3)
           \
            C4

    H:          S(0)
              /
            E(1)
            / \
          A(2) R(3)
           \   /
           C4 H5

    E:          S(0)
              /
            E(6)
            / \
          A(2) R(3)
           \   /
           C4 H5

    X:          S(0)
              /      \
            E(6)     X(7)
            / \
          A(2) R(3)
           \   /
           C4 H5

    A:          S(0)
              /      \
            E(6)     X(7)
            / \
          A(8) R(3)
           \   /
           C4 H5

    M:          S(0)
              /      \
            E(6)     X(7)
            / \
          A(8) R(3)
           \   /
           C4 H5
               \
               M9

    P:          S(0)
              /      \
            E(6)     X(7)
            / \
          A(8) R(3)
           \   /
           C4 H5
               \
                M9
                 \
                 P10

    L:          S(0)
              /      \
            E(6)     X(7)
            / \
          A(8) R(3)
           \   /
           C4 H5
               \
                M9
               /  \
              L11 P10

    E:          S(0)                        10
              /      \                   /      \
            E(12)     X(7)             8         1
            / \                      /    \
          A(8) R(3)                 2      5
           \   /                     \    /
           C4 H5                      1  4
               \                          \
                M9                         3
               /  \                       / \
              L11 P10                    1   1
    */

    const sNode = st.getNode('S')
    expect(sNode.value).toBe(0)
    expect(sNode.N).toBe(10)

    const eNode = st.getNode('E')
    expect(eNode.value).toBe(12)
    expect(eNode.N).toBe(8)

    const aNode = st.getNode('A')
    expect(aNode.value).toBe(8)
    expect(aNode.N).toBe(2)

    expect(st.size(sNode)).toBe(10)
    expect(st.size(eNode)).toBe(8)
    expect(st.size(eNode.right)).toBe(5)
    expect(st.size(aNode)).toBe(2)
    expect(st.size(aNode.left)).toBe(0)

    expect(st.min().key).toBe('A')
    expect(st.max().key).toBe('X')

    expect(st.floor('A').key).toBe('A')
    expect(st.floor('E').key).toBe('E')
    expect(st.floor('L').key).toBe('L')
    expect(st.floor('S').key).toBe('S')
    expect(st.floor('X').key).toBe('X')

    expect(st.floor('B').key).toBe('A')
    expect(st.floor('U').key).toBe('S')
    expect(st.floor('O').key).toBe('M')
    expect(st.floor('Q').key).toBe('P')
    expect(st.floor('F').key).toBe('E')

    expect(st.ceiling('A').key).toBe('A')
    expect(st.ceiling('E').key).toBe('E')
    expect(st.ceiling('L').key).toBe('L')
    expect(st.ceiling('S').key).toBe('S')
    expect(st.ceiling('X').key).toBe('X')

    expect(st.ceiling('B').key).toBe('C')
    expect(st.ceiling('U').key).toBe('X')
    expect(st.ceiling('O').key).toBe('P')
    expect(st.ceiling('Q').key).toBe('R')
    expect(st.ceiling('F').key).toBe('H')

    expect(st.__rank('A')).toBe(0)
    expect(st.__rank('E')).toBe(2)
    expect(st.__rank('L')).toBe(4)
    expect(st.__rank('S')).toBe(8)
    expect(st.__rank('X')).toBe(9)

    expect(st.__rank('B')).toBe(1)
    expect(st.__rank('U')).toBe(9)
    expect(st.__rank('O')).toBe(6)
    expect(st.__rank('Q')).toBe(7)
    expect(st.__rank('F')).toBe(3)

    expect(st.rank('A')).toBe(0)
    expect(st.rank('E')).toBe(2)
    expect(st.rank('L')).toBe(4)
    expect(st.rank('S')).toBe(8)
    expect(st.rank('X')).toBe(9)

    expect(st.rank('B')).toBe(1)
    expect(st.rank('U')).toBe(9)
    expect(st.rank('O')).toBe(6)
    expect(st.rank('Q')).toBe(7)
    expect(st.rank('F')).toBe(3)

    expect(st.select(0)).toBe('A')
    expect(st.select(2)).toBe('E')
    expect(st.select(4)).toBe('L')
    expect(st.select(8)).toBe('S')
    expect(st.select(9)).toBe('X')
    expect(st.select(10)).toBeNull()

    const worstAscCase = `EHKNQTXZ`
    const worstAscBST = new BinarySearchTree()

    for(let i = 0; i < worstAscCase.length; i++)
      worstAscBST.put(worstAscCase[i], i)

    expect(worstAscBST.floorIterator('A').key).toBe('E')
    expect(worstAscBST.floor('A').key).toBe('E')
  })

  it('test deleteMin() and deleteMax()', () => {
    const st = new BinarySearchTree()
    const example = `SEARCHEXAMPLE`

    for(let i = 0; i < example.length; i++)
      st.put(example[i], i)

    expect(st.size()).toBe(10)
    expect(st.min().key).toBe('A')

    st.deleteMin()
    expect(st.size()).toBe(9)
    expect(st.min().key).toBe('C')

    st.deleteMin()
    expect(st.size()).toBe(8)
    expect(st.min().key).toBe('E')

    st.deleteMin()
    expect(st.size()).toBe(7)
    expect(st.min().key).toBe('H')

    expect(st.max().key).toBe('X')

    st.deleteMax()
    expect(st.size()).toBe(6)
    expect(st.max().key).toBe('S')

    st.deleteMax()
    expect(st.size()).toBe(5)
    expect(st.max().key).toBe('R')

    st.deleteMax()
    expect(st.size()).toBe(4)
    expect(st.max().key).toBe('P')

    st.deleteMax()
    expect(st.size()).toBe(3)
    expect(st.max().key).toBe('M')

    st.deleteMax() // 2
    st.deleteMax() // 1
    st.deleteMax() // 0
    expect(st.size()).toBe(0)
    expect(st.root).toBeNull()
  })

  it('test __deleteMin() and __deleteMax()', () => {
    const st = new BinarySearchTree()
    const example = `SEARCHEXAMPLE`

    for(let i = 0; i < example.length; i++)
      st.put(example[i], i)

    expect(st.size()).toBe(10)
    expect(st.min().key).toBe('A')

    st.__deleteMin()
    expect(st.size()).toBe(9)
    expect(st.min().key).toBe('C')

    st.__deleteMin()
    expect(st.size()).toBe(8)
    expect(st.min().key).toBe('E')

    st.__deleteMin()
    expect(st.size()).toBe(7)
    expect(st.min().key).toBe('H')

    expect(st.max().key).toBe('X')

    st.__deleteMax()
    expect(st.size()).toBe(6)
    expect(st.max().key).toBe('S')

    st.__deleteMax()
    expect(st.size()).toBe(5)
    expect(st.max().key).toBe('R')

    st.__deleteMax()
    expect(st.size()).toBe(4)
    expect(st.max().key).toBe('P')

    st.__deleteMax()
    expect(st.size()).toBe(3)
    expect(st.max().key).toBe('M')

    st.__deleteMax() // 2
    st.__deleteMax() // 1
    st.__deleteMax() // 0
    expect(st.size()).toBe(0)
    expect(st.root).toBeNull()
  })

  it('test delete(key)', () => {
    const st = new BinarySearchTree()
    const example = `SEARCHEXAMPLE`

    for(let i = 0; i < example.length; i++)
      st.put(example[i], i)

    /*
    E:          S(0)                        10
              /      \                   /      \
            E(12)     X(7)             8         1
            / \                      /    \
          A(8) R(3)                 2      5
           \   /                     \    /
           C4 H5                      1  4
               \                          \
                M9                         3
               /  \                       / \
              L11 P10                    1   1

    delete root
    delete leaf
    delete node has one branch(left or right)
    delete node has both branches: E, M

    */


  })
})
