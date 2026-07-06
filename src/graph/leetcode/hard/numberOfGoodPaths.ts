// 2421. Number of Good Paths

/**
Example 1:


Input: vals = [1,3,2,1,3], edges = [[0,1],[0,2],[2,3],[2,4]]
Output: 6
Explanation: There are 5 good paths consisting of a single node.
There is 1 additional good path: 1 -> 0 -> 2 -> 4.
(The reverse path 4 -> 2 -> 0 -> 1 is treated as the same as 1 -> 0 -> 2 -> 4.)
Note that 0 -> 2 -> 3 is not a good path because vals[2] > vals[0].
Example 2:


Input: vals = [1,1,2,2,3], edges = [[0,1],[1,2],[2,3],[2,4]]
Output: 7
Explanation: There are 5 good paths consisting of a single node.
There are 2 additional good paths: 0 -> 1 and 2 -> 3.
Example 3:


Input: vals = [1], edges = []
Output: 1
Explanation: The tree consists of only one node, so there is one good path.
*/

function numberOfGoodPaths(vals: number[], edges: number[][]): number {
  const n = vals.length;
  let ans = n; // Each individual node is a valid path of length 1

  const m = edges.length;
  const edgeMaxVals = new Int32Array(m);
  const edgeIndices = new Int32Array(m);

  // Precompute the maximum value of the endpoints for each edge
  for (let i = 0; i < m; i++) {
    edgeMaxVals[i] = Math.max(vals[edges[i][0]], vals[edges[i][1]]);
    edgeIndices[i] = i;
  }

  // Sort edge indices based on their precomputed max endpoint values
  edgeIndices.sort((a, b) => edgeMaxVals[a] - edgeMaxVals[b]);

  // DSU arrays
  const parent = new Int32Array(n);
  const maxVal = new Int32Array(vals);
  const count = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    parent[i] = i;
    count[i] = 1;
  }

  // Iterative find function with path compression
  function find(i: number): number {
    let root = i;
    while (root !== parent[root]) {
      root = parent[root];
    }
    let curr = i;
    while (curr !== root) {
      const next = parent[curr];
      parent[curr] = root;
      curr = next;
    }
    return root;
  }

  // Process edges in increasing order of their endpoint values
  for (let i = 0; i < m; i++) {
    const edgeIdx = edgeIndices[i];
    const u = edges[edgeIdx][0];
    const v = edges[edgeIdx][1];

    const rootU = find(u);
    const rootV = find(v);

    if (rootU !== rootV) {
      if (maxVal[rootU] === maxVal[rootV]) {
        // Good paths are formed between matching max values in both components
        ans += count[rootU] * count[rootV];
        parent[rootV] = rootU;
        count[rootU] += count[rootV];
      } else if (maxVal[rootU] > maxVal[rootV]) {
        parent[rootV] = rootU;
      } else {
        parent[rootU] = rootV;
      }
    }
  }

  return ans;
}

// Example usage:
const vals1 = [1, 3, 2, 1, 3];
const edges1 = [
  [0, 1],
  [0, 2],
  [2, 3],
  [2, 4],
];
console.log(numberOfGoodPaths(vals1, edges1)); // Output: 6

const vals2 = [1, 1, 2, 2, 3];
const edges2 = [
  [0, 1],
  [1, 2],
  [2, 3],
  [2, 4],
];
console.log(numberOfGoodPaths(vals2, edges2)); // Output: 7

const vals3 = [1];
const edges3: number[][] = [];
console.log(numberOfGoodPaths(vals3, edges3)); // Output: 1
