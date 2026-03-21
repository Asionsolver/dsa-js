// 3643. Flip Square Submatrix Vertically

/**
Example 1:


Input: grid = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]], x = 1, y = 0, k = 3

Output: [[1,2,3,4],[13,14,15,8],[9,10,11,12],[5,6,7,16]]

Explanation:

The diagram above shows the grid before and after the transformation.

Example 2:

​​​​​​​
Input: grid = [[3,4,2,3],[2,3,4,2]], x = 0, y = 2, k = 2

Output: [[3,4,4,2],[2,3,2,3]]

Explanation:

The diagram above shows the grid before and after the transformation.
*/

const grid = [
    [3, 4, 2, 3],
    [2, 3, 4, 2],
  ],
  x = 0,
  y = 2,
  k = 2;

const flipSubmatrix = function (
  grid: number[][],
  x: number,
  y: number,
  k: number,
): number[][] {
  // Iterate over the first half of the rows in the submatrix
  for (let i = 0; i < Math.floor(k / 2); i++) {
    let topRow = x + i;
    let bottomRow = x + k - 1 - i;

    // Swap elements column by column within the submatrix width
    for (let j = 0; j < k; j++) {
      let col = y + j;

      // Swap grid[topRow][col] and grid[bottomRow][col]
      let temp = grid[topRow][col];
      grid[topRow][col] = grid[bottomRow][col];
      grid[bottomRow][col] = temp;
    }
  }

  // The grid is updated in-place
  return grid;
};
console.log(flipSubmatrix(grid, x, y, k));
