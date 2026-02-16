// 190. Reverse Bits

/**
Example 1:

Input: n = 43261596

Output: 964176192

Explanation:

Integer	Binary
43261596	00000010100101000001111010011100
964176192	00111001011110000010100101000000
Example 2:

Input: n = 2147483644

Output: 1073741822

Explanation:
*/

const n = 2147483644;

// good
const reverseBits = function (n: number): number {
  let result = 0;

  for (let i = 0; i < 32; i++) {
    // 1. Shift result to the left to make room for the new bit
    result = result << 1;

    // 2. Get the last bit of n (0 or 1)
    const bit = n & 1;

    // 3. Add the obtained bit to the last position of result
    // Using bitwise OR (|) is equivalent to adding here since the last bit is 0
    result = result | bit;

    // 4. Shift n to the right to process the next bit
    // Use >>> (unsigned right shift) to ensure zeros fill in from the left
    n = n >>> 1;
  }

  // JavaScript bitwise operations result in signed 32-bit integers.
  // If the 32nd bit is 1, the number becomes negative.
  // We use >>> 0 to treat the bit pattern as an unsigned integer.
  return result >>> 0;
};

console.log(reverseBits(n));
