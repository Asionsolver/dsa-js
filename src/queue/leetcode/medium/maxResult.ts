// 1696. Jump Game VI

/**
Example 1:

Input: nums = [1,-1,-2,4,-7,3], k = 2
Output: 7
Explanation: You can choose your jumps forming the subsequence [1,-1,4,3] (underlined above). The sum is 7.
Example 2:

Input: nums = [10,-5,-2,4,0,3], k = 3
Output: 17
Explanation: You can choose your jumps forming the subsequence [10,4,3] (underlined above). The sum is 17.
Example 3:

Input: nums = [1,-5,-20,4,-1,3,-6,-3], k = 2
Output: 0
*/

function maxResult(nums: number[], k: number): number {
  const n = nums.length;

  // dp[i] stores the maximum score to reach index i
  // Using Int32Array strictly limits memory allocation granting high speed and efficiency
  const dp = new Int32Array(n);
  dp[0] = nums[0];

  // Deque stores the indices of the dp array.
  // It maintains the indices in decreasing order of their respective dp values.
  const dq = new Int32Array(n);
  let head = 0;
  let tail = 0;

  dq[tail++] = 0;

  for (let i = 1; i < n; i++) {
    // 1. Remove the index from the front if it's out of the current jump window [i-k, i-1]
    if (dq[head] < i - k) {
      head++;
    }

    // 2. The maximum valid value we can jump from is at the front of the deque
    dp[i] = nums[i] + dp[dq[head]];

    // 3. Maintain the monotonic property:
    // Remove indices from the back if their dp values are lesser than or equal to the current dp[i]
    while (head < tail && dp[dq[tail - 1]] <= dp[i]) {
      tail--;
    }

    // 4. Add the current index to the back of the deque
    dq[tail++] = i;
  }

  return dp[n - 1];
}

// Test cases
console.log(maxResult([1, -1, -2, 4, -7, 3], 2)); // Output: 7
console.log(maxResult([10, -5, -2, 4, 0, 3], 3)); // Output: 17
console.log(maxResult([1, -5, -20, 4, -1, 3, -6, -3], 2)); // Output: 0
