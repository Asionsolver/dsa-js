// 3381. Maximum Subarray Sum With Length Divisible by K

/**
Example 1:

Input: nums = [1,2], k = 1

Output: 3

Explanation:

The subarray [1, 2] with sum 3 has length equal to 2 which is divisible by 1.

Example 2:

Input: nums = [-1,-2,-3,-4,-5], k = 4

Output: -10

Explanation:

The maximum sum subarray is [-1, -2, -3, -4] which has length equal to 4 which is divisible by 4.

Example 3:

Input: nums = [-5,1,2,-3,4], k = 2

Output: 4

Explanation:

The maximum sum subarray is [1, 2, -3, 4] which has length equal to 4 which is divisible by 2.


*/
const nums = [-5, 1, 2, -3, 4],
  k = 2;
const maxSubarraySum = function (nums: number[], k: number): number {
  const n = nums.length;
  // minPrefix[r] stores the minimum prefix sum encountered so far
  // where the number of elements in that prefix is congruent to r modulo k.
  const minPrefix: number[] = new Array(k).fill(Infinity);

  let currentPrefixSum = 0;
  let maxSum = -Infinity;

  // Base case: A prefix sum of 0 elements has length 0, and 0 % k == 0.
  minPrefix[0] = 0;

  for (let i = 0; i < n; i++) {
    currentPrefixSum += nums[i];
    const remainder = (i + 1) % k;

    // If we have previously found a prefix sum with the same remainder,
    // it means the distance between that index and current index is a multiple of k.
    if (minPrefix[remainder] !== Infinity) {
      maxSum = Math.max(maxSum, currentPrefixSum - minPrefix[remainder]);
    }

    // Update the minimum prefix sum for this specific remainder
    if (currentPrefixSum < minPrefix[remainder]) {
      minPrefix[remainder] = currentPrefixSum;
    }
  }

  return maxSum;
};

console.log(maxSubarraySum(nums, k));
