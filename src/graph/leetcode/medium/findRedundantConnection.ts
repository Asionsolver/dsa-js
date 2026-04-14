// 684. Redundant Connection

/**
Example 1:


Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
Example 2:


Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
Output: [1,4]

 */

const edges = [
  [1, 2],
  [1, 3],
  [2, 3],
];
const findRedundantConnection = (edges: number[][]): number[] => {
  const n = edges.length;

  // Arrays to keep track of the representative (parent) of each node and the rank of each tree
  const parent: number[] = new Array(n + 1);
  const rank: number[] = new Array(n + 1).fill(1);

  // Initialize each node to be its own parent
  for (let i = 1; i <= n; i++) {
    parent[i] = i;
  }

  // Find function with Path Compression
  const find = (x: number): number => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]); // Compress the path
    }
    return parent[x];
  };

  // Union function with Union by Rank
  const union = (x: number, y: number): boolean => {
    const rootX = find(x);
    const rootY = find(y);

    // If both nodes share the same root, a cycle is detected
    if (rootX === rootY) {
      return false;
    }

    // Attach the smaller tree under the root of the larger tree
    if (rank[rootX] > rank[rootY]) {
      parent[rootY] = rootX;
    } else if (rank[rootX] < rank[rootY]) {
      parent[rootX] = rootY;
    } else {
      parent[rootY] = rootX;
      rank[rootX] += 1;
    }

    return true;
  };

  // Process each edge
  for (const [u, v] of edges) {
    // If union returns false, it means connecting u and v creates a cycle
    if (!union(u, v)) {
      return [u, v];
    }
  }

  return [];
};

console.log(findRedundantConnection(edges)); // Output: [2, 3]
