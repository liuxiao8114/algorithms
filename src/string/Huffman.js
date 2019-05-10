import { MinPQ } from './utils'
// import { BinaryStdIn, BinaryStdOut } from './BinaryStdIn'

function Node(ch, freq, left, right) {
  this.ch = ch
  this.freq = freq
  this.left = left
  this.right = right
}

Node.prototype.isLeaf = function() {
  return this.left == null && this.right == null
}

Node.prototype.compareTo = function(that) {
  if(!(that instanceof Node))
    throw new Error(`Node only compareTo Node but receive: ${that}`)
  return this.freq - that.freq
}

export default function Huffman() {
  const R = 256

  function readTrie(s, index) {
    if(index === s.length - 1) return

    if(s[index]) {
      let c = s.slice(index, index + 8)
      index += 8
      return new Node(c, -1, null, null)
    }

    return new Node('0', -1, readTrie(s, index++), readTrie(index++))
  }

  function writeTrie(node) {
    function iter(node) {
      if(node.isLeaf())
        o = `${o}1${node.ch}`
      else {
        o += '0'
        iter(node.left)
        iter(node.right)
      }
    }

    let o = ''
    iter(node)

    console.log('Write Trie: ' + o) // eslint-disable-line
    return o
  }

  function buildTrie(freqs) {
    let pq = new MinPQ()

    for(let c = 0; c < R; c++) {
      if(freqs[c] > 0)
        pq.insert(new Node(String.fromCharCode(c), freqs[c], null, null))
    }

    while(pq.size() > 1) {
      let n1 = pq.delMin(),
          n2 = pq.delMin()

      // console.log(`n1.ch: ${n1.ch}, n1.freq: ${n1.freq}, n2.ch: ${n2.ch}, n2.freq: ${n2.freq}`)

      let parent = new Node('0', n1.freq + n2.freq, n2, n1)
      pq.insert(parent)
    }

    return pq.delMin()
  }

  function buildCode(st, node, s) {
    if(node.isLeaf()) {
      console.log(`${node.ch}: ${s}`)   //eslint-disable-line
      st[node.ch.charCodeAt(0)] = s
    } else {
      buildCode(st, node.left, s + '0')
      buildCode(st, node.right, s + '1')
    }
  }

  function compress(s) {
    if(typeof s !== 'string') throw new Error('only compress string')

    const freqs = [],
          chars = []

    for(let i = 0; i < s.length; i++) {
      let c = s.charCodeAt(i)

      if(!freqs[c]) freqs[c] = 1
      else freqs[c]++

      chars[i] = c
    }

    const root = buildTrie(freqs)
    const st = []

    buildCode(st, root, '')
    writeTrie(root) // write bitstring-encoded trie to standard output

    let o = ''

    for(let i = 0; i < chars.length; i++) {
      let code = st[chars[i]]
      for(let j = 0; j < code.length; j++) {
        if(code.charAt(j) === '0') o += 0
        else if(code.charAt(j) === '1') o += 1
        else throw new Error('only receive 0 or 1 state in Binary')
      }
    }

    console.log(`compress result: ${o}`) //eslint-disable-line
    console.log(`${o.length} bits`)      //eslint-disable-line
    return o
  }

  function expand(s) {
    let root = readTrie(s, 0)
    let output

    writeTrie(root)
    for(let i = 0; i < s.length; i++) {
      let x = root
      while(!x.isLeaf()) {
        if(s[i]) x = x.right
        else x = x.left
      }
      output += x.ch
    }

    console.log(`expand result: ${output}`) //eslint-disable-line
    return output
  }

  return {
    buildTrie,
    writeTrie,
    readTrie,
    compress,
    expand
  }
}


/*
export default function Huffman() {
  const R = 256

  function readTrie() {
    if(BinaryStdIn.readBoolean())
      return new Node(BinaryStdIn.readChar(), -1, null, null)
    return new Node('0', -1, readTrie(), readTrie())
  }

  function writeTrie(node) {
    if(node.isLeaf()) {
      BinaryStdOut.write(true)
      BinaryStdOut.write(node.ch, 8)
    } else {
      BinaryStdOut.write(false)
      writeTrie(node.left)
      writeTrie(node.right)
    }
  }

  function buildTrie(freqs) {
    let pq = new MinPQ()

    for(let c = 0; c < R; c++)
      if(freqs[c] > 0) pq.insert(new Node(c, freqs[c], null, null))

    while(pq.size() > 1) {
      let n1 = pq.delMin(),
          n2 = pq.delMin(),
          parent = new Node('0', n1.freq + n2.freq, n1, n2)
      pq.insert(parent)
    }

    return pq.delMin()
  }

  function buildCode(st, node, s) {
    if(node.isLeaf()) {
      st[node.ch] = s
    } else {
      buildCode(st, node.left, s + '0')
      buildCode(st, node.right, s + '1')
    }
  }

  function compress(s) {
//    let s = BinaryStdIn.readString()
    if(typeof s !== 'string') throw new Error('only compress string')

    const freqs = [],
          chars = []

    for(let i = 0; i < s.length; i++) {
      let c = s.charAt(i)

      if(!freqs[c])
        freqs[c] = 1
      else freqs[c]++

      chars[i] = c
    }

    const root = buildTrie(freqs)
    const st = []

    buildCode(st, root, '')
    writeTrie(root) // write bitstring-encoded trie to standard output

    BinaryStdOut.write(chars.length)

    for(let i = 0; i < chars.length; i++) {
      let code = st[chars[i]]
      for(let j = 0; j < code.length; j++) {
        if(code.charAt(j) === '0') BinaryStdOut.write(false)
        else if(code.charAt(j) === '1') BinaryStdOut.write(true)
        else throw new Error('only receive 0 or 1 state in Binary')
      }
    }

    BinaryStdOut.close()
  }

  function expand() {
    let root = readTrie()
    let N = BinaryStdIn.readInt()

    for(let i = 0; i < N; i++) {
      let x = root
      while(!x.leaf()) {
        if(BinaryStdIn.readBoolean()) x = x.right
        else x = x.left
      }
      BinaryStdOut.write(x.ch, 8)
    }
    BinaryStdOut.close()
  }

  return {
    compress,
    expand
  }
}
*/
