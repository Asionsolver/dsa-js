import { it } from "node:test";
// 26. Remove Duplicates from Sorted Array

/**
Example 1:

Input: nums = [1,1,1,2,2,3]
Output: 5, nums = [1,1,2,2,3,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
Example 2:

Input: nums = [0,0,1,1,1,1,2,3,3]
Output: 7, nums = [0,0,1,1,2,3,3,_,_]
Explanation: Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
*/

const numsDuplicate = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
const removeDuplicates = function (nums: number[]) {
  let j = 1;
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] !== nums[i + 1]) {
      nums[j] = nums[i + 1];
      j++;
    }
  }
  return j;
};
console.log(removeDuplicates(numsDuplicate));
