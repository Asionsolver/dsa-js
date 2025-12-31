// 1970. Last Day Where You Can Still Cross

/**
Example 1:


Input: row = 2, col = 2, cells = [[1,1],[2,1],[1,2],[2,2]]
Output: 2
Explanation: The above image depicts how the matrix changes each day starting from day 0.
The last day where it is possible to cross from top to bottom is on day 2.
Example 2:


Input: row = 2, col = 2, cells = [[1,1],[1,2],[2,1],[2,2]]
Output: 1
Explanation: The above image depicts how the matrix changes each day starting from day 0.
The last day where it is possible to cross from top to bottom is on day 1.
Example 3:


Input: row = 3, col = 3, cells = [[1,2],[2,1],[3,3],[2,2],[1,1],[1,3],[2,3],[3,2],[3,1]]
Output: 3
Explanation: The above image depicts how the matrix changes each day starting from day 0.
The last day where it is possible to cross from top to bottom is on day 3.
*/

const row = 2,
  col = 2,
  cells = [
    [1, 1],
    [2, 1],
    [1, 2],
    [2, 2],
  ];

const latestDayToCross = function (
  row: number,
  col: number,
  cells: number[][]
): number {
  let left = 1;
  let right = cells.length;
  let ans = 0;

  // Binary Search for the last possible day
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (canCross(row, col, mid, cells)) {
      ans = mid; // If we can cross, try a later day
      left = mid + 1;
    } else {
      right = mid - 1; // If we can't, look for an earlier day
    }
  }

  return ans;
};

const canCross = function (
  row: number,
  col: number,
  day: number,
  cells: number[][]
): boolean {
  // 0 = land, 1 = water, 2 = visited
  // Initialize grid with 0 (land)
  const grid = new Array(row).fill(0).map(() => new Int8Array(col).fill(0));

  // Mark water cells for the current day limit
  // Note: 'day' implies 1-based count, so we take indices 0 to day-1
  for (let i = 0; i < day; i++) {
    const [r, c] = cells[i];
    grid[r - 1][c - 1] = 1; // Convert 1-based input to 0-based index
  }

  // BFS Queue: stores [r, c]
  // Using a pointer 'head' avoids O(N) shift operation on arrays
  const queue: [number, number][] = [];

  // Add all valid starting points (land cells in the top row)
  for (let c = 0; c < col; c++) {
    if (grid[0][c] === 0) {
      queue.push([0, c]);
      grid[0][c] = 2; // Mark as visited
    }
  }

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  let head = 0;

  while (head < queue.length) {
    const [r, c] = queue[head++]; // Dequeue

    // If we reached the bottom row
    if (r === row - 1) {
      return true;
    }

    // Check neighbors
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      // Check bounds and if cell is Land (0)
      if (nr >= 0 && nr < row && nc >= 0 && nc < col && grid[nr][nc] === 0) {
        grid[nr][nc] = 2; // Mark visited
        queue.push([nr, nc]);
      }
    }
  }

  return false;
};

console.log(latestDayToCross(row, col, cells));
