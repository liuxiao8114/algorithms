import sortRaw from './sortRaw'
import animateSortRaw from './sortAnimation'

function checkParams(a) {
  if(!a) throw new Error('no param passed in')
  if(!Array.isArray(a)) throw new Error('only array can be sort')
}

/*
best(in order): compare: n, exch: 0
worst(reverse): compare: n(n - 1)/2, exch: n(n - 1)/2
*/
const insertion = sortRaw()

insertion.type = 'INSERTION_SORT'
insertion.sort = function(a) {
  checkParams(a)
  for(let i = 1; i < a.length; i++) {
    for(let j = i; j > 0 && insertion.less(a, j, j - 1); j--) {
      insertion.exch(a, j - 1, j)
    }
  }
}

//2.1.25
insertion.sortNoEdgeChk = function(a) {
  checkParams(a)
  let min = 0
  for(let i = 0; i < a.length; i++)
    if(a[i] < a[min]) min = i
  insertion.exch(a, 0, min)

  for(let i = 1; i < a.length; i++) {
    for(let j = i; insertion.less(a, j, j - 1); j--) {
      insertion.exch(a, j - 1, j)
    }
  }
}

insertion.drawSorting = function*(a, ctx, w, h) {
  checkParams(a)
  const { less, exch } = animateSortRaw(ctx, w, h)
  for(let i = 1; i < a.length; i++) {
    for(let j = i; j > 0 && (yield* less(a, j, j - 1)); j--)
      yield* exch(a, j - 1, j)
  }
}

insertion.sortRecursive = function(a) {
  checkParams(a)
  //const that = this
  let iter = (a, i, j) => {
    if(i === a.length) return
    if(j === 0 || !insertion.less(a, j, j - 1)) {
      return iter(a, ++i, i)
    }

    insertion.exch(a, j - 1, j)
    iter(a, i, --j)
  }

  iter(a, 1, 1)
}

insertion.drawRecursiveSorting = function(a, ctx, w, h) {
  checkParams(a)
  const animateSort = animateSortRaw(ctx, w, h)
  function* iter(a, i, j) {
    if(i === a.length) return
    if(j === 0 || !(yield* animateSort.less(a, j, j - 1))) {
      yield* iter(a, ++i, i)
    } else {
      yield* animateSort.exch(a, j - 1, j)
      yield* iter(a, i, --j)
    }
  }

  return iter(a, 1, 1) // Return is must to return the Generator Iterator
}

/*
best(in order): compare: n(n - 1)/2, exch: 0
worst(reverse): compare: n(n - 1)/2, exch: n
*/
const selection = sortRaw()

selection.type = 'SELECTION_SORT'
selection.sort = function(a) {
  checkParams(a)
  for(let i = 0; i < a.length; i++) {
    let min = i
    for(let j = i; j < a.length; j++) {
      if(selection.less(a, j, min)) min = j
    }
    selection.exch(a, i, min)
  }
}

selection.sortRecursive = function(a) {
  checkParams(a)
  function iter(a, i, j, min) {
    if(i === a.length - 1) return
    if(j > a.length - 1) {
      selection.exch(a, i, min)
      iter(a, ++i, i + 1, i)
    } else {
      if(selection.less(a, j, min))
        min = j
      iter(a, i, ++j, min)
    }
  }

  iter(a, 0, 1, 0)
}

selection.drawSorting = function*(a, ctx, w, h) {
  checkParams(a)
  const animateSort = animateSortRaw(ctx, w, h)
  for(let i = 0; i < a.length; i++) {
    let min = i
    for(let j = i; j < a.length; j++) {
      if(yield* animateSort.less(a, j, min))
        min = j
    }
    yield* animateSort.exch(a, i, min)
  }
}

selection.drawRecursiveSorting = function*(a, ctx, w, h) {
  checkParams(a)
  const animateSort = animateSortRaw(ctx, w, h)
  for(let i = 0; i < a.length; i++) {
    let min = i
    for(let j = i; j < a.length; j++) {
      if(yield* animateSort.less(a, j, min))
        min = j
    }
    yield* animateSort.exch(a, i, min)
  }
}

export { insertion, selection }
