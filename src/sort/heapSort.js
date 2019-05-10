import sortRaw from './sortRaw'
import animateSortRaw from './sortAnimation'

export const heap = sortRaw()
heap.sink = (a, i, len) => {
  if(!len) len = a.length - 1
  if(i * 2 > len) return
  let j = i * 2
  if(j + 1 <= len && heap.less(a, j, j + 1)) j++
  if(heap.less(a, i, j)) {
    heap.exch(a, i, j)
    heap.sink(a, j, len)
  }
}

heap.sort = a => {
  if(!Array.isArray(a))
    throw new Error(`only sort array but receive ${typeof a}`)

  let n = a.length - 1,
      k = Math.floor(n / 2)

  // heap construction
  for(; k > 0; k--)
    heap.sink(a, k, n)
/*
      5
  6       7
1   3   8   9

*/
  // sortdown
  while(n > 1) {
    heap.exch(a, 1, n--)
    heap.sink(a, 1, n)
  }
}

heap.drawSorting = function*(a, ctx, w, h, style) {
  function *sink(a, i, len) {
    if(!len) len = a.length - 1
    if(i * 2 > len) return
    let j = i * 2
    if(j + 1 <= len && (yield animateSort.less(a, j, j + 1))) j++
    if(yield animateSort.less(a, i, j)) {
      yield animateSort.exch(a, i, j)
      yield* sink(a, j, len)
    }
  }

  if(!Array.isArray(a))
    throw new Error(`only sort array but receive ${typeof a}`)
  const animateSort = animateSortRaw(ctx, w, h, style)
  let n = a.length - 1,
      k = Math.floor(n / 2)

  // heap construction
  for(; k > 0; k--)
    yield* sink(a, k, n)
  // sortdown
  while(n > 1) {
    animateSort.exch(a, 1, n--)
    yield* sink(a, 1, n)
  }
}
