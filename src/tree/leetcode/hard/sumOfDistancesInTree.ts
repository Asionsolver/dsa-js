// 834. Sum of Distances in Tree
/**
Example 1:


Input: n = 6, edges = [[0,1],[0,2],[2,3],[2,4],[2,5]]
Output: [8,12,6,10,10,10]
Explanation: The tree is shown above.
We can see that dist(0,1) + dist(0,2) + dist(0,3) + dist(0,4) + dist(0,5)
equals 1 + 1 + 2 + 2 + 2 = 8.
Hence, answer[0] = 8, and so on.
Example 2:


Input: n = 1, edges = []
Output: [0]
Example 3:


Input: n = 2, edges = [[1,0]]
Output: [1,1]

*/
// ==========================================
// Part 1: The LeetCode Solution
// ==========================================

function sumOfDistancesInTree(n: number, edges: number[][]): number[] {
  const graph: number[][] = Array.from({ length: n }, () => []);

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const count: number[] = new Array(n).fill(1);
  const ans: number[] = new Array(n).fill(0);

  function dfs1(node: number, parent: number): void {
    for (const child of graph[node]) {
      if (child === parent) continue;
      dfs1(child, node);
      count[node] += count[child];
      ans[node] += ans[child] + count[child];
    }
  }

  function dfs2(node: number, parent: number): void {
    for (const child of graph[node]) {
      if (child === parent) continue;
      ans[child] = ans[node] + (n - count[child]) - count[child];
      dfs2(child, node);
    }
  }

  dfs1(0, -1);
  dfs2(0, -1);

  return ans;
}

// ==========================================
// Part 2: Local Testing (Driver Code)
// ==========================================

function runTest(n: number, edges: number[][], expected?: number[]) {
  console.log("--------------------------------------------------");
  console.log(`Input: n = ${n}, edges = ${JSON.stringify(edges)}`);

  const start = performance.now();
  const result = sumOfDistancesInTree(n, edges);
  const end = performance.now();

  console.log(`Output:   ${JSON.stringify(result)}`);

  if (expected) {
    const passed = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`Expected: ${JSON.stringify(expected)}`);
    console.log(`Status:   ${passed ? "✅ PASS" : "❌ FAIL"}`);
  }
  console.log(`Time:     ${(end - start).toFixed(4)}ms`);
}

// Example 1
runTest(
  6,
  [
    [0, 1],
    [0, 2],
    [2, 3],
    [2, 4],
    [2, 5],
  ],
  [8, 12, 6, 10, 10, 10]
);

// Example 2
runTest(1, [], [0]);

// Example 3
runTest(2, [[1, 0]], [1, 1]);
