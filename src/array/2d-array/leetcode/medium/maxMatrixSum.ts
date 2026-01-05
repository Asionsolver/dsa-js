// 1975. Maximum Matrix Sum

/**
Example 1:


Input: matrix = [[1,-1],[-1,1]]
Output: 4
Explanation: We can follow the following steps to reach sum equals 4:
- Multiply the 2 elements in the first row by -1.
- Multiply the 2 elements in the first column by -1.
Example 2:


Input: matrix = [[1,2,3],[-1,-2,-3],[1,2,3]]
Output: 16
Explanation: We can follow the following step to reach sum equals 16:
- Multiply the 2 last elements in the second row by -1.
 
*/

const matrix = [
  [1, -1],
  [-1, 1],
];

const maxMatrixSum = function (matrix: number[][]) {
  let totalSum = 0;
  let minAbsVal = Infinity;
  let negativeCount = 0;

  const n = matrix.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const val = matrix[i][j];
      const absVal = Math.abs(val);

      // Add the absolute value to the total sum
      totalSum += absVal;

      // Count how many negative numbers exist
      if (val < 0) {
        negativeCount++;
      }

      // Keep track of the smallest absolute value in the entire matrix
      if (absVal < minAbsVal) {
        minAbsVal = absVal;
      }
    }
  }

  // If we have an even number of negatives, we can turn them all positive.
  if (negativeCount % 2 === 0) {
    return totalSum;
  }

  // If we have an odd number of negatives, one number must remain negative.
  // To maximize the sum, we sacrifice the number with the smallest absolute value.
  // We subtract 2 * minAbsVal because it was added as +minAbsVal in totalSum,
  // but effectively becomes -minAbsVal.
  return totalSum - 2 * minAbsVal;
};
console.log(maxMatrixSum(matrix));
