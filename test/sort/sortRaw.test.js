import sortRaw from '../../src/sort/sortRaw'

describe('sort raw tests', () => {
  let a, b, raw

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
    // console.log(quick.sortCompare(quick)(500, 100, quick.sort, quick.sortX))
  })

})
