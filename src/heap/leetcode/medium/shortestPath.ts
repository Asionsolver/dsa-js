// 3970. Shortest Path With At Most K Consecutive Identical Characters

/**
You are given an integer n representing the number of nodes in a directed weighted graph, numbered from 0 to n - 1. This is represented by a 2D integer array edges, where edges[i] = [ui, vi, wi] represents a directed edge from node ui to node vi with weight wi.

You are also given a string labels of length n, where labels[i] is the character assigned to node i, and an integer k.

Return the minimum total edge weight of a path from node 0 to node n - 1 such that the concatenation of the labels of the nodes along the path contains at most k consecutive identical characters. If no valid path exists, return -1.
*/

/**
Example 1:

Input: n = 3, edges = [[0,1,1],[1,2,1],[0,2,3]], labels = "aab", k = 1

Output: 3

Explanation:

The optimal valid path from node 0 to node 2 is as follows:

Use edges[2] = [0, 2, 3] to reach node 2 with a weight wi = 3.
The corresponding concatenation of labels is "ab", which satisfies at most k = 1 consecutive identical characters. Thus, the answer is 3.
Example 2:

Input: n = 3, edges = [[0,1,1],[1,2,1],[0,2,3]], labels = "aab", k = 2

Output: 2

Explanation:

The optimal valid path from node 0 to node 2 is as follows:

Use edges[0] = [0, 1, 1] to reach node 1 with weight wi = 1.
Use edges[1] = [1, 2, 1] to reach node 2 with weight wi = 1.
The corresponding concatenation of labels is "aab", which satisfies at most k = 2 consecutive identical characters. Thus, the answer is 2.
Example 3:

Input: n = 3, edges = [[0,1,1],[1,2,1]], labels = "aaa", k = 2

Output: -1

Explanation:

There is no valid path from node 0 to node 2 that satisfies at most k = 2 consecutive identical characters. Thus, the answer is -1.

 


*/

/**
Constraints:

1 <= n == labels.length <= 5 * 104
0 <= edges.length <= 5 * 104
edges[i] == [ui, vi, wi]
0 <= ui, vi <= n - 1
ui != vi
1 <= wi <= 104
labels consists of lowercase English letters
1 <= k <= 50

*/

// Brute Force Approach
// function shortestPath(
//   n: number,
//   edges: number[][],
//   labels: string,
//   k: number,
// ): number {
//   // Build adjacency list: node -> array of [neighbor, weight]
//   const adj: [number, number][][] = Array.from({ length: n }, () => []);
//   for (const [u, v, w] of edges) {
//     adj[u].push([v, w]);
//   }

//   let minTotalWeight = Infinity;
//   const visited = new Set<number>();

//   function dfs(u: number, currentWeight: number, currentCount: number): void {
//     // If current weight already exceeds the best found so far, prune.
//     if (currentWeight >= minTotalWeight) return;

//     // If destination is reached, update the minimum weight.
//     if (u === n - 1) {
//       minTotalWeight = currentWeight;
//       return;
//     }

//     visited.add(u);

//     for (const [v, w] of adj[u]) {
//       if (!visited.has(v)) {
//         const nextCount = labels[v] === labels[u] ? currentCount + 1 : 1;

//         // Check if the consecutive constraint is satisfied.
//         if (nextCount <= k) {
//           dfs(v, currentWeight + w, nextCount);
//         }
//       }
//     }

//     // Backtrack to allow other paths to visit this node.
//     visited.delete(u);
//   }

//   // Start DFS from node 0 with consecutive count 1.
//   dfs(0, 0, 1);

//   return minTotalWeight === Infinity ? -1 : minTotalWeight;
// }

// Optimized Approach using Dijkstra's Algorithm with a Min-Heap

// Element structure for the Min-Heap.
interface HeapItem {
  weight: number;
  u: number;
  count: number;
}

// Custom Min-Heap implementation for optimal performance.
class MinHeaps {
  private heap: HeapItem[] = [];

  push(item: HeapItem): void {
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): HeapItem | undefined {
    if (this.heap.length === 0) return undefined;
    const top = this.heap[0];
    const bottom = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = bottom;
      this.bubbleDown(0);
    }
    return top;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = (index - 1) >> 1;
      if (this.heap[index].weight < this.heap[parentIndex].weight) {
        [this.heap[index], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[index],
        ];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  private bubbleDown(index: number): void {
    const length = this.heap.length;
    while (true) {
      let smallest = index;
      const left = (index << 1) + 1;
      const right = (index << 1) + 2;

      if (
        left < length &&
        this.heap[left].weight < this.heap[smallest].weight
      ) {
        smallest = left;
      }
      if (
        right < length &&
        this.heap[right].weight < this.heap[smallest].weight
      ) {
        smallest = right;
      }
      if (smallest !== index) {
        [this.heap[index], this.heap[smallest]] = [
          this.heap[smallest],
          this.heap[index],
        ];
        index = smallest;
      } else {
        break;
      }
    }
  }
}

function shortestPath(
  n: number,
  edges: number[][],
  labels: string,
  k: number,
): number {
  // Base Case: If there is only one node, no edge is traversed.
  if (n === 1) return 0;

  // Build the adjacency list: u -> [v, weight]
  const adj: [number, number][][] = Array.from({ length: n }, () => []);
  for (const [u, v, w] of edges) {
    adj[u].push([v, w]);
  }

  // dist[u][c] stores the minimum weight to reach node u with consecutive count c.
  const dist: number[][] = Array.from({ length: n }, () =>
    new Array(k + 1).fill(Infinity),
  );

  const minHeap = new MinHeaps();

  // Start at node 0 with consecutive count 1 and weight 0.
  dist[0][1] = 0;
  minHeap.push({ weight: 0, u: 0, count: 1 });

  while (!minHeap.isEmpty()) {
    const { weight, u, count } = minHeap.pop()!;

    // The first time destination n - 1 is popped, it is guaranteed optimal.
    if (u === n - 1) {
      return weight;
    }

    // Skip if we have already found a strictly better path to this exact state.
    if (weight > dist[u][count]) {
      continue;
    }

    for (const [v, w] of adj[u]) {
      const isSameChar = labels[v] === labels[u];
      const nextCount = isSameChar ? count + 1 : 1;

      // Only transition if the consecutive count does not exceed k.
      if (nextCount <= k) {
        const newWeight = weight + w;

        // Relaxation step: update distance if new path is cheaper.
        if (newWeight < dist[v][nextCount]) {
          dist[v][nextCount] = newWeight;
          minHeap.push({ weight: newWeight, u: v, count: nextCount });
        }
      }
    }
  }

  // If node n - 1 was never reached under valid conditions.
  return -1;
}

// Example usage:
const n1 = 3;
const edges1 = [
  [0, 1, 1],
  [1, 2, 1],
  [0, 2, 3],
];
const labels1 = "aab";
const k1 = 1;
console.log(shortestPath(n1, edges1, labels1, k1)); // Output: 3

const n2 = 3;
const edges2 = [
  [0, 1, 1],
  [1, 2, 1],
  [0, 2, 3],
];
const labels2 = "aab";
const k2 = 2;
console.log(shortestPath(n2, edges2, labels2, k2)); // Output: 2

const n3 = 3;
const edges3 = [
  [0, 1, 1],
  [1, 2, 1],
];
const labels3 = "aaa";
const k3 = 2;
console.log(shortestPath(n3, edges3, labels3, k3)); // Output: -1
