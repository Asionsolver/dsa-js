// 2124. Check if All A's Appears Before All B's

/**
Given a string s consisting of only the characters 'a' and 'b', return true if every 'a' appears before every 'b' in the string. Otherwise, return false.
*/

/**
Example 1:

Input: s = "aaabbb"
Output: true
Explanation:
The 'a's are at indices 0, 1, and 2, while the 'b's are at indices 3, 4, and 5.
Hence, every 'a' appears before every 'b' and we return true.
Example 2:

Input: s = "abab"
Output: false
Explanation:
There is an 'a' at index 2 and a 'b' at index 1.
Hence, not every 'a' appears before every 'b' and we return false.
Example 3:

Input: s = "bbb"
Output: true
Explanation:
There are no 'a's, hence, every 'a' appears before every 'b' and we return true.
*/

/**
Constraints:

1 <= s.length <= 100
s[i] is either 'a' or 'b'.

*/

// Brute Force Approach: O(n^2) time complexity, O(1) space complexity
// function checkString(s: string): boolean {
//   const n = s.length;

//   // Pick each character at index i and compare it with all characters after it.
//   for (let i = 0; i < n; i++) {
//     for (let j = i + 1; j < n; j++) {
//       // If a 'b' appears before an 'a', the condition is violated.
//       if (s[i] === "b" && s[j] === "a") {
//         return false;
//       }
//     }
//   }

//   // No 'b' appeared before any 'a', so the string is valid.
//   return true;
// }
// Optimized Approach: O(n) time complexity, O(1) space complexity
function checkString(s: string): boolean {
  // Track whether we have encountered at least one 'b' so far.
  let seenB = false;

  for (const char of s) {
    if (char === "b") {
      // Mark that 'b' has appeared; no 'a' should appear after this point.
      seenB = true;
    } else if (seenB) {
      // Current char is 'a', and a 'b' has already appeared before it.
      return false;
    }
  }

  // Every 'a' appeared before every 'b' (or one of them never appeared).
  return true;
}

// Example usage:
console.log(checkString("aaabbb")); // Output: true
console.log(checkString("abab")); // Output: false
console.log(checkString("bbb")); // Output: true
