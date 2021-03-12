import { Queue } from './utils'

function Node(value = null, R = 256) {
  this.value = value
  this.next = new Array(R).fill(null)
}

export function StringST(a, R = 256) {
  this.root = new Node(null, R)
  this.size = 0

  if(typeof a === 'string')
    this.put(a, this.size)
  else if(Array.isArray(a))
    a.forEach((one, i) => {
      if(typeof one === 'string')
        this.put(one, i)
      else if(typeof one === 'object') {
        const { key, value } = one
        this.put(key, value)
      } else
        throw new Error(`cannot parse ${a} with item: ${one}`)
    })
  else if(typeof a === 'object')
    this.put(a.key, a.value)
}

StringST.prototype = {
  constructor: StringST,
  get(key) {
    return this.getNode(this.root, key, 0).value
  },
  getNode(node, key, d) {
    if(node === null)
      return
    if(d === key.length)
      return node
    return this.getNode(node.next[key.charCodeAt(d)], key, d + 1)
  },
  put(key, value) {
    return this.putNode(this.root, key, value, 0)
  },
  putNode(node, key, value, d) {
    if(!node)
      node = new Node(null, this.R)
    if(d === key.length) {
      if(node.value === null)
        this.size += 1
      node.value = value
      return node
    }

    const c = key.charCodeAt(d)
    node.next[c] = this.putNode(node.next[c], key, value, d + 1)

    return node
  },
  getSize() {
    return this.size
  },
  keys() {
    return this.keysWithPrefix("")
  },
  keysWithPrefix(pre) {
    const q = new Queue()
    this.collect(this.getNode(this.root, pre, 0), pre, q)

    return q
  },
  collect(node, s, q) {
    if(!node)
      return

    if(node.value !== null)
      q.enqueue(s)

    for(let i = 0; i < this.R; i++)
      this.collect(node.next[i], s + String.fromCharCode(i), q)
  },
}

/*
Deletion. The first step needed to delete a key-value pair
from a trie is to use a normal search to find the node corresponding
to the key and set the corresponding value to
null. If that node has a non-null link to a child, then no
more work is required; if all the links are null, we need to
remove the node from the data structure. If doing so leaves
all the links null in its parent, we need to remove that node,
and so forth. The implementation on the facing page demonstrates
that this action can be accomplished with remarkably
little code, using our standard recursive setup: after the
recursive calls for a node x, we return null if the client value
and all of the links in a node are null; otherwise we return
x.
private Node delete(Node x, String key, int d)
{
  if (x == null) return null;
  if (d == key.length())
  x.val = null;
  else
  {
  char c = key.charAt(d);
  x.next[c] = delete(x.next[c], key, d+1);
  }
  if (x.val != null) return x;
  for (char c = 0; c < R; c++)
  if (x.next[c] != null) return x;
  return null;
}

public Iterable<String> keysWithPrefix(String pre)
{
  Queue<String> q = new Queue<String>();
  collect(get(root, pre, 0), pre, q);
  return q;
}
private void collect(Node x, String pre, Queue<String> q)
{
  if (x == null) return;
  if (x.val != null) q.enqueue(pre);

  for (char c = 0; c < R; c++)
    collect(x.next[c], pre + c, q);
}

Because characters and keys are represented implicitly in tries, providing
clients with the ability to iterate through the keys presents a challenge.

As with binary
search trees, we accumulate the string keys in a Queue, but for tries we need to create
explicit representations of all of the string keys, not just find them in the data structure.
We do so with a recursive private method collect() that is similar to size() but also
maintains a string with the sequence of characters on the path from the root.

Each time
that we visit a node via a call to collect() with that node as first argument, the second
argument is the string associated with that node (the sequence of
characters on the path from the
root to the node). To visit a node,
we add its associated string to the
queue if its value is not null, then
visit (recursively) all the nodes
in its array of links, one for each
possible character. To create the
key for each call, we append the
character corresponding to the
link to the current key. We use
this collect() method to collect
keys for both the keys() and
the keysWithPrefix() methods
in the API. To implement keys()
we call keysWithPrefix() with
the empty string as argument;


*/
