// 3346. Maximum Frequency of an Element After Performing Operations I

/**
Example 1:

Input: nums = [1,4,5], k = 1, numOperations = 2

Output: 2

Explanation:

We can achieve a maximum frequency of two by:

Adding 0 to nums[1]. nums becomes [1, 4, 5].
Adding -1 to nums[2]. nums becomes [1, 4, 4].
Example 2:

Input: nums = [5,11,20,20], k = 5, numOperations = 1

Output: 2

Explanation:

We can achieve a maximum frequency of two by:

Adding 0 to nums[1].

*/

const nums = [1, 4, 5],
  k = 1,
  numOperations = 2;

const maxFrequency = function (
  nums: number[],
  k: number,
  numOperations: number
) {
  // Sort nums to use binary search and sliding window
  nums.sort((a, b) => a - b);
  const n = nums.length;

  // Map to store frequency of each number for O(1) access
  const freqMap = new Map<number, number>();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  let maxFreq = 0;

  // Helper: Find the first index where nums[index] >= target
  const lowerBound = (target: number): number => {
    let l = 0,
      r = n;
    while (l < r) {
      const mid = (l + r) >>> 1;
      if (nums[mid] >= target) r = mid;
      else l = mid + 1;
    }
    return l;
  };

  // Helper: Find the first index where nums[index] > target
  const upperBound = (target: number): number => {
    let l = 0,
      r = n;
    while (l < r) {
      const mid = (l + r) >>> 1;
      if (nums[mid] > target) r = mid;
      else l = mid + 1;
    }
    return l;
  };

  // Strategy 1: Check candidates where Target T is an existing number in nums
  // This allows us to utilize the existing frequency count without spending operations
  for (let i = 0; i < n; ) {
    const x = nums[i];
    const countX = freqMap.get(x)!;

    // Find how many numbers are in the range [x - k, x + k]
    const leftIdx = lowerBound(x - k);
    const rightIdx = upperBound(x + k);
    const totalInRange = rightIdx - leftIdx;

    // We can convert neighbors to x, limited by numOperations.
    // The elements already equal to x (countX) are "free".
    const opsUsed = Math.min(numOperations, totalInRange - countX);
    maxFreq = Math.max(maxFreq, countX + opsUsed);

    // Skip duplicates to process unique numbers only
    let j = i + 1;
    while (j < n && nums[j] === x) {
      j++;
    }
    i = j;
  }

  // Strategy 2: Check max density window
  // This covers cases where the optimal Target T might not be in nums,
  // or simply finds the max cluster size bounded by numOperations.
  let left = 0;
  for (let right = 0; right < n; right++) {
    // Maintain a window where the difference between max and min is <= 2*k
    // This ensures all numbers in this window can reach a common midpoint T.
    while (nums[right] - nums[left] > 2 * k) {
      left++;
    }

    const countInWindow = right - left + 1;
    // If we pick a T not in nums, we have 0 initial count, so we rely entirely on operations.
    maxFreq = Math.max(maxFreq, Math.min(countInWindow, numOperations));
  }

  return maxFreq;
};

console.log(maxFrequency(nums, k, numOperations));
