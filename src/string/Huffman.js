import { Node, MinPQ } from './utils'
import BinaryStdIn from './BinaryStdIn'
import BinaryStdOut from './BinaryStdOut'

export default function Huffman() {
  const R = 256

  function readTrie() {

  }

  function writeTrie() {

  }

  function buildTrie(freqs) {
    let pq = new MinPQ()
    for(let c = 0; c < R; c++)
      if(freqs[c] > 0) pq.insert(new Node(c, freqs[c], null, null))

    while(pq.size() > 1) {
      let n1 = pq.delMin(),
          n2 = pq.delMin(),
          parent = new Node('\0', n1.freq + n2.freq , n1, n2)
      pq.insert(parent)
    }

    return pq.delMin()
  }

  function buildCode(st, node, s) {

  }

  function compress() {
    let s = BinaryStdIn.readString()
    const chars = []
    for(let i = 0; i < s.length; i++) {
      if(chars[s.charAt(i)]) chars[s.charAt(i)] = 1
      else chars[s.charAt(i)]++
    }

    const root = buildTrie(chars)

    for() {

    }
  }

  function extend() {
    let root = readTrie()
    let N = BinaryStdIn.readInt()

    for(let i = 0; i < N; i++) {
      let x = root
      while(!x.leaf()) {
        if(BinaryStdIn.readBoolean()) x = x.right
        else x = x.left
      }
      BinaryStdOut.write(x.ch)
    }
    BinaryStdOut.close()
  }

  return {
    compress,
    extend
  }
}
