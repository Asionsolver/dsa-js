// 2911. Minimum Changes to Make K Semi-palindromes

/**
Given a string s and an integer k, partition s into k substrings such that the letter changes needed to make each substring a semi-palindrome are minimized.

Return the minimum number of letter changes required.

A semi-palindrome is a special type of string that can be divided into palindromes based on a repeating pattern. To check if a string is a semi-palindrome:​

Choose a positive divisor d of the string's length. d can range from 1 up to, but not including, the string's length. For a string of length 1, it does not have a valid divisor as per this definition, since the only divisor is its length, which is not allowed.
For a given divisor d, divide the string into groups where each group contains characters from the string that follow a repeating pattern of length d. Specifically, the first group consists of characters at positions 1, 1 + d, 1 + 2d, and so on; the second group includes characters at positions 2, 2 + d, 2 + 2d, etc.
The string is considered a semi-palindrome if each of these groups forms a palindrome.
Consider the string "abcabc":

The length of "abcabc" is 6. Valid divisors are 1, 2, and 3.
For d = 1: The entire string "abcabc" forms one group. Not a palindrome.
For d = 2:
Group 1 (positions 1, 3, 5): "acb"
Group 2 (positions 2, 4, 6): "bac"
Neither group forms a palindrome.
For d = 3:
Group 1 (positions 1, 4): "aa"
Group 2 (positions 2, 5): "bb"
Group 3 (positions 3, 6): "cc"
All groups form palindromes. Therefore, "abcabc" is a semi-palindrome.
*/

/**
Example 1:

Input: s = "abcac", k = 2

Output: 1

Explanation: Divide s into "ab" and "cac". "cac" is already semi-palindrome. Change "ab" to "aa", it becomes semi-palindrome with d = 1.

Example 2:

Input: s = "abcdef", k = 2

Output: 2

Explanation: Divide s into substrings "abc" and "def". Each needs one change to become semi-palindrome.

Example 3:

Input: s = "aabbaa", k = 3

Output: 0

Explanation: Divide s into substrings "aa", "bb" and "aa". All are already semi-palindromes.
*/

/**
Constraints:

2 <= s.length <= 200
1 <= k <= s.length / 2
s contains only lowercase English letters.
*/

// Brute Force Approach
// function minimumChanges(s: string, k: number): number {
//   const n = s.length;

//   // Compute the minimum changes to make substring s[start..end] a semi-palindrome.
//   function getSemiPalindromeCost(start: number, end: number): number {
//     const length = end - start + 1;
//     let minCost = Infinity;

//     // Try every possible divisor d from 1 up to length - 1.
//     for (let d = 1; d < length; d++) {
//       if (length % d !== 0) {
//         continue;
//       }

//       let currentCost = 0;

//       // Check each of the d repeating groups using two pointers with step d.
//       for (let offset = 0; offset < d; offset++) {
//         let left = start + offset;
//         let right = end - d + 1 + offset;

//         while (left < right) {
//           if (s[left] !== s[right]) {
//             currentCost++;
//           }
//           left += d;
//           right -= d;
//         }
//       }

//       minCost = Math.min(minCost, currentCost);
//     }

//     return minCost;
//   }

//   // Recursively try all valid partitions of s[start..] into remainingParts substrings.
//   function solve(start: number, remainingParts: number): number {
//     // If only 1 part remains, the rest of the string must form the final substring.
//     if (remainingParts === 1) {
//       return getSemiPalindromeCost(start, n - 1);
//     }

//     let best = Infinity;
//     // Leave at least 2 characters for each of the remaining (remainingParts - 1) substrings.
//     const maxEnd = n - 2 * (remainingParts - 1) - 1;

//     // Every substring must have length at least 2, so end starts at start + 1.
//     for (let end = start + 1; end <= maxEnd; end++) {
//       const firstPartCost = getSemiPalindromeCost(start, end);
//       const restCost = solve(end + 1, remainingParts - 1);
//       best = Math.min(best, firstPartCost + restCost);
//     }

//     return best;
//   }

//   return solve(0, k);
// }

// Optimize Approach
function minimumChanges(s: string, k: number): number {
  const n = s.length;

  // Step 1: Precompute all proper divisors (1 <= d < len) for every substring length.
  const divisors: number[][] = Array.from({ length: n + 1 }, () => []);
  for (let d = 1; d <= Math.floor(n / 2); d++) {
    for (let len = 2 * d; len <= n; len += d) {
      divisors[len].push(d);
    }
  }

  // Step 2: Precompute minimum changes to make every substring s[start..end] a semi-palindrome.
  const semiCost: number[][] = Array.from({ length: n }, () =>
    Array(n).fill(Infinity),
  );

  for (let start = 0; start < n - 1; start++) {
    for (let end = start + 1; end < n; end++) {
      const length = end - start + 1;
      let minCost = Infinity;

      // Test only valid divisors of the current substring's length.
      for (const d of divisors[length]) {
        let currentCost = 0;

        // Divide into d repeating groups and count character mismatches in each group.
        for (let offset = 0; offset < d; offset++) {
          let left = start + offset;
          // Last index of this repeating group inside s[start..end].
          let right = end - d + 1 + offset;

          while (left < right) {
            if (s[left] !== s[right]) {
              currentCost++;
            }
            left += d;
            right -= d;
          }
        }

        minCost = Math.min(minCost, currentCost);
      }

      semiCost[start][end] = minCost;
    }
  }

  // Step 3: DP where dp[prefixLen][parts] is min changes for s[0..prefixLen-1] into 'parts' substrings.
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array(k + 1).fill(Infinity),
  );
  dp[0][0] = 0;

  for (let parts = 1; parts <= k; parts++) {
    // Each part needs at least 2 characters, so prefixLen starts at 2 * parts.
    for (let prefixLen = 2 * parts; prefixLen <= n; prefixLen++) {
      // Try every valid split point where the last substring is s[split..prefixLen-1].
      for (let split = 2 * (parts - 1); split <= prefixLen - 2; split++) {
        if (dp[split][parts - 1] === Infinity) {
          continue;
        }

        const totalCost = dp[split][parts - 1] + semiCost[split][prefixLen - 1];
        dp[prefixLen][parts] = Math.min(dp[prefixLen][parts], totalCost);
      }
    }
  }

  return dp[n][k];
}

// Example Uses
console.log(minimumChanges("abcac", 2)); // Output: 1
console.log(minimumChanges("abccba", 3)); // Output: 0
console.log(minimumChanges("abcde", 2)); // Output: 2
