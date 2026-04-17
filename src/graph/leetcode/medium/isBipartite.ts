// 785. Is Graph Bipartite?

/**
Example 1:


Input: graph = [[1,2,3],[0,2],[0,1,3],[0,2]]
Output: false
Explanation: There is no way to partition the nodes into two independent sets such that every edge connects a node in one and a node in the other.
Example 2:


Input: graph = [[1,3],[0,2],[1,3],[0,2]]
Output: true
Explanation: We can partition the nodes into two sets: {0, 2} and {1, 3}.
*/

// Paste the function here
function isBipartite(graph: number[][]): boolean {
  const n = graph.length;
  const colors: number[] = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    if (colors[i] !== 0) continue;

    const queue: number[] = [i];
    colors[i] = 1;
    let head = 0;

    while (head < queue.length) {
      const curr = queue[head++];

      for (const neighbor of graph[curr]) {
        if (colors[neighbor] === 0) {
          colors[neighbor] = -colors[curr];
          queue.push(neighbor);
        } else if (colors[neighbor] === colors[curr]) {
          return false;
        }
      }
    }
  }
  return true;
}

// ---- TEST CASES ----
const graph1 = [
  [1, 2, 3],
  [0, 2],
  [0, 1, 3],
  [0, 2],
];
console.log("Example 1:");
console.log("Input:", JSON.stringify(graph1));
console.log("Output:", isBipartite(graph1)); // Expected: false
console.log("-----------------------");

const graph2 = [
  [1, 3],
  [0, 2],
  [1, 3],
  [0, 2],
];
console.log("Example 2:");
console.log("Input:", JSON.stringify(graph2));
console.log("Output:", isBipartite(graph2)); // Expected: true
