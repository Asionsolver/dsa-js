// 992. Subarrays with K Different Integers

/**
Example 1:

Input: nums = [1,2,1,2,3], k = 2
Output: 7
Explanation: Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]
Example 2:

Input: nums = [1,2,1,3,4], k = 3
Output: 3
Explanation: Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].
*/

function subarraysWithKDistinct(nums: number[], k: number): number {
  // Exact(K) = AtMost(K) - AtMost(K - 1)
  return atMost(nums, k) - atMost(nums, k - 1);
}

function atMost(nums: number[], k: number): number {
  // A subarray cannot have at most 0 distinct integers unless it's empty.
  if (k === 0) return 0;

  // Use an Int32Array as a frequency map for better performance.
  // Size is nums.length + 1 because constraints say 1 <= nums[i] <= nums.length
  const freq = new Int32Array(nums.length + 1);

  let left = 0;
  let distinct = 0;
  let totalSubarrays = 0;

  for (let right = 0; right < nums.length; right++) {
    // If we are seeing this number for the first time in the window
    if (freq[nums[right]] === 0) {
      distinct++;
    }
    freq[nums[right]]++;

    // If the window has more than 'k' distinct integers, shrink it from the left
    while (distinct > k) {
      freq[nums[left]]--;
      // If a number is completely removed from the window
      if (freq[nums[left]] === 0) {
        distinct--;
      }
      left++;
    }

    // The number of valid subarrays ending at 'right' is exactly the size of the window
    totalSubarrays += right - left + 1;
  }

  return totalSubarrays;
}

// Example usage:
console.log(subarraysWithKDistinct([1, 2, 1, 2, 3], 2)); // Output: 7
console.log(subarraysWithKDistinct([1, 2, 1, 3, 4], 3)); // Output: 3
