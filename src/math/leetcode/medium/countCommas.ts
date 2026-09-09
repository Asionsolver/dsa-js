// 3871. Count Commas in Range II

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

​​​​​​​All numbers from 1 to 998 have fewer than four digits. Therefore, no commas are used.


*/

/**
Constraints:

1 <= n <= 1015
*/

//  Brute Force
// function countCommasBruteForce(n: number): number {
//   let totalCommas = 0;

//   // Iterate through all numbers from 1 to n.
//   for (let i = 1; i <= n; i++) {
//     const digitCount = i.toString().length;
//     const commasInNum = Math.floor((digitCount - 1) / 3);
//     totalCommas += commasInNum;
//   }

//   return totalCommas;
// }

function countCommas(n: number): number {
  // Use BigInt to prevent integer overflow for values up to 10^15.
  const bigN = BigInt(n);
  let totalCommas = 0n;

  // Threshold starts at 1,000 (10^3).
  let threshold = 1000n;

  // Add the contribution of each power of 1,000.
  while (bigN >= threshold) {
    totalCommas += bigN - threshold + 1n;
    threshold *= 1000n;
  }

  // Convert BigInt back to number as the final answer fits within safe integer limits.
  return Number(totalCommas);
}

// Example usage:
console.log(countCommas(1002)); // Output: 3
console.log(countCommas(998)); // Output: 0
