// 1594. Maximum Non Negative Product in a Matrix

/**
Example 1:


Input: grid = [[-1,-2,-3],[-2,-3,-3],[-3,-3,-2]]
Output: -1
Explanation: It is not possible to get non-negative product in the path from (0, 0) to (2, 2), so return -1.
Example 2:


Input: grid = [[1,-2,1],[1,-2,1],[3,-4,1]]
Output: 8
Explanation: Maximum non-negative product is shown (1 * 1 * -2 * -4 * 1 = 8).
Example 3:


Input: grid = [[1,3],[0,-4]]
Output: 0
Explanation: Maximum non-negative product is shown (1 * 0 * -4 = 0).
*/
const grid = [
  [1, -2, 1],
  [1, -2, 1],
  [3, -4, 1],
];

const maxProductPath = function (grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  // Using BigInt due to the max possible product 4^29 going over JS's double-precision max safe integer
  const max_prod: bigint[] = new Array(n).fill(0n);
  const min_prod: bigint[] = new Array(n).fill(0n);

  // Initialize the starting positions
  max_prod[0] = BigInt(grid[0][0]);
  min_prod[0] = BigInt(grid[0][0]);

  // Seed the first row values (Can only come from the left)
  for (let j = 1; j < n; j++) {
    const val = BigInt(grid[0][j]);
    max_prod[j] = max_prod[j - 1] * val;
    min_prod[j] = min_prod[j - 1] * val;
  }

  for (let i = 1; i < m; i++) {
    // Evaluate the first column of the current row (Can only come from above)
    const val0 = BigInt(grid[i][0]);
    max_prod[0] = max_prod[0] * val0;
    min_prod[0] = max_prod[0]; // min and max are guaranteed to be the same here

    // Loop through the rest of the columns considering both coming from the Left & Above
    for (let j = 1; j < n; j++) {
      const val = BigInt(grid[i][j]);

      // `max_prod[j]` and `min_prod[j]` still hold the previous row's (Above) evaluations at this column.
      const p1 = max_prod[j] * val;
      const p2 = min_prod[j] * val;
      // `max_prod[j-1]` and `min_prod[j-1]` hold the current row's (Left) evaluations.
      const p3 = max_prod[j - 1] * val;
      const p4 = min_prod[j - 1] * val;

      // Extract the Local Maxes
      let max_val = p1;
      if (p2 > max_val) max_val = p2;
      if (p3 > max_val) max_val = p3;
      if (p4 > max_val) max_val = p4;

      // Extract the Local Mins
      let min_val = p1;
      if (p2 < min_val) min_val = p2;
      if (p3 < min_val) min_val = p3;
      if (p4 < min_val) min_val = p4;

      max_prod[j] = max_val;
      min_prod[j] = min_val;
    }
  }

  const ans = max_prod[n - 1];

  // Enforcing our expected condition boundaries
  if (ans < 0n) return -1;
  return Number(ans % 1000000007n);
};

console.log(maxProductPath(grid));
