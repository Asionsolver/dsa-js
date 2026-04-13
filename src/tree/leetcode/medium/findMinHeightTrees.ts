// 310. Minimum Height Trees

/**
Example 1:


Input: n = 4, edges = [[1,0],[1,2],[1,3]]
Output: [1]
Explanation: As shown, the height of the tree is 1 when the root is the node with label 1 which is the only MHT.
Example 2:


Input: n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
Output: [3,4]

Explanation: There are 2 MHTs for this graph, one is rooted at the node with label 3 and the other is rooted at the node with label 4.
Example 3:

Input: n = 1, edges = []
Output: [0]
Example 4:

Input: n = 2, edges = [[0,1]]
Output: [0,1]
*/

const n = 6,
  edges = [
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 4],
    [5, 4],
  ];

function findMinHeightTrees(n: number, edges: number[][]): number[] {
  // Edge cases: If there are 1 or 2 nodes, all of them are MHT roots.
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  // Build the adjacency list and degree array
  const adj: number[][] = Array.from({ length: n }, () => []);
  const degree: number[] = new Array(n).fill(0);

  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
    degree[u]++;
    degree[v]++;
  }

  // Initialize the first layer of leaves
  let leaves: number[] = [];
  for (let i = 0; i < n; i++) {
    if (degree[i] === 1) {
      leaves.push(i);
    }
  }

  // Peel leaves layer by layer until 1 or 2 nodes are left
  let remainingNodes = n;
  while (remainingNodes > 2) {
    const leavesCount = leaves.length;
    remainingNodes -= leavesCount;

    const newLeaves: number[] = [];

    for (let i = 0; i < leavesCount; i++) {
      const leaf = leaves[i];

      // A leaf only has one active neighbor
      for (const neighbor of adj[leaf]) {
        degree[neighbor]--;
        // If the neighbor becomes a leaf, prepare it for the next iteration
        if (degree[neighbor] === 1) {
          newLeaves.push(neighbor);
        }
      }
    }

    // Move on to the next inward layer
    leaves = newLeaves;
  }

  // The remaining nodes are the roots of the minimum height trees
  return leaves;
}

console.log(findMinHeightTrees(n, edges));
