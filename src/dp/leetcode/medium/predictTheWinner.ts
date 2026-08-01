// 486. Predict the Winner

/**
Example 1:

Input: nums = [1,5,2]
Output: false
Explanation: Initially, player 1 can choose between 1 and 2. 
If he chooses 2 (or 1), then player 2 can choose from 1 (or 2) and 5. If player 2 chooses 5, then player 1 will be left with 1 (or 2). 
So, final score of player 1 is 1 + 2 = 3, and player 2 is 5. 
Hence, player 1 will never be the winner and you need to return false.
Example 2:

Input: nums = [1,5,233,7]
Output: true
Explanation: Player 1 first chooses 1. Then player 2 has to choose between 5 and 7. No matter which number player 2 choose, player 1 can choose 233.
Finally, player 1 has more score (234) than player 2 (12), so you need to return True representing player1 can win.
*/

function predictTheWinner(nums: number[]): boolean {
  const n = nums.length;

  // If the array has an even length, Player 1 can always win
  // by forcing Player 2 to only choose odd or even-indexed elements.
  if (n % 2 === 0) {
    return true;
  }

  // dp[j] will store the maximum relative score for subarray from i to j
  const dp: number[] = [...nums];

  // Iteratively build the DP state bottom-up
  for (let i = n - 2; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      dp[j] = Math.max(nums[i] - dp[j], nums[j] - dp[j - 1]);
    }
  }

  // If the relative score of Player 1 starting from index 0 to n-1 is >= 0, Player 1 wins.
  return dp[n - 1] >= 0;
}
