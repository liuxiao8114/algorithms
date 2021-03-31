import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import '../index.css'
import './_drawing_style.css'

const e = React.createElement
const PATTERN = 'ababab'
const TXT = 'this is ababab test'

function Pointer({ name, type, position }) {
  return e(
    'div',
    { className: 'pointer', style: { gridColumnStart: position + 1 }, },
    type === 'up' ? '⬆ ' + name : '⬇ ' + name
  )
}

function Cell(props) {
  return e(
    'li',
    { className: 'cell' },
    props.value
  )
}

function Line({ givenString, pointer, offset = 0 }) {
  const cells = []

  for(let i = 0; i < givenString.length; i++)
    cells.push(e(Cell, { key: i, value: givenString[i] }))

  if(pointer.props.type === 'down')
    cells.unshift(pointer)
  else if(pointer.props.type === 'up')
    cells.push(pointer)

  return e(
    'ul',
    { className: 'line', style: { transform: `translateX(${offset}px)` } },
    cells
  )
}

function CtrlButton(props) {
  return e(
    'button',
    { className: 'ctrlButton', onClick: props.handleClick },
    props.children
  )
}

function *bruceSearch(pat, txt) {
  let M = pat.length,
      N = txt.length

  for(let i = 0; i <= N - M; i = yield i + 1) {
    // setTxtPointerPosition(i)
    // console.log(`iiiiii: ${i}`)
    // let j
    // for(j = 0; j < M; j = yield j + 1) {
    //   if(txt.charAt(i + j) !== pat.charAt(j))
    //     break
    // }
    // if(j === M) return i
  }

  return false
}

// function txtPointerIncrement(i, step = 1) {
//   console.log(`is button clicked? i = ${i}`)
//   // setTxtPointerPosition(i + step)
//   return i + step
// }
//
// function patternPointerIncrement(j, step = 1) {
//   console.log(`is button clicked? j = ${j}`)
//   // setPatternPointerPosition(j + step)
//   return j + step
// }
//
// function compare(i, j) {
//
// }

function App({ pattern, txt }) {
  const [ patternPosition, setPatternPosition ] = useState(0)
  const [ patternPointerPosition, setPatternPointerPosition ] = useState(0)
  const [ txtPointerPosition, setTxtPointerPosition ] = useState(bruceSearch(PATTERN, TXT))

  function handleClick() {
    console.log(`handleClick txtPointerPosition: ${txtPointerPosition}`)
    // setTxtPointerPosition(iterator.next(txtPointerPosition).value)
  }

  return e(
    'section',
    { className: 'substring' },
    e('h2', {}, `Let's start!`),
    e(Line, {
      givenString: txt,
      pointer: e(Pointer, { key: 'i', name: 'i', type: 'down', position: txtPointerPosition.value }),
    }),
    e(Line, {
      givenString: pattern,
      offset: patternPosition,
      pointer: e(Pointer, { key: 'j', name: 'j', type: 'up', position: patternPointerPosition }),
    }),
    e(CtrlButton, { handleClick }, 'Show me the next!')
  )
}

ReactDOM.render(
  e(App, { txt: TXT, pattern: PATTERN }),
  document.querySelector('#substring')
)
