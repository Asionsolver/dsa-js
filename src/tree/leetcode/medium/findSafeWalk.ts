// 3286. Find a Safe Walk Through a Grid

/**

Example 1:

Input: grid = [[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]], health = 1

Output: true

Explanation:

The final cell can be reached safely by walking along the gray cells below.


Example 2:

Input: grid = [[0,1,1,0,0,0],[1,0,1,0,0,0],[0,1,1,1,0,1],[0,0,1,0,1,0]], health = 3

Output: false

Explanation:

A minimum of 4 health points is needed to reach the final cell safely.


Example 3:

Input: grid = [[1,1,1],[1,0,1],[1,1,1]], health = 5

Output: true

Explanation:

The final cell can be reached safely by walking along the gray cells below.



Any path that does not go through the cell (1, 1) is unsafe since your health will drop to 0 when reaching the final cell.
*/

function findSafeWalk(grid: number[][], health: number): boolean {
  const m = grid.length;
  const n = grid[0].length;

  // maxHealth[r][c] will store the maximum health we can have when reaching cell (r, c)
  const maxHealth: number[][] = Array.from({ length: m }, () =>
    Array(n).fill(-1),
  );

  const startHealth = health - grid[0][0];
  if (startHealth <= 0) {
    return false;
  }

  maxHealth[0][0] = startHealth;

  // Queue stores tuples of [row, col, remaining_health]
  const queue: [number, number, number][] = [[0, 0, startHealth]];
  let head = 0; // Pointer optimization to avoid the O(N) overhead of shift()

  const dirs = [
    [-1, 0], // Up
    [1, 0], // Down
    [0, -1], // Left
    [0, 1], // Right
  ];

  while (head < queue.length) {
    const [r, c, h] = queue[head++];

    // If we reached the bottom-right corner with positive health, we found a safe path
    if (r === m - 1 && c === n - 1) {
      return true;
    }

    // If we've already found a path to (r, c) with more health, skip this state
    if (h < maxHealth[r][c]) {
      continue;
    }

    for (let i = 0; i < 4; i++) {
      const nr = r + dirs[i][0];
      const nc = c + dirs[i][1];

      if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
        const nh = h - grid[nr][nc];

        // We only traverse to the next cell if we can reach it with positive health
        // and it yields a strictly better health state than previously found
        if (nh > 0 && nh > maxHealth[nr][nc]) {
          maxHealth[nr][nc] = nh;
          queue.push([nr, nc, nh]);
        }
      }
    }
  }

  return false;
}

// Example usage:
const grid1 = [
  [0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0],
];
const health1 = 1;
console.log(findSafeWalk(grid1, health1)); // Output: true

const grid2 = [
  [0, 1, 1, 0, 0, 0],
  [1, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 0, 1],
  [0, 0, 1, 0, 1, 0],
];
const health2 = 3;
console.log(findSafeWalk(grid2, health2)); // Output: false

const grid3 = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];
const health3 = 5;
console.log(findSafeWalk(grid3, health3)); // Output: true
