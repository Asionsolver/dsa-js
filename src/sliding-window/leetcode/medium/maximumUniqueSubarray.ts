// 1695. Maximum Erasure Value

/**
Example 1:

Input: nums = [4,2,4,5,6]
Output: 17
Explanation: The optimal subarray here is [2,4,5,6].
Example 2:

Input: nums = [5,2,1,2,5,2,1,2,5]
Output: 8
Explanation: The optimal subarray here is [5,2,1] or [1,2,5].
*/

const maximumUniqueSubarray = (nums: number[]): number => {
  // Array to keep track of numbers in the current window.
  // Sized to 100001 to safely cover up to 10^5 just in case of constraint variations.
  const seen = new Uint8Array(100001);

  let left = 0;
  let currentSum = 0;
  let maxSum = 0;

  for (let right = 0; right < nums.length; right++) {
    const num = nums[right];

    // If the number is already in the window, shrink from the left
    while (seen[num] === 1) {
      seen[nums[left]] = 0;
      currentSum -= nums[left];
      left++;
    }

    // Add the current number to the window
    seen[num] = 1;
    currentSum += num;

    // Update the maximum score found so far
    if (currentSum > maxSum) {
      maxSum = currentSum;
    }
  }

  return maxSum;
};
