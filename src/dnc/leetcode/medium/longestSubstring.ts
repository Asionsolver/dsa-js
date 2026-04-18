// 395. Longest Substring with At Least K Repeating Characters

/**
Example 1:

Input: s = "aaabb", k = 3
Output: 3
Explanation: The longest substring is "aaa", as 'a' is repeated 3 times.
Example 2:

Input: s = "ababbc", k = 2
Output: 5
Explanation: The longest substring is "ababb", as 'a' is repeated 2 times and 'b' is repeated 3 times.

*/

const longestSubstring = (s: string, k: number): number => {
  const n = s.length;

  // Base case: if the string is shorter than k, no valid substring exists
  if (n < k) return 0;

  // Map to store the frequency of each character
  const counts: Record<string, number> = {};
  for (const char of s) {
    counts[char] = (counts[char] || 0) + 1;
  }

  // Iterate through the string to find a character with frequency < k
  for (let i = 0; i < n; i++) {
    const char = s[i];

    if (counts[char] < k) {
      // This character cannot be part of the solution.
      // Split the string by this character and check all resulting substrings.
      const subStrings = s.split(char);
      let maxLen = 0;

      for (const sub of subStrings) {
        // Recursively find the longest substring in the parts
        maxLen = Math.max(maxLen, longestSubstring(sub, k));
      }

      return maxLen;
    }
  }

  // If we reach here, it means all characters in the current string appear >= k times
  return n;
};

// Example usage:
const s1 = "aaabb";
const k1 = 3;
console.log(longestSubstring(s1, k1)); // Output: 3

const s2 = "ababbc";
const k2 = 2;
console.log(longestSubstring(s2, k2)); // Output: 5
