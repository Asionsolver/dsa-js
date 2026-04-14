// 2608. Shortest Cycle in a Graph

/**
Example 1:


Input: n = 7, edges = [[0,1],[1,2],[2,0],[3,4],[4,5],[5,6],[6,3]]
Output: 3
Explanation: The cycle with the smallest length is : 0 -> 1 -> 2 -> 0 
Example 2:


Input: n = 4, edges = [[0,1],[0,2]]
Output: -1
Explanation: There are no cycles in this graph.

*/

const n = 7;
const edges = [
  [0, 1],
  [1, 2],
  [2, 0],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 3],
];
const findShortestCycle = (n: number, edges: number[][]): number => {
  // Build the adjacency list for the graph
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (let i = 0; i < edges.length; i++) {
    const u = edges[i][0];
    const v = edges[i][1];
    adj[u].push(v);
    adj[v].push(u);
  }

  let minCycle = Infinity;

  // Pre-allocate memory for the BFS queues and state trackers to minimize overhead
  const dist = new Int32Array(n);
  const parent = new Int32Array(n);
  const queue = new Int32Array(n);

  for (let i = 0; i < n; i++) {
    // Reset state for the new BFS traversal
    dist.fill(-1);
    parent.fill(-1);

    let head = 0;
    let tail = 0;

    // Initialize the starting node
    dist[i] = 0;
    queue[tail++] = i;

    while (head < tail) {
      const u = queue[head++];

      // Optimization: If the current distance is already greater than or equal to the
      // shortest cycle found so far, any cycle found from here will just be longer.
      if (dist[u] >= minCycle) {
        break;
      }

      const neighbors = adj[u];
      for (let j = 0; j < neighbors.length; j++) {
        const v = neighbors[j];

        if (dist[v] === -1) {
          // Node `v` is unvisited
          dist[v] = dist[u] + 1;
          parent[v] = u;
          queue[tail++] = v;
        } else if (parent[u] !== v) {
          // Node `v` is visited and it's not the parent we came from -> Cycle Detected
          const cycleLen = dist[u] + dist[v] + 1;
          if (cycleLen < minCycle) {
            minCycle = cycleLen;
          }
        }
      }
    }
  }

  // Return the result. Return -1 if minCycle remained Infinity (meaning no cycles exist).
  return minCycle === Infinity ? -1 : minCycle;
};

console.log(findShortestCycle(n, edges)); // Output: 3
