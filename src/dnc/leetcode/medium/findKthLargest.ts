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

// ! TLE Problem
// const findKthLargest = function (nums: number[], k: number): number {
//   // The target index is k-1 because we are looking for the kth largest.
//   // In a descending sorted array, the 1st largest is at index 0,
//   // 2nd largest at index 1, etc.
//   const targetIndex = k - 1;

//   let left = 0;
//   let right = nums.length - 1;

//   while (left <= right) {
//     const pivotIndex = partition(nums, left, right);

//     if (pivotIndex === targetIndex) {
//       return nums[pivotIndex];
//     } else if (pivotIndex < targetIndex) {
//       // The target is in the right part
//       left = pivotIndex + 1;
//     } else {
//       // The target is in the left part
//       right = pivotIndex - 1;
//     }
//   }

//   return nums[0];
// };

// const partition = function (
//   nums: number[],
//   left: number,
//   right: number,
// ): number {
//   // 1. Choose a random pivot to avoid worst-case O(N^2) performance
//   // on already sorted arrays or arrays with specific patterns.
//   const randomIndex = Math.floor(Math.random() * (right - left + 1)) + left;

//   // 2. Move the pivot to the end of the current section
//   swap(nums, randomIndex, right);

//   const pivotValue = nums[right];
//   let storeIndex = left;

//   // 3. Move all elements larger than the pivot to the left
//   // (We are partitioning for Descending order)
//   for (let i = left; i < right; i++) {
//     if (nums[i] > pivotValue) {
//       swap(nums, i, storeIndex);
//       storeIndex++;
//     }
//   }

//   // 4. Move pivot to its final correct position
//   swap(nums, storeIndex, right);

//   return storeIndex;
// };

// function swap(nums: number[], i: number, j: number): void {
//   const temp = nums[i];
//   nums[i] = nums[j];
//   nums[j] = temp;
// }

function findKthLargest(nums: number[], k: number): number {
  // Constraint range is -10^4 to 10^4.
  // We add an offset to handle negative numbers in array indices.
  const offset = 10000;
  const size = 20001; // Range size: 10000 - (-10000) + 1

  // Create a frequency array (bucket)
  // Int32Array is faster/more memory efficient than standard Array
  const count = new Int32Array(size);

  // 1. Count frequencies
  for (const num of nums) {
    count[num + offset]++;
  }

  // 2. Iterate from the largest possible number downwards
  // We start from the end of the count array (which represents value 10000)
  for (let i = size - 1; i >= 0; i--) {
    if (count[i] > 0) {
      // Subtract the count of the current number from k
      k -= count[i];

      // If k becomes <= 0, we have passed the kth largest element.
      // The current index 'i' represents that number.
      if (k <= 0) {
        return i - offset;
      }
    }
  }

  return 0; // Should not reach here given constraints
}

console.log(findKthLargest(nums, k));
