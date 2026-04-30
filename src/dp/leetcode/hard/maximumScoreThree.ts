// 1770. Maximum Score from Performing Multiplication Operations

/**
Example 1:

Input: nums = [1,2,3], multipliers = [3,2,1]
Output: 14
Explanation: An optimal solution is as follows:
- Choose from the end, [1,2,3], adding 3 * 3 = 9 to the score.
- Choose from the end, [1,2], adding 2 * 2 = 4 to the score.
- Choose from the end, [1], adding 1 * 1 = 1 to the score.
The total score is 9 + 4 + 1 = 14.
Example 2:

Input: nums = [-5,-3,-3,-2,7,1], multipliers = [-10,-5,3,4,6]
Output: 102
Explanation: An optimal solution is as follows:
- Choose from the start, [-5,-3,-3,-2,7,1], adding -5 * -10 = 50 to the score.
- Choose from the start, [-3,-3,-2,7,1], adding -3 * -5 = 15 to the score.
- Choose from the start, [-3,-2,7,1], adding -3 * 3 = -9 to the score.
- Choose from the end, [-2,7,1], adding 1 * 4 = 4 to the score.
- Choose from the end, [-2,7], adding 7 * 6 = 42 to the score. 
The total score is 50 + 15 - 9 + 4 + 42 = 102.

*/

function maximumScore(nums: number[], multipliers: number[]): number {
  const n = nums.length;
  const m = multipliers.length;

  // dp[i] represents the maximum score we can get for the remaining operations
  // if we have already picked i elements from the start.
  const dp = new Int32Array(m + 1);

  // We work backwards from the last operation down to the first operation
  for (let op = m - 1; op >= 0; op--) {
    const mult = multipliers[op];

    // i represents the number of elements we've picked from the left side so far
    for (let i = 0; i <= op; i++) {
      // Option 1: Pick the current available element from the start (left)
      const pickLeft = nums[i] * mult + dp[i + 1];

      // Option 2: Pick the current available element from the end (right)
      // The number of elements picked from the right is (op - i).
      // Therefore, the index of the rightmost available element is n - 1 - (op - i).
      const pickRight = nums[n - 1 - (op - i)] * mult + dp[i];

      // Store the maximum of both choices
      // Ternary operator is marginally faster than Math.max in tight loops
      dp[i] = pickLeft > pickRight ? pickLeft : pickRight;
    }
  }

  // dp[0] will hold the maximum score starting from 0 operations and 0 left-picks
  return dp[0];
}

// Example usage:
console.log(maximumScore([1, 2, 3], [3, 2, 1])); // Output: 14
console.log(maximumScore([-5, -3, -3, -2, 7, 1], [-10, -5, 3, 4, 6])); // Output: 102
