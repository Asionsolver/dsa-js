// 3620. Network Recovery Pathways

/**
Example 1:

Input: edges = [[0,1,5],[1,3,10],[0,2,3],[2,3,4]], online = [true,true,true,true], k = 10

Output: 3

Explanation:



The graph has two possible routes from node 0 to node 3:

Path 0 → 1 → 3

Total cost = 5 + 10 = 15, which exceeds k (15 > 10), so this path is invalid.

Path 0 → 2 → 3

Total cost = 3 + 4 = 7 <= k, so this path is valid.

The minimum edge‐cost along this path is min(3, 4) = 3.

There are no other valid paths. Hence, the maximum among all valid path‐scores is 3.

Example 2:

Input: edges = [[0,1,7],[1,4,5],[0,2,6],[2,3,6],[3,4,2],[2,4,6]], online = [true,true,true,false,true], k = 12

Output: 6

Explanation:



Node 3 is offline, so any path passing through 3 is invalid.

Consider the remaining routes from 0 to 4:

Path 0 → 1 → 4

Total cost = 7 + 5 = 12 <= k, so this path is valid.

The minimum edge‐cost along this path is min(7, 5) = 5.

Path 0 → 2 → 3 → 4

Node 3 is offline, so this path is invalid regardless of cost.

Path 0 → 2 → 4

Total cost = 6 + 6 = 12 <= k, so this path is valid.

The minimum edge‐cost along this path is min(6, 6) = 6.

Among the two valid paths, their scores are 5 and 6. Therefore, the answer is 6.


*/

function findMaxPathScore(
  edges: number[][],
  online: boolean[],
  k: number,
): number {
  const n = online.length;

  // 1. Build adjacency list using parallel arrays for high performance and low GC overhead
  const adjNodes: number[][] = Array.from({ length: n }, () => []);
  const adjCosts: number[][] = Array.from({ length: n }, () => []);
  const uniqueCostsSet = new Set<number>();

  for (let i = 0; i < edges.length; i++) {
    const u = edges[i][0];
    const v = edges[i][1];
    const cost = edges[i][2];
    adjNodes[u].push(v);
    adjCosts[u].push(cost);
    uniqueCostsSet.add(cost);
  }

  const uniqueCosts = Array.from(uniqueCostsSet).sort((a, b) => a - b);

  // 2. Precompute the topological sort of the DAG using Kahn's algorithm
  const inDegree = new Array(n).fill(0);
  for (let u = 0; u < n; u++) {
    const nextNodes = adjNodes[u];
    const len = nextNodes.length;
    for (let i = 0; i < len; i++) {
      inDegree[nextNodes[i]]++;
    }
  }

  const queue: number[] = [];
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  const topo: number[] = [];
  let head = 0;
  while (head < queue.length) {
    const u = queue[head++];
    topo.push(u);
    const nextNodes = adjNodes[u];
    const len = nextNodes.length;
    for (let i = 0; i < len; i++) {
      const v = nextNodes[i];
      inDegree[v]--;
      if (inDegree[v] === 0) {
        queue.push(v);
      }
    }
  }

  // Pre-allocate the distance array once to reuse across check operations
  const dist = new Array(n);

  // Helper function to check if a minimum edge cost of X is achievable
  function check(X: number): boolean {
    dist.fill(Infinity);
    dist[0] = 0;

    const topoLen = topo.length;
    for (let i = 0; i < topoLen; i++) {
      const u = topo[i];
      // If the node is unreachable or offline, we cannot pass through it
      if (dist[u] === Infinity || !online[u]) {
        continue;
      }

      const nextNodes = adjNodes[u];
      const nextCosts = adjCosts[u];
      const len = nextNodes.length;
      for (let j = 0; j < len; j++) {
        const v = nextNodes[j];
        const cost = nextCosts[j];
        // We only traverse edges with a cost of at least X, and target nodes that are online
        if (cost >= X && online[v]) {
          const d = dist[u] + cost;
          if (d < dist[v]) {
            dist[v] = d;
          }
        }
      }
    }

    return dist[n - 1] <= k;
  }

  // 3. Binary search on the sorted unique edge costs
  let low = 0;
  let high = uniqueCosts.length - 1;
  let ans = -1;

  while (low <= high) {
    const mid = (low + high) >> 1;
    if (check(uniqueCosts[mid])) {
      ans = uniqueCosts[mid];
      low = mid + 1; // Try to find a larger minimum edge cost
    } else {
      high = mid - 1; // Decrease the target score
    }
  }

  return ans;
}

// Example usage:
const edges1 = [
  [0, 1, 5],
  [1, 3, 10],
  [0, 2, 3],
  [2, 3, 4],
];
const online1 = [true, true, true, true];
const k1 = 10;
console.log(findMaxPathScore(edges1, online1, k1)); // Output: 3

const edges2 = [
  [0, 1, 7],
  [1, 4, 5],
  [0, 2, 6],
  [2, 3, 6],
  [3, 4, 2],
  [2, 4, 6],
];
const online2 = [true, true, true, false, true];
const k2 = 12;
console.log(findMaxPathScore(edges2, online2, k2)); // Output: 6
