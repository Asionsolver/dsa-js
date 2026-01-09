// 3241. Time Taken to Mark All Nodes

/**
Example 1:

Input: edges = [[0,1],[0,2]]

Output: [2,4,3]

Explanation:



For i = 0:
Node 1 is marked at t = 1, and Node 2 at t = 2.
For i = 1:
Node 0 is marked at t = 2, and Node 2 at t = 4.
For i = 2:
Node 0 is marked at t = 2, and Node 1 at t = 3.
Example 2:

Input: edges = [[0,1]]

Output: [1,2]

Explanation:



For i = 0:
Node 1 is marked at t = 1.
For i = 1:
Node 0 is marked at t = 2.
Example 3:

Input: edges = [[2,4],[0,1],[2,3],[0,2]]

Output: [4,6,3,5,5]

Explanation:


*/

function timeTaken(edges: number[][]): number[] {
  const n = edges.length + 1;
  const adj: number[][] = Array.from({ length: n }, () => []);

  // Build Adjacency List
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  // dp[i] stores [max_dist, second_max_dist] for the subtree rooted at i
  // max_dist: The longest path starting at i and going down into its descendants
  const dp: [number, number][] = Array.from({ length: n }, () => [0, 0]);

  // Helper to get weight of edge entering a specific node
  // If we move TO `node`, check its parity.
  const getWeight = (node: number): number => (node % 2 === 1 ? 1 : 2);

  // 1. First Pass (Bottom-Up): Calculate subtree distances
  const dfs1 = (u: number, p: number): void => {
    let max1 = 0;
    let max2 = 0;

    for (const v of adj[u]) {
      if (v === p) continue;

      dfs1(v, u);

      // Calculate distance from u -> v -> (deepest node in v's subtree)
      const d = dp[v][0] + getWeight(v);

      // Update top 2 longest paths
      if (d > max1) {
        max2 = max1;
        max1 = d;
      } else if (d > max2) {
        max2 = d;
      }
    }
    dp[u] = [max1, max2];
  };

  const ans: number[] = new Array(n).fill(0);

  // 2. Second Pass (Top-Down): Re-rooting to calculate full tree distances
  // upDist: The maximum distance starting from u going UP towards parent p
  const dfs2 = (u: number, p: number, upDist: number): void => {
    // The answer for node u is the max of extending down or extending up
    ans[u] = Math.max(dp[u][0], upDist);

    for (const v of adj[u]) {
      if (v === p) continue;

      const w_uv = getWeight(v); // Weight to go u -> v
      const w_vu = getWeight(u); // Weight to go v -> u

      // We need to find the longest path starting from u that DOES NOT go through v.
      // Candidates:
      // 1. The path coming from above u (upDist)
      // 2. The path going down from u into other children (siblings of v)

      let maxFromUExcludingV = upDist;

      // Check if child v is the one contributing to u's longest subtree path
      if (dp[v][0] + w_uv === dp[u][0]) {
        // v is on the critical path, so we use u's second longest path
        maxFromUExcludingV = Math.max(maxFromUExcludingV, dp[u][1]);
      } else {
        // v is not on the critical path, so we can use u's longest path
        maxFromUExcludingV = Math.max(maxFromUExcludingV, dp[u][0]);
      }

      // Move to child v: add cost to travel from v to u
      dfs2(v, u, maxFromUExcludingV + w_vu);
    }
  };

  // Run the two passes
  dfs1(0, -1);
  dfs2(0, -1, 0);

  return ans;
}

// --- Local Test Runner ---

const testCases = [
  {
    edges: [
      [0, 1],
      [0, 2],
    ],
    expected: [2, 4, 3],
  },
  {
    edges: [[0, 1]],
    expected: [1, 2],
  },
  {
    edges: [
      [2, 4],
      [0, 1],
      [2, 3],
      [0, 2],
    ],
    expected: [4, 6, 3, 5, 5],
  },
];

console.log("Running Test Cases...\n");

testCases.forEach((test, index) => {
  const result = timeTaken(test.edges);
  const passed = JSON.stringify(result) === JSON.stringify(test.expected);

  console.log(`Test Case ${index + 1}:`);
  console.log(`Input: ${JSON.stringify(test.edges)}`);
  console.log(`Expected: ${JSON.stringify(test.expected)}`);
  console.log(`Got:      ${JSON.stringify(result)}`);
  console.log(`Status:   ${passed ? "✅ PASS" : "❌ FAIL"}`);
  console.log("-".repeat(30));
});
