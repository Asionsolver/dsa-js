// 2925. Maximum Score After Applying Operations on a Tree

/**
Example 1:


Input: edges = [[0,1],[0,2],[0,3],[2,4],[4,5]], values = [5,2,5,2,1,1]
Output: 11
Explanation: We can choose nodes 1, 2, 3, 4, and 5. The value of the root is non-zero. Hence, the sum of values on the path from the root to any leaf is different than zero. Therefore, the tree is healthy and the score is values[1] + values[2] + values[3] + values[4] + values[5] = 11.
It can be shown that 11 is the maximum score obtainable after any number of operations on the tree.
Example 2:


Input: edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]], values = [20,10,9,7,4,3,5]
Output: 40
Explanation: We can choose nodes 0, 2, 3, and 4.
- The sum of values on the path from 0 to 4 is equal to 10.
- The sum of values on the path from 0 to 3 is equal to 10.
- The sum of values on the path from 0 to 5 is equal to 3.
- The sum of values on the path from 0 to 6 is equal to 5.
Therefore, the tree is healthy and the score is values[0] + values[2] + values[3] + values[4] = 40.
It can be shown that 40 is the maximum score obtainable after any number of operations on the tree.
*/

const maximumScoreAfterOperations = function (
  edges: number[][],
  values: number[],
): number {
  const n = values.length;
  const adj: number[][] = Array.from({ length: n }, () => []);
  const degree = new Int32Array(n);

  // Build the adjacency list and degree count for identifying leaves
  for (let i = 0; i < edges.length; i++) {
    const u = edges[i][0];
    const v = edges[i][1];
    adj[u].push(v);
    adj[v].push(u);
    degree[u]++;
    degree[v]++;
  }

  const order = new Int32Array(n);
  const parent = new Int32Array(n).fill(-1);
  let head = 0;
  let tail = 0;

  // Step 1: Execute BFS to establish the parent-child relationships and topological tree ordering
  order[tail++] = 0;

  while (head < tail) {
    const u = order[head++];
    const neighbors = adj[u];
    for (let i = 0; i < neighbors.length; i++) {
      const v = neighbors[i];
      if (v !== parent[u]) {
        parent[v] = u;
        order[tail++] = v;
      }
    }
  }

  // Float64Array ensures no precision loss as the tree totals can exceed INT32 thresholds.
  const dp = new Float64Array(n);

  // Step 2: Traverse in reverse BFS sequence strictly evaluating children before parents (Bottom-Up Process)
  for (let i = n - 1; i >= 0; i--) {
    const u = order[i];

    // A node evaluates to a leaf if it's not the root and has only 1 edge attached.
    if (u !== 0 && degree[u] === 1) {
      dp[u] = values[u];
    } else {
      let sumChildren = 0;
      const neighbors = adj[u];
      for (let j = 0; j < neighbors.length; j++) {
        const v = neighbors[j];
        // Proceed computations exclusively with downwards children
        if (v !== parent[u]) {
          sumChildren += dp[v];
        }
      }
      // State transition evaluates minimizing: keeping the current node vs skipping to keep the children downstream
      dp[u] = Math.min(values[u], sumChildren);
    }
  }

  let totalSum = 0;
  for (let i = 0; i < n; i++) {
    totalSum += values[i];
  }

  // The maximum score equates directly to deducting the minimum threshold we must "keep / not pick".
  return totalSum - dp[0];
};

// Test cases
console.log(
  maximumScoreAfterOperations(
    [
      [0, 1],
      [0, 2],
      [0, 3],
      [2, 4],
      [4, 5],
    ],
    [5, 2, 5, 2, 1, 1],
  ),
); // Output: 11
console.log(
  maximumScoreAfterOperations(
    [
      [0, 1],
      [0, 2],
      [1, 3],
      [1, 4],
      [2, 5],
      [2, 6],
    ],
    [20, 10, 9, 7, 4, 3, 5],
  ),
); // Output: 40
