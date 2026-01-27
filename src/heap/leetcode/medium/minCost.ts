// 3650. Minimum Cost Path with Edge Reversals

/**
Example 1:

Input: n = 4, edges = [[0,1,3],[3,1,1],[2,3,4],[0,2,2]]

Output: 5

Explanation:



Use the path 0 → 1 (cost 3).
At node 1 reverse the original edge 3 → 1 into 1 → 3 and traverse it at cost 2 * 1 = 2.
Total cost is 3 + 2 = 5.
Example 2:

Input: n = 4, edges = [[0,2,1],[2,1,1],[1,3,1],[2,3,3]]

Output: 3

Explanation:

No reversal is needed. Take the path 0 → 2 (cost 1), then 2 → 1 (cost 1), then 1 → 3 (cost 1).
Total cost is 1 + 1 + 1 = 3.

*/

const n = 4,
  edges = [
    [0, 2, 1],
    [2, 1, 1],
    [1, 3, 1],
    [2, 3, 3],
  ];

class MinHeaps<T> {
  private data: T[];
  private compare: (a: T, b: T) => number;

  constructor(compare: (a: T, b: T) => number) {
    this.data = [];
    this.compare = compare;
  }

  push(val: T): void {
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  }

  pop(): T | undefined {
    if (this.data.length === 0) return undefined;
    const top = this.data[0];
    const last = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }
    return top;
  }

  size(): number {
    return this.data.length;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parent = (index - 1) >>> 1;
      if (this.compare(this.data[parent], this.data[index]) <= 0) break;
      [this.data[parent], this.data[index]] = [
        this.data[index],
        this.data[parent],
      ];
      index = parent;
    }
  }

  private bubbleDown(index: number): void {
    const last = this.data.length;
    while (true) {
      const left = (index << 1) + 1;
      const right = left + 1;
      let smallest = index;

      if (
        left < last &&
        this.compare(this.data[left], this.data[smallest]) < 0
      ) {
        smallest = left;
      }
      if (
        right < last &&
        this.compare(this.data[right], this.data[smallest]) < 0
      ) {
        smallest = right;
      }
      if (smallest === index) break;

      [this.data[smallest], this.data[index]] = [
        this.data[index],
        this.data[smallest],
      ];
      index = smallest;
    }
  }
}

const minCostPath = function (n: number, edges: number[][]): number {
  // Adjacency list: adj[u] contains {v, w}
  const adj: { v: number; w: number }[][] = Array.from({ length: n }, () => []);

  for (const [u, v, w] of edges) {
    // Original edge: u -> v with cost w
    adj[u].push({ v, w });
    // Reversed edge: v -> u with cost 2 * w
    adj[v].push({ v: u, w: 2 * w });
  }

  const dist = new Float64Array(n).fill(Infinity);
  dist[0] = 0;

  // Priority Queue stores { cost, u }
  const pq = new MinHeaps<{ cost: number; u: number }>(
    (a, b) => a.cost - b.cost,
  );
  pq.push({ cost: 0, u: 0 });

  while (pq.size() > 0) {
    const { cost, u } = pq.pop()!;

    // Optimization: If current extracted cost is higher than known shortest, skip
    if (cost > dist[u]) continue;

    // If we reached the target
    if (u === n - 1) return cost;

    for (const { v, w } of adj[u]) {
      const newDist = cost + w;
      if (newDist < dist[v]) {
        dist[v] = newDist;
        pq.push({ cost: newDist, u: v });
      }
    }
  }

  return -1;
};

console.log(minCostPath(n, edges));
