// 153. Find Minimum in Rotated Sorted Array

/**
Example 1:

Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.
Example 2:

Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.
Example 3:

Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 4 times. 
*/

function findMin(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  // Binary search
  while (left < right) {
    // Find the middle index
    const mid = left + Math.floor((right - left) / 2);

    // If mid is greater than the rightmost element,
    // it means the minimum is in the right half.
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    }
    // Otherwise, the minimum is in the left half (including mid).
    else {
      right = mid;
    }
  }

  // At the end of the loop, left == right and points to the minimum element
  return nums[left];
}

// Test cases
console.log(findMin([3, 4, 5, 1, 2])); // Output: 1
console.log(findMin([4, 5, 6, 7, 0, 1, 2])); // Output: 0
console.log(findMin([11, 13, 15, 17])); // Output: 11
