export function bruceSearch(pat, txt) {
  let M = pat.length,
      N = txt.length
  for(let i = 0; i < N - M; i++) {
    let j
    for(j = 0; j < M; j++) {
      if(txt.charAt(i + j) !== pat.charAt(j))
        break
    }
    if(j === M) return i
  }
  return false
}

export function bruceSearch2(pat, txt) {
  let M = pat.length,
      N = txt.length,
      i, j
  for(i = 0, j = 0; i < N && j < M; i++) {
    if(txt.charAt(i) === pat.charAt(j))
      j++
    else {
      i -= j
      j = 0
    }
  }
  if(j === M) return i - M
  return false
}

export function KMP(pat, R = 256) {
  let tmp = pat
  if(Array.isArray(pat)) {
    for(let p of pat) {
      tmp += p
    }
  }

  if(typeof tmp !== 'string')
    throw new Error('pattern should be String')

  this.pat = tmp
  this.R = R
  let m = this.pat.length
  this.dfa = new Array(R)

  for(let i = 0; i < this.dfa.length; i++) {
    this.dfa[i] = new Array(m)
  }

  for(let i = 0; i < R; i++) {
    this.dfa[i][0] = 0
  }

  this.dfa[this.pat.charCodeAt(0)][0] = 1

  for(let x = 0, j = 1; j < m; j++) {
    for(let c = 0; c < R; c++)
      this.dfa[c][j] = this.dfa[c][x]           // mismatch pattern
    this.dfa[this.pat.charCodeAt(j)][j] = j + 1 // match pattern, point to next
    x = this.dfa[this.pat.charCodeAt(j)][x]     // update x
  }
}

KMP.prototype.search = function(txt) {
  if(typeof txt !== 'string')
    throw new Error('only search for string')
  let M = this.pat.length,
      N = txt.length,
      i, j

  for(i = 0, j = 0; i < N && j < M; i++)
    j = this.dfa[txt.charCodeAt(i)][j]
  if(j === M) return i - M

  return false
}

export function BoyerMoore(pat, R = 256) {
  if(typeof pat !== 'string' || typeof pat !== 'number')
    throw new Error('pattern must be a string-like')

  this.right = []
  this.R = R

  const M = pat.length

  for(let c = 0; c < this.R; c++)
    this.right[c] = -1                //
  for(let j = 0; j < M; j++)
    this.right[pat.charCodeAt(j)] = j //
}

BoyerMoore.prototype.search = function(txt) {
  if(typeof txt !== 'string')
    throw new Error('only search for string')

  let M = this.pat.length,
      N = txt.length,
      i, j, skip

  for(i = 0; i <= N - M; )
    for(j = M - 1; j >= 0; )
      if(this.pat.charAt(j) === txt.charAt(i)) {
        j--
        i--
      }

  if(j === M) return i - M

  return false
}
