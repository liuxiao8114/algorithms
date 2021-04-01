import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import '../index.css'
import './_drawing_style.css'
import { KMP } from './substring'

const e = React.createElement
const PATTERN = 'ababab'
const TXT = 'aabbabbababbabababab'

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

  for(let i = 0; i <= N - M; i++) {
    yield { isI: true, value: i }
    let j
    for(j = 0; j < M; j++) {
      yield { isI: false, value: j }
      if(txt.charAt(i + j) !== pat.charAt(j)) {
        yield 'checkFail'
        break
      }

      yield 'checkSuccess'
    }
    if(j === M) return i
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

// ReactDOM.render(
//   e(App, { txt: TXT, pattern: PATTERN }),
//   document.querySelector('#substring')
// )

const dce = name => document.createElement(name)
const dcdf = () => document.createDocumentFragment()
const INIT_I = 0
const INIT_J = 0

const h2Element = dce('h2')
h2Element.textContent = `Let's start!`

const txtLineElement = dce('ul')
txtLineElement.className = 'line'

const patternLineElement = dce('ul')
patternLineElement.className = 'line'

const pointerI = dce('div')
pointerI.className = 'pointer'
pointerI.textContent = '⬇ i'
updatePointerPosition(pointerI, INIT_I)

const pointerJ = dce('div')
pointerJ.className = 'pointer'
pointerJ.textContent = '⬆ j'
updatePointerPosition(pointerJ, INIT_J)

let frag = dcdf()
frag.appendChild(pointerI)
const txtCells = []

for(let i of TXT) {
  const cellElement = dce('li')
  cellElement.textContent = i
  cellElement.className = 'cell'
  txtCells.push(cellElement)
  frag.appendChild(cellElement)
}

txtLineElement.appendChild(frag)

frag = dcdf()
const patternCells = []

for(let i of PATTERN) {
  const cellElement = dce('li')
  cellElement.textContent = i
  cellElement.className = 'cell'
  patternCells.push(cellElement)
  frag.appendChild(cellElement)
}

frag.appendChild(pointerJ)
patternLineElement.appendChild(frag)

const buttonElement = dce('button')
buttonElement.className = 'ctrlButton'
buttonElement.textContent = 'Show me the next!'

const section = dce('section')
section.className = 'substring'

frag = dcdf()
frag.appendChild(h2Element)
frag.appendChild(txtLineElement)
frag.appendChild(patternLineElement)
frag.appendChild(buttonElement)

section.appendChild(frag)
document.querySelector('#substring').appendChild(section)

function updatePosition(element, offset = 0) {
  element.style = `transform: translateX(${offset}px)`
}

function updatePointerPosition(element, position) {
  element.style = `grid-column-start: ${position + 1}`
}

function check(ei, ej, status) {
  ei.classList.add(status)
  ej.classList.add(status)
}

function clear(ei, ej) {
  ei.classList.remove('onCheck')
  ei.classList.remove('checkFail')
  ej.classList.remove('onCheck')
  ej.classList.remove('checkFail')
}

const bruceSearchSimulate = (() => {
  const iterator = bruceSearch(PATTERN, TXT)
  let nextValue = null,
      lastStatus = null,
      currentI = INIT_I,
      currentJ = INIT_J,
      isI = false

  return () => {
    nextValue = iterator.next().value

    if(typeof nextValue === 'string') {
      updatePointerPosition(pointerI, currentI + currentJ)
      check(txtCells[currentI + currentJ], patternCells[currentJ], nextValue)
    } else {
      isI = nextValue.isI

      if(isI) {
        if(lastStatus !== 'checkSuccess')
          clear(txtCells[currentI + currentJ], patternCells[currentJ])
        currentI = nextValue.value
        updatePointerPosition(pointerI, nextValue.value)
      } else {
        currentJ = nextValue.value
        updatePointerPosition(pointerJ, nextValue.value)
        updatePointerPosition(pointerI, currentI + currentJ)
        check(txtCells[currentI + currentJ], patternCells[currentJ], 'onCheck')
      }
    }
  }
})()

const kmpSimulate = () => {
  const kmp = new KMP(PATTERN)
  const dfa = kmp.dfa
  const iterator = kmp.searchVisualize(TXT)

  return () => {

  }
}

function boyerMooreSimulate() {

}

buttonElement.addEventListener('click', bruceSearchSimulate)
