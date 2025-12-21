// 1611. Minimum One Bit Operations to Make Integers Zero

/**
Example 1:

Input: n = 3
Output: 2
Explanation: The binary representation of 3 is "11".
"11" -> "01" with the 2nd operation since the 0th bit is 1.
"01" -> "00" with the 1st operation.
Example 2:

Input: n = 6
Output: 4
Explanation: The binary representation of 6 is "110".
"110" -> "010" with the 2nd operation since the 1st bit is 1 and 0th through 0th bits are 0.
"010" -> "011" with the 1st operation.
"011" -> "001" with the 2nd operation since the 0th bit is 1.
"001" -> "000" with the 1st operation.
*/

const n = 3;

const minimumOneBitOperations = function (n: number) {
  /**
   * The problem asks for the minimum operations to transform n to 0.
   * This is equivalent to converting a Gray code to its binary integer value.
   *
   * In JavaScript/TypeScript, bitwise operations operate on 32-bit
   * signed integers, which is sufficient for n <= 10^9.
   */
  let result = 0;

  while (n > 0) {
    result ^= n;
    n >>= 1;
  }

  return result;
};

console.log(minimumOneBitOperations(n));
