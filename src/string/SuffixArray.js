export function Suffix(text, index) {
  this.text = text
  this.index = index
  this.length = text.length - index
}

Suffix.prototype = {
  constructor: Suffix,
  toString() {
    return this.text.slice(this.index || 0)
  },
  charAt(i) {
    return this.text.charAt(i + this.index)
  }
}

Suffix.compareTo = (a, b) => {
  if(a === b) return 0
  const n = Math.min(a.length, b.length)
  for(let i = 0; i < n; i++) {
    if(a.charAt(i) < b.charAt(i)) return -1
    if(a.charAt(i) > b.charAt(i)) return 1
  }
  return b.length - a.length
}

export function SuffixArray(text) {
  this.suffices = []
  for(let i = 0; i < text.length; i++)
    this.suffices[i] = new Suffix(text, i)
  this.suffices.sort(Suffix.compareTo)
}

SuffixArray.prototype = {
  length() {
    return this.suffices.length
  },
  index(i) {
    return this.suffices[i].index
  },
  select(i) {
    if (i < 0 || i >= this.length()) throw new Error('Illegal Argument')
    return this.suffices[i].toString()
  },
  lcp(i = this.length() - 1) {
    if(i < 1 || i > this.length() - 1) throw new Error('Illegal Argument')
    return SuffixArray.lcpSuffix(this.suffices[i], this.suffices[i - 1])
  }
}

SuffixArray.lcpSuffix = (s1, s2) => {
  const n = Math.min(s1.length, s2.length)
  for(let i = 0; i < n; i++)
    if(s1.charAt(i) !== s2.charAt(i)) return i
  return n
}
