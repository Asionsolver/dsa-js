//

/**
Given an integer array nums and an integer k, return the smallest positive multiple of k that is missing from nums.

A multiple of k is any positive integer divisible by k.
*/

/**
Example 1:

Input: nums = [8,2,3,4,6], k = 2

Output: 10

Explanation:

The multiples of k = 2 are 2, 4, 6, 8, 10, 12... and the smallest multiple missing from nums is 10.

Example 2:

Input: nums = [1,4,7,10,15], k = 5

Output: 5

Explanation:

The multiples of k = 5 are 5, 10, 15, 20... and the smallest multiple missing from nums is 5.
*/

/**
Constraints:

1 <= nums.length <= 100
1 <= nums[i] <= 100
1 <= k <= 100
*/

function missingMultiple(nums: number[], k: number): number {
  let currentMultiple = k;

  // Keep checking multiples until we find one not in nums.
  while (true) {
    let found = false;
    for (let num of nums) {
      if (num === currentMultiple) {
        found = true;
        break;
      }
    }

    if (!found) {
      return currentMultiple;
    }

    currentMultiple += k;
  }
}

// Example usage:
const nums1 = [8, 2, 3, 4, 6];
const k1 = 2;
console.log(missingMultiple(nums1, k1)); // Output: 10

const nums2 = [1, 4, 7, 10, 15];
const k2 = 5;
console.log(missingMultiple(nums2, k2)); // Output: 5
