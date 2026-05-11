// 2553. Separate the Digits in an Array

/**

Example 1:

Input: nums = [13,25,83,77]
Output: [1,3,2,5,8,3,7,7]
Explanation: 
- The separation of 13 is [1,3].
- The separation of 25 is [2,5].
- The separation of 83 is [8,3].
- The separation of 77 is [7,7].
answer = [1,3,2,5,8,3,7,7]. Note that answer contains the separations in the same order.
Example 2:

Input: nums = [7,1,3,9]
Output: [7,1,3,9]
Explanation: The separation of each integer in nums is itself.
answer = [7,1,3,9].

*/

function separateDigits(nums: number[]): number[] {
  return nums.flatMap((num) => String(num).split("").map(Number));
}

// Example usage:
const nums1 = [13, 25, 83, 77];
console.log(separateDigits(nums1)); // Output: [1, 3, 2, 5, 8, 3, 7, 7]

const nums2 = [7, 1, 3, 9];
console.log(separateDigits(nums2)); // Output: [7, 1, 3, 9]
