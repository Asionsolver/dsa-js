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
const hasAlternatingBits = function (n: number): boolean {
  const binaryString = n.toString(2);

  for (let i = 1; i < binaryString.length; i++) {
    // If current bit matches the previous bit, it's not alternating
    if (binaryString[i] === binaryString[i - 1]) {
      return false;
    }
  }

  return true;
};

console.log(hasAlternatingBits(n));
