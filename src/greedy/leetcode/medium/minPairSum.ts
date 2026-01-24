// 1877. Minimize Maximum Pair Sum in Array

/**
Example 1:

Input: nums = [3,5,2,3]
Output: 7
Explanation: The elements can be paired up into pairs (3,3) and (5,2).
The maximum pair sum is max(3+3, 5+2) = max(6, 7) = 7.
Example 2:

Input: nums = [3,5,4,2,4,6]
Output: 8
Explanation: The elements can be paired up into pairs (3,5), (4,4), and (6,2).
The maximum pair sum is max(3+5, 4+4, 6+2) = max(8, 8, 8) = 8.
*/
const nums = [3, 5, 4, 2, 4, 6];

const minPairSum = function (nums: number[]): number {
  // 1. Sort the array in ascending order.
  // We provide a compare function because default JS/TS sort is lexicographical.
  nums.sort((a, b) => a - b);

  let maxPairSum = 0;
  const n = nums.length;

  // 2. Iterate up to half the length of the array.
  // We pair nums[i] (smallest available) with nums[n - 1 - i] (largest available).
  for (let i = 0; i < n / 2; i++) {
    const currentPairSum = nums[i] + nums[n - 1 - i];

    // 3. Keep track of the maximum sum encountered.
    maxPairSum = Math.max(maxPairSum, currentPairSum);
  }

  return maxPairSum;
};

console.log(minPairSum(nums));
