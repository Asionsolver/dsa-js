// 16. 3Sum Closest

/**
You are given an integer array nums of length n and an integer target.

Find three integers at distinct indices in nums such that the sum is closest to target.

Return the sum of the three integers.

You may assume that each input would have exactly one solution.


*/

/**
Example 1:

Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
Example 2:

Input: nums = [0,0,0], target = 1
Output: 0
Explanation: The sum that is closest to the target is 0. (0 + 0 + 0 = 0).
*/

/**

Constraints:

3 <= nums.length <= 500
-1000 <= nums[i] <= 1000
-104 <= target <= 104
*/

// Brute Force Approach
// function threeSumClosest(nums: number[], target: number): number {
//   const n = nums.length;

//   // Initialize closestSum with the sum of the first three elements.
//   let closestSum = nums[0] + nums[1] + nums[2];

//   // Iterate through all possible triplets using three nested loops.
//   for (let i = 0; i < n - 2; i++) {
//     for (let j = i + 1; j < n - 1; j++) {
//       for (let k = j + 1; k < n; k++) {
//         const currentSum = nums[i] + nums[j] + nums[k];

//         // Update closestSum if currentSum is closer to target.
//         if (Math.abs(target - currentSum) < Math.abs(target - closestSum)) {
//           closestSum = currentSum;
//         }
//       }
//     }
//   }

//   return closestSum;
// }

// Optimized Approach using Two Pointers
function threeSumClosest(nums: number[], target: number): number {
  // Sort the array in ascending order to enable the Two Pointers technique.
  nums.sort((a, b) => a - b);

  const n = nums.length;

  // Initialize closestSum with the sum of the first triplet.
  let closestSum = nums[0] + nums[1] + nums[2];

  // Iterate through the array, fixing the first element at index i.
  for (let i = 0; i < n - 2; i++) {
    let left = i + 1;
    let right = n - 1;

    // Use two pointers to find the best pair for the fixed element.
    while (left < right) {
      const currentSum = nums[i] + nums[left] + nums[right];

      // If an exact match is found, return immediately.
      if (currentSum === target) {
        return currentSum;
      }

      // Update closestSum if currentSum is closer to target.
      if (Math.abs(target - currentSum) < Math.abs(target - closestSum)) {
        closestSum = currentSum;
      }

      // Adjust pointers based on comparison with target.
      if (currentSum < target) {
        // Sum is too small, move left pointer to the right to increase sum.
        left++;
      } else {
        // Sum is too large, move right pointer to the left to decrease sum.
        right--;
      }
    }
  }

  return closestSum;
}

// Example usage:
const nums = [-1, 2, 1, -4];
const target = 1;
console.log(threeSumClosest(nums, target)); // Output: 2

const nums2 = [0, 0, 0];
const target2 = 1;
console.log(threeSumClosest(nums2, target2)); // Output: 0
