import { NO_CHECK, INIT_POSITION, BORDER, HEIGHT, PER_HEIGHT, STEP } from './constants'
import { insertion, selection } from './sort/primarySort'
import shell from './sort/shellSort'
import mergeSort from './sort/mergeSort'
import quick from './sort/quickSort'

let canvas = document.querySelector('.board')
let width = canvas.width = 1200,
    height = canvas.height = 500,
    ctx = canvas.getContext('2d')
ctx.fillStyle = 'rgba(255, 255, 255)'
ctx.fillRect(0, 0, width, height)

function range(from, to) {
  return Math.floor(Math.random() * (to - from) + from)
}
const a_100 = []

for(let i = 0; i < 100; i++)
  a_100.push(range(1, 500))

ctx.fillStyle = NO_CHECK
let position = INIT_POSITION

for(let i = 0; i < a_100.length; i++) {
  ctx.fillRect(position, HEIGHT, BORDER, -PER_HEIGHT * a_100[i])
  position += STEP
}

const gen = shell.drawSorting(a_100, ctx, width, height)

setInterval(() => gen.next(), 600)
