// 1914. Cyclically Rotating a Grid

/**
Example 1:


Input: grid = [[40,10],[30,20]], k = 1
Output: [[10,20],[40,30]]
Explanation: The figures above represent the grid at every state.
Example 2:


Input: grid = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]], k = 2
Output: [[3,4,8,12],[2,11,10,16],[1,7,6,15],[5,9,13,14]]
Explanation: The figures above represent the grid at every state.
*/

function rotateGrid(grid: number[][], k: number): number[][] {
  const m = grid.length;
  const n = grid[0].length;
  const numLayers = Math.floor(Math.min(m, n) / 2);

  // Process each concentric layer individually
  for (let l = 0; l < numLayers; l++) {
    const top = l;
    const bottom = m - 1 - l;
    const left = l;
    const right = n - 1 - l;

    const pos: number[][] = [];
    const vals: number[] = [];

    // Traverse the left edge (top to bottom-1)
    for (let r = top; r < bottom; r++) {
      pos.push([r, left]);
      vals.push(grid[r][left]);
    }
    // Traverse the bottom edge (left to right-1)
    for (let c = left; c < right; c++) {
      pos.push([bottom, c]);
      vals.push(grid[bottom][c]);
    }
    // Traverse the right edge (bottom to top+1)
    for (let r = bottom; r > top; r--) {
      pos.push([r, right]);
      vals.push(grid[r][right]);
    }
    // Traverse the top edge (right to left+1)
    for (let c = right; c > left; c--) {
      pos.push([top, c]);
      vals.push(grid[top][c]);
    }

    const L = pos.length;
    // Optimize the number of rotations to bypass redundant full cycles
    const s = k % L;

    // Apply the shifted values directly to the matrix in-place
    for (let i = 0; i < L; i++) {
      const [r, c] = pos[(i + s) % L];
      grid[r][c] = vals[i];
    }
  }

  return grid;
}

// Test cases
console.log(
  rotateGrid(
    [
      [40, 10],
      [30, 20],
    ],
    1,
  ),
); // Output: [[10,20],[40,30]]

console.log(
  rotateGrid(
    [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ],
    2,
  ),
); // Output: [[3,4,8,12],[2,11,10,16],[1,7,6,15],[5,9,13,14]]
