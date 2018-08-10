const readSocialNetwork = (m, logs) => {
  const uf = new WeightedQuickUnionUF()

  for(let log of logs) {
    let s = log.split(/s/)
    uf.union(s[0], s[1])
    if(uf.count === m - 1) break
  }
}
