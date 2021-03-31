const EIHGT_BIT = 8

export { MinPQ, Queue } from '../sort/utils'

export function BinaryStdIn() {
  function readString() {

  }

  function readBoolean() {

  }

  function readChar(r = EIHGT_BIT) {

  }

  function isEmpty() {

  }

  function close() {

  }

  return {
    readString,
    readBoolean,
    readChar,
    isEmpty,
    close
  }
}

export function BinaryStdOut() {

}

export function charCodeAtWithOffset(s, c = 0, offset = 0) {
  if(typeof s !== 'string' || s.length === 0)
    return Number.MIN_VALUE
  return s.charCodeAt(c) - offset
}

export function fromCharCode(i, offset = 0) {
  return String.fromCharCode(i + offset)
}
