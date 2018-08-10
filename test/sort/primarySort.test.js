import { insertion, selection } from '../../src/sort/primarySort'

function range(from, to) {
  return Math.floor(Math.random() * (to - from) + from)
}


describe('insertion test', () => {
  it('iterator custom 0 - 16 array and sort', () => {
    const a = [ 15, 8, 2, 3, 6, 11, 10, 1, 12, 16, 14, 7, 13, 4, 9, 0, 5 ]
    insertion.sort(a)
    for(let i = 0; i < 17; i++) {
      expect(a[i]).toBe(i)
    }
  })

  it('iterator random 100 number and sort', () => {
    const a_100 = []

    for(let i = 0; i < 100; i++) {
      a_100.push(range(1, 500))
    }

    insertion.sort(a_100)

    expect(Math.min(...a_100)).toEqual(a_100[0])
    expect(Math.max(...a_100)).toEqual(a_100[99])
  })

  it('recursive custom 0 - 16 array and sort', () => {
    const a = [ 15, 8, 2, 3, 6, 11, 10, 1, 12, 16, 14, 7, 13, 4, 9, 0, 5 ]
    insertion.sortRecursive(a)
    for(let i = 0; i < 17; i++) {
      expect(a[i]).toBe(i)
    }
  })

  it('recursive random 100 number and sort', () => {
    const a_100 = []

    for(let i = 0; i < 100; i++) {
      a_100.push(range(1, 500))
    }

    insertion.sortRecursive(a_100)

    expect(Math.min(...a_100)).toEqual(a_100[0])
    expect(Math.max(...a_100)).toEqual(a_100[99])
  })

  it('sort drawing DESC 0 - 9 array and sort ASC', () => {
    const fillRect = jest.fn(),
          ctx = { fillRect },
          WIDTH = 900,
          HEIGHT = 500

    const a = [ 4, 3, 2, 1, 0 ]
    const generator = insertion.drawSorting(a, ctx, WIDTH, HEIGHT)

    for(let i = 0; i < 21; i++) {
      let next = generator.next() // ctx.fillRect
      expect(next.value).toBeUndefined()
      expect(next.done).toBe(i === 20)
    }

    for(let i = 0; i < 5; i++)
      expect(a[i]).toBe(i)
  })

  it('should no exch sort drawing ASC 0 - 9 array and sort ASC', () => {
    const fillRect = jest.fn(),
          ctx = { fillRect },
          WIDTH = 900,
          HEIGHT = 500

    const a = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
    const generator = insertion.drawSorting(a, ctx, WIDTH, HEIGHT)

    for(let i = 0; i < 10; i++) {
      let next = generator.next()
      expect(next.done).toBe(i === 9)
      expect(a[i]).toBe(i)
    }
  })
})

describe('selection test', () => {
  it('iterator custom 0 - 16 array and sort', () => {
    const a = [ 15, 8, 2, 3, 6, 11, 10, 1, 12, 16, 14, 7, 13, 4, 9, 0, 5 ]
    selection.sort(a)
    for(let i = 0; i < 17; i++) {
      expect(a[i]).toBe(i)
    }
  })

  it('iterator random 100 number and sort', () => {
    const a_100 = []

    for(let i = 0; i < 100; i++) {
      a_100.push(range(1, 500))
    }

    selection.sort(a_100)

    expect(Math.min(...a_100)).toEqual(a_100[0])
    expect(Math.max(...a_100)).toEqual(a_100[99])
  })

  it('recursive custom 0 - 16 array and sort', () => {
    const a = [ 15, 8, 2, 3, 6, 11, 10, 1, 12, 16, 14, 7, 13, 4, 9, 0, 5 ]
    selection.sortRecursive(a)
    for(let i = 0; i < 17; i++) {
      expect(a[i]).toBe(i)
    }
  })

  it('recursive random 100 number and sort', () => {
    const a_100 = []

    for(let i = 0; i < 100; i++) {
      a_100.push(range(1, 500))
    }

    selection.sortRecursive(a_100)

    expect(Math.min(...a_100)).toEqual(a_100[0])
    expect(Math.max(...a_100)).toEqual(a_100[99])
  })

})
