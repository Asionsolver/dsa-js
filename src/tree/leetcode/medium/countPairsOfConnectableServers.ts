// 3067. Count Pairs of Connectable Servers in a Weighted Tree Network

/**
Example 1:


Input: edges = [[0,1,1],[1,2,5],[2,3,13],[3,4,9],[4,5,2]], signalSpeed = 1
Output: [0,4,6,6,4,0]
Explanation: Since signalSpeed is 1, count[c] is equal to the number of pairs of paths that start at c and do not share any edges.
In the case of the given path graph, count[c] is equal to the number of servers to the left of c multiplied by the servers to the right of c.
Example 2:


Input: edges = [[0,6,3],[6,5,3],[0,3,1],[3,2,7],[3,1,6],[3,4,2]], signalSpeed = 3
Output: [2,0,0,0,0,0,2]
Explanation: Through server 0, there are 2 pairs of connectable servers: (4, 5) and (4, 6).
Through server 6, there are 2 pairs of connectable servers: (4, 5) and (0, 5).
It can be shown that no two servers are connectable through servers other than 0 and 6.
*/

const edges = [
    [0, 6, 3],
    [6, 5, 3],
    [0, 3, 1],
    [3, 2, 7],
    [3, 1, 6],
    [3, 4, 2],
  ],
  signalSpeed = 3;

const countPairsOfConnectableServers = function (
  edges: number[][],
  signalSpeed: number,
): number[] {
  const n = edges.length + 1;
  // Build the adjacency list for the tree
  const graph: Array<Array<{ to: number; weight: number }>> = Array.from(
    { length: n },
    () => [],
  );

  for (const [u, v, w] of edges) {
    graph[u].push({ to: v, weight: w });
    graph[v].push({ to: u, weight: w });
  }

  const result: number[] = new Array(n).fill(0);

  // Calculate connectable pairs for each server 'c'
  for (let c = 0; c < n; c++) {
    let pairs = 0;
    let runningSum = 0;

    // Explore each distinct branch originating from 'c'
    for (const neighbor of graph[c]) {
      let branchCount = 0;

      // DFS to count nodes in the current branch with valid distances
      const dfs = (node: number, parent: number, currentDist: number) => {
        if (currentDist % signalSpeed === 0) {
          branchCount++;
        }
        for (const next of graph[node]) {
          if (next.to !== parent) {
            dfs(next.to, node, currentDist + next.weight);
          }
        }
      };

      // Start DFS from the neighbor
      dfs(neighbor.to, c, neighbor.weight);

      // Multiply counts of current branch with the valid nodes previously encountered
      pairs += runningSum * branchCount;
      // Update the pool of encountered valid nodes
      runningSum += branchCount;
    }

    result[c] = pairs;
  }

  return result;
};

console.log(countPairsOfConnectableServers(edges, signalSpeed));
