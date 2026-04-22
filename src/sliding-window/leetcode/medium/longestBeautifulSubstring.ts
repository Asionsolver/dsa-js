// 1839. Longest Substring Of All Vowels in Order

/**
Example 1:

Input: word = "aeiaaioaaaaeiiiiouuuooaauuaeiu"
Output: 13
Explanation: The longest beautiful substring in word is "aaaaeiiiiouuu" of length 13.
Example 2:

Input: word = "aeeeiiiioooauuuaeiou"
Output: 5
Explanation: The longest beautiful substring in word is "aeiou" of length 5.
Example 3:

Input: word = "a"
Output: 0
Explanation: There is no beautiful substring, so return 0.
*/

function longestBeautifulSubstring(word: string): number {
  if (word.length < 5) return 0;

  let maxLen = 0;
  let currentLen = 1;
  let uniqueVowels = 1;
  let prev = word.charCodeAt(0);
  const n = word.length;

  for (let i = 1; i < n; i++) {
    const curr = word.charCodeAt(i);

    // Check if the current character maintains alphabetical (non-decreasing) order
    if (curr >= prev) {
      currentLen++;
      // If strictly greater, it's a new unique vowel sequence stepping up
      if (curr > prev) {
        uniqueVowels++;
      }
    } else {
      // Sequence broke, reset the counters
      currentLen = 1;
      uniqueVowels = 1;
    }

    // Assign the current ASCII as previous for the next iteration
    prev = curr;

    // If we've recorded exactly 5 unique vowels, it is a valid beautiful substring
    if (uniqueVowels === 5 && currentLen > maxLen) {
      maxLen = currentLen;
    }
  }

  return maxLen;
}

const word = "aeiaaioaaaaeiiiiouuuooaauuaeiu";
console.log(longestBeautifulSubstring(word));
