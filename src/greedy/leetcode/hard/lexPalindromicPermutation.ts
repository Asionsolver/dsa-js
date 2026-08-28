// 3734. Lexicographically Smallest Palindromic Permutation Greater Than Target

/**

You are given two strings s and target, each of length n, consisting of lowercase English letters.

Return the lexicographically smallest string that is both a palindromic permutation of s and strictly greater than target. If no such permutation exists, return an empty string.
*/

/**
Example 1:

Input: s = "baba", target = "abba"

Output: "baab"

Explanation:

The palindromic permutations of s (in lexicographical order) are "abba" and "baab".
The lexicographically smallest permutation that is strictly greater than target is "baab".
Example 2:

Input: s = "baba", target = "bbaa"

Output: ""

Explanation:

The palindromic permutations of s (in lexicographical order) are "abba" and "baab".
None of them is lexicographically strictly greater than target. Therefore, the answer is "".
Example 3:

Input: s = "abc", target = "abb"

Output: ""

Explanation:

s has no palindromic permutations. Therefore, the answer is "".

Example 4:

Input: s = "aac", target = "abb"

Output: "aca"

Explanation:

The only palindromic permutation of s is "aca".
"aca" is strictly greater than target. Therefore, the answer is "aca".
 
*/

/**
Constraints:

1 <= n == s.length == target.length <= 300
s and target consist of only lowercase English letters.
*/

function lexPalindromicPermutation(s: string, target: string): string {
  const n = s.length;
  const counts = new Array(26).fill(0);
  // Count frequencies of each character.
  for (const char of s) counts[char.charCodeAt(0) - 97]++;

  let oddCount = 0;
  let midChar = "";
  const halfCounts = new Array(26).fill(0);

  // Identify if a palindrome is possible and find the mid character.
  for (let i = 0; i < 26; i++) {
    if (counts[i] % 2 !== 0) {
      oddCount++;
      midChar = String.fromCharCode(i + 97);
    }
    halfCounts[i] = Math.floor(counts[i] / 2);
  }

  if (oddCount > 1) return "";

  const k = Math.floor(n / 2);

  // Helper to build a full palindrome from its first half.
  const buildFull = (half: string) => {
    const rev = half.split("").reverse().join("");
    return half + midChar + rev;
  };

  // Case 1: Try to match the first half of the target exactly.
  let canMatchPrefix = true;
  const tempCounts = [...halfCounts];
  for (let i = 0; i < k; i++) {
    const charIdx = target.charCodeAt(i) - 97;
    if (tempCounts[charIdx] > 0) {
      tempCounts[charIdx]--;
    } else {
      canMatchPrefix = false;
      break;
    }
  }

  if (canMatchPrefix) {
    const h = target.substring(0, k);
    const p = buildFull(h);
    if (p > target) return p;
  }

  // Case 2: Find the rightmost position 'i' to place a character larger than target[i].
  const canFormPrefix = new Array(k + 1).fill(false);
  canFormPrefix[0] = true;
  const runningCounts = [...halfCounts];
  for (let i = 0; i < k; i++) {
    const charIdx = target.charCodeAt(i) - 97;
    if (runningCounts[charIdx] > 0) {
      runningCounts[charIdx]--;
      canFormPrefix[i + 1] = true;
    } else {
      break;
    }
  }

  // Iterate backwards from the end of the first half.
  for (let i = k - 1; i >= 0; i--) {
    if (canFormPrefix[i]) {
      const currentHalfCounts = [...halfCounts];
      for (let j = 0; j < i; j++) {
        currentHalfCounts[target.charCodeAt(j) - 97]--;
      }

      // Try to find the smallest character > target[i] available.
      let nextCharIdx = -1;
      for (let c = target.charCodeAt(i) - 97 + 1; c < 26; c++) {
        if (currentHalfCounts[c] > 0) {
          nextCharIdx = c;
          break;
        }
      }

      if (nextCharIdx !== -1) {
        let firstHalf =
          target.substring(0, i) + String.fromCharCode(nextCharIdx + 97);
        currentHalfCounts[nextCharIdx]--;

        // Fill remaining positions with the smallest available characters.
        for (let c = 0; c < 26; c++) {
          while (currentHalfCounts[c] > 0) {
            firstHalf += String.fromCharCode(c + 97);
            currentHalfCounts[c]--;
          }
        }
        return buildFull(firstHalf);
      }
    }
  }

  return "";
}

// Example usage:
console.log(lexPalindromicPermutation("baba", "abba")); // Output: "baab"
console.log(lexPalindromicPermutation("baba", "bbaa")); // Output: ""
console.log(lexPalindromicPermutation("abc", "abb")); // Output: ""
console.log(lexPalindromicPermutation("aac", "abb")); // Output: "aca"
