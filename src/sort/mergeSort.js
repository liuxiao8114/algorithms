import sortRaw from './sortRaw'
import { Queue } from './utils'

import { NO_CHECK, IN_COMPARE, IN_EXCHAGE,
         INIT_POSITION, BORDER, HEIGHT, PER_HEIGHT, STEP,
         NO_CONTEXT_ERROR } from '../constants'

function checkParams(a) {
  if(!a) throw new Error('no param passed in sort')
  if(!Array.isArray(a)) throw new Error('only array can be sort')
}

function innerInsertion(a, lo, hi) {
  for(let i = lo; i < hi; i++)
    for(let j = i + 1; j > lo && mergeSort.less(a, j, j - 1); j--)
      mergeSort.exch(a, j, j - 1)
}

const CUTOFF = 10,
      position = x => INIT_POSITION + STEP * x

export const __inner = {
  mergeOrigin(a, lo, hi, mid) {
    if(lo === hi) return
    let i = lo,
        j = mid + 1,
        aux = []

    for(let i = 0; i < a.length; i++)
      aux[i] = a[i]

    for(let k = lo; k <= hi; k++) {
      if(j > hi)
        a[k] = aux[i++]
      else if(i > mid)
        a[k] = aux[j++]
      else if(aux[j] < aux[i])
        a[k] = aux[j++]
      else
        a[k] = aux[i++]
    }
  },
  mergeNoEdgeCheck(a, lo, hi, mid) {
    let aux = []
    for(let i = lo; i <= mid; i++)
      aux[i] = a[i]

    for(let i = mid + 1; i <= hi; i++)
      aux[i] = a[hi + mid - i + 1]

    let i = lo,
        j = hi

    for(let k = lo; k <= hi; k++) {
      if(aux[j] < aux[i])
        a[k] = aux[j--]
      else
        a[k] = aux[i++]
    }
  },
  sort(a, lo, hi, merge = __inner.mergeOrigin) {
    if(hi - lo <= CUTOFF) return innerInsertion(a, lo, hi)

    let mid = Math.floor((lo + hi) / 2)
    __inner.sort(a, lo, mid, merge)
    __inner.sort(a, mid + 1, hi, merge)

    if(a[mid] >= a[mid + 1])
      merge(a, lo, hi, mid)
  },
  mergeDraw: function*(a, lo, hi, mid, ctx) {
    if(!ctx) throw new Error(NO_CONTEXT_ERROR)

    let aux = []
    for(let i = lo; i <= hi; i++)
      aux[i] = a[i]

    let i = lo,
        j = mid + 1

    for(let k = lo; k <= hi; k++) {
      ctx.fillStyle = IN_COMPARE
      yield ctx.fillRect(position(k), HEIGHT, BORDER, -PER_HEIGHT * a[k])
      if(j > hi) {
        a[k] = aux[i++]
      } else if(i > mid) {
        a[k] = aux[j++]
      } else {
        /*
        ctx.fillStyle = IN_EXCHAGE
        yield ctx.fillRect(positionI, HEIGHT, BORDER, -PER_HEIGHT * aux[i])
        yield ctx.fillRect(positionJ, HEIGHT, BORDER, -PER_HEIGHT * aux[j])
        */
        if(aux[j] < aux[i]) {
          a[k] = aux[j++]
        } else {
          a[k] = aux[i++]
        }
      }
      // ctx.fillStyle = NO_CHECK
      // ctx.fillRect(position(k), HEIGHT, BORDER, -PER_HEIGHT * a[k])
    }
  },
  sortBU(a, lo, hi, merge) {
    const N = a.length
    for(let sz = 1; sz < N; sz += sz) {
      for(let i = 0; i < N - sz; i += sz + sz)
        merge(a, i, Math.min(i + 2 * sz - 1, N - 1), i + sz - 1)
    }
  },

  // TODO: IF some ways to fix this
  sortBUxxx(a, lo, hi, merge) {
    const N = a.length
    let mid = 0

    for(let sz = 2; sz < N; sz += sz) {
      for(let i = 0; i < N; i += sz) {
        const hi = i + sz - 1
        if(hi >= N - 1) {
          merge(a, i, N - 1, Math.floor((N - 1 + i) / 2))
          // console.log('lo: ' + i + ', hi: ' + N + ', mid: ' + Math.floor((N + i) / 2) + ', ret: ' + a)
        }
        else {
          merge(a, i, i + sz - 1, Math.floor((i * 2 + sz - 1) / 2))
  //        console.log('lo: ' + i + ', hi: ' + (i + sz - 1) + ', mid: ' + Math.floor((i * 2 + sz - 1) / 2) + ', ret: ' + a)
        }
      }
    }
    merge(a, 0, N - 1, Math.floor((N - 1) / 2))
    // console.log('lo: ' + 0 + ', hi: ' + N + ', mid: ' + Math.floor(N / 2) + ', ret: ' + a)

  },
  sortBURecursive(a, lo, hi, merge) {
    const N = a.length
    const iter = (a, sz, lo) => {
      if(sz >= N) return
      if(lo >= N - sz) return iter(a, sz + sz, 0)
      merge(a, lo, Math.min(lo + 2 * sz - 1, N - 1), lo + sz - 1)
      iter(a, sz, lo + sz + sz)
    }

    iter(a, 1, 0)
  },
  drawSorting: function*(a, lo, hi, merge, ctx, w, h) {
    if(lo === hi) return
    let mid = Math.floor((lo + hi) / 2)
    yield* __inner.drawSorting(a, lo, mid, merge, ctx, w, h)
    yield* __inner.drawSorting(a, mid + 1, hi, merge, ctx, w, h)

    if(a[mid] >= a[mid + 1]) {
      yield* merge(a, lo, hi, mid, ctx, w, h)
      for(let i = lo; i < hi; i++) {
        ctx.fillStyle = 'rgba(255, 255, 255)'
        ctx.fillRect(position(i), 0, BORDER, h)
        ctx.fillStyle = NO_CHECK
        ctx.fillRect(position(i), HEIGHT, BORDER, -PER_HEIGHT * a[i])
      }
    }
  }
}

const mergeSort = sortRaw()
mergeSort.type = 'MERGE_SORT'

mergeSort.sort = function(a) {
  checkParams(a)
  __inner.sortBU(a, 0, a.length - 1, __inner.mergeOrigin)
}

mergeSort.drawSorting = function(a, ctx, w, h) {
  checkParams(a)
  return __inner.drawSorting(a, 0, a.length - 1, __inner.mergeDraw, ctx, w, h)
}

mergeSort.mergeQ = function(q1, q2) {
  let q = new Queue()
  /*
  let iter = (src1Q, src2Q, dstQ) => {
    if(q1.isEmpty()) iter(q2, q)
    else if(q2.isEmpty()) iter(q1, q)
    else {

    }
  }
  */
}

export default mergeSort
