// 840. Magic Squares In Grid

/**
    Example 1:


Input: grid = [[4,3,8,4],[9,5,1,9],[2,7,6,2]]
Output: 1
Explanation: 
The following subgrid is a 3 x 3 magic square:

while this one is not:

In total, there is only one magic square inside the given grid.
Example 2:

Input: grid = [[8]]
Output: 0

*/

const grid = [
  [4, 3, 8, 4],
  [9, 5, 1, 9],
  [2, 7, 6, 2],
];
const numMagicSquaresInside = function (grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;

  // A magic square must be 3x3. If the grid is smaller, return 0.
  if (rows < 3 || cols < 3) {
    return 0;
  }

  let count = 0;

  // Iterate through every possible 3x3 subgrid
  // The top-left corner can go from 0 to rows-3 and 0 to cols-3
  for (let r = 0; r <= rows - 3; r++) {
    for (let c = 0; c <= cols - 3; c++) {
      if (isMagic(grid, r, c)) {
        count++;
      }
    }
  }

  return count;
};

function isMagic(grid: number[][], r: number, c: number): boolean {
  // Optimization: In a 3x3 magic square using numbers 1-9,
  // the center number must always be 5.
  if (grid[r + 1][c + 1] !== 5) {
    return false;
  }

  // 1. Check distinct numbers from 1 to 9
  const seen = new Set<number>();
  for (let i = r; i < r + 3; i++) {
    for (let j = c; j < c + 3; j++) {
      const val = grid[i][j];
      // Must be between 1-9 and unique
      if (val < 1 || val > 9 || seen.has(val)) {
        return false;
      }
      seen.add(val);
    }
  }

  // 2. Check Sums
  // Since numbers 1-9 sum to 45, each row/col/diag must sum to 15.

  // Row sums
  const row1 = grid[r][c] + grid[r][c + 1] + grid[r][c + 2];
  const row2 = grid[r + 1][c] + grid[r + 1][c + 1] + grid[r + 1][c + 2];
  const row3 = grid[r + 2][c] + grid[r + 2][c + 1] + grid[r + 2][c + 2];

  if (row1 !== 15 || row2 !== 15 || row3 !== 15) return false;

  // Column sums
  const col1 = grid[r][c] + grid[r + 1][c] + grid[r + 2][c];
  const col2 = grid[r][c + 1] + grid[r + 1][c + 1] + grid[r + 2][c + 1];
  const col3 = grid[r][c + 2] + grid[r + 1][c + 2] + grid[r + 2][c + 2];

  if (col1 !== 15 || col2 !== 15 || col3 !== 15) return false;

  // Diagonal sums
  const diag1 = grid[r][c] + grid[r + 1][c + 1] + grid[r + 2][c + 2];
  const diag2 = grid[r][c + 2] + grid[r + 1][c + 1] + grid[r + 2][c];

  if (diag1 !== 15 || diag2 !== 15) return false;

  return true;
}

console.log(numMagicSquaresInside(grid));
