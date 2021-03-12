describe('tries test cases', () => {
  const path = require('path')
  const { StringST } = require(path.join(process.cwd(), 'src/string/tries'))

  const TEST = `she sells sea shells by the sea shore`.split(/\s+/)

  it('is a handshake', () => {
    const st = new StringST(TEST)
    const set = new Set()

    for(let s of TEST)
      set.add(s)

    const noDuplicatedTest = [ ...set ]

    expect(st.get('she')).toBe(TEST.lastIndexOf('she'))
    expect(st.get('shore')).toBe(TEST.lastIndexOf('shore'))
    expect(st.get('sea')).toBe(TEST.lastIndexOf('sea'))
    expect(st.getSize()).toBe(noDuplicatedTest.length)
  })
})

/*
s
  |
  h
  |
  e: 0

*/
