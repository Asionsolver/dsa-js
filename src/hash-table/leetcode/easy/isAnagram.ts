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

function isAnagram(s: string, t: string): boolean {
  // 1. They can never be anagrams if they are not of equal length
  if (s.length !== t.length) {
    return false;
  }

  // 2. Creating a map to keep track of letter frequencies
  const charMap = new Map<string, number>();

  // 3. Count the number of characters in the string 's'
  for (const char of s) {
    charMap.set(char, (charMap.get(char) || 0) + 1);
  }

  // 4. Match the characters in the string 't'
  for (const char of t) {
    let count = charMap.get(char);
    // If the character is not in the map or its count is already 0
    if (!count) {
      return false;
    }

    // Decrement count by 1

    charMap.set(char, count - 1);
  }
  return true;
}

// Test Case:
// Test Case 1: Simple anagram
console.log(isAnagram("anagram", "nagaram")); // Output: true

// Test Case 2: Different words
console.log(isAnagram("rat", "car")); // Output: false

// Test Case 3: Different Length
console.log(isAnagram("hello", "hell")); // Output: false

// Test Case 4: Unicode (Bangla characters)
console.log(isAnagram("বাংলা", "লাবাং")); // Output: true

// Test case 5: Same character but different times used
console.log(isAnagram("aa", "a")); // Output: false
