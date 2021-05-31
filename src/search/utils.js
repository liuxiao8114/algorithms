const fs = require('fs')

export function Node(key, value, next = null) {
  this.next = next
  this.key = key
  this.value = value
  // this.item = { key, value }
}

export function frequencyCounter(path, st, callback = () => {}, cutoff) {
  const stream = fs.createReadStream(path)
  stream.setEncoding('utf8')
  let data = ''

  stream.on('readable', () => {
    let next = stream.read(1)
    while(next) {
      if(/\r?\n|\s/.test(next)) {
        if(data !== '') {
          // console.log(`putData: [${data}]`)
          if(!st.contains(data)) st.put(data, 1)
          else st.put(data, st.get(data) + 1)
          data = ''
        }
      } else {
        data += next
      }
      next = stream.read(1)
    }
    if(data !== '') {
      // console.log(`putLastData: [${data}]`)
      if(!st.contains(data)) st.put(data, 1)
      else st.put(data, st.get(data) + 1)
    }
  })

  stream.on('end', callback)
}
