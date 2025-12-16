// 3432. Count Partitions with Even Sum Difference

/**
Example 1:

Input: nums = [10,10,3,7,6]

Output: 4

Explanation:

The 4 partitions are:

[10], [10, 3, 7, 6] with a sum difference of 10 - 26 = -16, which is even.
[10, 10], [3, 7, 6] with a sum difference of 20 - 16 = 4, which is even.
[10, 10, 3], [7, 6] with a sum difference of 23 - 13 = 10, which is even.
[10, 10, 3, 7], [6] with a sum difference of 30 - 6 = 24, which is even.
Example 2:

Input: nums = [1,2,2]
1-4
3-2

Output: 0

Explanation:

No partition results in an even sum difference.

Example 3:

Input: nums = [2,4,6,8]

2-18
6-14
12-8
Output: 3

Explanation:

All partitions result in an even sum difference.

*/

// const nums = [2, 4, 6, 8];
// const nums = [10, 10, 3, 7, 6];
// const nums = [1, 2, 2];

const countPartitions = function (nums: number[]) {
  const n = nums.length;
  const total = nums.reduce((a, b) => a + b, 0);

  // If total is odd → no valid partitions
  if (total % 2 === 1) return 0;

  // If total is even → all (n - 1) partitions valid
  return n - 1;
};

// Example Usage:
console.log(countPartitions([10, 10, 3, 7, 6]));
console.log(countPartitions([1, 2, 2]));
console.log(countPartitions([2, 4, 6, 8]));
