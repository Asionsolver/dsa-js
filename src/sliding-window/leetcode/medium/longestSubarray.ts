// 1493. Longest Subarray of 1's After Deleting One Element

/**
Example 1:

Input: nums = [1,1,0,1]
Output: 3
Explanation: After deleting the number in position 2, [1,1,1] contains 3 numbers with value of 1's.
Example 2:

Input: nums = [0,1,1,1,0,1,1,0,1]
Output: 5
Explanation: After deleting the number in position 4, [0,1,1,1,1,1,0,1] longest subarray with value of 1's is [1,1,1,1,1].
Example 3:

Input: nums = [1,1,1]
Output: 2
Explanation: You must delete one element.
*/

function longestSubarray(nums: number[]): number {
  let left = 0;
  let zeroCount = 0;
  let maxLength = 0;

  for (let right = 0; right < nums.length; right++) {
    // If we encounter a zero, increment the zeroCount
    if (nums[right] === 0) {
      zeroCount++;
    }

    // If there's more than one zero in the window, shrink the window from the left
    while (zeroCount > 1) {
      if (nums[left] === 0) {
        zeroCount--;
      }
      left++;
    }

    // Calculate the maximum length of 1s we can get from the current valid window.
    // The actual window size is (right - left + 1).
    // Since we MUST delete one element, the remaining length is (right - left).
    maxLength = Math.max(maxLength, right - left);
  }

  return maxLength;
}

//example use
console.log(longestSubarray([1, 1, 0, 1])); // Output: 3
console.log(longestSubarray([0, 1, 1, 1, 0, 1, 1, 0, 1])); // Output: 5
console.log(longestSubarray([1, 1, 1])); // Output: 2
