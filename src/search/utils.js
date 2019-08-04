const fs = require('fs')

export default function frequencyCounter(path, st, callback) {
  const stream = fs.createReadStream(path)
  stream.setEncoding('utf8')
  let data = ''

  stream.on('readable', () => {
    let next = stream.read(1)
    while(next) {
      if(next.match(/\r\n/) || next.match(/\n/) || next.trim() === '') {
        if(!st.contains(data)) st.put(data, 1)
        else st.put(data, st.get(data) + 1)
        data = ''
      } else {
        data += next
      }
      next = stream.read(1)
    }
    if(data) {
      if(!st.contains(data)) st.put(data, 1)
      else st.put(data, st.get(data) + 1)
      data = ''
    }
  })

  stream.on('end', callback)
}
