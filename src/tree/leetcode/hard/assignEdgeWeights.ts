// 3559. Number of Ways to Assign Edge Weights II

/**
Example 1:



Input: edges = [[1,2]], queries = [[1,1],[1,2]]

Output: [0,1]

Explanation:

Query [1,1]: The path from Node 1 to itself consists of no edges, so the cost is 0. Thus, the number of valid assignments is 0.
Query [1,2]: The path from Node 1 to Node 2 consists of one edge (1 → 2). Assigning weight 1 makes the cost odd, while 2 makes it even. Thus, the number of valid assignments is 1.
Example 2:



Input: edges = [[1,2],[1,3],[3,4],[3,5]], queries = [[1,4],[3,4],[2,5]]

Output: [2,1,4]

Explanation:

Query [1,4]: The path from Node 1 to Node 4 consists of two edges (1 → 3 and 3 → 4). Assigning weights (1,2) or (2,1) results in an odd cost. Thus, the number of valid assignments is 2.
Query [3,4]: The path from Node 3 to Node 4 consists of one edge (3 → 4). Assigning weight 1 makes the cost odd, while 2 makes it even. Thus, the number of valid assignments is 1.
Query [2,5]: The path from Node 2 to Node 5 consists of three edges (2 → 1, 1 → 3, and 3 → 5). Assigning (1,2,2), (2,1,2), (2,2,1), or (1,1,1) makes the cost odd. Thus, the number of valid assignments is 4.
*/

function assignEdgeWeights(edges: number[][], queries: number[][]): number[] {
  const n = edges.length + 1;
  const MOD = 1000000007;

  // Precompute powers of 2 modulo 10^9 + 7
  const pow2 = new Int32Array(n + 1);
  pow2[0] = 1;
  for (let i = 1; i <= n; i++) {
    pow2[i] = (pow2[i - 1] * 2) % MOD;
  }

  // Build the adjacency list using flat typed arrays for maximum speed/memory efficiency
  const head = new Int32Array(n + 1).fill(-1);
  const next = new Int32Array(2 * n);
  const to = new Int32Array(2 * n);
  let edgeCount = 0;

  function addEdge(u: number, v: number) {
    to[edgeCount] = v;
    next[edgeCount] = head[u];
    head[u] = edgeCount++;
  }

  for (let i = 0; i < edges.length; i++) {
    const u = edges[i][0];
    const v = edges[i][1];
    addEdge(u, v);
    addEdge(v, u);
  }

  // Iterative BFS to compute depth and parent arrays (stack-overflow safe)
  const depth = new Int32Array(n + 1);
  const parent = new Int32Array(n + 1);
  const queue = new Int32Array(n + 1);
  let headIdx = 0;
  let tailIdx = 0;

  queue[tailIdx++] = 1;
  depth[1] = 0;
  parent[1] = 1; // root's parent is itself to prevent out of bounds

  const visited = new Uint8Array(n + 1);
  visited[1] = 1;

  while (headIdx < tailIdx) {
    const u = queue[headIdx++];
    const d = depth[u];
    for (let e = head[u]; e !== -1; e = next[e]) {
      const v = to[e];
      if (visited[v] === 0) {
        visited[v] = 1;
        parent[v] = u;
        depth[v] = d + 1;
        queue[tailIdx++] = v;
      }
    }
  }

  // Binary Lifting Table Precomputation
  const LOG = 18; // 2^17 = 131072 > 10^5, so 18 levels are sufficient
  const up = new Int32Array((n + 1) * LOG);

  for (let u = 1; u <= n; u++) {
    up[u * LOG + 0] = parent[u];
  }

  for (let j = 1; j < LOG; j++) {
    const offsetPrev = j - 1;
    const offsetCurr = j;
    for (let u = 1; u <= n; u++) {
      const anc = up[u * LOG + offsetPrev];
      up[u * LOG + offsetCurr] = up[anc * LOG + offsetPrev];
    }
  }

  // Fast LCA query function
  function getLCA(u: number, v: number): number {
    if (depth[u] < depth[v]) {
      const temp = u;
      u = v;
      v = temp;
    }
    let diff = depth[u] - depth[v];
    for (let j = LOG - 1; j >= 0; j--) {
      if ((diff >> j) & 1) {
        u = up[u * LOG + j];
      }
    }
    if (u === v) return u;
    for (let j = LOG - 1; j >= 0; j--) {
      const upU = up[u * LOG + j];
      const upV = up[v * LOG + j];
      if (upU !== upV) {
        u = upU;
        v = upV;
      }
    }
    return up[u * LOG + 0];
  }

  // Process all queries
  const q = queries.length;
  const ans = new Array<number>(q);
  for (let i = 0; i < q; i++) {
    const u = queries[i][0];
    const v = queries[i][1];
    if (u === v) {
      ans[i] = 0;
    } else {
      const lca = getLCA(u, v);
      const d = depth[u] + depth[v] - 2 * depth[lca];
      ans[i] = pow2[d - 1];
    }
  }

  return ans;
}

// Example usage:
const edges1 = [[1, 2]];
const queries1 = [
  [1, 1],
  [1, 2],
];
console.log(assignEdgeWeights(edges1, queries1)); // Output: [0, 1]

const edges2 = [
  [1, 2],
  [1, 3],
  [3, 4],
  [3, 5],
];
const queries2 = [
  [1, 4],
  [3, 4],
  [2, 5],
];
console.log(assignEdgeWeights(edges2, queries2)); // Output: [2, 1, 4]
