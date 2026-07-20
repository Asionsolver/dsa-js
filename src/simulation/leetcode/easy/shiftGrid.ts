// 1260. Shift 2D Grid

/**
Example 1:


Input: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 1
Output: [[9,1,2],[3,4,5],[6,7,8]]
Example 2:


Input: grid = [[3,8,1,9],[19,7,2,5],[4,6,11,10],[12,0,21,13]], k = 4
Output: [[12,0,21,13],[3,8,1,9],[19,7,2,5],[4,6,11,10]]
Example 3:

Input: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 9
Output: [[1,2,3],[4,5,6],[7,8,9]]

*/

function shiftGrid(grid: number[][], k: number): number[][] {
  const m = grid.length;
  const n = grid[0].length;
  const N = m * n;

  // Create the output grid filled with placeholder values
  const result: number[][] = Array.from({ length: m }, () => Array(n).fill(0));

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      const oldIndex = r * n + c;
      const newIndex = (oldIndex + k) % N;

      const newR = Math.floor(newIndex / n);
      const newC = newIndex % n;

      result[newR][newC] = grid[r][c];
    }
  }

  return result;
}

// Example Usages
console.log(
  shiftGrid(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    1,
  ),
); // [[9,1,2],[3,4,5],[6,7,8]]
console.log(
  shiftGrid(
    [
      [3, 8, 1, 9],
      [19, 7, 2, 5],
      [4, 6, 11, 10],
      [12, 0, 21, 13],
    ],
    4,
  ),
); // [[12,0,21,13],[3,8,1,9],[19,7,2,5],[4,6,11,10]]
console.log(
  shiftGrid(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    9,
  ),
); // [[1,2,3],[4,5,6],[7,8,9]]
