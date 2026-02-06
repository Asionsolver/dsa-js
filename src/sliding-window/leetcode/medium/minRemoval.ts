// 3634. Minimum Removals to Balance Array

/**
Example 1:

Input: nums = [2,1,5], k = 2

Output: 1

Explanation:

Remove nums[2] = 5 to get nums = [2, 1].
Now max = 2, min = 1 and max <= min * k as 2 <= 1 * 2. Thus, the answer is 1.
Example 2:

Input: nums = [1,6,2,9], k = 3

Output: 2

Explanation:

Remove nums[0] = 1 and nums[3] = 9 to get nums = [6, 2].
Now max = 6, min = 2 and max <= min * k as 6 <= 2 * 3. Thus, the answer is 2.
Example 3:

Input: nums = [4,6], k = 2

Output: 0

Explanation:

Since nums is already balanced as 6 <= 4 * 2, no elements need to be removed.

*/
const nums = [4, 6],
  k = 2;
const minRemovals = function (nums: number[], k: number): number {
  // Step 1: Sort the array in ascending order.
  // This allows us to treat the problem as finding the longest contiguous subarray.
  nums.sort((a, b) => a - b);

  let left = 0;
  let maxLen = 0;

  // Step 2: Sliding window to find the longest valid subarray.
  for (let right = 0; right < nums.length; right++) {
    // nums[right] is the candidate for the maximum element in the current window.
    // nums[left] is the candidate for the minimum element.
    // If the condition fails, shrink the window from the left.
    while (nums[right] > nums[left] * k) {
      left++;
    }

    // Update the maximum length found so far.
    maxLen = Math.max(maxLen, right - left + 1);
  }

  // Step 3: The answer is total elements minus the max elements kept.
  return nums.length - maxLen;
};

console.log(minRemovals(nums, k));
