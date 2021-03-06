import shell from '../../src/sort/shellSort'

function range(from, to) {
  return Math.floor(Math.random() * (to - from) + from)
}

describe('insertion test', () => {
  it('iterator custom 0 - 16 array and sort', () => {
    const a = [ 15, 8, 2, 3, 6, 11, 10, 1, 12, 16, 14, 7, 13, 4, 9, 0, 5 ]
    shell.sort(a)
    for(let i = 0; i < 17; i++) {
      expect(a[i]).toBe(i)
    }
  })

  it('iterator random 100 number and sort', () => {
    const a_100 = []

    for(let i = 0; i < 100; i++) {
      a_100.push(range(1, 500))
    }

    shell.sort(a_100)

    expect(Math.min(...a_100)).toEqual(a_100[0])
    expect(Math.max(...a_100)).toEqual(a_100[99])
  })
})
