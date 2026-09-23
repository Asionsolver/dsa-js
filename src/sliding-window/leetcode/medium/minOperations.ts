// 1658. Minimum Operations to Reduce X to Zero

/**
You are given an integer array nums and an integer x. In one operation, you can either remove the leftmost or the rightmost element from the array nums and subtract its value from x. Note that this modifies the array for future operations.

Return the minimum number of operations to reduce x to exactly 0 if it is possible, otherwise, return -1.
*/

/**
Example 1:

Input: nums = [1,1,4,2,3], x = 5
Output: 2
Explanation: The optimal solution is to remove the last two elements to reduce x to zero.
Example 2:

Input: nums = [5,6,7,8,9], x = 4
Output: -1
Example 3:

Input: nums = [3,2,20,1,1,3], x = 10
Output: 5
Explanation: The optimal solution is to remove the last three elements and the first two elements (5 operations in total) to reduce x to zero.

*/

/**
Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 104
1 <= x <= 109
*/

// Brute Force Approach: TLE
// function minOperations(nums: number[], x: number): number {
//   const n = nums.length;
//   let minOps = Infinity;

//   // Try taking i elements from the left (prefix).
//   for (let i = 0; i <= n; i++) {
//     let leftSum = 0;
//     for (let k = 0; k < i; k++) {
//       leftSum += nums[k];
//     }

//     // If leftSum already exceeds x, no need to add right elements.
//     if (leftSum > x) break;

//     // Try taking j elements from the right (suffix).
//     for (let j = 0; j <= n - i; j++) {
//       let rightSum = 0;
//       for (let k = 0; k < j; k++) {
//         rightSum += nums[n - 1 - k];
//       }

//       // Check if the combined sum equals x.
//       if (leftSum + rightSum === x) {
//         minOps = Math.min(minOps, i + j);
//       }
//     }
//   }

//   return minOps === Infinity ? -1 : minOps;
// }

// Optimized Approach: Sliding Window
function minOperations(nums: number[], x: number): number {
  const totalSum = nums.reduce((acc, curr) => acc + curr, 0);
  const target = totalSum - x;

  // If totalSum is strictly less than x, it's impossible.
  if (target < 0) {
    return -1;
  }

  // If totalSum equals x, we must remove all elements.
  if (target === 0) {
    return nums.length;
  }

  let left = 0;
  let currentSum = 0;
  let maxSubarrayLength = -1;

  // Expand the window using the right pointer.
  for (let right = 0; right < nums.length; right++) {
    currentSum += nums[right];

    // Shrink the window from the left while currentSum exceeds target.
    while (currentSum > target && left <= right) {
      currentSum -= nums[left];
      left++;
    }

    // If we find a subarray with sum equal to target, record its maximum length.
    if (currentSum === target) {
      maxSubarrayLength = Math.max(maxSubarrayLength, right - left + 1);
    }
  }

  // If no valid subarray was found, return -1. Otherwise, return the remaining elements.
  return maxSubarrayLength === -1 ? -1 : nums.length - maxSubarrayLength;
}

// Example usage:
console.log(minOperations([1, 1, 4, 2, 3], 5)); // Output: 2
console.log(minOperations([5, 6, 7, 8, 9], 4)); // Output: -1
console.log(minOperations([3, 2, 20, 1, 1, 3], 10)); // Output: 5
