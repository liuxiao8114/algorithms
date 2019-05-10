import {
  NO_CHECK, IN_COMPARE, IN_EXCHAGE, INIT_POSITION, NO_CONTEXT_ERROR,
  SM_STYLES as DEFAULT_STYLE
} from '../constants'

import sortRaw from './sortRaw'

const { less, exch } = sortRaw()

export default function animateSortRaw(ctx, w, h, style = DEFAULT_STYLE) {
  const { BORDER, HEIGHT, PER_HEIGHT, STEP } = style
  if(!ctx)
    throw new Error(NO_CONTEXT_ERROR)

  function* animateLess(a, i, j) {
    let positionI = INIT_POSITION + STEP * i,
        positionJ = INIT_POSITION + STEP * j

    ctx.fillStyle = IN_COMPARE
    ctx.fillRect(positionI, HEIGHT, BORDER, -PER_HEIGHT * a[i])
    yield ctx.fillRect(positionJ, HEIGHT, BORDER, -PER_HEIGHT * a[j])
    return less(a, i, j)
  }

  function* animateExch(a, i, j) {
    let positionI = INIT_POSITION + STEP * i,
        positionJ = INIT_POSITION + STEP * j

    ctx.fillStyle = IN_EXCHAGE
    ctx.fillRect(positionI, HEIGHT, BORDER, -PER_HEIGHT * a[i])
    yield ctx.fillRect(positionJ, HEIGHT, BORDER, -PER_HEIGHT * a[j])
    exch(a, i, j)
    __refresh(a)
  }

  function __refresh(a) {
    if(!a) return

    ctx.fillStyle = 'rgba(255, 255, 255)'
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = NO_CHECK
    let position = INIT_POSITION

    for(let i = 0; i < a.length; i++) {
      ctx.fillRect(position, HEIGHT, BORDER, -PER_HEIGHT * a[i])
      position += STEP
    }
  }

  return {
    less: animateLess,
    exch: animateExch
  }
}
