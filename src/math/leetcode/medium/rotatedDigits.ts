// 788. Rotated Digits

/**
Example 1:

Input: n = 10
Output: 4
Explanation: There are four good numbers in the range [1, 10] : 2, 5, 6, 9.
Note that 1 and 10 are not good numbers, since they remain unchanged after rotating.
Example 2:

Input: n = 1
Output: 0
Example 3:

Input: n = 2
Output: 1
*/

function rotatedDigits(n: number): number {
  let goodNumbersCount = 0;

  for (let i = 1; i <= n; i++) {
    let num = i;
    let isValid = true;
    let hasDifferent = false;

    // Check each digit of the number
    while (num > 0) {
      const digit = num % 10;

      // If it contains an invalid digit, the whole number is invalid
      if (digit === 3 || digit === 4 || digit === 7) {
        isValid = false;
        break; // No need to check remaining digits
      }

      // If it contains at least one rotating digit, it will form a different number
      if (digit === 2 || digit === 5 || digit === 6 || digit === 9) {
        hasDifferent = true;
      }

      // Strip the last digit to check the next one
      num = Math.floor(num / 10);
    }

    // A number is "good" if it's completely valid and differs from its original self
    if (isValid && hasDifferent) {
      goodNumbersCount++;
    }
  }

  return goodNumbersCount;
}

// Test cases
console.log(rotatedDigits(10)); // Output: 4
console.log(rotatedDigits(1)); // Output: 0
console.log(rotatedDigits(2)); // Output: 1
