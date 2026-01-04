// 1390. Four Divisors

/**
Example 1:

Input: nums = [21,4,7]
Output: 32
Explanation: 
21 has 4 divisors: 1, 3, 7, 21
4 has 3 divisors: 1, 2, 4
7 has 2 divisors: 1, 7
The answer is the sum of divisors of 21 only.
Example 2:

Input: nums = [21,21]
Output: 64
Example 3:

Input: nums = [1,2,3,4,5]
Output: 0
*/

const nums = [21, 4, 7];
const sumFourDivisors = function (nums: number[]): number {
  let totalSum = 0;

  for (const num of nums) {
    // Optimization: numbers less than 6 cannot have 4 divisors
    // (Smallest number with 4 divisors is 6: 1, 2, 3, 6)
    if (num < 6) continue;

    let divisorSum = 0;
    let divisorCount = 0;

    // Iterate from 1 up to square root of num
    for (let i = 1; i * i <= num; i++) {
      if (num % i === 0) {
        // i is a divisor
        divisorCount++;
        divisorSum += i;

        // Check for the corresponding pair divisor (num / i)
        if (i * i !== num) {
          divisorCount++;
          divisorSum += Math.floor(num / i);
        }
      }

      // Optimization: If we already found more than 4 divisors,
      // this number doesn't qualify. Break early.
      if (divisorCount > 4) {
        break;
      }
    }

    // Only add to total if exactly 4 divisors were found
    if (divisorCount === 4) {
      totalSum += divisorSum;
    }
  }

  return totalSum;
};

console.log(sumFourDivisors(nums));
