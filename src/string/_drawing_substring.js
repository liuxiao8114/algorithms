import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import '../index.css'
import './_drawing_style.css'
import { KMP } from './substring'

const e = React.createElement
const PATTERN = 'ababab'
const TXT = 'aabbabbababbabababab'
const ON_CHECK = 'onCheck'
const CHECK_FAIL = 'checkFail'
const CHECK_SUCCESS = 'checkSuccess'

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
    { className: 'line', style: { transform: `translateX(${offset * 1.2}em)` } },
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

const inputElement = dce('input')
const buttonElement = dce('button')
buttonElement.className = 'ctrlButton'
buttonElement.textContent = 'Show me the next!'

function initCells(content, fragElement, memolized, pointer, pointerType) {
  if(pointer && pointerType === 'down')
    fragElement.appendChild(pointer)

  for(let i of content) {
    const cellElement = dce('li')
    cellElement.textContent = i
    cellElement.className = 'cell'
    memolized.push(cellElement)
    fragElement.appendChild(cellElement)
  }

  if(pointer && pointerType === 'up')
    fragElement.appendChild(pointer)

  return fragElement
}

function initSection(preProcess, callback) {
  const section = dce('section')
  section.className = 'substring'

  if(typeof preProcess === 'function')
    preProcess()

  const frag = dcdf()
  frag.appendChild(h2Element)
  frag.appendChild(txtLineElement)
  frag.appendChild(patternLineElement)
  frag.appendChild(inputElement)
  frag.appendChild(buttonElement)

  section.appendChild(frag)
  document.querySelector('#substring').appendChild(section)

  if(typeof callback === 'function')
    callback(section)

  return section
}

function updatePosition(element, offset = 0) {
  element.style = `transform: translateX(${offset * 1.2}em)`
}

function updatePointerPosition(element, position) {
  element.style = `grid-column-start: ${position + 1}`
}

function updateInputContent(inputElement, content) {
  inputElement.value = content
}

function check(ei, ej, status) {
  ei.classList.add(status)
  ej.classList.add(status)
}

function clear(ei, ej) {
  ei.classList.remove(ON_CHECK)
  ei.classList.remove(CHECK_FAIL)
  ej.classList.remove(ON_CHECK)
  ej.classList.remove(CHECK_FAIL)
}

const bruceSearchSimulate = (pattern, txt) => {
  const iterator = bruceSearch(pattern, txt)
  let nextValue = null,
      lastStatus = null,
      currentI = INIT_I,
      currentJ = INIT_J,
      isI = false

  const txtCells = []
  const patternCells = []

  txtLineElement.appendChild(initCells(txt, dcdf(), txtCells, pointerI, 'down'))
  patternLineElement.appendChild(initCells(pattern, dcdf(), patternCells, pointerJ, 'up'))
  initSection()

  return () => {
    const next = iterator.next()
    if(next.done)
      return

    nextValue = next.value

    if(typeof nextValue === 'string') {
      updatePointerPosition(pointerI, currentI + currentJ)
      check(txtCells[currentI + currentJ], patternCells[currentJ], nextValue)
    } else {
      isI = nextValue.isI

      if(isI) {
        if(lastStatus !== CHECK_SUCCESS)
          clear(txtCells[currentI + currentJ], patternCells[currentJ])
        currentI = nextValue.value
        updatePointerPosition(pointerI, nextValue.value)
      } else {
        currentJ = nextValue.value
        updatePointerPosition(pointerJ, nextValue.value)
        updatePointerPosition(pointerI, currentI + currentJ)
        check(txtCells[currentI + currentJ], patternCells[currentJ], ON_CHECK)
      }
    }
  }
}

function pmt(pattern) {
  let i = 1, j = 0
  const pmt = [ 0, 0 ]

  while(i < pattern.length) {
    if(pattern.charAt(i) === pattern.charAt(j))
      pmt[i] = ++j
    else
      j = pmt[j]
    i += 1
  }

  return pmt
}

function* pmtGenerator(pattern) {
  let i = 1, j = 0, isMove = false
  const pmt = [ 0, 0 ]

  while(i < pattern.length) {
    yield { type: ON_CHECK, i, j }

    if(pattern.charAt(i) === pattern.charAt(j)) {
      yield { type: CHECK_SUCCESS, i, j }
      pmt[i] = ++j
      isMove = false
    } else {
      yield { type: CHECK_FAIL, i, j }
      j = pmt[j]
      isMove = true
    }

    i += 1
    yield { pmt, i, j, isMove }
  }

  return pmt
}

const pmtSimulate = pattern => {
  const iterator = pmtGenerator(pattern)
  const txtCells = []
  const patternCells = []

  let nextValue = null

  initSection(() => {
    updatePosition(patternLineElement, 1)
    updatePointerPosition(pointerI, 1)
    txtLineElement.appendChild(initCells(pattern, dcdf(), txtCells, pointerI, 'down'))
    patternLineElement.appendChild(initCells(pattern, dcdf(), patternCells, pointerJ, 'up'))
  })

  return () => {
    const next = iterator.next()
    if(next.done)
      return

    nextValue = next.value
    // console.log(`nextValue.type: ${nextValue.type}, nextValue.i: ${nextValue.i}, nextValue.j: ${nextValue.j}`)

    switch (nextValue.type) {
      case ON_CHECK: {
        check(txtCells[nextValue.i], patternCells[nextValue.j], nextValue.type)
        break
      }
      case CHECK_SUCCESS: {
        check(txtCells[nextValue.i], patternCells[nextValue.j], nextValue.type)
        break
      }
      case CHECK_FAIL: {
        check(txtCells[nextValue.i], patternCells[nextValue.j], nextValue.type)
        break
      }
      default: {
        updatePointerPosition(pointerI, nextValue.i)
        updatePointerPosition(pointerJ, nextValue.j)
        updateInputContent(inputElement, nextValue.pmt)
        if(nextValue.isMove)
          updatePosition(patternLineElement, nextValue.i)
      }
    }
  }
}

function pmtKmp(pattern, txt) {
  const next = pmt(pattern)

  for(let i = 0; i < txt.length; i++) {
    let j = 0
    for(; j < pattern.length;) {
      if(txt.charAt(i) === pattern.charAt(j))
        j++
      else
        j = next[j]
    }
  }
}

function *pmtKmpGenerator(pattern, txt) {
  const next = pmt(pattern)

  yield next

  for(let i = 0, j = 0; i < txt.length && j < pattern.length;) {
    yield { type: ON_CHECK, i, j }

    if(txt.charAt(i) === pattern.charAt(j)) {
      yield { type: CHECK_SUCCESS, i, j }
      j++
      i++
    } else {
      yield { type: CHECK_FAIL, i, j }
      j = next[j]
      yield { i, j }
    }
  }
}

function pmtKmpSimulate(pattern, txt) {
  const iterator = pmtKmpGenerator(pattern, txt)
  const txtCells = []
  const patternCells = []

  let nextValue = null

  initSection(() => {
    updateInputContent(inputElement, iterator.next().value)
    txtLineElement.appendChild(initCells(txt, dcdf(), txtCells, pointerI, 'down'))
    patternLineElement.appendChild(initCells(pattern, dcdf(), patternCells, pointerJ, 'up'))
  })

  return () => {
    const next = iterator.next()
    console.log(`nextdone: ${next.done}`)
    if(next.done)
      return

    nextValue = next.value
    console.log(`nextValue.type: ${nextValue.type}, nextValue.i: ${nextValue.i}, nextValue.j: ${nextValue.j}`)

    switch (nextValue.type) {
      case ON_CHECK: {
        check(txtCells[nextValue.i], patternCells[nextValue.j], nextValue.type)
        updatePointerPosition(pointerI, nextValue.i)
        updatePointerPosition(pointerJ, nextValue.j)
        break
      }
      case CHECK_SUCCESS: {
        check(txtCells[nextValue.i], patternCells[nextValue.j], nextValue.type)
        break
      }
      case CHECK_FAIL: {
        check(txtCells[nextValue.i], patternCells[nextValue.j], nextValue.type)
        break
      }
      default: {
        updatePosition(patternLineElement, nextValue.i)
      }
    }
  }
}

const kmpSimulate = (pattern, txt) => {
  const kmp = new KMP(pattern)
  const dfa = kmp.dfa
  const iterator = kmp.searchVisualize(txt)

  return () => {

  }
}

function boyerMooreSimulate() {

}

buttonElement.addEventListener('click', pmtKmpSimulate(PATTERN, TXT))
