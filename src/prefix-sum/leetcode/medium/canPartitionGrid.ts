// 3546. Equal Sum Grid Partition I

/**
Example 1:

Input: grid = [[1,4],[2,3]]

Output: true

Explanation:



A horizontal cut between row 0 and row 1 results in two non-empty sections, each with a sum of 5. Thus, the answer is true.

Example 2:

Input: grid = [[1,3],[2,4]]

Output: false

Explanation:

No horizontal or vertical cut results in two non-empty sections with equal sums. Thus, the answer is false.

*/
const grid = [
  [1, 4],
  [2, 3],
];

function hasMatch(grid: number[][]): boolean {
  const m = grid.length;
  const n = grid[0].length;

  // Using Float64Array to safely handle large integers and perform fast summations
  const rowSums = new Float64Array(m);
  const colSums = new Float64Array(n);

  let totalSum = 0;

  // Accumulate sums for each row, each column, and the total grid
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const val = grid[i][j];
      rowSums[i] += val;
      colSums[j] += val;
      totalSum += val;
    }
  }

  // If the total sum is odd, it's impossible to divide it evenly into two integer parts
  if (totalSum % 2 !== 0) {
    return false;
  }

  const target = totalSum / 2;

  // Check for a valid horizontal cut
  let currentSum = 0;
  for (let i = 0; i < m - 1; i++) {
    currentSum += rowSums[i];
    if (currentSum === target) {
      return true;
    }
  }

  // Check for a valid vertical cut
  currentSum = 0;
  for (let j = 0; j < n - 1; j++) {
    currentSum += colSums[j];
    if (currentSum === target) {
      return true;
    }
  }

  return false;
}

console.log(grid);
