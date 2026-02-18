// 693. Binary Number with Alternating Bits

/**
Example 1:

Input: n = 5
Output: true
Explanation: The binary representation of 5 is: 101
Example 2:

Input: n = 7
Output: false
Explanation: The binary representation of 7 is: 111.
Example 3:

Input: n = 11
Output: false
Explanation: The binary representation of 11 is: 1011.

*/

const n = 5;

// good
// const hasAlternatingBits = function (n: number): boolean {
//   const binaryString = n.toString(2);

//   for (let i = 1; i < binaryString.length; i++) {
//     // If current bit matches the previous bit, it's not alternating
//     if (binaryString[i] === binaryString[i - 1]) {
//       return false;
//     }
//   }

//   return true;
// };

const hasAlternatingBits = function (n: number): boolean {
  // Step 1: XOR 'n' with 'n' shifted to the right by 1.
  // If the bits alternate (e.g., 1010), shifting right gives (0101).
  // XORing them (1010 ^ 0101) will result in a stream of all 1s (1111).
  // If they don't alternate, there will be a 0 somewhere in the result.
  const x = n ^ (n >> 1);

  // Step 2: Check if 'x' consists of only 1s (e.g., 111, 1111, etc.).
  // A number 'x' consisting of all 1s has the property that 'x & (x + 1)' equals 0.
  // Example: 111 (7) + 1 = 1000 (8). 0111 & 1000 is 0000.
  return (x & (x + 1)) === 0;
};

console.log(hasAlternatingBits(n));
