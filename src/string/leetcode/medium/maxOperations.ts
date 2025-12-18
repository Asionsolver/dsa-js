// 3228. Maximum Number of Operations to Move Ones to the End

/**

Example 1:

Input: s = "1001101"

Output: 4

Explanation:

We can perform the following operations:

Choose index i = 0. The resulting string is s = "0011101".
Choose index i = 4. The resulting string is s = "0011011".
Choose index i = 3. The resulting string is s = "0010111".
Choose index i = 2. The resulting string is s = "0001111".
Example 2:

Input: s = "00111"

Output: 0


*/

const s = "1001101";
const maxOperations = function (s: string) {
  let operations = 0;
  let onesCount = 0;
  const n = s.length;

  for (let i = 0; i < n; i++) {
    if (s[i] === "1") {
      onesCount++;

      // Check if this '1' is the last in a block of ones before a zero.
      // If s[i] is '1' and s[i+1] is '0', it means we've hit a gap.
      // All accumulated '1's so far can move across this gap.
      if (i + 1 < n && s[i + 1] === "0") {
        operations += onesCount;
      }
    }
  }

  return operations;
};
console.log(maxOperations(s));
