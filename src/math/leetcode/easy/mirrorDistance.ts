// 3783. Mirror Distance of an Integer

/**
Example 1:

Input: n = 25

Output: 27

Explanation:

reverse(25) = 52.
Thus, the answer is abs(25 - 52) = 27.
Example 2:

Input: n = 10

Output: 9

Explanation:

reverse(10) = 01 which is 1.
Thus, the answer is abs(10 - 1) = 9.
Example 3:

Input: n = 7

Output: 0

Explanation:

reverse(7) = 7.
Thus, the answer is abs(7 - 7) = 0.

*/

const mirrorDistance = function (n: number): number {
  let temp = n;
  let reversedN = 0;

  // Reverse the digits of the number mathematically
  while (temp > 0) {
    reversedN = reversedN * 10 + (temp % 10);
    temp = Math.floor(temp / 10);
  }

  // Return the absolute difference
  return Math.abs(n - reversedN);
};

// Example usage:
console.log(mirrorDistance(25)); // Output: 27
console.log(mirrorDistance(10)); // Output: 9
console.log(mirrorDistance(7)); // Output: 0
