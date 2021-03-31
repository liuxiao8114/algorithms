import { bruceSearch, bruceSearch2, KMP, BoyerMoore } from '../../src/string/substring'

function bruce(pattern, txt) {
  const M = pattern.length
  const N = txt.length
  const PATTERN_INDEX_END = M - 1

  for(let i = PATTERN_INDEX_END; i < N; i++) {
    let checkNG = false

    for(let j = PATTERN_INDEX_END; j >= 0; j--) {
      if(txt.charAt(i - PATTERN_INDEX_END + j) !== pattern.charAt(j)) {
        checkNG = true
        break
      }
    }

    if(!checkNG)
      return i - PATTERN_INDEX_END
  }

  return false
}

describe('substring test cases', () => {
  const txt1 = 'ABACADABRAC',
        pat1 = 'ABRA',
        txt2 = 'ABACADABRAC',
        pat2 = 'ABCA',
        txt3 = 'AAAAAA',
        pat3 = 'ABC',
        patKMP = 'ABABAC'

  it('newer bruce', () => {
    expect(bruce(pat1, txt1)).toBe(6)
    expect(bruce(pat2, txt2)).toBe(false)

    const pat = `abcdcba`
    const txt = `bcdcbabcba`
    expect(bruce(pat, txt)).toBe(false)
  })

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

  it.only('build DFA using an easier way', () => {
    let k = new KMP(
      patKMP,
      { R: 3, offset: 65 } // ABC only, charCode start at 65
    )

    expect(k.dfa).toEqual(
      [
        [ 1, 1, 3, 1, 5, 1 ],
        [ 0, 2, 0, 4, 0, 4 ],
        [ 0, 0, 0, 0, 0, 6 ],
      ]
    )

    function createNext(pat) {
      const M = pat.length
      const next = new Array(M - 1).fill(0)

      next[0] = 0

      let i = 1, j = 0

      while(i < M) {
        if(pat.charAt(i) === pat.charAt(j)) {
          console.log(`charAt(${i}) equals charAt(${j}), set next[i: ${i}] = ${j + 1}`)
          next[i] = j + 1
          j += 1
        } else {
          console.log(`charAt(${i}) does not equal charAt(${j}), set j = ${next[j]}`)
          j = next[j]
        }

        i += 1
      }

      return next
    }

    console.log(createNext('abababca'))

    function sKMP(txt, pat) {
      const next = createNext(pat)
      const N = txt.length
      const M = pat.length

      let i = 1, j = 0

      for(; i < N && j < M; i++) {
        if(txt.charAt(i) === pat.charAt(j))
          j += 1
        else
          j = next[j]
      }

      if(j === M)
        return i - M
      return null
    }

    expect(sKMP(txt1, pat1)).toBe(6)

    function createNextDFA(pat) {
      const M = pat.length
      const next = new Array(M - 1)

      next[0] = 0

    }
  })

  it('should build KMP search', () => {
    let k1 = new KMP(pat1),
        k2 = new KMP(pat2),
        k3 = new KMP(pat3)

    expect(k1.search(txt1)).toBe(6)
    expect(k2.search(txt2)).toBe(false)
    expect(k3.search(txt3)).toBe(false)
  })
})

describe('EXERCISES', () => {
  /*
  5.3.2
    Give the dfa[][] array for the Knuth-Morris-Pratt algorithm for the pattern
    A A A A A A A A A, and draw the DFA, in the style of the figures in the text.
  5.3.3
    Give the dfa[][] array for the Knuth-Morris-Pratt algorithm for the pattern
    A B R A C A D A B R A, and draw the DFA, in the style of the figures in the text.
  5.3.4
    Write an efficient method that takes a string txt and an integer M as arguments
    and returns the position of the first occurrence of M consecutive blanks in the string,
    txt.length if there is no such occurrence. Estimate the number of character compares
    used by your method, on typical text and in the worst case.
  5.3.5
    Develop a brute-force substring search implementation BruteForceRL that processes
    the pattern from right to left (a simplified version of Algorithm 5.7).
  5.3.6
    Give the right[] array computed by the constructor in Algorithm 5.7 for the
    pattern A B R A C A D A B R A.
  5.3.7
    Add to our brute-force implementation of substring search a count() method to
    count occurrences and a searchAll() method to print all occurrences.
  5.3.8
    Add to KMP a count() method to count occurrences and a searchAll() method
    to print all occurrences.
  5.3.9
    Add to BoyerMoore a count() method to count occurrences and a searchAll()
    method to print all occurrences.
  5.3.10
    Add to RabinKarp a count() method to count occurrences and a searchAll()
    method to print all occurrences.
  */

  it('5.3.4', () => {
    function consecutiveBlanks(txt, m) {


    }
  })
})
