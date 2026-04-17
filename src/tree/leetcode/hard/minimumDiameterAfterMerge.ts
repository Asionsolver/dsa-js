// 3203. Find Minimum Diameter After Merging Two Trees

/**
Example 1:

Input: edges1 = [[0,1],[0,2],[0,3]], edges2 = [[0,1]]

Output: 3

Explanation:

We can obtain a tree of diameter 3 by connecting node 0 from the first tree with any node from the second tree.

Example 2:


Input: edges1 = [[0,1],[0,2],[0,3],[2,4],[2,5],[3,6],[2,7]], edges2 = [[0,1],[0,2],[0,3],[2,4],[2,5],[3,6],[2,7]]

Output: 5

Explanation:

We can obtain a tree of diameter 5 by connecting node 0 from the first tree with node 0 from the second tree.


*/

const minimumDiameterAfterMerge = function (
  edges1: number[][],
  edges2: number[][],
): number {
  // Helper function to find the diameter of a given tree represented by its edges
  const getDiameter = (edges: number[][]): number => {
    const n = edges.length + 1;
    if (n === 1) return 0; // The diameter of a single-node tree is 0

    // Optimizing graph Adjacency List representations using TypedArrays
    const head = new Int32Array(n).fill(-1);
    const to = new Int32Array(edges.length * 2);
    const next = new Int32Array(edges.length * 2);
    let edgeCnt = 0;

    const addEdge = (u: number, v: number) => {
      to[edgeCnt] = v;
      next[edgeCnt] = head[u];
      head[u] = edgeCnt++;
    };

    for (let i = 0; i < edges.length; i++) {
      addEdge(edges[i][0], edges[i][1]);
      addEdge(edges[i][1], edges[i][0]);
    }

    // Breadth-First Search (BFS) returning [farthest_node, max_distance]
    const bfs = (start: number): [number, number] => {
      const queue = new Int32Array(n);
      let qHead = 0;
      let qTail = 0;
      queue[qTail++] = start;

      let dist = -1;
      let farthestNode = start;

      const visited = new Uint8Array(n);
      visited[start] = 1;

      while (qHead < qTail) {
        const size = qTail - qHead;
        dist++;
        for (let i = 0; i < size; i++) {
          const curr = queue[qHead++];
          farthestNode = curr;

          for (let e = head[curr]; e !== -1; e = next[e]) {
            const neighbor = to[e];
            if (visited[neighbor] === 0) {
              visited[neighbor] = 1;
              queue[qTail++] = neighbor;
            }
          }
        }
      }

      return [farthestNode, dist];
    };

    const [nodeA] = bfs(0); // Step 1: Find the farthest node from arbitrary start 0
    const [, diameter] = bfs(nodeA); // Step 2: Find the diameter path starting from node A

    return diameter;
  };

  // Find diameters of the respective trees
  const d1 = getDiameter(edges1);
  const d2 = getDiameter(edges2);

  // Return the absolute minimum diameter spanning configurations
  return Math.max(d1, d2, Math.ceil(d1 / 2) + Math.ceil(d2 / 2) + 1);
};

// example test case
console.log(
  minimumDiameterAfterMerge(
    [
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    [[0, 1]],
  ),
); // Output: 3
console.log(
  minimumDiameterAfterMerge(
    [
      [0, 1],
      [0, 2],
      [0, 3],
      [2, 4],
      [2, 5],
      [3, 6],
      [2, 7],
    ],
    [
      [0, 1],
      [0, 2],
      [0, 3],
      [2, 4],
      [2, 5],
      [3, 6],
      [2, 7],
    ],
  ),
); // Output: 5
console.log(minimumDiameterAfterMerge([], [])); // Output: 1 (two single-node trees merged together)
console.log(minimumDiameterAfterMerge([[0, 1]], [])); // Output: 2 (one tree with diameter 1 and one single-node tree)
console.log(
  minimumDiameterAfterMerge(
    [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
    [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
  ),
); // Output: 7 (two trees with diameter 3 merged together)
