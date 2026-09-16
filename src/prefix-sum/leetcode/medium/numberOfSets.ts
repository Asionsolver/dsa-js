// 1621. Number of Sets of K Non-Overlapping Line Segments

/**
Given n points on a 1-D plane, where the ith point (from 0 to n-1) is at x = i, find the number of ways we can draw exactly k non-overlapping line segments such that each segment covers two or more points. The endpoints of each segment must have integral coordinates. The k line segments do not have to cover all n points, and they are allowed to share endpoints.

Return the number of ways we can draw k non-overlapping line segments. Since this number can be huge, return it modulo 109 + 7.
*/

/**
Example 1:


Input: n = 4, k = 2
Output: 5
Explanation: The two line segments are shown in red and blue.
The image above shows the 5 different ways {(0,2),(2,3)}, {(0,1),(1,3)}, {(0,1),(2,3)}, {(1,2),(2,3)}, {(0,1),(1,2)}.
Example 2:

Input: n = 3, k = 1
Output: 3
Explanation: The 3 ways are {(0,1)}, {(0,2)}, {(1,2)}.
Example 3:

Input: n = 30, k = 7
Output: 796297179
Explanation: The total number of possible ways to draw 7 line segments is 3796297200. Taking this number modulo 109 + 7 gives us 796297179.
 
*/

/**
Constraints:

2 <= n <= 1000
1 <= k <= n-1
*/

// Brute Force Approach: Recursive Backtracking
// function numberOfSets(n: number, k: number): number {
//     const MOD = 1_000_000_007;

//     // Helper function to recursively count valid segment placements.
//     function helper(pointIndex: number, segmentsLeft: number): number {
//         // Base case: all required segments are successfully placed.
//         if (segmentsLeft === 0) {
//             return 1;
//         }

//         // Base case: out of points but segments are still remaining.
//         if (pointIndex >= n) {
//             return 0;
//         }

//         let totalWays = 0;

//         // Option 1: Skip the current point entirely.
//         totalWays = (totalWays + helper(pointIndex + 1, segmentsLeft)) % MOD;

//         // Option 2: Start a segment from pointIndex and end at point m.
//         for (let m = pointIndex + 1; m < n; m++) {
//             totalWays = (totalWays + helper(m, segmentsLeft - 1)) % MOD;
//         }

//         return totalWays;
//     }

//     return helper(0, k);
// }

// Optimized Approach: Dynamic Programming
function numberOfSets(n: number, k: number): number {
  const MOD = 1_000_000_007;

  // dp[i][j] represents the number of ways to draw j segments using points from index i to n - 1.
  const dp: number[][] = Array.from({ length: n }, () =>
    new Array(k + 1).fill(0),
  );

  // Base case: Drawing 0 segments always has exactly 1 valid way (drawing nothing).
  for (let i = 0; i < n; i++) {
    dp[i][0] = 1;
  }

  // Process for each segment count from 1 to k.
  for (let j = 1; j <= k; j++) {
    let suffixSum = 0;

    // Traverse backwards from point n - 2 down to 0.
    for (let i = n - 2; i >= 0; i--) {
      // Accumulate dp[m][j - 1] for all valid endpoints m > i.
      suffixSum = (suffixSum + dp[i + 1][j - 1]) % MOD;

      // dp[i][j] = (skip point i) + (start a segment at point i).
      dp[i][j] = (dp[i + 1][j] + suffixSum) % MOD;
    }
  }

  // The answer is the number of ways to draw k segments using points from 0 to n - 1.
  return dp[0][k];
}

// Example usage:
const n1 = 4;
const k1 = 2;
console.log(numberOfSets(n1, k1)); // Output: 5

const n2 = 3;
const k2 = 1;
console.log(numberOfSets(n2, k2)); // Output: 3

const n3 = 30;
const k3 = 7;
console.log(numberOfSets(n3, k3)); // Output: 796297179
