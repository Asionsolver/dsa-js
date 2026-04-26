// 2368. Reachable Nodes With Restrictions

/**
Example 1:


Input: n = 7, edges = [[0,1],[1,2],[3,1],[4,0],[0,5],[5,6]], restricted = [4,5]
Output: 4
Explanation: The diagram above shows the tree.
We have that [0,1,2,3] are the only nodes that can be reached from node 0 without visiting a restricted node.
Example 2:


Input: n = 7, edges = [[0,1],[0,2],[0,5],[0,4],[3,2],[6,5]], restricted = [4,2,1]
Output: 3
Explanation: The diagram above shows the tree.
We have that [0,5,6] are the only nodes that can be reached from node 0 without visiting a restricted node.

*/

function reachableNodes(
  n: number,
  edges: number[][],
  restricted: number[],
): number {
  // Array to quickly check if a node is restricted
  const isRestricted = new Uint8Array(n);
  for (let i = 0; i < restricted.length; i++) {
    isRestricted[restricted[i]] = 1;
  }

  // Initialize Disjoint Set Union (DSU) arrays
  const parent = new Int32Array(n);
  const size = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    parent[i] = i;
    size[i] = 1; // Initially, every component holds strictly just its own node
  }

  // Find function with path halving for optimized component lookup
  function find(i: number): number {
    let current = i;
    while (current !== parent[current]) {
      parent[current] = parent[parent[current]];
      current = parent[current];
    }
    return current;
  }

  // Process all edges
  for (let i = 0; i < edges.length; i++) {
    const u = edges[i][0];
    const v = edges[i][1];

    // If neither endpoint of the edge is restricted, merge their components
    if (isRestricted[u] === 0 && isRestricted[v] === 0) {
      const rootU = find(u);
      const rootV = find(v);

      if (rootU !== rootV) {
        // Union by size
        if (size[rootU] > size[rootV]) {
          parent[rootV] = rootU;
          size[rootU] += size[rootV];
        } else {
          parent[rootU] = rootV;
          size[rootV] += size[rootU];
        }
      }
    }
  }

  // Return the size of the component holding the 0th node
  return size[find(0)];
}

// Example usage:
console.log(
  reachableNodes(
    7,
    [
      [0, 1],
      [1, 2],
      [3, 1],
      [4, 0],
      [0, 5],
      [5, 6],
    ],
    [4, 5],
  ),
); // Output: 4
console.log(
  reachableNodes(
    7,
    [
      [0, 1],
      [0, 2],
      [0, 5],
      [0, 4],
      [3, 2],
      [6, 5],
    ],
    [4, 2, 1],
  ),
); // Output: 3
