// 1461. Check If a String Contains All Binary Codes of Size K

/**
Example 1:

Input: s = "00110110", k = 2
Output: true
Explanation: The binary codes of length 2 are "00", "01", "10" and "11". They can be all found as substrings at indices 0, 1, 3 and 2 respectively.
Example 2:

Input: s = "0110", k = 1
Output: true
Explanation: The binary codes of length 1 are "0" and "1", it is clear that both exist as a substring. 
Example 3:

Input: s = "0110", k = 2
Output: false
Explanation: The binary code "00" is of length 2 and does not exist in the array.
*/

const s = "0110",
  k = 2;
const hasAllCodes = function (s: string, k: number): boolean {
  // There are 2^k possible binary codes of length k.
  // We use bitwise shift (1 << k) to calculate 2^k efficiently.
  const requiredCount = 1 << k;

  // Optimization: The total number of substrings of length k in s
  // is (s.length - k + 1). If s is not long enough to possibly
  // contain all unique codes, return false immediately.
  if (s.length - k + 1 < requiredCount) {
    return false;
  }

  const seen = new Set<string>();

  // Iterate through the string to capture every substring of length k
  for (let i = 0; i <= s.length - k; i++) {
    const substring = s.substring(i, i + k);
    seen.add(substring);

    // Optimization: If we have already found all required codes,
    // we can return true early without checking the rest of the string.
    if (seen.size === requiredCount) {
      return true;
    }
  }

  return seen.size === requiredCount;
};

console.log(hasAllCodes(s, k));
