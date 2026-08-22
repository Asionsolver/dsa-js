// 3622. Check Divisibility by Digit Sum and Product

/**
You are given a positive integer n. Determine whether n is divisible by the sum of the following two values:

The digit sum of n (the sum of its digits).

The digit product of n (the product of its digits).

Return true if n is divisible by this sum; otherwise, return false.
*/

/**
Example 1:

Input: n = 99

Output: true

Explanation:

Since 99 is divisible by the sum (9 + 9 = 18) plus product (9 * 9 = 81) of its digits (total 99), the output is true.

Example 2:

Input: n = 23

Output: false

Explanation:

Since 23 is not divisible by the sum (2 + 3 = 5) plus product (2 * 3 = 6) of its digits (total 11), the output is false.
*/

/**
Constraints:

1 <= n <= 106
*/

// Approach: Numeric Approach
function checkDivisibility(n: number): boolean {
  // Variable to store the sum of digits.

  let digitSum: number = 0;

  // Variable to store the product of digits.

  let digitProduct: number = 1;

  // Create a temporary copy to extract digits without changing original 'n'.

  let temp: number = n;

  // Standard numeric approach to extract digits.
  while (temp > 0) {
    // Get the last digit using modulo 10.

    const digit: number = temp % 10;

    // Add digit to sum.

    digitSum += digit;

    // Multiply digit to product.

    digitProduct *= digit;

    // Remove the last digit using integer division.

    temp = Math.floor(temp / 10);
  }

  // Calculate the total of sum and product.

  const totalDivisor: number = digitSum + digitProduct;

  // Return true if 'n' is divisible by totalDivisor.

  return n % totalDivisor === 0;
}

// Example usage:
console.log(checkDivisibility(99)); // Output: true
console.log(checkDivisibility(23)); // Output: false
console.log(checkDivisibility(1)); // Output: true
console.log(checkDivisibility(10)); // Output: false
console.log(checkDivisibility(123)); // Output: false
console.log(checkDivisibility(7582275584451154987646545)); // Output: false
