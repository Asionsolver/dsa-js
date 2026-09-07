// 940. Distinct Subsequences II

/**
Given a string s, return the number of distinct non-empty subsequences of s. Since the answer may be very large, return it modulo 109 + 7.

A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not.
*/

/**
Example 1:

Input: s = "abc"
Output: 7
Explanation: The 7 distinct subsequences are "a", "b", "c", "ab", "ac", "bc", and "abc".
Example 2:

Input: s = "aba"
Output: 6
Explanation: The 6 distinct subsequences are "a", "b", "ab", "aa", "ba", and "aba".
Example 3:

Input: s = "aaa"
Output: 3
Explanation: The 3 distinct subsequences are "a", "aa" and "aaa".

*/

/**
Constraints:

1 <= s.length <= 2000
s consists of lowercase English letters.
*/

// Time Limit Exceeded
// function distinctSubseqII(s: string): number {
//   const MOD = 1_000_000_007;
//   const distinctSubsequences = new Set<string>();

//   // Recursive helper to generate all possible subsequences.
//   function generateSubsequences(index: number, currentString: string): void {
//     if (index === s.length) {
//       // Only add non-empty subsequences to the Set.
//       if (currentString.length > 0) {
//         distinctSubsequences.add(currentString);
//       }
//       return;
//     }

//     // Choice 1: Include the current character.
//     generateSubsequences(index + 1, currentString + s[index]);

//     // Choice 2: Exclude the current character.
//     generateSubsequences(index + 1, currentString);
//   }

//   generateSubsequences(0, "");

//   // Return the total number of unique non-empty subsequences.
//   return distinctSubsequences.size % MOD;
// }

function distinctSubseqII(s: string): number {
  const MOD = 1_000_000_007;

  // Array of size 26 to store count of subsequences ending with each letter ('a' - 'z').
  const endsWith = new Array<number>(26).fill(0);

  // Variable to track total distinct non-empty subsequences formed so far.
  let total = 0;

  for (let i = 0; i < s.length; i++) {
    const charCode = s.charCodeAt(i) - 97;

    // Calculate newly added distinct subsequences ending with current character.
    const newAdded = (total + 1 - endsWith[charCode] + MOD) % MOD;

    // Add the newly formed subsequences to the total count.
    total = (total + newAdded) % MOD;

    // Update the count of subsequences ending with the current character.
    endsWith[charCode] = (endsWith[charCode] + newAdded) % MOD;
  }

  // Return the final total distinct subsequences modulo 10^9 + 7.
  return total;
}

// Example usage:
console.log(distinctSubseqII("abc")); // Output: 7
console.log(distinctSubseqII("aba")); // Output: 6
console.log(distinctSubseqII("aaa")); // Output: 3
