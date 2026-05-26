// 3120. Count the Number of Special Characters I

/**
Example 1:

Input: word = "aaAbcBC"

Output: 3

Explanation:

The special characters in word are 'a', 'b', and 'c'.

Example 2:

Input: word = "abc"

Output: 0

Explanation:

No character in word appears in uppercase.

Example 3:

Input: word = "abBCab"

Output: 1

Explanation:

The only special character in word is 'b'.
*/

function numberOfSpecialChars(word: string): number {
  // Store all unique characters from the string into a Set for O(1) lookups
  const charSet = new Set(word);
  let specialCount = 0;

  // Iterate through all 26 English letters using their character codes
  for (let i = 0; i < 26; i++) {
    const lowerChar = String.fromCharCode(97 + i); // 97 is the ASCII code for 'a'
    const upperChar = String.fromCharCode(65 + i); // 65 is the ASCII code for 'A'

    // If both lowercase and uppercase variants exist in the word, it's special
    if (charSet.has(lowerChar) && charSet.has(upperChar)) {
      specialCount++;
    }
  }

  return specialCount;
}

// Test cases
console.log(numberOfSpecialChars("aaAbcBC")); // Output: 3
console.log(numberOfSpecialChars("abc")); // Output: 0
console.log(numberOfSpecialChars("abBCab")); // Output: 1
