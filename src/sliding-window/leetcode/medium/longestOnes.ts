// 1004. Max Consecutive Ones III

/**
Example 1:

Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,1,1,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
Example 2:

Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
*/

const longestOnes = function (nums: number[], k: number): number {
  let left = 0;
  let maxLength = 0;
  let zeroCount = 0;

  for (let right = 0; right < nums.length; right++) {
    // Expand the window by including the right element
    if (nums[right] === 0) {
      zeroCount++;
    }

    // If our window has more than 'k' zeros, shrink it from the left
    while (zeroCount > k) {
      if (nums[left] === 0) {
        zeroCount--;
      }
      left++;
    }

    // Update the max length found so far
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
};

// Example usage:
console.log(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)); // Output: 6
console.log(
  longestOnes([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3),
); // Output: 10
