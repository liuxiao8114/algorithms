const path = require('path')
const { StringST, TernaryST } = require(path.join(process.cwd(), 'src/string/tries'))

const TEST = `she sells sea shells by the sea shore`.split(/\s+/)
const smallAlphabetOptions = { R: 26, offset: 97 }

describe('tries test cases', () => {
  let st = null
  let set = null
  let noDuplicatedTest = null

  beforeEach(() => {
    st = new StringST(TEST, smallAlphabetOptions)
    set = new Set()

    for(let s of TEST)
      set.add(s)

    noDuplicatedTest = [ ...set ]
  })

  it('can get key', () => {
    expect(st.get('she')).toBe(TEST.lastIndexOf('she'))
    expect(st.get('shore')).toBe(TEST.lastIndexOf('shore'))
    expect(st.get('shells')).toBe(TEST.lastIndexOf('shells'))
    expect(st.get('shel')).toBeNull()
    expect(st.get('zz')).toBeNull()
    expect(st.get('sh')).toBeNull()
    expect(st.getSize()).toBe(noDuplicatedTest.length)
  })

  it('shows keysWithPrefix', () => {
    expect(
      st.keysWithPrefix(`she`).toString().trim()
    ).toEqual('she, shells')
  })

  it('can delete a key', () => {
    const size = st.getSize()
    st.delete('shells')
    expect(st.getSize()).toBe(size - 1)
    expect(st.get('shells')).toBeNull()
  })

  it('search a given key', () => {
    expect(st.longestPrefixOf('she')).toBe(3)
    expect(st.longestPrefixOf('shell')).toBe(3)
    expect(st.longestPrefixOf('shells')).toBe(6)
  })
})

describe('TernaryST test cases', () => {
  let st = null
  let set = null
  let noDuplicatedTest = null

  beforeEach(() => {
    st = new TernaryST(TEST, smallAlphabetOptions)
    set = new Set()

    for(let s of TEST)
      set.add(s)

    noDuplicatedTest = [ ...set ]
  })

  it('init TernaryST', () => {
    expect(st.get('she')).toBe(TEST.lastIndexOf('she'))
    expect(st.get('shore')).toBe(TEST.lastIndexOf('shore'))
    expect(st.get('shells')).toBe(TEST.lastIndexOf('shells'))
    expect(st.get('shel')).toBeNull()
    expect(st.get('zz')).toBeNull()
    expect(st.get('sh')).toBeNull()

    expect(st.getSize()).toBe(noDuplicatedTest.length)
  })
})


describe('EXERCISES', () => {
  /*
  5.2.1
    Draw the R-way trie that results when the keys
      no is th ti fo al go pe to co to th ai of th pa

    are inserted in that order into an initially empty trie (do not draw null links).
  5.2.2
    Draw the TST that results when the keys
      no is th ti fo al go pe to co to th ai of th pa

    are inserted in that order into an initially empty TST.
  5.2.3
    Draw the R-way trie that results when the keys
      now is the time for all good people to come to the aid of

    are inserted in that order into an initially empty trie (do not draw null links).
  5.2.4
    Draw the TST that results when the keys
      now is the time for all good people to come to the aid of

    are inserted in that order into an initially empty TST.
  5.2.5
    Develop nonrecursive versions of TrieST and TST.
  5.2.6
    Implement the following API, for a StringSET data type:
      public class StringSET
        StringSET() create a string set
        void add(String key) put key into the set
        void delete(String key) remove key from the set
        boolean contains(String key) is key in the set?
        boolean isEmpty() is the set empty?
        int size() number of keys in the set
        int toString() string representation of the set
  */
  // it('5.2.1', () => {
  //   const TEST521 = `no is th ti fo al go pe to co to th ai of th pa`
  //
  // })

  it.only('5.2.5 StringST', () => {
    const st = new StringST(null, smallAlphabetOptions)

    st.putNonRecursive('she', 0)
    st.putNonRecursive('shy', 1)
    st.putNonRecursive('shell', 2)
    expect(st.getNonRecursive('she')).toBe(0)
    expect(st.getNonRecursive('shy')).toBe(1)
    expect(st.getNonRecursive('shell')).toBe(2)
    expect(st.getSize()).toBe(3)

    st.deleteNonRecursive('shy')
    expect(st.getNonRecursive('shy')).toBeNull()
    expect(st.getNonRecursive('she')).toBe(0)

    st.deleteNonRecursive('shell')
    expect(st.getNonRecursive('shell')).toBeNull()
    expect(st.getNonRecursive('she')).toBe(0)
  })
})

/*
5.2.7
  Empty string in TSTs. The code in TST does not handle the empty string properly.
  Explain the problem and suggest a correction.
5.2.8
  Ordered operations for tries. Implement the floor(), ceil(), rank(), and
  select() (from our standard ordered ST API from Chapter 3) for TrieST.
5.2.9
  Extended operations for TSTs. Implement keys() and the extended operations
  introduced in this section—longestPrefixOf(), keysWithPrefix(), and
  keysThatMatch()—for TST.
5.2.10
  Size. Implement very eager size() (that keeps in each node the number of
  keys in its subtree) for TrieST and TST.
5.2.11
  External one-way branching. Add code to TrieST and TST to eliminate external
  one-way branching.
5.2.12
  Internal one-way branching. Add code to TrieST and TST to eliminate internal
  one-way branching.
5.2.13
  Hybrid TST with R2-way branching at the root. Add code to TST to do multiway
  branching at the first two levels, as described in the text.
5.2.14
  Unique substrings of length L. Write a TST client that reads in text from standard
  input and calculates the number of unique substrings of length L that it contains.
  For example, if the input is cgcgggcgcg, then there are five unique substrings of length
  3: cgc, cgg, gcg, ggc, and ggg. Hint : Use the string method substring(i, i + L) to
  extract the ith substring, then insert it into a symbol table.
5.2.15
  Unique substrings. Write a TST client that reads in text from standard input
  and calculates the number of distinct substrings of any length. This can be done very
  efficiently with a suffix tree—see Chapter 6
5.2.16
  Document similarity. Write a TST client with a static method that takes an int
  value L and two file names as command-line arguments and computes the L-similarity
  of the two documents: the Euclidean distance between the frequency vectors defined by
  the number of occurrences of each trigram divided by the number of trigrams. Include
  a static method main() that takes an int value L as command-line argument and a list
  of file names from standard input and prints a matrix showing the L-similarity of all
  pairs of documents.
*/

describe('CREATIVE PROBLEMS', () => {

})
/*
s
  |
  h
  |
  e: 0

*/
