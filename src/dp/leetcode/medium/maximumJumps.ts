// 2770. Maximum Number of Jumps to Reach the Last Index

/**
Example 1:

Input: nums = [1,3,6,4,1,2], target = 2
Output: 3
Explanation: To go from index 0 to index n - 1 with the maximum number of jumps, you can perform the following jumping sequence:
- Jump from index 0 to index 1. 
- Jump from index 1 to index 3.
- Jump from index 3 to index 5.
It can be proven that there is no other jumping sequence that goes from 0 to n - 1 with more than 3 jumps. Hence, the answer is 3. 
Example 2:

Input: nums = [1,3,6,4,1,2], target = 3
Output: 5
Explanation: To go from index 0 to index n - 1 with the maximum number of jumps, you can perform the following jumping sequence:
- Jump from index 0 to index 1.
- Jump from index 1 to index 2.
- Jump from index 2 to index 3.
- Jump from index 3 to index 4.
- Jump from index 4 to index 5.
It can be proven that there is no other jumping sequence that goes from 0 to n - 1 with more than 5 jumps. Hence, the answer is 5. 
Example 3:

Input: nums = [1,3,6,4,1,2], target = 0
Output: -1
Explanation: It can be proven that there is no jumping sequence that goes from 0 to n - 1. Hence, the answer is -1. 
*/

function maximumJumps(nums: number[], target: number): number {
  const n = nums.length;

  // dp[i] will store the maximum number of jumps to reach index i.
  // Initialize with -1 to indicate unreachable states.
  const dp = new Int32Array(n).fill(-1);

  // Base case: it takes 0 jumps to be at the starting position
  dp[0] = 0;

  // Iterate through all indices to populate the DP table
  for (let i = 1; i < n; i++) {
    let maxJumps = -1;

    // Check all previous indices to see if we can jump to the current index 'i'
    for (let j = 0; j < i; j++) {
      // Check if 'j' is reachable and the jump is within the allowed target
      if (dp[j] !== -1 && Math.abs(nums[i] - nums[j]) <= target) {
        if (dp[j] + 1 > maxJumps) {
          maxJumps = dp[j] + 1;
        }
      }
    }

    dp[i] = maxJumps;
  }

  // Return the max jumps to the last index, which stays -1 if unreachable
  return dp[n - 1];
}

// Example usage:
console.log(maximumJumps([1, 3, 6, 4, 1, 2], 2)); // Output: 3
console.log(maximumJumps([1, 3, 6, 4, 1, 2], 3)); // Output: 5
console.log(maximumJumps([1, 3, 6, 4, 1, 2], 0)); // Output: -1
