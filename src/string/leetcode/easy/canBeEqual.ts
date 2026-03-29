// 2839. Check if Strings Can be Made Equal With Operations I

/**
Example 1:

Input: s1 = "abcd", s2 = "cdab"
Output: true
Explanation: We can do the following operations on s1:
- Choose the indices i = 0, j = 2. The resulting string is s1 = "cbad".
- Choose the indices i = 1, j = 3. The resulting string is s1 = "cdab" = s2.
Example 2:

Input: s1 = "abcd", s2 = "dacb"
Output: false
Explanation: It is not possible to make the two strings equal.
 */
const s1 = "abcd",
  s2 = "cdab";
const canBeEqual = (s1: string, s2: string): boolean => {
  // Check if even indices (0 and 2) have the same characters in any order
  const canMatchEven =
    (s1[0] === s2[0] && s1[2] === s2[2]) ||
    (s1[0] === s2[2] && s1[2] === s2[0]);

  // Check if odd indices (1 and 3) have the same characters in any order
  const canMatchOdd =
    (s1[1] === s2[1] && s1[3] === s2[3]) ||
    (s1[1] === s2[3] && s1[3] === s2[1]);

  // Both even and odd positioned characters must match their respective sets
  return canMatchEven && canMatchOdd;
};

console.log(canBeEqual(s1, s2));
