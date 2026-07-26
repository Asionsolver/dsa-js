// 628. Maximum Product of Three Numbers

/**
Example 1:

Input: nums = [1,2,3]
Output: 6
Example 2:

Input: nums = [1,2,3,4]
Output: 24
Example 3:

Input: nums = [-1,-2,-3]
Output: -6
*/

function maximumProduct(nums: number[]): number {
  // Initialize the three largest values
  let max1 = -Infinity;
  let max2 = -Infinity;
  let max3 = -Infinity;

  // Initialize the two smallest values
  let min1 = Infinity;
  let min2 = Infinity;

  for (const n of nums) {
    // Update the three largest values
    if (n > max1) {
      max3 = max2;
      max2 = max1;
      max1 = n;
    } else if (n > max2) {
      max3 = max2;
      max2 = n;
    } else if (n > max3) {
      max3 = n;
    }

    // Update the two smallest values
    if (n < min1) {
      min2 = min1;
      min1 = n;
    } else if (n < min2) {
      min2 = n;
    }
  }

  // Return the maximum of the two potential scenarios
  return Math.max(max1 * max2 * max3, min1 * min2 * max1);
}

// Example usage:
const nums1 = [1, 2, 3];
console.log(maximumProduct(nums1)); // Output: 6

const nums2 = [1, 2, 3, 4];
console.log(maximumProduct(nums2)); // Output: 24

const nums3 = [-1, -2, -3];
console.log(maximumProduct(nums3)); // Output: -6
