import { encode, decode, arrayCopy } from '../../src/string/MoveToFront'

describe('MoveToFront test cases', () => {

  it('can join src and tar arrays', () => {
    const src = [ 0, 1, 2 ],
          tar = [ 2, 3, 4 ]

    arrayCopy(src, 0, tar, 3, 3)
    expect(src).toEqual([0, 1, 2])
    expect(tar).toEqual([2, 3, 4, 0, 1, 2])
  })

  it('rewrite target array', () => {
    const src = [ 0, 1, 2, 3, 4, 5 ],
          tar = [ 0, 1, 2, 3, 4, 5 ]

    arrayCopy(src, 0, src, 1, 5)
    expect(src).toEqual([ 0, 0, 1, 2, 3, 4 ])

    arrayCopy(tar, 1, tar, 0, 5)
    expect(tar).toEqual([ 1, 2, 3, 4, 5, 5 ])
  })

  it('an copyWithin test', () => {
    const src = [ 0, 1, 2, 3, 4, 5, 6 ]
    expect(src.copyWithin(1, 0, 6)).toEqual([ 0, 0, 1, 2, 3, 4, 5 ])
  })

  it('encode string and decode it', () => {
    const EXPECT_TXT = 'ABRACADABRA!'
    expect(decode(encode(EXPECT_TXT))).toEqual(EXPECT_TXT)
  })
})
