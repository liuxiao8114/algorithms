import { SuffixArray } from '../../src/string/SuffixArray'

describe('SuffixArray test cases', () => {
  const txt = 'ABRACADABRA!'
  const suffices = new SuffixArray(txt)
  const EXPECT_SORTED_SUFFIX_TEXT = [
    '!',
    'A!',
    'ABRA!',
    'ABRACADABRA!',
    'ACADABRA!',
    'ADABRA!',
    'BRA!',
    'BRACADABRA!',
    'CADABRA!',
    'DABRA!',
    'RA!',
    'RACADABRA!'
  ]
  const EXPECT_SORTED_SUFFIX_INDEX = [ 11, 10, 7, 0, 3, 5, 8, 1, 4, 6, 9, 2 ]

  it('length equals txt length', () => {
    expect(suffices.length()).toBe(txt.length)
  })

  it('SuffixArray sorted', () => {
    for(let i = 0; i < suffices.length(); i++)
      expect(suffices.select(i)).toBe(EXPECT_SORTED_SUFFIX_TEXT[i])
  })

  it('returns index to original suffix', () => {
    for(let i = 0; i < suffices.length(); i++)
      expect(suffices.index(i)).toBe(EXPECT_SORTED_SUFFIX_INDEX[i])
  })
})
