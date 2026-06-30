// 1358. Number of Substrings Containing All Three Characters

/**
Example 1:

Input: s = "abcabc"
Output: 10
Explanation: The substrings containing at least one occurrence of the characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again). 
Example 2:

Input: s = "aaacb"
Output: 3
Explanation: The substrings containing at least one occurrence of the characters a, b and c are "aaacb", "aacb" and "acb". 
Example 3:

Input: s = "abc"
Output: 1

*/

function numberOfSubstrings(s: string): number {
  let count = 0;
  let lastA = -1;
  let lastB = -1;
  let lastC = -1;

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char === "a") {
      lastA = i;
    } else if (char === "b") {
      lastB = i;
    } else if (char === "c") {
      lastC = i;
    }

    // Find the earliest index among the last seen positions of 'a', 'b', and 'c'
    const minIndex = Math.min(lastA, lastB, lastC);

    // If minIndex >= 0, it means all three characters have been seen.
    // There are (minIndex + 1) valid substrings ending at index i.
    count += minIndex + 1;
  }

  return count;
}

// Example usage:
console.log(numberOfSubstrings("abcabc")); // Output: 10
console.log(numberOfSubstrings("aaacb")); // Output: 3
console.log(numberOfSubstrings("abc")); // Output: 1
