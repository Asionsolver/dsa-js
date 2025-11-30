// 268. Missing Number

/**
Example 1:

Input: nums = [3,0,1]

Output: 2

Explanation:

n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.

Example 2:

Input: nums = [0,1]

Output: 2

Explanation:

n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.

Example 3:

Input: nums = [9,6,4,2,3,5,7,0,1]

Output: 8

Explanation:

n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.
*/

const nums = [3, 0, 1];
const missingNumber = function (nums: number[]): number {
  const n = nums.length;

  // Calculate the expected sum of numbers from 0 to n
  const expectedSum = (n * (n + 1)) / 2;

  // Calculate the actual sum of the numbers in the array
  const actualSum = nums.reduce((acc, curr) => acc + curr, 0);

  // The difference is the missing number
  return expectedSum - actualSum;
};

console.log(missingNumber(nums));
