// 242. Valid Anagram

/**
Given two strings s and t, return true if t is an anagram of s, and false otherwise.
*/

/**
Example 1:

Input: s = "anagram", t = "nagaram"

Output: true

Example 2:

Input: s = "rat", t = "car"

Output: false


*/

/**

Constraints:

1 <= s.length, t.length <= 5 * 104
s and t consist of lowercase English letters.
 

Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?
 */

// Approach 1: Using a map to keep track of letter frequencies
// function isAnagram(s: string, t: string): boolean {
//   // 1. They can never be anagrams if they are not of equal length
//   if (s.length !== t.length) {
//     return false;
//   }

//   // 2. Creating a map to keep track of letter frequencies
//   const charMap = new Map<string, number>();

//   // 3. Count the number of characters in the string 's'
//   for (const char of s) {
//     charMap.set(char, (charMap.get(char) || 0) + 1);
//   }

//   // 4. Match the characters in the string 't'
//   for (const char of t) {
//     let count = charMap.get(char);
//     // If the character is not in the map or its count is already 0
//     if (!count) {
//       return false;
//     }

//     // Decrement count by 1

//     charMap.set(char, count - 1);
//   }
//   return true;
// }

// Approach 2: Using an array to keep track of letter frequencies
function isAnagram(s: string, t: string): boolean {
  // 1. They can never be anagrams if they are not of equal length
  if (s.length !== t.length) {
    return false;
  }

  // Array filled with 0s for 26 English characters
  const counter = new Array<number>(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    // Extract the index (0 to 25) by omitting the ASCII code of 'a'
    counter[s.charCodeAt(i) - 97]++;
    counter[t.charCodeAt(i) - 97]--;
  }
  // Check if the value at an index is greater than or less than 0
  for (const count of counter) {
    if (count !== 0) {
      return false;
    }
  }
  return true;
}

// Test Case:
// Test Case 1: Simple anagram
console.log(isAnagram("anagram", "nagaram")); // Output: true
console.log(isAnagram("listen", "silent")); // Output: true

// Test Case 2: Different words
console.log(isAnagram("rat", "car")); // Output: false

// Test Case 3: Different Length
console.log(isAnagram("hello", "hell")); // Output: false

// Test Case 4: Unicode (Bangla characters)
// console.log(isAnagram("বাংলা", "লাবাং")); // Output: true

// Test case 5: Same character but different times used
console.log(isAnagram("aa", "a")); // Output: false
