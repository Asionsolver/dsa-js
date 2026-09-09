// 7. Reverse Integer

/**
Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).
*/

/**
Example 1:

Input: x = 123
Output: 321
Example 2:

Input: x = -123
Output: -321
Example 3:

Input: x = 120
Output: 21
*/

/**
Constraints:

-231 <= x <= 231 - 1
*/

// Brute Force Approach
// function reverse(x: number): number {
//   // Determine the sign of the number.
//   const isNegative = x < 0;

//   // Convert absolute value of x to string, reverse it, and convert back to number.
//   const reversedStr = Math.abs(x).toString().split("").reverse().join("");
//   let reversedNum = parseInt(reversedStr, 10);

//   // Reapply the negative sign if applicable.
//   if (isNegative) {
//     reversedNum = -reversedNum;
//   }

//   // 32-bit signed integer limits: [-2^31, 2^31 - 1]
//   const INT_MIN = -Math.pow(2, 31);
//   const INT_MAX = Math.pow(2, 31) - 1;

//   // Check if the result is outside the 32-bit range.
//   if (reversedNum < INT_MIN || reversedNum > INT_MAX) {
//     return 0;
//   }

//   return reversedNum;
// }

// Optimized Approach
function reverse(x: number): number {
  // Define 32-bit signed integer boundaries.
  const INT_MAX = 2147483647; // 2^31 - 1
  const INT_MIN = -2147483648; // -2^31

  const MAX_DIV_10 = Math.trunc(INT_MAX / 10);
  const MIN_DIV_10 = Math.trunc(INT_MIN / 10);

  let reversedNum = 0;

  while (x !== 0) {
    // Extract the last digit of x.
    const pop = x % 10;

    // Truncate the last digit from x.
    x = Math.trunc(x / 10);

    // Check for positive overflow before multiplying.
    if (reversedNum > MAX_DIV_10 || (reversedNum === MAX_DIV_10 && pop > 7)) {
      return 0;
    }

    // Check for negative underflow before multiplying.
    if (reversedNum < MIN_DIV_10 || (reversedNum === MIN_DIV_10 && pop < -8)) {
      return 0;
    }

    // Append the popped digit to the reversed number.
    reversedNum = reversedNum * 10 + pop;
  }

  return reversedNum;
}

// Example usage:
const input = 123;
const output = reverse(input);
console.log(`Input: ${input}, Reversed Output: ${output}`);

const input2 = -123;
const output2 = reverse(input2);
console.log(`Input: ${input2}, Reversed Output: ${output2}`);

const input3 = 120;
const output3 = reverse(input3);
console.log(`Input: ${input3}, Reversed Output: ${output3}`);
