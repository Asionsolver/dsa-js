// 2812. Find the Safest Path in a Grid

/**
Example 1:


Input: grid = [[1,0,0],[0,0,0],[0,0,1]]
Output: 0
Explanation: All paths from (0, 0) to (n - 1, n - 1) go through the thieves in cells (0, 0) and (n - 1, n - 1).
Example 2:


Input: grid = [[0,0,1],[0,0,0],[0,0,0]]
Output: 2
Explanation: The path depicted in the picture above has a safeness factor of 2 since:
- The closest cell of the path to the thief at cell (0, 2) is cell (0, 0). The distance between them is | 0 - 0 | + | 0 - 2 | = 2.
It can be shown that there are no other paths with a higher safeness factor.
Example 3:


Input: grid = [[0,0,0,1],[0,0,0,0],[0,0,0,0],[1,0,0,0]]
Output: 2
Explanation: The path depicted in the picture above has a safeness factor of 2 since:
- The closest cell of the path to the thief at cell (0, 3) is cell (1, 2). The distance between them is | 0 - 1 | + | 3 - 2 | = 2.
- The closest cell of the path to the thief at cell (3, 0) is cell (3, 2). The distance between them is | 3 - 3 | + | 0 - 2 | = 2.
It can be shown that there are no other paths with a higher safeness factor.
 
*/

function maximumSafenessFactor(grid: number[][]): number {
  const n = grid.length;

  // If the starting cell or target cell is a thief, safeness factor is 0
  if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) {
    return 0;
  }

  const dist: number[][] = Array.from({ length: n }, () => Array(n).fill(-1));
  const q = new Int32Array(n * n);
  let head = 0;
  let tail = 0;

  // Initialize multi-source BFS with all thief coordinates
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        dist[r][c] = 0;
        q[tail++] = r * n + c;
      }
    }
  }

  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  // Run BFS to calculate distance from each cell to its nearest thief
  while (head < tail) {
    const curr = q[head++];
    const r = Math.floor(curr / n);
    const c = curr % n;

    for (let i = 0; i < 4; i++) {
      const nr = r + dirs[i][0];
      const nc = c + dirs[i][1];

      if (nr >= 0 && nr < n && nc >= 0 && nc < n && dist[nr][nc] === -1) {
        dist[nr][nc] = dist[r][c] + 1;
        q[tail++] = nr * n + nc;
      }
    }
  }

  // Check function to determine if a path exists with all cell distances >= val
  const canReach = (val: number): boolean => {
    if (dist[0][0] < val || dist[n - 1][n - 1] < val) {
      return false;
    }

    const visited = Array.from({ length: n }, () => new Uint8Array(n));
    const checkQ = new Int32Array(n * n);
    let checkHead = 0;
    let checkTail = 0;

    visited[0][0] = 1;
    checkQ[checkTail++] = 0;

    while (checkHead < checkTail) {
      const curr = checkQ[checkHead++];
      const r = Math.floor(curr / n);
      const c = curr % n;

      if (r === n - 1 && c === n - 1) {
        return true;
      }

      for (let i = 0; i < 4; i++) {
        const nr = r + dirs[i][0];
        const nc = c + dirs[i][1];

        if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
          if (visited[nr][nc] === 0 && dist[nr][nc] >= val) {
            visited[nr][nc] = 1;
            checkQ[checkTail++] = nr * n + nc;
          }
        }
      }
    }

    return false;
  };

  // Binary search for the maximum safeness factor
  let low = 0;
  let high = Math.min(dist[0][0], dist[n - 1][n - 1]);
  let ans = 0;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (canReach(mid)) {
      ans = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return ans;
}

// Example usage:
const grid1 = [
  [1, 0, 0],
  [0, 0, 0],
  [0, 0, 1],
];
console.log(maximumSafenessFactor(grid1)); // Output: 0

const grid2 = [
  [0, 0, 1],
  [0, 0, 0],
  [0, 0, 0],
];
console.log(maximumSafenessFactor(grid2)); // Output: 2

const grid3 = [
  [0, 0, 0, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 0, 0, 0],
];
console.log(maximumSafenessFactor(grid3)); // Output: 2
