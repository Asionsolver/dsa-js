// 1009. Complement of Base 10 Integer

/**
Example 1:

Input: n = 5
Output: 2
Explanation: 5 is "101" in binary, with complement "010" in binary, which is 2 in base-10.
Example 2:

Input: n = 7
Output: 0
Explanation: 7 is "111" in binary, with complement "000" in binary, which is 0 in base-10.
Example 3:

Input: n = 10
Output: 5
Explanation: 10 is "1010" in binary, with complement "0101" in binary, which is 5 in base-10.

*/
const n = 10;
// const bitwiseComplement = function (n: number): number {
//   // Edge case: binary representation of 0 is just "0", complement is "1"
//   if (n === 0) {
//     return 1;
//   }

//   // Build a mask of 1s of the same bit length as n
//   let mask = 1;
//   while (mask < n) {
//     // Left shift the mask by 1 and flip the new rightmost bit to 1
//     // Example progression: 1 (1) -> 3 (11) -> 7 (111) -> 15 (1111)
//     mask = (mask << 1) | 1;
//   }

//   // XORing the number with the mask flips all bits
//   return n ^ mask;
// };

const bitwiseComplement = function (n: number): number {
  const binaryStr = n.toString(2);
  let complementStr = "";

  for (const char of binaryStr) {
    complementStr += char === "0" ? "1" : "0";
  }

  return parseInt(complementStr, 2);
};

console.log(bitwiseComplement(n));
