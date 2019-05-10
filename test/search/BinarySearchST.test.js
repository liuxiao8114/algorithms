import BinarySearchST from '../../src/search/BinarySearchST'
import frequencyCounter from '../../src/search/utils'

const TEXT_PATH = `test/search/littleWords.txt`
const TEXT = `e d c b a`
const MAX_WORD = `was`

describe('BinarySearchST test cases', () => {
  it('use frequencyCounter to get the max', done => {
    const st = new BinarySearchST()
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

  it('could get value from st', () => {
    const st = new BinarySearchST()
    st.keys = TEXT.split(/s+/)
  })

  it('could put key-value in st', () => {
    const st = new BinarySearchST()
    const words = TEXT.split(/s+/)
    let i = 0
    for(let word of words)
      st.put(word, i++)
    expect()
  })

})
