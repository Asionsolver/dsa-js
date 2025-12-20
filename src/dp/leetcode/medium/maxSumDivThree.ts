// 1262. Greatest Sum Divisible by Three

/**
Example 1:

Input: nums = [3,6,5,1,8]
Output: 18
Explanation: Pick numbers 3, 6, 1 and 8 their sum is 18 (maximum sum divisible by 3).
Example 2:

Input: nums = [4]
Output: 0
Explanation: Since 4 is not divisible by 3, do not pick any number.
Example 3:

Input: nums = [1,2,3,4,4]
Output: 12
Explanation: Pick numbers 1, 3, 4 and 4 their sum is 12 (maximum sum divisible by 3).

*/
const nums = [3, 6, 5, 1, 8];

const maxSumDivThree = function (nums: number[]) {
  // dp[i] will store the maximum sum such that sum % 3 == i
  // Initialized with 0 for remainder 0, and -Infinity for others
  let dp: number[] = [0, -Infinity, -Infinity];

  for (const num of nums) {
    // Create a copy of the current DP state to calculate transitions
    const nextDp = [...dp];

    for (const currentSum of dp) {
      // Skip sums that haven't been reached yet
      if (currentSum === -Infinity) continue;

      const newSum = currentSum + num;
      const remainder = newSum % 3;

      // Update the temporary DP state with the maximum possible sum for this remainder
      nextDp[remainder] = Math.max(nextDp[remainder], newSum);
    }

    // Move to the next state
    dp = nextDp;
  }

  return dp[0];
};
console.log(maxSumDivThree(nums));
