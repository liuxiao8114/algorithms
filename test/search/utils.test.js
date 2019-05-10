import frequencyCounter from '../../src/search/utils'
import SequentialSearchST from '../../src/search/SequentialSearchST'

const TEXT_PATH = `test/search/littleWords.txt`
const MAX_WORDS = `was`

describe('do some RegExps', () => {
  it('/g pattern', () => {
    const text = 'cat, bat, sat, fat'
    const pattern = /.at/g
    let matches = pattern.exec(text)
    expect(matches[0]).toBe('cat')
    expect(pattern.lastIndex).toBe(3)
    expect(matches.index).toBe(0)
    matches = pattern.exec(text)
    expect(matches[0]).toBe('bat')
  })

  it('works different with diff patterns', () => {
    const text1 = 'hello1 ',
          text2 = 'hello2 ',
          text3 = '\r\nhello3 '
    const text = `${text1 + text2 + text3}`,
          pattern = /hello\d\s?/,
          globalPattern = /hello\d\s?/g,
          strickyPattern = /hello\d\s?/s,
          multilinePattern = /hello\d\s?/m
    let matches = pattern.exec(text),
        globalMatches = globalPattern.exec(text),
        strickyMatches = strickyPattern.exec(text),
        multilineMatches = multilinePattern.exec(text)

    expect(matches[0]).toBe(text1)
    expect(globalMatches[0]).toBe(text1)
    expect(strickyMatches[0]).toBe(text1)
    expect(multilineMatches[0]).toBe(text1)

    expect(pattern.lastIndex).toBe(0)
    expect(globalPattern.lastIndex).toBe(7)
  })
})

describe('utils test cases', () => {
  it('gives counts for ST testing', done => {
    const st = new SequentialSearchST()
    const maxCounter = () => {
      let max = null
      for(let item of st.items())
        if(!max || item.value > max.value) max = item
      expect(max).toEqual({ key: MAX_WORDS, value: 3 })
      done()
    }
    frequencyCounter(TEXT_PATH, st, maxCounter)
  })
/*
  it('uses createReadStream to read a file', () => {
    const stream = fs.createReadStream(TEXT_PATH)
    stream.setEncoding('utf8')
    let i = 0
    stream.on('readable', () => {
      expect(stream.read(1)).toEqual(TEXT[i++])
      done() //eslint-disable-line
    })
  })

    // stream.pause()
    // console.log(`readable: ${stream.read()}`)
    // console.log(`isPaused: ${stream.isPaused()}`)
    let arr = []
    stream.on('data', function (chunk) {
      arr.push(chunk)
    })

    while (data) {
      console.log(`data2: ${data}`)
      data = this.read()
    }
    stream.on('end', () => {
      console.log(`end`)
    })
*/

/*
    return fs.readFile('test/search/littleWords.txt', 'utf8', (err, data) => {
      if(err)
        throw new Error(`read File: ${err}`)
      const words = data.split(/s+/m)
      expect(words).toEqual([])
    })
*/
})
