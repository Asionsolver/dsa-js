// 802. Find Eventual Safe States

/**
Example 1:

Illustration of graph
Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
Output: [2,4,5,6]
Explanation: The given graph is shown above.
Nodes 5 and 6 are terminal nodes as there are no outgoing edges from either of them.
Every path starting at nodes 2, 4, 5, and 6 all lead to either node 5 or 6.
Example 2:

Input: graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
Output: [4]
Explanation:
Only node 4 is a terminal node, and every path starting at node 4 leads to node 4.
*/

const graph = [[1, 2], [2, 3], [5], [0], [5], [], []];

const eventualSafeNodes = function (graph: number[][]): number[] {
  const n = graph.length;

  // outDegree tracks the number of unverified outgoing edges for each node
  const outDegree = new Int32Array(n);

  // revGraph stores the reversed direction of the edges (v -> u)
  const revGraph: number[][] = Array.from({ length: n }, () => []);

  // Build the reverse graph and compute initial out-degrees
  for (let u = 0; u < n; u++) {
    outDegree[u] = graph[u].length;
    for (let i = 0; i < graph[u].length; i++) {
      const v = graph[u][i];
      revGraph[v].push(u);
    }
  }

  // Initialize the queue with all terminal nodes (outDegree === 0)
  const queue: number[] = [];
  for (let i = 0; i < n; i++) {
    if (outDegree[i] === 0) {
      queue.push(i);
    }
  }

  let head = 0; // Using a pointer to simulate queue.shift() for O(1) time
  const isSafe = new Uint8Array(n);

  // Process the topological sort
  while (head < queue.length) {
    const v = queue[head++];
    isSafe[v] = 1;

    // For each node `u` that originally pointed to `v` (i.e., u -> v)
    for (let i = 0; i < revGraph[v].length; i++) {
      const u = revGraph[v][i];
      outDegree[u]--;

      // If all paths from `u` lead to verified safe nodes, `u` is now safe too
      if (outDegree[u] === 0) {
        queue.push(u);
      }
    }
  }

  // Filter out all nodes that were successfully verified as safe
  const result: number[] = [];
  for (let i = 0; i < n; i++) {
    if (isSafe[i] === 1) {
      result.push(i);
    }
  }

  return result;
};

console.log(eventualSafeNodes(graph));
