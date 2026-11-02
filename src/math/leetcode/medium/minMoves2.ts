// 462. Minimum Moves to Equal Array Elements II

/**
Given an integer array nums of size n, return the minimum number of moves required to make all array elements equal.

In one move, you can increment or decrement an element of the array by 1.

Test cases are designed so that the answer will fit in a 32-bit integer.
*/

/**
Example 1:

Input: nums = [1,2,3]
Output: 2
Explanation:
Only two moves are needed (remember each move increments or decrements one element):
[1,2,3]  =>  [2,2,3]  =>  [2,2,2]
Example 2:

Input: nums = [1,10,2,9]
Output: 16

*/

/**
Constraints:

n == nums.length
1 <= nums.length <= 105
-109 <= nums[i] <= 109
*/

// Brute Force Approach
function minMoves2(nums: number[]): number {
  let minMoves = Infinity;

  // Try every number in the array as the target.
  for (let i = 0; i < nums.length; i++) {
    const target = nums[i];
    let currentMoves = 0;

    // Calculate the total moves needed to make all elements equal to target.
    for (let j = 0; j < nums.length; j++) {
      currentMoves += Math.abs(nums[j] - target);
    }

    // Keep track of the minimum moves found so far.
    minMoves = Math.min(minMoves, currentMoves);
  }

  return minMoves;
}

// Example usage:
const nums1 = [1, 2, 3];
console.log(minMoves2(nums1)); // Output: 2

const nums2 = [1, 10, 2, 9];
console.log(minMoves2(nums2)); // Output: 16
