// 215. Kth Largest Element in an Array

/**
Example 1:

Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
Example 2:

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
*/

const nums = [3, 2, 1, 5, 6, 4],
  k = 2;

const findKthLargest = function (nums: number[], k: number): number {
  // The target index is k-1 because we are looking for the kth largest.
  // In a descending sorted array, the 1st largest is at index 0,
  // 2nd largest at index 1, etc.
  const targetIndex = k - 1;

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const pivotIndex = partition(nums, left, right);

    if (pivotIndex === targetIndex) {
      return nums[pivotIndex];
    } else if (pivotIndex < targetIndex) {
      // The target is in the right part
      left = pivotIndex + 1;
    } else {
      // The target is in the left part
      right = pivotIndex - 1;
    }
  }

  return nums[0];
};

const partition = function (
  nums: number[],
  left: number,
  right: number,
): number {
  // 1. Choose a random pivot to avoid worst-case O(N^2) performance
  // on already sorted arrays or arrays with specific patterns.
  const randomIndex = Math.floor(Math.random() * (right - left + 1)) + left;

  // 2. Move the pivot to the end of the current section
  swap(nums, randomIndex, right);

  const pivotValue = nums[right];
  let storeIndex = left;

  // 3. Move all elements larger than the pivot to the left
  // (We are partitioning for Descending order)
  for (let i = left; i < right; i++) {
    if (nums[i] > pivotValue) {
      swap(nums, i, storeIndex);
      storeIndex++;
    }
  }

  // 4. Move pivot to its final correct position
  swap(nums, storeIndex, right);

  return storeIndex;
};

function swap(nums: number[], i: number, j: number): void {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

console.log(findKthLargest(nums, k));
