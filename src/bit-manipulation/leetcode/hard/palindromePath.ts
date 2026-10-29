// 3841. Palindromic Path Queries in a Tree

/**
You are given an undirected tree with n nodes labeled 0 to n - 1. This is represented by a 2D array edges of length n - 1, where edges[i] = [ui, vi] indicates an undirected edge between nodes ui and vi.

You are also given a string s of length n consisting of lowercase English letters, where s[i] represents the character assigned to node i.

You are also given a string array queries, where each queries[i] is either:

"update ui c": Change the character at node ui to c. Formally, update s[ui] = c.
"query ui vi": Determine whether the string formed by the characters on the unique path from ui to vi (inclusive) can be rearranged into a palindrome.
Return a boolean array answer, where answer[j] is true if the jth query of type "query ui vi"​​​​​​​ can be rearranged into a palindrome, and false otherwise.
*/

/**
Example 1:

Input: n = 3, edges = [[0,1],[1,2]], s = "aac", queries = ["query 0 2","update 1 b","query 0 2"]

Output: [true,false]

Explanation:

"query 0 2": Path 0 → 1 → 2 gives "aac", which can be rearranged to form "aca", a palindrome. Thus, answer[0] = true.
"update 1 b": Update node 1 to 'b', now s = "abc".
"query 0 2": Path characters are "abc", which cannot be rearranged to form a palindrome. Thus, answer[1] = false.
Thus, answer = [true, false].

Example 2:

Input: n = 4, edges = [[0,1],[0,2],[0,3]], s = "abca", queries = ["query 1 2","update 0 b","query 2 3","update 3 a","query 1 3"]

Output: [false,false,true]

Explanation:

"query 1 2": Path 1 → 0 → 2 gives "bac", which cannot be rearranged to form a palindrome. Thus, answer[0] = false.
"update 0 b": Update node 0 to 'b', now s = "bbca".
"query 2 3": Path 2 → 0 → 3 gives "cba", which cannot be rearranged to form a palindrome. Thus, answer[1] = false.
"update 3 a": Update node 3 to 'a', s = "bbca".
"query 1 3": Path 1 → 0 → 3 gives "bba", which can be rearranged to form "bab", a palindrome. Thus, answer[2] = true.
Thus, answer = [false, false, true].
*/

/**
Constraints:

1 <= n == s.length <= 5 * 104
edges.length == n - 1
edges[i] = [ui, vi]
0 <= ui, vi <= n - 1
s consists of lowercase English letters.
The input is generated such that edges represents a valid tree.
1 <= queries.length <= 5 * 104​​​​​​​
queries[i] = "update ui c" or
queries[i] = "query ui vi"
0 <= ui, vi <= n - 1
c is a lowercase English letter.
*/

// Brute Force Solution: TLE
// function palindromePath(
//   n: number,
//   edges: number[][],
//   s: string,
//   queries: string[],
// ): boolean[] {
//   // Build adjacency list for tree representation.
//   const adj: number[][] = Array.from({ length: n }, () => []);
//   for (const [u, v] of edges) {
//     adj[u].push(v);
//     adj[v].push(u);
//   }

//   // Convert string to character array for in-place updates.
//   const chars = s.split("");
//   const result: boolean[] = [];

//   // Helper DFS function to find path from current to target node.
//   function findPath(
//     curr: number,
//     target: number,
//     parent: number,
//     path: number[],
//   ): boolean {
//     path.push(curr);
//     if (curr === target) return true;

//     for (const neighbor of adj[curr]) {
//       if (neighbor !== parent) {
//         if (findPath(neighbor, target, curr, path)) {
//           return true;
//         }
//       }
//     }
//     path.pop();
//     return false;
//   }

//   for (const query of queries) {
//     const parts = query.split(" ");

//     if (parts[0] === "update") {
//       const u = parseInt(parts[1], 10);
//       const newChar = parts[2];
//       // Update node character.
//       chars[u] = newChar;
//     } else {
//       const u = parseInt(parts[1], 10);
//       const v = parseInt(parts[2], 10);

//       const path: number[] = [];
//       findPath(u, v, -1, path);

//       // Count frequency of each character on the path.
//       const freq = new Array(26).fill(0);
//       for (const node of path) {
//         const charCode = chars[node].charCodeAt(0) - 97;
//         freq[charCode]++;
//       }

//       // Count how many characters have odd frequencies.
//       let oddCount = 0;
//       for (let i = 0; i < 26; i++) {
//         if (freq[i] % 2 !== 0) {
//           oddCount++;
//         }
//       }

//       // Palindrome is possible if odd frequencies are at most 1.
//       result.push(oddCount <= 1);
//     }
//   }

//   return result;
// }

// Optimized Solution using Binary Lifting and Fenwick Tree
function palindromePath(
  n: number,
  edges: number[][],
  s: string,
  queries: string[],
): boolean[] {
  // 1. Build Adjacency List
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  // 2. Setup structures for Euler Tour and Binary Lifting
  const LOG = 17; // 2^16 > 50000
  const up: Int32Array[] = Array.from({ length: n }, () => new Int32Array(LOG));
  const depth = new Int32Array(n);
  const tin = new Int32Array(n);
  const tout = new Int32Array(n);
  const initialXor = new Int32Array(n);
  const nodeChars = s.split("");

  // Precompute bitmask of a character.
  function getCharMask(ch: string): number {
    return 1 << (ch.charCodeAt(0) - 97);
  }

  // 3. Iterative DFS to avoid Call Stack Overflow on large depths
  let timer = 0;
  const parent = new Int32Array(n).fill(-1);
  const edgeIndex = new Int32Array(n);
  const stack: number[] = [0];

  // Initial root setup
  tin[0] = ++timer;
  depth[0] = 0;
  initialXor[0] = getCharMask(nodeChars[0]);

  while (stack.length > 0) {
    const u = stack[stack.length - 1];

    if (edgeIndex[u] < adj[u].length) {
      const v = adj[u][edgeIndex[u]++];
      if (v !== parent[u]) {
        parent[v] = u;
        depth[v] = depth[u] + 1;
        up[v][0] = u;
        initialXor[v] = initialXor[u] ^ getCharMask(nodeChars[v]);
        tin[v] = ++timer;
        stack.push(v);
      }
    } else {
      // When all children are visited, record exit time
      tout[u] = timer;
      stack.pop();
    }
  }

  // 4. Precompute Binary Lifting Table (up[u][k])
  for (let k = 1; k < LOG; k++) {
    for (let i = 0; i < n; i++) {
      up[i][k] = up[up[i][k - 1]][k - 1];
    }
  }

  // Helper to find LCA in O(log n)
  function getLCA(u: number, v: number): number {
    if (depth[u] < depth[v]) {
      const temp = u;
      u = v;
      v = temp;
    }

    // Lift u to the same depth as v
    for (let k = LOG - 1; k >= 0; k--) {
      if (depth[u] - (1 << k) >= depth[v]) {
        u = up[u][k];
      }
    }

    if (u === v) return u;

    // Lift both together until their parent is the same
    for (let k = LOG - 1; k >= 0; k--) {
      if (up[u][k] !== up[v][k]) {
        u = up[u][k];
        v = up[v][k];
      }
    }

    return up[u][0];
  }

  // 5. Fenwick Tree (Binary Indexed Tree) for dynamic range XOR updates
  class FenwickTree {
    private tree: Int32Array;
    private size: number;

    constructor(size: number) {
      this.size = size;
      this.tree = new Int32Array(size + 2);
    }

    // Add delta to point index
    update(index: number, delta: number): void {
      for (let i = index; i <= this.size; i += i & -i) {
        this.tree[i] ^= delta;
      }
    }

    // Query prefix XOR sum up to index
    query(index: number): number {
      let sum = 0;
      for (let i = index; i > 0; i -= i & -i) {
        sum ^= this.tree[i];
      }
      return sum;
    }
  }

  const bit = new FenwickTree(timer);
  const answers: boolean[] = [];

  // 6. Process Queries
  for (const query of queries) {
    const parts = query.split(" ");

    if (parts[0] === "update") {
      const u = parseInt(parts[1], 10);
      const newChar = parts[2];
      const oldChar = nodeChars[u];

      if (oldChar !== newChar) {
        const delta = getCharMask(oldChar) ^ getCharMask(newChar);
        nodeChars[u] = newChar;

        // Range update in subtree: [tin[u], tout[u]]
        bit.update(tin[u], delta);
        bit.update(tout[u] + 1, delta);
      }
    } else {
      const u = parseInt(parts[1], 10);
      const v = parseInt(parts[2], 10);

      // Get current root-to-node XOR for u and v
      const xorU = initialXor[u] ^ bit.query(tin[u]);
      const xorV = initialXor[v] ^ bit.query(tin[v]);

      const lca = getLCA(u, v);
      const lcaCharMask = getCharMask(nodeChars[lca]);

      // Path XOR calculation: X(u) ^ X(v) ^ mask(lca)
      const pathMask = xorU ^ xorV ^ lcaCharMask;

      // Check if at most one bit is set
      const canFormPalindrome = (pathMask & (pathMask - 1)) === 0;
      answers.push(canFormPalindrome);
    }
  }

  return answers;
}

// Example usage
const n = 3;
const edges = [
  [0, 1],
  [1, 2],
];
const s = "aac";
const queries = ["query 0 2", "update 1 b", "query 0 2"];
console.log(palindromePath(n, edges, s, queries)); // Output: [true, false]

const n2 = 4;
const edges2 = [
  [0, 1],
  [0, 2],
  [0, 3],
];
const s2 = "abca";
const queries2 = [
  "query 1 2",
  "update 0 b",
  "query 2 3",
  "update 3 a",
  "query 1 3",
];
console.log(palindromePath(n2, edges2, s2, queries2)); // Output: [false, false, true]
