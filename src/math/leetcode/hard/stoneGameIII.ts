// 1406. Stone Game III

/**
Example 1:

Input: stoneValue = [1,2,3,7]
Output: "Bob"
Explanation: Alice will always lose. Her best move will be to take three piles and the score become 6. Now the score of Bob is 7 and Bob wins.
Example 2:

Input: stoneValue = [1,2,3,-9]
Output: "Alice"
Explanation: Alice must choose all the three piles at the first move to win and leave Bob with negative score.
If Alice chooses one pile her score will be 1 and the next move Bob's score becomes 5. In the next move, Alice will take the pile with value = -9 and lose.
If Alice chooses two piles her score will be 3 and the next move Bob's score becomes 3. In the next move, Alice will take the pile with value = -9 and also lose.
Remember that both play optimally so here Alice will choose the scenario that makes her win.
Example 3:

Input: stoneValue = [1,2,3,6]
Output: "Tie"
Explanation: Alice cannot win this game. She can end the game in a draw if she decided to choose all the first three piles, otherwise she will lose.

*/

//  Top-Down Dynamic Programming (Recursion with Memoization).
// function stoneGameIII(stoneValue: number[]): string {
//   const n = stoneValue.length;
//   // Initialize memoization array with -Infinity to indicate uncomputed states
//   const memo = new Array(n).fill(Number.NEGATIVE_INFINITY);

//   // dfs(i) returns the max relative score difference starting from index i
//   function dfs(i: number): number {
//     // Base case: If no stones are left, the score difference is 0
//     if (i >= n) {
//       return 0;
//     }

//     // If we have already calculated the answer for this index, return it
//     if (memo[i] !== Number.NEGATIVE_INFINITY) {
//       return memo[i];
//     }

//     let maxDiff = Number.NEGATIVE_INFINITY;
//     let currentTake = 0;

//     // Try taking 1, 2, or 3 stones
//     for (let k = 0; k < 3; k++) {
//       if (i + k < n) {
//         currentTake += stoneValue[i + k];
//         // The relative score is what we take MINUS the max difference the opponent can get from the remaining stones
//         maxDiff = Math.max(maxDiff, currentTake - dfs(i + k + 1));
//       }
//     }

//     // Cache the result before returning
//     memo[i] = maxDiff;
//     return maxDiff;
//   }

//   // Evaluate the game starting from the 0th index
//   const aliceScoreDifference = dfs(0);

//   if (aliceScoreDifference > 0) return "Alice";
//   if (aliceScoreDifference < 0) return "Bob";
//   return "Tie";
// }

// Best Approach: Dynamic Programming with Space Optimization
function stoneGameIII(stoneValue: number[]): string {
  const n = stoneValue.length;

  // Instead of a full dp array, we just need the values of the last 3 computed states.
  let dp1 = 0; // Represents dp[i + 1]
  let dp2 = 0; // Represents dp[i + 2]
  let dp3 = 0; // Represents dp[i + 3]

  // Process from the end to the start
  for (let i = n - 1; i >= 0; i--) {
    let maxDiff = -Infinity;
    let currentTake = 0;

    // Option 1: Take 1 stone
    currentTake += stoneValue[i];
    maxDiff = Math.max(maxDiff, currentTake - dp1);

    // Option 2: Take 2 stones
    if (i + 1 < n) {
      currentTake += stoneValue[i + 1];
      maxDiff = Math.max(maxDiff, currentTake - dp2);
    }

    // Option 3: Take 3 stones
    if (i + 2 < n) {
      currentTake += stoneValue[i + 2];
      maxDiff = Math.max(maxDiff, currentTake - dp3);
    }

    // Shift state variables over for the next iteration (i - 1)
    dp3 = dp2;
    dp2 = dp1;
    dp1 = maxDiff;
  }

  // At dp1 (which acts as dp[0] when the loop ends),
  // it dictates Alice's score against Bob's.
  if (dp1 > 0) return "Alice";
  if (dp1 < 0) return "Bob";
  return "Tie";
}

// Example usage:
console.log(stoneGameIII([1, 2, 3, 7])); // Output: "Bob"
console.log(stoneGameIII([1, 2, 3, -9])); // Output: "Alice"
console.log(stoneGameIII([1, 2, 3, 6])); // Output: "Tie"
