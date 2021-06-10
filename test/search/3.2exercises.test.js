import assert from 'assert'
import BinarySearchTree, { Node } from '../../src/search/BinarySearchTree'
import { frequencyCounter } from '../../src/search/utils'

describe("3.2 Binary Search Trees exercises' solutions and tests.", () => {
  const example = `SEARCHEXAMPLE`
  const TINY = `${__dirname}/_data/tinyTale`
  const TINY_MAX_WORD = 'of'
  const TINY_MAX_COUNT = 10

  // 3.2.1 Draw the BST that results when you insert the keys E A S Y Q U E S T I O N,
  // in that order (associating the value i with the ith key, as per the convention in the text)
  // into an initially empty tree. How many compares are needed to build the tree?

  // 3.2.2 Inserting the keys in the order A X C S E R H into an initially empty BST gives
  // a worst-case tree where every node has one null link, except one at the bottom, which
  // has two null links. Give five other orderings of these keys that produce worst-case trees.
  /*
                X S R A C E H
                X S A C E H R
                X A C E H R S
    DESC ORDER: X S R H E C A
                A X S R H E C
                A C X S R H E
                A C E X S R H
                A C E H X S R
                A C E H R X S
    ASC ORDER:  A C E H R S X

  */

  // 3.2.3 Give five orderings of the keys A X C S E R H that, when inserted into an initially
  // empty BST, produce the best-case tree.

  /*
    H C S A E R X
    H C A E S R X
    H C E A S R X
    H C A S E R X
    H C A S R E X
    H C A S X E R
    H C A S X R E
    ...
    H S R X C A E
  */

  // 3.2.4 Suppose that a certain BST has keys that are integers between 1 and 10, and we
  // search for 5. Which sequence below cannot be the sequence of keys examined?
    //    a. 10, 9, 8, 7, 6, 5
    //    b. 4, 10, 8, 7, 5
    //    c. 1, 10, 2, 9, 3, 8, 4, 7, 6, 5
    //  * d. 2, 7, 3, 8, 4, 5
    //    e. 1, 2, 10, 4, 8, 5

  // 3.2.5 Suppose that we have an estimate ahead of time of how often search keys are
  // to be accessed in a BST, and the freedom to insert them in any order that we desire.
  // Should the keys be inserted into the tree in increasing order, decreasing order of likely
  // frequency of access, or some other order? Explain your answer.
  /*
          1
      2       3
    4   5   6   7
  */

  // 3.2.6 Add to BST a method height() that computes the height of the tree. Develop two implementations:
  // a recursive method (which takes linear time and space proportional to the height), and a method like
  // size() that adds a field to each node in the tree (and takes linear space and constant time per query).
  it('test 3.2.6', () => {
    BinarySearchTree.prototype.height = function() {
      if(!this.root)
        return 0

      this.heightNode(this.root, 1)
      return this.h
    }

    BinarySearchTree.prototype.heightNode = function(node, h) {
      if(!node)
        return 0

      node.height = h

      if(!this.h || this.h < h)
        this.h = h

      this.heightNode(node.left, h + 1)
      this.heightNode(node.right, h + 1)
    }

    const st = new BinarySearchTree()
    for(let i = 0; i < example.length; i++)
      st.put(example[i], i)

    expect(st.height()).toBe(6)
    expect(st.getNode('A').height).toBe(3)
    expect(st.getNode('X').height).toBe(2)
    expect(st.getNode('M').height).toBe(5)
  })

  // 3.2.7 Add to BST a recursive method avgCompares() that computes the average number of compares
  // required by a random search hit in a given BST (the internal path length of the tree divided by
  // its size, plus one). Develop two implementations: a recursive method (which takes linear time and
  // space proportional to the height), and a method like size() that adds a field to each node in the tree
  // (and takes linear space and constant time per query).
  it('test 3.2.7', () => {
    const compareTo = Node.prototype.compareTo

    const CompareToWithCounter = function(key) {
      if(this.compareCounter)
        this.compareCounter += 1
      else
        this.compareCounter = 1

      return compareTo.call(this, key)
    }

    Node.prototype.compareTo = CompareToWithCounter

    BinarySearchTree.prototype.avgCompares = function(nodeOrkey = this.root) {
      if(nodeOrkey instanceof Node)
        return nodeOrkey.compareCounter
      if(typeof nodeOrkey === 'string')
        return this.getNode(nodeOrkey.toUpperCase()).compareCounter

      return null
    }

    const st = new BinarySearchTree()

    for(let i = 0; i < example.length; i++)
      st.put(example[i], i)

    expect(st.avgCompares('X')).toBe(1) // getNode
    expect(st.avgCompares('P')).toBe(1) // getNode
    expect(st.avgCompares('M')).toBe(4) // put(L) + put(P) + getNode(P) in last + getNode(M)

    Node.prototype.compareTo = compareTo
  })

  // 3.2.8 Write a static method optCompares() that takes an integer argument N and computes
  // the number of compares required by a random search hit in an optimal (perfectly balanced) BST,
  // where all the null links are on the same level if the number of links is a power of 2 or
  // on one of two levels otherwise.
  it('test 3.2.8', () => {

  })

  // 3.2.9 Draw all the different BST shapes that can result when N keys are inserted into an
  // initially empty tree, for N = 2, 3, 4, 5, and 6.

  // 3.2.10 Write a test client TestBST.java for use in testing the implementations of
  // min(), max(), floor(), ceiling(), select(), rank(), delete(), deleteMin(),
  // deleteMax(), and keys() that are given in the text. Start with the standard indexing
  // client given on page 370. Add code to take additional command-line arguments, as appropriate.

  /* All test here.*/

  // 3.2.11 How many binary tree shapes of N nodes are there with height N? How many
  // different ways are there to insert N distinct keys into an initially empty BST that result
  // in a tree of height N? (See Exercise 3.2.2.)

  // 3.2.12 Develop a BST implementation that omits rank() and select() and does not
  // use a count field in Node.
  it('test 3.2.12', () => {
    function Node(key, value) {
      this.key = key
      this.value = value
      this.left = null
      this.right = null
    }

    Node.prototype.toString = function() {
      return `{ ${this.key}: ${this.value} }`
    }

    function BST() {
      this.root = null
      this.N = 0
    }

    BST.prototype = {
      ...BinarySearchTree.prototype,
      constructor: BST,
      rank() { return 'rank(key) is omitted intentionally.' },
      select() { return 'select(i) is omitted intentionally' },
      put(key, value) {
        if(!this.root) {
          this.N++
          return this.root = new Node(key, value)
        }

        let node = this.root

        while(node) {
          if(key < node.key) {
            if(!node.left) {
              this.N++
              return node.left = new Node(key, value)
            }
            node = node.left
          } else if(key > node.key) {
            if(!node.right) {
              this.N++
              return node.right = new Node(key, value)
            }
            node = node.right
          } else
            return node.value = value
        }
      },
      size() {
        return this.N
      },
      __deleteNode(key, node) {
        if(!node)
          return null

        if(key < node.key)
          node.left = this.__deleteNode(key, node.left)
        else if(key > node.key)
          node.right = this.__deleteNode(key, node.right)
        else {
          if(node.left && node.right) {
            const rightMinNode = this.min(node.right)
            node.right = this.__deleteMinNode(node.right)
            rightMinNode.left = node.left
            rightMinNode.right = node.right

            node = rightMinNode
          } else
            node = node.left || node.right

          this.N--
        }

        return node
      },
    }

    const st = new BST()
    for(let i = 0; i < example.length; i++)
      st.put(example[i], i)

    expect(st.size()).toBe(10)

    st.delete('E')
    expect(st.size()).toBe(9)
    const rootLeft = st.root.left
    expect(rootLeft.key).toBe('H')
    expect(rootLeft.left.key).toBe('A')
    expect(rootLeft.right.key).toBe('R')
    expect(rootLeft.right.right).toBeNull()
    expect(rootLeft.right.left.key).toBe('M')
  })

  // 3.2.13 Give nonrecursive implementations of get() and put() for BST.
  it('test 3.2.13', () => {
    BinarySearchTree.prototype.put = function(key, value) {
      if(!this.root)
        return this.root = new Node(key, value)

      let node = this.root
      const stack = []

      while(node) {
        if(key === node.key)
          return node.value = value

        stack.push(node)

        if(key > node.key) {
          if(node.right)
            node = node.right
          else {
            node.right = new Node(key, value)
            break
          }
        }
        else if(key < node.key) {
          if(node.left)
            node = node.left
          else {
            node.left = new Node(key, value)
            break
          }
        }
      }

      while(stack.length > 0) {
        node = stack.pop()
        node.N += 1
      }
    }

    BinarySearchTree.prototype.get = function(key) {
      let node = this.root
      while(node) {
        if(key > node.key) node = node.right
        else if(key < node.key) node = node.left
        else
          return node.value
      }
    }

    const st = new BinarySearchTree()
    const example = `SEARCHEXAMPLE`

    for(let i = 0; i < example.length; i++)
      st.put(example[i], i)

    expect(st.get('S')).toBe(0)
    expect(st.get('E')).toBe(12)
    expect(st.get('A')).toBe(8)

    const sNode = st.getNode('S')
    expect(sNode.value).toBe(0)
    expect(sNode.N).toBe(10)

    const eNode = st.getNode('E')
    expect(eNode.value).toBe(12)
    expect(eNode.N).toBe(8)

    const aNode = st.getNode('A')
    expect(aNode.value).toBe(8)
    expect(aNode.N).toBe(2)
  })

  // 3.2.14 Give nonrecursive implementations of min(), max(), floor(), ceiling(), rank(), and select().
  it('test 3.2.14', () => {

  })

  // 3.2.15 Give the sequences of nodes examined when the methods in BST are used to
  // compute each of the following quantities for the tree drawn at right.
  //   a. floor("Q")
  //   b. select(5)
  //   c. ceiling("Q")
  //   d. rank("J")
  //   e. size("D", "T")
  //   f. keys("D", "T")

  // 3.2.16 Define the external path length of a tree to be the sum of the number of nodes on
  // the paths from the root to all null links. Prove that the difference between the external
  // and internal path lengths in any binary tree with N nodes is 2N (see Proposition C).
  /*
    https://www.cs.rutgers.edu/~kaplan/503/binsearch.html

    It means we treat the tree as a full-binary tree(as external path is defined as path to the null link).
    All N nodes are internal nodes with both children.
    Then there are N + 1 null links.

    The internal path length in a tree is:
      S = Li1 + Li2  + ... LiN
    The external path length in a tree is:
      // U = Ll1 + Ll2 + ... LlN.
      //   = (Li1 + 2) + (Li2 + 2) + ... (LiN + 2)
      //   = S + 2N
  */

  // 3.2.17 Draw the sequence of BSTs that results when you delete the keys from the tree
  // of Exercise 3.2.1, one by one, in the order they were inserted.
  // 3.2.18 Draw the sequence of BSTs that results when you delete the keys from the tree
  // of Exercise 3.2.1, one by one, in alphabetical order.
  // 3.2.19 Draw the sequence of BSTs that results when you delete the keys from the tree
  // of Exercise 3.2.1, one by one, by successively deleting the key at the root.
/*
0 1 2 3 4 5 6 7 8 9 1 2
E A S Y Q U E S T I O N

h
--
0           E
1     A                S
2                 Q           Y
3             I             U
4                O        T
5               N
*/

  // 3.2.20 Prove that the running time of the two-argument keys() in a BST with N nodes
  // is at most proportional to the tree height plus the number of keys in the range.
  //    ~~~~~~~
/*
  the worst case is settting `lo` to `this.min()` and `hi` to `this.max()`.
  height = logN


*/

  // 3.2.21 Add a BST method randomKey() that returns a random key from the symbol
  // table in time proportional to the tree height, in the worst case.
  it('test 3.2.21', () => {

  })

  // 3.2.22 Prove that if a node in a BST has two children, its successor has no left child and
  // its predecessor has no right child.

  // 3.2.23 Is delete() commutative?
  // (Does deleting x, then y give the same result as deleting y, then x?)
  it('test 3.2.23', () => {
    const st1 = new BinarySearchTree()
    for(let i = 0; i < example.length; i++)
      st1.put(example[i], i)

    const st2 = new BinarySearchTree()
    for(let i = 0; i < example.length; i++)
      st2.put(example[i], i)

    st1.delete('A')
    st1.delete('R')

    st2.delete('R')
    st2.delete('A')

    expect(st1.toString()).toBe(st2.toString())
  })

  // 3.2.24 Prove that no compare-based algorithm can build a BST using fewer than
  // lg(N !) ~ N lg N compares.
  /* how we done this in merge sort analysis? */
})
