import fs from 'fs'
import { LSD } from '../../src/string/stringSort'

describe('LSD test cases', () => {
  it('lsd sort string array', () => {
    /*
    fs.readFile('/test/string/__testData', datas => {
      console.log('what datas: ' + datas)
      const tmp = datas.split(/\n/)

      function iter(a, i) {
        if(i > tmp.length - 1) return
        TEST_DATA.push(a[i].split(' ').slice(1))
        iter(a, ++i)
      }

      iter(tmp, 0)

      LSD.sort(TEST_DATA, 3)
      expect(TEST_DATA[0]).toEqual(['a d d'])
      done()
    })
    */
    const TEST_DATA =
      [ 'dab', 'add', 'cab', 'fad', 'fee', 'bad', 'dad', 'bee', 'fed', 'bed', 'ebb', 'ace' ]

    const TEST_DATA_SORTED =
      [ 'ace', 'add', 'bad', 'bed', 'bee', 'cab', 'dab', 'dad', 'ebb', 'fad', 'fed', 'fee' ]

    LSD.sort(TEST_DATA, 3)
    for(let i = 0; i < TEST_DATA.length; i++)
      expect(TEST_DATA[i]).toEqual(TEST_DATA_SORTED[i])
  })
})
