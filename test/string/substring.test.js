import { bruceSearch, bruceSearch2, KMP, BoyerMoore } from '../../src/string/substring'

describe('substring test cases', () => {
  const txt1 = 'ABACADABRAC',
        pat1 = 'ABRA',
        txt2 = 'ABACADABRAC',
        pat2 = 'ABCA',
        txt3 = 'AAAAAA',
        pat3 = 'ABC',
        patKMP = 'ABABAC'

  it('bruce search test', () => {
    expect(bruceSearch(pat1, txt1)).toBe(6)
    expect(bruceSearch(pat2, txt2)).toBe(false)
    expect(bruceSearch(pat3, txt3)).toBe(false)
  })

  it('bruce search2 test', () => {
    expect(bruceSearch2(pat1, txt1)).toBe(6)
    expect(bruceSearch2(pat2, txt2)).toBe(false)
    expect(bruceSearch2(pat3, txt3)).toBe(false)
  })

  it('should build DFA', () => {
    let k = new KMP(patKMP)

    expect(k.dfa[65][0]).toBe(1)
    expect(k.dfa[66][0]).toBe(0)
    expect(k.dfa[67][0]).toBe(0)

    expect(k.dfa[65][1]).toBe(1)
    expect(k.dfa[66][1]).toBe(2)
    expect(k.dfa[67][1]).toBe(0)

    expect(k.dfa[65][2]).toBe(3)
    expect(k.dfa[66][2]).toBe(0)
    expect(k.dfa[67][2]).toBe(0)

    expect(k.dfa[65][3]).toBe(1)
    expect(k.dfa[66][3]).toBe(4)
    expect(k.dfa[67][3]).toBe(0)

    expect(k.dfa[65][4]).toBe(5)
    expect(k.dfa[66][4]).toBe(0)
    expect(k.dfa[67][4]).toBe(0)

    expect(k.dfa[65][5]).toBe(1)
    expect(k.dfa[66][5]).toBe(4)
    expect(k.dfa[67][5]).toBe(6)
  })

  it('should build KMP search', () => {
    let k1 = new KMP(pat1),
        k2 = new KMP(pat2),
        k3 = new KMP(pat3)

    expect(k1.search(txt1)).toBe(6)
    expect(k2.search(txt2)).toBe(false)
    expect(k3.search(txt3)).toBe(false)
  })

  it('', () => {

  })
})
