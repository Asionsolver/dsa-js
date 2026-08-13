// 2213. Longest Substring of One Repeating Character

/**
You are given a 0-indexed string s. You are also given a 0-indexed string queryCharacters of length k and a 0-indexed array of integer indices queryIndices of length k, both of which are used to describe k queries.

The ith query updates the character in s at index queryIndices[i] to the character queryCharacters[i].

Return an array lengths of length k where lengths[i] is the length of the longest substring of s consisting of only one repeating character after the ith query is performed.
*/

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

/**
 * 
Constraints:

1 <= s.length <= 105
s consists of lowercase English letters.
k == queryCharacters.length == queryIndices.length
1 <= k <= 105
queryCharacters consists of lowercase English letters.
0 <= queryIndices[i] < s.length
 */

// Approach: Segment Tree
// function longestRepeating(
//   s: string,
//   queryCharacters: string,
//   queryIndices: number[],
// ): number[] {
//   const n = s.length;
//   const k = queryIndices.length;

//   // Segment tree arrays, 4 * n is the standard safe upper limit for size.
//   const treeSize = 4 * n + 5;
//   const maxLen = new Int32Array(treeSize);
//   const prefLen = new Int32Array(treeSize);
//   const suffLen = new Int32Array(treeSize);
//   const prefChar = new Uint8Array(treeSize);
//   const suffChar = new Uint8Array(treeSize);

//   // Function to calculate and merge states of Left & Right children into the Parent
//   function merge(
//     v: number,
//     lc: number,
//     rc: number,
//     leftSize: number,
//     rightSize: number,
//   ) {
//     prefChar[v] = prefChar[lc];
//     suffChar[v] = suffChar[rc];

//     const match = suffChar[lc] === prefChar[rc];

//     let pLen = prefLen[lc];
//     if (pLen === leftSize && match) {
//       pLen += prefLen[rc];
//     }
//     prefLen[v] = pLen;

//     let sLen = suffLen[rc];
//     if (sLen === rightSize && match) {
//       sLen += suffLen[lc];
//     }
//     suffLen[v] = sLen;

//     let max = maxLen[lc] > maxLen[rc] ? maxLen[lc] : maxLen[rc];
//     if (match) {
//       const cross = suffLen[lc] + prefLen[rc];
//       if (cross > max) {
//         max = cross;
//       }
//     }
//     maxLen[v] = max;
//   }

//   // Function to construct the Segment Tree
//   function build(v: number, l: number, r: number) {
//     if (l === r) {
//       const charCode = s.charCodeAt(l);
//       maxLen[v] = 1;
//       prefLen[v] = 1;
//       suffLen[v] = 1;
//       prefChar[v] = charCode;
//       suffChar[v] = charCode;
//       return;
//     }
//     const m = (l + r) >> 1;
//     const lc = v * 2;
//     const rc = lc + 1;
//     build(lc, l, m);
//     build(rc, m + 1, r);
//     merge(v, lc, rc, m - l + 1, r - m);
//   }

//   // Function to handle point updates to the Segment Tree
//   function update(
//     v: number,
//     l: number,
//     r: number,
//     idx: number,
//     charCode: number,
//   ) {
//     if (l === r) {
//       prefChar[v] = charCode;
//       suffChar[v] = charCode;
//       return;
//     }
//     const m = (l + r) >> 1;
//     const lc = v * 2;
//     const rc = lc + 1;

//     if (idx <= m) {
//       update(lc, l, m, idx, charCode);
//     } else {
//       update(rc, m + 1, r, idx, charCode);
//     }
//     merge(v, lc, rc, m - l + 1, r - m);
//   }

//   // Driver execution
//   build(1, 0, n - 1);

//   const ans = new Array(k);
//   for (let i = 0; i < k; i++) {
//     update(1, 0, n - 1, queryIndices[i], queryCharacters.charCodeAt(i));
//     ans[i] = maxLen[1]; // maxLen of root node (v=1) gives longest sequence length for the whole text
//   }

//   return ans;
// }

// Approach: Segment Tree with Bottom-Up Update (No Recursion)
const MAX_TREE_SIZE = 400064; // 4 * 10^5 + 64 (for safe limits)
const maxLen = new Int32Array(MAX_TREE_SIZE);
const prefLen = new Int32Array(MAX_TREE_SIZE);
const suffLen = new Int32Array(MAX_TREE_SIZE);
const prefChar = new Uint8Array(MAX_TREE_SIZE);
const suffChar = new Uint8Array(MAX_TREE_SIZE);
const rangeSize = new Int32Array(MAX_TREE_SIZE);
const leafNodeIndex = new Int32Array(100005);

// Function to build segment tree
function build(v: number, l: number, r: number, sCodes: Uint8Array) {
  rangeSize[v] = r - l + 1;
  if (l === r) {
    const charCode = sCodes[l];
    maxLen[v] = 1;
    prefLen[v] = 1;
    suffLen[v] = 1;
    prefChar[v] = charCode;
    suffChar[v] = charCode;
    leafNodeIndex[l] = v; // Tracking the position of the leaf node
    return;
  }
  const m = (l + r) >> 1;
  const lc = v << 1;
  const rc = lc | 1;
  build(lc, l, m, sCodes);
  build(rc, m + 1, r, sCodes);

  // Inline merge operation
  const lcPrefChar = prefChar[lc];
  const rcSuffChar = suffChar[rc];
  prefChar[v] = lcPrefChar;
  suffChar[v] = rcSuffChar;

  const match = suffChar[lc] === prefChar[rc];
  const leftSize = rangeSize[lc];
  const rightSize = rangeSize[rc];

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

function longestRepeating(
  s: string,
  queryCharacters: string,
  queryIndices: number[],
): number[] {
  const n = s.length;
  const k = queryIndices.length;

  // Caching the string's character codes for fast access
  const sCodes = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    sCodes[i] = s.charCodeAt(i);
  }

  build(1, 0, n - 1, sCodes);

  const ans = new Array(k);
  for (let i = 0; i < k; i++) {
    const idx = queryIndices[i];
    const charCode = queryCharacters.charCodeAt(i);

    // Directly update leaf nodes
    let v = leafNodeIndex[idx];
    prefChar[v] = charCode;
    suffChar[v] = charCode;

    // Updating step by step towards the root in a bottom-up manner (without recursion)
    v >>= 1;
    while (v > 0) {
      const lc = v << 1;
      const rc = lc | 1;

      const lcPrefChar = prefChar[lc];
      const rcSuffChar = suffChar[rc];
      prefChar[v] = lcPrefChar;
      suffChar[v] = rcSuffChar;

      const match = suffChar[lc] === prefChar[rc];
      const leftSize = rangeSize[lc];
      const rightSize = rangeSize[rc];

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

      v >>= 1;
    }
    ans[i] = maxLen[1];
  }

  return ans;
}

// Example usage:
const s = "babacc";
const queryCharacters = "bcb";
const queryIndices = [1, 3, 3];
console.log(longestRepeating(s, queryCharacters, queryIndices)); // Output: [3, 3, 4]
