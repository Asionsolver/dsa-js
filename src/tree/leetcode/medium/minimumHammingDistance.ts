// 1722. Minimize Hamming Distance After Swap Operations

/**
Example 1:

Input: source = [1,2,3,4], target = [2,1,4,5], allowedSwaps = [[0,1],[2,3]]
Output: 1
Explanation: source can be transformed the following way:
- Swap indices 0 and 1: source = [2,1,3,4]
- Swap indices 2 and 3: source = [2,1,4,3]
The Hamming distance of source and target is 1 as they differ in 1 position: index 3.
Example 2:

Input: source = [1,2,3,4], target = [1,3,2,4], allowedSwaps = []
Output: 2
Explanation: There are no allowed swaps.
The Hamming distance of source and target is 2 as they differ in 2 positions: index 1 and index 2.
Example 3:

Input: source = [5,1,2,4,3], target = [1,5,4,2,3], allowedSwaps = [[0,4],[4,2],[1,3],[1,4]]
Output: 0

*/

const minimumHammingDistance = (
  source: number[],
  target: number[],
  allowedSwaps: number[][],
): number => {
  const n = source.length;

  // Union-Find data structures
  const parent = new Int32Array(n);
  const rank = new Int8Array(n);

  for (let i = 0; i < n; i++) {
    parent[i] = i;
  }

  // Find operation with path compression
  function find(i: number): number {
    let root = i;
    while (parent[root] !== root) {
      root = parent[root];
    }
    let curr = i;
    while (curr !== root) {
      let nxt = parent[curr];
      parent[curr] = root;
      curr = nxt;
    }
    return root;
  }

  // Union operation by rank
  function union(i: number, j: number): void {
    const rootI = find(i);
    const rootJ = find(j);
    if (rootI !== rootJ) {
      if (rank[rootI] < rank[rootJ]) {
        parent[rootI] = rootJ;
      } else if (rank[rootI] > rank[rootJ]) {
        parent[rootJ] = rootI;
      } else {
        parent[rootI] = rootJ;
        rank[rootJ]++;
      }
    }
  }

  // Group the indices that can be swapped directly or transitively
  for (let i = 0; i < allowedSwaps.length; i++) {
    union(allowedSwaps[i][0], allowedSwaps[i][1]);
  }

  // Maps net occurrences per root parent
  const componentCounts = new Array<Map<number, number>>(n);

  for (let i = 0; i < n; i++) {
    const root = find(i);
    if (!componentCounts[root]) {
      componentCounts[root] = new Map<number, number>();
    }
    const countMap = componentCounts[root];

    const sVal = source[i];
    const tVal = target[i];

    // Increase representation requirements mapping from `source`
    countMap.set(sVal, (countMap.get(sVal) || 0) + 1);

    // Decrease representation requirements mapping to `target`
    countMap.set(tVal, (countMap.get(tVal) || 0) - 1);
  }

  let minHammingDist = 0;

  // Tally over all positive leftover elements without respective matches
  for (let i = 0; i < n; i++) {
    const countMap = componentCounts[i];
    if (countMap) {
      for (const count of countMap.values()) {
        if (count > 0) {
          minHammingDist += count;
        }
      }
    }
  }

  return minHammingDist;
};

// Example usage:
const source = [1, 2, 3, 4];
const target = [2, 1, 4, 5];
const allowedSwaps = [
  [0, 1],
  [2, 3],
];
console.log(minimumHammingDistance(source, target, allowedSwaps)); // Output: 1
