const fs = require('fs')

export default function frequencyCounter(path, st, callback) {
  const stream = fs.createReadStream(path)
  stream.setEncoding('utf8')
  let data = ''

  stream.on('readable', () => {
    let next = stream.read(1)
    while(next) {
//      console.log(`in readable process: ${next}`) //eslint-disable-line
      if(next !== ' ') {
        data += next
      } else {
        data = data.replace(/\r\n/g, '').replace(/\n/g, '')
        if(!st.contains(data)) st.put(data, 1)
        else st.put(data, st.get(data) + 1)
        data = ''
      }
      next = stream.read(1)
    }
    if(data) {
      data = data.replace(/\r\n/g, '')
      if(!st.contains(data)) st.put(data, 1)
      else st.put(data, st.get(data) + 1)
      data = ''
    }
  })

  stream.on('end', callback)
}
