// 3689. Maximum Total Subarray Value I

/**
Example 1:

Input: nums = [1,3,2], k = 2

Output: 4

Explanation:

One optimal approach is:

Choose nums[0..1] = [1, 3]. The maximum is 3 and the minimum is 1, giving a value of 3 - 1 = 2.
Choose nums[0..2] = [1, 3, 2]. The maximum is still 3 and the minimum is still 1, so the value is also 3 - 1 = 2.
Adding these gives 2 + 2 = 4.

Example 2:

Input: nums = [4,2,5,1], k = 3

Output: 12

Explanation:

One optimal approach is:

Choose nums[0..3] = [4, 2, 5, 1]. The maximum is 5 and the minimum is 1, giving a value of 5 - 1 = 4.
Choose nums[0..3] = [4, 2, 5, 1]. The maximum is 5 and the minimum is 1, so the value is also 4.
Choose nums[2..3] = [5, 1]. The maximum is 5 and the minimum is 1, so the value is again 4.
Adding these gives 4 + 4 + 4 = 12.


*/

function maxTotalValue(nums: number[], k: number): number {
  let globalMin = Infinity;
  let globalMax = -Infinity;

  for (const num of nums) {
    if (num < globalMin) {
      globalMin = num;
    }
    if (num > globalMax) {
      globalMax = num;
    }
  }

  return k * (globalMax - globalMin);
}

// Example usage:
const nums1 = [1, 3, 2];
const k1 = 2;
console.log(maxTotalValue(nums1, k1)); // Output: 4

const nums2 = [4, 2, 5, 1];
const k2 = 3;
console.log(maxTotalValue(nums2, k2)); // Output: 12
