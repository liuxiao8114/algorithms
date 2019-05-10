import { swim, sink, MinPQ } from '../../src/sort/utils'

function range(from, to) {
  return Math.floor(Math.random() * (to - from) + from)
}

describe('__utils test cases', () => {
  it('swims desc bottom to top', () => {
    const a = [ null, 7, 6, 5, 4, 3, 2, 1 ]
    swim(a, 7)
    expect(a[1]).toBe(1)
  })

  it('not swims asc', () => {
    const a = [ null, 1, 2, 3, 4, 5, 6, 7 ]
    swim(a, 7)
    expect(a[1]).toBe(1)
  })

  it('sink asc bottom to top', () => {
    const a = [ null, 1, 2, 3, 4, 5, 6, 7 ]
    sink(a, 1)
    expect(a[1]).toBe(1)
  })

  it('not swims asc', () => {
    const a = [ null, 7, 3, 5, 1, 2, 4, 6 ]
    sink(a, 1)
    expect(a[1]).toBe(3)
  })
})

describe('MinPQ test cases', () => {
  let m

  beforeEach(() => {
    m = new MinPQ()
  })

  it('should get right size, isEmpty, min', () => {
    m.insert(4, 3, 2, 1)
    expect(m.size()).toBe(4)
    expect(m.isEmpty()).toBe(false)
    expect(m.min()).toBe(1)
    expect(m.delMin()).toBe(1)
    expect(m.min()).toBe(2)
  })

  it('can accumulate all', () => {
    m.insert(1, 5, 2, 4, 6, 9, 8, 7, 3)

    while(m.size() > 1) {
      let x = m.delMin(),
          y = m.delMin()
      m.insert(x + y)
    }

    expect(m.delMin()).toBe(45)

    m = new MinPQ()
    m.insert(8, 4, 2, 1)

    while(m.size() > 1) {
      let x = m.delMin(),
          y = m.delMin()
      m.insert(x + y)
    }

    expect(m.delMin()).toBe(15)
  })

  it('random 100 numbers and get root equals to min', () => {
    const a_100 = []

    for(let i = 0; i < 100; i++)
      a_100.push(range(1, 500))

    m.insert(...a_100)

    expect(Math.min(...a_100)).toEqual(m.min())
  })
})
