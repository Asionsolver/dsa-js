// 961. N-Repeated Element in Size 2N Array

/**
Example 1:

Input: nums = [1,2,3,3]
Output: 3
Example 2:

Input: nums = [2,1,2,5,3,2]
Output: 2
Example 3:

Input: nums = [5,1,5,2,5,3,5,4]
Output: 5
*/

const nums = [1, 2, 3, 3];
const repeatedNTimes = function (nums: number[]): number {
  const seen = new Set<number>();

  for (const num of nums) {
    // If the number is already in the set, it's the repeated element
    if (seen.has(num)) {
      return num;
    }
    // Otherwise, add it to the set
    seen.add(num);
  }

  // The constraints guarantee a solution, so this line is unreachable
  return -1;
};
console.log(repeatedNTimes(nums));
