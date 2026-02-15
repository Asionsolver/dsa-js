// 67. Add Binary

/**
Example 1:

Input: a = "11", b = "1"
Output: "100"
Example 2:

Input: a = "1010", b = "1011"
Output: "10101"

*/

const a = "1010",
  b = "1011";

// good
// const addBinary = function (a: string, b: string): string {
//   let result: string[] = [];
//   let i = a.length - 1;
//   let j = b.length - 1;
//   let carry = 0;

//   // Loop until both strings are processed and no carry remains
//   while (i >= 0 || j >= 0 || carry > 0) {
//     // Get the numeric value of the current digit, or 0 if pointer is out of bounds
//     const digitA = i >= 0 ? Number(a[i]) : 0;
//     const digitB = j >= 0 ? Number(b[j]) : 0;

//     // Calculate sum of digits and carry
//     const sum = digitA + digitB + carry;

//     // The new digit is sum % 2 (e.g., 1+1=2 -> 0, 1+0=1 -> 1)
//     result.push((sum % 2).toString());

//     // Update carry (e.g., 1+1=2 -> carry 1)
//     carry = Math.floor(sum / 2);

//     // Move pointers to the left
//     i--;
//     j--;
//   }

//   // Since we pushed digits from right to left, reverse the result
//   return result.reverse().join("");
// };

const addBinary = function (a: string, b: string): string {
  // 1. Convert binary strings to BigInts (prefix with '0b')
  // 2. Add them
  // 3. Convert back to binary string (radix 2)
  return (BigInt(`0b${a}`) + BigInt(`0b${b}`)).toString(2);
};

console.log(addBinary(a, b));
