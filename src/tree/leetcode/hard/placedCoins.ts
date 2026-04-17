// 2973. Find Number of Coins to Place in Tree Nodes

/**
Example 1:


Input: edges = [[0,1],[0,2],[0,3],[0,4],[0,5]], cost = [1,2,3,4,5,6]
Output: [120,1,1,1,1,1]
Explanation: For node 0 place 6 * 5 * 4 = 120 coins. All other nodes are leaves with subtree of size 1, place 1 coin on each of them.
Example 2:


Input: edges = [[0,1],[0,2],[1,3],[1,4],[1,5],[2,6],[2,7],[2,8]], cost = [1,4,2,3,5,7,8,-4,2]
Output: [280,140,32,1,1,1,1,1,1]
Explanation: The coins placed on each node are:
- Place 8 * 7 * 5 = 280 coins on node 0.
- Place 7 * 5 * 4 = 140 coins on node 1.
- Place 8 * 2 * 2 = 32 coins on node 2.
- All other nodes are leaves with subtree of size 1, place 1 coin on each of them.
Example 3:


Input: edges = [[0,1],[0,2]], cost = [1,2,-2]
Output: [0,1,1]
Explanation: Node 1 and 2 are leaves with subtree of size 1, place 1 coin on each of them. For node 0 the only possible product of cost is 2 * 1 * -2 = -4. Hence place 0 coins on node 0.
*/
// BFS + Top to Bottom
// const placedCoins = function (edges: number[][], cost: number[]): number[] {
//   const n = cost.length;
//   const adj: number[][] = Array.from({ length: n }, () => []);

//   // Build the adjacency list for the undirected tree
//   for (let i = 0; i < edges.length; i++) {
//     const u = edges[i][0];
//     const v = edges[i][1];
//     adj[u].push(v);
//     adj[v].push(u);
//   }

//   const parent = new Int32Array(n);
//   parent.fill(-1);
//   const order = new Int32Array(n);
//   let head = 0;
//   let tail = 0;

//   order[tail++] = 0; // Root is 0
//   const visited = new Uint8Array(n);
//   visited[0] = 1;

//   // BFS to find tree structure and proper bottom-up evaluation order
//   while (head < tail) {
//     const u = order[head++];
//     const neighbors = adj[u];
//     for (let i = 0; i < neighbors.length; i++) {
//       const v = neighbors[i];
//       if (visited[v] === 0) {
//         visited[v] = 1;
//         parent[v] = u;
//         order[tail++] = v;
//       }
//     }
//   }

//   const coins = new Array(n).fill(0);
//   const counts = new Int32Array(n);
//   counts.fill(1); // At minimum, a subtree holds its own root node
//   const elements: number[][] = Array.from({ length: n }, (_, i) => [cost[i]]);

//   // Process nodes bottom-up (Reverse BFS order)
//   for (let i = n - 1; i >= 0; i--) {
//     const u = order[i];
//     let el = elements[u];

//     // Sort the current available elements and retain only at most 5 elements
//     // (2 smallest numbers + 3 largest numbers).
//     el.sort((a, b) => a - b);
//     if (el.length > 5) {
//       el = [
//         el[0],
//         el[1],
//         el[el.length - 3],
//         el[el.length - 2],
//         el[el.length - 1],
//       ];
//       elements[u] = el;
//     }

//     if (counts[u] < 3) {
//       coins[u] = 1; // Base case: Less than 3 nodes
//     } else {
//       const k = el.length;
//       // The maximum product can arise from the top 3 positive or the bottom 2 negatives * top 1 positive
//       const cand1 = el[k - 1] * el[k - 2] * el[k - 3];
//       const cand2 = el[0] * el[1] * el[k - 1];
//       coins[u] = Math.max(0, cand1, cand2);
//     }

//     // Push evaluations upwards to the parent node
//     const p = parent[u];
//     if (p !== -1) {
//       counts[p] += counts[u];
//       const pel = elements[p];
//       for (let j = 0; j < el.length; j++) {
//         pel.push(el[j]);
//       }
//     }
//   }

//   return coins;
// };

// BFS + Bottom to Top
function placedCoins(edges: number[][], cost: number[]): number[] {
  const n = cost.length;
  const adj: number[][] = Array.from({ length: n }, () => []);

  // Build adjacency list
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const parent: number[] = new Array(n).fill(-1);
  const order: number[] = [];
  const queue: number[] = [0];
  let head = 0;

  // BFS to find parent connections and topological process order
  while (head < queue.length) {
    const u = queue[head++];
    order.push(u);
    for (const v of adj[u]) {
      if (v !== parent[u]) {
        parent[v] = u;
        queue.push(v);
      }
    }
  }

  // Reverse the order to get a bottom-up traversal (leaves to root)
  order.reverse();

  const sizes: number[] = new Array(n).fill(1);
  const subtree_costs: number[][] = Array.from({ length: n }, (_, i) => [
    cost[i],
  ]);
  const ans: number[] = new Array(n).fill(0);

  for (const u of order) {
    let costs = subtree_costs[u];
    costs.sort((a, b) => a - b);

    // Base case: if subtree size is less than 3
    if (sizes[u] < 3) {
      ans[u] = 1;
    } else {
      const m = costs.length;
      // Option 1: Product of the 3 largest elements
      const p1 = costs[m - 1] * costs[m - 2] * costs[m - 3];
      // Option 2: Product of the 2 smallest elements and the largest element
      const p2 = costs[0] * costs[1] * costs[m - 1];

      ans[u] = Math.max(0, p1, p2);
    }

    const p = parent[u];
    if (p !== -1) {
      sizes[p] += sizes[u];
      subtree_costs[p].push(...costs);
      subtree_costs[p].sort((a, b) => a - b);

      // Prune the array to keep at most the 2 smallest and 3 largest elements
      if (subtree_costs[p].length > 5) {
        const len = subtree_costs[p].length;
        subtree_costs[p] = [
          subtree_costs[p][0],
          subtree_costs[p][1],
          subtree_costs[p][len - 3],
          subtree_costs[p][len - 2],
          subtree_costs[p][len - 1],
        ];
      }
    }
  }

  return ans;
}
//! Test cases
console.log(
  placedCoins(
    [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
    ],
    [1, 2, 3, 4, 5, 6],
  ),
); // [120,1,1,1,1,1]
console.log(
  placedCoins(
    [
      [0, 1],
      [0, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [2, 6],
      [2, 7],
      [2, 8],
    ],
    [1, 4, 2, 3, 5, 7, 8, -4, 2],
  ),
); // [280,140,32,1,1,1,1,1,1]
console.log(
  placedCoins(
    [
      [0, 1],
      [0, 2],
    ],
    [1, 2, -2],
  ),
); // [0,1,1]
