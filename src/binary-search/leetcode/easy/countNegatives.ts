// 1351. Count Negative Numbers in a Sorted Matrix

/**
Example 1:

Input: grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]
Output: 8
Explanation: There are 8 negatives number in the matrix.
Example 2:

Input: grid = [[3,2],[1,0]]
Output: 0
*/

const grid = [
  [4, 3, 2, -1],
  [3, 2, 1, -1],
  [1, 1, -1, -2],
  [-1, -1, -2, -3],
];

const countNegatives = function (grid: number[][]) {
  const m = grid.length;
  const n = grid[0].length;

  let count = 0;
  let row = m - 1; // Start at the bottom row
  let col = 0; // Start at the first column

  // Traverse until we go out of bounds (top or right)
  while (row >= 0 && col < n) {
    if (grid[row][col] < 0) {
      // Found a negative number.
      // Since the row is sorted descending, all elements to the right
      // (from 'col' to 'n-1') are also negative.
      count += n - col;

      // Move up to check the next row
      row--;
    } else {
      // Found a positive number or zero.
      // We need to move right to find smaller numbers.
      col++;
    }
  }

  return count;
};
