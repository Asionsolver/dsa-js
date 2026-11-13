// 3420. Count Non-Decreasing Subarrays After K Operations

/**
You are given an array nums of n integers and an integer k.

For each subarray of nums, you can apply up to k operations on it. In each operation, you increment any element of the subarray by 1.

Note that each subarray is considered independently, meaning changes made to one subarray do not persist to another.

Return the number of subarrays that you can make non-decreasing ​​​​​after performing at most k operations.

An array is said to be non-decreasing if each element is greater than or equal to its previous element, if it exists.
*/

/**
 

Example 1:

Input: nums = [6,3,1,2,4,4], k = 7

Output: 17

Explanation:

Out of all 21 possible subarrays of nums, only the subarrays [6, 3, 1], [6, 3, 1, 2], [6, 3, 1, 2, 4] and [6, 3, 1, 2, 4, 4] cannot be made non-decreasing after applying up to k = 7 operations. Thus, the number of non-decreasing subarrays is 21 - 4 = 17.

Example 2:

Input: nums = [6,3,1,3,6], k = 4

Output: 12

Explanation:

The subarray [3, 1, 3, 6] along with all subarrays of nums with three or fewer elements, except [6, 3, 1], can be made non-decreasing after k operations. There are 5 subarrays of a single element, 4 subarrays of two elements, and 2 subarrays of three elements except [6, 3, 1], so there are 1 + 5 + 4 + 2 = 12 subarrays that can be made non-decreasing.


*/

/**
Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 109
1 <= k <= 109
*/

// Brute Force Approach: O(n^3) time complexity, O(1) space complexity

// function countNonDecreasingSubarrays(nums: number[], k: number): number {
//   const n = nums.length;
//   let validCount = 0;

//   // Iterate over all possible starting indices of subarrays.
//   for (let l = 0; l < n; l++) {
//     // Iterate over all possible ending indices for the fixed start.
//     for (let r = l; r < n; r++) {
//       let cost = 0;
//       let runningMax = nums[l];

//       // Calculate the minimum operations needed to make nums[l..r] non-decreasing.
//       for (let i = l; i <= r; i++) {
//         if (nums[i] < runningMax) {
//           cost += runningMax - nums[i];
//         } else {
//           runningMax = nums[i];
//         }
//       }

//       // If the required operations are within k, count this subarray.
//       if (cost <= k) {
//         validCount++;
//       }
//     }
//   }

//   return validCount;
// }

// Optimized Approach: O(n) time complexity, O(n) space complexity

function countNonDecreasingSubarrays(nums: number[], k: number): number {
  const n = nums.length;

  // Store monotonic blocks of running maximums in reverse order:
  // the end of the arrays represents the left side (front) of the window,
  // and `head` points to the right side (back) of the window.
  const blockVals: number[] = [];
  const blockCounts: number[] = [];
  let head = 0;

  let r = n - 1;
  let cost = 0;
  let validCount = 0;

  // Traverse from right to left so adding nums[l] only merges smaller blocks at the left.
  for (let l = n - 1; l >= 0; l--) {
    let currentCount = 1;

    // Merge all blocks at the left whose running maximum is <= nums[l].
    while (
      blockVals.length > head &&
      blockVals[blockVals.length - 1] <= nums[l]
    ) {
      const prevVal = blockVals.pop()!;
      const prevCount = blockCounts.pop()!;

      // Increase cost because those elements' running max rises from prevVal to nums[l].
      cost += (nums[l] - prevVal) * prevCount;
      currentCount += prevCount;
    }

    // Push the new merged block for nums[l] to the front (array end).
    blockVals.push(nums[l]);
    blockCounts.push(currentCount);

    // Shrink the window from the right if total operations exceed k.
    while (cost > k) {
      // The running max for nums[r] is always the value of the rightmost block.
      cost -= blockVals[head] - nums[r];
      blockCounts[head]--;

      // Move head forward if the rightmost block becomes empty.
      if (blockCounts[head] === 0) {
        head++;
      }

      r--;
    }

    // All subarrays starting at l and ending anywhere in [l, r] are valid.
    validCount += r - l + 1;
  }

  return validCount;
}

// Example usage:
console.log(countNonDecreasingSubarrays([1, 2, 3], 1)); // Output: 6
console.log(countNonDecreasingSubarrays([1, 2, 3], 2)); // Output: 6
console.log(countNonDecreasingSubarrays([1, 2, 3], 3)); // Output: 6
