// 3298. Count Substrings That Can Be Rearranged to Contain a String II

/**
Example 1:

Input: word1 = "bcca", word2 = "abc"

Output: 1

Explanation:

The only valid substring is "bcca" which can be rearranged to "abcc" having "abc" as a prefix.

Example 2:

Input: word1 = "abcabc", word2 = "abc"

Output: 10

Explanation:

All the substrings except substrings of size 1 and size 2 are valid.

Example 3:

Input: word1 = "abcabc", word2 = "aaabc"

Output: 0


*/

function validSubstringCount(word1: string, word2: string): number {
  const count = new Int32Array(26);
  let requiredMatches = 0;

  // Process word2 to find the requirement of each character
  for (let i = 0; i < word2.length; i++) {
    const c = word2.charCodeAt(i) - 97; // 'a' is 97 in ASCII
    if (count[c] === 0) {
      requiredMatches++;
    }
    count[c]--; // Store required counts as negative values
  }

  let matched = 0;
  let left = 0;
  let ans = 0;
  const n = word1.length;

  // Sliding window over word1
  for (let right = 0; right < n; right++) {
    const c = word1.charCodeAt(right) - 97;
    count[c]++;

    // When count reaches 0, the specific char requirement is fully met
    if (count[c] === 0) {
      matched++;
    }

    // Whenever the window fulfills all unique character frequencies from word2
    while (matched === requiredMatches) {
      // All substrings starting from 'left' and ending at 'right' or beyond are valid
      ans += n - right;

      // Shrink the window from the left to find new valid windows
      const lc = word1.charCodeAt(left) - 97;
      count[lc]--;

      // If the character count drops below the requirement, it's no longer satisfying word2
      if (count[lc] === -1) {
        matched--;
      }
      left++;
    }
  }

  return ans;
}
