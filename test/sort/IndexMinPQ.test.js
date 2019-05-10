import { IndexMinPQ } from '../../src/sort/IndexMinPQ'

describe('IndexMinPQ test cases', () => {
  let m

  beforeEach(() => {
    m = new IndexMinPQ()
    m.insert(1, 108)
    m.insert(2, 107)
    m.insert(3, 106)
    m.insert(4, 105)
    m.insert(8, 101) // minIndex = 8
    m.insert(7, 102)
    m.insert(6, 103)
    m.insert(5, 104)
  })

  it('should get right size, isEmpty, min', () => {
    expect(m.size()).toBe(8)
    expect(m.isEmpty()).toBe(false)
    expect(m.min()).toBe(101)
    expect(m.minIndex()).toBe(8)
  })
  
  it('insert swim and get new min', () => {
    m.insert(10, 100)
    expect(m.min()).toBe(100)
    expect(() => { m.insert(10, 99) }).toThrow()
  })
})
