// 2685. Count the Number of Complete Components

/**
Example 1:



Input: n = 6, edges = [[0,1],[0,2],[1,2],[3,4]]
Output: 3
Explanation: From the picture above, one can see that all of the components of this graph are complete.
Example 2:



Input: n = 6, edges = [[0,1],[0,2],[1,2],[3,4],[3,5]]
Output: 1
Explanation: The component containing vertices 0, 1, and 2 is complete since there is an edge between every pair of two vertices. On the other hand, the component containing vertices 3, 4, and 5 is not complete since there is no edge between vertices 4 and 5. Thus, the number of complete components in this graph is 1.
*/

function countCompleteComponents(n: number, edges: number[][]): number {
  // Step 1: Build the adjacency list
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const visited = new Uint8Array(n);
  let completeComponentsCount = 0;

  // Step 2: Traverse each component
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      let vertexCount = 0;
      let edgeCount = 0;

      const dfs = (u: number): void => {
        visited[u] = 1;
        vertexCount++;
        edgeCount += adj[u].length; // Add degree of current vertex

        for (const v of adj[u]) {
          if (!visited[v]) {
            dfs(v);
          }
        }
      };

      dfs(i);

      // Step 3: Check if the component is complete
      if (edgeCount === vertexCount * (vertexCount - 1)) {
        completeComponentsCount++;
      }
    }
  }

  return completeComponentsCount;
}

// Example usage:
const n1 = 6;
const edges1 = [
  [0, 1],
  [0, 2],
  [1, 2],
  [3, 4],
];
console.log(countCompleteComponents(n1, edges1)); // Output: 3

const n2 = 6;
const edges2 = [
  [0, 1],
  [0, 2],
  [1, 2],
  [3, 4],
  [3, 5],
];
console.log(countCompleteComponents(n2, edges2)); // Output: 1
