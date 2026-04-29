// 3225. Maximum Score From Grid Operations

/**
Example 1:

Input: grid = [[0,0,0,0,0],[0,0,3,0,0],[0,1,0,0,0],[5,0,0,3,0],[0,0,0,0,2]]

Output: 11

Explanation:


In the first operation, we color all cells in column 1 down to row 3, and in the second operation, we color all cells in column 4 down to the last row. The score of the resulting grid is grid[3][0] + grid[1][2] + grid[3][3] which is equal to 11.

Example 2:

Input: grid = [[10,9,0,0,15],[7,1,0,8,0],[5,20,0,11,0],[0,0,0,1,2],[8,12,1,10,3]]

Output: 94

Explanation:


We perform operations on 1, 2, and 3 down to rows 1, 4, and 0, respectively. The score of the resulting grid is grid[0][0] + grid[1][0] + grid[2][1] + grid[4][1] + grid[1][3] + grid[2][3] + grid[3][3] + grid[4][3] + grid[0][4] which is equal to 94.
*/

function maximumScore(grid: number[][]): number {
  const n = grid.length;
  // Edge case: A 1x1 grid can never have a horizontally adjacent black cell for any valid white cell
  if (n === 1) return 0;

  // Prefix sums to query contiguous column ranges optimally in O(1) time
  // pref[j][i] will store the sum of grid[0...i-1][j]
  const pref = Array.from({ length: n }, () => new Float64Array(n + 1));
  for (let j = 0; j < n; j++) {
    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += grid[i][j];
      pref[j][i + 1] = sum;
    }
  }

  // Utilizing pre-allocated Float64Arrays for GC friendliness & memory cache hits
  let dp1 = Array.from({ length: n + 1 }, () => new Float64Array(n + 1));
  let dp2 = Array.from({ length: n + 1 }, () => new Float64Array(n + 1));
  let old_dp = dp1;
  let new_dp = dp2;

  // Initialization for column 0 (j = 0)
  for (let c0 = 0; c0 <= n; c0++) {
    for (let c1 = 0; c1 <= n; c1++) {
      old_dp[c0][c1] = c0 >= c1 ? 0 : pref[0][c1] - pref[0][c0];
    }
  }

  let P = new Float64Array(n + 1);
  let Q = new Float64Array(n + 1);

  // Dynamic Programming processing column blocks (j = 1 up to n - 2)
  for (let j = 1; j <= n - 2; j++) {
    for (let y = 0; y <= n; y++) {
      let max_val = 0;
      // P[z] keeps track of max_{x <= z} dp[x][y]
      for (let x = 0; x <= n; x++) {
        if (old_dp[x][y] > max_val) max_val = old_dp[x][y];
        P[x] = max_val;
      }

      let max_q = 0;
      // Q[z] keeps track of max_{x > z} (dp[x][y] + sum(y to x-1 in col j))
      for (let x = n; x >= 0; x--) {
        Q[x] = max_q;
        let score = old_dp[x][y] + (y >= x ? 0 : pref[j][x] - pref[j][y]);
        if (score > max_q) max_q = score;
      }

      for (let z = 0; z <= n; z++) {
        let score1 = P[z] + (y >= z ? 0 : pref[j][z] - pref[j][y]);
        let score2 = Q[z];
        new_dp[y][z] = score1 > score2 ? score1 : score2;
      }
    }

    // Swap reference references cleanly to advance onto the next iteration block
    let temp = old_dp;
    old_dp = new_dp;
    new_dp = temp;
  }

  // Final computations for the final column (j = n - 1) resolving c_n = 0
  let ans = 0;
  for (let x = 0; x <= n; x++) {
    for (let y = 0; y <= n; y++) {
      let score = old_dp[x][y] + (y >= x ? 0 : pref[n - 1][x] - pref[n - 1][y]);
      if (score > ans) ans = score;
    }
  }

  return ans;
}

// Example test cases
console.log(
  maximumScore([
    [0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0],
    [0, 1, 0, 0, 0],
    [5, 0, 0, 3, 0],
    [0, 0, 0, 0, 2],
  ]),
); // Output: 11

console.log(
  maximumScore([
    [10, 9, 0, 0, 15],
    [7, 1, 0, 8, 0],
    [5, 20, 0, 11, 0],
    [0, 0, 0, 1, 2],
    [8, 12, 1, 10, 3],
  ]),
); // Output: 94
