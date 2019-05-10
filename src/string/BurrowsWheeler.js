import { SuffixArray } from './SuffixArray'

const R = 256

export function transform (s) {
  const suffices = new SuffixArray(s)
  const t = []
  let startAt

  for(let i = 0; i < suffices.length(); i++) {
    let j = suffices.index(i)
    if(j === 0) {
      startAt = i
      t[i] = s.charAt(s.length - 1)
    }
    else
      t[i] = s.charAt(j - 1)
  }

  console.log(`startAt: ${startAt}`) //eslint-disable-line
  console.log(t)                     //eslint-disable-line
  return { startAt, t }
}

export function inverseTransform({ startAt, t }) {
  const end = t.concat().join('')
  const next = [],
        counts = [],
        origin = []

  for(let i = 0; i < R + 1; i++)
    counts[i] = 0

  for(let i = 0; i < end.length; i++) {
    counts[end.charCodeAt(i) + 1]++
  }

  for(let i = 0; i < R; i++)
    counts[i + 1] += counts[i]

  for(let i = 0; i < end.length; i++)
    next[counts[end.charCodeAt(i)]++] = i

  origin[end.length - 1] = end[startAt]

  function iter(a, aux, next, i, j) {
    if(i === aux.length - 1) return
    a[i] = aux[next[j]]
    iter(a, aux, next, ++i, next[j])
  }

  iter(origin, end, next, 0, startAt)

  return origin.join('')
}

export function main(args) {
  if(args[0] === '+') return inverseTransform
  if(args[0] === '-') return transform
}
