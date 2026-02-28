// 1139. Largest 1-Bordered Square

/**
Example 1:

Input: grid = [[1,1,1],[1,0,1],[1,1,1]]
Output: 9
Example 2:

Input: grid = [[1,1,0,0]]
Output: 1

*/

const grid = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

// approach one (good)
const largest1BorderedSquare = function (grid: number[][]): number {
  const m = grid.length;
  if (m === 0) {
    return 0;
  }
  const n = grid[0].length;
  if (n === 0) {
    return 0;
  }

  // Initialize DP tables to store consecutive 1s to the left and up
  // left[i][j] stores the number of consecutive 1s ending at (i, j) to its left
  // up[i][j] stores the number of consecutive 1s ending at (i, j) upwards
  const left: number[][] = Array(m)
    .fill(0)
    .map(() => Array(n).fill(0));
  const up: number[][] = Array(m)
    .fill(0)
    .map(() => Array(n).fill(0));

  let maxSize = 0;

  // Populate left and up DP tables
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        left[i][j] = (j > 0 ? left[i][j - 1] : 0) + 1;
        up[i][j] = (i > 0 ? up[i - 1][j] : 0) + 1;
        maxSize = Math.max(maxSize, 1); // If there's any '1', a 1x1 square exists
      }
    }
  }

  // Iterate through the grid to find the largest 1-bordered square
  // For each cell (i, j), consider it as the bottom-right corner of a potential square
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        // The maximum possible side length of a square ending at (i, j)
        // is limited by the number of consecutive 1s to its left and up.
        const s = Math.min(left[i][j], up[i][j]);

        // Try to form squares of size k, from s down to 1
        for (let k = s; k >= 1; k--) {
          // Check if the top border and left border also have k consecutive 1s
          // top-right corner is (i - k + 1, j)
          // bottom-left corner is (i, j - k + 1)
          if (left[i - k + 1][j] >= k && up[i][j - k + 1] >= k) {
            maxSize = Math.max(maxSize, k);
            break; // Found the largest square ending at (i, j), move to next cell
          }
        }
      }
    }
  }

  return maxSize * maxSize;
};

console.log(largest1BorderedSquare(grid));
