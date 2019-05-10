export default function sortRaw() {
  let lessCounts = 0
  let exchCounts = 0

  function less(a, i, j) {
    if(!Array.isArray(a))
      throw new Error('less need array as first param')
    lessCounts++
    return a[i] < a[j]
  }

  function exch(a, i, j) {
    if(!Array.isArray(a))
      throw new Error('exch need array as first param')
    if(i === j) return
    let temp = a[i]
    a[i] = a[j]
    a[j] = temp
    exchCounts++
  }

  function sortCompare(that) {
    const timesCaculator = (m, N, T) => { // T arrays with length N
      let total = 0.0, a = []
      for(let i = 0; i < T; i++) {
        for(let j = 0; j < N; j++)
          a[j] = Math.random()
        const before = Date.now()
        m(a)
        total += Date.now() - before
      }
      return total
    }

    return (N, T, m1 = this.sort, m2 = that.sort) => {
      let thisTime = timesCaculator(m1, N, T),
          thatTime = timesCaculator(m2, N, T)
      return `${this.type} / ${that.type} is : ${thisTime / thatTime}`
    }
  }

  return {
    less,
    exch,
    lessCounts,
    exchCounts,
    sortCompare
  }
}
