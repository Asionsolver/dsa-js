// 66. Plus One

/**
Example 1:

Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Incrementing by one gives 123 + 1 = 124.
Thus, the result should be [1,2,4].
Example 2:

Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.
Incrementing by one gives 4321 + 1 = 4322.
Thus, the result should be [4,3,2,2].
Example 3:

Input: digits = [9]
Output: [1,0]
Explanation: The array represents the integer 9.
Incrementing by one gives 9 + 1 = 10.
Thus, the result should be [1,0].

*/

const digits = [1, 2, 3];
function plusOne(digits: number[]): number[] {
  // Traverse the array from right to left
  for (let i = digits.length - 1; i >= 0; i--) {
    // If the digit is not 9, we can just add 1 and return
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }

    // If the digit is 9, it becomes 0, and we carry over to the next loop iteration
    digits[i] = 0;
  }

  // If we exit the loop, it means all digits were 9 (e.g., 99 -> 00).
  // We need to add 1 at the beginning (result becomes 100).
  digits.unshift(1);

  return digits;
}

console.log(plusOne(digits));
