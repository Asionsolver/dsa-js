// 2428. Maximum Sum of an Hourglass

/**
Example 1:


Input: grid = [[6,2,1,3],[4,2,1,5],[9,2,8,7],[4,1,2,9]]
Output: 30
Explanation: The cells shown above represent the hourglass with the maximum sum: 6 + 2 + 1 + 2 + 9 + 2 + 8 = 30.
Example 2:


Input: grid = [[1,2,3],[4,5,6],[7,8,9]]
Output: 35
Explanation: There is only one hourglass in the matrix, with the sum: 1 + 2 + 3 + 5 + 7 + 8 + 9 = 35.

*/
const grid = [
  [6, 2, 1, 3],
  [4, 2, 1, 5],
  [9, 2, 8, 7],
  [4, 1, 2, 9],
];
const maxSum = function (grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  let maxHourglassSum = 0;

  // Loop through rows. We stop at m - 3 because an hourglass needs 3 rows (i, i+1, i+2)
  for (let i = 0; i < m - 2; i++) {
    // Loop through columns. We stop at n - 3 because an hourglass needs 3 columns (j, j+1, j+2)
    for (let j = 0; j < n - 2; j++) {
      // Calculate sum of the hourglass
      // Shape:
      // [i][j]   [i][j+1]   [i][j+2]
      //          [i+1][j+1]
      // [i+2][j] [i+2][j+1] [i+2][j+2]

      const currentSum =
        grid[i][j] +
        grid[i][j + 1] +
        grid[i][j + 2] + // Top row
        grid[i + 1][j + 1] + // Middle
        grid[i + 2][j] +
        grid[i + 2][j + 1] +
        grid[i + 2][j + 2]; // Bottom row

      if (currentSum > maxHourglassSum) {
        maxHourglassSum = currentSum;
      }
    }
  }

  return maxHourglassSum;
};

console.log(maxSum(grid));
