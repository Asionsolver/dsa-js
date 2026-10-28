// 3882. Minimum XOR Path in a Grid

/**
You are given a 2D integer array grid of size m * n.

You start at the top-left cell (0, 0) and want to reach the bottom-right cell (m - 1, n - 1).

At each step, you may move either right or down.

The cost of a path is defined as the bitwise XOR of all the values in the cells along that path, including the start and end cells.

Return the minimum possible XOR value among all valid paths from (0, 0) to (m - 1, n - 1).
*/

/**
Example 1:

Input: grid = [[1,2],[3,4]]

Output: 6

Explanation:

There are two valid paths:

(0, 0) → (0, 1) → (1, 1) with XOR: 1 XOR 2 XOR 4 = 7
(0, 0) → (1, 0) → (1, 1) with XOR: 1 XOR 3 XOR 4 = 6
The minimum XOR value among all valid paths is 6.

Example 2:

Input: grid = [[6,7],[5,8]]

Output: 9

Explanation:

There are two valid paths:

(0, 0) → (0, 1) → (1, 1) with XOR: 6 XOR 7 XOR 8 = 9
(0, 0) → (1, 0) → (1, 1) with XOR: 6 XOR 5 XOR 8 = 11
The minimum XOR value among all valid paths is 9.

Example 3:

Input: grid = [[2,7,5]]

Output: 0

Explanation:

There is only one valid path:

(0, 0) → (0, 1) → (0, 2) with XOR: 2 XOR 7 XOR 5 = 0
The XOR value of this path is 0, which is the minimum possible.
*/

/**
Constraints:

1 <= m == grid.length <= 1000
1 <= n == grid[i].length <= 1000
m * n <= 1000
0 <= grid[i][j] <= 1023​
*/

// Brute-force Approach: Depth-First Search (DFS) with Backtracking throw Time Limit Exceeded (TLE)
// function minCost(grid: number[][]): number {
//   const m = grid.length;
//   const n = grid[0].length;

//   function dfs(row: number, col: number, currentXor: number): number {
//     // If destination is reached, return the accumulated XOR value.
//     if (row === m - 1 && col === n - 1) {
//       return currentXor;
//     }

//     let minXor = Infinity;

//     // Explore moving down.
//     if (row + 1 < m) {
//       minXor = Math.min(
//         minXor,
//         dfs(row + 1, col, currentXor ^ grid[row + 1][col]),
//       );
//     }

//     // Explore moving right.
//     if (col + 1 < n) {
//       minXor = Math.min(
//         minXor,
//         dfs(row, col + 1, currentXor ^ grid[row][col + 1]),
//       );
//     }

//     return minXor;
//   }

//   // Start DFS from the top-left cell.
//   return dfs(0, 0, grid[0][0]);
// }

// Optimized Approach: Dynamic Programming (DP) with Bit Manipulation
function minCost(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  const MAX_VAL = 1024;

  // dp[i][j][v] will be 1 if XOR value v is reachable at cell (i, j).
  const dp: Uint8Array[][] = Array.from({ length: m }, () =>
    Array.from({ length: n }, () => new Uint8Array(MAX_VAL)),
  );

  // Base case: starting at (0, 0) with initial cell value.
  dp[0][0][grid[0][0]] = 1;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const currentVal = grid[i][j];

      // Transition from the cell above (i - 1, j).
      if (i > 0) {
        for (let v = 0; v < MAX_VAL; v++) {
          if (dp[i - 1][j][v] === 1) {
            dp[i][j][v ^ currentVal] = 1;
          }
        }
      }

      // Transition from the cell on the left (i, j - 1).
      if (j > 0) {
        for (let v = 0; v < MAX_VAL; v++) {
          if (dp[i][j - 1][v] === 1) {
            dp[i][j][v ^ currentVal] = 1;
          }
        }
      }
    }
  }

  // Find the minimum reachable XOR value at the bottom-right cell.
  for (let v = 0; v < MAX_VAL; v++) {
    if (dp[m - 1][n - 1][v] === 1) {
      return v;
    }
  }

  return 0;
}
// Example usage:
const grid1 = [
  [1, 2],
  [3, 4],
];
console.log(minCost(grid1)); // Output: 6

const grid2 = [
  [6, 7],
  [5, 8],
];
console.log(minCost(grid2)); // Output: 9

const grid3 = [[2, 7, 5]];
console.log(minCost(grid3)); // Output: 0
