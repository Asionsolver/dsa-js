// Longest Subarray With Sum K
// const subArr = [10, 5, 2, 7, 1, -10];
// const k = 15;
// Output: 6
// Explanation: Subarrays with sum = 15 are [5, 2, 7, 1], [10, 5] and [10, 5, 2, 7, 1, -10]. The length of the longest subarray with a sum of 15 is 6.

// const subArr = [-5, 8, -14, 2, 4, 12];
// const k = -5;
// Output: 5
// Explanation: Only subarray with sum = 15 is [-5, 8, -14, 2, 4] of length 5.

// const subArr = [10, -10, 20, 30];
// const k = 5;
// Output: 0

const subArr = [94, -33, -13, 40, -82, 94, -33, -13, 40, -82];
const k = 52;
// Output: 3
// Explanation: No subarray with sum = 5 is present in arr[].

// optimize way
const longestSubArray = function (nums: number[], k: number) {
  let sumMap = new Map();
  let longest = 0;
  let sum = 0;

  sumMap.set(sum, -1);
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    let difference = sum - k;
    if (sumMap.has(difference)) {
      longest = Math.max(longest, i - sumMap.get(difference));
    }

    if (!sumMap.has(sum)) sumMap.set(sum, i);
  }

  return longest;
};
console.log(longestSubArray(subArr, k));
