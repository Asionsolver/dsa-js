// 33. Search in Rotated Sorted Array

/**
Example 1:

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
Example 2:

Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
Example 3:

Input: nums = [1], target = 0
Output: -1

*/

function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    // Calculate the middle index
    const mid = Math.floor((left + right) / 2);

    // Target found
    if (nums[mid] === target) {
      return mid;
    }

    // Determine which half is correctly sorted
    if (nums[left] <= nums[mid]) {
      // The left half is sorted
      // Check if the target is within the range of the left half
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1; // Target is strictly in the left half
      } else {
        left = mid + 1; // Target must be in the right half
      }
    } else {
      // The right half is sorted
      // Check if the target is within the range of the right half
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1; // Target is strictly in the right half
      } else {
        right = mid - 1; // Target must be in the left half
      }
    }
  }

  // Target was not found
  return -1;
}
