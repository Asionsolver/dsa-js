// 2585. Number of Ways to Earn Points

/**
Example 1:

Input: target = 6, types = [[6,1],[3,2],[2,3]]
Output: 7
Explanation: You can earn 6 points in one of the seven ways:
- Solve 6 questions of the 0th type: 1 + 1 + 1 + 1 + 1 + 1 = 6
- Solve 4 questions of the 0th type and 1 question of the 1st type: 1 + 1 + 1 + 1 + 2 = 6
- Solve 2 questions of the 0th type and 2 questions of the 1st type: 1 + 1 + 2 + 2 = 6
- Solve 3 questions of the 0th type and 1 question of the 2nd type: 1 + 1 + 1 + 3 = 6
- Solve 1 question of the 0th type, 1 question of the 1st type and 1 question of the 2nd type: 1 + 2 + 3 = 6
- Solve 3 questions of the 1st type: 2 + 2 + 2 = 6
- Solve 2 questions of the 2nd type: 3 + 3 = 6
Example 2:

Input: target = 5, types = [[50,1],[50,2],[50,5]]
Output: 4
Explanation: You can earn 5 points in one of the four ways:
- Solve 5 questions of the 0th type: 1 + 1 + 1 + 1 + 1 = 5
- Solve 3 questions of the 0th type and 1 question of the 1st type: 1 + 1 + 1 + 2 = 5
- Solve 1 questions of the 0th type and 2 questions of the 1st type: 1 + 2 + 2 = 5
- Solve 1 question of the 2nd type: 5
Example 3:

Input: target = 18, types = [[6,1],[3,2],[2,3]]
Output: 1
Explanation: You can only earn 18 points by answering all questions.
*/

function waysToReachTarget(target: number, types: number[][]): number {
  const MOD = 1000000007; // Modulo to prevent overflow
  // dp[j] will store the number of ways to achieve exactly j points
  const dp = new Array(target + 1).fill(0);

  // Base case: 1 way to get exactly 0 points (choose no questions)
  dp[0] = 1;

  // Iterate over each question type available
  for (const [count, marks] of types) {
    // Traverse backwards to properly implement the bounded knapsack scenario
    // This ensures questions from the current type aren't reused more than their `count`
    for (let j = target; j >= marks; j--) {
      // Try picking k questions of the current type
      for (let k = 1; k <= count && j - k * marks >= 0; k++) {
        dp[j] = (dp[j] + dp[j - k * marks]) % MOD;
      }
    }
  }

  return dp[target];
}

// Example usage:
console.log(
  waysToReachTarget(6, [
    [6, 1],
    [3, 2],
    [2, 3],
  ]),
); // Output: 7
console.log(
  waysToReachTarget(5, [
    [50, 1],
    [50, 2],
    [50, 5],
  ]),
); // Output: 4
console.log(
  waysToReachTarget(18, [
    [6, 1],
    [3, 2],
    [2, 3],
  ]),
); // Output: 1
