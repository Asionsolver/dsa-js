// 877. Stone Game

/**

Example 1:

Input: piles = [5,3,4,5]
Output: true
Explanation: 
Alice starts first, and can only take the first 5 or the last 5.
Say she takes the first 5, so that the row becomes [3, 4, 5].
If Bob takes 3, then the board is [4, 5], and Alice takes 5 to win with 10 points.
If Bob takes the last 5, then the board is [3, 4], and Alice takes 4 to win with 9 points.
This demonstrated that taking the first 5 was a winning move for Alice, so we return true.
Example 2:

Input: piles = [3,7,2,3]
Output: true
*/

function stoneGame(piles: number[]): boolean {
  const n = piles.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));

  // Base case: Only one pile left, the current player must take it.
  for (let i = 0; i < n; i++) {
    dp[i][i] = piles[i];
  }

  // Solve for subproblems of increasing lengths
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      dp[i][j] = Math.max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1]);
    }
  }

  // If Alice's score advantage is greater than 0, she wins.
  return dp[0][n - 1] > 0;
}

// Example usage:
const piles1 = [5, 3, 4, 5];
console.log(stoneGame(piles1)); // Output: true

const piles2 = [3, 7, 2, 3];
console.log(stoneGame(piles2)); // Output: true
