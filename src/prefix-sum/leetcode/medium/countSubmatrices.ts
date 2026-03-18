// 3070. Count Submatrices with Top-Left Element and Sum Less Than k

/**
Example 1:


Input: grid = [[7,6,3],[6,6,1]], k = 18
Output: 4
Explanation: There are only 4 submatrices, shown in the image above, that contain the top-left element of grid, and have a sum less than or equal to 18.
Example 2:


Input: grid = [[7,2,9],[1,5,0],[2,6,6]], k = 20
Output: 6
Explanation: There are only 6 submatrices, shown in the image above, that contain the top-left element of grid, and have a sum less than or equal to 20.
*/

const grid = [
    [7, 6, 3],
    [6, 6, 1],
  ],
  k = 18;

const countSubmatrices = function (grid: number[][], k: number): number {
  const m = grid.length;
  const n = grid[0].length;
  let count = 0;

  // colSum[j] keeps the sum of column j from row 0 down to the current row i
  const colSum = new Array(n).fill(0);

  // maxJ optimizes the loop by bounding the maximum column index we need to visit
  let maxJ = n;

  for (let i = 0; i < m; i++) {
    // If the first column's sum previously exceeded k, we can safely terminate
    if (maxJ === 0) break;

    let currentSum = 0;

    for (let j = 0; j < maxJ; j++) {
      colSum[j] += grid[i][j];
      currentSum += colSum[j];

      // Submatrix sum from (0, 0) to (i, j)
      if (currentSum <= k) {
        count++;
      } else {
        // For all remaining columns in this row, the sum will be > k.
        // Furthermore, for all rows > i, the sum at column j will also be > k.
        // We update maxJ to narrow the bounds for the upcoming rows.
        maxJ = j;
        break;
      }
    }
  }

  return count;
};

console.log(countSubmatrices(grid, k));
