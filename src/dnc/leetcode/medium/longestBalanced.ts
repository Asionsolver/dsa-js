// 3719. Longest Balanced Subarray I

/** 
Example 1:

Input: nums = [2,5,4,3]

Output: 4

Explanation:

The longest balanced subarray is [2, 5, 4, 3].
It has 2 distinct even numbers [2, 4] and 2 distinct odd numbers [5, 3]. Thus, the answer is 4.
Example 2:

Input: nums = [3,2,2,5,4]

Output: 5

Explanation:

The longest balanced subarray is [3, 2, 2, 5, 4].
It has 2 distinct even numbers [2, 4] and 2 distinct odd numbers [3, 5]. Thus, the answer is 5.
Example 3:

Input: nums = [1,2,3,2]

Output: 3

Explanation:

The longest balanced subarray is [2, 3, 2].
It has 1 distinct even number [2] and 1 distinct odd number [3]. Thus, the answer is 3.
*/

const nums = [3, 2, 2, 5, 4];

const longestBalancedSubarray = function (nums: number[]): number {
  let maxLen = 0;
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    // Optimization: If the remaining length from index i is less than
    // or equal to the current maxLen, we cannot find a longer subarray.
    if (n - i <= maxLen) {
      break;
    }

    const distinctEvens = new Set<number>();
    const distinctOdds = new Set<number>();

    for (let j = i; j < n; j++) {
      const num = nums[j];

      if (num % 2 === 0) {
        distinctEvens.add(num);
      } else {
        distinctOdds.add(num);
      }

      // Check if the counts of distinct evens and odds are equal
      if (distinctEvens.size === distinctOdds.size) {
        // j - i + 1 is the current subarray length
        maxLen = Math.max(maxLen, j - i + 1);
      }
    }
  }

  return maxLen;
};

console.log(longestBalancedSubarray(nums));
