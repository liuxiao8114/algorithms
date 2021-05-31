import BinarySearchTree from '../../src/search/BinarySearchTree'
import { frequencyCounter } from '../../src/search/utils'

describe('BinarySearchTree test cases', () => {
  it('tests searchexample', () => {
    const st = new BinarySearchTree()
                 // `0123456789012`
    const example = `SEARCHEXAMPLE`

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
               / \
              L11 P10

    E:          S(0)
              /      \
            E(12)     X(7)
            / \
          A(8) R(3)
           \   /
           C4 H5
               \
                M9
               / \
              L11 P10
    */

    for(let i = 0; i < example.length; i++)
      st.put(example[i], i)

    expect(st.get('S')).toBe(0)
    expect(st.get('E')).toBe(12)
    expect(st.get('A')).toBe(8)
  })
})
