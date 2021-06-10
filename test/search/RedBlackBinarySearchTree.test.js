import RedBlackBinarySearchTree, { Node } from '../../src/search/RedBlackBinarySearchTree'

describe('RedBlackBinarySearchTree', () => {
  const example =     `SEARCHEXAMPLE`
  const ascExample =  `AACEEEHLMPRSX`
  const descExample = `XSRPMLHEEECAA`

  let st = null,
      ascSt = null,
      descSt = null

  beforeEach(() => {
    st = new RedBlackBinarySearchTree()
    ascSt = new RedBlackBinarySearchTree()
    descSt = new RedBlackBinarySearchTree()

    for(let i = 0; i < example.length; i++) {
      st.put(example[i], i)
      ascSt.put(ascExample[i], i)
      descSt.put(descExample[i], i)
    }
  })

  afterEach(() => st = ascSt = descSt = null)

  it('can get nodes', () => {
    const sNode = st.getNode('S')
    expect(sNode.value).toBe(0)
    // expect(st.root.N).toBe(10)
    // console.log(`${st.toString()}`)
  })
})
