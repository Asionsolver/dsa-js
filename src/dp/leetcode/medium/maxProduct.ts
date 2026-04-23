// 152. Maximum Product Subarray

/**

Example 1:

Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
Example 2:

Input: nums = [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
*/

// function maxProduct(nums: number[]): number {
//   if (nums.length === 0) return 0;

//   let maxSoFar = nums[0];
//   let minSoFar = nums[0];
//   let result = maxSoFar;

//   for (let i = 1; i < nums.length; i++) {
//     let curr = nums[i];

//     // If the current number is negative, it will flip the signs.
//     // Therefore, the max becomes the min and the min becomes the max.
//     if (curr < 0) {
//       let temp = maxSoFar;
//       maxSoFar = minSoFar;
//       minSoFar = temp;
//     }

//     // Calculate the maximum and minimum ending at the current index
//     maxSoFar = Math.max(curr, maxSoFar * curr);
//     minSoFar = Math.min(curr, minSoFar * curr);

//     // Update the global result with the highest product found so far
//     result = Math.max(result, maxSoFar);
//   }

//   return result;
// }

//  (Prefix & Suffix Products)
function maxProduct(nums: number[]): number {
  let max = -Infinity;
  let prefix = 1;
  let suffix = 1;
  let n = nums.length;

  for (let i = 0; i < n; i++) {
    // Reset to 1 if we encounter a 0
    if (prefix === 0) prefix = 1;
    if (suffix === 0) suffix = 1;

    prefix *= nums[i];
    suffix *= nums[n - 1 - i];

    max = Math.max(max, prefix, suffix);
  }

  return max;
}

// Test cases
console.log(maxProduct([2, 3, -2, 4])); // Output: 6
console.log(maxProduct([-2, 0, -1])); // Output: 0
console.log(maxProduct([-2, 3, -4])); // Output: 24
console.log(maxProduct([0, 2])); // Output: 2
console.log(maxProduct([-2])); // Output: -2
