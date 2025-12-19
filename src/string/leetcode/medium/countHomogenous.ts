// 1759. Count Number of Homogenous Substrings

/**
Example 1:

Input: s = "abbcccaa"
Output: 13
Explanation: The homogenous substrings are listed as below:
"a"   appears 3 times.
"aa"  appears 1 time.
"b"   appears 2 times.
"bb"  appears 1 time.
"c"   appears 3 times.
"cc"  appears 2 times.
"ccc" appears 1 time.
3 + 1 + 2 + 1 + 3 + 2 + 1 = 13.
Example 2:

Input: s = "xy"
Output: 2
Explanation: The homogenous substrings are "x" and "y".
Example 3:

Input: s = "zzzzz"
Output: 15

*/
const s = "abbcccaa";

const countHomogenous = function (s: string) {
  const MOD = 1_000_000_007;
  let totalCount = 0;
  let currentStreak = 0;

  for (let i = 0; i < s.length; i++) {
    // If current char is same as previous, increase streak
    // Otherwise, reset streak to 1
    if (i > 0 && s[i] === s[i - 1]) {
      currentStreak++;
    } else {
      currentStreak = 1;
    }

    // Add the streak to total (each increment represents
    // a new homogenous substring ending at index i)
    totalCount = (totalCount + currentStreak) % MOD;
  }

  return totalCount;
};

console.log(countHomogenous(s));
