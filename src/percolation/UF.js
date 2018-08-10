function QuickFindUF(n) {
  this.ids = []
  this.count = n || 0

  for(let i = 0; i < n; i++) {
    this.ids[i] = i
  }
}

QuickFindUF.prototype = {
  constructor: QuickFindUF,

  connected(i, j) {
    return this.ids[i] === this.ids[j]
  },

  union(i, j) {
    if(this.ids[i] === this.ids[j]) return
    for(let k = 0; k < this.ids.length; k++) {
      if(this.ids[k] === this.ids[i]) {
        this.ids[i] = this.ids[j]
      }
    }
  },

  find(i) {
    return this.ids[i]
  }
}

function QuickUnionUF(n) {
  this.ids = []
  for(let i = 0; i < n; i++) {
    this.ids[i] = i
  }
}

QuickUnionUF.prototype = {
  constructor: QuickUnionUF,
  connected(i, j) {
    return this.find(i) === this.find(j)
  },
  find(i) {
    if(this.ids[i] === i)
      return i
    return this.find(this.ids[i])
  },
  union(i, j) {
    let iRoot = this.find(i),
        jRoot = this.find(j)
    if(iRoot === jRoot) return
    this.ids[iRoot] = jRoot
  }
}

function WeightedQuickUnionUF(n) {
  this.ids = []
  this.size = []
  for(let i = 0; i < n; i++) {
    this.ids[i] = i
    this.size[i] = 1
  }
  this.count = 0
}

WeightedQuickUnionUF.prototype = {
  constructor: WeightedQuickUnionUF,
  connected(i, j) {
    return this.find(i) === this.find(j)
  },
  find(i) {
    if(this.ids[i] === i)
      return i
    return this.find(this.ids[i])
  },
  union(i, j) {
    let iRoot = this.find(i),
        jRoot = this.find(j)
    if(iRoot === jRoot) return

    if(this.size[iRoot] > this.size[jRoot]) {
      this.ids[jRoot] = iRoot
      this.size[iRoot] += this.size[jRoot]
      this.count = this.size[iRoot] - 1
    } else {
      this.ids[iRoot] = jRoot
      this.size[jRoot] += this.size[iRoot]
      this.count = this.size[jRoot] - 1
    }
  }
}

export { QuickFindUF, QuickUnionUF, WeightedQuickUnionUF }
