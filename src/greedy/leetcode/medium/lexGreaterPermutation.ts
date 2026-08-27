// 3720. Lexicographically Smallest Permutation Greater Than Target

/**
You are given two strings s and target, both having length n, consisting of lowercase English letters.

Return the lexicographically smallest permutation of s that is strictly greater than target. If no permutation of s is lexicographically strictly greater than target, return an empty string.

A string a is lexicographically strictly greater than a string b (of the same length) if in the first position where a and b differ, string a has a letter that appears later in the alphabet than the corresponding letter in b.


*/

/**
Example 1:

Input: s = "abc", target = "bba"

Output: "bca"

Explanation:

The permutations of s (in lexicographical order) are "abc", "acb", "bac", "bca", "cab", and "cba".
The lexicographically smallest permutation that is strictly greater than target is "bca".
Example 2:

Input: s = "leet", target = "code"

Output: "eelt"

Explanation:

The permutations of s (in lexicographical order) are "eelt", "eetl", "elet", "elte", "etel", "etle", "leet", "lete", "ltee", "teel", "tele", and "tlee".
The lexicographically smallest permutation that is strictly greater than target is "eelt".
Example 3:

Input: s = "baba", target = "bbaa"

Output: ""

Explanation:

The permutations of s (in lexicographical order) are "aabb", "abab", "abba", "baab", "baba", and "bbaa".
None of them is lexicographically strictly greater than target. Therefore, the answer is "".

*/

/**
Constraints:

1 <= s.length == target.length <= 300
s and target consist of only lowercase English letters.
*/

function lexGreaterPermutation(s: string, target: string): string {
  const n = s.length;
  // Count frequencies of characters in s.
  const counts = new Array(26).fill(0);
  for (const char of s) {
    counts[char.charCodeAt(0) - "a".charCodeAt(0)]++;
  }

  // Try to match target as much as possible to find the prefix.
  const matchedCounts = new Array(26).fill(0);
  let matchUntil = -1;
  for (let i = 0; i < n; i++) {
    const charIdx = target.charCodeAt(i) - "a".charCodeAt(0);
    if (counts[charIdx] > 0) {
      counts[charIdx]--;
      matchedCounts[charIdx]++;
      matchUntil = i;
    } else {
      break;
    }
  }

  // Iterate backwards from the furthest match point to find the best pivot index.
  for (let i = Math.min(matchUntil + 1, n - 1); i >= 0; i--) {
    // If i is less than matchUntil + 1, we need to return the last character used to the pool.
    if (i <= matchUntil) {
      const charIdx = target.charCodeAt(i) - "a".charCodeAt(0);
      counts[charIdx]++;
      matchedCounts[charIdx]--;
      matchUntil--;
    }

    // Look for the smallest character in 'counts' that is strictly greater than target[i].
    const targetCharIdx = target.charCodeAt(i) - "a".charCodeAt(0);
    for (let j = targetCharIdx + 1; j < 26; j++) {
      if (counts[j] > 0) {
        // Found it! Build the result.
        let res = target.substring(0, i);
        res += String.fromCharCode(j + "a".charCodeAt(0));
        counts[j]--;

        // Fill the rest with smallest available characters in sorted order.
        for (let k = 0; k < 26; k++) {
          while (counts[k] > 0) {
            res += String.fromCharCode(k + "a".charCodeAt(0));
            counts[k]--;
          }
        }
        return res;
      }
    }
  }

  return "";
}

// Example usage:
console.log(lexGreaterPermutation("abc", "bba")); // Output: "bca"
console.log(lexGreaterPermutation("leet", "code")); // Output: "eelt"
console.log(lexGreaterPermutation("baba", "bbaa")); // Output: ""
