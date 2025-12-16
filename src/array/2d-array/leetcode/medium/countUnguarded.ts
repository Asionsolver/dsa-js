// 2257. Count Unguarded Cells in the Grid

/**
Example 1:


Input: m = 4, n = 6, guards = [[0,0],[1,1],[2,3]], walls = [[0,1],[2,2],[1,4]]
Output: 7
Explanation: The guarded an d unguarded cells are shown in red and green respectively in the above diagram.
There are a total of 7 unguarded cells, so we return 7.
Example 2:


Input: m = 3, n = 3, guards = [[1,1]], walls = [[0,1],[1,0],[2,1],[1,2]]
Output: 4
Explanation: The unguarded cells are shown in green in the above diagram.
There are a total of 4 unguarded cells, so we return 4.
 


*/
const m = 4,
  n = 6,
  guards = [
    [0, 0],
    [1, 1],
    [2, 3],
  ],
  walls = [
    [0, 1],
    [2, 2],
    [1, 4],
  ];

const countUnguarded = function (
  m: number,
  n: number,
  guards: number[][],
  walls: number[][]
) {
  // Constants for grid states
  const UNGUARDED = 0;
  const WALL = 1;
  const GUARD = 2;
  const GUARDED = 3;

  // Initialize grid with 0 (UNGUARDED)
  // Using Uint8Array for memory efficiency given the constraints
  const grid: Uint8Array[] = new Array(m).fill(0).map(() => new Uint8Array(n));

  // Mark walls on the grid
  for (const [r, c] of walls) {
    grid[r][c] = WALL;
  }

  // Mark guards on the grid
  for (const [r, c] of guards) {
    grid[r][c] = GUARD;
  }

  // Directions: Up, Down, Left, Right
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  // Simulate guard vision
  for (const [guardRow, guardCol] of guards) {
    for (const [dr, dc] of directions) {
      let r = guardRow + dr;
      let c = guardCol + dc;

      // Continue moving in the direction until boundary or obstruction
      while (r >= 0 && r < m && c >= 0 && c < n) {
        const cellValue = grid[r][c];

        // Vision is blocked by a Wall or another Guard
        if (cellValue === WALL || cellValue === GUARD) {
          break;
        }

        // Mark cell as guarded
        grid[r][c] = GUARDED;

        // Move to next cell
        r += dr;
        c += dc;
      }
    }
  }

  // Count cells that are strictly UNGUARDED (0)
  let count = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === UNGUARDED) {
        count++;
      }
    }
  }

  return count;
};

console.log(countUnguarded(m, n, guards, walls));
