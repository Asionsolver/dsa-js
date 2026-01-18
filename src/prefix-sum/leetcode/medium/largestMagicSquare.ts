// 1895. Largest Magic Square

/**
Example 1:


Input: grid = [[7,1,4,5,6],[2,5,1,6,4],[1,5,4,3,2],[1,2,7,3,4]]
Output: 3
Explanation: The largest magic square has a size of 3.
Every row sum, column sum, and diagonal sum of this magic square is equal to 12.
- Row sums: 5+1+6 = 5+4+3 = 2+7+3 = 12
- Column sums: 5+5+2 = 1+4+7 = 6+3+3 = 12
- Diagonal sums: 5+4+3 = 6+4+2 = 12
Example 2:


Input: grid = [[5,1,3,1],[9,3,3,1],[1,3,3,8]]
Output: 2
*/

const grid = [
  [5, 1, 3, 1],
  [9, 3, 3, 1],
  [1, 3, 3, 8],
];

const largestMagicSquare = function (grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  // Precompute prefix sums for rows
  // rowPrefix[i][j] = sum of grid[i][0]...grid[i][j-1]
  const rowPrefix = Array.from({ length: m }, () => new Array(n + 1).fill(0));

  // Precompute prefix sums for columns
  // colPrefix[i][j] = sum of grid[0][j]...grid[i-1][j]
  const colPrefix = Array.from({ length: m + 1 }, () => new Array(n).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      rowPrefix[i][j + 1] = rowPrefix[i][j] + grid[i][j];
      colPrefix[i + 1][j] = colPrefix[i][j] + grid[i][j];
    }
  }

  // Start checking from the largest possible dimension down to 2
  for (let k = Math.min(m, n); k > 1; k--) {
    // Iterate through every possible top-left corner (r, c) for a square of size k
    for (let r = 0; r <= m - k; r++) {
      for (let c = 0; c <= n - k; c++) {
        if (isValidMagicSquare(grid, rowPrefix, colPrefix, r, c, k)) {
          return k;
        }
      }
    }
  }

  // If no square larger than 1 is found, return 1
  return 1;
};

const isValidMagicSquare = function (
  grid: number[][],
  rowPrefix: number[][],
  colPrefix: number[][],
  r: number,
  c: number,
  k: number,
): boolean {
  // Calculate the target sum using the first row of the subgrid
  // Sum of row r from c to c+k-1
  const targetSum = rowPrefix[r][c + k] - rowPrefix[r][c];

  // 1. Check all rows
  for (let i = 0; i < k; i++) {
    const currentParams = rowPrefix[r + i][c + k] - rowPrefix[r + i][c];
    if (currentParams !== targetSum) return false;
  }

  // 2. Check all columns
  for (let j = 0; j < k; j++) {
    const currentColSum = colPrefix[r + k][c + j] - colPrefix[r][c + j];
    if (currentColSum !== targetSum) return false;
  }

  // 3. Check Main Diagonal (top-left to bottom-right)
  let diagSum1 = 0;
  for (let i = 0; i < k; i++) {
    diagSum1 += grid[r + i][c + i];
  }
  if (diagSum1 !== targetSum) return false;

  // 4. Check Anti-Diagonal (top-right to bottom-left)
  let diagSum2 = 0;
  for (let i = 0; i < k; i++) {
    diagSum2 += grid[r + i][c + k - 1 - i];
  }
  if (diagSum2 !== targetSum) return false;

  return true;
};

console.log(largestMagicSquare(grid));
