// 713. Subarray Product Less Than K

/**
Example 1:

Input: nums = [10,5,2,6], k = 100
Output: 8
Explanation: The 8 subarrays that have product less than 100 are:
[10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]
Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.
Example 2:

Input: nums = [1,2,3], k = 0
Output: 0
*/

function numSubarrayProductLessThanK(nums: number[], k: number): number {
  // Since all numbers are >= 1, product can never be less than 1.
  // Therefore, if k <= 1, there are 0 valid subarrays.
  if (k <= 1) return 0;

  let count = 0;
  let product = 1;
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    product *= nums[right];

    // Shrink the window from the left while the product is >= k
    while (product >= k) {
      product /= nums[left];
      left++;
    }

    // Add the number of valid contiguous subarrays ending at 'right'
    // For example, if window is [5, 2], subarrays are[5, 2] and [2].
    // Length of window is right - left + 1
    count += right - left + 1;
  }

  return count;
}

// Example usage:
const nums = [10, 5, 2, 6];
const k = 100;
console.log(numSubarrayProductLessThanK(nums, k)); // Output: 8

const nums2 = [1, 2, 3];
const k2 = 0;
console.log(numSubarrayProductLessThanK(nums2, k2)); // Output: 0
