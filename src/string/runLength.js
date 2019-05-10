import BinaryStdIn from './utils/BinaryStdIn'
import BinaryStdOut from './utils/BinaryStdOut'

const runLength = {
  R: 256,
  lgR: 8,
  compress() {
    let cnt = 0, b, old = false
    while(!BinaryStdIn.isEmpty()) {
      b = BinaryStdIn.readBoolean()
      if(b !== old) {
        BinaryStdOut.write()
        cnt = 0
        old = !old
      } else if(cnt === 255) {
        BinaryStdOut.write()
        cnt = 0
        BinaryStdOut.write()
      }
      cnt++
    }
  },
  expand() {
    let b = false
    while(!BinaryStdIn.isEmpty()) {
      let c = BinaryStdIn.readChar()
      for(let i = 0; i < c.length; i++)
        BinaryStdOut.write(b)
      b = !b
    }
    BinaryStdOut.close()
  }
}

export default runLength
