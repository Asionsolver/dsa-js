// 712. Minimum ASCII Delete Sum for Two Strings

/**
Example 1:

Input: s1 = "sea", s2 = "eat"
Output: 231
Explanation: Deleting "s" from "sea" adds the ASCII value of "s" (115) to the sum.
Deleting "t" from "eat" adds 116 to the sum.
At the end, both strings are equal, and 115 + 116 = 231 is the minimum sum possible to achieve this.
Example 2:

Input: s1 = "delete", s2 = "leet"
Output: 403
Explanation: Deleting "dee" from "delete" to turn the string into "let",
adds 100[d] + 101[e] + 101[e] to the sum.
Deleting "e" from "leet" adds 101[e] to the sum.
At the end, both strings are equal to "let", and the answer is 100+101+101+101 = 403.
If instead we turned both strings into "lee" or "eet", we would get answers of 433 or 417, which are higher.
*/

const s1 = "sea",
  s2 = "eat";
const minimumDeleteSum = function (s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;

  // Initialize dp table with size (m+1) x (n+1)
  // dp[i][j] represents the cost to make s1[0...i] and s2[0...j] equal
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  // Base Case: First row
  // If s1 is empty, we must delete all characters from s2
  for (let j = 1; j <= n; j++) {
    dp[0][j] = dp[0][j - 1] + s2.charCodeAt(j - 1);
  }

  // Base Case: First column
  // If s2 is empty, we must delete all characters from s1
  for (let i = 1; i <= m; i++) {
    dp[i][0] = dp[i - 1][0] + s1.charCodeAt(i - 1);
  }

  // Fill the DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // If characters are the same, no deletion needed for this step
      if (s1.charCodeAt(i - 1) === s2.charCodeAt(j - 1)) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // Characters differ, calculate minimum cost of deleting from s1 vs s2
        dp[i][j] = Math.min(
          dp[i - 1][j] + s1.charCodeAt(i - 1), // Delete s1[i-1]
          dp[i][j - 1] + s2.charCodeAt(j - 1) // Delete s2[j-1]
        );
      }
    }
  }

  return dp[m][n];
};
console.log(minimumDeleteSum(s1, s2));
