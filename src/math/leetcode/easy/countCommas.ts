// 3870. Count Commas in Range

/**
You are given an integer n.

Return the total number of commas used when writing all integers from [1, n] (inclusive) in standard number formatting.

In standard formatting:

A comma is inserted after every three digits from the right.
Numbers with fewer than 4 digits contain no commas.
*/

/**
Example 1:

Input: n = 1002

Output: 3

Explanation:

The numbers "1,000", "1,001", and "1,002" each contain one comma, giving a total of 3.

Example 2:

Input: n = 998

Output: 0

Explanation:

All numbers from 1 to 998 have fewer than four digits. Therefore, no commas are used.
*/

/**
Constraints:

1 <= n <= 105
*/

// Brute Force Approach
// function countCommas(n: number): number {
//   let totalCommas = 0;

//   // Iterate through every number from 1 to n.
//   for (let i = 1; i <= n; i++) {
//     // Calculate the number of digits in the current number.
//     const digits = i.toString().length;

//     // A comma is added every 3 digits from the right.
//     const commasInCurrentNumber = Math.floor((digits - 1) / 3);

//     totalCommas += commasInCurrentNumber;
//   }

//   return totalCommas;
// }

// Optimized Approach

function countCommas(n: number): number {
  // If n is less than 1000, numbers have at most 3 digits and no commas.
  if (n < 1000) {
    return 0;
  }

  // Since n <= 10^5, every number from 1,000 to n has exactly 1 comma.
  return n - 999;
}

// Example usage:
console.log(countCommas(1002)); // Output: 3
console.log(countCommas(998)); // Output: 0
