// 1291. Sequential Digits

/**
Example 1:

Input: low = 100, high = 300
Output: [123,234]
Example 2:

Input: low = 1000, high = 13000
Output: [1234,2345,3456,4567,5678,6789,12345]
*/

function sequentialDigits(low: number, high: number): number[] {
  const result: number[] = [];
  const digits = "123456789";

  // Loop through all possible lengths of the sequential numbers
  for (let len = 2; len <= 9; len++) {
    // Slide a window of 'len' over the digits string
    for (let i = 0; i <= 9 - len; i++) {
      const sub = digits.substring(i, i + len);
      const num = parseInt(sub, 10);

      if (num >= low && num <= high) {
        result.push(num);
      }
    }
  }

  return result;
}

// Example usage:
const low = 100;
const high = 300;
console.log(sequentialDigits(low, high)); // Output: [123, 234]

const low2 = 1000;
const high2 = 13000;
console.log(sequentialDigits(low2, high2)); // Output: [1234, 2345, 3456, 4567, 5678, 6789, 12345]
