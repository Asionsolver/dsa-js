// 3. Longest Substring Without Repeating Characters

/**
Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

*/

// Brute Force Approach: O(n^3)
// function lengthOfLongestSubstring(s: string): number {
//   let maxLength = 0;

//   for (let i = 0; i < s.length; i++) {
//     for (let j = i + 1; j <= s.length; j++) {
//       const substring = s.slice(i, j);
//       if (allUnique(substring)) {
//         maxLength = Math.max(maxLength, substring.length);
//       }
//     }
//   }

//   return maxLength;
// }

// function allUnique(substring: string): boolean {
//   const charSet = new Set<string>();
//   for (const char of substring) {
//     if (charSet.has(char)) {
//       return false;
//     }
//     charSet.add(char);
//   }
//   return true;
// }

// Normal Approach: Sliding Window with HashMap
// function lengthOfLongestSubstring(s: string): number {
//   let maxLength = 0;
//   let left = 0;
//   // Map to store character and its most recent index
//   const charMap = new Map<string, number>();

//   for (let right = 0; right < s.length; right++) {
//     const char = s[right];

//     // If the character is already in the map and within the current window
//     if (charMap.has(char)) {
//       // Move left pointer to the right of the last seen occurrence of the duplicate character
//       left = Math.max(left, charMap.get(char)! + 1);
//     }

//     // Update the index of the current character
//     charMap.set(char, right);

//     // Update the maximum length found so far
//     maxLength = Math.max(maxLength, right - left + 1);
//   }

//   return maxLength;
// }

// Good Approach: Sliding Window
const lengthOfLongestSubstring = function (s: string) {
  const count = Array.from({ length: 256 }).fill(0);
  let first = 0;
  let second = 0;
  let length = 0;
  while (second < s.length) {
    // Repeating character remove
    while (count[s.charCodeAt(second)]) {
      count[s.charCodeAt(first)] = 0;
      first++;
    }
    count[s.charCodeAt(second)] = 1;
    length = Math.max(length, second - first + 1);
    second++;
  }
  return length;
};

// Example usage:
const s1 = "abcabcbb";
console.log(lengthOfLongestSubstring(s1)); // Output: 3

const s2 = "bbbbb";
console.log(lengthOfLongestSubstring(s2)); // Output: 1

const s3 = "pwwkew";
console.log(lengthOfLongestSubstring(s3)); // Output: 3
