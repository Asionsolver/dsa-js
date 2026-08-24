// 1872. Stone Game VIII

/**
Example 1:

Input: stones = [-1,2,-3,4,-5]
Output: 5
Explanation:
- Alice removes the first 4 stones, adds (-1) + 2 + (-3) + 4 = 2 to her score, and places a stone of
  value 2 on the left. stones = [2,-5].
- Bob removes the first 2 stones, adds 2 + (-5) = -3 to his score, and places a stone of value -3 on
  the left. stones = [-3].
The difference between their scores is 2 - (-3) = 5.
Example 2:

Input: stones = [7,-6,5,10,5,-2,-6]
Output: 13
Explanation:
- Alice removes all stones, adds 7 + (-6) + 5 + 10 + 5 + (-2) + (-6) = 13 to her score, and places a
  stone of value 13 on the left. stones = [13].
The difference between their scores is 13 - 0 = 13.
Example 3:

Input: stones = [-10,-12]
Output: -22
Explanation:
- Alice can only make one move, which is to remove both stones. She adds (-10) + (-12) = -22 to her
  score and places a stone of value -22 on the left. stones = [-22].
The difference between their scores is (-22) - 0 = -22.
*/

// function stoneGameVIII(stones: number[]): number {
//   const n = stones.length;
//   let sum = 0;

//   // Compute the total sum of the stones, which corresponds to the last prefix sum P[n-1]
//   for (let i = 0; i < n; i++) {
//     sum += stones[i];
//   }

//   // dp represents the maximum difference the current player can achieve
//   // Base case: picking all the stones ending the game on the final index (x = n stones picked)
//   let dp = sum;

//   // Traverse backwards traversing options from n-2 down to 1
//   // i >= 1 is used because a player must take at least 2 stones (x > 1 => index >= 1)
//   for (let i = n - 2; i >= 1; i--) {
//     // By decrementing by stones[i+1] sequentially, 'sum' smoothly scales back to P[i]
//     sum -= stones[i + 1];

//     // Choose between delaying the choice (dp) or taking the current prefix sum (sum - dp)
//     dp = Math.max(dp, sum - dp);
//   }

//   return dp;
// }

function stoneGameVIII(stones: number[]): number {
  const n = stones.length;

  // Step 1: Calculate the Prefix Sums array

  const prefixSums = new Array(n).fill(0);
  prefixSums[0] = stones[0];
  for (let i = 1; i < n; i++) {
    prefixSums[i] = prefixSums[i - 1] + stones[i];
  }

  // Step 2: Create a DP array to store max score differences

  const dp = new Array(n).fill(0);

  // Base Case: If the player takes all remaining stones (index n-1)

  dp[n - 1] = prefixSums[n - 1];

  // Step 3: Fill the DP array backwards

  for (let i = n - 2; i >= 1; i--) {
    // Option 1: Take the current prefix sum, opponent gets dp[i+1]

    const take = prefixSums[i] - dp[i + 1];

    // Option 2: Skip this prefix sum, same as dp[i+1]

    const skip = dp[i + 1];

    // Maximize the current player's relative score

    dp[i] = Math.max(take, skip);
  }

  // Alice must take at least 2 stones, which corresponds to index 1

  return dp[1];
}

// Example usage:
console.log(stoneGameVIII([-1, 2, -3, 4, -5])); // Output: 5
console.log(stoneGameVIII([7, -6, 5, 10, 5, -2, -6])); // Output: 13
console.log(stoneGameVIII([-10, -12])); // Output: -22
