// 3702. Longest Subsequence With Non-Zero Bitwise XOR

/**
You are given an integer array nums.

Return the length of the longest subsequence in nums whose bitwise XOR is non-zero. If no such subsequence exists, return 0.
*/

/**
Example 1:

Input: nums = [1,2,3]

Output: 2

Explanation:

One longest subsequence is [2, 3]. The bitwise XOR is computed as 2 XOR 3 = 1, which is non-zero.

Example 2:

Input: nums = [2,3,4]

Output: 3

Explanation:

The longest subsequence is [2, 3, 4]. The bitwise XOR is computed as 2 XOR 3 XOR 4 = 5, which is non-zero.
*/

/**
Constraints:

1 <= nums.length <= 105
0 <= nums[i] <= 109
*/

function longestSubsequence(nums: number[]): number {
  const n = nums.length;
  let totalXor = 0;
  let hasNonZero = false;

  for (let i = 0; i < n; i++) {
    totalXor ^= nums[i];
    if (nums[i] !== 0) {
      hasNonZero = true;
    }
  }

  // Case 1: Total XOR sum is already non-zero
  if (totalXor !== 0) {
    return n;
  }

  // Case 2: Total XOR sum is zero
  // If there's at least one non-zero element, removing it
  // results in a subsequence of length n-1 with non-zero XOR.
  if (hasNonZero) {
    return n - 1;
  }

  // Case 3: All elements are zero
  return 0;
}

// Example usage:
const nums1 = [1, 2, 3];
console.log(longestSubsequence(nums1)); // Output: 2

const nums2 = [2, 3, 4];
console.log(longestSubsequence(nums2)); // Output: 3

const nums3 = [0, 0, 0];
console.log(longestSubsequence(nums3)); // Output: 0
