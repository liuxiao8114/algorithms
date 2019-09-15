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
    for(let i = 0; i < a.length; i++)
      st.put(a[i], i)

    expect(st.get('E')).toBe(6)
    expect(st.get('A')).toBe(1)
    expect(st.get('S')).toBe(7)
    expect(st.get('Y')).toBe(3)
    expect(st.get('Q')).toBe(4)
    expect(st.get('U')).toBe(5)
    expect(st.size()).toBe(10)
  })

  it('put in st in reverse', () => {
    // const a = [ 'g', 'f', 'e', 'd', 'c', 'b', 'a' ]
    const a = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ]
    for(let i = 0; i < a.length; i++)
      st.put(a[i], i)

    let result = 0
    expect(st.get('a')).toBe(result++)
    expect(st.get('b')).toBe(result++)
    expect(st.get('c')).toBe(result++)
    expect(st.get('d')).toBe(result++)
    expect(st.get('e')).toBe(result++)
    expect(st.get('f')).toBe(result++)
    expect(st.get('g')).toBe(result++)
    expect(st.size()).toBe(a.length)
    expect(st.max()).toBe(a.length)
    expect(st.min()).toBe(0)
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
