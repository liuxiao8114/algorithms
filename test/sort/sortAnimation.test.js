import animateSortRaw from '../../src/sort/sortAnimation'

describe('interator insertion test', () => {
  const fillRect = jest.fn()

  const ctx = { fillRect }
  const { less, exch } = animateSortRaw(ctx, 900, 500)

  it('sorted and adj less', () => {
    const a = [ 0, 1, 2, 3, 4, 5 ]
    const b = [ 5, 4, 3, 2, 1, 0 ]

    for(let i = 0; i < 5; i++) {
      const genA = less(a, i, i + 1)
      const genB = less(b, i, i + 1)

      genA.next() // ctx.fillRect
      expect(genA.next().value).toBe(true)
      expect(genA.next().done).toBe(true)

      genB.next() // ctx.fillRect
      expect(genB.next().value).toBe(false)
      expect(genB.next().done).toBe(true)
    }
    
    expect(fillRect.mock.calls.length).toBe(20)
  })

  it('sorted and adj exch', () => {
    const a = [ 0, 1, 2, 3, 4, 5 ]

    let genA

    for(let i = 0; i < 5; i++) {
      genA = exch(a, i, i + 1)

      genA.next() // ctx.fillRect
      genA.next() // done: true
    }

    for(let i = 0; i < 5; i++)
      expect(a[i]).toBe(i + 1)
  })
})
