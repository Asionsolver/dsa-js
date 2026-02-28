// 1680. Concatenation of Consecutive Binary Numbers

/**
Example 1:

Input: n = 1
Output: 1
Explanation: "1" in binary corresponds to the decimal value 1. 
Example 2:

Input: n = 3
Output: 27
Explanation: In binary, 1, 2, and 3 corresponds to "1", "10", and "11".
After concatenating them, we have "11011", which corresponds to the decimal value 27.
Example 3:

Input: n = 12
Output: 505379714
Explanation: The concatenation results in "1101110010111011110001001101010111100".
The decimal value of that is 118505380540.
After modulo 109 + 7, the result is 505379714.

*/

const n = 1;
const concatenatedBinary = function (n: number): number {
  let result = 0;
  const MOD = 1000000007; // 10^9 + 7
  let bitLength = 0;

  for (let i = 1; i <= n; i++) {
    // Check if i is a power of 2 (e.g., 1, 2, 4, 8...).
    // When i is a power of 2, the binary representation length increases by 1.
    // The expression (i & (i - 1)) results in 0 only if i is a power of 2.
    if ((i & (i - 1)) === 0) {
      bitLength++;
    }

    // Conceptually: result = (result << bitLength) | i
    // Implementation: We use arithmetic multiplication because standard JS
    // bitwise operators truncate to 32 bits. The intermediate value
    // (result * 2^bitLength) fits within the safe integer range (2^53 - 1).
    // (1 << bitLength) calculates 2^bitLength efficiently.
    result = (result * (1 << bitLength) + i) % MOD;
  }

  return result;
};

console.log(concatenatedBinary(n));
