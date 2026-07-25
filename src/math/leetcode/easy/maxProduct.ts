// 3536. Maximum Product of Two Digits

/**
Example 1:

Input: n = 31

Output: 3

Explanation:

The digits of n are [3, 1].
The possible products of any two digits are: 3 * 1 = 3.
The maximum product is 3.
Example 2:

Input: n = 22

Output: 4

Explanation:

The digits of n are [2, 2].
The possible products of any two digits are: 2 * 2 = 4.
The maximum product is 4.
Example 3:

Input: n = 124

Output: 8

Explanation:

The digits of n are [1, 2, 4].
The possible products of any two digits are: 1 * 2 = 2, 1 * 4 = 4, 2 * 4 = 8.
The maximum product is 8.
*/

function maxProduct(n: number): number {
  let a = 0;
  let b = 0;

  while (n > 0) {
    const x = n % 10;
    if (x > a) {
      b = a;
      a = x;
    } else if (x > b) {
      b = x;
    }
    n = Math.floor(n / 10);
  }

  return a * b;
}

// Example usage:
console.log(maxProduct(31)); // Output: 3
console.log(maxProduct(22)); // Output: 4
console.log(maxProduct(124)); // Output: 8
