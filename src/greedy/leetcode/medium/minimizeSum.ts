// 2567. Minimum Score by Changing Two Elements

/**
You are given an integer array nums.

The low score of nums is the minimum absolute difference between any two integers.
The high score of nums is the maximum absolute difference between any two integers.
The score of nums is the sum of the high and low scores.
Return the minimum score after changing two elements of nums.
*/

/**
Example 1:

Input: nums = [1,4,7,8,5]

Output: 3

Explanation:

Change nums[0] and nums[1] to be 6 so that nums becomes [6,6,7,8,5].
The low score is the minimum absolute difference: |6 - 6| = 0.
The high score is the maximum absolute difference: |8 - 5| = 3.
The sum of high and low score is 3.
Example 2:

Input: nums = [1,4,3]

Output: 0

Explanation:

Change nums[1] and nums[2] to 1 so that nums becomes [1,1,1].
The sum of maximum absolute difference and minimum absolute difference is 0.
*/

/**
Constraints:

3 <= nums.length <= 105
1 <= nums[i] <= 109
*/

// Brute Force Approach: TLE
// function minimizeSum(nums: number[]): number {
//   const n = nums.length;
//   let minScore = Infinity;

//   // Try every pair of indices (i, j) as the two elements to change.
//   for (let i = 0; i < n; i++) {
//     for (let j = i + 1; j < n; j++) {
//       let currentMin = Infinity;
//       let currentMax = -Infinity;

//       // Find the minimum and maximum among the remaining (n - 2) unchanged elements.
//       for (let k = 0; k < n; k++) {
//         if (k === i || k === j) {
//           continue;
//         }
//         if (nums[k] < currentMin) {
//           currentMin = nums[k];
//         }
//         if (nums[k] > currentMax) {
//           currentMax = nums[k];
//         }
//       }

//       // Changing nums[i] and nums[j] to currentMin makes low score 0 and keeps high score at currentMax - currentMin.

//       const score = currentMax - currentMin;
//       if (score < minScore) {
//         minScore = score;
//       }
//     }
//   }

//   return minScore;
// }

// Optimized Approach: O(n) time complexity, O(1) space complexity, Greedy Approach
function minimizeSum(nums: number[]): number {
  // Track the 3 smallest elements (min1 <= min2 <= min3).
  let min1 = Infinity;
  let min2 = Infinity;
  let min3 = Infinity;

  // Track the 3 largest elements (max1 >= max2 >= max3).
  let max1 = -Infinity;
  let max2 = -Infinity;
  let max3 = -Infinity;

  for (const num of nums) {
    // Update the 3 smallest values.
    if (num < min1) {
      min3 = min2;
      min2 = min1;
      min1 = num;
    } else if (num < min2) {
      min3 = min2;
      min2 = num;
    } else if (num < min3) {
      min3 = num;
    }

    // Update the 3 largest values.
    if (num > max1) {
      max3 = max2;
      max2 = max1;
      max1 = num;
    } else if (num > max2) {
      max3 = max2;
      max2 = num;
    } else if (num > max3) {
      max3 = num;
    }
  }

  // Evaluate the 3 optimal ways to change 2 extreme elements (low score becomes 0 in all cases).
  const removeTwoSmallest = max1 - min3;
  const removeOneEach = max2 - min2;
  const removeTwoLargest = max3 - min1;

  return Math.min(removeTwoSmallest, removeOneEach, removeTwoLargest);
}

// Example usage:
const nums1 = [1, 4, 7, 8, 5];
console.log(minimizeSum(nums1)); // Output: 3

const nums2 = [1, 4, 3];
console.log(minimizeSum(nums2)); // Output: 0
