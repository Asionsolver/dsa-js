// 1523. Count Odd Numbers in an Interval Range

/**
Example 1:

Input: low = 3, high = 7
Output: 3
Explanation: The odd numbers between 3 and 7 are [3,5,7].
Example 2:

Input: low = 8, high = 10
Output: 1
Explanation: The odd numbers between 8 and 10 are [9].
*/

const low = 3,
  high = 7;

const countOdds = function (low: number, high: number) {
  // Calculate odd numbers in range [0, high]
  const oddsUntilHigh = Math.floor((high + 1) / 2);

  // Calculate odd numbers in range [0, low - 1]
  // Note: (low - 1 + 1) / 2 simplifies to low / 2
  const oddsUntilLowMinus1 = Math.floor(low / 2);

  return oddsUntilHigh - oddsUntilLowMinus1;
};

console.log(countOdds(low, high));
