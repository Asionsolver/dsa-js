// 3418. Maximum Amount of Money Robot Can Earn

/**
Example 1:

Input: coins = [[0,1,-1],[1,-2,3],[2,-3,4]]

Output: 8

Explanation:

An optimal path for maximum coins is:

Start at (0, 0) with 0 coins (total coins = 0).
Move to (0, 1), gaining 1 coin (total coins = 0 + 1 = 1).
Move to (1, 1), where there's a robber stealing 2 coins. The robot uses one neutralization here, avoiding the robbery (total coins = 1).
Move to (1, 2), gaining 3 coins (total coins = 1 + 3 = 4).
Move to (2, 2), gaining 4 coins (total coins = 4 + 4 = 8).
Example 2:

Input: coins = [[10,10,10],[10,10,10]]

Output: 40

Explanation:

An optimal path for maximum coins is:

Start at (0, 0) with 10 coins (total coins = 10).
Move to (0, 1), gaining 10 coins (total coins = 10 + 10 = 20).
Move to (0, 2), gaining another 10 coins (total coins = 20 + 10 = 30).
Move to (1, 2), gaining the final 10 coins (total coins = 30 + 10 = 40).
*/

const coins = [
  [0, 1, -1],
  [1, -2, 3],
  [2, -3, 4],
];

const maximumAmount = function (coins: number[][]): number {
  const m = coins.length;
  const n = coins[0].length;

  // A sufficiently small number to represent an invalid state.
  // Minimum possible score is roughly around -1,000,000.
  const MIN_VAL = -1e16;

  // We only need the previous row to calculate the current row, saving memory.
  let prev = Array.from({ length: n }, () => [MIN_VAL, MIN_VAL, MIN_VAL]);

  for (let i = 0; i < m; i++) {
    let curr = Array.from({ length: n }, () => [MIN_VAL, MIN_VAL, MIN_VAL]);

    for (let j = 0; j < n; j++) {
      // Base case: Starting Cell
      if (i === 0 && j === 0) {
        curr[j][0] = coins[i][j];
        if (coins[i][j] < 0) {
          curr[j][1] = 0;
        }
        continue;
      }

      for (let k = 0; k < 3; k++) {
        let best_prev = MIN_VAL;

        // Compare coming from the top vs. from the left
        if (i > 0) best_prev = Math.max(best_prev, prev[j][k]);
        if (j > 0) best_prev = Math.max(best_prev, curr[j - 1][k]);

        // Option 1: Do not use neutralization on the current cell
        if (best_prev !== MIN_VAL) {
          curr[j][k] = best_prev + coins[i][j];
        }

        // Option 2: Use neutralization on the current cell (Only applicable if it's a robber)
        if (coins[i][j] < 0 && k > 0) {
          let best_prev_k1 = MIN_VAL;

          // Best state with k-1 neutralizations used prior to this cell
          if (i > 0) best_prev_k1 = Math.max(best_prev_k1, prev[j][k - 1]);
          if (j > 0) best_prev_k1 = Math.max(best_prev_k1, curr[j - 1][k - 1]);

          if (best_prev_k1 !== MIN_VAL) {
            curr[j][k] = Math.max(curr[j][k], best_prev_k1);
          }
        }
      }
    }

    // Move to the next row
    prev = curr;
  }

  // The answer is the maximum value reaching the bottom-right corner across all 3 'k' possibilities
  return Math.max(prev[n - 1][0], prev[n - 1][1], prev[n - 1][2]);
};

console.log(maximumAmount(coins));
