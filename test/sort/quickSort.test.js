import quick from '../../src/sort/quickSort'
import animateSortRaw from '../../src/sort/sortAnimation'

function range(from, to) {
  return Math.floor(Math.random() * (to - from) + from)
}

describe('quickSort test', () => {
  it('sort custom 0 - 16 array', () => {
    const a = [ 15, 8, 2, 3, 6, 11, 10, 1, 12, 16, 14, 7, 13, 4, 9, 0, 5 ]
    quick.sort(a)
    for(let i = 0; i < 17; i++) {
      expect(a[i]).toBe(i)
    }
  })

  it('sort custom 0 - 5 array with sortX\'s insertion', () => {
    const a = [ 4, 0, 2, 1, 3 ]
    quick.sortX(a)
    for(let i = 0; i < 5; i++) {
      expect(a[i]).toBe(i)
    }
  })

  it('sort custom 0 - 16 array with sortX', () => {
    const a = [ 15, 8, 2, 3, 6, 11, 10, 1, 12, 16, 14, 7, 13, 4, 9, 0, 5 ]
    quick.sortX(a)
    for(let i = 0; i < 17; i++) {
      expect(a[i]).toBe(i)
    }
  })

  it('sort random 100 numbers', () => {
    const a_100 = []

    for(let i = 0; i < 100; i++) {
      a_100.push(range(1, 500))
    }

    quick.sort(a_100)

    expect(Math.min(...a_100)).toEqual(a_100[0])
    expect(Math.max(...a_100)).toEqual(a_100[99])
  })

  it('drawSorting iterator custom 0 - 16 array and sort', () => {
    const a = [ 15, 8, 2, 3, 6, 11, 10, 1, 12, 16, 14, 7, 13, 4, 9, 0, 5 ]
    const ctx = { fillRect: jest.fn(), fillStyle: jest.fn() }
    const { less, exch } = animateSortRaw(ctx, 900, 500)
    quick.sort(a)
    for(let i = 0; i < 17; i++) {
      expect(a[i]).toBe(i)
    }
  })

  it('does three way sorting -- iterator custom 0 - 16 array and sort', () => {
    const a = [ 15, 8, 2, 3, 6, 11, 10, 1, 12, 16, 14, 7, 13, 4, 9, 0, 5 ]
    quick.sortInThreeway(a)
    for(let i = 0; i < 17; i++) {
      expect(a[i]).toBe(i)
    }
  })

  it('does three way sorting -- iterator random 100 number and sort', () => {
    const a_100 = []

    for(let i = 0; i < 100; i++) {
      a_100.push(range(1, 500))
    }

    quick.sortInThreeway(a_100)

    expect(Math.min(...a_100)).toEqual(a_100[0])
    expect(Math.max(...a_100)).toEqual(a_100[99])
  })
})
