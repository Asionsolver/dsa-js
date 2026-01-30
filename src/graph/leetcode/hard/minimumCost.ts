// 2977. Minimum Cost to Convert String II

/**
Example 1:

Input: source = "abcd", target = "acbe", original = ["a","b","c","c","e","d"], changed = ["b","c","b","e","b","e"], cost = [2,5,5,1,2,20]
Output: 28
Explanation: To convert "abcd" to "acbe", do the following operations:
- Change substring source[1..1] from "b" to "c" at a cost of 5.
- Change substring source[2..2] from "c" to "e" at a cost of 1.
- Change substring source[2..2] from "e" to "b" at a cost of 2.
- Change substring source[3..3] from "d" to "e" at a cost of 20.
The total cost incurred is 5 + 1 + 2 + 20 = 28. 
It can be shown that this is the minimum possible cost.
Example 2:

Input: source = "abcdefgh", target = "acdeeghh", original = ["bcd","fgh","thh"], changed = ["cde","thh","ghh"], cost = [1,3,5]
Output: 9
Explanation: To convert "abcdefgh" to "acdeeghh", do the following operations:
- Change substring source[1..3] from "bcd" to "cde" at a cost of 1.
- Change substring source[5..7] from "fgh" to "thh" at a cost of 3. We can do this operation because indices [5,7] are disjoint with indices picked in the first operation.
- Change substring source[5..7] from "thh" to "ghh" at a cost of 5. We can do this operation because indices [5,7] are disjoint with indices picked in the first operation, and identical with indices picked in the second operation.
The total cost incurred is 1 + 3 + 5 = 9.
It can be shown that this is the minimum possible cost.
Example 3:

Input: source = "abcdefgh", target = "addddddd", original = ["bcd","defgh"], changed = ["ddd","ddddd"], cost = [100,1578]
Output: -1
Explanation: It is impossible to convert "abcdefgh" to "addddddd".
If you select substring source[1..3] as the first operation to change "abcdefgh" to "adddefgh", you cannot select substring source[3..7] as the second operation because it has a common index, 3, with the first operation.
If you select substring source[3..7] as the first operation to change "abcdefgh" to "abcddddd", you cannot select substring source[1..3] as the second operation because it has a common index, 3, with the first operation.
*/

const source = "abcd",
  target = "acbe",
  original = ["a", "b", "c", "c", "e", "d"],
  changed = ["b", "c", "b", "e", "b", "e"],
  cost = [2, 5, 5, 1, 2, 20];

const minimumCost = function (
  source: string,
  target: string,
  original: string[],
  changed: string[],
  cost: number[],
): number {
  const n = source.length;

  // Trie Node structure to efficiently match substrings
  class TrieNode {
    children: Map<string, TrieNode>;
    id: number;
    constructor() {
      this.children = new Map();
      this.id = -1;
    }
  }

  const root = new TrieNode();
  let nextId = 0;

  // Helper to insert a string into the Trie and assign a unique ID
  const addString = (s: string): number => {
    let node = root;
    for (const char of s) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    if (node.id === -1) {
      node.id = nextId++;
    }
    return node.id;
  };

  // 1. Initialize Trie with all unique strings from rules
  for (const s of original) addString(s);
  for (const s of changed) addString(s);

  const m = nextId;

  // 2. Build the Cost Graph (Adjacency Matrix)
  // dist[u][v] stores the min cost to transform string ID u to string ID v
  const dist: number[][] = Array.from({ length: m }, () =>
    Array(m).fill(Infinity),
  );
  for (let i = 0; i < m; i++) dist[i][i] = 0;

  for (let i = 0; i < original.length; i++) {
    const u = addString(original[i]);
    const v = addString(changed[i]);
    dist[u][v] = Math.min(dist[u][v], cost[i]);
  }

  // 3. Floyd-Warshall Algorithm to find all-pairs shortest paths
  // This handles chained transformations (A->B->C)
  for (let k = 0; k < m; k++) {
    for (let i = 0; i < m; i++) {
      if (dist[i][k] === Infinity) continue;
      for (let j = 0; j < m; j++) {
        if (dist[k][j] === Infinity) continue;
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }

  // 4. Dynamic Programming
  // dp[i] = min cost to convert source[0...i-1] to target[0...i-1]
  const dp = new Float64Array(n + 1).fill(Infinity);
  dp[0] = 0;

  // Temporary array to store IDs of target substrings starting at current index i
  // targetMatches[len] will hold the ID of target[i...i+len-1]
  const targetMatches = new Int32Array(n + 1).fill(-1);

  for (let i = 0; i < n; i++) {
    if (dp[i] === Infinity) continue;

    // Option A: If characters match exactly, we can skip transformation for this char
    if (source[i] === target[i]) {
      if (dp[i] < dp[i + 1]) {
        dp[i + 1] = dp[i];
      }
    }

    // Option B: Apply a transformation rule

    // Step B1: Identify valid substrings in 'target' starting at i
    // We traverse the Trie with target[i...] to find which substrings correspond to graph nodes
    const matchedLens: number[] = [];
    let node = root;
    for (let k = i; k < n; k++) {
      const char = target[k];
      const child = node.children.get(char);
      if (!child) break;
      node = child;
      if (node.id !== -1) {
        const len = k - i + 1;
        targetMatches[len] = node.id;
        matchedLens.push(len);
      }
    }

    // Step B2: Identify valid substrings in 'source' starting at i
    // And check if they can be converted to the corresponding target substring
    node = root;
    for (let k = i; k < n; k++) {
      const char = source[k];
      const child = node.children.get(char);
      if (!child) break;
      node = child;

      if (node.id !== -1) {
        const len = k - i + 1;
        const srcId = node.id;
        const tgtId = targetMatches[len];

        // If both source and target substrings of length 'len' are known nodes
        if (tgtId !== -1) {
          const conversionCost = dist[srcId][tgtId];
          if (conversionCost !== Infinity) {
            if (dp[i] + conversionCost < dp[i + len]) {
              dp[i + len] = dp[i] + conversionCost;
            }
          }
        }
      }
    }

    // Clean up targetMatches for the next iteration
    for (const len of matchedLens) {
      targetMatches[len] = -1;
    }
  }

  return dp[n] === Infinity ? -1 : dp[n];
};
console.log(minimumCost(source, target, original, changed, cost));
