// 1391. Check if There is a Valid Path in a Grid

/**
Example 1:


Input: grid = [[2,4,3],[6,5,2]]
Output: true
Explanation: As shown you can start at cell (0, 0) and visit all the cells of the grid to reach (m - 1, n - 1).
Example 2:


Input: grid = [[1,2,1],[1,2,1]]
Output: false
Explanation: As shown you the street at cell (0, 0) is not connected with any street of any other cell and you will get stuck at cell (0, 0)
Example 3:

Input: grid = [[1,1,2]]
Output: false
Explanation: You will get stuck at cell (0, 1) and you cannot reach cell (0, 2).
*/

function hasValidPath(grid: number[][]): boolean {
  const m = grid.length;
  const n = grid[0].length;

  // If the grid consists of a single cell, we are already at the destination.
  if (m === 1 && n === 1) return true;

  const visited = new Uint8Array(m * n);
  const queue = new Int32Array(m * n);

  let head = 0;
  let tail = 0;

  // Initialize starting position
  queue[tail++] = 0; // Coordinates flattened: 0 * n + 0
  visited[0] = 1;

  while (head < tail) {
    const curr = queue[head++];
    const r = (curr / n) | 0; // Bitwise OR 0 computes integer division effectively
    const c = curr % n;
    const type = grid[r][c];

    // Check moving UP
    if (type === 2 || type === 5 || type === 6) {
      const nr = r - 1;
      if (nr >= 0) {
        const nextIdx = nr * n + c;
        if (visited[nextIdx] === 0) {
          const destType = grid[nr][c];
          // Valid pipes to receive a connection coming from the bottom
          if (destType === 2 || destType === 3 || destType === 4) {
            if (nr === m - 1 && c === n - 1) return true;
            visited[nextIdx] = 1;
            queue[tail++] = nextIdx;
          }
        }
      }
    }

    // Check moving DOWN
    if (type === 2 || type === 3 || type === 4) {
      const nr = r + 1;
      if (nr < m) {
        const nextIdx = nr * n + c;
        if (visited[nextIdx] === 0) {
          const destType = grid[nr][c];
          // Valid pipes to receive a connection coming from the top
          if (destType === 2 || destType === 5 || destType === 6) {
            if (nr === m - 1 && c === n - 1) return true;
            visited[nextIdx] = 1;
            queue[tail++] = nextIdx;
          }
        }
      }
    }

    // Check moving LEFT
    if (type === 1 || type === 3 || type === 5) {
      const nc = c - 1;
      if (nc >= 0) {
        const nextIdx = r * n + nc;
        if (visited[nextIdx] === 0) {
          const destType = grid[r][nc];
          // Valid pipes to receive a connection coming from the right
          if (destType === 1 || destType === 4 || destType === 6) {
            if (r === m - 1 && nc === n - 1) return true;
            visited[nextIdx] = 1;
            queue[tail++] = nextIdx;
          }
        }
      }
    }

    // Check moving RIGHT
    if (type === 1 || type === 4 || type === 6) {
      const nc = c + 1;
      if (nc < n) {
        const nextIdx = r * n + nc;
        if (visited[nextIdx] === 0) {
          const destType = grid[r][nc];
          // Valid pipes to receive a connection coming from the left
          if (destType === 1 || destType === 3 || destType === 5) {
            if (r === m - 1 && nc === n - 1) return true;
            visited[nextIdx] = 1;
            queue[tail++] = nextIdx;
          }
        }
      }
    }
  }

  // Fails to route to (m - 1, n - 1)
  return false;
}

// Example usage:
const grid1 = [
  [2, 4, 3],
  [6, 5, 2],
];
console.log(hasValidPath(grid1)); // Output: true

const grid2 = [
  [1, 2, 1],
  [1, 2, 1],
];
console.log(hasValidPath(grid2)); // Output: false

const grid3 = [[1, 1, 2]];
console.log(hasValidPath(grid3)); // Output: false
