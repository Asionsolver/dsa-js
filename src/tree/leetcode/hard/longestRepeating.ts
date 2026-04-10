// 2213. Longest Substring of One Repeating Character

/**
Example 1:

Input: s = "babacc", queryCharacters = "bcb", queryIndices = [1,3,3]
Output: [3,3,4]
Explanation: 
- 1st query updates s = "bbbacc". The longest substring consisting of one repeating character is "bbb" with length 3.
- 2nd query updates s = "bbbccc". 
  The longest substring consisting of one repeating character can be "bbb" or "ccc" with length 3.
- 3rd query updates s = "bbbbcc". The longest substring consisting of one repeating character is "bbbb" with length 4.
Thus, we return [3,3,4].
Example 2:

Input: s = "abyzz", queryCharacters = "aa", queryIndices = [2,1]
Output: [2,3]
Explanation:
- 1st query updates s = "abazz". The longest substring consisting of one repeating character is "zz" with length 2.
- 2nd query updates s = "aaazz". The longest substring consisting of one repeating character is "aaa" with length 3.
Thus, we return [2,3].
*/

const s = "babacc",
  queryCharacters = "bcb",
  queryIndices = [1, 3, 3];

function longestRepeating(
  s: string,
  queryCharacters: string,
  queryIndices: number[],
): number[] {
  const n = s.length;
  const k = queryIndices.length;

  // Segment tree arrays, 4 * n is the standard safe upper limit for size.
  const treeSize = 4 * n + 5;
  const maxLen = new Int32Array(treeSize);
  const prefLen = new Int32Array(treeSize);
  const suffLen = new Int32Array(treeSize);
  const prefChar = new Uint8Array(treeSize);
  const suffChar = new Uint8Array(treeSize);

  // Function to calculate and merge states of Left & Right children into the Parent
  function merge(
    v: number,
    lc: number,
    rc: number,
    leftSize: number,
    rightSize: number,
  ) {
    prefChar[v] = prefChar[lc];
    suffChar[v] = suffChar[rc];

    const match = suffChar[lc] === prefChar[rc];

    let pLen = prefLen[lc];
    if (pLen === leftSize && match) {
      pLen += prefLen[rc];
    }
    prefLen[v] = pLen;

    let sLen = suffLen[rc];
    if (sLen === rightSize && match) {
      sLen += suffLen[lc];
    }
    suffLen[v] = sLen;

    let max = maxLen[lc] > maxLen[rc] ? maxLen[lc] : maxLen[rc];
    if (match) {
      const cross = suffLen[lc] + prefLen[rc];
      if (cross > max) {
        max = cross;
      }
    }
    maxLen[v] = max;
  }

  // Function to construct the Segment Tree
  function build(v: number, l: number, r: number) {
    if (l === r) {
      const charCode = s.charCodeAt(l);
      maxLen[v] = 1;
      prefLen[v] = 1;
      suffLen[v] = 1;
      prefChar[v] = charCode;
      suffChar[v] = charCode;
      return;
    }
    const m = (l + r) >> 1;
    const lc = v * 2;
    const rc = lc + 1;
    build(lc, l, m);
    build(rc, m + 1, r);
    merge(v, lc, rc, m - l + 1, r - m);
  }

  // Function to handle point updates to the Segment Tree
  function update(
    v: number,
    l: number,
    r: number,
    idx: number,
    charCode: number,
  ) {
    if (l === r) {
      prefChar[v] = charCode;
      suffChar[v] = charCode;
      return;
    }
    const m = (l + r) >> 1;
    const lc = v * 2;
    const rc = lc + 1;

    if (idx <= m) {
      update(lc, l, m, idx, charCode);
    } else {
      update(rc, m + 1, r, idx, charCode);
    }
    merge(v, lc, rc, m - l + 1, r - m);
  }

  // Driver execution
  build(1, 0, n - 1);

  const ans = new Array(k);
  for (let i = 0; i < k; i++) {
    update(1, 0, n - 1, queryIndices[i], queryCharacters.charCodeAt(i));
    ans[i] = maxLen[1]; // maxLen of root node (v=1) gives longest sequence length for the whole text
  }

  return ans;
}

console.log(longestRepeating(s, queryCharacters, queryIndices));
