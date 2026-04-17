// 2603. Collect Coins in a Tree

/**
Example 1:


Input: coins = [1,0,0,0,0,1], edges = [[0,1],[1,2],[2,3],[3,4],[4,5]]
Output: 2
Explanation: Start at vertex 2, collect the coin at vertex 0, move to vertex 3, collect the coin at vertex 5 then move back to vertex 2.
Example 2:


Input: coins = [0,0,0,1,1,0,0,1], edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[5,6],[5,7]]
Output: 2
Explanation: Start at vertex 0, collect the coins at vertices 4 and 3, move to vertex 2,  collect the coin at vertex 7, then move back to vertex 0.
*/

// Kahn's Algorithm for Topological Sort (BFS) + Degree Counting
const collectTheCoins = (coins: number[], edges: number[][]): number => {
  const n = coins.length;
  // If the tree consists of 1 or fewer nodes, 0 edges are traversed
  if (n <= 1) return 0;

  const adj: number[][] = [];
  for (let i = 0; i < n; i++) {
    adj.push([]);
  }

  // Track degrees to identify leaves at any given state
  const degree = new Int32Array(n);

  for (let i = 0; i < edges.length; i++) {
    const u = edges[i][0];
    const v = edges[i][1];
    adj[u].push(v);
    adj[v].push(u);
    degree[u]++;
    degree[v]++;
  }

  const deleted = new Uint8Array(n);
  const queue: number[] = [];

  // ---------------------------------------------------------
  // Phase 1: Remove all subtrees & leaves that do not have any coins
  // ---------------------------------------------------------
  for (let i = 0; i < n; i++) {
    if (degree[i] === 1 && coins[i] === 0) {
      queue.push(i);
    }
  }

  let remaining_nodes = n;
  let head = 0;

  while (head < queue.length) {
    const u = queue[head++];
    deleted[u] = 1;
    remaining_nodes--;

    const neighbors = adj[u];
    for (let i = 0; i < neighbors.length; i++) {
      const v = neighbors[i];
      if (deleted[v] === 0) {
        degree[v]--;
        // If its neighbor becomes a leaf and holds no coin, push it down the queue
        if (degree[v] === 1 && coins[v] === 0) {
          queue.push(v);
        }
      }
    }
  }

  // ---------------------------------------------------------
  // Phase 2: Remove exact two layers of extreme leaves (radius = 2 distance)
  // ---------------------------------------------------------
  const leavesQueue: number[] = [];
  for (let i = 0; i < n; i++) {
    if (deleted[i] === 0 && degree[i] === 1) {
      leavesQueue.push(i);
    }
  }

  let currentQueue = leavesQueue;
  for (let step = 0; step < 2; step++) {
    const nextQueue: number[] = [];

    for (let j = 0; j < currentQueue.length; j++) {
      const u = currentQueue[j];
      deleted[u] = 1;
      remaining_nodes--;

      const neighbors = adj[u];
      for (let i = 0; i < neighbors.length; i++) {
        const v = neighbors[i];
        if (deleted[v] === 0) {
          degree[v]--;
          if (degree[v] === 1) {
            nextQueue.push(v);
          }
        }
      }
    }
    currentQueue = nextQueue;
  }

  // Calculating 2 * edges (since an edge path in the required minimum subtree guarantees a return loop to the root.)
  return Math.max(0, 2 * (remaining_nodes - 1));
};

// Example usage:
const coins = [1, 0, 0, 0, 0, 1];
const edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
];
console.log(collectTheCoins(coins, edges)); // Output: 2
