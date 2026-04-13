// 2467. Most Profitable Path in a Tree

/**
Example 1:


Input: edges = [[0,1],[1,2],[1,3],[3,4]], bob = 3, amount = [-2,4,2,-4,6]
Output: 6
Explanation: 
The above diagram represents the given tree. The game goes as follows:
- Alice is initially on node 0, Bob on node 3. They open the gates of their respective nodes.
  Alice's net income is now -2.
- Both Alice and Bob move to node 1. 
  Since they reach here simultaneously, they open the gate together and share the reward.
  Alice's net income becomes -2 + (4 / 2) = 0.
- Alice moves on to node 3. Since Bob already opened its gate, Alice's income remains unchanged.
  Bob moves on to node 0, and stops moving.
- Alice moves on to node 4 and opens the gate there. Her net income becomes 0 + 6 = 6.
Now, neither Alice nor Bob can make any further moves, and the game ends.
It is not possible for Alice to get a higher net income.
Example 2:


Input: edges = [[0,1]], bob = 1, amount = [-7280,2350]
Output: -7280
Explanation: 
Alice follows the path 0->1 whereas Bob follows the path 1->0.
Thus, Alice opens the gate at node 0 only. Hence, her net income is -7280.
*/

const edges = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 4],
];
const bob = 3;
const amount = [-2, 4, 2, -4, 6];

const mostProfitablePath = (
  edges: number[][],
  bob: number,
  amount: number[],
): number => {
  const n = amount.length;

  // 1. Efficient Flat Graph Representation
  const head = new Int32Array(n).fill(-1);
  const to = new Int32Array((n - 1) * 2);
  const next = new Int32Array((n - 1) * 2);
  let edgeCount = 0;

  function addEdge(u: number, v: number) {
    to[edgeCount] = v;
    next[edgeCount] = head[u];
    head[u] = edgeCount++;
  }

  // Populate the graph limits mapping
  for (let i = 0; i < edges.length; i++) {
    addEdge(edges[i][0], edges[i][1]);
    addEdge(edges[i][1], edges[i][0]);
  }

  // 2. BFS to determine parent structure and node depth (Alice's time of arrival)
  const parent = new Int32Array(n).fill(-1);
  const depth = new Int32Array(n);
  const q = new Int32Array(n);
  let h1 = 0,
    t1 = 0;

  q[t1++] = 0;

  while (h1 < t1) {
    const u = q[h1++];
    for (let e = head[u]; e !== -1; e = next[e]) {
      const v = to[e];
      // If the neighbor is not the node's parent, it behaves as a child
      if (v !== parent[u]) {
        parent[v] = u;
        depth[v] = depth[u] + 1;
        q[t1++] = v;
      }
    }
  }

  // 3. Trace Bob's unique path from 'bob' to '0' while recording the exact time of arrival
  const bob_time = new Int32Array(n).fill(1e9); // Filled with 1e9 acting safely as Infinity
  let curr = bob;
  let time = 0;
  while (curr !== -1) {
    bob_time[curr] = time;
    curr = parent[curr];
    time++;
  }

  // 4. Second BFS for Alice to assess her maximum net income mapping onto leaf nodes
  let max_income = -Infinity;
  let h2 = 0,
    t2 = 0;
  q[t2++] = 0; // reusing Queue 'q' to conserve memory limits

  const income = new Float64Array(n); // Float64Array sidesteps extreme integer issues securely
  income[0] = amount[0]; // Alice will always arrive safely unshared at node 0

  while (h2 < t2) {
    const u = q[h2++];
    let isLeaf = true;

    for (let e = head[u]; e !== -1; e = next[e]) {
      const v = to[e];
      if (v !== parent[u]) {
        isLeaf = false;
        let val = 0;
        const t = depth[v];

        // Comparing overlapping timings seamlessly
        if (t < bob_time[v]) {
          val = amount[v];
        } else if (t === bob_time[v]) {
          val = amount[v] / 2;
        } // If t > bob_time[v], Bob secured it first, val yields safely 0.

        income[v] = income[u] + val;
        q[t2++] = v;
      }
    }

    // Finalize evaluations upon traversing endpoints
    if (isLeaf) {
      if (income[u] > max_income) {
        max_income = income[u];
      }
    }
  }

  return max_income;
};

console.log(mostProfitablePath(edges, bob, amount));
