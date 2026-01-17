// 3397. Maximum Number of Distinct Elements After Operations

/**
Example 1:

Input: nums = [1,2,2,3,3,4], k = 2

Output: 6

Explanation:

nums changes to [-1, 0, 1, 2, 3, 4] after performing operations on the first four elements.

Example 2:

Input: nums = [4,4,4,4], k = 1

Output: 3

Explanation:

By adding -1 to nums[0] and 1 to nums[1], nums changes to [3, 5, 4, 4].

*/

const nums = [1, 2, 2, 3, 3, 4],
  k = 2;

const maxDistinctElements = function (nums: number[], k: number): number {
  // Sort the array in ascending order.
  // This allows us to process constraints from left to right on the number line.
  nums.sort((a, b) => a - b);

  // Initialize lastUsed to a value smaller than the minimum possible achievable value.
  // Min nums[i] is 1, max k is 10^9, so min value is around -10^9.
  // MIN_SAFE_INTEGER is sufficient.
  let lastUsed = Number.MIN_SAFE_INTEGER;
  let distinctCount = 0;

  for (const num of nums) {
    const minVal = num - k;
    const maxVal = num + k;

    if (lastUsed < minVal) {
      // Case 1: The previous used value is smaller than the current range's start.
      // We greedily pick the smallest possible value in the current range (minVal)
      // to maximize space for future elements.
      lastUsed = minVal;
      distinctCount++;
    } else if (lastUsed < maxVal) {
      // Case 2: The previous used value overlaps with or is just before the current range,
      // but we still have room within the range (lastUsed < maxVal).
      // We pick the next available integer (lastUsed + 1).
      lastUsed++;
      distinctCount++;
    }
    // Case 3: lastUsed >= maxVal.
    // The current element's entire valid range falls behind or on the value we
    // just used for a previous element. We cannot assign a new distinct value
    // that extends our increasing sequence. We skip this element.
  }

  return distinctCount;
};

console.log(maxDistinctElements(nums, k));
