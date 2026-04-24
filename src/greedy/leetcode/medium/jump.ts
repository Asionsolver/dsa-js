// 45. Jump Game II

/**
Example 1:

Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
Example 2:

Input: nums = [2,3,0,1,4]
Output: 2
*/

function jump(nums: number[]): number {
  let jumps = 0;
  let currentEnd = 0;
  let farthest = 0;

  // We only iterate up to nums.length - 2
  // because if we are at the last element, we don't need to jump anymore.
  for (let i = 0; i < nums.length - 1; i++) {
    // Update the farthest index we can reach from the current position
    farthest = Math.max(farthest, i + nums[i]);

    // If we have reached the end of the current jump's range
    if (i === currentEnd) {
      jumps++; // We need to make a jump
      currentEnd = farthest; // Update the current jump's range to the farthest we can reach

      // Optimization: if our current jump's range covers the last index, we can stop early
      if (currentEnd >= nums.length - 1) {
        break;
      }
    }
  }

  return jumps;
}

// Example usage:
console.log(jump([2, 3, 1, 1, 4])); // Output: 2
console.log(jump([2, 3, 0, 1, 4])); // Output: 2
