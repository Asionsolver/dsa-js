// 3651. Minimum Cost Path with Teleportations

/**
Example 1:

Input: grid = [[1,3,3],[2,5,4],[4,3,5]], k = 2

Output: 7

Explanation:

Initially we are at (0, 0) and cost is 0.

Current Position	Move	New Position	Total Cost
(0, 0)	Move Down	(1, 0)	0 + 2 = 2
(1, 0)	Move Right	(1, 1)	2 + 5 = 7
(1, 1)	Teleport to (2, 2)	(2, 2)	7 + 0 = 7
The minimum cost to reach bottom-right cell is 7.

Example 2:

Input: grid = [[1,2],[2,3],[3,4]], k = 1

Output: 9

Explanation:

Initially we are at (0, 0) and cost is 0.

Current Position	Move	New Position	Total Cost
(0, 0)	Move Down	(1, 0)	0 + 2 = 2
(1, 0)	Move Right	(1, 1)	2 + 3 = 5
(1, 1)	Move Down	(2, 1)	5 + 4 = 9
The minimum cost to reach bottom-right cell is 9.
*/

const grid = [
    [1, 3, 3],
    [2, 5, 4],
    [4, 3, 5],
  ],
  k = 2;

const minCost = function (grid: number[][], k: number): number {
  const m = grid.length;
  const n = grid[0].length;
  const MN = m * n;

  // --- 1. Coordinate Compression for Grid Values ---
  // We map every distinct grid value to a rank (0 to numDistinct-1)
  const distinctValues = new Set<number>();
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      distinctValues.add(grid[r][c]);
    }
  }
  const sortedValues = Array.from(distinctValues).sort((a, b) => a - b);
  const valToRank = new Map<number, number>();
  sortedValues.forEach((v, i) => valToRank.set(v, i));
  const numDistinct = sortedValues.length;

  // Precompute cell indices for each rank to allow fast lookup during cascade
  const cellsByRank: number[][] = Array.from({ length: numDistinct }, () => []);
  const gridRanks = new Int32Array(MN);

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      const idx = r * n + c;
      const rank = valToRank.get(grid[r][c])!;
      gridRanks[idx] = rank;
      cellsByRank[rank].push(idx);
    }
  }

  // --- 2. Data Structures for Dijkstra ---
  // dist[node] stores min cost. node ID = layer * MN + (r * n + c)
  const TOTAL_CELLS = (k + 1) * MN;
  const dist = new Int32Array(TOTAL_CELLS).fill(2e9); // 2e9 represents Infinity

  // minPoolDist[layer * numDistinct + rank] stores min cost to access that pool
  const minPoolDist = new Int32Array((k + 1) * numDistinct).fill(2e9);

  // Optimized Binary Heap using flat arrays
  const MAX_HEAP_SIZE = 500000; // Sufficient buffer for states
  const heapNode = new Int32Array(MAX_HEAP_SIZE);
  const heapCost = new Int32Array(MAX_HEAP_SIZE);
  let heapSize = 0;

  function push(node: number, cost: number) {
    if (heapSize >= MAX_HEAP_SIZE) return; // Should not happen given constraints
    heapNode[heapSize] = node;
    heapCost[heapSize] = cost;
    bubbleUp(heapSize++);
  }

  function pop(): { node: number; cost: number } | null {
    if (heapSize === 0) return null;
    const node = heapNode[0];
    const cost = heapCost[0];
    heapSize--;
    if (heapSize > 0) {
      heapNode[0] = heapNode[heapSize];
      heapCost[0] = heapCost[heapSize];
      bubbleDown(0);
    }
    return { node, cost };
  }

  function bubbleUp(idx: number) {
    while (idx > 0) {
      const p = (idx - 1) >>> 1;
      if (heapCost[p] <= heapCost[idx]) break;
      const tn = heapNode[idx],
        tc = heapCost[idx];
      heapNode[idx] = heapNode[p];
      heapCost[idx] = heapCost[p];
      heapNode[p] = tn;
      heapCost[p] = tc;
      idx = p;
    }
  }

  function bubbleDown(idx: number) {
    const half = heapSize >>> 1;
    while (idx < half) {
      let left = (idx << 1) + 1;
      let right = left + 1;
      let best = left;
      if (right < heapSize && heapCost[right] < heapCost[left]) {
        best = right;
      }
      if (heapCost[idx] <= heapCost[best]) break;
      const tn = heapNode[idx],
        tc = heapCost[idx];
      heapNode[idx] = heapNode[best];
      heapCost[idx] = heapCost[best];
      heapNode[best] = tn;
      heapCost[best] = tc;
      idx = best;
    }
  }

  // --- 3. Algorithm Execution ---
  // Initial State: (0, 0) at layer 0 with cost 0
  dist[0] = 0;
  push(0, 0);

  const targetCellIdx = MN - 1; // (m-1, n-1)

  while (heapSize > 0) {
    const item = pop();
    if (!item) break;
    const u = item.node;
    const d = item.cost;

    if (d > dist[u]) continue;

    const layer = (u / MN) | 0;
    const idx = u % MN;

    // Check destination
    if (idx === targetCellIdx) return d;

    const r = (idx / n) | 0;
    const c = idx % n;

    // A. Normal Moves (Right, Down)
    // Move Right
    if (c + 1 < n) {
      const nextIdx = idx + 1;
      const nextNode = u + 1; // same layer
      const nextCost = d + grid[r][c + 1];
      if (nextCost < dist[nextNode]) {
        dist[nextNode] = nextCost;
        push(nextNode, nextCost);
      }
    }
    // Move Down
    if (r + 1 < m) {
      const nextIdx = idx + n;
      const nextNode = u + n; // same layer
      const nextCost = d + grid[r + 1][c];
      if (nextCost < dist[nextNode]) {
        dist[nextNode] = nextCost;
        push(nextNode, nextCost);
      }
    }

    // B. Teleport Moves (Cascade Update)
    if (layer < k) {
      const nextLayer = layer + 1;
      const rank = gridRanks[idx];
      const poolBase = nextLayer * numDistinct;

      // "Cascade" Optimization:
      // If we can teleport to value with 'rank' at cost 'd', we can also teleport
      // to any smaller rank at cost 'd'.
      // We iterate down until we find a rank that is already reachable with cost <= d.

      let currRank = rank;
      while (currRank >= 0) {
        const poolIdx = poolBase + currRank;
        // Optimization: if this rank is already handled with a better/equal cost,
        // then all smaller ranks are also handled. Stop.
        if (minPoolDist[poolIdx] <= d) {
          break;
        }

        minPoolDist[poolIdx] = d;

        // Activate all cells belonging to this rank in the next layer
        // Since teleport cost is 0, they get cost 'd'.
        const cells = cellsByRank[currRank];
        const nextLayerOffset = nextLayer * MN;
        for (let i = 0; i < cells.length; i++) {
          const cellIdx = cells[i];
          const targetNode = nextLayerOffset + cellIdx;
          if (dist[targetNode] > d) {
            dist[targetNode] = d;
            push(targetNode, d);
          }
        }
        currRank--;
      }
    }
  }

  return -1; // Should technically not be reached given problem constraints
};

console.log(minCost(grid, k));
