import Huffman from '../../src/string/Huffman'

const { buildTrie, writeTrie, compress, expand } = Huffman()

describe('Huffman test cases', () => {

  const TEXT_ALGO = 'ABRACADABRA!'
  const TEXT_1 = 'AAAAAAAABBBBCCD'
  const TEXT_2 = 'AAAABBCD'

  it('buildTrie ABCD with 2^n increments(freqs[ 8, 4, 2, 1 ])', () => {
    const freqs = []

    for(let i = 0; i < TEXT_1.length; i++) {
      let c = TEXT_1.charCodeAt(i)

      if(!freqs[c]) freqs[c] = 1
      else freqs[c]++
    }

    const root = buildTrie(freqs)
    expect(root.ch).toEqual('0')
    expect(root.freq).toEqual(15)
    expect(root.left.ch).toEqual('A')
    expect(root.left.freq).toEqual(8)
    expect(root.right.ch).toEqual('0')
    expect(root.right.freq).toEqual(7)
    expect(root.right.left.ch).toEqual('B')
    expect(root.right.left.freq).toEqual(4)
    expect(root.right.right.ch).toEqual('0')
    expect(root.right.right.freq).toEqual(3)
    expect(root.right.right.left.ch).toEqual('C')
    expect(root.right.right.left.freq).toEqual(2)
    expect(root.right.right.right.ch).toEqual('D')
    expect(root.right.right.right.freq).toEqual(1)
  })

  it('buildTrie ABCD with freqs[ 4, 2, 1, 1 ]', () => {
    const freqs = []

    for(let i = 0; i < TEXT_2.length; i++) {
      let c = TEXT_2.charCodeAt(i)

      if(!freqs[c]) freqs[c] = 1
      else freqs[c]++
    }

    const root = buildTrie(freqs)
    expect(root.ch).toEqual('0')
    expect(root.freq).toEqual(8)
    expect(root.left.ch).toEqual('A')
    expect(root.left.freq).toEqual(4)
    expect(root.right.ch).toEqual('0')
    expect(root.right.freq).toEqual(4)
    expect(root.right.left.ch).toEqual('B')
    expect(root.right.left.freq).toEqual(2)
    expect(root.right.right.ch).toEqual('0')
    expect(root.right.right.freq).toEqual(2)
    expect(root.right.right.left.ch).toEqual('C')
    expect(root.right.right.left.freq).toEqual(1)
    expect(root.right.right.right.ch).toEqual('D')
    expect(root.right.right.right.freq).toEqual(1)
  })

  it('buildTrie ABRACADABRA!', () => {
    const freqs = []

    for(let i = 0; i < TEXT_ALGO.length; i++) {
      let c = TEXT_ALGO.charCodeAt(i)

      if(!freqs[c]) freqs[c] = 1
      else freqs[c]++
    }

    const root = buildTrie(freqs)
    expect(root.ch).toEqual('0')
    expect(root.freq).toEqual(12)
    expect(root.left.ch).toEqual('0')
    expect(root.left.freq).toEqual(7)
    expect(root.right.ch).toEqual('A')
    expect(root.right.freq).toEqual(5)
  })

  it('compress', () => {
    expect(compress(TEXT_ALGO)).toEqual('1001000101001010110010001011')
  })

  it('readTrie', () => {

  })
  /*




  it('writeTrie', () => {
    const freqs = [],
          chars = []

    for(let i = 0; i < TEXT_ALGO.length; i++) {
      let c = TEXT_ALGO.charCodeAt(i)

      if(!freqs[c]) freqs[c] = 1
      else freqs[c]++

      chars[i] = c
    }

    const root = buildTrie(freqs)
    writeTrie(root)
  })


  */
})
