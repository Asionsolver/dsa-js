// 2435. Paths in Matrix Whose Sum Is Divisible by K

/**
Example 1:


Input: grid = [[5,2,4],[3,0,5],[0,7,2]], k = 3
Output: 2
Explanation: There are two paths where the sum of the elements on the path is divisible by k.
The first path highlighted in red has a sum of 5 + 2 + 4 + 5 + 2 = 18 which is divisible by 3.
The second path highlighted in blue has a sum of 5 + 3 + 0 + 5 + 2 = 15 which is divisible by 3.
Example 2:


Input: grid = [[0,0]], k = 5
Output: 1
Explanation: The path highlighted in red has a sum of 0 + 0 = 0 which is divisible by 5.
Example 3:


Input: grid = [[7,3,4,9],[2,3,6,2],[2,3,7,0]], k = 1
Output: 10
Explanation: Every integer is divisible by 1 so the sum of the elements on every possible path is divisible by k.
*/
const grid = [
    [5, 2, 4],
    [3, 0, 5],
    [0, 7, 2],
  ],
  k = 3;
const numberOfPaths = function (grid: number[][], k: number) {
  const MOD = 1_000_000_007;
  const m = grid.length;
  const n = grid[0].length;

  // dp[i][j][rem] stores the number of paths to grid[i][j]
  // where the sum of elements along the path % k === rem.
  const dp: number[][][] = new Array(m);
  for (let i = 0; i < m; i++) {
    dp[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      dp[i][j] = new Array(k).fill(0);
    }
  }

  // Base Case: Initialize the starting position
  dp[0][0][grid[0][0] % k] = 1;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // Skip the starting cell as it is already initialized
      if (i === 0 && j === 0) continue;

      const currentVal = grid[i][j] % k;

      // Iterate through all possible remainders (0 to k-1) from previous steps
      for (let prevRem = 0; prevRem < k; prevRem++) {
        let paths = 0;

        // Add paths coming from the top neighbor (i-1, j)
        if (i > 0) {
          paths = (paths + dp[i - 1][j][prevRem]) % MOD;
        }

        // Add paths coming from the left neighbor (i, j-1)
        if (j > 0) {
          paths = (paths + dp[i][j - 1][prevRem]) % MOD;
        }

        // If there are valid paths from neighbors with remainder 'prevRem',
        // update the current cell's count for the new remainder.
        if (paths > 0) {
          const newRem = (prevRem + currentVal) % k;
          dp[i][j][newRem] = paths;
        }
      }
    }
  }

  // Return the number of paths reaching the bottom-right corner with a sum divisible by k
  return dp[m - 1][n - 1][0];
};
console.log(numberOfPaths(grid, k));
