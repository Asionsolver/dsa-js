// 3732. Maximum Product of Three Elements After One Replacement

/**
Example 1:

Input: nums = [-5,7,0]

Output: 3500000

Explanation:

Replacing 0 with -105 gives the array [-5, 7, -105], which has a product (-5) * 7 * (-105) = 3500000. The maximum product is 3500000.

Example 2:

Input: nums = [-4,-2,-1,-3]

Output: 1200000

Explanation:

Two ways to achieve the maximum product include:

[-4, -2, -3] → replace -2 with 105 → product = (-4) * 105 * (-3) = 1200000.
[-4, -1, -3] → replace -1 with 105 → product = (-4) * 105 * (-3) = 1200000.
The maximum product is 1200000.
Example 3:

Input: nums = [0,10,0]

Output: 0

Explanation:

There is no way to replace an element with another integer and not have a 0 in the array. Hence, the product of all three elements will always be 0, and the maximum product is 0.
*/

function maxProduct(nums: number[]): number {
  let max1 = 0;
  let max2 = 0;

  // Find the two largest absolute values in the array
  for (let i = 0; i < nums.length; i++) {
    const absVal = Math.abs(nums[i]);

    if (absVal > max1) {
      max2 = max1;
      max1 = absVal;
    } else if (absVal > max2) {
      max2 = absVal;
    }
  }

  // The maximum product leverages the 2 largest absolute elements
  // multiplied by the maximum allowed replacement magnitude (10^5)
  return max1 * max2 * 100000;
}

// Example usage:
const nums1 = [-5, 7, 0];
console.log(maxProduct(nums1)); // Output: 3500000

const nums2 = [-4, -2, -1, -3];
console.log(maxProduct(nums2)); // Output: 1200000

const nums3 = [0, 10, 0];
console.log(maxProduct(nums3)); // Output: 0
