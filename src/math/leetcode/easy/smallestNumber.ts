// 3345. Smallest Divisible Digit Product I

/**
Example 1:

Input: n = 10, t = 2

Output: 10

Explanation:

The digit product of 10 is 0, which is divisible by 2, making it the smallest number greater than or equal to 10 that satisfies the condition.

Example 2:

Input: n = 15, t = 3

Output: 16

Explanation:

The digit product of 16 is 6, which is divisible by 3, making it the smallest number greater than or equal to 15 that satisfies the condition.
*/

function smallestNumber(n: number, t: number): number {
  // Helper function to calculate the product of digits of a number
  const getDigitProduct = (num: number): number => {
    let product = 1;
    while (num > 0) {
      product *= num % 10;
      num = Math.floor(num / 10);
    }
    return product;
  };

  // Increment n until we find a number whose digit product is divisible by t
  while (true) {
    if (getDigitProduct(n) % t === 0) {
      return n;
    }
    n++;
  }
}

// Example usage:
console.log(smallestNumber(10, 2)); // Output: 10
console.log(smallestNumber(15, 3)); // Output: 16
