// 3548. Equal Sum Grid Partition II

/**
Example 1:

Input: grid = [[1,4],[2,3]]

Output: true

Explanation:



A horizontal cut after the first row gives sums 1 + 4 = 5 and 2 + 3 = 5, which are equal. Thus, the answer is true.
Example 2:

Input: grid = [[1,2],[3,4]]

Output: true

Explanation:



A vertical cut after the first column gives sums 1 + 3 = 4 and 2 + 4 = 6.
By discounting 2 from the right section (6 - 2 = 4), both sections have equal sums and remain connected. Thus, the answer is true.
Example 3:

Input: grid = [[1,2,4],[2,3,5]]

Output: false

Explanation:



A horizontal cut after the first row gives 1 + 2 + 4 = 7 and 2 + 3 + 5 = 10.
By discounting 3 from the bottom section (10 - 3 = 7), both sections have equal sums, but they do not remain connected as it splits the bottom section into two parts ([2] and [5]). Thus, the answer is false.
Example 4:

Input: grid = [[4,1,8],[3,2,6]]

Output: false

Explanation:

No valid cut exists, so the answer is false.
*/

const grid = [
  [1, 4],
  [2, 3],
];
function canPartition(grid: number[][]): boolean {
  const m = grid.length;
  const n = grid[0].length;

  // The given constraint verifies that grid values are up to 10^5
  const MAX_VAL = 100000;

  // Arrays to track the minimum and maximum row & column indices for each value presence
  const minRow = new Int32Array(MAX_VAL + 1).fill(1e9);
  const maxRow = new Int32Array(MAX_VAL + 1).fill(-1e9);
  const minCol = new Int32Array(MAX_VAL + 1).fill(1e9);
  const maxCol = new Int32Array(MAX_VAL + 1).fill(-1e9);

  let totalSum = 0;
  const rowSum = new Float64Array(m);
  const colSum = new Float64Array(n);

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      const v = grid[r][c];
      totalSum += v;
      rowSum[r] += v;
      colSum[c] += v;

      if (v <= MAX_VAL) {
        if (r < minRow[v]) minRow[v] = r;
        if (r > maxRow[v]) maxRow[v] = r;
        if (c < minCol[v]) minCol[v] = c;
        if (c > maxCol[v]) maxCol[v] = c;
      }
    }
  }

  // 1. Check all valid Horizontal Cuts
  let currentSum = 0;
  for (let i = 0; i < m - 1; i++) {
    currentSum += rowSum[i];
    const S_top = currentSum;
    const S_bot = totalSum - currentSum;
    const D = Math.abs(S_top - S_bot);

    if (D === 0) return true;
    if (D > MAX_VAL) continue; // Cell equivalent to difference doesn't exist

    if (S_top > S_bot) {
      // Check if we can discount D from the Top Section
      const R_top = i + 1;
      if (n === 1) {
        if (grid[0][0] === D || grid[i][0] === D) return true;
      } else {
        if (R_top === 1) {
          if (grid[0][0] === D || grid[0][n - 1] === D) return true;
        } else {
          if (minRow[D] <= i) return true;
        }
      }
    } else {
      // Check if we can discount D from the Bottom Section
      const R_bot = m - i - 1;
      if (n === 1) {
        if (grid[i + 1][0] === D || grid[m - 1][0] === D) return true;
      } else {
        if (R_bot === 1) {
          if (grid[i + 1][0] === D || grid[i + 1][n - 1] === D) return true;
        } else {
          if (maxRow[D] >= i + 1) return true;
        }
      }
    }
  }

  // 2. Check all valid Vertical Cuts
  currentSum = 0;
  for (let j = 0; j < n - 1; j++) {
    currentSum += colSum[j];
    const S_left = currentSum;
    const S_right = totalSum - currentSum;
    const D = Math.abs(S_left - S_right);

    if (D === 0) return true;
    if (D > MAX_VAL) continue; // Cell equivalent to difference doesn't exist

    if (S_left > S_right) {
      // Check if we can discount D from the Left Section
      const C_left = j + 1;
      if (m === 1) {
        if (grid[0][0] === D || grid[0][j] === D) return true;
      } else {
        if (C_left === 1) {
          if (grid[0][0] === D || grid[m - 1][0] === D) return true;
        } else {
          if (minCol[D] <= j) return true;
        }
      }
    } else {
      // Check if we can discount D from the Right Section
      const C_right = n - j - 1;
      if (m === 1) {
        if (grid[0][j + 1] === D || grid[0][n - 1] === D) return true;
      } else {
        if (C_right === 1) {
          if (grid[0][j + 1] === D || grid[m - 1][j + 1] === D) return true;
        } else {
          if (maxCol[D] >= j + 1) return true;
        }
      }
    }
  }

  return false;
}

console.log(canPartition(grid));
