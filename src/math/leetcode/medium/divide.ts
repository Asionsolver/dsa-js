// 29. Divide Two Integers

/**
Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator.

The integer division should truncate toward zero, which means losing its fractional part. For example, 8.345 would be truncated to 8, and -2.7335 would be truncated to -2.

Return the quotient after dividing dividend by divisor.

Note: Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [−231, 231 − 1]. For this problem, if the quotient is strictly greater than 231 - 1, then return 231 - 1, and if the quotient is strictly less than -231, then return -231.
*/

/**
Example 1:

Input: dividend = 10, divisor = 3
Output: 3
Explanation: 10/3 = 3.33333.. which is truncated to 3.
Example 2:

Input: dividend = 7, divisor = -3
Output: -2
Explanation: 7/-3 = -2.33333.. which is truncated to -2.
 
*/

/**
Example 1:

Input: dividend = 10, divisor = 3
Output: 3
Explanation: 10/3 = 3.33333.. which is truncated to 3.
Example 2:

Input: dividend = 7, divisor = -3
Output: -2
Explanation: 7/-3 = -2.33333.. which is truncated to -2.
 
*/

// Throw TLE
// function divide(dividend: number, divisor: number): number {
//   const MAX_INT = 2147483647; // 2^31 - 1
//   const MIN_INT = -2147483648; // -2^31

//   // Handle 32-bit signed integer overflow.
//   if (dividend === MIN_INT && divisor === -1) {
//     return MAX_INT;
//   }

//   // Determine the sign of the result.
//   const isNegative = dividend < 0 !== divisor < 0;

//   // Convert both numbers to positive values.
//   let dvd = Math.abs(dividend);
//   const dvs = Math.abs(divisor);

//   let quotient = 0;

//   // Subtract divisor one by one until dividend is smaller than divisor.
//   while (dvd >= dvs) {
//     dvd -= dvs;
//     quotient++;
//   }

//   // Return quotient with appropriate sign.
//   return isNegative ? -quotient : quotient;
// }

function divide(dividend: number, divisor: number): number {
  const MAX_INT = 2147483647; // 2^31 - 1
  const MIN_INT = -2147483648; // -2^31

  // Handle 32-bit signed integer overflow edge case.
  if (dividend === MIN_INT && divisor === -1) {
    return MAX_INT;
  }

  // Determine the sign of the quotient.
  const isNegative = dividend < 0 !== divisor < 0;

  // Convert both numbers to their absolute values.
  let dvd = Math.abs(dividend);
  const dvs = Math.abs(divisor);

  let quotient = 0;

  // Outer loop continues until remaining dividend is smaller than divisor.
  while (dvd >= dvs) {
    let tempDvs = dvs;
    let multiple = 1;

    // Double the divisor until it would exceed the remaining dividend.
    while (dvd >= tempDvs + tempDvs) {
      tempDvs += tempDvs;
      multiple += multiple;
    }

    // Subtract the largest found multiple and accumulate the quotient.
    dvd -= tempDvs;
    quotient += multiple;
  }

  // Apply the sign to the final quotient.
  return isNegative ? -quotient : quotient;
}
// Example usage:
console.log(divide(10, 3)); // Output: 3
console.log(divide(7, -3)); // Output: -2
console.log(divide(-2147483648, -1)); // Output: 2147483647 (overflow case)
