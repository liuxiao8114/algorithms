import BinarySearchTree from '../../src/search/BinarySearchTree'
import frequencyCounter from '../../src/search/utils'

const TEXT_PATH = `test/search/littleWords.txt`
const TEST_KEYS_ORDERED = `a b c d e`
const TEST_KEYS_REPEATED = `e d c b a a b c d e`
const TEST_VALUES = [ 0, 1, 2, 3, 4 ]
const MAX_WORD = `was`

describe('BinarySearchST test cases', () => {
  it('could put key-value in st', () => {
    const st = new BinarySearchTree()
    st.put('a', 0)
    st.put('b', 1)
    expect(st.get('b')).toBe(1)
    expect(st.get('c')).toBe(null)
    /*
    const words = TEST_KEYS_REPEATED.split(/\s+/)
    let i = 0, j = 5
    for(let word of words)
      st.put(word, i++)
    for(let key of words)
      expect(st.get(key)).toBe(j++)
    */

  })
/*
it('could get value from st', () => {
  const st = new BinarySearchTree()
  st.keys = TEST_KEYS_ORDERED.split(/\s+/)
  st.values = TEST_VALUES
  let i = 0
  for(let key of st.keys)
    expect(st.get(key)).toBe(i++)
})

it('use frequencyCounter to get the max', done => {
  const st = new BinarySearchTree()
  const maxCounter = () => {
    let maxIndex = 0
    const len = st.keys.length
    for(let i = 0; i < len; i++)
      if(st.values[i] > st.values[maxIndex]) maxIndex = i
    expect(st.keys[maxIndex]).toEqual(MAX_WORD)
    expect(st.values[maxIndex]).toEqual(3)
    done()
  }
  frequencyCounter(TEXT_PATH, st, maxCounter)
})
*/
})
