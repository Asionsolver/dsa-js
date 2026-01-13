// 221. Maximal Square

/**
Example 1:


Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 4
Example 2:


Input: matrix = [["0","1"],["1","0"]]
Output: 1
Example 3:

Input: matrix = [["0"]]
Output: 0

*/
const matrix = [
  ["1", "0", "1", "0", "0"],
  ["1", "0", "1", "1", "1"],
  ["1", "1", "1", "1", "1"],
  ["1", "0", "0", "1", "0"],
];
const maximalSquare = function (matrix: string[][]): number {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let maxSide = 0;

  // We initialize a DP table with dimensions (rows + 1) x (cols + 1).
  // Filled with 0s. The extra row and column allow us to handle
  // the 0th row and 0th column logic without checking bounds.
  const dp: number[][] = Array.from({ length: rows + 1 }, () =>
    Array(cols + 1).fill(0)
  );

  // Iterate through the matrix (1-based index for dp array, 0-based for matrix)
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      // Check if the corresponding cell in the matrix is '1'
      if (matrix[i - 1][j - 1] === "1") {
        // The size of the square ending at this position is
        // 1 + min(top, left, top-left)
        dp[i][j] =
          Math.min(
            dp[i - 1][j], // top
            dp[i][j - 1], // left
            dp[i - 1][j - 1] // top-left
          ) + 1;

        // Update the maximum side length found so far
        maxSide = Math.max(maxSide, dp[i][j]);
      }
    }
  }

  // The area is the side length squared
  return maxSide * maxSide;
};
console.log(maximalSquare(matrix));
