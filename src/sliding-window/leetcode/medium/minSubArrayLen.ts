// 209. Minimum Size Subarray Sum

/**
Example 1:

Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.
Example 2:

Input: target = 4, nums = [1,4,4]
Output: 1
Example 3:

Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0
*/

function minSubArrayLen(target: number, nums: number[]): number {
  let minLength = Infinity;
  let sum = 0;
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right]; // Expand the window to the right

    // Shrink the window from the left as long as the condition is met
    while (sum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  // If minLength is still Infinity, no valid subarray was found
  return minLength === Infinity ? 0 : minLength;
}

// Test cases
console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); // Output: 2
console.log(minSubArrayLen(4, [1, 4, 4])); // Output: 1
console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1])); // Output: 0
