function Suffix(text, index) {
  this.text = text
  this.index = index
  this.length = text.length
}

Suffix.prototype = {
  constructor: Suffix,
  toString() {
    if(this.index === 0) return this.text
    return this.text.slice(this.index) + this.text.slice(0, this.index)
  },
  charAt(i) {
    i = (i + this.index) % this.length
    return this.text.charAt(i)
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

export function CircularSuffixArray(text) {
  this.suffices = []
  for(let i = 0; i < text.length; i++)
    this.suffices[i] = new Suffix(text, i)
  this.suffices.sort(Suffix.compareTo)
}

CircularSuffixArray.prototype = {
  constructor: CircularSuffixArray,
  length() {
    return this.suffices.length
  },
  index(i) {
    return this.suffices[i].index
  },
  select(i) {
    if (i < 0 || i >= this.length()) throw new Error('Illegal Argument')
    return this.suffices[i].toString()
  }
}
