import { WeightedQuickUnionUF } from './UF'

function translateRCToIdx(row, col, n) {
  return row * n + col + 1
}

function Percolation(n) {
  this.V = n * n + 2
  this.vertices = new Array(this.V)
  this.G = new WeightedQuickUnionUF(this.V)
  this.opensitesCount = 0

  for(let i = 1; i <= n; i++)
    this.G.union(0, i)
}

Percolation.prototype = {
  constructor: Percolation,
  open(row, col) {
    if(this.isOpen(row, col)) return
    let idx = translateRCToIdx(row, col, this.n)
    this.vertices[idx] = true

    if(row - 1 > 0 && this.isOpen(row - 1, col))
      this.G.union(idx, idx - this.n)

    if(row + 1 < this.n && this.isOpen(row + 1, col))
      this.G.union(idx, idx + this.n)

    if(col - 1 > 0 && this.isOpen(row, col - 1))
      this.G.union(idx, idx - 1)

    if(col + 1 < this.n && this.isOpen(row, col + 1))
      this.G.union(idx, idx + 1)

    this.opensitesCount++
  },
  isOpen(row, col) {
    return this.vertices[translateRCToIdx(row, col, this.n)]
  },
  isFull(row, col) {
    return this.percolates() &&
      this.G.connected(translateRCToIdx(row, col, this.n), this.V - 1)
  },
  numberOfOpensites() {
    return this.opensitesCount
  },
  percolates() {
    return this.G.connected(0 , this.V - 1)
  }
}

/*
public class PercolationStats {
   public PercolationStats(int n, int trials)    // perform trials independent experiments on an n-by-n grid
   public double mean()                          // sample mean of percolation threshold
   public double stddev()                        // sample standard deviation of percolation threshold
   public double confidenceLo()                  // low  endpoint of 95% confidence interval
   public double confidenceHi()                  // high endpoint of 95% confidence interval

   public static void main(String[] args)        // test client (described below)
}
*/
