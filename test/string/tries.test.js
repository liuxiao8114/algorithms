describe('tries test cases', () => {
  const path = require('path')
  const { StringST } = require(path.join(process.cwd(), 'src/string/tries'))

  const TEST = `she sells sea shells by the sea shore`.split(/\s+/)

  const smallAlphabetOptions = { R: 26, offset: 97 }
  const st = new StringST(TEST, smallAlphabetOptions)
  const set = new Set()

  for(let s of TEST)
    set.add(s)

  const noDuplicatedTest = [ ...set ]

  it('can get key', () => {
    // expect(st.get('she')).toBe(TEST.lastIndexOf('she'))
    // expect(st.get('shore')).toBe(TEST.lastIndexOf('shore'))
    // expect(st.get('shells')).toBe(TEST.lastIndexOf('shells'))
    expect(st.getSize()).toBe(noDuplicatedTest.length)
  })

  // it('shows keysWithPrefix', () => {
  //   console.log(st.keysWithPrefix(`she`))
  // })

  it('can delete a key', () => {
    // st.put('shels')
    st.delete('shells')
  })
})

/*
s
  |
  h
  |
  e: 0

*/
