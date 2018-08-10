// (add 2 (subtract 4 2))   =>   [{ type: 'paren', value: '(' }, ...]
function tokenizer(input) {
  let current = 0
  let tokens = []

  while(current < input.length) {
    let char = input[current]
    if(char === '(') {
      tokens.push({
        type: 'paren',
        value: '('
      })
      current++
      continue
    }

    if(char === ')') {
      tokens.push({
        type: 'paren',
        value: ')'
      })
      current++
      continue
    }

    let WHITESPACE = /\s/
    if(WHITESPACE.test(char)) {

    }
  }

  return tokens
}
