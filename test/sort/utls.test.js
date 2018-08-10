import { MinPQ } from '../../src/sort/utils'

function range(from, to) {
  return Math.floor(Math.random() * (to - from) + from)
}

describe('MinPQ test cases', () => {
  let m
  
  beforeEach(() => {
    m = new MinPQ()
  })

  it('should get right size, isEmpty, min', () => {
    m.insert([ 4, 3, 2, 1 ])
    expect(m.size()).toBe(4)
    expect(m.isEmpty()).toBe(false)
    expect(m.min()).toBe(1)
    m.delMin()
    expect(m.min()).toBe(2)
  })

  it('random 100 numbers and get root equals to min', () => {
    const a_100 = []

    for(let i = 0; i < 100; i++) {
      a_100.push(range(1, 500))
    }

    m.insert(a_100)

    expect(Math.min(...a_100)).toEqual(m.min())
  })
})
