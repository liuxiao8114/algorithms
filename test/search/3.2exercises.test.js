import assert from 'assert'
import BinarySearchTree, { Node } from '../../src/search/BinarySearchTree'
import { frequencyCounter } from '../../src/search/utils'

describe("3.2 Binary Search Trees exercises' solutions and tests.", () => {
  // 3.2.12 Develop a BST implementation that omits rank() and select() and does not
  // use a count field in Node.
  it('test 3.2.12', () => {
    function Node(key, value) {
      this.key = key
      this.value = value
      this.left = null
      this.right = null
    }

    function BST() {
      this.root = null
      this.N = 0
    }

    BST.prototype = {
      constructor: BST,
      put(key, value) {

      },
      get(key) {

      },
      size() {
        return this.N
      },
    }
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
                 // `0123456789012`
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
})
