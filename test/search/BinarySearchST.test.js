import BinarySearchST from '../../src/search/BinarySearchST'
import { frequencyCounter } from '../../src/search/utils'

describe('BinarySearchST test cases', () => {
  it('use frequencyCounter to get the max', done => {
    const TEXT_PATH = `test/search/_data/littleWords`
    const MAX_WORD = `was`
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

  it('tests searchexample', () => {
    const st = new BinarySearchST()
                 // `0123456789012`
    const example = `SEARCHEXAMPLE`

    /*
    S: S
    E: ES
    A: AES
    R: AERS
    C: ACERS
    H: ACEHRS
    E: ACEHRS
    X: ACEHRSX
    A: ACEHRSX
    M: ACEHMRSX
    P: ACEHMPRSX
    L: ACEHLMPRSX
    E: ACEHLMPRSX
    */

    for(let i = 0; i < example.length; i++)
      st.put(example[i], i)

      expect(st.get('S')).toBe(0)
      expect(st.get('E')).toBe(12)
      expect(st.get('A')).toBe(8)
  })

  it('tests tiny', done => {
    const TINY = `${__dirname}/_data/tinyTale`
    const TINY_MAX_WORD = 'it'
    const TINY_MAX_COUNT = 10

    const st = new BinarySearchST()

    const maxCounter = () => {
      let maxIndex = 0
      const len = st.keys.length

      for(let i = 0; i < len; i++)
        if(st.values[i] > st.values[maxIndex]) maxIndex = i
      // console.log(`st.keys: ${st.keys}, length: ${st.keys.length}`)
      // console.log(`st.values: ${st.values}, length: ${st.values.length}`)

      expect(st.keys[maxIndex]).toEqual(TINY_MAX_WORD)
      expect(st.values[maxIndex]).toEqual(TINY_MAX_COUNT)
      done()
    }

    frequencyCounter(TINY, st, maxCounter)
  })
})
