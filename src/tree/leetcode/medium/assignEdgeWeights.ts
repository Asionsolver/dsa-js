// 3558. Number of Ways to Assign Edge Weights I

/**

Example 1:



Input: edges = [[1,2]]

Output: 1

Explanation:

The path from Node 1 to Node 2 consists of one edge (1 → 2).
Assigning weight 1 makes the cost odd, while 2 makes it even. Thus, the number of valid assignments is 1.
Example 2:



Input: edges = [[1,2],[1,3],[3,4],[3,5]]

Output: 2

Explanation:

The maximum depth is 2, with nodes 4 and 5 at the same depth. Either node can be selected for processing.
For example, the path from Node 1 to Node 4 consists of two edges (1 → 3 and 3 → 4).
Assigning weights (1,2) or (2,1) results in an odd cost. Thus, the number of valid assignments is 2.
*/

function assignEdgeWeights(edges: number[][]): number {
  const n = edges.length + 1;
  const adj: number[][] = Array.from({ length: n + 1 }, () => []);

  // Build adjacency list
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  // BFS to find the maximum depth (L)
  let level: number[] = [1];
  const visited = new Uint8Array(n + 1);
  visited[1] = 1;
  let L = 0;

  while (true) {
    const nextLevel: number[] = [];
    for (const curr of level) {
      for (const neighbor of adj[curr]) {
        if (!visited[neighbor]) {
          visited[neighbor] = 1;
          nextLevel.push(neighbor);
        }
      }
    }
    if (nextLevel.length === 0) {
      break;
    }
    level = nextLevel;
    L++;
  }

  const MOD = 1000000007n;

  // Helper function for modular exponentiation
  function power(base: bigint, exp: bigint, mod: bigint): bigint {
    let res = 1n;
    base = base % mod;
    while (exp > 0n) {
      if (exp % 2n === 1n) {
        res = (res * base) % mod;
      }
      base = (base * base) % mod;
      exp = exp / 2n;
    }
    return res;
  }

  // Since n >= 2, L is guaranteed to be >= 1.
  return Number(power(2n, BigInt(L - 1), MOD));
}

// Test cases
console.log(assignEdgeWeights([[1, 2]])); // Output: 1
console.log(
  assignEdgeWeights([
    [1, 2],
    [1, 3],
    [3, 4],
    [3, 5],
  ]),
); // Output: 2
