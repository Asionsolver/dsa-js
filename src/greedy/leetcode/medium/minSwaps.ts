// 1536. Minimum Swaps to Arrange a Binary Grid

/**
Example 1:


Input: grid = [[0,0,1],[1,1,0],[1,0,0]]
Output: 3
Example 2:


Input: grid = [[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,1,1,0]]
Output: -1
Explanation: All rows are similar, swaps have no effect on the grid.
Example 3:


Input: grid = [[1,0,0],[1,1,0],[1,1,1]]
Output: 0
*/

const grid = [
  [0, 0, 1],
  [1, 1, 0],
  [1, 0, 0],
];

const minSwaps = function (grid: number[][]): number {
  const n = grid.length;
  const trailingZeros: number[] = [];

  // 1. Calculate trailing zeros for each row
  for (let i = 0; i < n; i++) {
    let count = 0;
    // Count from the end of the row backwards
    for (let j = n - 1; j >= 0; j--) {
      if (grid[i][j] === 0) {
        count++;
      } else {
        break; // Stop at the first 1
      }
    }
    trailingZeros.push(count);
  }

  let swaps = 0;

  // 2. Iterate through each position that needs to be filled
  for (let i = 0; i < n; i++) {
    const requiredZeros = n - 1 - i;

    // Find the closest row starting from i that meets the requirement
    let foundIndex = -1;
    for (let k = i; k < n; k++) {
      if (trailingZeros[k] >= requiredZeros) {
        foundIndex = k;
        break;
      }
    }

    // If no valid row is found, it's impossible to solve
    if (foundIndex === -1) {
      return -1;
    }

    // Add the number of swaps needed to bubble this row up to position i
    swaps += foundIndex - i;

    // Move the found row to the current position i
    // We remove it from foundIndex and insert it at i
    const rowZeros = trailingZeros[foundIndex];
    trailingZeros.splice(foundIndex, 1);
    trailingZeros.splice(i, 0, rowZeros);
  }

  return swaps;
};

console.log(minSwaps(grid));
