// 2840. Check if Strings Can be Made Equal With Operations II

/**
Example 1:

Input: s1 = "abcdba", s2 = "cabdab"
Output: true
Explanation: We can apply the following operations on s1:
- Choose the indices i = 0, j = 2. The resulting string is s1 = "cbadba".
- Choose the indices i = 2, j = 4. The resulting string is s1 = "cbbdaa".
- Choose the indices i = 1, j = 5. The resulting string is s1 = "cabdab" = s2.
Example 2:

Input: s1 = "abe", s2 = "bea"
Output: false
Explanation: It is not possible to make the two strings equal.
*/

const s1 = "abcdba",
  s2 = "cabdab";
const checkStrings = function (s1: string, s2: string): boolean {
  // Fast check: if they are already identically equal
  if (s1 === s2) return true;

  // Frequency tracking arrays for 'a' to 'z' (26 characters)
  const countEven = new Int32Array(26);
  const countOdd = new Int32Array(26);

  const n = s1.length;
  for (let i = 0; i < n; i++) {
    // Find 0-indexed character codes relative to 'a'
    const c1 = s1.charCodeAt(i) - 97;
    const c2 = s2.charCodeAt(i) - 97;

    // Bitwise AND operation `(i & 1) === 0` is a fast way to check for even numbers
    if ((i & 1) === 0) {
      countEven[c1]++;
      countEven[c2]--;
    } else {
      countOdd[c1]++;
      countOdd[c2]--;
    }
  }

  // Check if the frequencies equalize perfectly
  for (let i = 0; i < 26; i++) {
    if (countEven[i] !== 0 || countOdd[i] !== 0) {
      return false; // Character counts don't align for either even or odd positions
    }
  }

  return true;
};

console.log(checkStrings(s1, s2));
