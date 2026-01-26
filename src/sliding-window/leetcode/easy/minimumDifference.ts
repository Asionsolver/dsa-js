// 1984. Minimum Difference Between Highest and Lowest of K Scores

/**
Example 1:

Input: nums = [90], k = 1
Output: 0
Explanation: There is one way to pick score(s) of one student:
- [90]. The difference between the highest and lowest score is 90 - 90 = 0.
The minimum possible difference is 0.
Example 2:

Input: nums = [9,4,1,7], k = 2
Output: 2
Explanation: There are six ways to pick score(s) of two students:
- [9,4,1,7]. The difference between the highest and lowest score is 9 - 4 = 5.
- [9,4,1,7]. The difference between the highest and lowest score is 9 - 1 = 8.
- [9,4,1,7]. The difference between the highest and lowest score is 9 - 7 = 2.
- [9,4,1,7]. The difference between the highest and lowest score is 4 - 1 = 3.
- [9,4,1,7]. The difference between the highest and lowest score is 7 - 4 = 3.
- [9,4,1,7]. The difference between the highest and lowest score is 7 - 1 = 6.
The minimum possible difference is 2.
*/
const nums = [9, 4, 1, 7],
  k = 2;
const minimumDifference = function (nums: number[], k: number): number {
  // Edge case: If we only select 1 student, the difference is always 0.
  if (k === 1) return 0;

  // 1. Sort the array in ascending order.
  // Note: We must provide a comparator function, otherwise JS sorts lexicographically (e.g., 10 comes before 2).
  nums.sort((a, b) => a - b);

  let minDiff = Infinity;

  // 2. Iterate through the array using a sliding window of size k.
  // i represents the left pointer (start of the window).
  // The loop runs until the right pointer (i + k - 1) reaches the end of the array.
  for (let i = 0; i <= nums.length - k; i++) {
    // The highest score in this sorted window is at index (i + k - 1)
    // The lowest score in this sorted window is at index i
    const currentDiff = nums[i + k - 1] - nums[i];

    // Update the minimum difference found so far
    minDiff = Math.min(minDiff, currentDiff);
  }

  return minDiff;
};

console.log(minimumDifference(nums, k));
