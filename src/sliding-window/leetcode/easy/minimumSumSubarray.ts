// 3364. Minimum Positive Sum Subarray

/**
You are given an integer array nums and two integers l and r. Your task is to find the minimum sum of a subarray whose size is between l and r (inclusive) and whose sum is greater than 0.

Return the minimum sum of such a subarray. If no such subarray exists, return -1.

A subarray is a contiguous non-empty sequence of elements within an array.
*/

/**

Example 1:

Input: nums = [3, -2, 1, 4], l = 2, r = 3

Output: 1

Explanation:

The subarrays of length between l = 2 and r = 3 where the sum is greater than 0 are:

[3, -2] with a sum of 1
[1, 4] with a sum of 5
[3, -2, 1] with a sum of 2
[-2, 1, 4] with a sum of 3
Out of these, the subarray [3, -2] has a sum of 1, which is the smallest positive sum. Hence, the answer is 1.

Example 2:

Input: nums = [-2, 2, -3, 1], l = 2, r = 3

Output: -1

Explanation:

There is no subarray of length between l and r that has a sum greater than 0. So, the answer is -1.

Example 3:

Input: nums = [1, 2, 3, 4], l = 2, r = 4

Output: 3

Explanation:

The subarray [1, 2] has a length of 2 and the minimum sum greater than 0. So, the answer is 3.
*/

/**
Constraints:

1 <= nums.length <= 100
1 <= l <= r <= nums.length
-1000 <= nums[i] <= 1000
*/

//
function minimumSumSubarray(nums: number[], l: number, r: number): number {
  const n = nums.length;
  let minPositiveSum = Infinity;

  // Iterate over every possible starting index of the subarray.
  for (let start = 0; start < n; start++) {
    // Iterate over every valid ending index so that length is between l and r.
    for (let end = start + l - 1; end < Math.min(n, start + r); end++) {
      let currentSum = 0;

      // Recalculate the sum of the subarray from start to end from scratch.
      for (let i = start; i <= end; i++) {
        currentSum += nums[i];
      }

      // Update the answer only if the subarray sum is strictly greater than 0.
      if (currentSum > 0) {
        minPositiveSum = Math.min(minPositiveSum, currentSum);
      }
    }
  }

  // Return -1 if no subarray with a strictly positive sum was found.
  return minPositiveSum === Infinity ? -1 : minPositiveSum;
}

// Example Usages
const nums1 = [3, -2, 1, 4];
const l1 = 2;
const r1 = 3;
console.log(minimumSumSubarray(nums1, l1, r1)); // Output: 1

const nums2 = [-2, 2, -3, 1];
const l2 = 2;
const r2 = 3;
console.log(minimumSumSubarray(nums2, l2, r2)); // Output: -1

const nums3 = [1, 2, 3, 4];
const l3 = 2;
const r3 = 4;
console.log(minimumSumSubarray(nums3, l3, r3)); // Output: 3
