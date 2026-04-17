// 2360. Longest Cycle in a Graph

/**
Example 1:


Input: edges = [3,3,4,2,3]
Output: 3
Explanation: The longest cycle in the graph is the cycle: 2 -> 4 -> 3 -> 2.
The length of this cycle is 3, so 3 is returned.
Example 2:


Input: edges = [2,-1,3,1]
Output: -1
Explanation: There are no cycles in this graph.
*/

function longestCycle(edges: number[]): number {
  const n = edges.length;
  // Tracks the exact "time" step a node was visited
  const timeVisited = new Int32Array(n).fill(0);
  let maxCycle = -1;
  let time = 1;

  for (let i = 0; i < n; i++) {
    // If the node hasn't been visited yet, start a new traversal
    if (timeVisited[i] === 0) {
      const startTime = time;
      let curr = i;

      // Traverse the graph until we hit a dead-end (-1) or an already visited node
      while (curr !== -1 && timeVisited[curr] === 0) {
        timeVisited[curr] = time++;
        curr = edges[curr];
      }

      // If we stopped because we hit a node visited during THIS current traversal, it's a cycle
      if (curr !== -1 && timeVisited[curr] >= startTime) {
        const cycleLength = time - timeVisited[curr];
        maxCycle = Math.max(maxCycle, cycleLength);
      }
    }
  }

  return maxCycle;
}

// ---- TEST CASES ----
const edges1 = [3, 3, 4, 2, 3];
console.log("Example 1:");
console.log("Input:", JSON.stringify(edges1));
console.log("Output:", longestCycle(edges1)); // Expected: 3
console.log("-----------------------");

const edges2 = [2, -1, 3, 1];
console.log("Example 2:");
console.log("Input:", JSON.stringify(edges2));
console.log("Output:", longestCycle(edges2)); // Expected: -1
console.log("-----------------------");
