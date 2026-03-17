// 1727. Largest Submatrix With Rearrangements

/**
Example 1:


Input: matrix = [[0,0,1],[1,1,1],[1,0,1]]
Output: 4
Explanation: You can rearrange the columns as shown above.
The largest submatrix of 1s, in bold, has an area of 4.
Example 2:


Input: matrix = [[1,0,1,0,1]]
Output: 3
Explanation: You can rearrange the columns as shown above.
The largest submatrix of 1s, in bold, has an area of 3.
Example 3:

Input: matrix = [[1,1,0],[1,0,1]]
Output: 2
Explanation: Notice that you must rearrange entire columns, and there is no way to make a submatrix of 1s larger than an area of 2.
*/
const matrix = [
  [1, 1, 0],
  [1, 0, 1],
];

const largestSubmatrix = function (matrix: number[][]): number {
  const m = matrix.length;
  const n = matrix[0].length;

  let maxArea = 0;

  // Maintain the running heights of consecutive 1s ending at the current row
  const heights = new Int32Array(n);

  for (let i = 0; i < m; i++) {
    // Step 1: Update the heights array for the current row
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 1) {
        heights[j]++;
      } else {
        heights[j] = 0;
      }
    }

    // Step 2: Create a copy of the heights and sort it in descending order
    // Note: Using slice() ensures the original heights tracking array doesn't get mutated
    const sortedHeights = heights.slice().sort((a, b) => b - a);

    // Step 3: Calculate the maximum area ending at the current row
    for (let j = 0; j < n; j++) {
      // Optimization: If the height is 0, subsequent heights will also be 0, no point to evaluate
      if (sortedHeights[j] === 0) break;

      // width is (j + 1) and minimum height among the grouped columns is sortedHeights[j]
      const currentArea = sortedHeights[j] * (j + 1);
      maxArea = Math.max(maxArea, currentArea);
    }
  }

  return maxArea;
};

console.log(largestSubmatrix(matrix));
