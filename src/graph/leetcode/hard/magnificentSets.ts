// 2493. Divide Nodes Into the Maximum Number of Groups

/**
Example 1:


Input: n = 6, edges = [[1,2],[1,4],[1,5],[2,6],[2,3],[4,6]]
Output: 4
Explanation: As shown in the image we:
- Add node 5 to the first group.
- Add node 1 to the second group.
- Add nodes 2 and 4 to the third group.
- Add nodes 3 and 6 to the fourth group.
We can see that every edge is satisfied.
It can be shown that that if we create a fifth group and move any node from the third or fourth group to it, at least on of the edges will not be satisfied.
Example 2:

Input: n = 3, edges = [[1,2],[2,3],[3,1]]
Output: -1
Explanation: If we add node 1 to the first group, node 2 to the second group, and node 3 to the third group to satisfy the first two edges, we can see that the third edge will not be satisfied.
It can be shown that no grouping is possible.
*/

const n = 6,
  edges = [
    [1, 2],
    [1, 4],
    [1, 5],
    [2, 6],
    [2, 3],
    [4, 6],
  ];

const magnificentSets = function (n: number, edges: number[][]): number {
  // 1. Build adjacency list
  const adj: number[][] = Array.from({ length: n + 1 }, () => []);
  for (let i = 0; i < edges.length; i++) {
    const u = edges[i][0];
    const v = edges[i][1];
    adj[u].push(v);
    adj[v].push(u);
  }

  const color = new Int8Array(n + 1);
  color.fill(-1);
  const components: number[][] = [];

  // We can preallocate a static queue to maximize performance and avoid dynamic resizing
  const q = new Uint16Array(n);

  // 2. Discover connected components and check if the graph is bipartite
  for (let i = 1; i <= n; i++) {
    if (color[i] === -1) {
      color[i] = 0;
      let head = 0;
      let tail = 0;
      q[tail++] = i;
      const comp: number[] = [];

      while (head < tail) {
        const curr = q[head++];
        comp.push(curr);
        const neighbors = adj[curr];
        for (let j = 0; j < neighbors.length; j++) {
          const neighbor = neighbors[j];
          if (color[neighbor] === -1) {
            color[neighbor] = 1 - color[curr];
            q[tail++] = neighbor;
          } else if (color[neighbor] === color[curr]) {
            // Graph is not bipartite, finding valid grouping is impossible
            return -1;
          }
        }
      }
      components.push(comp);
    }
  }

  let total_groups = 0;

  // Tracking array to mark visited nodes without re-allocating inside the inner loop
  const visited = new Uint16Array(n + 1);
  let visit_id = 0;

  // 3. Find the maximum depth possible for each valid bipartite component
  for (let c = 0; c < components.length; c++) {
    const comp = components[c];
    let max_comp_groups = 0;

    for (let s = 0; s < comp.length; s++) {
      const start_node = comp[s];
      visit_id++;
      visited[start_node] = visit_id;

      let head = 0;
      let tail = 0;
      q[tail++] = start_node;
      let depth = 0;

      // Standard BFS to uncover maximum layers/depth bounds
      while (head < tail) {
        const size = tail - head;
        depth++;
        for (let k = 0; k < size; k++) {
          const curr = q[head++];
          const neighbors = adj[curr];
          for (let j = 0; j < neighbors.length; j++) {
            const neighbor = neighbors[j];
            if (visited[neighbor] !== visit_id) {
              visited[neighbor] = visit_id;
              q[tail++] = neighbor;
            }
          }
        }
      }

      // Track maximum height generated from testing starts
      if (depth > max_comp_groups) {
        max_comp_groups = depth;
      }
    }

    // Unconnected parts are independently additive
    total_groups += max_comp_groups;
  }

  return total_groups;
};

console.log(magnificentSets(n, edges)); // Output: 4
