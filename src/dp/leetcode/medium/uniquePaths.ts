// 3665. Twisted Mirror Path Count

/**
Given an m x n binary grid grid where:

grid[i][j] == 0 represents an empty cell, and
grid[i][j] == 1 represents a mirror.
A robot starts at the top-left corner of the grid (0, 0) and wants to reach the bottom-right corner (m - 1, n - 1). It can move only right or down. If the robot attempts to move into a mirror cell, it is reflected before entering that cell:

If it tries to move right into a mirror, it is turned down and moved into the cell directly below the mirror.
If it tries to move down into a mirror, it is turned right and moved into the cell directly to the right of the mirror.
If this reflection would cause the robot to move outside the grid boundaries, the path is considered invalid and should not be counted.

Return the number of unique valid paths from (0, 0) to (m - 1, n - 1).

Since the answer may be very large, return it modulo 109 + 7.

Note: If a reflection moves the robot into a mirror cell, the robot is immediately reflected again based on the direction it used to enter that mirror: if it entered while moving right, it will be turned down; if it entered while moving down, it will be turned right. This process will continue until either the last cell is reached, the robot moves out of bounds or the robot moves to a non-mirror cell.
*/

/**
Example 1:

Input: grid = [[0,1,0],[0,0,1],[1,0,0]]

Output: 5

Explanation:

Number	Full Path
1	(0, 0) → (0, 1) [M] → (1, 1) → (1, 2) [M] → (2, 2)
2	(0, 0) → (0, 1) [M] → (1, 1) → (2, 1) → (2, 2)
3	(0, 0) → (1, 0) → (1, 1) → (1, 2) [M] → (2, 2)
4	(0, 0) → (1, 0) → (1, 1) → (2, 1) → (2, 2)
5	(0, 0) → (1, 0) → (2, 0) [M] → (2, 1) → (2, 2)
[M] indicates the robot attempted to enter a mirror cell and instead reflected.

Example 2:

Input: grid = [[0,0],[0,0]]

Output: 2

Explanation:

Number	Full Path
1	(0, 0) → (0, 1) → (1, 1)
2	(0, 0) → (1, 0) → (1, 1)
Example 3:

Input: grid = [[0,1,1],[1,1,0]]

Output: 1

Explanation:

Number	Full Path
1	(0, 0) → (0, 1) [M] → (1, 1) [M] → (1, 2)
(0, 0) → (1, 0) [M] → (1, 1) [M] → (2, 1) goes out of bounds, so it is invalid.

*/

/**
Constraints:

m == grid.length
n == grid[i].length
2 <= m, n <= 500
grid[i][j] is either 0 or 1.
grid[0][0] == grid[m - 1][n - 1] == 0
*/

// Brute Force Approach: TLE

// function uniquePaths(grid: number[][]): number {
//   const m = grid.length;
//   const n = grid[0].length;
//   const MOD = 1_000_000_007;

//   // Direction definitions: 0 represents moving RIGHT, 1 represents moving DOWN.
//   const RIGHT = 0;
//   const DOWN = 1;

//   function dfs(r: number, c: number, dir: number): number {
//     // If the robot moves out of bounds, this path is invalid.
//     if (r >= m || c >= n) {
//       return 0;
//     }

//     // Target reached successfully.
//     if (r === m - 1 && c === n - 1) {
//       return 1;
//     }

//     // If the cell is a mirror, force deflection based on incoming direction.
//     if (grid[r][c] === 1) {
//       if (dir === RIGHT) {
//         return dfs(r + 1, c, DOWN);
//       } else {
//         return dfs(r, c + 1, RIGHT);
//       }
//     }

//     // If the cell is empty, the robot can freely branch RIGHT or DOWN.
//     const moveRight = dfs(r, c + 1, RIGHT);
//     const moveDown = dfs(r + 1, c, DOWN);

//     return (moveRight + moveDown) % MOD;
//   }

//   // From (0, 0), the robot can either move right or down.
//   const startRight = dfs(0, 1, RIGHT);
//   const startDown = dfs(1, 0, DOWN);

//   return (startRight + startDown) % MOD;
// }

// Optimized Dynamic Programming Approach: O(m * n) time and O(m * n) space
function uniquePaths(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  const MOD = 1_000_000_007;

  // inRight[r][c]: Number of paths entering cell (r, c) moving RIGHT.
  const inRight: number[][] = Array.from({ length: m }, () =>
    new Array(n).fill(0),
  );

  // inDown[r][c]: Number of paths entering cell (r, c) moving DOWN.
  const inDown: number[][] = Array.from({ length: m }, () =>
    new Array(n).fill(0),
  );

  // Initialize the start cell (0, 0). Robot can choose to move RIGHT or DOWN.
  if (n > 1) {
    inRight[0][1] = 1;
  }
  if (m > 1) {
    inDown[1][0] = 1;
  }

  // Traverse the grid row by row.
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      // The start cell is already dispatched.
      if (r === 0 && c === 0) {
        continue;
      }

      // If we reach the target cell, we don't need to propagate further.
      if (r === m - 1 && c === n - 1) {
        continue;
      }

      const pathsFromLeft = inRight[r][c];
      const pathsFromTop = inDown[r][c];

      // If no valid path reached this cell, skip it.
      if (pathsFromLeft === 0 && pathsFromTop === 0) {
        continue;
      }

      if (grid[r][c] === 0) {
        // Empty cell: incoming paths merge, and robot can choose RIGHT or DOWN.
        const total = (pathsFromLeft + pathsFromTop) % MOD;

        // Propagate RIGHT.
        if (c + 1 < n) {
          inRight[r][c + 1] = (inRight[r][c + 1] + total) % MOD;
        }

        // Propagate DOWN.
        if (r + 1 < m) {
          inDown[r + 1][c] = (inDown[r + 1][c] + total) % MOD;
        }
      } else {
        // Mirror cell: reflects RIGHT move into DOWN, and DOWN move into RIGHT.

        // Incoming RIGHT is deflected DOWN.
        if (r + 1 < m) {
          inDown[r + 1][c] = (inDown[r + 1][c] + pathsFromLeft) % MOD;
        }

        // Incoming DOWN is deflected RIGHT.
        if (c + 1 < n) {
          inRight[r][c + 1] = (inRight[r][c + 1] + pathsFromTop) % MOD;
        }
      }
    }
  }

  // Total paths arriving at the bottom-right corner.
  const totalDestinationPaths =
    (inRight[m - 1][n - 1] + inDown[m - 1][n - 1]) % MOD;

  return totalDestinationPaths;
}
// Example usage:
const grid1 = [
  [0, 1, 0],
  [0, 0, 1],
  [1, 0, 0],
];
console.log(uniquePaths(grid1)); // Output: 5

const grid2 = [
  [0, 0],
  [0, 0],
];
console.log(uniquePaths(grid2)); // Output: 2

const grid3 = [
  [0, 1, 1],
  [1, 1, 0],
];
console.log(uniquePaths(grid3)); // Output: 1
