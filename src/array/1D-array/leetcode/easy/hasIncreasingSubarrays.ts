// 3349. Adjacent Increasing Subarrays Detection I

/**
Example 1:

Input: nums = [2,5,7,8,9,2,3,4,3,1], k = 3

Output: true

Explanation:

The subarray starting at index 2 is [7, 8, 9], which is strictly increasing.
The subarray starting at index 5 is [2, 3, 4], which is also strictly increasing.
These two subarrays are adjacent, so the result is true.
Example 2:

Input: nums = [1,2,3,4,4,4,4,5,6,7], k = 5

Output: false


*/

function hasIncreasingSubarrays(nums: number[], k: number): boolean {
  const n = nums.length;

  // The maximum starting index for the first subarray is n - 2 * k
  for (let a = 0; a <= n - 2 * k; a++) {
    let firstIncreasing = true;

    // Check if the first subarray is strictly increasing
    for (let i = a; i < a + k - 1; i++) {
      if (nums[i] >= nums[i + 1]) {
        firstIncreasing = false;
        break;
      }
    }

    // Small optimization: If the first subarray isn't strictly increasing, skip the second check
    if (!firstIncreasing) {
      continue;
    }

    let secondIncreasing = true;

    // Check if the second adjacent subarray is strictly increasing
    for (let i = a + k; i < a + 2 * k - 1; i++) {
      if (nums[i] >= nums[i + 1]) {
        secondIncreasing = false;
        break;
      }
    }

    // If both adjacent subarrays are strictly increasing, return true
    if (secondIncreasing) {
      return true;
    }
  }

  // No two such subarrays were found
  return false;
}

// Test cases
console.log(hasIncreasingSubarrays([2, 5, 7, 8, 9, 2, 3, 4, 3, 1], 3)); // Output: true
console.log(hasIncreasingSubarrays([1, 2, 3, 4, 4, 4, 4, 5, 6, 7], 5)); // Output: false
