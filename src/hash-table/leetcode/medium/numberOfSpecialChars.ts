// 3121. Count the Number of Special Characters II

/**
Example 1:

Input: word = "aaAbcBC"

Output: 3

Explanation:

The special characters are 'a', 'b', and 'c'.

Example 2:

Input: word = "abc"

Output: 0

Explanation:

There are no special characters in word.

Example 3:

Input: word = "AbBCab"

Output: 0

Explanation:

There are no special characters in word.
*/

function numberOfSpecialChars(word: string): number {
  // Arrays to store the indices, initialized to -1
  const lastLower: number[] = new Array(26).fill(-1);
  const firstUpper: number[] = new Array(26).fill(-1);

  for (let i = 0; i < word.length; i++) {
    const code = word.charCodeAt(i);

    // If the character is a lowercase letter ('a' to 'z')
    if (code >= 97 && code <= 122) {
      lastLower[code - 97] = i;
    }
    // If the character is an uppercase letter ('A' to 'Z')
    else if (code >= 65 && code <= 90) {
      const idx = code - 65;
      if (firstUpper[idx] === -1) {
        firstUpper[idx] = i;
      }
    }
  }

  let specialCount = 0;

  // Check all 26 letters
  for (let i = 0; i < 26; i++) {
    if (
      lastLower[i] !== -1 &&
      firstUpper[i] !== -1 &&
      lastLower[i] < firstUpper[i]
    ) {
      specialCount++;
    }
  }

  return specialCount;
}

// Example Uses
console.log(numberOfSpecialChars("aaAbcBC"));
console.log(numberOfSpecialChars("abc"));
