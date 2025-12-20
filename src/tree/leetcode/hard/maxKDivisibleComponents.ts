// 2872. Maximum Number of K-Divisible Components

/**
Example 1:


Input: n = 5, edges = [[0,2],[1,2],[1,3],[2,4]], values = [1,8,1,4,4], k = 6
Output: 2
Explanation: We remove the edge connecting node 1 with 2. The resulting split is valid because:
- The value of the component containing nodes 1 and 3 is values[1] + values[3] = 12.
- The value of the component containing nodes 0, 2, and 4 is values[0] + values[2] + values[4] = 6.
It can be shown that no other valid split has more than 2 connected components.
Example 2:


Input: n = 7, edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]], values = [3,0,6,1,5,2,1], k = 3
Output: 3
Explanation: We remove the edge connecting node 0 with 2, and the edge connecting node 0 with 1. The resulting split is valid because:
- The value of the component containing node 0 is values[0] = 3.
- The value of the component containing nodes 2, 5, and 6 is values[2] + values[5] + values[6] = 9.
- The value of the component containing nodes 1, 3, and 4 is values[1] + values[3] + values[4] = 6.
It can be shown that no other valid split has more than 3 connected components.
 
*/
const n = 5,
  edges = [
    [0, 2],
    [1, 2],
    [1, 3],
    [2, 4],
  ],
  values = [1, 8, 1, 4, 4],
  k = 6;

const maxKDivisibleComponents = function (
  n: number,
  edges: number[][],
  values: number[],
  k: number
) {
  // 1. Build the adjacency list for the undirected tree
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (let i = 0; i < edges.length; i++) {
    const u = edges[i][0];
    const v = edges[i][1];
    adj[u].push(v);
    adj[v].push(u);
  }

  // 2. Perform an iterative DFS to determine the processing order (leaves to root)
  // and parent relationships.
  const parent = new Int32Array(n).fill(-1);
  const order: number[] = [];
  const stack: number[] = [0];
  const visited = new Uint8Array(n);
  visited[0] = 1;

  while (stack.length > 0) {
    const u = stack.pop()!;
    order.push(u);
    const neighbors = adj[u];
    for (let i = 0; i < neighbors.length; i++) {
      const v = neighbors[i];
      if (!visited[v]) {
        visited[v] = 1;
        parent[v] = u;
        stack.push(v);
      }
    }
  }

  // 3. Process nodes bottom-up (reverse of the DFS order)
  let components = 0;

  // nodeSums stores the sum of values for the current subtree.
  // JavaScript Number (Float64) safely handles integers up to 2^53 - 1 (approx 9e15).
  // The maximum possible sum is 3e4 * 10^9 = 3e13, which fits perfectly.
  const nodeSums = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    nodeSums[i] = values[i];
  }

  for (let i = n - 1; i >= 0; i--) {
    const u = order[i];
    const p = parent[u];

    // Calculate the remainder of the current node's subtree sum
    const remainder = nodeSums[u] % k;

    if (remainder === 0) {
      // If divisible by k, it can form its own component.
      components++;
      // This component contributes 0 to the parent's sum because it's "cut".
    } else {
      // If not divisible, pass the remainder up to the parent node.
      if (p !== -1) {
        nodeSums[p] += remainder;
      }
    }
  }

  return components;
};

console.log("Example 1 Output:", maxKDivisibleComponents(n, edges, values, k));
