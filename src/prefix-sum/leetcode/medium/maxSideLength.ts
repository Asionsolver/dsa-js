// 1292. Maximum Side Length of a Square with Sum Less than or Equal to Threshold

/**
Example 1:


Input: mat = [[1,1,3,2,4,3,2],[1,1,3,2,4,3,2],[1,1,3,2,4,3,2]], threshold = 4
Output: 2
Explanation: The maximum side length of square with sum less than 4 is 2 as shown.
Example 2:

Input: mat = [[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2]], threshold = 1
Output: 0

*/

const mat = [
    [1, 1, 3, 2, 4, 3, 2],
    [1, 1, 3, 2, 4, 3, 2],
    [1, 1, 3, 2, 4, 3, 2],
  ],
  threshold = 4;

const maxSideLength = function (mat: number[][], threshold: number): number {
  const m = mat.length;
  const n = mat[0].length;

  // Create a 2D Prefix Sum array with dimensions (m+1) x (n+1)
  // to handle boundary cases easily (1-based indexing).
  const pref: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0),
  );

  // Build the prefix sum matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      pref[i][j] =
        mat[i - 1][j - 1] +
        pref[i - 1][j] +
        pref[i][j - 1] -
        pref[i - 1][j - 1];
    }
  }

  let maxSide = 0;

  // Iterate through each cell, treating it as the bottom-right corner of a potential square
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // We want to see if we can find a square larger than the current maxSide
      const targetSide = maxSide + 1;

      // Check if coordinates allow for a square of size targetSide
      if (i >= targetSide && j >= targetSide) {
        // Calculate the top-left coordinates (1-based)
        // Bottom-right is (i, j)
        const r1 = i - targetSide + 1;
        const c1 = j - targetSide + 1;

        // Calculate sum of the square using the inclusion-exclusion principle
        const currentSum =
          pref[i][j] - pref[r1 - 1][j] - pref[i][c1 - 1] + pref[r1 - 1][c1 - 1];

        if (currentSum <= threshold) {
          maxSide = targetSide;
        }
      }
    }
  }

  return maxSide;
};

console.log(maxSideLength(mat, threshold));
