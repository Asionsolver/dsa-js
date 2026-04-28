// 2033. Minimum Operations to Make a Uni-Value Grid

/**
Example 1:


Input: grid = [[2,4],[6,8]], x = 2
Output: 4
Explanation: We can make every element equal to 4 by doing the following: 
- Add x to 2 once.
- Subtract x from 6 once.
- Subtract x from 8 twice.
A total of 4 operations were used.
Example 2:


Input: grid = [[1,5],[2,3]], x = 1
Output: 5
Explanation: We can make every element equal to 3.
Example 3:


Input: grid = [[1,2],[3,4]], x = 2
Output: -1
Explanation: It is impossible to make every element equal.

*/

function minOperations(grid: number[][], x: number): number {
  const flat: number[] = [];
  const m = grid.length;
  const n = grid[0].length;

  // Step 1: Flatten the grid into a 1D array
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      flat.push(grid[i][j]);
    }
  }

  // Step 2: Check if all elements have the same remainder when divided by x
  const rem = flat[0] % x;
  for (let i = 1; i < flat.length; i++) {
    if (flat[i] % x !== rem) {
      return -1;
    }
  }

  // Step 3: Sort the flattened array to find the median
  flat.sort((a, b) => a - b);

  // Step 4: Pick the median as the target value
  const median = flat[Math.floor(flat.length / 2)];
  let minOps = 0;

  // Step 5: Calculate the minimum number of operations needed
  for (let i = 0; i < flat.length; i++) {
    minOps += Math.abs(flat[i] - median) / x;
  }

  return minOps;
}

// Example usage:
const grid1 = [
  [2, 4],
  [6, 8],
];
const x1 = 2;
console.log(minOperations(grid1, x1)); // Output: 4

const grid2 = [
  [1, 5],
  [2, 3],
];
const x2 = 1;
console.log(minOperations(grid2, x2)); // Output: 5
