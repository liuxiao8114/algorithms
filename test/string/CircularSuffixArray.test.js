import { CircularSuffixArray } from '../../src/string/CircularSuffixArray'

describe('SuffixArray test cases', () => {
  const txt_1 = 'ABRACADABRA!'
  const EXPECT_SORTED_SUFFIX_TEXT_1 = [
    '!ABRACADABRA',
    'A!ABRACADABR',
    'ABRA!ABRACAD',
    'ABRACADABRA!',
    'ACADABRA!ABR',
    'ADABRA!ABRAC',
    'BRA!ABRACADA',
    'BRACADABRA!A',
    'CADABRA!ABRA',
    'DABRA!ABRACA',
    'RA!ABRACADAB',
    'RACADABRA!AB'
  ]
  const EXPECT_SORTED_SUFFIX_INDEX_1 = [ 11, 10, 7, 0, 3, 5, 8, 1, 4, 6, 9, 2 ]

  const txt_2 = 'AABBABBAAB'
  const EXPECT_SORTED_SUFFIX_TEXT_2 = []
  it('length equals txt_1 length', () => {
    let suffices = new CircularSuffixArray(txt_1)
    expect(suffices.length()).toBe(txt_1.length)
  })

  it('SuffixArray sorted', () => {
    let suffices = new CircularSuffixArray(txt_1)
    for(let i = 0; i < suffices.length(); i++)
      expect(suffices.select(i)).toBe(EXPECT_SORTED_SUFFIX_TEXT_1[i])
  })

  it('returns ABRACADABRA! sorted index to original suffix', () => {
    let suffices = new CircularSuffixArray(txt_1)
    for(let i = 0; i < suffices.length(); i++)
      expect(suffices.index(i)).toBe(EXPECT_SORTED_SUFFIX_INDEX_1[i])
  })

  it('returns AABBABBAAB sorted index to original suffix', () => {
    let suffices = new CircularSuffixArray(txt_2)
//    for(let i = 0; i < suffices.length(); i++)
      expect(suffices.index(5)).toBe(6)
  })
})
