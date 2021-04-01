import { charCodeAtWithOffset, fromCharCode } from './utils'

export function bruceSearch(pat, txt) {
  let M = pat.length,
      N = txt.length
  for(let i = 0; i < N - M; i++) {
    let j
    for(j = 0; j < M; j++) {
      if(txt.charAt(i + j) !== pat.charAt(j))
        break
    }
    if(j === M) return i
  }
  return false
}

export function bruceSearch2(pat, txt) {
  let M = pat.length,
      N = txt.length,
      i, j
  for(i = 0, j = 0; i < N && j < M; i++) {
    if(txt.charAt(i) === pat.charAt(j))
      j++
    else {
      i -= j
      j = 0
    }
  }
  if(j === M) return i - M
  return false
}

export function KMP(pat, options = {}) {
  if(Array.isArray(pat))
    pat = pat.join()

  if(typeof pat !== 'string')
    throw new Error('pattern should be String')

  const { R = 256, offset = 0 } = options
  const M = pat.length

  this.pat = pat
  this.R = R
  this.offset = offset
  this.dfa = new Array(R) // cannot use new Array(R).fill(new Array(M)), it will make all elements in the array will have the same subArray.

  this.initDFA(M)
  // for(let i = 0; i < this.dfa.length; i++) {
  //   this.dfa[i] = new Array(M).fill(0)
  // }
  //
  // this.dfa[charCodeAtWithOffset(this.pat, 0, this.offset)][0] = 1
  //
  // for(let x = 0, j = 1; j < M; j++) {
  //   for(let c = 0; c < R; c++)
  //     this.dfa[c][j] = this.dfa[c][x] // mismatch pattern
  //
  //   const charCodeAtJ = charCodeAtWithOffset(this.pat, j, this.offset)
  //   this.dfa[charCodeAtJ][j] = j + 1  // match pattern, point to next
  //   x = this.dfa[charCodeAtJ][x]      // update x
  // }
}

KMP.prototype = {
  search(txt) {
    if(typeof txt !== 'string')
      throw new Error('only search for string')
    let M = this.pat.length,
        N = txt.length,
        i, j

    for(i = 0, j = 0; i < N && j < M; i++)
      j = this.dfa[charCodeAtWithOffset(txt, i, this.offset)][j]
    if(j === M) return i - M

    return false
  },
  initDFA(M) {
    for(let i = 0; i < this.dfa.length; i++)
      this.dfa[i] = new Array(M).fill(0)

    this.dfa[charCodeAtWithOffset(this.pat, 0, this.offset)][0] = 1

    for(let x = 0, j = 1; j < M; j++) {
      for(let c = 0; c < this.R; c++)
        this.dfa[c][j] = this.dfa[c][x] // mismatch pattern

      const charCodeAtJ = charCodeAtWithOffset(this.pat, j, this.offset)
      this.dfa[charCodeAtJ][j] = j + 1  // match pattern, point to next
      x = this.dfa[charCodeAtJ][x]      // update x
    }
  },
  *visualizeDFA(M) {
    yield 1
    
    for(let i = 0; i < this.dfa.length; i++)
      this.dfa[i] = new Array(M).fill(0)

    this.dfa[charCodeAtWithOffset(this.pat, 0, this.offset)][0] = 1

    for(let x = 0, j = 1; j < M; j++) {
      for(let c = 0; c < this.R; c++)
        this.dfa[c][j] = this.dfa[c][x] // mismatch pattern

      const charCodeAtJ = charCodeAtWithOffset(this.pat, j, this.offset)
      this.dfa[charCodeAtJ][j] = j + 1  // match pattern, point to next
      x = this.dfa[charCodeAtJ][x]      // update x
    }
  }
}

export function BoyerMoore(pat, R = 256) {
  if(typeof pat !== 'string' || typeof pat !== 'number')
    throw new Error('pattern must be a string-like')

  this.right = []
  this.R = R

  const M = pat.length

  for(let c = 0; c < this.R; c++)
    this.right[c] = -1                //
  for(let j = 0; j < M; j++)
    this.right[pat.charCodeAt(j)] = j //
}

BoyerMoore.prototype.search = function(txt) {
  if(typeof txt !== 'string')
    throw new Error('only search for string')

  let M = this.pat.length,
      N = txt.length,
      i, j, skip

  for(i = 0; i <= N - M; )
    for(j = M - 1; j >= 0; )
      if(this.pat.charAt(j) === txt.charAt(i)) {
        j--
        i--
      }

  if(j === M) return i - M

  return false
}

/*
### Backing up the pattern pointer.
In KMP substring search, we never back up the text pointer
i, and we use an array dfa[][] to record how
far to back up the pattern pointer j when a
mismatch is detected.

For every character c,
dfa[c][j] is the pattern position to compare
against the next text position after comparing
c with pat.charAt(j).

During the search,
dfa[txt.charAt(i)][j] is the pattern position
to compare with txt.charAt(i+1) after comparing
txt.charAt(i) with pat.charAt(j).

For a match, we want to just move on to the
next character, so dfa[pat.charAt(j)][j] is
always j+1. For a mismatch, we know not just
txt.charAt(i), but also the j-1 previous characters
in the text: they are the first j-1 characters
in the pattern. For each character c, imagine that
we slide a copy of the pattern over these j characters
(the first j-1 characters in the pattern followed
by c -- we are deciding what to do when
these characters are txt.charAt(i-j+1..i)),
from left to right, stopping when all overlapping
characters match (or there are none).
This gives the next possible place the pattern
could match. The index of the pattern character
to compare with txt.charAt(i+1)
(dfa[txt.charAt(i)][j]) is precisely the
number of overlapping characters.

### KMP search
the first dfa[txt.charAt(i)][j] characters at that position match
the first dfa[txt.charAt(i)][j] characters of the pattern,
so there is no need to back up the i pointer: we can simply set j to dfa[txt.charAt(i)][j] and
increment i, which is precisely what we do when i and j point to matching characters.

### DFA simulation.
A useful way to describe this process is in terms of a deterministic
finite-state automaton (DFA). Indeed, as indicated by its name, our dfa[][] array precisely
defines a DFA. The graphical DFA represention shown at the bottom of this page
consists of states (indicated by circled
numbers) and transitions (indicated by
labeled lines). There is one state for each
character in the pattern, each such state
having one transition leaving it for each
character in the alphabet. For the substring-
matching DFAs that we are considering,
one of the transitions is a match
transition (going from j to j+1 and labeled
with pat.charAt(j)) and all the others
are mismatch transition (going left).

The states correspond to character compares, one for each value of the pattern index.
The transitions correspond to changing the value of the pattern index.
When examining the text character i when in the state labeled j,
the machine does the following: “Take the transition to dfa[txt.charAt(i)][j] and
move to the next character (by incrementing i).’’ For a match transition, we move to
the right one position because dfa[pat.charAt(j)][j] is always j+1; for a mismatch
transition we move to the left. The automaton reads the text characters one at a time,
from left to right, moving to a new state each time it reads a character. We also include a
halt state M that has no transitions. We start the machine at state 0: if the machine reaches
state M, then a substring of the text
matching the pattern has been found
(and we say that the DFA recognizes the
pattern); if the machine reaches the
end of the text before reaching state
M, then we know the pattern does not
appear as a substring of the text. Each
pattern corresponds to an automaton
(which is represented by the dfa[][]
array that gives the transitions). The
KMP substring search() method is
a Java program that simulates the operation

To get a feeling for the operation of
a substring search DFA, consider two
of the simplest things that it does. At the beginning of the process,
when started in state 0 at the beginning of the text, it stays
in state 0, scanning text characters, until it finds a text character that is equal to the first
pattern character, when it moves to the next state and is off and running. At the end of
the process, when it finds a match, it matches pattern characters with the right end of
the text, incrementing the state until reaching state M. The trace at the top of this page
gives a typical example of the operation of our example DFA. Each match moves the
DFA to the next state (which is equivalent to incrementing the pattern index j); each
mismatch moves the DFA to an earlier state (which is equivalent to setting the pattern
index j to a smaller value). The text index i marches from left to right, one position at
a time, while the pattern index j bounces around in the pattern as directed by the DFA.


When we have a mismatch at pat.charAt(j), our interest
is in knowing in what state the DFA would be if we were to back up the text index and
rescan the text characters that we just saw after shifting to the right one position. We do
not want to actually do the backup, just restart the DFA as if we had done the backup.
**
The key observation is that the characters in the text that would need to be rescanned
are precisely pat.charAt(1) through pat.charAt(j-1): we drop the first character
to shift right one position and the last character because of the mismatch.
These are pattern characters that we know, so we can figure out ahead of time,
for each possible mismatch position, the state where we need to restart the DFA.
**

The figure at left shows the possibilities
for our example. Be sure that you understand this concept.

A B A B A C
1 A
    0
2 A B
    0 0
3 A B A
    0 0 1
4 A B A B
    0 0 1 2
5 A B A B A
    0 0 1 2 3

What should the DFA do with the next character? Exactly
what it would have done if we had backed up, except if it finds
a match with pat.charAt(j), when it should go to state j+1.
For example, to decide what the DFA should do when we have
a mismatch at j = 5 for A B A B A C, we use the DFA to learn
that a full backup would leave us in state 3 for B A B A, so we
can copy dfa[][3] to dfa[][5], then set the entry for C to 6
because pat.charAt(5) is C (a match). Since we only need to
know how the DFA runs for j-1 characters when we are building
the jth state, we can always get the information that we need
from the partially built DFA.
The final crucial detail to the computation is to observe that maintaining the restart
position X when working on column j of dfa[][] is easy because X < j so that we can use
the partially built DFA to do the job—the next value of X is dfa[pat.charAt(j)][X]).
Continuing our example from the previous paragraph, we would update the value of
X to dfa['C'][3] = 0 (but we do not use that value because the DFA construction is
complete).


Substring search.
With the right[] array precomputed,
the implementation in Algorithm 5.7 is straightforward. We have an index
i moving from left to right through the text and an index j moving from right to left
through the pattern.
The inner loop tests whether the pattern aligns with the text at position i.
If txt.charAt(i+j) is equal to pat.charAt(j) for all j from M-1 down to 0, then there is a match.
Otherwise, there is a character mismatch, and we have one of
the following three cases:

■ If the character causing the mismatch is
not found in the pattern, we can slide the
pattern j+1 positions to the right (increment
i by j+1).
Anything less would align that character with some pattern character.
Actually, this move aligns some known
characters at the beginning of the pattern
with known characters at the end of the
pattern so that we could further increase
i by precomputing a KMP-like table (see
example at right).

■
If the character c causing the mismatch is found in the pattern,
we use the right[] array to line up the pattern with the
text so that character will match its rightmost occurrence in the pattern. To do
so, we increment i by j minus right[c]. Again, anything less would align that
text character with a pattern character it could not match (one to the right of its
rightmost occurrence). Again, there is a possibility that we could do better with a
KMP-like table, as indicated in the top example in the figure on page 773.
*/
