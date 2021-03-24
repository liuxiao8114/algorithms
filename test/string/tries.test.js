const path = require('path')
const assert = require('assert')
const { StringST, TernaryST } = require(path.join(process.cwd(), 'src/string/tries'))

const TEST = `she sells sea shells by the sea shore`.split(/\s+/)
const smallAlphabetOptions = { R: 26, offset: 97 }

describe('tries test cases', () => {
  let st = null
  let set = null
  let noDuplicatedTest = null

  beforeEach(() => {
    st = new StringST(TEST, smallAlphabetOptions)
    set = new Set()

    for(let s of TEST)
      set.add(s)

    noDuplicatedTest = [ ...set ]
  })

  it('can get key', () => {
    expect(st.get('she')).toBe(TEST.lastIndexOf('she'))
    expect(st.get('shore')).toBe(TEST.lastIndexOf('shore'))
    expect(st.get('shells')).toBe(TEST.lastIndexOf('shells'))
    expect(st.get('shel')).toBeNull()
    expect(st.get('zz')).toBeNull()
    expect(st.get('sh')).toBeNull()
    expect(st.getSize()).toBe(noDuplicatedTest.length)
  })

  it('shows keysWithPrefix', () => {
    expect(
      st.keysWithPrefix(`she`).toString().trim()
    ).toEqual('she, shells')
  })

  it('can delete a key', () => {
    const size = st.getSize()
    st.delete('shells')
    expect(st.getSize()).toBe(size - 1)
    expect(st.get('shells')).toBeNull()
  })

  it('search a given key', () => {
    expect(st.longestPrefixOf('she')).toBe(3)
    expect(st.longestPrefixOf('shell')).toBe(3)
    expect(st.longestPrefixOf('shells')).toBe(6)
  })
})

describe('TernaryST test cases', () => {
  let tst = null
  let set = null
  let noDuplicatedTest = null

  /*

`she sells sea shells by the sea shore`

        s
  /     |     \
  b     h      t
  |   / |      |
  y  e  e      h
     |  |  \   |
     l  l   o  e
  /  |  |   |
  a  l  l   r
     s  |   |
        s   e
  */
  beforeEach(() => {
    tst = new TernaryST(TEST, smallAlphabetOptions)
    set = new Set()

    for(let s of TEST)
      set.add(s)

    noDuplicatedTest = [ ...set ]
  })

  it('init TernaryST', () => {
    expect(tst.get('she')).toBe(TEST.lastIndexOf('she'))
    expect(tst.get('shore')).toBe(TEST.lastIndexOf('shore'))
    expect(tst.get('shells')).toBe(TEST.lastIndexOf('shells'))
    expect(tst.get('shel')).toBeNull()
    expect(tst.get('zz')).toBeNull()
    expect(tst.get('sh')).toBeNull()

    expect(tst.getSize()).toBe(noDuplicatedTest.length)
  })

  it('delete nodes in TernaryST', () => {
    function charCodeWithOffset(s, offset = 97) {
      return s.charCodeAt(0) - offset
    }

    assert(tst.get('she') === 0)
    const SHE_NODE = tst.getNode(tst.root, 'she', 0)
    const B_NODE = tst.getNode(tst.root, 'b', 0)
    // console.log(`SHE_NODE: ${charCodeWithOffset('l')}`)

    assert(SHE_NODE.mid.c === charCodeWithOffset('l'))
    assert(SHE_NODE.mid.mid.c === charCodeWithOffset('l'))
    assert(SHE_NODE.mid.mid.mid.c === charCodeWithOffset('s'))

    assert(B_NODE.mid.c === charCodeWithOffset('y'))
    assert(B_NODE.left == null)
    assert(B_NODE.right == null)

    // tst.delete('by')

    tst.delete('shells')

    expect(SHE_NODE.mid).toBe(null)
  })

  it('keysWithPrefix', () => {
    expect(
      tst.keysWithPrefix(`she`).toString().trim()
    ).toEqual('she, shells')

    tst.delete('shells')
    tst.put('sheet', 99)
    tst.put('sheep', 999)
    tst.put('sheez', 9999)
    tst.put('sheetp', 99999)

    expect(
      tst.keysWithPrefix(`she`).toString().trim()
    ).toEqual('she, sheet, sheep, sheetp, sheez')
  })
})


describe('EXERCISES', () => {
  /*
  5.2.1
    Draw the R-way trie that results when the keys
      no is th ti fo al go pe to co to th ai of th pa

    are inserted in that order into an initially empty trie (do not draw null links).
  5.2.2
    Draw the TST that results when the keys
      no is th ti fo al go pe to co to th ai of th pa

    are inserted in that order into an initially empty TST.
  5.2.3
    Draw the R-way trie that results when the keys
      now is the time for all good people to come to the aid of

    are inserted in that order into an initially empty trie (do not draw null links).
  5.2.4
    Draw the TST that results when the keys
      now is the time for all good people to come to the aid of

    are inserted in that order into an initially empty TST.
  5.2.5
    Develop nonrecursive versions of TrieST and TST.
  5.2.6
    Implement the following API, for a StringSET data type:
      public class StringSET
        StringSET() create a string set
        void add(String key) put key into the set
        void delete(String key) remove key from the set
        boolean contains(String key) is key in the set?
        boolean isEmpty() is the set empty?
        int size() number of keys in the set
        int toString() string representation of the set
  */
  it('5.2.1 - 5.2.4', () => {
    const TEST521_2 = `no is th ti fo al go pe to co to th ai of th pa`
    const TEST523_4 = `now is the time for all good people to come to the aid of`

    /*
       (a)......(c)......(f)......(g)......(i)......(n)......(o)......(p)......(t)......
        |       |
      ......(i,)......(l,)......(s,1)  (o,0)

       (a)......(c)
    */

  })

  it('5.2.5 StringST', () => {
    const st = new StringST(null, smallAlphabetOptions)

    st.putNonRecursive('she', 0)
    st.putNonRecursive('shy', 1)
    st.putNonRecursive('shell', 2)
    expect(st.getNonRecursive('she')).toBe(0)
    expect(st.getNonRecursive('shy')).toBe(1)
    expect(st.getNonRecursive('shell')).toBe(2)
    expect(st.getSize()).toBe(3)

    st.deleteNonRecursive('shy')
    expect(st.getNonRecursive('shy')).toBeNull()
    expect(st.getNonRecursive('she')).toBe(0)

    st.deleteNonRecursive('shell')
    expect(st.getNonRecursive('shell')).toBeNull()
    expect(st.getNonRecursive('she')).toBe(0)

    expect(st.longestPrefixOfNoRecursive('she')).toBe(3)
    expect(st.longestPrefixOfNoRecursive('shell')).toBe(3)
    st.putNonRecursive('shells', 3) // add shells
    expect(st.longestPrefixOfNoRecursive('shells')).toBe(6)

    expect(
      st.keysWithPrefixNonRecursive(`she`).toString().trim()
    ).toEqual('she, shells')
  })

  it('5.2.5 TernaryST', () => {
//     console.log(
//       JSON.stringify(
//         {"AddProjectInfoResults":[{"IsSuccess":0,"Message":"得意先部門コードを入力してください。\r\n得意先担当者コードを入力してください。\r\n請求先コードを入力してください。\r\nクライアントコードを入力してください。\r\n受注予定日の入力形式が不正です。","RowNumber":2,"Parameter":{"CodeProjectOld":"1111","CodeProjectKakuritsu":"1","NameProject":"テスト案件","CodeClient":"","ElseNameClient":"","CodeTokuisaki":"99995","ElseNameTokuisaki":"","CodeTokuisakiSection":"","ElseNameTokuisakiSection":"","CodeTokuisakiPerson":"","ElseNameTokuisakiPerson":"","CodeSeikyusaki":"","ElseNameSeikyusaki":"","CodeShukeikubun":"9970","CodeMember":"9999","CodeProjectJigyouSegment":"2","DateHikiai":"2/10/2021","DateKekkaHappyou":"2021/2/228","DateUriageYotei":"3/31/2021","Memo":"メモ","CodeProjectGroup":"","CodeTypeDataImportProgress":"1","DateSeikyuYotei":"","DateNyukinYotei":"","DateKanryouYotei":"","AnkenNaiyou":"案件内容"}}],"AddProjectSalesResults":[{"IsSuccess":0,"Message":"指定された旧JOBNo.が存在しません。\r\n同一案件で申請状態が異なるデータが存在します。","RowNumber":2,"Parameter":{"CodeProjectOld":"1111","NameYoteiUriageData":"テスト売上","CodeUriageKubun":"1","Suu":"1","Tanka":"100000","Kingaku":"","CodeTypeDataImportProgress":"2","CodeYoteiUriageData":"1","CodeYoteiUriageProgress":"1"}},{"IsSuccess":0,"Message":"指定された旧JOBNo.が存在しません。\r\n同一案件で申請状態が異なるデータが存在します。","RowNumber":3,"Parameter":{"CodeProjectOld":"1111","NameYoteiUriageData":"テスト売上2","CodeUriageKubun":"2","Suu":"1","Tanka":"50000","Kingaku":"","CodeTypeDataImportProgress":"1","CodeYoteiUriageData":"2","CodeYoteiUriageProgress":"1"}}],"AddProjectExpectedCostResults":[{"IsSuccess":0,"Message":"指定された旧JOBNo.が存在しません。\r\n指定された売上項目Noが存在しません。\r\n同一案件で申請状態が異なるデータが存在します。\r\n課税区分コード（発注）を入力しないでください。\r\n税率（発注）を入力しないでください。","RowNumber":2,"Parameter":{"CodeProjectOld":"1111","NameYoteiGenkaData":"品名1","CodeShiharaisaki":"1","DateShiireYotei":"3/31/2021","Suu":"1","Tanka":"25000","Kingaku":"","CodeHimoku":"6061","CodeGenkaProgressStatus":"1","CodeTypeDataImportProgress":"1","CodeYoteiUriageData":"1","CodeYoteiGenkaData":"1","CodeKazeiKubunHacchu":"1","CodeTanniHacchu":"","DateShiharaiYoteiHacchu":"","KingakuHacchu":"","ShouhizeiHacchu":"","TaxRateHacchu":"10%","ZeikomiKingakuHacchu":""}},{"IsSuccess":0,"Message":"指定された旧JOBNo.が存在しません。\r\n指定された売上項目Noが存在しません。\r\n同一案件で申請状態が異なるデータが存在します。\r\n課税区分コード（発注）を入力しないでください。\r\n税率（発注）を入力しないでください。","RowNumber":3,"Parameter":{"CodeProjectOld":"1111","NameYoteiGenkaData":"品名2","CodeShiharaisaki":"1","DateShiireYotei":"3/31/2021","Suu":"1","Tanka":"5000","Kingaku":"","CodeHimoku":"6062","CodeGenkaProgressStatus":"1","CodeTypeDataImportProgress":"2","CodeYoteiUriageData":"1","CodeYoteiGenkaData":"2","CodeKazeiKubunHacchu":"1","CodeTanniHacchu":"","DateShiharaiYoteiHacchu":"","KingakuHacchu":"","ShouhizeiHacchu":"","TaxRateHacchu":"10%","ZeikomiKingakuHacchu":""}}],"CodeTableImport":"0000028","NameTableImport":"案件基本＋利益計画","IsSuccessAll":0,"Processed":5,"Success":0,"Fail":5}
// , null, 2
//       )
//     )
    const tst = new TernaryST(null, smallAlphabetOptions)
    tst.putNonRecursive('she', 0)
    tst.putNonRecursive('shore', 1)
    tst.putNonRecursive('shells', 2)

    expect(tst.getNonRecursive('she')).toBe(0)
    expect(tst.get('she')).toBe(0)
    expect(tst.getNonRecursive('shore')).toBe(1)
    expect(tst.get('shore')).toBe(1)
    expect(tst.getNonRecursive('shells')).toBe(2)
    expect(tst.get('shells')).toBe(2)
    expect(tst.getNonRecursive('shel')).toBeNull()
    expect(tst.getNonRecursive('zz')).toBeNull()
    expect(tst.getNonRecursive('sh')).toBeNull()
    expect(tst.getSize()).toBe(3)

    function charCodeWithOffset(s, offset = 97) {
      return s.charCodeAt(0) - offset
    }

    tst.putNonRecursive('by', 4)

    assert(tst.get('she') === 0)
    const SHE_NODE = tst.getNode(tst.root, 'she', 0)
    const B_NODE = tst.getNode(tst.root, 'b', 0)
    // console.log(`SHE_NODE: ${charCodeWithOffset('l')}`)

    assert(SHE_NODE.mid.c === charCodeWithOffset('l'))
    assert(SHE_NODE.mid.mid.c === charCodeWithOffset('l'))
    assert(SHE_NODE.mid.mid.mid.c === charCodeWithOffset('s'))

    assert(B_NODE.mid.c === charCodeWithOffset('y'))
    assert(B_NODE.left == null)
    assert(B_NODE.right == null)

    // tst.delete('by')
    tst.deleteNonRecursive('shells')

    expect(SHE_NODE.mid).toBe(null)
  })
})

/*
5.2.7
  Empty string in TSTs. The code in TST does not handle the empty string properly.
  Explain the problem and suggest a correction.
5.2.8
  Ordered operations for tries. Implement the floor(), ceil(), rank(), and
  select() (from our standard ordered ST API from Chapter 3) for TrieST.
5.2.9
  Extended operations for TSTs. Implement keys() and the extended operations
  introduced in this section—longestPrefixOf(), keysWithPrefix(), and
  keysThatMatch()—for TST.
5.2.10
  Size. Implement very eager size() (that keeps in each node the number of
  keys in its subtree) for TrieST and TST.
5.2.11
  External one-way branching. Add code to TrieST and TST to eliminate external
  one-way branching.
5.2.12
  Internal one-way branching. Add code to TrieST and TST to eliminate internal
  one-way branching.
5.2.13
  Hybrid TST with R2-way branching at the root. Add code to TST to do multiway
  branching at the first two levels, as described in the text.
5.2.14
  Unique substrings of length L. Write a TST client that reads in text from standard
  input and calculates the number of unique substrings of length L that it contains.
  For example, if the input is cgcgggcgcg, then there are five unique substrings of length
  3: cgc, cgg, gcg, ggc, and ggg. Hint : Use the string method substring(i, i + L) to
  extract the ith substring, then insert it into a symbol table.
5.2.15
  Unique substrings. Write a TST client that reads in text from standard input
  and calculates the number of distinct substrings of any length. This can be done very
  efficiently with a suffix tree—see Chapter 6
5.2.16
  Document similarity. Write a TST client with a static method that takes an int
  value L and two file names as command-line arguments and computes the L-similarity
  of the two documents: the Euclidean distance between the frequency vectors defined by
  the number of occurrences of each trigram divided by the number of trigrams. Include
  a static method main() that takes an int value L as command-line argument and a list
  of file names from standard input and prints a matrix showing the L-similarity of all
  pairs of documents.
*/

describe('CREATIVE PROBLEMS', () => {
  it('5.2.7', () => {
    // The code below set the TernaryST root with the empty string.
    // It will bind the root value while putting with the key: ''
    /*
    function charCodeAtWithOffset(s, c, offset = 0) {
      if(typeof s !== 'string' || s.length === 0)
        return Number.MIN_VALUE
      return s.charCodeAt(c) - offset
    }

    export function TernaryST(a, options = {}) {
      this.root = new TernaryNode(Number.MIN_VALUE)
      ...
    }
    */
    const tst = new TernaryST(null, smallAlphabetOptions)
    tst.put('she', 0)
    tst.put('', 1)
    expect(tst.root.value).toBe(1)
  })
})
/*
s
  |
  h
  |
  e: 0

*/
