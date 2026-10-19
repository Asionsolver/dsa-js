// 2089. Find Target Indices After Sorting Array

/**
You are given a 0-indexed integer array nums and a target element target.

A target index is an index i such that nums[i] == target.

Return a list of the target indices of nums after sorting nums in non-decreasing order. If there are no target indices, return an empty list. The returned list must be sorted in increasing order.


*/

/**
Example 1:

Input: nums = [1,2,5,2,3], target = 2
Output: [1,2]
Explanation: After sorting, nums is [1,2,2,3,5].
The indices where nums[i] == 2 are 1 and 2.
Example 2:

Input: nums = [1,2,5,2,3], target = 3
Output: [3]
Explanation: After sorting, nums is [1,2,2,3,5].
The index where nums[i] == 3 is 3.
Example 3:

Input: nums = [1,2,5,2,3], target = 5
Output: [4]
Explanation: After sorting, nums is [1,2,2,3,5].
The index where nums[i] == 5 is 4.
*/

/**
Constraints:

1 <= nums.length <= 100
1 <= nums[i], target <= 100
*/

// Brute force approach: Sort the array and find the indices of the target element.
function targetIndices(nums: number[], target: number): number[] {
  // Sort the array in non-decreasing order.
  nums.sort((a, b) => a - b);

  const result: number[] = [];

  // Traverse the sorted array to find all occurrences of the target.
  for (let i = 0; i < nums.length; i++) {
    // If the current element matches the target, store the index.
    if (nums[i] === target) {
      result.push(i);
    }
  }

  return result;
}

// Example usage:
const nums1 = [1, 2, 5, 2, 3];
const target1 = 2;
console.log(targetIndices(nums1, target1)); // Output: [1, 2]

const nums2 = [1, 2, 5, 2, 3];
const target2 = 3;
console.log(targetIndices(nums2, target2)); // Output: [3]

const nums3 = [1, 2, 5, 2, 3];
const target3 = 5;
console.log(targetIndices(nums3, target3)); // Output: [4]
