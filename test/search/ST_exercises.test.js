import assert from 'assert'
import SequentialSearchST from '../../src/search/SequentialSearchST'
import BinarySearchST from '../../src/search/BinarySearchST'
import { frequencyCounter, Node } from '../../src/search/utils'

describe('BinarySearchST test cases', () => {
  const example = `SEARCHEXAMPLE`
  const TINY = `${__dirname}/_data/tinyTale`
  const TINY_MAX_WORD = 'of'
  const TINY_MAX_COUNT = 10

  // 3.1.1 Write a client that creates a symbol table mapping letter grades to numerical
  // scores, as in the table below, then reads from standard input a list of letter grades and
  // computes and prints the GPA (the average of the numbers corresponding to the grades).
  // A+    A     A-    B+    B     B-    C+    C     C-    D     F
  // 4.33  4.00  3.67  3.33  3.00  2.67  2.33  2.00  1.67  1.00  0.00
  it('test 3.1.1', () => {
    const grades =
    `A+ 4.33
    A 4.00
    A- 3.67
    B+ 3.33
    B 3.00
    B- 2.67
    C+ 2.33
    C 2.00
    C- 1.67
    D 1.00
    F 0.00`.split(/\r?\n/)

    const st = new BinarySearchST()

    for(let obj of grades) {
      let [ grade, scores ] = obj.trim().split(/\s+/)
      st.put(grade, Number(scores))
    }

    const students = [ 'A+', 'A-', 'A', 'A', 'A' ]
    let sum = 0

    for(let grade of students)
      sum += st.get(grade)

    expect(Math.floor(sum / students.length)).toBe(4)
  })

  // 3.1.2 Develop a symbol-table implementation ArrayST that uses an (unordered) array
  // as the underlying data structure to implement our basic symbol-table API.

  // 3.1.22 Self-organizing search. A self-organizing search algorithm is one that rearranges
  // items to make those that are accessed frequently likely to be found early in the search.
  // Modify your search implementation for Exercise 3.1.2 to perform the following action
  // on every search hit: move the key-value pair found to the beginning of the list, moving
  // all pairs between the beginning of the list and the vacated position to the right one position.
  // This procedure is called the move-to-front heuristic.
  it('test 3.1.2', done => {
    function ArrayST() {
      this.nodes = []
    }

    ArrayST.prototype = {
      constructor: ArrayST,
      getNode(key) {
        // 3.1.2
        // for(let node of this.nodes)
        //   if(node.key === key)
        //     return node
        for(let i = 0; i < this.nodes.length; i++) {
          if(this.nodes[i].key === key) {
            let tmp = this.nodes[i]

            // for(let j = 0; j < i; j++)
            for(let j = i - 1; j >= 0; j--)
              this.nodes[j + 1] = this.nodes[j]
            this.nodes[0] = tmp
            return tmp
          }
        }
      },
      get(key) {
        const node = this.getNode(key)
        if(node)
          return node.value
      },
      put(key, value) {
        const node = this.getNode(key)
        if(node)
          return node.value = value
        return this.nodes.unshift({ key, value })
      },
      contains(key) {
        return this.get(key) != null
      },
      isEmpty() {
        return !this.nodes.length
      }
    }

    let st = new ArrayST()

    for(let i = 0; i < example.length; i++)
      st.put(example[i], i)

    expect(st.get('S')).toBe(0)
    // for 3.1.22
    expect(st.nodes[0].key === 'S')
    expect(st.get('E')).toBe(12)
    // for 3.1.22
    expect(st.nodes[0].key === 'E')
    expect(st.get('A')).toBe(8)
    // // for 3.1.22
    // expect(st.nodes[0].key === 'A')

    st = new ArrayST()

    const maxCounter = () => {
      let max = null
      for(let item of st.nodes)
        if(!max || item.value > max.value) max = item
      expect(max).toEqual({ key: TINY_MAX_WORD, value: TINY_MAX_COUNT })
      done()
    }

    frequencyCounter(TINY, st, maxCounter)
  })

  // 3.1.3 Develop a symbol-table implementation OrderedSequentialSearchST that
  // uses an ordered linked list as the underlying data structure to implement our ordered
  // symbol-table API.
  it('test 3.1.3', () => {
    function OrderedSequentialSearchST() {
      /*
       *p
        |
        a -> b -> c -> d -> e
      */
      //
      this.first = null
      this.pointer = null
      this.N = 0
    }

    OrderedSequentialSearchST.prototype = {
      constructor: OrderedSequentialSearchST,
      get(key) {
        if(this.isEmpty())
          return
        let next = this.first

        while(next) {
          if(next.key === key)
            return next.value
          next = next.next
        }
      },
      put(key, value) {
        if(this.isEmpty())
          this.first = new Node(key, value)
      },
      isEmpty() {
        return this.N == 0
      }
    }
  })

  // 3.1.4 Develop Time and Event ADTs that allow processing of data as in the example
  // illustrated on page 367.
  // 3.1.5 Implement size(), delete(), and keys() for SequentialSearchST.
  it('tests 3.1.5', () => {
    SequentialSearchST.prototype.size = function() { /* running time: 1 */
      return this.N
    }
    SequentialSearchST.prototype.delete = function(key) {  /* running time: N */
      if(this.isEmpty())
        return

      if(this.first.key === key) {
        this.first = this.first.next
        this.N--
        return
      }

      let next = this.first

      while(next.next) {
        if(next.next.key === key) {
          next.next = next.next.next
          this.N--
          return
        }
        next = next.next
      }
    }
    SequentialSearchST.prototype.keys = function() {  /* running time: N */
      let next = this.first
      const keys = []

      while(next) {
        keys.push(next.key)
        next = next.next
      }

      return keys
    }

    let st = new SequentialSearchST()

    for(let i = 0; i < example.length; i++)
      st.put(example[i], i)

    expect(st.size()).toBe(9)
    expect(st.keys()).toEqual('LPMXHCRAES'.split(''))

    st.delete('L')
    expect(st.keys()).toEqual('PMXHCRAES'.split(''))
    expect(st.size()).toBe(8)
    st.delete('E')
    expect(st.keys()).toEqual('PMXHCRAS'.split(''))
    expect(st.size()).toBe(7)
    st.delete('S')
    expect(st.keys()).toEqual('PMXHCRA'.split(''))
    expect(st.size()).toBe(6)
    st.delete('M')
    expect(st.keys()).toEqual('PXHCRA'.split(''))
    expect(st.size()).toBe(5)
  })

  // 3.1.6 Give the number of calls to put() and get() issued by FrequencyCounter, as a
  // function of the number W of words and the number D of distinct words in the input.
  /*
    distinct number: call 1 put
    repeated number: call 1 put and 1 get

    so W words need W calls of put, and W - D calls of get.
  */

  // 3.1.7 What is the average number of distinct keys that FrequencyCounter will find
  // among N random nonnegative integers less than 1,000, for N=10, 102, 103, 104, 105, and 106?
  /*

  */

  // 3.1.8 What is the most frequently used word of ten letters or more in Tale of Two Cities?

  // 3.1.9 Add code to FrequencyCounter to keep track of the last call to put(). Print the
  // last word inserted and the number of words that were processed in the input stream
  // prior to this insertion. Run your program for tale.txt with length cutoffs 1, 8, and 10.

  // 3.1.10 Give a trace of the process of inserting the keys E A S Y Q U E S T I O N into an
  // initially empty table using SequentialSearchST. How many compares are involved?

  // 3.1.11 Give a trace of the process of inserting the keys E A S Y Q U E S T I O N into
  // an initially empty table using BinarySearchST. How many compares are involved?

  // 3.1.12 Modify BinarySearchST to maintain one array of Item objects that contain
  // keys and values, rather than two parallel arrays. Add a constructor that takes an array of
  // Item values as argument and uses mergesort to sort the array.
  it('tests 3.1.12', () => {
    function BinarySearchSTCopy(items) {
      this.N = 0
      this.items = []
    }

    BinarySearchSTCopy.prototype = {
      ...BinarySearchST.prototype,
      constructor: BinarySearchSTCopy,
    }
  })

  // 3.1.23 Analysis of binary search. Prove that the maximum number of compares used for a binary search
  // in a table of size N is precisely the number of bits in the binary representation of N,
  // because the operation of shifting 1 bit to the right converts the binary representation of N
  // into the binary representation of ⎣N/2⎦.

  // 3.1.24 Interpolation search. Suppose that arithmetic operations are allowed on keys
  // (for example, they may be Double or Integer values). Write a version of binary search
  // that mimics the process of looking near the beginning of a dictionary when the word
  // begins with a letter near the beginning of the alphabet. Specifically, if kx is the key value
  // sought, klo is the key value of the first key in the table, and khi is the key value of the
  // last key in the table, look first ⎣(kx - klo)/(khi - klo)⎦-way through the table, not halfway.
  // Test your implementation against BinarySearchST for FrequencyCounter using SearchCompare.

  // it('tests 3.1.24', () => {
  //   function BinarySearchSTCopy() {
  //     BinarySearchST.call(this)
  //   }
  //
  //   let count = 0
  //
  //   BinarySearchSTCopy.prototype = {
  //     ...BinarySearchST.prototype,
  //     constructor: BinarySearchSTCopy,
  //     rankRecusive(key, lo = 0, hi = this.keys.length - 1) {
  //       if(lo > hi) return lo
  //       console.log(`count: ${count}, lo: ${lo}, hi: ${hi}, key: ${key}`)
  //       if(count > 20) return
  //       count += 1
  //
  //       let mid
  //       if(lo === hi) mid = lo
  //       else mid = lo + Math.floor((key - this.keys[lo]) / (this.keys[hi] - this.keys[lo]))
  //
  //       if(this.keys[mid] < key) return this.rankRecusive(key, mid + 1, hi)
  //       if(this.keys[mid] > key) return this.rankRecusive(key, lo, mid - 1)
  //       return mid
  //     },
  //     rank(key) {   /* running time: logN */
  //       assert(typeof key === 'number', '3.1.24 needs number keys for arithmetic operations')
  //       if(this.keys.length === 0 || key < this.keys[0])
  //         return 0
  //       if(key > this.keys[this.keys.length - 1])
  //         return this.keys.length - 1
  //       return this.rankRecusive(key)
  //     },
  //     put(key, value) {   /* running time: N + logN */
  //       let i = this.rank(key)
  //       console.log(`tell me i: ${i}`)
  //       if(this.keys[i] === key) this.values[i] = value
  //       else {
  //         for(let j = this.N; j > i; j--) {
  //           this.keys[j] = this.keys[j - 1]
  //           this.values[j] = this.values[j - 1]
  //         }
  //         this.N++
  //         this.keys[i] = key
  //         this.values[i] = value
  //       }
  //     },
  //   }
  //
  //   const intExample = [ 21, 5, 1, 20, 3, 8, 5, 24, 1, 13, 16, 12, 5 ]
  //   const doubleExample = [ 21.5, 5.5, 1.5, 20.5, 3.5, 8.5, 5.5, 24.5, 1.5, 13.5, 16.5, 12.5, 5.5 ]
  //   let st = new BinarySearchSTCopy()
  //
  //   for(let i = 0; i < intExample.length; i++)
  //     st.put(intExample[i], i)
  //
  //   expect(st.get(21)).toBe(0)
  //   expect(st.get(5)).toBe(12)
  //   expect(st.get(1)).toBe(8)
  //
  //   st = new BinarySearchSTCopy()
  //
  //   for(let i = 0; i < doubleExample.length; i++)
  //     st.put(doubleExample[i], i)
  // })

  // 3.1.25 Software caching. Since the default implementation of contains() calls get(),
  // the inner loop of FrequencyCounter
    // if (!st.contains(word)) st.put(word, 1);
    // else st.put(word, st.get(word) + 1);
  // leads to two or three searches for the same key. To enable clear client code like this
  // without sacrificing efficiency, we can use a technique known as software caching, where
  // we save the location of the most recently accessed key in an instance variable. Modify
  // SequentialSearchST and BinarySearchST to take advantage of this idea.

  // 3.1.27 Small tables. Suppose that a BinarySearchST client has S search operations
  // and N distinct keys. Give the order of growth of S such that the cost of building the table
  // is the same as the cost of all the searches.

  // 3.1.28 Ordered insertions. Modify BinarySearchST so that inserting a key that is larger
  // than all keys in the table takes constant time (so that building a table by calling put()
  // for keys that are in order takes linear time).
  it('tests 3.1.28', () => {
    BinarySearchST.prototype.rank = function(key) {
      if(key < this.keys[0])
        return 0
      if(key > this.keys[this.keys.length - 1])
        return this.keys.length - 1
      return this.rankIterator(key)
    }
  })


})
