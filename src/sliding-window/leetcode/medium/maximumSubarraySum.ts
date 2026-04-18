// 2461. Maximum Sum of Distinct Subarrays With Length K

/**
Example 1:

Input: nums = [1,5,4,2,9,9,9], k = 3
Output: 15
Explanation: The subarrays of nums with length 3 are:
- [1,5,4] which meets the requirements and has a sum of 10.
- [5,4,2] which meets the requirements and has a sum of 11.
- [4,2,9] which meets the requirements and has a sum of 15.
- [2,9,9] which does not meet the requirements because the element 9 is repeated.
- [9,9,9] which does not meet the requirements because the element 9 is repeated.
We return 15 because it is the maximum subarray sum of all the subarrays that meet the conditions
Example 2:

Input: nums = [4,4,4], k = 3
Output: 0
Explanation: The subarrays of nums with length 3 are:
- [4,4,4] which does not meet the requirements because the element 4 is repeated.
We return 0 because no subarrays meet the conditions.
*/

const maximumSubarraySum = (nums: number[], k: number): number => {
  // Array to store the frequency of elements in the current window.
  // Size is 100001 as 1 <= nums[i] <= 10^5
  const freq = new Int32Array(100001);

  let currentSum = 0;
  let maxSum = 0;
  let distinctCount = 0;

  // Step 1: Initialize the first window of size k
  for (let i = 0; i < k; i++) {
    currentSum += nums[i];
    if (freq[nums[i]] === 0) {
      distinctCount++;
    }
    freq[nums[i]]++;
  }

  // Check if the first window meets the distinct requirement
  if (distinctCount === k) {
    maxSum = currentSum;
  }

  // Step 2: Slide the window across the remaining elements of the array
  for (let i = k; i < nums.length; i++) {
    // Add the new element entering the window
    currentSum += nums[i];
    if (freq[nums[i]] === 0) {
      distinctCount++;
    }
    freq[nums[i]]++;

    // Remove the old element exiting the window
    const outElement = nums[i - k];
    currentSum -= outElement;
    freq[outElement]--;

    if (freq[outElement] === 0) {
      distinctCount--;
    }

    // If all elements in the sliding window are unique, compare sums
    if (distinctCount === k) {
      if (currentSum > maxSum) {
        maxSum = currentSum;
      }
    }
  }

  return maxSum;
};

// Test cases
console.log(maximumSubarraySum([1, 5, 4, 2, 9, 9, 9], 3)); // Output: 15
console.log(maximumSubarraySum([4, 4, 4], 3)); // Output: 0
