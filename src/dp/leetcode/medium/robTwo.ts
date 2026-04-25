// 213. House Robber II

/**
Example 1:

Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
Example 2:

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
Example 3:

Input: nums = [1,2,3]
Output: 3
*/

function rob(nums: number[]): number {
  const n = nums.length;

  // Base cases
  if (n === 0) return 0;
  if (n === 1) return nums[0];

  // Helper function to solve the linear house robber problem
  const robLinear = (start: number, end: number): number => {
    let rob1 = 0; // max money robbed up to 2 houses ago
    let rob2 = 0; // max money robbed up to the previous house

    for (let i = start; i <= end; i++) {
      // max money if we rob the current house vs if we skip it
      const currentMax = Math.max(rob1 + nums[i], rob2);

      // Shift variables for the next iteration
      rob1 = rob2;
      rob2 = currentMax;
    }

    return rob2;
  };

  // Scenario 1: Rob from house 0 to n-2 (skip the last house)
  const max1 = robLinear(0, n - 2);

  // Scenario 2: Rob from house 1 to n-1 (skip the first house)
  const max2 = robLinear(1, n - 1);

  // The result is the maximum of the two scenarios
  return Math.max(max1, max2);
}

// Test cases
console.log(rob([2, 3, 2])); // Output: 3
console.log(rob([1, 2, 3, 1])); // Output: 4
console.log(rob([1, 2, 3])); // Output: 3
