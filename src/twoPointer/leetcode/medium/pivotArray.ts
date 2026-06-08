// 2161. Partition Array According to Given Pivot

/**
Example 1:

Input: nums = [9,12,5,10,14,3,10], pivot = 10
Output: [9,5,3,10,10,12,14]
Explanation: 
The elements 9, 5, and 3 are less than the pivot so they are on the left side of the array.
The elements 12 and 14 are greater than the pivot so they are on the right side of the array.
The relative ordering of the elements less than and greater than pivot is also maintained. [9, 5, 3] and [12, 14] are the respective orderings.
Example 2:

Input: nums = [-3,4,3,2], pivot = 2
Output: [-3,2,4,3]
Explanation: 
The element -3 is less than the pivot so it is on the left side of the array.
The elements 4 and 3 are greater than the pivot so they are on the right side of the array.
The relative ordering of the elements less than and greater than pivot is also maintained. [-3] and [4, 3] are the respective orderings.

*/

function pivotArray(nums: number[], pivot: number): number[] {
  const n = nums.length;
  const result = new Array<number>(n);

  let left = 0;
  let right = n - 1;

  // Simulate partitioning using two pointers in opposite directions
  for (let i = 0, j = n - 1; i < n; i++, j--) {
    // Forward pointer collects elements smaller than the pivot
    if (nums[i] < pivot) {
      result[left] = nums[i];
      left++;
    }
    // Backward pointer collects elements larger than the pivot
    if (nums[j] > pivot) {
      result[right] = nums[j];
      right--;
    }
  }

  // Fill the remaining gap with the pivot values
  while (left <= right) {
    result[left] = pivot;
    left++;
  }

  return result;
}

// Example usage:
console.log(pivotArray([9, 12, 5, 10, 14, 3, 10], 10)); // Output: [9,5,3,10,10,12,14]
console.log(pivotArray([-3, 4, 3, 2], 2)); // Output: [-3,2,4,3]
