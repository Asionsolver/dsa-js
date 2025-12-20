// 1930. Unique Length-3 Palindromic Subsequences

/**
Example 1:

Input: s = "aabca"
Output: 3
Explanation: The 3 palindromic subsequences of length 3 are:
- "aba" (subsequence of "aabca")
- "aaa" (subsequence of "aabca")
- "aca" (subsequence of "aabca")
Example 2:

Input: s = "adc"
Output: 0
Explanation: There are no palindromic subsequences of length 3 in "adc".
Example 3:

Input: s = "bbcbaba"
Output: 4
Explanation: The 4 palindromic subsequences of length 3 are:
- "bbb" (subsequence of "bbcbaba")
- "bcb" (subsequence of "bbcbaba")
- "bab" (subsequence of "bbcbaba")
- "aba" (subsequence of "bbcbaba")
*/

const s = "aabca";

const countPalindromicSubsequence = function (s: string) {
  const n = s.length;

  // Arrays to store the first and last occurrence of each character 'a'-'z'
  const firstOccur = new Array(26).fill(-1);
  const lastOccur = new Array(26).fill(-1);

  // Populate first and last occurrence indices
  for (let i = 0; i < n; i++) {
    const charCode = s.charCodeAt(i) - 97; // Map 'a'-'z' to 0-25
    if (firstOccur[charCode] === -1) {
      firstOccur[charCode] = i;
    }
    lastOccur[charCode] = i;
  }

  let result = 0;

  // Iterate through each possible outer character 'a' through 'z'
  for (let i = 0; i < 26; i++) {
    const start = firstOccur[i];
    const end = lastOccur[i];

    // If the character appears at least twice with at least one char in between
    if (start !== -1 && end > start + 1) {
      // Use a Set to count unique characters between the first and last occurrence
      const middleChars = new Set<string>();
      for (let j = start + 1; j < end; j++) {
        middleChars.add(s[j]);

        // Optimization: if we already found all 26 letters, we can stop
        if (middleChars.size === 26) break;
      }
      result += middleChars.size;
    }
  }

  return result;
};
console.log(countPalindromicSubsequence(s));
