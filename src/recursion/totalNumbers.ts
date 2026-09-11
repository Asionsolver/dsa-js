// 3483. Unique 3-Digit Even Numbers

/**
You are given an array of digits called digits. Your task is to determine the number of distinct three-digit even numbers that can be formed using these digits.

Note: Each copy of a digit can only be used once per number, and there may not be leading zeros.
*/

/**
Example 1:

Input: digits = [1,2,3,4]

Output: 12

Explanation: The 12 distinct 3-digit even numbers that can be formed are 124, 132, 134, 142, 214, 234, 312, 314, 324, 342, 412, and 432. Note that 222 cannot be formed because there is only 1 copy of the digit 2.

Example 2:

Input: digits = [0,2,2]

Output: 2

Explanation: The only 3-digit even numbers that can be formed are 202 and 220. Note that the digit 2 can be used twice because it appears twice in the array.

Example 3:

Input: digits = [6,6,6]

Output: 1

Explanation: Only 666 can be formed.

Example 4:

Input: digits = [1,3,5]

Output: 0

Explanation: No even 3-digit numbers can be formed.
*/

/** 
Constraints:

3 <= digits.length <= 10
0 <= digits[i] <= 9

*/

// Brute Force Approach
// function totalNumbers(digits: number[]): number {
//   // Count frequency of each available digit (0 through 9).
//   const digitCount = new Array<number>(10).fill(0);
//   for (const d of digits) {
//     digitCount[d]++;
//   }

//   let resultCount = 0;

//   // Check all possible 3-digit even numbers from 100 to 998.
//   for (let num = 100; num <= 998; num += 2) {
//     const hundreds = Math.floor(num / 100);
//     const tens = Math.floor((num % 100) / 10);
//     const units = num % 10;

//     // Count required copies of each digit for the current number.
//     const needed = new Array<number>(10).fill(0);
//     needed[hundreds]++;
//     needed[tens]++;
//     needed[units]++;

//     // Verify if our input has enough copies of each needed digit.
//     let canForm = true;
//     for (let d = 0; d < 10; d++) {
//       if (needed[d] > digitCount[d]) {
//         canForm = false;
//         break;
//       }
//     }

//     // If the number can be formed, increment the valid count.
//     if (canForm) {
//       resultCount++;
//     }
//   }

//   return resultCount;
// }

// Optimized Approach
function totalNumbers(digits: number[]): number {
  // Set to store distinct 3-digit even numbers.
  const uniqueNumbers = new Set<number>();
  const n = digits.length;

  // Iterate through all possible triplets of distinct indices.
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        // Ensure all three chosen indices are distinct.
        if (i !== j && j !== k && i !== k) {
          const hundreds = digits[i];
          const tens = digits[j];
          const units = digits[k];

          // Check if hundreds digit is non-zero and units digit is even.
          if (hundreds !== 0 && units % 2 === 0) {
            const num = hundreds * 100 + tens * 10 + units;
            uniqueNumbers.add(num);
          }
        }
      }
    }
  }

  // Return the count of unique numbers collected.
  return uniqueNumbers.size;
}
