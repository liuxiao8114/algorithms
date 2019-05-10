const R = 256

export function arrayCopy(src, srcIndex, tar, tarIndex, len) {
  if(src === tar)
    src = src.concat()

  for(let i = 0; i < len; i++)
    tar[tarIndex + i] = src[srcIndex + i]
}

export function encode(s) {
  let seq = [],
      out = ''

  for(let i = 0; i < R; i++)
    seq[i] = i

  for(let i = 0; i < s.length; i++) {
    let idx = 0

    for(; idx < R && seq[idx] !== s.charCodeAt(i); idx++);

    out += idx + ' '
    arrayCopy(seq, 0, seq, 1, idx)
    seq[0] = s.charCodeAt(i)
  }

  return out
}

export function decode(out) {
  let origin = ''
  let seq = []
  if(typeof out === 'string')
    out = out.split(/\s/)

  for(let i = 0; i < R; i++)
    seq[i] = i

  for(let i = 0; i < out.length - 1; i++) {
    let idx = out[i],
        c = seq[idx]

    origin += String.fromCharCode(c)
    arrayCopy(seq, 0, seq, 1, idx)
    seq[0] = c
  }

  return origin
}

/*
st: A的索引是？
st['A'] = 0
st[0 - 'A'] = x + 1
str[x + 1] = ?
str: 第n个索引是？
temp = st['A']
for(int i = 0; i < temp; i++) {
  str[st[i] + 1] = str[st[i]]
  st[i]++
}

str[0] = 'A'
str[]
*/
