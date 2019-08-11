import BinarySearchTree from '../../src/search/BinarySearchTree'
import frequencyCounter from '../../src/search/utils'

const TEXT_PATH = `test/search/littleWords.txt`
const TEST_3_2_1 = `E A S Y Q U E S T I O N`
const MAX_WORD = `was`

describe('BinarySearchTree test cases', () => {
  let st

  beforeEach(() => {
    st = new BinarySearchTree()
  })

  it('put in st', () => {
    const a = TEST_3_2_1.split(/\s+/)
    for(let i = 0; i < a.length; i++) {
      st.put(a[i], i)
    }

    const root = st.root
    expect(root.key).toBe('E')
    expect(root.left.key).toBe('A')

/*
expect(st.get('E')).toBe(6)
expect(st.get('A')).toBe(1)
expect(st.get('S')).toBe(7)
expect(st.get('Y')).toBe(3)
expect(st.get('Q')).toBe(4)
expect(st.get('U')).toBe(5)
*/

  })
})
