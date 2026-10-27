// 3963. Create Grid With Exactly One Path

/**
You are given two integers m and n, representing the number of rows and columns of a grid.

Construct any m x n grid consisting only of the characters '.' and '#', where:

'.' represents a free cell.
'#' represents an obstacle cell.
A valid path is a sequence of free cells that:

Starts at the top-left cell (0, 0).
Ends at the bottom-right cell (m - 1, n - 1).
Moves only:
Right, from (i, j) to (i, j + 1), or
Down, from (i, j) to (i + 1, j).
Return any grid such that there is exactly one valid path from the top-left cell to the bottom-right cell.
*/

/**
Example 1:

Input: m = 2, n = 3

Output: ["..#","#.."]

Explanation:



The only valid path is: (0,0) → (0,1) → (1,1) → (1,2)

Example 2:

Input: m = 3, n = 3

Output: ["..#","#..","##."]

Explanation:



The only valid path is: (0,0) → (0,1) → (1,1) → (1,2) → (2,2)

Example 3:

Input: m = 1, n = 4

Output: ["...."]

Explanation:

The only valid path is: (0,0) → (0,1) → (0,2) → (0,3)


*/

/**
Constraints:

1 <= m, n <= 25

*/
// Brute Force Approach: Backtracking with Dynamic Programming
// function createGrid(m: number, n: number): string[] {
//   const grid: string[][] = Array.from({ length: m }, () => Array(n).fill("."));

//   // Helper function to count unique paths using 2D Dynamic Programming.
//   function countPaths(g: string[][]): number {
//     if (g[0][0] === "#" || g[m - 1][n - 1] === "#") return 0;

//     const dp: number[][] = Array.from({ length: m }, () => Array(n).fill(0));
//     dp[0][0] = 1;

//     for (let r = 0; r < m; r++) {
//       for (let c = 0; c < n; c++) {
//         if (g[r][c] === "#") {
//           dp[r][c] = 0;
//           continue;
//         }
//         // Move Right
//         if (c + 1 < n && g[r][c + 1] !== "#") {
//           dp[r][c + 1] += dp[r][c];
//         }
//         // Move Down
//         if (r + 1 < m && g[r + 1][c] !== "#") {
//           dp[r + 1][c] += dp[r][c];
//         }
//       }
//     }

//     return dp[m - 1][n - 1];
//   }

//   let foundGrid: string[] | null = null;

//   // Backtracking function to generate all grid combinations.
//   function backtrack(row: number, col: number): boolean {
//     if (row === m) {
//       if (countPaths(grid) === 1) {
//         foundGrid = grid.map((r) => r.join(""));
//         return true;
//       }
//       return false;
//     }

//     const nextRow = col + 1 === n ? row + 1 : row;
//     const nextCol = col + 1 === n ? 0 : col + 1;

//     // Try placing free cell '.'
//     grid[row][col] = ".";
//     if (backtrack(nextRow, nextCol)) return true;

//     // Try placing obstacle '#' (except start and end)
//     if (!(row === 0 && col === 0) && !(row === m - 1 && col === n - 1)) {
//       grid[row][col] = "#";
//       if (backtrack(nextRow, nextCol)) return true;
//     }

//     return false;
//   }

//   backtrack(0, 0);
//   return foundGrid!;
// }

// Example usage:

// Optimized Approach: Direct Construction
function createGrid(m: number, n: number): string[] {
  const result: string[] = [];

  // Row 0 is completely free: walk straight to the rightmost column.
  result.push(".".repeat(n));

  // For the remaining rows, block all cells except the last column.
  const otherRow = "#".repeat(n - 1) + ".";

  for (let i = 1; i < m; i++) {
    // Add the blocked row with only the rightmost cell free.
    result.push(otherRow);
  }

  return result;
}
console.log(createGrid(2, 3)); // Example output: ["..#", "#.."]
console.log(createGrid(3, 3)); // Example output: ["..#", "#..", "##."]
console.log(createGrid(1, 4)); // Example output: ["...."]
