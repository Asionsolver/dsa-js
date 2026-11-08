// 1267. Count Servers that Communicate

/**
You are given a map of a server center, represented as a m * n integer matrix grid, where 1 means that on that cell there is a server and 0 means that it is no server. Two servers are said to communicate if they are on the same row or on the same column.

Return the number of servers that communicate with any other server.
*/

/**
Example 1:



Input: grid = [[1,0],[0,1]]
Output: 0
Explanation: No servers can communicate with others.
Example 2:



Input: grid = [[1,0],[1,1]]
Output: 3
Explanation: All three servers can communicate with at least one other server.
Example 3:



Input: grid = [[1,1,0,0],[0,0,1,0],[0,0,1,0],[0,0,0,1]]
Output: 4
Explanation: The two servers in the first row can communicate with each other. The two servers in the third column can communicate with each other. The server at right bottom corner can't communicate with any other server.

*/

/**
Constraints:

m == grid.length
n == grid[i].length
1 <= m <= 250
1 <= n <= 250
grid[i][j] == 0 or 1
*/

// Brute Force Approach
function countServers(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  let communicatingServers = 0;

  // Traverse each cell of the matrix.
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // If there is a server at (i, j), check if it can communicate.
      if (grid[i][j] === 1) {
        let canCommunicate = false;

        // Check the same row for another server.
        for (let c = 0; c < n; c++) {
          if (c !== j && grid[i][c] === 1) {
            canCommunicate = true;
            break;
          }
        }

        // If not found in the row, check the same column.
        if (!canCommunicate) {
          for (let r = 0; r < m; r++) {
            if (r !== i && grid[r][j] === 1) {
              canCommunicate = true;
              break;
            }
          }
        }

        // If it can communicate, increment our count.
        if (canCommunicate) {
          communicatingServers++;
        }
      }
    }
  }

  return communicatingServers;
}

// Example usage:
const grid1 = [
  [1, 0],
  [0, 1],
];
console.log(countServers(grid1)); // Output: 0

const grid2 = [
  [1, 0],
  [1, 1],
];
console.log(countServers(grid2)); // Output: 3

const grid3 = [
  [1, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];
console.log(countServers(grid3)); // Output: 4
