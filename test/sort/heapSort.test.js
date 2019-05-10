import { heap } from '../../src/sort/heapSort'

describe('heapSort test cases', () => {
  const SORTED_ARRAY = [ null, 1, 2, 3, 4, 5 ]

  it('sort as sorted desc', () => {
    const DESC_ARRAY = [ null, 5, 4, 3, 2, 1 ]
    heap.sort(DESC_ARRAY)
    expect(DESC_ARRAY).toEqual(SORTED_ARRAY)
  })

  it('sort as sorted asc', () => {
    const ASC_ARRAY = [ null, 1, 2, 3, 4, 5 ]
    heap.sort(ASC_ARRAY)
    expect(ASC_ARRAY).toEqual(SORTED_ARRAY)
  })
})
