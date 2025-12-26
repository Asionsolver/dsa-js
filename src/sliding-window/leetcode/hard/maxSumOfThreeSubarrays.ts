// 689. Maximum Sum of 3 Non-Overlapping Subarrays

/**
Example 1:

Input: nums = [1,2,1,2,6,7,5,1], k = 2
Output: [0,3,5]
Explanation: Subarrays [1, 2], [2, 6], [7, 5] correspond to the starting indices [0, 3, 5].
We could have also taken [2, 1], but an answer of [1, 3, 5] would be lexicographically larger.
Example 2:

Input: nums = [1,2,1,2,1,2,1,2,1], k = 2
Output: [0,2,4]
*/

const nums = [1, 2, 1, 2, 6, 7, 5, 1],
  k = 2;

const maxSumOfThreeSubarrays = function (nums: number[], k: number) {
  const n = nums.length;
  // Number of possible windows of length k
  const wLen = n - k + 1;
  const sums: number[] = new Array(wLen).fill(0);

  // 1. Calculate Sliding Window Sums
  let currentSum = 0;
  for (let i = 0; i < n; i++) {
    currentSum += nums[i];

    // Remove element leaving the window
    if (i >= k) {
      currentSum -= nums[i - k];
    }

    // Add window sum to array (indexed by start of window)
    if (i >= k - 1) {
      sums[i - k + 1] = currentSum;
    }
  }

  // 2. Build 'left' array
  // left[i] stores the starting index of the subarray with max sum
  // within the range of windows starting from 0 to i.
  const left: number[] = new Array(wLen).fill(0);
  let bestLeftIdx = 0;
  for (let i = 0; i < wLen; i++) {
    // Strict > ensures we keep the lexicographically smaller index on ties
    if (sums[i] > sums[bestLeftIdx]) {
      bestLeftIdx = i;
    }
    left[i] = bestLeftIdx;
  }

  // 3. Build 'right' array
  // right[i] stores the starting index of the subarray with max sum
  // within the range of windows starting from i to the end.
  const right: number[] = new Array(wLen).fill(0);
  let bestRightIdx = wLen - 1;
  for (let i = wLen - 1; i >= 0; i--) {
    // >= ensures that if we find a sum equal to the current max,
    // we update to 'i' because 'i' is smaller than 'bestRightIdx' (iterating backwards)
    if (sums[i] >= sums[bestRightIdx]) {
      bestRightIdx = i;
    }
    right[i] = bestRightIdx;
  }

  // 4. Find the maximum total by iterating the middle interval
  let maxTotal = 0;
  let result: number[] = [];

  // Valid range for the start of the middle interval:
  // It needs k space on the left and k space on the right.
  // Middle starts at i. Left ends at i-1 (starts at i-k). Right starts at i+k.
  for (let i = k; i < wLen - k; i++) {
    const l = left[i - k];
    const r = right[i + k];

    const total = sums[l] + sums[i] + sums[r];

    // Strict > ensures we keep the lexicographically first valid combination found
    if (total > maxTotal) {
      maxTotal = total;
      result = [l, i, r];
    }
  }

  return result;
};

console.log(maxSumOfThreeSubarrays(nums, k));
