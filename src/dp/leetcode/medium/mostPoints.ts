// 2140. Solving Questions With Brainpower

/**
Example 1:

Input: questions = [[3,2],[4,3],[4,4],[2,5]]
Output: 5
Explanation: The maximum points can be earned by solving questions 0 and 3.
- Solve question 0: Earn 3 points, will be unable to solve the next 2 questions
- Unable to solve questions 1 and 2
- Solve question 3: Earn 2 points
Total points earned: 3 + 2 = 5. There is no other way to earn 5 or more points.
Example 2:

Input: questions = [[1,1],[2,2],[3,3],[4,4],[5,5]]
Output: 7
Explanation: The maximum points can be earned by solving questions 1 and 4.
- Skip question 0
- Solve question 1: Earn 2 points, will be unable to solve the next 2 questions
- Unable to solve questions 2 and 3
- Solve question 4: Earn 5 points
Total points earned: 2 + 5 = 7. There is no other way to earn 7 or more points.
*/

function mostPoints(questions: number[][]): number {
  const n = questions.length;

  // Using Float64Array for memory continuity and because maximum points sum
  // 10^5 (length) * 10^5 (max points) = 10^10 fits safely within a 64-bit float.
  const dp = new Float64Array(n + 1);

  for (let i = n - 1; i >= 0; i--) {
    const points = questions[i][0];
    const brainpower = questions[i][1];

    // The index of the next valid question if we choose to solve the current one
    const nextQuestion = i + brainpower + 1;

    // Accumulate points if we solved it vs. if we skipped it
    const pointsIfSolved = points + (nextQuestion < n ? dp[nextQuestion] : 0);
    const pointsIfSkipped = dp[i + 1];

    // Take the max of both scenarios
    dp[i] = Math.max(pointsIfSolved, pointsIfSkipped);
  }

  return dp[0];
}

// Example usage:
const questions1 = [
  [3, 2],
  [4, 3],
  [4, 4],
  [2, 5],
];
console.log(mostPoints(questions1)); // Output: 5

const questions2 = [
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [5, 5],
];
console.log(mostPoints(questions2)); // Output: 7
