import frequencyCounter from '../../src/search/utils'
import SequentialSearchST from '../../src/search/SequentialSearchST'

const LITTLE_WORDS_TEXT_PATH = `test/search/littleWords.txt`
const LITTLE_WORDS_MAX_WORD = `was`
const LITTLE_WORDS_MAX_COUNT = 3

describe('utils test cases', () => {
  it('gives counts for ST testing', done => {
    const st = new SequentialSearchST()
    const maxCounter = () => {
      let max = null
      for(let item of st.items())
        if(!max || item.value > max.value) max = item
      expect(max).toEqual({ key: LITTLE_WORDS_MAX_WORD, value: LITTLE_WORDS_MAX_COUNT })
      done()
    }
    frequencyCounter(LITTLE_WORDS_TEXT_PATH, st, maxCounter)
  })
})
