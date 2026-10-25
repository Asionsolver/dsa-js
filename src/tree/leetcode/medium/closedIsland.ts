// 1254. Number of Closed Islands

/**
Given a 2D grid consists of 0s (land) and 1s (water).  An island is a maximal 4-directionally connected group of 0s and a closed island is an island totally (all left, top, right, bottom) surrounded by 1s.

Return the number of closed islands.
*/

/**
Example 1:



Input: grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
Output: 2
Explanation: 
Islands in gray are closed because they are completely surrounded by water (group of 1s).
Example 2:



Input: grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]
Output: 1
Example 3:

Input: grid = [[1,1,1,1,1,1,1],
               [1,0,0,0,0,0,1],
               [1,0,1,1,1,0,1],
               [1,0,1,0,1,0,1],
               [1,0,1,1,1,0,1],
               [1,0,0,0,0,0,1],
               [1,1,1,1,1,1,1]]
Output: 2

*/

/**
Constraints:

1 <= grid.length, grid[0].length <= 100
0 <= grid[i][j] <=1
*/

// Brute Force Approach: Depth First Search (DFS) to explore each island and check if it is closed.
function closedIsland(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false),
  );

  let closedCount = 0;

  function dfs(r: number, c: number): boolean {
    // If out of bounds, this island touches the edge, so it is not closed.
    if (r < 0 || r >= rows || c < 0 || c >= cols) {
      return false;
    }

    // If it is water or already visited, it does not violate the closed condition.
    if (grid[r][c] === 1 || visited[r][c]) {
      return true;
    }

    // Mark current cell as visited.
    visited[r][c] = true;

    // Explore all 4 adjacent directions.
    const up = dfs(r - 1, c);
    const down = dfs(r + 1, c);
    const left = dfs(r, c - 1);
    const right = dfs(r, c + 1);

    // Island is closed only if ALL 4 directions are closed.
    return up && down && left && right;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 0 && !visited[r][c]) {
        // Run DFS for the unvisited land component.
        if (dfs(r, c)) {
          closedCount++;
        }
      }
    }
  }

  return closedCount;
}

// Example usage:
const grid1 = [
  [1, 1, 1, 1, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 1, 1, 0],
  [1, 0, 1, 0, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 0],
];
console.log(closedIsland(grid1)); // Output: 2

const grid2 = [
  [0, 0, 1, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0],
];
console.log(closedIsland(grid2)); // Output: 1
