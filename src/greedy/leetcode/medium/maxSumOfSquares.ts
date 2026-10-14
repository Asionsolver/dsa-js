// 3723. Maximize Sum of Squares of Digits

/**
You are given two positive integers num and sum.

A positive integer n is good if it satisfies both of the following:

The number of digits in n is exactly num.
The sum of digits in n is exactly sum.
The score of a good integer n is the sum of the squares of digits in n.

Return a string denoting the good integer n that achieves the maximum score. If there are multiple possible integers, return the maximum ​​​​​​​one. If no such integer exists, return an empty string. 
*/

/**
Example 1:

Input: num = 2, sum = 3

Output: "30"

Explanation:

There are 3 good integers: 12, 21, and 30.

The score of 12 is 12 + 22 = 5.
The score of 21 is 22 + 12 = 5.
The score of 30 is 32 + 02 = 9.
The maximum score is 9, which is achieved by the good integer 30. Therefore, the answer is "30".

Example 2:

Input: num = 2, sum = 17

Output: "98"

Explanation:

There are 2 good integers: 89 and 98.

The score of 89 is 82 + 92 = 145.
The score of 98 is 92 + 82 = 145.
The maximum score is 145. The maximum good integer that achieves this score is 98. Therefore, the answer is "98".

Example 3:

Input: num = 1, sum = 10

Output: ""

Explanation:

There are no integers that have exactly 1 digit and whose digits sum to 10. Therefore, the answer is "".
*/

/**
Constraints:

1 <= num <= 2 * 105
1 <= sum <= 2 * 106
*/

// Brute Force Approach:TLE
// function maxSumOfSquares(num: number, sum: number): string {
//   // If sum is greater than the absolute maximum possible sum, return empty string.
//   if (sum > 9 * num || sum < 1) {
//     return "";
//   }

//   let maxScore = -1;
//   let bestNumber = "";

//   function backtrack(
//     index: number,
//     currentSum: number,
//     currentDigits: number[],
//   ): void {
//     // Base case: when we have placed all num digits.
//     if (index === num) {
//       if (currentSum === sum) {
//         // Calculate sum of squares of digits.
//         let score = 0;
//         for (const d of currentDigits) {
//           score += d * d;
//         }

//         const currentStr = currentDigits.join("");
//         if (
//           score > maxScore ||
//           (score === maxScore && currentStr > bestNumber)
//         ) {
//           maxScore = score;
//           bestNumber = currentStr;
//         }
//       }
//       return;
//     }

//     // Determine starting digit (first digit cannot be 0).
//     const start = index === 0 ? 1 : 0;

//     for (let d = 9; d >= start; d--) {
//       // Prune if remaining sum cannot be satisfied.
//       if (currentSum + d <= sum) {
//         currentDigits.push(d);
//         backtrack(index + 1, currentSum + d, currentDigits);
//         currentDigits.pop();
//       }
//     }
//   }

//   backtrack(0, 0, []);
//   return bestNumber;
// }

// Optimized Approach: Greedy
function maxSumOfSquares(num: number, sum: number): string {
  // If the sum exceeds the maximum possible sum of num digits, it is impossible.
  if (sum > 9 * num) {
    return "";
  }

  // Greedily find how many 9s we can use to maximize the sum of squares.
  const count9 = Math.floor(sum / 9);

  // Find the single remainder digit between 1 and 8 (if any).
  const rem = sum % 9;

  // Calculate how many 0s are required to reach the exact length of num.
  const count0 = num - count9 - (rem > 0 ? 1 : 0);

  // Build the largest possible integer string: all 9s, then remainder, then all 0s.
  const result =
    "9".repeat(count9) + (rem > 0 ? rem.toString() : "") + "0".repeat(count0);

  return result;
}

// Example usage:
console.log(maxSumOfSquares(2, 3)); // Output: "30"
console.log(maxSumOfSquares(2, 17)); // Output: "98"
console.log(maxSumOfSquares(1, 10)); // Output: ""
