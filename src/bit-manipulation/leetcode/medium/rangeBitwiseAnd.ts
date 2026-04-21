// 201. Bitwise AND of Numbers Range

/**
Example 1:

Input: left = 5, right = 7
Output: 4
Example 2:

Input: left = 0, right = 0
Output: 0
Example 3:

Input: left = 1, right = 2147483647
Output: 0
*/

function rangeBitwiseAnd(left: number, right: number): number {
  while (right > left) {
    // Clears the lowest set bit of right
    right &= right - 1;
  }

  return right;
}

// Example usage:
const left = 5;
const right = 7;
console.log(rangeBitwiseAnd(left, right)); // Output: 4

// Another example usage:
const left2 = 0;
const right2 = 0;
console.log(rangeBitwiseAnd(left2, right2)); // Output: 0

// Another example usage:
const left3 = 1;
const right3 = 2147483647;
console.log(rangeBitwiseAnd(left3, right3)); // Output: 0
