// 198. House Robber

/**
Example 1:

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
Example 2:

Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.
*/

function rob(nums: number[]): number {
  // prev1 represents the max money robbed up to the previous house (i - 1)
  let prev1 = 0;
  // prev2 represents the max money robbed up to the house before the previous (i - 2)
  let prev2 = 0;

  for (const num of nums) {
    const temp = prev1;
    // The maximum money at the current house is the max of:
    // 1. Robbing the current house + max money from two houses ago (prev2 + num)
    // 2. Skipping the current house and keeping the max money from the previous house (prev1)
    prev1 = Math.max(prev2 + num, prev1);
    prev2 = temp;
  }

  return prev1;
}

// Test cases
console.log(rob([1, 2, 3, 1])); // Output: 4
console.log(rob([2, 7, 9, 3, 1])); // Output: 12
