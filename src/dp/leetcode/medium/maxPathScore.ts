// 3742. Maximum Path Score in a Grid

/**
Example 1:

Input: grid = [[0, 1],[2, 0]], k = 1

Output: 2

Explanation:​​​​​​​

The optimal path is:

Cell	grid[i][j]	Score	Total
Score	Cost	Total
Cost
(0, 0)	0	0	0	0	0
(1, 0)	2	2	2	1	1
(1, 1)	0	0	2	0	1
Thus, the maximum possible score is 2.

Example 2:

Input: grid = [[0, 1],[1, 2]], k = 1

Output: -1

Explanation:

There is no path that reaches cell (1, 1)​​​​​​​ without exceeding cost k. Thus, the answer is -1.
*/

function maximumPathScore(grid: number[][], k: number): number {
  const m = grid.length;
  if (m === 0) return 0;
  const n = grid[0].length;

  // The maximum possible cost a path can incur is bounded by the path's length
  const K = Math.min(k, m + n - 1);

  // Using Int32Array arrays to ensure cache locality and best performance
  let prev_dp = Array.from({ length: n }, () => new Int32Array(K + 1).fill(-1));
  let curr_dp = Array.from({ length: n }, () => new Int32Array(K + 1).fill(-1));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // Base case initialization for the starting position (0, 0)
      if (i === 0 && j === 0) {
        curr_dp[0][0] = 0;
        continue;
      }

      const target_dp = curr_dp[j];
      target_dp.fill(-1); // Reset current cell's states

      const cell_c = grid[i][j] === 0 ? 0 : 1;
      const cell_s = grid[i][j];
      const limit = K - cell_c;

      // 1. Transition coming from the Top Cell
      if (i > 0) {
        const top_dp = prev_dp[j];
        for (let c = 0; c <= limit; c++) {
          const val = top_dp[c];
          if (val !== -1) {
            const new_s = val + cell_s;
            const next_c = c + cell_c;
            if (new_s > target_dp[next_c]) {
              target_dp[next_c] = new_s;
            }
          }
        }
      }

      // 2. Transition coming from the Left Cell
      if (j > 0) {
        const left_dp = curr_dp[j - 1];
        for (let c = 0; c <= limit; c++) {
          const val = left_dp[c];
          if (val !== -1) {
            const new_s = val + cell_s;
            const next_c = c + cell_c;
            if (new_s > target_dp[next_c]) {
              target_dp[next_c] = new_s;
            }
          }
        }
      }
    }

    // Swap rolling arrays (prev_dp captures finished current row iteration)
    const temp = prev_dp;
    prev_dp = curr_dp;
    curr_dp = temp;
  }

  let max_score = -1;
  // prev_dp currently houses the completely finished state values of the last traversed row
  const final_dp = prev_dp[n - 1];

  // Find the maximum score achievable for cost matching the constraints
  for (let c = 0; c <= K; c++) {
    if (final_dp[c] > max_score) {
      max_score = final_dp[c];
    }
  }

  return max_score;
}

// Example usage:
const grid1 = [
  [0, 1],
  [2, 0],
];
const k1 = 1;
console.log(maximumPathScore(grid1, k1)); // Output: 2

const grid2 = [
  [0, 1],
  [1, 2],
];
const k2 = 1;
console.log(maximumPathScore(grid2, k2)); // Output: -1
