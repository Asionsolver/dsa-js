// 10. Regular Expression Matching

/**
Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

'.' Matches any single character.​​​​
'*' Matches zero or more of the preceding element.
Return a boolean indicating whether the matching covers the entire input string (not partial).
*/

/**
Example 1:

Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
Example 2:

Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
Example 3:

Input: s = "ab", p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".
*/

/**
Constraints:

1 <= s.length <= 20
1 <= p.length <= 20
s contains only lowercase English letters.
p contains only lowercase English letters, '.', and '*'.
It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.
*/

// Brute Force
// function isMatch(s: string, p: string): boolean {
//   // Base case: If pattern is empty, string must also be empty.
//   if (p.length === 0) {
//     return s.length === 0;
//   }

//   // Check if the first character matches.
//   const firstMatch = s.length > 0 && (p[0] === s[0] || p[0] === ".");

//   // If the next character is '*', we have two choices.
//   if (p.length >= 2 && p[1] === "*") {
//     // Choice 1: Treat '*' as 0 occurrences (skip pattern by 2).
//     // Choice 2: Treat '*' as 1+ occurrences (if first matched, consume one char from s).
//     return (
//       isMatch(s, p.substring(2)) || (firstMatch && isMatch(s.substring(1), p))
//     );
//   } else {
//     // If no '*', move both string and pattern forward by 1 character.
//     return firstMatch && isMatch(s.substring(1), p.substring(1));
//   }
// }

// Optimized: Dynamic Programming
function isMatch(s: string, p: string): boolean {
  const m = s.length;
  const n = p.length;

  // dp[i][j] represents if s[0...i-1] matches p[0...j-1].
  const dp: boolean[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(false),
  );

  // Base case: Empty string matches empty pattern.
  dp[0][0] = true;

  // Handle patterns with '*' matching an empty string.
  for (let j = 2; j <= n; j++) {
    if (p[j - 1] === "*") {
      dp[0][j] = dp[0][j - 2];
    }
  }

  // Fill the DP table for all prefixes.
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === s[i - 1] || p[j - 1] === ".") {
        // Current characters match directly.
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] === "*") {
        // Choice 1: Treat '*' as matching 0 occurrences of the previous character.
        dp[i][j] = dp[i][j - 2];

        // Choice 2: If previous character matches s[i-1], extend the match.
        const prevCharMatches = p[j - 2] === s[i - 1] || p[j - 2] === ".";
        if (prevCharMatches) {
          dp[i][j] = dp[i][j] || dp[i - 1][j];
        }
      }
    }
  }

  return dp[m][n];
}

// Example usage:
console.log(isMatch("aa", "a")); // Output: false
console.log(isMatch("aa", "a*")); // Output: true
console.log(isMatch("ab", ".*")); // Output: true
