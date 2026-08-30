// 2091. Removing Minimum and Maximum From Array

/**
You are given a 0-indexed array of distinct integers nums.

There is an element in nums that has the lowest value and an element that has the highest value. We call them the minimum and maximum respectively. Your goal is to remove both these elements from the array.

A deletion is defined as either removing an element from the front of the array or removing an element from the back of the array.

Return the minimum number of deletions it would take to remove both the minimum and maximum element from the array.
*/

/**
Example 1:

Input: nums = [2,10,7,5,4,1,8,6]
Output: 5
Explanation: 
The minimum element in the array is nums[5], which is 1.
The maximum element in the array is nums[1], which is 10.
We can remove both the minimum and maximum by removing 2 elements from the front and 3 elements from the back.
This results in 2 + 3 = 5 deletions, which is the minimum number possible.
Example 2:

Input: nums = [0,-4,19,1,8,-2,-3,5]
Output: 3
Explanation: 
The minimum element in the array is nums[1], which is -4.
The maximum element in the array is nums[2], which is 19.
We can remove both the minimum and maximum by removing 3 elements from the front.
This results in only 3 deletions, which is the minimum number possible.
Example 3:

Input: nums = [101]
Output: 1
Explanation:  
There is only one element in the array, which makes it both the minimum and maximum element.
We can remove it with 1 deletion.
*/

/**
Constraints:

1 <= nums.length <= 105
-105 <= nums[i] <= 105
The integers in nums are distinct.
*/

function minimumDeletions(nums: number[]): number {
  const n = nums.length;
  if (n === 1) return 1;

  let minValIdx = 0;
  let maxValIdx = 0;

  // Find the indices of the minimum and maximum elements.
  for (let i = 1; i < n; i++) {
    if (nums[i] < nums[minValIdx]) minValIdx = i;
    if (nums[i] > nums[maxValIdx]) maxValIdx = i;
  }

  // Identify which index is smaller and which is larger for calculation.
  let i = Math.min(minValIdx, maxValIdx);
  let j = Math.max(minValIdx, maxValIdx);

  // Option 1: Remove both from the front.
  const opt1 = j + 1;

  // Option 2: Remove both from the back.
  const opt2 = n - i;

  // Option 3: Remove one from the front and one from the back.
  const opt3 = i + 1 + (n - j);

  // Return the minimum of the three options.
  return Math.min(opt1, opt2, opt3);
}

// Example usage:
console.log(minimumDeletions([2, 10, 7, 5, 4, 1, 8, 6])); // Output: 5
console.log(minimumDeletions([0, -4, 19, 1, 8, -2, -3, 5])); // Output: 3
console.log(minimumDeletions([101])); // Output: 1
