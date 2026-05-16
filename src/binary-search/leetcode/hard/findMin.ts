// 154. Find Minimum in Rotated Sorted Array II

/**
Example 1:

Input: nums = [1,3,5]
Output: 1
Example 2:

Input: nums = [2,2,2,0,1]
Output: 0
*/

function findMin(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] > nums[right]) {
      // The minimum is in the right half (excluding mid)
      // Example: [3, 4, 5, 1, 2], mid = 5, right = 2 -> min is to the right
      left = mid + 1;
    } else if (nums[mid] < nums[right]) {
      // The minimum is in the left half (including mid)
      // Example: [5, 1, 2, 3, 4], mid = 2, right = 4 -> min is to the left or at mid
      right = mid;
    } else {
      // nums[mid] === nums[right]
      // We can't be sure which half the minimum is in.
      // Example 1: [1, 0, 1, 1, 1] (min is on the left)
      // Example 2: [1, 1, 1, 0, 1] (min is on the right)
      // However, we can safely discard the `right` element because `nums[mid]` has the exact same value.
      right--;
    }
  }

  // When left === right, we've narrowed down the search space to 1 element, which is our minimum
  return nums[left];
}

// Test cases
console.log(findMin([1, 3, 5])); // Output: 1
console.log(findMin([2, 2, 2, 0, 1])); // Output: 0
console.log(findMin([1, 0, 1, 1, 1])); // Output: 0
console.log(findMin([1, 1, 1, 0, 1])); // Output: 0
console.log(findMin([3, 4, 5, 1, 2])); // Output: 1
console.log(findMin([5, 1, 2, 3, 4])); // Output: 1
