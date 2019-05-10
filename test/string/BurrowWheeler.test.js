import { transform, inverseTransform } from '../../src/string/BurrowsWheeler'

describe('BurrowWheeler test cases', () => {
  it('BurrowsWheeler transform', () => {
    const txt = 'ABRACADABRA!'
    const EXPECT_SORTED_SUFFIX_END = [ 'A', 'R', 'D', '!', 'R', 'C', 'A', 'A', 'A', 'A', 'B', 'B' ]
    const { startAt, t } = transform(txt)

    expect(startAt).toBe(3)
    expect(t).toEqual(EXPECT_SORTED_SUFFIX_END)
  })

  it('BurrowsWheeler inverseTransform', () => {
    const EXPECT_TXT = 'ABRACADABRA!'
    const end = [ 'A', 'R', 'D', '!', 'R', 'C', 'A', 'A', 'A', 'A', 'B', 'B' ]
    const origin = inverseTransform({ startAt: 3, t: end })

    expect(origin).toEqual(EXPECT_TXT)
  })
})
