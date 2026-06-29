// 1967. Number of Strings That Appear as Substrings in Word

/**
Example 1:

Input: patterns = ["a","abc","bc","d"], word = "abc"
Output: 3
Explanation:
- "a" appears as a substring in "abc".
- "abc" appears as a substring in "abc".
- "bc" appears as a substring in "abc".
- "d" does not appear as a substring in "abc".
3 of the strings in patterns appear as a substring in word.
Example 2:

Input: patterns = ["a","b","c"], word = "aaaaabbbbb"
Output: 2
Explanation:
- "a" appears as a substring in "aaaaabbbbb".
- "b" appears as a substring in "aaaaabbbbb".
- "c" does not appear as a substring in "aaaaabbbbb".
2 of the strings in patterns appear as a substring in word.
Example 3:

Input: patterns = ["a","a","a"], word = "ab"
Output: 3
Explanation: Each of the patterns appears as a substring in word "ab".
*/

function numOfStrings(patterns: string[], word: string): number {
  let count = 0;

  for (const pattern of patterns) {
    if (word.includes(pattern)) {
      count++;
    }
  }

  return count;
}

// Example usage:
const patterns1 = ["a", "abc", "bc", "d"];
const word1 = "abc";
console.log(numOfStrings(patterns1, word1)); // Output: 3

const patterns2 = ["a", "b", "c"];
const word2 = "aaaaabbbbb";
console.log(numOfStrings(patterns2, word2)); // Output: 2

const patterns3 = ["a", "a", "a"];
const word3 = "ab";
console.log(numOfStrings(patterns3, word3)); // Output: 3
