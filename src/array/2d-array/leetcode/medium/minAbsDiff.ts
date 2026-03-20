// 3567. Minimum Absolute Difference in Sliding Submatrix

/**

Example 1:

Input: grid = [[1,8],[3,-2]], k = 2

Output: [[2]]

Explanation:

There is only one possible k x k submatrix: [[1, 8], [3, -2]].
Distinct values in the submatrix are [1, 8, 3, -2].
The minimum absolute difference in the submatrix is |1 - 3| = 2. Thus, the answer is [[2]].
Example 2:

Input: grid = [[3,-1]], k = 1

Output: [[0,0]]

Explanation:

Both k x k submatrix has only one distinct element.
Thus, the answer is [[0, 0]].
Example 3:

Input: grid = [[1,-2,3],[2,3,5]], k = 2

Output: [[1,2]]

Explanation:

There are two possible k × k submatrix:
Starting at (0, 0): [[1, -2], [2, 3]].
Distinct values in the submatrix are [1, -2, 2, 3].
The minimum absolute difference in the submatrix is |1 - 2| = 1.
Starting at (0, 1): [[-2, 3], [3, 5]].
Distinct values in the submatrix are [-2, 3, 5].
The minimum absolute difference in the submatrix is |3 - 5| = 2.
Thus, the answer is [[1, 2]].
*/
const grid = [
    [1, -2, 3],
    [2, 3, 5],
  ],
  k = 2;

const minAbsoluteDifference = function (
  grid: number[][],
  k: number,
): number[][] {
  const m = grid.length;
  const n = grid[0].length;

  // Initialize the result matrix of size (m - k + 1) x (n - k + 1)
  const ans: number[][] = [];

  // Iterate through every possible top-left corner (i, j) for the k x k submatrices
  for (let i = 0; i <= m - k; i++) {
    const row: number[] = [];
    for (let j = 0; j <= n - k; j++) {
      // Gather all distinct values in the current k x k submatrix
      const uniqueValues = new Set<number>();
      for (let r = i; r < i + k; r++) {
        for (let c = j; c < j + k; c++) {
          uniqueValues.add(grid[r][c]);
        }
      }

      // Convert to an array and sort them numerically in ascending order
      const sorted = Array.from(uniqueValues).sort((a, b) => a - b);

      // If there's less than 2 distinct elements, the minimum absolute difference defaults to 0
      if (sorted.length < 2) {
        row.push(0);
      } else {
        let minDiff = Infinity;

        // The minimum difference between any two distinct values will be between two adjacent items after sorting
        for (let x = 1; x < sorted.length; x++) {
          const diff = sorted[x] - sorted[x - 1];
          if (diff < minDiff) {
            minDiff = diff;
          }
        }
        row.push(minDiff);
      }
    }
    ans.push(row);
  }

  return ans;
};

console.log(minAbsoluteDifference(grid, k));
