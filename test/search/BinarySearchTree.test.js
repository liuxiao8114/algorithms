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

  it('prepare', () => {
    const counts = []
    let i = 1
    for(let letter of TEST_3_2_1.split(/\s+/)) {
      counts.push(st.put(letter, i++).counter)
    }

    console.log(counts)
    console.log(st.root)
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
