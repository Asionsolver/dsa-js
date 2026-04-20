// 2799. Count Complete Subarrays in an Array

/**
Example 1:

Input: nums = [1,3,1,2,2]
Output: 4
Explanation: The complete subarrays are the following: [1,3,1,2], [1,3,1,2,2], [3,1,2] and [3,1,2,2].
Example 2:

Input: nums = [5,5,5,5]
Output: 10
Explanation: The array consists only of the integer 5, so any subarray is complete. The number of subarrays that we can choose is 10.
*/

const countCompleteSubarrays = (nums: number[]): number => {
  const k = new Set(nums).size;
  const n = nums.length;

  // Given the constraints (nums[i] <= 2000), a fixed array is faster than a Map
  const counts = new Int32Array(2001);

  let distinct = 0;
  let left = 0;
  let totalCompleteSubarrays = 0;

  for (let right = 0; right < n; right++) {
    // Add current element to the window
    if (counts[nums[right]] === 0) {
      distinct++;
    }
    counts[nums[right]]++;

    // Whenever the window has all the distinct elements
    while (distinct === k) {
      // All subarrays starting at 'left' and ending at 'right' or anywhere
      // past 'right' (up to the end of the array) are valid complete subarrays.
      totalCompleteSubarrays += n - right;

      // Try to shrink the window from the left
      counts[nums[left]]--;
      if (counts[nums[left]] === 0) {
        distinct--; // Lost a distinct element
      }
      left++;
    }
  }

  return totalCompleteSubarrays;
};

// example use
console.log(countCompleteSubarrays([1, 3, 1, 2, 2])); // Output: 4
console.log(countCompleteSubarrays([5, 5, 5, 5])); // Output: 10
