// 3105. Longest Strictly Increasing or Strictly Decreasing Subarray

/**
You are given an array of integers nums. Return the length of the longest subarray of nums which is either strictly increasing or strictly decreasing.
*/

/**
Example 1:

Input: nums = [1,4,3,3,2]

Output: 2

Explanation:

The strictly increasing subarrays of nums are [1], [2], [3], [3], [4], and [1,4].

The strictly decreasing subarrays of nums are [1], [2], [3], [3], [4], [3,2], and [4,3].

Hence, we return 2.

Example 2:

Input: nums = [3,3,3,3]

Output: 1

Explanation:

The strictly increasing subarrays of nums are [3], [3], [3], and [3].

The strictly decreasing subarrays of nums are [3], [3], [3], and [3].

Hence, we return 1.

Example 3:

Input: nums = [3,2,1]

Output: 3

Explanation:

The strictly increasing subarrays of nums are [3], [2], and [1].

The strictly decreasing subarrays of nums are [3], [2], [1], [3,2], [2,1], and [3,2,1].

Hence, we return 3.
*/

/**
Constraints:

1 <= nums.length <= 50
1 <= nums[i] <= 50
*/

function longestMonotonicSubarray(nums: number[]): number {
  const n = nums.length;
  if (n <= 1) return n;

  let maxLength = 1;

  // Check all subarrays starting from index i.
  for (let i = 0; i < n; i++) {
    // 1. Check strictly increasing subarray starting from i.
    let incLen = 1;
    for (let j = i; j < n - 1; j++) {
      if (nums[j] < nums[j + 1]) {
        incLen++;
      } else {
        break;
      }
    }

    // 2. Check strictly decreasing subarray starting from i.
    let decLen = 1;
    for (let j = i; j < n - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        decLen++;
      } else {
        break;
      }
    }

    // Update the maximum length found so far.
    maxLength = Math.max(maxLength, incLen, decLen);
  }

  return maxLength;
}

// Example usage:
const nums1 = [1, 4, 3, 3, 2];
console.log(longestMonotonicSubarray(nums1)); // Output: 2

const nums2 = [3, 3, 3, 3];
console.log(longestMonotonicSubarray(nums2)); // Output: 1

const nums3 = [3, 2, 1];
console.log(longestMonotonicSubarray(nums3)); // Output: 3
