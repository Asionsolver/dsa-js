// 740. Delete and Earn

/**
Example 1:

Input: nums = [3,4,2]
Output: 6
Explanation: You can perform the following operations:
- Delete 4 to earn 4 points. Consequently, 3 is also deleted. nums = [2].
- Delete 2 to earn 2 points. nums = [].
You earn a total of 6 points.
Example 2:

Input: nums = [2,2,3,3,3,4]
Output: 9
Explanation: You can perform the following operations:
- Delete a 3 to earn 3 points. All 2's and 4's are also deleted. nums = [3,3].
- Delete a 3 again to earn 3 points. nums = [3].
- Delete a 3 once more to earn 3 points. nums = [].
You earn a total of 9 points.
*/

function deleteAndEarn(nums: number[]): number {
  if (nums.length === 0) return 0;

  // 1. Find the maximum value in the array to determine the size of our points map
  let maxVal = 0;
  for (const num of nums) {
    if (num > maxVal) {
      maxVal = num;
    }
  }

  // 2. Accumulate the total points for each number
  // We use Int32Array for better performance and lower memory footprint
  const points = new Int32Array(maxVal + 1);
  for (const num of nums) {
    points[num] += num;
  }

  // 3. Dynamic Programming (similar to House Robber)
  let prev2 = 0; // Represents dp[i - 2]
  let prev1 = points[1]; // Represents dp[i - 1]

  for (let i = 2; i <= maxVal; i++) {
    const take = prev2 + points[i];
    const skip = prev1;

    // Update variables for the next iteration
    prev2 = prev1;
    prev1 = Math.max(take, skip);
  }

  // prev1 holds the maximum points we can earn considering all numbers up to maxVal
  return prev1;
}

// Example usage:
const nums1 = [3, 4, 2];
console.log(deleteAndEarn(nums1)); // Output: 6

const nums2 = [2, 2, 3, 3, 3, 4];
console.log(deleteAndEarn(nums2)); // Output: 9
