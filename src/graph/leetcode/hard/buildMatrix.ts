// 2392. Build a Matrix With Conditions

/**
Example 1:


Input: k = 3, rowConditions = [[1,2],[3,2]], colConditions = [[2,1],[3,2]]
Output: [[3,0,0],[0,0,1],[0,2,0]]
Explanation: The diagram above shows a valid example of a matrix that satisfies all the conditions.
The row conditions are the following:
- Number 1 is in row 1, and number 2 is in row 2, so 1 is above 2 in the matrix.
- Number 3 is in row 0, and number 2 is in row 2, so 3 is above 2 in the matrix.
The column conditions are the following:
- Number 2 is in column 1, and number 1 is in column 2, so 2 is left of 1 in the matrix.
- Number 3 is in column 0, and number 2 is in column 1, so 3 is left of 2 in the matrix.
Note that there may be multiple correct answers.
Example 2:

Input: k = 3, rowConditions = [[1,2],[2,3],[3,1],[2,3]], colConditions = [[2,1]]
Output: []
Explanation: From the first two conditions, 3 has to be below 1 but the third conditions needs 3 to be above 1 to be satisfied.
No matrix can satisfy all the conditions, so we return the empty matrix.
*/

const k = 3,
  rowConditions = [
    [1, 2],
    [3, 2],
  ],
  colConditions = [
    [2, 1],
    [3, 2],
  ];

function buildMatrix(
  k: number,
  rowConditions: number[][],
  colConditions: number[][],
): number[][] {
  // Helper function to perform Kahn's Topological Sort
  function topoSort(edges: number[][]): number[] | null {
    const adj: number[][] = Array.from({ length: k + 1 }, () => []);
    const inDegree = new Int32Array(k + 1);
    const seen = new Uint8Array((k + 1) * (k + 1));

    // Build graph and calculate in-degrees while deduplicating edges
    for (let i = 0; i < edges.length; i++) {
      const u = edges[i][0];
      const v = edges[i][1];
      const hash = u * (k + 1) + v;

      if (seen[hash] === 0) {
        seen[hash] = 1;
        adj[u].push(v);
        inDegree[v]++;
      }
    }

    const queue = new Int32Array(k);
    let head = 0;
    let tail = 0;

    // Append all nodes with zero in-degree to queue
    for (let i = 1; i <= k; i++) {
      if (inDegree[i] === 0) {
        queue[tail++] = i;
      }
    }

    const order: number[] = new Array(k);
    let index = 0;

    // Process queue to assemble the topological order
    while (head < tail) {
      const u = queue[head++];
      order[index++] = u;

      const neighbors = adj[u];
      for (let i = 0; i < neighbors.length; i++) {
        const v = neighbors[i];
        inDegree[v]--;
        if (inDegree[v] === 0) {
          queue[tail++] = v;
        }
      }
    }

    // If index perfectly evaluates to k, a proper topologically sorted list was found
    if (index === k) {
      return order;
    }

    return null; // Cycle detected
  }

  const rowOrder = topoSort(rowConditions);
  if (!rowOrder) return []; // Impossible to satisfy row conditions

  const colOrder = topoSort(colConditions);
  if (!colOrder) return []; // Impossible to satisfy col conditions

  // Hash maps to store coordinates assigned to elements
  const rowPos = new Int32Array(k + 1);
  const colPos = new Int32Array(k + 1);

  for (let i = 0; i < k; i++) {
    rowPos[rowOrder[i]] = i;
    colPos[colOrder[i]] = i;
  }

  // Matrix construction padded with initial 0s
  const matrix: number[][] = [];
  for (let i = 0; i < k; i++) {
    matrix.push(new Array(k).fill(0));
  }

  // Distribute `1` through `k` securely avoiding intersections due to valid bijection topological mappings
  for (let i = 1; i <= k; i++) {
    matrix[rowPos[i]][colPos[i]] = i;
  }

  return matrix;
}

console.log(buildMatrix(k, rowConditions, colConditions));
