import sortRaw from '../../src/sort/sortRaw'
import { insertion, selection } from '../../src/sort/primarySort'
import quick from '../../src/sort/quickSort'
import mergeSort from '../../src/sort/mergeSort'
import shellSort from '../../src/sort/shellSort'

describe('sort raw tests', () => {
  let a, b, raw
  const N = 500,
        T = 100

  beforeEach(() => {
    raw = sortRaw()
    a = [ 0, 1, 2 ]
    b = new Array(3)
    b[0] = 0
    b[1] = 1
    b[2] = 2
  })

  it('1 less 2', () => {
    expect(raw.less(a, 1, 2)).toBe(true)
  })

  it('exch 1 & 2', () => {
    raw.exch(b, 1, 2)
    expect(b[1]).toBe(2)
    expect(b[2]).toBe(1)
  })

  it('compare insertion and selection', () => {
//    console.log(insertion.sortCompare(insertion)(N, T, insertion.sort, insertion.sortNoEdgeChk))
  })

})
