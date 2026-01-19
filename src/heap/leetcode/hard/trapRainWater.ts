// 407. Trapping Rain Water II

/**
Example 1:


Input: heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]
Output: 4
Explanation: After the rain, water is trapped between the blocks.
We have two small ponds 1 and 3 units trapped.
The total volume of water trapped is 4.
Example 2:


Input: heightMap = [[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]
Output: 10

**/

const heightMap = [
  [1, 4, 3, 1, 3, 2],
  [3, 2, 1, 3, 2, 4],
  [2, 3, 3, 2, 3, 1],
];

// A minimal MinHeap implementation required since JS/TS doesn't have a built-in one.
class MinHeap<T> {
  private heap: T[];
  private compare: (a: T, b: T) => number;

  constructor(compare: (a: T, b: T) => number) {
    this.heap = [];
    this.compare = compare;
  }

  get size(): number {
    return this.heap.length;
  }

  push(val: T): void {
    this.heap.push(val);
    this._siftUp();
  }

  pop(): T | undefined {
    if (this.size === 0) return undefined;
    const top = this.heap[0];
    const bottom = this.heap.pop();
    if (this.size > 0 && bottom !== undefined) {
      this.heap[0] = bottom;
      this._siftDown();
    }
    return top;
  }

  private _siftUp(): void {
    let nodeIdx = this.heap.length - 1;
    while (nodeIdx > 0) {
      const parentIdx = (nodeIdx - 1) >>> 1;
      if (this.compare(this.heap[nodeIdx], this.heap[parentIdx]) < 0) {
        this._swap(nodeIdx, parentIdx);
        nodeIdx = parentIdx;
      } else {
        break;
      }
    }
  }

  private _siftDown(): void {
    let nodeIdx = 0;
    while ((nodeIdx << 1) + 1 < this.heap.length) {
      const leftChildIdx = (nodeIdx << 1) + 1;
      const rightChildIdx = leftChildIdx + 1;
      let smallerChildIdx = leftChildIdx;

      if (
        rightChildIdx < this.heap.length &&
        this.compare(this.heap[rightChildIdx], this.heap[leftChildIdx]) < 0
      ) {
        smallerChildIdx = rightChildIdx;
      }

      if (this.compare(this.heap[smallerChildIdx], this.heap[nodeIdx]) < 0) {
        this._swap(nodeIdx, smallerChildIdx);
        nodeIdx = smallerChildIdx;
      } else {
        break;
      }
    }
  }

  private _swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}

interface Cell {
  row: number;
  col: number;
  height: number;
}

function trapRainWater(heightMap: number[][]): number {
  const m = heightMap.length;
  const n = heightMap[0].length;

  // Based on physics, we need at least a 3x3 grid to trap water in the center.
  if (m < 3 || n < 3) return 0;

  // MinHeap sorts by height ascending
  const pq = new MinHeap<Cell>((a, b) => a.height - b.height);

  // Visited array to keep track of processed cells
  const visited: boolean[][] = Array.from({ length: m }, () =>
    new Array(n).fill(false),
  );

  // 1. Add all border cells to the Priority Queue
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (r === 0 || r === m - 1 || c === 0 || c === n - 1) {
        pq.push({ row: r, col: c, height: heightMap[r][c] });
        visited[r][c] = true;
      }
    }
  }

  let totalWater = 0;
  const directions = [
    [0, 1], // right
    [0, -1], // left
    [1, 0], // down
    [-1, 0], // up
  ];

  // 2. Process cells starting from the lowest boundary
  while (pq.size > 0) {
    const current = pq.pop()!;

    for (const [dr, dc] of directions) {
      const nr = current.row + dr;
      const nc = current.col + dc;

      // Check bounds and visited status
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
        visited[nr][nc] = true;

        // If the neighbor is lower than the current boundary wall,
        // water fills the difference.
        if (heightMap[nr][nc] < current.height) {
          totalWater += current.height - heightMap[nr][nc];
        }

        // Push the neighbor into PQ.
        // The new height is max(neighbor's actual height, current boundary height)
        // because if it was filled with water, the water surface acts as the new wall.
        pq.push({
          row: nr,
          col: nc,
          height: Math.max(heightMap[nr][nc], current.height),
        });
      }
    }
  }

  return totalWater;
}

console.log(trapRainWater(heightMap));
