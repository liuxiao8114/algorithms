import sortRaw from './sortRaw'
import animateSortRaw from './sortAnimation'

function checkParams(a) {
  if(!a) throw new Error('no param passed in sort')
  if(!Array.isArray(a)) throw new Error('only array can be sort')
}

const ALWAYS_TRUE = true

const quick = sortRaw()
quick.type = 'QUICK_SORT'
quick.sort = function(a) {
  function partition(a, lo, hi) {
    let v = lo,
        i = lo,
        j = hi + 1

    while(ALWAYS_TRUE) {
      while(quick.less(a, ++i, v)) if(i === hi) break
      while(quick.less(a, v, --j)) if(j === lo) break
      if(i >= j) break
      quick.exch(a, i, j)
    }

    quick.exch(a, lo, j)
    return j
  }

  const iter = function(a, lo, hi) {
    if(hi <= lo) return
    let k = partition(a, lo, hi)
    iter(a, lo, k - 1)
    iter(a, k + 1, hi)
  }

  iter(a, 0, a.length - 1)
}

quick.drawSorting = function(a, ctx, w, h) {
  checkParams(a)

  function* partition(a, lo, hi) {
    let i = lo,
        j = hi + 1

    while(ALWAYS_TRUE) {
      while(yield* animateSort.less(a, ++i, lo)) if(i === hi) break
      while(yield* animateSort.less(a, lo, --j)) if(j === lo) break
      if(i >= j) break
      yield* animateSort.exch(a, i, j)
    }

    yield* animateSort.exch(a, lo, j)
    return j
  }

  const animateSort = animateSortRaw(ctx, w, h)

  const iter = function*(a, lo, hi) {
    if(hi <= lo) return
    let k = yield* partition(a, lo, hi)

    yield* iter(a, lo, k - 1)
    yield* iter(a, k + 1, hi)
  }

  return iter(a, 0, a.length - 1)
}

quick.sortInThreeway = function(a) {
  const iter = (a, lo, hi) => {
    if(hi <= lo) return
    let lt = lo,
        ht = hi,
        i = lo + 1

    while(i <= ht) {
      if(quick.less(a, i, lt)) quick.exch(a, i++, lt++)
      else if(quick.less(a, lt, i)) quick.exch(a, i, ht--)
      else i++
    }

    iter(a, lo, lt - 1)
    iter(a, ht + 1, hi)
  }
  iter(a, 0, a.length - 1)
}

export default quick

/*
const a = [ 15, 8, 2, 3, 6, 11, 10, 1, 12, 19, 14, 7, 13, 4, 9, 5 ]

function range(from, to) {
  return Math.floor(Math.random() * (to - from) + from)
}

const a_100 = []

for(let i = 0; i < 100; i++) {
  a_100.push(range(1, 500))
}

//test
quick.setArr(a_100)
quick.show(ctx)
quick.sortInThreeway()
quick.clearAndReshow()
// function drawNext() { sort.next() }
// document.addEventListener('click', drawNext)

// setInterval(drawNext, 100)

*/
