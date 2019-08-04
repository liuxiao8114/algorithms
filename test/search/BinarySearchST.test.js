import BinarySearchArray from '../../src/search/BinarySearchArray'
import frequencyCounter from '../../src/search/utils'

const TEXT_PATH = `test/search/littleWords.txt`
const TEXT_KEYS = `e d c b a`
const MAX_WORD = `was`

describe('BinarySearchST test cases', () => {
  let st

  beforeEach(() => {
    st = new BinarySearchST()
  })

  it('could put key-value in st', () => {
    const words = TEXT_KEYS.split(' ')
    let i = 0
    for(let word of words)
      st.put(word, i++)
    const EXPECT_ARRAY = [ 4, 3, 2, 1, 0 ]
    expect(st.values).toEqual(EXPECT_ARRAY)
  })

  it('use frequencyCounter to get the max', done => {
>>>>>>> c2fd2459626ea8652583d3aa7004169bedfc13ad
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
})
