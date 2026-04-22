// 1838. Frequency of the Most Frequent Element

/**
Example 1:

Input: nums = [1,2,4], k = 5
Output: 3
Explanation: Increment the first element three times and the second element two times to make nums = [4,4,4].
4 has a frequency of 3.
Example 2:

Input: nums = [1,4,8,13], k = 5
Output: 2
Explanation: There are multiple optimal solutions:
- Increment the first element three times to make nums = [4,4,8,13]. 4 has a frequency of 2.
- Increment the second element four times to make nums = [1,8,8,13]. 8 has a frequency of 2.
- Increment the third element five times to make nums = [1,4,13,13]. 13 has a frequency of 2.
Example 3:

Input: nums = [3,9,6], k = 2
Output: 1

*/

function maxFrequency(nums: number[], k: number): number {
  // Sort the array in ascending order
  nums.sort((a, b) => a - b);

  let left = 0;
  let currentSum = 0;
  let maxFreq = 0;

  for (let right = 0; right < nums.length; right++) {
    // Add the current element to our running sum
    currentSum += nums[right];

    // The formula to check if we have enough `k` operations:
    // (Size of window * target element) - sum of window elements <= k
    while ((right - left + 1) * nums[right] - currentSum > k) {
      // If it requires more than k operations, shrink the window from the left
      currentSum -= nums[left];
      left++;
    }

    // Update the maximum frequency found so far
    maxFreq = Math.max(maxFreq, right - left + 1);
  }

  return maxFreq;
}

// Example usage:
console.log(maxFrequency([1, 2, 4], 5)); // Output: 3
console.log(maxFrequency([1, 4, 8, 13], 5)); // Output: 2
console.log(maxFrequency([3, 9, 6], 2)); // Output: 1
