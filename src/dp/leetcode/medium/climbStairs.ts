// 3693. Climbing Stairs II

/**
You are climbing a staircase with n + 1 steps, numbered from 0 to n.

You are also given a 1-indexed integer array costs of length n, where costs[i] is the cost of step i.

From step i, you can jump only to step i + 1, i + 2, or i + 3. The cost of jumping from step i to step j is defined as: costs[j] + (j - i)2

You start from step 0 with cost = 0.

Return the minimum total cost to reach step n.


*/

/**
Example 1:

Input: n = 4, costs = [1,2,3,4]

Output: 13

Explanation:

One optimal path is 0 → 1 → 2 → 4

Jump	Cost Calculation	Cost
0 → 1	costs[1] + (1 - 0)2 = 1 + 1	2
1 → 2	costs[2] + (2 - 1)2 = 2 + 1	3
2 → 4	costs[4] + (4 - 2)2 = 4 + 4	8
Thus, the minimum total cost is 2 + 3 + 8 = 13

Example 2:

Input: n = 4, costs = [5,1,6,2]

Output: 11

Explanation:

One optimal path is 0 → 2 → 4

Jump	Cost Calculation	Cost
0 → 2	costs[2] + (2 - 0)2 = 1 + 4	5
2 → 4	costs[4] + (4 - 2)2 = 2 + 4	6
Thus, the minimum total cost is 5 + 6 = 11

Example 3:

Input: n = 3, costs = [9,8,3]

Output: 12

Explanation:

The optimal path is 0 → 3 with total cost = costs[3] + (3 - 0)2 = 3 + 9 = 12
*/

/**
 
Constraints:

1 <= n == costs.length <= 105​​​​​​​
1 <= costs[i] <= 104
*/

// Brute Force Approach: TLE
// function climbStairs(n: number, costs: number[]): number {
//   // Recursive function to calculate minimum cost to reach step j.
//   function getMinCost(j: number): number {
//     // Base case: starting step 0 has 0 cost.
//     if (j === 0) return 0;

//     let minCost = Infinity;

//     // Try jumping from j - 1 (distance 1, penalty 1^2 = 1).
//     if (j - 1 >= 0) {
//       minCost = Math.min(minCost, getMinCost(j - 1) + costs[j - 1] + 1);
//     }

//     // Try jumping from j - 2 (distance 2, penalty 2^2 = 4).
//     if (j - 2 >= 0) {
//       minCost = Math.min(minCost, getMinCost(j - 2) + costs[j - 1] + 4);
//     }

//     // Try jumping from j - 3 (distance 3, penalty 3^2 = 9).
//     if (j - 3 >= 0) {
//       minCost = Math.min(minCost, getMinCost(j - 3) + costs[j - 1] + 9);
//     }

//     return minCost;
//   }

//   return getMinCost(n);
// }

// Optimized Approach: Dynamic Programming (1D Bottom-Up DP)
// function climbStairs(n: number, costs: number[]): number {
//   // dp[i] stores the minimum cost to reach step i.
//   const dp = new Array<number>(n + 1).fill(Infinity);

//   // The starting step 0 has a base cost of 0.
//   dp[0] = 0;

//   for (let i = 1; i <= n; i++) {
//     // Option 1: Jump from step i - 1 (penalty 1^2 = 1).
//     let minPrevCost = dp[i - 1] + 1;

//     // Option 2: Jump from step i - 2 (penalty 2^2 = 4).
//     if (i >= 2) {
//       minPrevCost = Math.min(minPrevCost, dp[i - 2] + 4);
//     }

//     // Option 3: Jump from step i - 3 (penalty 3^2 = 9).
//     if (i >= 3) {
//       minPrevCost = Math.min(minPrevCost, dp[i - 3] + 9);
//     }

//     // Add the fixed cost of step i (costs is 0-indexed in TypeScript).
//     dp[i] = costs[i - 1] + minPrevCost;
//   }

//   // Return the minimum cost to reach step n.
//   return dp[n];
// }

// Optimized Approach: Dynamic Programming (Space-Optimized)
function climbStairs(n: number, costs: number[]): number {
  // prev0 represents dp[i-3], prev1 represents dp[i-2], prev2 represents dp[i-1].
  let prev2 = 0; // dp[0]
  let prev1 = Infinity; // dp[-1] (invalid)
  let prev0 = Infinity; // dp[-2] (invalid)

  for (let i = 1; i <= n; i++) {
    // Calculate the minimum previous cost among the 3 jump possibilities.
    const minPrevCost = Math.min(prev2 + 1, prev1 + 4, prev0 + 9);
    const currentCost = costs[i - 1] + minPrevCost;

    // Shift variables forward for the next step.
    prev0 = prev1;
    prev1 = prev2;
    prev2 = currentCost;
  }

  // prev2 now holds the result for step n.
  return prev2;
}

// Example usage:
const n1 = 4;
const costs1 = [1, 2, 3, 4];
console.log(climbStairs(n1, costs1)); // Output: 13

const n2 = 4;
const costs2 = [5, 1, 6, 2];
console.log(climbStairs(n2, costs2)); // Output: 11

const n3 = 3;
const costs3 = [9, 8, 3];
console.log(climbStairs(n3, costs3)); // Output: 12
