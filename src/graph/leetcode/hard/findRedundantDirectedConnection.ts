// 685. Redundant Connection II

/**
Example 1:


Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
Example 2:


Input: edges = [[1,2],[2,3],[3,4],[4,1],[1,5]]
Output: [4,1]

*/

const edges = [
  [1, 2],
  [1, 3],
  [2, 3],
];
const findRedundantDirectedConnection = (edges: number[][]): number[] => {
  const n = edges.length;
  const parent = new Array(n + 1).fill(0);

  let cand1: number[] | null = null;
  let cand2: number[] | null = null;

  // Step 1: Find the node with two parents (indegree of 2)
  for (const edge of edges) {
    const [u, v] = edge;
    if (parent[v] !== 0) {
      cand1 = [parent[v], v];
      cand2 = [u, v];
    } else {
      parent[v] = u;
    }
  }

  // Initialize Union-Find structure
  const uf = new Array(n + 1).fill(0).map((_, i) => i);

  function find(i: number): number {
    if (uf[i] !== i) {
      uf[i] = find(uf[i]); // Path compression
    }
    return uf[i];
  }

  // Step 2: Use Union-Find to detect a cycle
  for (const edge of edges) {
    const [u, v] = edge;

    // Skip the second candidate edge to see if the graph is valid without it
    if (cand2 && u === cand2[0] && v === cand2[1]) {
      continue;
    }

    const rootU = find(u);
    const rootV = find(v);

    if (rootU === rootV) {
      // Cycle detected
      if (cand1) {
        // If there's a cycle even without cand2, then cand1 is the redundant edge
        return cand1;
      } else {
        // If there were no candidates (no indegree of 2), the edge completing the cycle is the answer
        return edge;
      }
    }

    uf[rootV] = rootU; // Union the sets
  }

  // Step 3: If no cycle is detected, cand2 was indeed the redundant edge
  return cand2!;
};

// Example usage:
console.log(findRedundantDirectedConnection(edges)); // Output: [2, 3]
