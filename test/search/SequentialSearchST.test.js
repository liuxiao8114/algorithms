import SequentialSearchST from '../../src/search/SequentialSearchST'
import { frequencyCounter } from '../../src/search/utils'

describe('sequential search symbol table(which is unordered) test cases', () => {
  const TINY = `${__dirname}/_data/tinyTale`
  const TINY_MAX_WORD = 'of'
  const TINY_MAX_COUNT = 10

  it('tests searchexample', () => {
    const st = new SequentialSearchST()
                 // `0123456789012`
    const example = `SEARCHEXAMPLE`
    /*
    S:  S
    E:  ES
    A:  AES
    R:  RAES
    C:  CRAES
    H:  HCRAES
    E:  HCRAES
    X:  XHCRAES
    A:  XHCRAES
    M:  MXHCRAES
    P:  PMXHCRAES
    L:  LPMXHCRAES
    E:  LPMXHCRAES
    */

    for(let i = 0; i < example.length; i++)
      st.put(example[i], i)

    expect(st.get('S')).toBe(0)
    expect(st.get('E')).toBe(12)
    expect(st.get('A')).toBe(8)
  })

  it('tests tiny', done => {
    const st = new SequentialSearchST()

    const maxCounter = () => {
      let max = null
      for(let item of st.items())
        if(!max || item.value > max.value) max = item
      expect(max).toEqual({ key: TINY_MAX_WORD, value: TINY_MAX_COUNT })
      done()
    }

    frequencyCounter(TINY, st, maxCounter)
  })
})
