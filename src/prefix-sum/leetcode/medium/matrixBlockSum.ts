// 1314. Matrix Block Sum

/**
Example 1:

Input: mat = [[1,2,3],[4,5,6],[7,8,9]], k = 1
Output: [[12,21,16],[27,45,33],[24,39,28]]
Example 2:

Input: mat = [[1,2,3],[4,5,6],[7,8,9]], k = 2
Output: [[45,45,45],[45,45,45],[45,45,45]] 
*/

const mat = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  k = 1;
const matrixBlockSum = function (mat: number[][], k: number): number[][] {
  const m = mat.length;
  const n = mat[0].length;

  // Create a Prefix Sum matrix with size (m + 1) x (n + 1)
  // Initialize with 0s to handle boundary cases easily
  const sum: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0),
  );

  // Build the 2D Prefix Sum array
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      sum[i + 1][j + 1] = mat[i][j] + sum[i][j + 1] + sum[i + 1][j] - sum[i][j];
    }
  }

  const answer: number[][] = Array.from({ length: m }, () =>
    new Array(n).fill(0),
  );

  // Calculate the block sum for each cell
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // Determine boundaries ensuring they are within the matrix
      const r1 = Math.max(0, i - k);
      const c1 = Math.max(0, j - k);
      const r2 = Math.min(m - 1, i + k);
      const c2 = Math.min(n - 1, j + k);

      // Use the inclusion-exclusion principle to get the sum of the block
      // Note: In the 'sum' array, index r corresponds to matrix index r-1.
      // So for matrix range [r1, r2], we access sum[r2+1] and sum[r1].
      answer[i][j] =
        sum[r2 + 1][c2 + 1] - sum[r1][c2 + 1] - sum[r2 + 1][c1] + sum[r1][c1];
    }
  }

  return answer;
};

console.log(matrixBlockSum(mat, k));
