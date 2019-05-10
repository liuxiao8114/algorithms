import sortRaw from './sortRaw'
import animateSortRaw from './sortAnimation'

const shell = sortRaw()

shell.type = 'SHELL_SORT'
shell.sort = function(a) {
  const N = a.length

  let h = 1
  while(h < N/3) h = 3 * h + 1 // h = 1 4 13 40 ...
  while(h >= 1) {
    for(let i = h; i < N; i++) {
      for(let j = i; j >= h && shell.less(a, j, j - h); j -= h)
        shell.exch(a, j - h, j)
    }
    h = Math.floor(h / 3)
  }
}

shell.drawSorting = function*(a, ctx, w, h, style) {
  const { less, exch } = animateSortRaw(ctx, w, h, style)
  const N = a.length

  let step = 1
  while(step < N/3) step = 3 * step + 1 // h = 1 4 13 40 ...
  while(step >= 1) {
    for(let i = step; i < N; i++) {
      for(let j = i; j >= step && (yield* less(a, j, j - step)); j -= step)
        yield* exch(a, j - step, j)
    }
    step = Math.floor(step / 3)
  }
}

export default shell
