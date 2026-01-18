// 764. Largest Plus Sign

/**
Example 1:


Input: n = 5, mines = [[4,2]]
Output: 2
Explanation: In the above grid, the largest plus sign can only be of order 2. One of them is shown.
Example 2:


Input: n = 1, mines = [[0,0]]
Output: 0
Explanation: There is no plus sign, so return 0.
*/

const n = 5,
  mines = [[4, 2]];

const orderOfLargestPlusSign = function (n: number, mines: number[][]): number {
  // Initialize the grid with 'n'.
  // 'n' acts as a safe upper bound (infinity equivalent) because no plus sign
  // can have an order larger than the grid size.
  const grid: number[][] = Array.from({ length: n }, () =>
    new Array(n).fill(n),
  );

  // Mark mines with 0. A mine acts as a wall and has an order of 0.
  for (const [r, c] of mines) {
    grid[r][c] = 0;
  }

  // Pass 1: Handle Rows (Horizontal directions)
  for (let i = 0; i < n; i++) {
    // Left -> Right
    let count = 0;
    for (let j = 0; j < n; j++) {
      // If the cell is a mine (0), reset count.
      // Otherwise, increment count.
      count = grid[i][j] === 0 ? 0 : count + 1;
      grid[i][j] = Math.min(grid[i][j], count);
    }

    // Right -> Left
    count = 0;
    for (let j = n - 1; j >= 0; j--) {
      // Since mines are strictly 0 and valid cells are >= 1,
      // checking grid[i][j] === 0 determines if it's a mine.
      count = grid[i][j] === 0 ? 0 : count + 1;
      grid[i][j] = Math.min(grid[i][j], count);
    }
  }

  let maxOrder = 0;

  // Pass 2: Handle Columns (Vertical directions)
  for (let j = 0; j < n; j++) {
    // Top -> Bottom
    let count = 0;
    for (let i = 0; i < n; i++) {
      count = grid[i][j] === 0 ? 0 : count + 1;
      grid[i][j] = Math.min(grid[i][j], count);
    }

    // Bottom -> Top
    count = 0;
    for (let i = n - 1; i >= 0; i--) {
      count = grid[i][j] === 0 ? 0 : count + 1;
      grid[i][j] = Math.min(grid[i][j], count);

      // After processing all 4 directions for this cell,
      // grid[i][j] now holds the minimum arm length.
      maxOrder = Math.max(maxOrder, grid[i][j]);
    }
  }

  return maxOrder;
};
console.log(orderOfLargestPlusSign(n, mines));
