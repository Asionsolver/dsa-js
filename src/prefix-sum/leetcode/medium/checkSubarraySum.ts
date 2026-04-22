// 523. Continuous Subarray Sum

/**
Example 1:

Input: nums = [23,2,4,6,7], k = 6
Output: true
Explanation: [2, 4] is a continuous subarray of size 2 whose elements sum up to 6.
Example 2:

Input: nums = [23,2,6,4,7], k = 6
Output: true
Explanation: [23, 2, 6, 4, 7] is an continuous subarray of size 5 whose elements sum up to 42.
42 is a multiple of 6 because 42 = 7 * 6 and 7 is an integer.
Example 3:

Input: nums = [23,2,6,4,7], k = 13
Output: false
*/

function checkSubarraySum(nums: number[], k: number): boolean {
  // Map to store the FIRST occurrence of a specific remainder: Map<remainder, index>
  const remainderMap = new Map<number, number>();

  // Initialize with remainder 0 at index -1.
  // This correctly handles cases where a valid subarray starts from index 0.
  // (e.g., if the first two elements sum to a multiple of k, index difference will be 1 - (-1) = 2)
  remainderMap.set(0, -1);

  let remainder = 0;

  for (let i = 0; i < nums.length; i++) {
    // Compute running remainder (mod k handles preventing potential integer overflow)
    remainder = (remainder + nums[i]) % k;

    if (remainderMap.has(remainder)) {
      // Check if the subarray length is at least 2
      const prevIndex = remainderMap.get(remainder)!;
      if (i - prevIndex >= 2) {
        return true;
      }
    } else {
      // If remainder isn't in the map, store it with the current index.
      // Note: We only store the FIRST time we see a remainder to maximize
      // the subarray length for future occurrences.
      remainderMap.set(remainder, i);
    }
  }

  return false;
}

// Example usage:
console.log(checkSubarraySum([23, 2, 4, 6, 7], 6)); // true
console.log(checkSubarraySum([23, 2, 6, 4, 7], 6)); // true
console.log(checkSubarraySum([23, 2, 6, 4, 7], 13)); // false
