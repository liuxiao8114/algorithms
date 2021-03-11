describe('tries test cases', () => {
  const path = require('path')
  const { StringST } = require(path.join(process.cwd(), 'src/string/tries'))

  const TEST = `she sells sea shells by the sea shore`.split(/\s+/)

  it('is a handshake', () => {
    const st = new StringST(TEST)

    expect(st.get('she')).toBe(TEST.lastIndexOf('she'))
    expect(st.get('shore')).toBe(TEST.length - 1)
    expect(st.get('sea')).toBe(TEST.lastIndexOf('sea'))
    // console.log(`st.size: ${st.size}`)
    expect(st.getSize()).toBe(TEST.length)
  })
})

/*
s
  |
  h
  |
  e: 0

*/
