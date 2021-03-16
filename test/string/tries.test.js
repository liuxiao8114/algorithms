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

  */
  it('5.2.1', () => {
    const TEST521 = `no is th ti fo al go pe to co to th ai of th pa`

  })
})


/*
s
  |
  h
  |
  e: 0

*/
