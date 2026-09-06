// 115. Distinct Subsequences

/**
Given two strings s and t, return the number of distinct subsequences of s which equals t.

The test cases are generated so that the answer fits on a 32-bit signed integer.


*/

/**
Example 1:

Input: s = "rabbbit", t = "rabbit"
Output: 3
Explanation:
As shown below, there are 3 ways you can generate "rabbit" from s.
rabbbit
rabbbit
rabbbit
Example 2:

Input: s = "babgbag", t = "bag"
Output: 5
Explanation:
As shown below, there are 5 ways you can generate "bag" from s.
babgbag
babgbag
babgbag
babgbag
babgbag

*/

/**
Constraints:

1 <= s.length, t.length <= 1000
s and t consist of English letters.
*/

// Throw TLE
// function numDistinct(s: string, t: string): number {
//   function helper(i: number, j: number): number {
//     // Base Case: If we matched all characters of t, we found 1 valid subsequence.
//     if (j === t.length) {
//       return 1;
//     }

//     // Base Case: If s is exhausted but t is not, no match is possible.
//     if (i === s.length) {
//       return 0;
//     }

//     // If characters match, we have two choices: include s[i] or exclude s[i].
//     if (s[i] === t[j]) {
//       return helper(i + 1, j + 1) + helper(i + 1, j);
//     }

//     // If characters do not match, we must exclude s[i].
//     return helper(i + 1, j);
//   }

//   return helper(0, 0);
// }

//  Approach 1: 2D Dynamic Programming (Easy to understand)

// function numDistinct(s: string, t: string): number {
//   const m = s.length;
//   const n = t.length;

//   // If target string is longer than source string, it's impossible.
//   if (m < n) return 0;

//   // dp[i][j] stores the count of distinct subsequences of s[0...i-1] equals t[0...j-1]
//   const dp: number[][] = Array.from({ length: m + 1 }, () =>
//     Array(n + 1).fill(0),
//   );

//   // Base case: An empty t can always be formed by an empty subsequence (1 way).
//   for (let i = 0; i <= m; i++) {
//     dp[i][0] = 1;
//   }

//   // Fill the DP table.
//   for (let i = 1; i <= m; i++) {
//     for (let j = 1; j <= n; j++) {
//       if (s[i - 1] === t[j - 1]) {
//         // If characters match, take sum of using s[i-1] and skipping s[i-1].
//         dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
//       } else {
//         // If characters don't match, we must skip s[i-1].
//         dp[i][j] = dp[i - 1][j];
//       }
//     }
//   }

//   return dp[m][n];
// }

// Approach 2: 1D Dynamic Programming (Space Optimized)
function numDistinct(s: string, t: string): number {
    const m = s.length;
    const n = t.length;

    if (m < n) return 0;

    // dp[j] stores number of distinct subsequences of current prefix matching t[0...j-1]
    const dp: number[] = new Array(n + 1).fill(0);

    // Base case: An empty target string t has 1 match.
    dp[0] = 1;

    for (let i = 1; i <= m; i++) {
        // Traverse backwards to use values from the previous row without overwriting them.
        for (let j = n; j >= 1; j--) {
            if (s[i - 1] === t[j - 1]) {
                // dp[j] = (using current match: dp[j-1]) + (skipping current char: dp[j])
                dp[j] = dp[j] + dp[j - 1];
            }
        }
    }

    return dp[n];
}
// Example usage:
const s1 = "rabbbit";
const t1 = "rabbit";
console.log(numDistinct(s1, t1)); // Output: 3

const s2 = "babgbag";
const t2 = "bag";
console.log(numDistinct(s2, t2)); // Output: 5
