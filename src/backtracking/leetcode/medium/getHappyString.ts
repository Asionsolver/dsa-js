// 1415. The k-th Lexicographical String of All Happy Strings of Length n

/**
Example 1:

Input: n = 1, k = 3
Output: "c"
Explanation: The list ["a", "b", "c"] contains all happy strings of length 1. The third string is "c".
Example 2:

Input: n = 1, k = 4
Output: ""
Explanation: There are only 3 happy strings of length 1.
Example 3:

Input: n = 3, k = 9
Output: "cab"
Explanation: There are 12 different happy string of length 3 ["aba", "abc", "aca", "acb", "bab", "bac", "bca", "bcb", "cab", "cac", "cba", "cbc"]. You will find the 9th string = "cab"

*/

const n = 3,
  k = 9;

const getHappyString = function (n: number, k: number): string {
  // The total number of happy strings of length n
  const total = 3 * (1 << (n - 1));

  // If k is greater than the total number of happy strings, it's impossible.
  if (k > total) {
    return "";
  }

  // Convert k to a 0-indexed number for easier modulo math
  k -= 1;
  let res = "";
  const letters = ["a", "b", "c"];

  // 1. Determine the very first character
  let charIndex = Math.floor(k / (1 << (n - 1)));
  let lastChar = letters[charIndex];
  res += lastChar;

  // Remainder gives the rank among the strings starting with the chosen first character
  k %= 1 << (n - 1);

  // 2. Determine the remaining n - 1 characters
  for (let i = 1; i < n; i++) {
    // Find the 2 lexicographically sorted choices for the current position
    let currentChoices = letters.filter((ch) => ch !== lastChar);

    // Number of variations for each choice from this point forward
    let vars = 1 << (n - 1 - i);

    charIndex = Math.floor(k / vars);
    lastChar = currentChoices[charIndex];
    res += lastChar;

    // Update remainder for the next iteration
    k %= vars;
  }

  return res;
};

console.log(getHappyString(n, k));
