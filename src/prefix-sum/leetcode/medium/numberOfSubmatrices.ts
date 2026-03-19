// 3212. Count Submatrices With Equal Frequency of X and Y

/**
Example 1:

Input: grid = [["X","Y","."],["Y",".","."]]

Output: 3

Explanation:



Example 2:

Input: grid = [["X","X"],["X","Y"]]

Output: 0

Explanation:

No submatrix has an equal frequency of 'X' and 'Y'.

Example 3:

Input: grid = [[".","."],[".","."]]

Output: 0

Explanation:

No submatrix has at least one 'X'.
*/

const grid = [
  [".", "."],
  [".", "."],
];

const numberOfSubmatrices = function (grid: string[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  let ans = 0;

  // Arrays to maintain the 2D prefix sums mapped down to a 1D column representation
  const totalX = new Int32Array(n);
  const totalY = new Int32Array(n);

  for (let i = 0; i < m; i++) {
    let rowX = 0;
    let rowY = 0;
    const row = grid[i];

    for (let j = 0; j < n; j++) {
      const char = row[j];

      // Increment local counts for the ongoing row
      if (char === "X") {
        rowX++;
      } else if (char === "Y") {
        rowY++;
      }

      // Add ongoing row count accumulation to the overall total per column scope
      totalX[j] += rowX;
      totalY[j] += rowY;

      // If they are equal and there's at least 1 'X'
      if (totalX[j] === totalY[j] && totalX[j] > 0) {
        ans++;
      }
    }
  }

  return ans;
};

console.log(numberOfSubmatrices(grid));
