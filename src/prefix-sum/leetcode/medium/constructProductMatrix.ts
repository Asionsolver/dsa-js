// 2906. Construct Product Matrix

/**
Example 1:

Input: grid = [[1,2],[3,4]]
Output: [[24,12],[8,6]]
Explanation: p[0][0] = grid[0][1] * grid[1][0] * grid[1][1] = 2 * 3 * 4 = 24
p[0][1] = grid[0][0] * grid[1][0] * grid[1][1] = 1 * 3 * 4 = 12
p[1][0] = grid[0][0] * grid[0][1] * grid[1][1] = 1 * 2 * 4 = 8
p[1][1] = grid[0][0] * grid[0][1] * grid[1][0] = 1 * 2 * 3 = 6
So the answer is [[24,12],[8,6]].
Example 2:

Input: grid = [[12345],[2],[1]]
Output: [[2],[0],[0]]
Explanation: p[0][0] = grid[0][1] * grid[0][2] = 2 * 1 = 2.
p[0][1] = grid[0][0] * grid[0][2] = 12345 * 1 = 12345. 12345 % 12345 = 0. So p[0][1] = 0.
p[0][2] = grid[0][0] * grid[0][1] = 12345 * 2 = 24690. 24690 % 12345 = 0. So p[0][2] = 0.
So the answer is [[2],[0],[0]].

*/

const grid = [
  [1, 2],
  [3, 4],
];

const constructProductMatrix = function (grid: number[][]): number[][] {
  const n = grid.length;
  const m = grid[0].length;
  const MOD = 12345;

  // Initialize the resultant grid `p` with the same dimensions
  const p: number[][] = [];
  for (let i = 0; i < n; i++) {
    p.push(new Array(m));
  }

  // Forward Pass: Compute prefix products
  let pref = 1;
  for (let i = 0; i < n; i++) {
    const rowGrid = grid[i];
    const rowP = p[i];
    for (let j = 0; j < m; j++) {
      rowP[j] = pref;
      pref = (pref * (rowGrid[j] % MOD)) % MOD;
    }
  }

  // Backward Pass: Compute suffix products and multiply them with the prefixes
  let suff = 1;
  for (let i = n - 1; i >= 0; i--) {
    const rowGrid = grid[i];
    const rowP = p[i];
    for (let j = m - 1; j >= 0; j--) {
      rowP[j] = (rowP[j] * suff) % MOD;
      suff = (suff * (rowGrid[j] % MOD)) % MOD;
    }
  }

  return p;
};

console.log(constructProductMatrix(grid));
