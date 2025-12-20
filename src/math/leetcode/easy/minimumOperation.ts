// 3190. Find Minimum Operations to Make All Elements Divisible by Three

/**
Example 1:

Input: nums = [1,2,3,4]

Output: 3

Explanation:

All array elements can be made divisible by 3 using 3 operations:

Subtract 1 from 1.
Add 1 to 2.
Subtract 1 from 4.
Example 2:

Input: nums = [3,6,9]

Output: 0
*/
const nums = [1, 2, 3, 4];
const minimumOperations = function (nums: number[]) {
  return nums.reduce((acc, num) => acc + (num % 3 !== 0 ? 1 : 0), 0);
};
console.log(minimumOperations(nums));
