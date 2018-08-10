import mergeSort, { __inner } from '../../src/sort/mergeSort'

function range(from, to) {
  return Math.floor(Math.random() * (to - from) + from)
}

describe('merge sort test', () => {
  it('should merge origin', () => {
    const a = [ 2,3,4,5,6,7,8,9,0,1 ]
    __inner.mergeOrigin(a, 0, 10, 7)

    for(let i = 0; i < 10; i++)
      expect(a[i]).toBe(i)
  })

  it('iterator custom 0 - 10 array and sort', () => {
    const a = [ 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ]
    mergeSort.sort(a)
    for(let i = 0; i < 9; i++) {
      expect(a[i]).toBe(i)
    }
  })

  it('iterator custom 0 - 16 array and sort', () => {
    const a = [ 15, 8, 2, 3, 6, 11, 10, 1, 12, 16, 14, 7, 13, 4, 9, 0, 5 ]
    mergeSort.sort(a)
    for(let i = 0; i < 17; i++) {
      expect(a[i]).toBe(i)
    }
  })

  it('iterator random 100 number and sort', () => {
    const a_100 = []

    for(let i = 0; i < 100; i++) {
      a_100.push(range(1, 500))
    }

    mergeSort.sort(a_100)

    expect(Math.min(...a_100)).toEqual(a_100[0])
    expect(Math.max(...a_100)).toEqual(a_100[99])
  })

  /*

  */
  it('sort drawing DESC 0 - 9 array and sort ASC', () => {
    const fillRect = jest.fn(),
          ctx = { fillRect },
          WIDTH = 900,
          HEIGHT = 500

    const a = [ 2, 1, 0 ]
    const generator = mergeSort.drawSorting(a, ctx, WIDTH, HEIGHT)

    /*

    for(let i = 0; i < 10; i++) {
      let next = generator.next()
      console.log('i: ' + i + ', value: ' + next.value + ', done: ' + next.done)
    }

    for(let i = 0; i < 21; i++) {
      let next = generator.next() // ctx.fillRect
      expect(next.value).toBeUndefined()
      expect(next.done).toBe(i === 20)
    }

    for(let i = 0; i < 5; i++)
      expect(a[i]).toBe(i)

      */
  })

})
