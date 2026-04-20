// 2401. Longest Nice Subarray

/**
Example 1:

Input: nums = [1,3,8,48,10]
Output: 3
Explanation: The longest nice subarray is [3,8,48]. This subarray satisfies the conditions:
- 3 AND 8 = 0.
- 3 AND 48 = 0.
- 8 AND 48 = 0.
It can be proven that no longer nice subarray can be obtained, so we return 3.
Example 2:

Input: nums = [3,1,5,11,13]
Output: 1
Explanation: The length of the longest nice subarray is 1. Any subarray of length 1 can be chosen.
*/

const longestNiceSubarray = function (nums: number[]): number {
  let maxLen = 0;
  let current_or = 0;
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    // While the new element shares a set bit with the current valid window
    while ((current_or & nums[right]) !== 0) {
      // Remove the leftmost element's bits from our window's cumulative OR
      current_or ^= nums[left];
      left++;
    }

    // Add the new element's bits to our cumulative OR
    current_or |= nums[right];

    // Update the maximum length found so far
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
};

// Example usage:
console.log(longestNiceSubarray([1, 3, 8, 48, 10])); // Output: 3
console.log(longestNiceSubarray([3, 1, 5, 11, 13])); // Output: 1
