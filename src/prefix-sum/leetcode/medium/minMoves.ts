// 1674. Minimum Moves to Make Array Complementary

/**
Example 1:

Input: nums = [1,2,4,3], limit = 4
Output: 1
Explanation: In 1 move, you can change nums to [1,2,2,3] (underlined elements are changed).
nums[0] + nums[3] = 1 + 3 = 4.
nums[1] + nums[2] = 2 + 2 = 4.
nums[2] + nums[1] = 2 + 2 = 4.
nums[3] + nums[0] = 3 + 1 = 4.
Therefore, nums[i] + nums[n-1-i] = 4 for every i, so nums is complementary.
Example 2:

Input: nums = [1,2,2,1], limit = 2
Output: 2
Explanation: In 2 moves, you can change nums to [2,2,2,2]. You cannot change any number to 3 since 3 > limit.
Example 3:

Input: nums = [1,2,1,2], limit = 2
Output: 0
Explanation: nums is already complementary.

*/

function minMoves(nums: number[], limit: number): number {
  const n = nums.length;
  // Difference array to record the change in moves needed.
  // Size is 2 * limit + 2 to safely accommodate max possible index `B + limit + 1`.
  const delta = new Int32Array(2 * limit + 2);

  // Process each complementary pair
  for (let i = 0, j = n - 1; i < j; i++, j--) {
    const a = Math.min(nums[i], nums[j]);
    const b = Math.max(nums[i], nums[j]);

    // Apply the difference bounds per pair:
    // 1. Cost drops from 2 to 1 at `a + 1`
    delta[a + 1]--;

    // 2. Cost drops from 1 to 0 at `a + b`
    delta[a + b]--;

    // 3. Cost rises from 0 to 1 at `a + b + 1`
    delta[a + b + 1]++;

    // 4. Cost rises from 1 to 2 at `b + limit + 1`
    delta[b + limit + 1]++;
  }

  // Every pair starts with an assumption of 2 moves.
  // For n / 2 pairs, base max moves is n.
  let currentMoves = n;
  let minMoves = n;

  // Evaluate the genuine move counts iteratively checking all valid target Sums X.
  for (let x = 2; x <= 2 * limit; x++) {
    currentMoves += delta[x];
    if (currentMoves < minMoves) {
      minMoves = currentMoves;
    }
  }

  return minMoves;
}

// Test cases
console.log(minMoves([1, 2, 4, 3], 4)); // Output: 1
console.log(minMoves([1, 2, 2, 1], 2)); // Output: 2
console.log(minMoves([1, 2, 1, 2], 2)); // Output: 0
